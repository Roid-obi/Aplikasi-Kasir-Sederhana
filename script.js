// Data Dummy Produk dengan Kategori
const PRODUCTS = [
    // MAKANAN
    { id: 1, name: "Nasi Goreng", price: 22000, category: "makanan" },
    { id: 2, name: "Mie Ayam", price: 18000, category: "makanan" },
    { id: 3, name: "Bakso Urat", price: 20000, category: "makanan" },
    { id: 4, name: "Soto Ayam", price: 17000, category: "makanan" },
    { id: 5, name: "Ayam Goreng", price: 25000, category: "makanan" },
    { id: 6, name: "Pecel Lele", price: 19000, category: "makanan" },

    // MINUMAN
    { id: 7, name: "Es Teh Manis", price: 5000, category: "minuman" },
    { id: 8, name: "Kopi Hitam", price: 6000, category: "minuman" },
    { id: 9, name: "Jus Alpukat", price: 12000, category: "minuman" },
    { id: 10, name: "Air Mineral", price: 3000, category: "minuman" },
    { id: 11, name: "Soda Gembira", price: 10000, category: "minuman" },
    { id: 12, name: "Wedang Jahe", price: 7000, category: "minuman" },

    // TAMBAHAN
    { id: 13, name: "Kerupuk Udang", price: 2000, category: "tambahan" },
    { id: 14, name: "Telur Dadar", price: 5000, category: "tambahan" },
    { id: 15, name: "Acar", price: 1000, category: "tambahan" },
    { id: 16, name: "Sambal Extra", price: 1000, category: "tambahan" },
    { id: 17, name: "Kecap Manis", price: 500, category: "tambahan" },
    { id: 18, name: "Lalapan", price: 2000, category: "tambahan" }
];

// Konstanta LocalStorage
const LS_CART_KEY = 'simple_pos_cart';

// Elemen DOM
const $productList = document.getElementById('product-list');
const $cartItems = document.getElementById('cart-items');
const $subtotal = document.getElementById('subtotal');
const $taxAmount = document.getElementById('tax-amount');
const $grandTotal = document.getElementById('grand-total');
const $checkoutBtn = document.getElementById('checkout-btn');
const $clearCartBtn = document.getElementById('clear-cart-btn');
const $receiptModal = document.getElementById('receipt-modal');
const $receiptBody = document.getElementById('receipt-body');
const $closeBtn = document.querySelector('.close-btn');

// State
let cart = [];
let currentCategory = 'all'; // 'all', 'makanan', 'minuman', 'tambahan'

// Utility: Format Rupiah
const currency = (n) => "Rp " + Number(n).toLocaleString("id-ID");

// LocalStorage
function getCartFromLS() {
    const data = localStorage.getItem(LS_CART_KEY);
    return data ? JSON.parse(data) : [];
}

function saveCartToLS() {
    localStorage.setItem(LS_CART_KEY, JSON.stringify(cart));
}

// Render Produk berdasarkan kategori
function renderProducts() {
    const filteredProducts = currentCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === currentCategory);

    $productList.innerHTML = filteredProducts.map(p => `
        <div class="product-card" data-id="${p.id}">
            ${p.name}
            <span>${currency(p.price)}</span>
        </div>
    `).join('');
}

// Render Keranjang
function renderCart() {
    $cartItems.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        $cartItems.innerHTML = '<li style="text-align: center; color: #999;">Keranjang kosong.</li>';
    } else {
        cart.forEach(item => {
            const totalItemPrice = item.price * item.qty;
            subtotal += totalItemPrice;

            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div>${item.name}</div>
                <div class="cart-qty">
                    ${currency(item.price)} x ${item.qty} = 
                    <span style="font-weight: bold;">${currency(totalItemPrice)}</span>
                    <button class="remove-btn" data-id="${item.id}">X</button>
                </div>
            `;
            $cartItems.appendChild(li);
        });
    }

    const taxRate = 0.10;
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;

    $subtotal.textContent = currency(subtotal);
    $taxAmount.textContent = currency(tax);
    $grandTotal.textContent = currency(grandTotal);
    $checkoutBtn.disabled = cart.length === 0;

    saveCartToLS();
}

// Render Struk
function renderReceipt() {
    if (cart.length === 0) return;

    const taxRate = 0.10;
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let tax = subtotal * taxRate;
    let grandTotal = subtotal + tax;

    let receiptContent = `
========================================
           TOKO MAJU MAKMUR
       Aplikasi Kasir Sederhana
========================================
Tanggal: ${new Date().toLocaleDateString('id-ID')}
Waktu:   ${new Date().toLocaleTimeString('id-ID')}
----------------------------------------
ITEM | QTY | HARGA SATUAN | TOTAL
----------------------------------------
`;

    cart.forEach(item => {
        const totalItemPrice = item.price * item.qty;
        const itemName = item.name.padEnd(10, ' ').substring(0, 10);
        const qtyStr = String(item.qty).padStart(3, ' ');
        const priceStr = String(item.price).padStart(12, ' ');
        const totalStr = String(totalItemPrice).padStart(7, ' ');

        receiptContent += `${itemName} |${qtyStr} |${priceStr} |${totalStr}\n`;
    });

    receiptContent += `
----------------------------------------
Subtotal:       ${currency(subtotal).padStart(15, ' ')}
Pajak (10%):    ${currency(tax).padStart(15, ' ')}
----------------------------------------
**GRAND TOTAL:** ${currency(grandTotal).padStart(15, ' ')}
========================================
`;

    $receiptBody.textContent = receiptContent;
    $receiptModal.style.display = 'block';
}

// Logika Keranjang
function addItemToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }
    renderCart();
}

function removeItemFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        if (cart[index].qty > 1) {
            cart[index].qty -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

// Event Listeners
$productList.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card) {
        const productId = Number(card.dataset.id);
        addItemToCart(productId);
    }
});

$cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const productId = Number(e.target.dataset.id);
        removeItemFromCart(productId);
    }
});

$clearCartBtn.addEventListener('click', clearCart);

$checkoutBtn.addEventListener('click', () => {
    renderReceipt();
    // Opsional: clearCart() setelah checkout
});

$closeBtn.addEventListener('click', () => {
    $receiptModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === $receiptModal) {
        $receiptModal.style.display = 'none';
    }
});

// Filter Kategori
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderProducts();
    });
});

// Inisialisasi
(function init() {
    cart = getCartFromLS();
    renderProducts();
    renderCart();
})();