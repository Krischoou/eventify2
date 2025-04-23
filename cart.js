let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Обновява визуално количката
function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((product, index) => {
    const itemTotal = product.price * product.quantity;
    total += itemTotal;

    const item = document.createElement('div');
    item.classList.add('cart-item');

    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="cart-img">
      <div class="cart-details">
        <h4>${product.title}</h4>
        <p>Единична цена: ${product.price.toFixed(2)} лв</p>
        <label>Количество:
          <input type="number" class="quantity-input" data-index="${index}" min="1" value="${product.quantity}">
        </label>
        <p>Общо: <span class="item-total">${itemTotal.toFixed(2)}</span> лв</p>
      </div>
      <button class="remove-btn" data-index="${index}">&times;</button>
    `;

    cartItemsContainer.appendChild(item);
  });

  totalPriceElement.textContent = total.toFixed(2);
  saveCart();
  setupEventListeners();
}

// Промяна на количества и премахване
function setupEventListeners() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      cart.splice(index, 1);
      updateCartDisplay();
    });
  });

  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', () => {
      const index = input.getAttribute('data-index');
      const newQuantity = parseInt(input.value);
      if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        updateCartDisplay();
      }
    });
  });
}

// Запазване в localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Продължи с поръчката
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        window.location.href = 'checkout.html';
      } else {
        alert('Количката е празна.');
      }
    });
  }
});
