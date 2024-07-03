document.addEventListener('DOMContentLoaded', () => {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    const cart = JSON.parse(localStorage.getItem('receiptCart'));

    if (!orderDetails || !cart) {
        console.error('Order details or cart not found.');
        return;
    }

    document.getElementById('customer-name').textContent = `Name: ${orderDetails.name}`;
    document.getElementById('customer-address').textContent = `Address: ${orderDetails.address}`;
    document.getElementById('customer-phone').textContent = `Phone: ${orderDetails.phone}`;
    document.getElementById('customer-date').textContent = `Delivery Date: ${orderDetails.date}`;

    const receiptItems = document.getElementById('receipt-items');
    const receiptTotalPrice = document.getElementById('receipt-total-price');
    receiptItems.innerHTML = '';
    let total = 0;

    for (const [item, { price, quantity }] of Object.entries(cart)) {
        const li = document.createElement('li');
        const value = price * quantity;
        total += value;
        li.textContent = `${item} - $${price.toFixed(2)} x ${quantity} = $${value.toFixed(2)}`;
        receiptItems.appendChild(li);
    }

    receiptTotalPrice.textContent = `Total: $${total.toFixed(2)}`;
});

function goToHome() {
    window.location.href = 'index.html';
}