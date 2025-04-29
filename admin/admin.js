document.addEventListener('DOMContentLoaded', function() {
    // Demand vs Supply Chart
    const demandSupplyCtx = document.getElementById('demandSupplyChart').getContext('2d');
    const demandSupplyChart = new Chart(demandSupplyCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Demand (tons)',
            data: [120, 190, 170, 220, 250, 210, 200, 230, 240, 260, 280, 300],
            borderColor: '#6a11cb',
            backgroundColor: 'rgba(106, 17, 203, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Supply (tons)',
            data: [100, 170, 150, 200, 230, 200, 190, 210, 220, 240, 260, 280],
            borderColor: '#00c6fb',
            backgroundColor: 'rgba(0, 198, 251, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantity (tons)'
            }
          }
        }
      }
    });
  
    // Price Trends Chart
    const priceTrendCtx = document.getElementById('priceTrendChart').getContext('2d');
    const priceTrendChart = new Chart(priceTrendCtx, {
      type: 'bar',
      data: {
        labels: ['Rice', 'Wheat', 'Onions', 'Potatoes', 'Tomatoes', 'Pulses'],
        datasets: [
          {
            label: 'Current Price (₹/kg)',
            data: [45, 30, 30, 25, 40, 60],
            backgroundColor: 'rgba(0, 119, 182, 0.7)',
            borderColor: 'rgba(0, 119, 182, 1)',
            borderWidth: 1
          },
          {
            label: 'Historical Avg (₹/kg)',
            data: [40, 28, 25, 22, 35, 55],
            backgroundColor: 'rgba(239, 83, 80, 0.7)',
            borderColor: 'rgba(239, 83, 80, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Price (₹/kg)'
            }
          }
        }
      }
    });
  
    // Seasonal Production Chart
    const seasonalCtx = document.getElementById('seasonalChart').getContext('2d');
    const seasonalChart = new Chart(seasonalCtx, {
      type: 'radar',
      data: {
        labels: ['Kharif', 'Rabi', 'Zaid', 'Summer', 'Winter', 'Monsoon'],
        datasets: [
          {
            label: 'Rice',
            data: [90, 70, 40, 30, 20, 60],
            backgroundColor: 'rgba(106, 17, 203, 0.2)',
            borderColor: 'rgba(106, 17, 203, 1)',
            borderWidth: 2
          },
          {
            label: 'Wheat',
            data: [30, 80, 20, 40, 70, 30],
            backgroundColor: 'rgba(0, 198, 251, 0.2)',
            borderColor: 'rgba(0, 198, 251, 1)',
            borderWidth: 2
          },
          {
            label: 'Pulses',
            data: [50, 60, 30, 40, 50, 40],
            backgroundColor: 'rgba(239, 83, 80, 0.2)',
            borderColor: 'rgba(239, 83, 80, 1)',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  
    // Crop Distribution Chart
    const cropDistributionCtx = document.getElementById('cropDistributionChart').getContext('2d');
    const cropDistributionChart = new Chart(cropDistributionCtx, {
      type: 'doughnut',
      data: {
        labels: ['Rice', 'Wheat', 'Pulses', 'Vegetables', 'Fruits', 'Others'],
        datasets: [{
          data: [35, 25, 15, 10, 10, 5],
          backgroundColor: [
            '#6a11cb',
            '#2575fc',
            '#00c6fb',
            '#005bea',
            '#f46b45',
            '#eea849'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', function(e) {
        e.preventDefault();
        const submenu = this.querySelector('.submenu');
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      });
    });
  });