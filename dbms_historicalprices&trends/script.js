// Main Application Class
class MarketPriceApp {
    constructor() {
        this.chart = null;
        this.currentData = null;
        this.currentPage = 1;
        this.rowsPerPage = 10;
        this.filteredData = [];
        
        this.initElements();
        this.initEventListeners();
        this.loadData();
    }
    
    initElements() {
        // Form elements
        this.elements = {
            regionSelect: document.getElementById('region-select'),
            cropSelect: document.getElementById('crop-select'),
            timeRange: document.getElementById('time-range'),
            customDates: document.querySelector('.custom-dates'),
            startDate: document.getElementById('start-date'),
            endDate: document.getElementById('end-date'),
            applyBtn: document.getElementById('apply-btn'),
            resetBtn: document.getElementById('reset-btn'),
            
            // Chart elements
            chartTitle: document.getElementById('chart-title'),
            chartCanvas: document.getElementById('priceChart'),
            chartLoader: document.getElementById('chart-loader'),
            chartLegend: document.getElementById('chart-legend'),
            exportPng: document.getElementById('export-png'),
            exportCsv: document.getElementById('export-csv'),
            
            // Table elements
            priceTable: document.getElementById('price-table').querySelector('tbody'),
            prevPage: document.getElementById('prev-page'),
            nextPage: document.getElementById('next-page'),
            pageInfo: document.getElementById('page-info'),
            rowsPerPage: document.getElementById('rows-per-page')
        };
    }
    
