const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
const crops = ['wheat', 'rice', 'corn', 'potato', 'tomato', 'onion', 'sugarcane'];

const cropPrices = {};


crops.forEach(crop => {
  cropPrices[crop] = {};
  years.forEach(year => {
    if (year <= 2025) {
      cropPrices[crop][year] = months.map(() => getRandomPrice(crop));
    } else {
      cropPrices[crop][year] = Array(12).fill(null);
    }
  });
});

function getRandomPrice(crop) {
  const ranges = {
    wheat: [100, 150],
    rice: [200, 260],
    corn: [140, 200],
    potato: [60, 95],
    tomato: [40, 75],
    onion: [70, 120],
    sugarcane: [300, 380]
  };
  const [min, max] = ranges[crop];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentCrop = 'wheat';
let currentYear = 2025;
let chart;

function populateYearDropdown() {
  const yearSelect = document.getElementById('yearSelect');
  yearSelect.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
  yearSelect.value = currentYear;
}

function renderChart() {
  const ctx = document.getElementById('priceChart').getContext('2d');
  if (chart) chart.destroy();

  const data = cropPrices[currentCrop][currentYear];

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: `${capitalize(currentCrop)} Prices in ${currentYear}`,
        data: data,
        borderColor: '#4caf50',
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  renderTable();
}

function renderTable() {
  const tableBody = document.querySelector('#priceTable tbody');
  tableBody.innerHTML = '';

  cropPrices[currentCrop][currentYear].forEach((price, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${months[index]}</td><td>${price ?? '-'}</td>`;
    tableBody.appendChild(row);
  });
}

function addPrice() {
  const month = prompt("Enter month (e.g., Jan):");
  const index = months.indexOf(month);
  if (index === -1) return alert("Invalid month!");

  const value = prompt(`Enter price for ${month} in ${currentYear}:`);
  if (isNaN(value) || value === "") return alert("Invalid price!");

  cropPrices[currentCrop][currentYear][index] = parseFloat(value);
  renderChart();
}

function editPrice() {
  const month = prompt("Enter month to edit (e.g., Feb):");
  const index = months.indexOf(month);
  if (index === -1) return alert("Invalid month!");

  const currentValue = cropPrices[currentCrop][currentYear][index] ?? '';
  const newValue = prompt(`Enter new price for ${month} in ${currentYear}:`, currentValue);
  if (isNaN(newValue) || newValue === "") return alert("Invalid price!");

  cropPrices[currentCrop][currentYear][index] = parseFloat(newValue);
  renderChart();
}

function deletePrice() {
  const month = prompt("Enter month to delete (e.g., Mar):");
  const index = months.indexOf(month);
  if (index === -1) return alert("Invalid month!");

  cropPrices[currentCrop][currentYear][index] = null;
  renderChart();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById('cropSelect').addEventListener('change', (e) => {
  currentCrop = e.target.value;
  renderChart();
});

document.getElementById('yearSelect').addEventListener('change', (e) => {
  currentYear = parseInt(e.target.value);
  renderChart();
});

populateYearDropdown();
renderChart();
