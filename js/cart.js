let cart = JSON.parse(localStorage.getItem('cart')) || {};

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    cartItems.innerHTML = '';

    for (const [item, { price, quantity }] of Object.entries(cart)) {
        const li = document.createElement('li');
        const value = price * quantity;
        total += value;
        li.innerHTML = `
            ${item} - $${price.toFixed(2)} x ${quantity} = $${value.toFixed(2)}
            <div class="quantity-controls">
                <button class="quantity-d" onclick="removeFromCart('${item}')">-</button>
                <button class="quantity-i" onclick="addToCart('${item}', ${price})">+</button>
            </div>
        `;
        cartItems.appendChild(li);
    }
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function addToCart(item, price) {
    if (cart[item]) {
        cart[item].quantity += 1;
    } else {
        cart[item] = { price, quantity: 1 };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(item) {
    if (cart[item].quantity > 1) {
        cart[item].quantity -= 1;
    } else {
        delete cart[item];
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function placeOrder() {
    if (Object.keys(cart).length === 0) {
        showNotification();
        setTimeout(hideNotification, 3000);
        return;
    }
    window.location.href = 'error.html';
}

function goToMenu() {
    window.location.href = 'menupage.html';
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', renderCart);