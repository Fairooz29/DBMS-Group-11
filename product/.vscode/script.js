// Enhanced product data model
const products = [
    {
        id: 1,
        type: "fruit",
        name: "Mango",
        varieties: [
            { name: "Alphonso", characteristics: "Sweet, fiberless", marketPrice: "₹300/kg" },
            { name: "Kesar", characteristics: "Aromatic, saffron-colored", marketPrice: "₹250/kg" }
        ],
        season: {
            peak: ["May", "June"],
            availability: ["March", "July"]
        },
        image: "https://source.unsplash.com/random/600x400/?mango",
        nutritionalInfo: {
            calories: "60kcal/100g",
            vitamins: "Vitamins A, C, B6"
        },
        supplyTrend: [65, 59, 80, 81, 56, 55, 40] // Sample monthly data
    },
    // Add more products with detailed data
];

// Function to create product cards
function createProductCards() {
    const container = document.querySelector('.product-highlights');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="meta-info">
                    <span class="product-type">${product.type.toUpperCase()}</span>
                    <div class="season-indicator">
                        <i class="fas fa-calendar-alt"></i>
                        Peak: ${product.season.peak.join('-')}
                    </div>
                </div>
                
                <div class="variety-list">
                    ${product.varieties.map(v => `
                        <span class="variety-tag">${v.name}</span>
                    `).join('')}
                </div>
                
                <button class="detail-btn" data-id="${product.id}">
                    View Market Insights <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Function to show detailed product view
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const detailContainer = document.querySelector('.detail-content');
    
    detailContainer.innerHTML = `
        <h3>${product.name} Market Analysis</h3>
        <div class="detail-grid">
            <div class="nutrition-info">
                <h4>Nutritional Value</h4>
                <p>${product.nutritionalInfo.calories}</p>
                <p>${product.nutritionalInfo.vitamins}</p>
            </div>
            
            <div class="price-trend">
                <h4>Monthly Supply Trend</h4>
                <canvas id="trendChart"></canvas>
            </div>
            
            <div class="variety-comparison">
                <h4>Variety Comparison</h4>
                <table>
                    ${product.varieties.map(v => `
                        <tr>
                            <td>${v.name}</td>
                            <td>${v.characteristics}</td>
                            <td>${v.marketPrice}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        </div>
    `;
    
    // Initialize chart
    new Chart(document.getElementById('trendChart'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Supply Quantity (tons)',
                data: product.supplyTrend,
                borderColor: '#4CAF50'
            }]
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createProductCards();
    
    // Add event listeners for detail buttons
    document.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            showProductDetails(productId);
        });
    });
});