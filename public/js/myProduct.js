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

    grid.innerHTML = productsToRender.map(product => `
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
                <button class="add-to-cart-btn" onclick="deleteProduct('${product._id}')">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.1a1 1 0 001 1.1h9.2a1 1 0 001-1.1L16 13m-5 3v4m2-4v4"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}
function deleteProduct(id) {
  fetch(`/deleteProduct/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to delete ');
    return res.json();
  })
  .then(data => {
    alert(data.message);
    
    location.reload(); // or update products without reload
  })
  .catch(err => {
    console.error(err);
    alert("Something went wrong!");
  });
}
renderProducts(products);