    initEventListeners() {
        // Filter controls
        this.elements.timeRange.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                this.elements.customDates.style.display = 'flex';
                // Set default dates (last 30 days)
                const endDate = new Date();
                const startDate = new Date();
                startDate.setDate(endDate.getDate() - 30);
                
                this.elements.endDate.value = endDate.toISOString().split('T')[0];
                this.elements.startDate.value = startDate.toISOString().split('T')[0];
            } else {
                this.elements.customDates.style.display = 'none';
            }
        });
        
        this.elements.applyBtn.addEventListener('click', () => this.applyFilters());
        this.elements.resetBtn.addEventListener('click', () => this.resetFilters());
        
        // Chart export
        this.elements.exportPng.addEventListener('click', () => this.exportChartAsPNG());
        this.elements.exportCsv.addEventListener('click', () => this.exportChartDataAsCSV());
        
        // Pagination
        this.elements.prevPage.addEventListener('click', () => this.prevPage());
        this.elements.nextPage.addEventListener('click', () => this.nextPage());
        this.elements.rowsPerPage.addEventListener('change', (e) => {
            this.rowsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderTable();
        });
    }
    
    async loadData() {
        try {
            this.showLoader();
            
            // In a real app, this would be an API call
            const response = await fetch('data.json');
            this.currentData = await response.json();
            
            // Process data (add regions, more detailed info)
            this.processData();
            
            this.applyFilters();
            this.hideLoader();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load data. Please try again later.');
            this.hideLoader();
        }
    }
    
    processData() {
        // Add more detailed data structure for demonstration
        const regions = ['north', 'south', 'east', 'west'];
        const markets = ['Retail', 'Wholesale', 'Export'];
        
        for (const crop in this.currentData) {
            // Add regional variations
            this.currentData[crop].regions = {};
            
            regions.forEach(region => {
                // Create variation of prices by region
                const basePrice = this.currentData[crop].current;
                const regionVariation = (Math.random() * 0.4) - 0.2; // ±20%
                const regionPrice = basePrice * (1 + regionVariation);
                
                // Create change values
                const dailyChange = (Math.random() * 0.1) - 0.05; // ±5%
                const weeklyChange = (Math.random() * 0.2) - 0.1; // ±10%
                
                this.currentData[crop].regions[region] = {
                    price: parseFloat(regionPrice.toFixed(2)),
                    dailyChange: parseFloat(dailyChange.toFixed(3)),
                    weeklyChange: parseFloat(weeklyChange.toFixed(3)),
                    market: markets[Math.floor(Math.random() * markets.length)],
                    lastUpdated: new Date().toISOString()
                };
            });
            
            // Add more historical data points
            const timeRanges = ['3m', '6m', '1y', '3y', '5y'];
            timeRanges.forEach(range => {
                if (!this.currentData[crop].historical[range]) {
                    this.generateHistoricalData(crop, range);
                }
            });
        }
    }
    
    generateHistoricalData(crop, range) {
        const basePrice = this.currentData[crop].current;
        const dataPoints = this.getDataPointCount(range);
        const volatility = 0.15; // 15% volatility
        
        this.currentData[crop].historical[range] = Array(dataPoints).fill().map((_, i) => {
            const progression = i / (dataPoints - 1);
            const trend = (Math.random() * 0.5 - 0.25) * progression; // Slight trend
            const randomFactor = (Math.random() * 2 - 1) * volatility;
            return parseFloat((basePrice * (1 - trend + randomFactor)).toFixed(2));
        });
    }
    
    getDataPointCount(range) {
        switch(range) {
            case '3m': return 13; // Weekly data for 3 months
            case '6m': return 26; // Weekly data for 6 months
            case '1y': return 12; // Monthly data for 1 year
            case '3y': return 36; // Monthly data for 3 years
            case '5y': return 60; // Monthly data for 5 years
            default: return 12;
        }
    }
    
    applyFilters() {
        const selectedCrops = Array.from(this.elements.cropSelect.selectedOptions).map(opt => opt.value);
        const selectedRegion = this.elements.regionSelect.value;
        const timeRange = this.elements.timeRange.value;
        
        // Update chart title
        this.elements.chartTitle.textContent = `${selectedCrops.join(', ')} Price Trends`;
        
        // Prepare data for visualization
        const chartData = {};
        
        selectedCrops.forEach(crop => {
            if (this.currentData[crop]) {
                if (timeRange === 'custom') {
                    // In a real app, we'd filter by actual dates
                    chartData[crop] = this.currentData[crop].historical['1y'].slice(0, 12);
                } else {
                    chartData[crop] = this.currentData[crop].historical[timeRange];
                }
            }
        });
        
        // Filter table data
        this.filteredData = [];
        selectedCrops.forEach(crop => {
            if (selectedRegion === 'all') {
                for (const region in this.currentData[crop].regions) {
                    this.filteredData.push({
                        crop,
                        region,
                        ...this.currentData[crop].regions[region]
                    });
                }
            } else if (this.currentData[crop].regions[selectedRegion]) {
                this.filteredData.push({
                    crop,
                    region: selectedRegion,
                    ...this.currentData[crop].regions[selectedRegion]
                });
            }
        });
        
        // Update visualizations
        this.renderChart(chartData, timeRange);
        this.currentPage = 1;
        this.renderTable();
    }
    
    resetFilters() {
        this.elements.regionSelect.value = 'all';
        this.elements.cropSelect.querySelectorAll('option').forEach(opt => {
            opt.selected = opt.value === 'wheat';
        });
        this.elements.timeRange.value = '1y';
        this.elements.customDates.style.display = 'none';
        
        this.applyFilters();
    }
    
    renderChart(data, timeRange) {
        this.showLoader();
        
        // Destroy previous chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }
        
        // Generate labels based on time range
        const labels = this.generateLabels(timeRange, Object.keys(data)[0]);
        
        // Prepare datasets
        const datasets = [];
        const colors = [
            '#2e7d32', '#689f38', '#7cb342', '#afb42b', '#fbc02d', 
            '#ffa000', '#f57c00', '#e64a19', '#5d4037', '#616161'
        ];
        
        Object.keys(data).forEach((crop, i) => {
            datasets.push({
                label: `${crop.charAt(0).toUpperCase() + crop.slice(1)} Price (USD/kg)`,
                data: data[crop],
                borderColor: colors[i % colors.length],
                backgroundColor: `${colors[i % colors.length]}20`,
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointRadius: 3,
                pointHoverRadius: 5
            });
        });
        
        // Create chart
        const ctx = this.elements.chartCanvas.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'xy'
                        },
                        pan: {
                            enabled: true,
                            mode: 'xy'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price (USD/kg)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time Period'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
        
        // Update legend
        this.updateLegend(datasets);
        this.hideLoader();
    }
    
    generateLabels(timeRange, crop) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        if (!this.currentData || !this.currentData[crop]) return [];
        
        const dataPoints = this.currentData[crop].historical[timeRange].length;
        
        switch(timeRange) {
            case '3m':
                // Weekly labels for last 3 months
                const weeks = [];
                const today = new Date();
                for (let i = dataPoints - 1; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(date.getDate() - (i * 7));
                    weeks.push(`${date.getDate()} ${monthNames[date.getMonth()]}`);
                }
                return weeks;
                
            case '6m':
                // Bi-weekly labels for last 6 months
                const biWeeks = [];
                for (let i = 0; i < dataPoints; i++) {
                    const date = new Date();
                    date.setMonth(date.getMonth() - 6);
                    date.setDate(date.getDate() + (i * 14));
                    biWeeks.push(`${date.getDate()} ${monthNames[date.getMonth()]}`);
                }
                return biWeeks;
                
            case '1y':
                // Monthly labels for last year
                return monthNames;
                
            case '3y':
                // Quarterly labels for 3 years
                const quarters = [];
                for (let i = 0; i < 12; i++) {
                    const year = Math.floor(i / 4) + 1;
                    const quarter = (i % 4) + 1;
                    quarters.push(`Q${quarter} Y${year}`);
                }
                return quarters;
                
            case '5y':
                // Yearly labels for 5 years
                return Array.from({length: 5}, (_, i) => `Year ${i + 1}`);
                
            case 'custom':
            default:
                return Array.from({length: dataPoints}, (_, i) => `Day ${i + 1}`);
        }
    }
    
    updateLegend(datasets) {
        this.elements.chartLegend.innerHTML = '';
        
        datasets.forEach(dataset => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            
            const colorBox = document.createElement('div');
            colorBox.className = 'legend-color';
            colorBox.style.backgroundColor = dataset.borderColor;
            
            const label = document.createElement('span');
            label.textContent = dataset.label;
            
            legendItem.appendChild(colorBox);
            legendItem.appendChild(label);
            this.elements.chartLegend.appendChild(legendItem);
        });
    }
    
    renderTable() {
        if (!this.filteredData || this.filteredData.length === 0) {
            this.elements.priceTable.innerHTML = '<tr><td colspan="7" class="no-data">No data available for selected filters</td></tr>';
            this.updatePaginationControls();
            return;
        }
        
        // Calculate pagination
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        const startIdx = (this.currentPage - 1) * this.rowsPerPage;
        const endIdx = Math.min(startIdx + this.rowsPerPage, this.filteredData.length);
        const pageData = this.filteredData.slice(startIdx, endIdx);
        
        // Render table rows
        this.elements.priceTable.innerHTML = pageData.map(item => `
            <tr>
                <td>${item.crop.charAt(0).toUpperCase() + item.crop.slice(1)}</td>
                <td>${item.region.charAt(0).toUpperCase() + item.region.slice(1)}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td class="${item.dailyChange >= 0 ? 'price-up' : 'price-down'}">
                    ${item.dailyChange >= 0 ? '+' : ''}${(item.dailyChange * 100).toFixed(1)}%
                </td>
                <td class="${item.weeklyChange >= 0 ? 'price-up' : 'price-down'}">
                    ${item.weeklyChange >= 0 ? '+' : ''}${(item.weeklyChange * 100).toFixed(1)}%
                </td>
                <td><span class="badge ${item.market === 'Export' ? 'primary' : 'secondary'}">${item.market}</span></td>
                <td>
                    <button class="btn small" onclick="app.showDetails('${item.crop}', '${item.region}')">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </td>
            </tr>
        `).join('');
        
        this.updatePaginationControls(totalPages);
    }
    
    updatePaginationControls(totalPages = 1) {
        this.elements.pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        this.elements.prevPage.disabled = this.currentPage <= 1;
        this.elements.nextPage.disabled = this.currentPage >= totalPages;
    }
    
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderTable();
        }
    }
    
    nextPage() {
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderTable();
        }
    }
    
    exportChartAsPNG() {
        if (!this.chart) return;
        
        const link = document.createElement('a');
        link.download = 'market-trends.png';
        link.href = this.chart.toBase64Image('image/png', 1);
        link.click();
    }
    
    exportChartDataAsCSV() {
        if (!this.chart) return;
        
        const headers = ['Period', ...this.chart.data.datasets.map(d => d.label)];
        const rows = this.chart.data.labels.map((label, i) => {
            const values = this.chart.data.datasets.map(d => d.data[i]);
            return [label, ...values].join(',');
        });
        
        const csvContent = [
            headers.join(','),
            ...rows
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.download = 'market-trends.csv';
        link.href = URL.createObjectURL(blob);
        link.click();
    }
    
    showDetails(crop, region) {
        // In a real app, this would show a detailed modal
        alert(`Details for ${crop} in ${region} region:\nPrice: $${this.currentData[crop].regions[region].price.toFixed(2)}\nLast Updated: ${new Date(this.currentData[crop].regions[region].lastUpdated).toLocaleString()}`);
    }
    
    showLoader() {
        this.elements.chartLoader.style.display = 'flex';
    }
    
    hideLoader() {
        this.elements.chartLoader.style.display = 'none';
    }
    
    showError(message) {
        // In a real app, you'd show this in the UI
        console.error(message);
    }
}

// Initialize the application
const app = new MarketPriceApp();