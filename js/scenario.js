const basePrice = 100;
let savedScenarios = [];
let latestScenario = null;
const ctx = document.getElementById('priceChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Adjusted Price',
      backgroundColor: '#52b78855',
      borderColor: '#40916c',
      data: [],
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

document.getElementById('scenarioForm').addEventListener('submit', function (e) {
  e.preventDefault();
  runScenario();
});

function runScenario() {
  const supply = parseFloat(document.getElementById('supply').value);
  const demand = parseFloat(document.getElementById('demand').value);
  const weather = document.getElementById('weather').value;

  if (isNaN(supply) || isNaN(demand)) {
    alert('Please enter valid numbers.');
    return;
  }

  const effect = (demand - supply) / 100;
  const newPrice = Math.max(0, basePrice * (1 + effect));
  latestScenario = { supply, demand, price: newPrice, weather };

  alert(`Scenario Applied:\nSupply: ${supply}%\nDemand: ${demand}%\nNew Price: ${newPrice.toFixed(2)}\nWeather: ${weather}`);
}

function addScenario() {
  if (!latestScenario) return alert('Run a scenario first!');
  savedScenarios.push({ ...latestScenario });
  latestScenario = null;
  document.getElementById('scenarioForm').reset();
  saveToLocalStorage();
  renderTable();
  updateChart();
}

function renderTable() {
  const tbody = document.getElementById('scenarioTableBody');
  tbody.innerHTML = '';
  savedScenarios.forEach((s, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${s.supply}</td>
        <td>${s.demand}</td>
        <td>${s.price.toFixed(2)}</td>
        <td>${s.weather || ''}</td>
        <td>
          <button class='btn btn-sm btn-warning' onclick="editScenario(${index})">Edit</button>
          <button class='btn btn-sm btn-danger' onclick="deleteScenario(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

function editScenario(index) {
  const s = savedScenarios[index];
  const newSupply = parseFloat(prompt('Edit Supply %:', s.supply));
  const newDemand = parseFloat(prompt('Edit Demand %:', s.demand));
  const newWeather = prompt('Edit Weather Note:', s.weather || '');
  if (!isNaN(newSupply) && !isNaN(newDemand)) {
    const newPrice = Math.max(0, basePrice * (1 + (newDemand - newSupply) / 100));
    savedScenarios[index] = { supply: newSupply, demand: newDemand, price: newPrice, weather: newWeather };
    saveToLocalStorage();
    renderTable();
    updateChart();
  }
}

function deleteScenario(index) {
  if (confirm('Delete this scenario?')) {
    savedScenarios.splice(index, 1);
    saveToLocalStorage();
    renderTable();
    updateChart();
  }
}

function resetAll() {
  if (confirm('Clear all scenarios?')) {
    savedScenarios = [];
    localStorage.removeItem('scenarios');
    renderTable();
    updateChart();
  }
}

function updateChart() {
  chart.data.labels = savedScenarios.map((_, i) => `Scenario ${i + 1}`);
  chart.data.datasets[0].data = savedScenarios.map(s => s.price);
  chart.update();
}

function applyWeatherImpact(type) {
  let supply = 0, demand = 0, weather = '';
  switch (type) {
    case 'drought': supply = -30; demand = 10; weather = 'Severe drought'; break;
    case 'flood': supply = -40; demand = 5; weather = 'Heavy flooding'; break;
    case 'ideal': supply = 20; demand = 10; weather = 'Ideal sunny conditions'; break;
  }
  document.getElementById('supply').value = supply;
  document.getElementById('demand').value = demand;
  document.getElementById('weather').value = weather;
  runScenario();
}

function saveToLocalStorage() {
  localStorage.setItem('scenarios', JSON.stringify(savedScenarios));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('scenarios');
  if (data) {
    savedScenarios = JSON.parse(data);
    renderTable();
    updateChart();
  }
}

window.onload = loadFromLocalStorage;
