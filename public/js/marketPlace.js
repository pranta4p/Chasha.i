let cart = [];

function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    
    if (productsToRender.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = productsToRender.map(product => 
        `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-header">
                    <div>
                        <h3 class="product-title">${product.name}</h3>
                        <span class="product-badge">${product.type}</span>
                    </div>
                    <div class="product-price">
                        <span class="price-amount">${product.price} Taka</span>
                        <p class="price-unit">per ${product.unit}</p>
                    </div>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <div class="product-detail">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>${product.location}</span>
                    </div>
                    <div class="product-detail">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>${product.phone}</span>
                    </div>
                    <div class="product-detail">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Seller: ${product.seller}</span>
                    </div>
                </div>
                <form action="/addToCart/${product._id}" method="get">
                <button class="add-to-cart-btn" >
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.1a1 1 0 001 1.1h9.2a1 1 0 001-1.1L16 13m-5 3v4m2-4v4"></path>
                    </svg>
                    Add to Cart
                </button>
                </form>
            </div>
        </div>
    `).join('');
}


function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const location = document.getElementById('location').value;
    const type = document.getElementById('type').value;

    // here is the product name
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesLocation = location === "All" || product.location === location;
        const matchesType = type === "All" || product.type === type;
        
        return matchesSearch && matchesLocation && matchesType;
    });

    renderProducts(filtered);
}

function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('location').value = 'All';
    document.getElementById('type').value = 'All';
    renderProducts(products);
}

// Event listeners
document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('location').addEventListener('change', filterProducts);
document.getElementById('type').addEventListener('change', filterProducts);

// Initial render
renderProducts(products);
updateCartCount();