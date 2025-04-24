    const cropChart = new Chart(document.getElementById('cropChart'), {
      type: 'bar',
      data: {
        labels: ['Wheat', 'Rice', 'Maize', 'Sugarcane'],
        datasets: [{
          label: 'Production (tons)',
          data: [120, 150, 80, 100],
          backgroundColor: 'rgba(52, 152, 219, 0.6)'
        }, {
          label: 'Demand (tons)',
          data: [100, 130, 90, 95],
          backgroundColor: 'rgba(46, 204, 113, 0.6)'
        }]
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

    const forecastChart = new Chart(document.getElementById('forecastChart'), {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Price Forecast (Rs/kg)',
          data: [24, 25, 27, 29, 30],
          borderColor: 'rgba(231, 76, 60, 0.9)',
          fill: false
        }]
      },
      options: {
        responsive: true,
        tension: 0.3,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });

    const storageUtilizationChart = new Chart(document.getElementById('storageUtilizationChart'), {
      type: 'pie',
      data: {
        labels: ['Wheat', 'Rice', 'Maize'],
        datasets: [{
          data: [50, 30, 20],
          backgroundColor: [
            'rgba(243, 156, 18, 0.8)',
            'rgba(39, 174, 96, 0.8)',
            'rgba(41, 128, 185, 0.8)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    const stockMonitoringChart = new Chart(document.getElementById('stockMonitoringChart'), {
      type: 'bar',
      data: {
        labels: ['Wheat', 'Rice', 'Maize'],
        datasets: [{
          label: 'Stock Level (tons)',
          data: [300, 200, 150],
          backgroundColor: 'rgba(52, 152, 219, 0.6)'
        }]
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