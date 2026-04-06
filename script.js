// 1. Product Data (15 Gadgets in INR) - ✅ 100% OFFLINE
const products = [
    { id: 1, name: "Headphones", price: 249, img: "images/headphone.jfif" },
    { id: 2, name: "Apple Watch", price: 2900, img: "images/watch.jfif" },
    { id: 3, name: "Mechanical Keyboard", price: 890, img: "images/keyboard.jfif" },
    { id: 4, name: "Pro Mouse", price: 4990, img: "images/mouse.jfif" },
    { id: 5, name: "Aluminum Laptop Stand", price: 1129, img: "images/monitor.jfif" },
    { id: 6, name: "UltraWide Monitor 34\"", price: 4500, img: "images/monitor.jfif" },
    { id: 7, name: "4K Webcam", price: 1250, img: "images/webcam.jfif" },
    { id: 8, name: "iPad", price: 790, img: "images/speaker.jfif" },  // Fixed name match
    { id: 9, name: "Speaker", price: 910, img: "images/speaker.jfif" },  // ✅ Downloaded & fixed
    { id: 10, name: "Blue Yeti Microphone", price: 2900, img: "images/mic.jfif" },
    { id: 11, name: "1TB SSD", price: 850, img: "images/ssd.jfif" },
    { id: 12, name: "16GB RAM", price: 650, img: "images/ram.jfif" },
    { id: 13, name: "65W Fast Charger", price: 250, img: "images/charger.jfif" },
    { id: 14, name: "Power Bank 20000mAh", price: 199, img: "images/powerbank.jfif" },
    { id: 15, name: "Apple AirPods Pro", price: 2490, img: "images/earphone.jfif" }
];

// Rest of your code stays EXACTLY the same...
// 2. Initialize Cart
let cart = JSON.parse(localStorage.getItem('shopCart')) || [];

// 3. Format Currency
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// 4. Render Shop Products
function renderShop() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <span class="price">${formatPrice(product.price)}</span>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// ... (keep all other functions exactly the same)

// 5. Render Featured (Home Page)
function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    const featured = products.slice(0, 4);
    grid.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <span class="price">${formatPrice(product.price)}</span>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// 6. Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
    alert(`${product.name} added to cart!`);
}

// 7. Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    renderCart();
}

// 8. Update Cart Data
function updateCart() {
    localStorage.setItem('shopCart', JSON.stringify(cart));
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}

// 9. Render Cart Page
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding:20px;'>Your cart is empty. <a href='shop.html' style='color:var(--primary)'>Go Shopping</a></p>";
        totalEl.innerText = "₹0";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="${item.img}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p style="color:var(--text-sec)">${formatPrice(item.price)} x ${item.qty}</p>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');
    totalEl.innerText = formatPrice(total);
}

// 10. Checkout
function checkout() {
    if(cart.length > 0) {
        alert("Thank you for your order! This is a demo.");
        cart = [];
        updateCart();
        renderCart();
    } else {
        alert("Cart is empty!");
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderShop();
    renderFeatured();
    renderCart();
    updateCart();
});