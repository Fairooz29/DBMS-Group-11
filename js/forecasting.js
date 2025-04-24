const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const crops = ["Wheat", "Rice", "Corn", "Barley", "Soybean", "Potato", "Tomato", "Onion"];
  const forecastData = [];
  const dummyPastData = [];
  
  for (let crop of crops) {
    for (let year = 2020; year <= 2025; year++) {
      for (let month = 0; month < 12; month++) {
        dummyPastData.push({
          crop,
          year,
          month,
          supply: Math.floor(Math.random() * 100) + 50,
          demand: Math.floor(Math.random() * 100) + 50
        });
      }
    }
  }
  
  function populateYearSelect() {
    const yearSelect = document.getElementById("yearSelect");
    for (let year = 2020; year <= 2035; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }
  
  function renderPastTable() {
    const pastTable = document.getElementById("pastDataTable");
    const selectedCrop = document.getElementById("cropSelect").value;
    pastTable.innerHTML = "";
    dummyPastData.filter(row => row.crop === selectedCrop).forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.year}</td><td>${monthNames[row.month]}</td><td>${row.crop}</td><td>${row.supply}</td><td>${row.demand}</td>`;
      pastTable.appendChild(tr);
    });
  }
  
  const ctx = document.getElementById("forecastChart").getContext("2d");
  let forecastChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: monthNames,
      datasets: [
        {
          label: "Supply",
          data: Array(12).fill(0),
          borderColor: "#388e3c",
          backgroundColor: "transparent",
          tension: 0.3
        },
        {
          label: "Demand",
          data: Array(12).fill(0),
          borderColor: "#d32f2f",
          backgroundColor: "transparent",
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  function updateTable() {
    const tableBody = document.getElementById("forecastTableBody");
    tableBody.innerHTML = "";
    forecastData.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.crop}</td><td>${row.year}</td><td>${monthNames[row.month]}</td><td>${row.supply}</td><td>${row.demand}</td>
        <td>
          <button onclick="editForecast(${index})">Edit</button>
          <button onclick="deleteForecast(${index})">Delete</button>
        </td>`;
      tableBody.appendChild(tr);
    });
  }
  
  function updateChart(data) {
    forecastChart.data.datasets[0].data = data.supply;
    forecastChart.data.datasets[1].data = data.demand;
    forecastChart.update();
  }
  
  function addForecast() {
    const crop = document.getElementById("cropSelect").value;
    const year = parseInt(document.getElementById("yearSelect").value);
    const month = parseInt(document.getElementById("monthSelect").value);
    const supply = parseFloat(document.getElementById("supplyInput").value);
    const demand = parseFloat(document.getElementById("demandInput").value);
    if (!isNaN(supply) && !isNaN(demand)) {
      forecastData.push({ crop, year, month, supply, demand });
      updateTable();
    }
  }
  
  function editForecast(index) {
    const item = forecastData[index];
    const supply = parseFloat(prompt("Edit Supply:", item.supply));
    const demand = parseFloat(prompt("Edit Demand:", item.demand));
    if (!isNaN(supply) && !isNaN(demand)) {
      forecastData[index].supply = supply;
      forecastData[index].demand = demand;
      updateTable();
    }
  }
  
  function deleteForecast(index) {
    forecastData.splice(index, 1);
    updateTable();
  }
  
  function generateForecast() {
    const crop = document.getElementById("cropSelect").value;
    const supplyArray = Array(12).fill(0);
    const demandArray = Array(12).fill(0);
    const counts = Array(12).fill(0);
  
    [...dummyPastData, ...forecastData].forEach(row => {
      if (row.crop === crop) {
        supplyArray[row.month] += row.supply;
        demandArray[row.month] += row.demand;
        counts[row.month]++;
      }
    });
  
    for (let i = 0; i < 12; i++) {
      if (counts[i] > 0) {
        supplyArray[i] = Math.round(supplyArray[i] / counts[i]);
        demandArray[i] = Math.round(demandArray[i] / counts[i]);
      }
    }
  
    updateChart({ supply: supplyArray, demand: demandArray });
  }
  
  function forecastNextYear() {
    const crop = document.getElementById("cropSelect").value;
    const nextYear = Math.max(...forecastData.map(d => d.year).concat(new Date().getFullYear())) + 1;
    const supplyArray = Array(12).fill(0);
    const demandArray = Array(12).fill(0);
    const counts = Array(12).fill(0);
  
    [...dummyPastData, ...forecastData].forEach(row => {
      if (row.crop === crop) {
        supplyArray[row.month] += row.supply;
        demandArray[row.month] += row.demand;
        counts[row.month]++;
      }
    });
  
    for (let i = 0; i < 12; i++) {
      if (counts[i] > 0) {
        const avgSupply = Math.round(supplyArray[i] / counts[i]);
        const avgDemand = Math.round(demandArray[i] / counts[i]);
        forecastData.push({ crop, year: nextYear, month: i, supply: avgSupply, demand: avgDemand });
      }
    }
  
    updateTable();
    generateForecast();
  }
  
  populateYearSelect();
  renderPastTable();
  