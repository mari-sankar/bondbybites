let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(item, price) {
    if (cart[item]) {
        cart[item].quantity += 1;
    } else {
        cart[item] = { price, quantity: 1 };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function goToCart() {
    window.location.href = 'cartpage.html';
}