let cart = {};

function addToCart(item, price) {
    if (cart[item]) {
        cart[item].quantity += 1;
    } else {
        cart[item] = { price, quantity: 1 };
    }
    renderCart();
}

function removeFromCart(item) {
    if (cart[item].quantity > 1) {
        cart[item].quantity -= 1;
    } else {
        delete cart[item];
    }
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const popupCartItems = document.getElementById('popup-cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0; 

    cartItems.innerHTML = '';
    popupCartItems.innerHTML = '';

    for (const [item, { price, quantity }] of Object.entries(cart)) {
        const li = document.createElement('li');
        value=price*quantity;
        total += value;
        li.innerHTML = `
            ${item} - $${price.toFixed(2)} x ${quantity} = ${value}
            <div class="quantity-controls">
                <button onclick="removeFromCart('${item}')">-</button>
                <button onclick="addToCart('${item}', ${price})">+</button>
            </div>
        `;
        cartItems.appendChild(li);

        const popupLi = document.createElement('li');
        popupLi.textContent = `${item} - ${quantity}`;
        popupCartItems.appendChild(popupLi);
    }
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function placeOrder() {
    if (Object.keys(cart).length === 0) {
        showNotification('Please choose a product.');
        setTimeout(hideNotification, 3000);
        goToMenu();
    } else {
        document.getElementById('cart').classList.remove('active');
        document.getElementById('order-form').classList.add('active');
    }
}

function goToCart() {
    document.getElementById('menu').classList.remove('active');
    document.getElementById('cart').classList.add('active');
    document.getElementById('order-form').classList.remove('active');
    document.getElementById('receipt').classList.remove('active');
}

function goToMenu() {
    document.getElementById('cart').classList.remove('active');
    document.getElementById('menu').classList.add('active');
    document.getElementById('order-form').classList.remove('active');
    document.getElementById('receipt').classList.remove('active');
}

function toggleCartPopup() {
    let cartPopup = document.getElementById('cart-popup');
    if (cartPopup.style.display === 'block') {
        cartPopup.style.display = 'none';
    } else {
        cartPopup.style.display = 'block';
        document.addEventListener('click', closeCartPopupOnClickOutside);
    }
}

function closeCartPopupOnClickOutside(event) {
    let cartPopup = document.getElementById('cart-popup');
    if (!cartPopup.contains(event.target) && event.target.id !== 'cart-icon') {
        cartPopup.style.display = 'none';
        document.removeEventListener('click', closeCartPopupOnClickOutside);
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

function showReceipt() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('delivery-date').value;

    if (!name || !address || !phone || !date) {
        showNotification('Please fill in all the details.');
        setTimeout(hideNotification, 3000);
        return;
    }

    document.getElementById('receipt-name').textContent = `Name: ${name}`;
    document.getElementById('receipt-address').textContent = `Address: ${address}`;
    document.getElementById('receipt-phone').textContent = `Phone: ${phone}`;
    document.getElementById('receipt-date').textContent = `Delivery Date: ${date}`;

    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total');
    receiptItems.innerHTML = '';
    let total = 0;

    for (const [item, { price, quantity }] of Object.entries(cart)) {
        const li = document.createElement('li');
        const value = price * quantity;
        total += value;
        li.textContent = `${item} - $${price.toFixed(2)} x ${quantity} = $${value.toFixed(2)}`;
        receiptItems.appendChild(li);
    }

    receiptTotal.textContent = `Total: $${total.toFixed(2)}`;

    cart = {};

    document.getElementById('order-form').classList.remove('active');
    document.getElementById('receipt').classList.add('active');
}