// Initialize cart data
let cart = [];

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: this.getAttribute('data-product'),
            price: parseFloat(this.getAttribute('data-price'))
        };
        addToCart(product);
    });
});

// Add item to cart
function addToCart(product) {
    cart.push(product);
    updateCartCount();
    saveCart();
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage on page load
window.onload = function() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        displayCartItems();
    }
};

// Display cart items on the cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `<p>${item.name} - $${item.price}</p>`;
        cartItemsContainer.appendChild(div);
        total += item.price;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Checkout button functionality
document.getElementById('checkout-btn')?.addEventListener('click', function() {
    alert('Proceeding to checkout!');
    // Clear the cart on checkout
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    displayCartItems();
});
