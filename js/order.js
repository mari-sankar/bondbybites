let cart = JSON.parse(localStorage.getItem('cart')) || {};

function showReceipt() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('delivery-date').value;

    if (!name || !address || !phone || !date) {
        showNotification();
        setTimeout(hideNotification, 3000);
        return;
    }

    localStorage.setItem('orderDetails', JSON.stringify({ name, address, phone, date }));
    localStorage.setItem('receiptCart', JSON.stringify(cart));

    cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = 'receiptpage.html';
}

function goToCart() {
    window.location.href = 'cartpage.html';
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
