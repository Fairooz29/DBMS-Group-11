const consumptionCtx = document.getElementById("consumptionChart").getContext("2d");
const elasticityCtx = document.getElementById("elasticityChart").getContext("2d");

const consumptionChart = new Chart(consumptionCtx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      label: "Demand (Consumption Rate)",
      data: [],
      backgroundColor: "#4D96FF"
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Demand Value' }
      },
      x: {
        title: { display: true, text: 'Product ID' }
      }
    }
  }
});

const elasticityChart = new Chart(elasticityCtx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      label: "Price Elasticity",
      data: [],
      backgroundColor: "#FFA500"
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Elasticity Value' }
      },
      x: {
        title: { display: true, text: 'Product ID' }
      }
    }
  }
});

function addData() {
  const product = document.getElementById("productId").value;
  const rate = document.getElementById("rate").value;
  const elasticity = parseFloat(document.getElementById("elasticity").value);

  if (isNaN(elasticity)) {
    alert("Please enter a valid elasticity value.");
    return;
  }

  let demandValue = rate === "High" ? 3 : rate === "Medium" ? 2 : 0.5;

  // Update charts
  consumptionChart.data.labels.push(product);
  consumptionChart.data.datasets[0].data.push(demandValue);
  consumptionChart.update();

  elasticityChart.data.labels.push(product);
  elasticityChart.data.datasets[0].data.push(elasticity);
  elasticityChart.update();

  // Add row to table
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${product}</td>
    <td>${rate}</td>
    <td>${demandValue}</td>
    <td>${elasticity}</td>
    <td>
      <button class="btn edit" onclick="editRow(this)">Edit</button>
      <button class="btn delete" onclick="deleteRow(this)">Delete</button>
    </td>`;
  document.getElementById("dataTable").appendChild(row);
}

function deleteRow(button) {
  const row = button.closest("tr");
  const productId = row.cells[0].textContent;

  // Remove from charts
  let index = consumptionChart.data.labels.indexOf(productId);
  if (index > -1) {
    consumptionChart.data.labels.splice(index, 1);
    consumptionChart.data.datasets[0].data.splice(index, 1);
    elasticityChart.data.labels.splice(index, 1);
    elasticityChart.data.datasets[0].data.splice(index, 1);
    consumptionChart.update();
    elasticityChart.update();
  }

  row.remove();
}

function editRow(button) {
  const row = button.closest("tr");
  const product = row.cells[0].textContent;
  const rate = row.cells[1].textContent;
  const elasticity = row.cells[3].textContent;

  document.getElementById("productId").value = product;
  document.getElementById("rate").value = rate;
  document.getElementById("elasticity").value = elasticity;

  deleteRow(button.nextElementSibling); // Deletes current row so we can re-add updated
}
