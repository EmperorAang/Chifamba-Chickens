const cartList = document.getElementById('cart-list');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartSummary = document.querySelector('.cart-summary');
const subtotalAmount = document.getElementById('subtotal-amount');
const shippingAmount = document.getElementById('shipping-amount');
const totalAmount = document.getElementById('total-amount');

function updateCartList() {
  const cartItems = getCartItemsFromLocalStorage();

  cartList.innerHTML = ""; // Clear existing cart list content

  if (cartItems.length === 0) {
    emptyCartMessage.style.display = 'block';
    cartSummary.style.display = 'none';
    return;
  }

  emptyCartMessage.style.display = 'none';
  cartSummary.style.display = 'block';

  let subtotal = 0;
  for (const item of cartItems) {
    // Create cart list item elements with product details and a remove button
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - Price: $${item.price.toFixed(2)}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeFromCart(item.name);
    });
    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);

    subtotal += item.price;
  }

  subtotalAmount.textContent = subtotal.toFixed(2);
  calculateTotal(); // Call function to calculate total with shipping (if applicable)
}

function calculateTotal() {
  // Implement logic to calculate shipping cost based on your requirements (e.g., free shipping above a certain amount)
  const shippingCost = 0.00; // Replace with your shipping cost calculation

  const total = subtotal + shippingCost;
  shippingAmount.textContent = shippingCost.toFixed(2);
  totalAmount.textContent = total.toFixed(2);
}

function getCartItemsFromLocalStorage() {
  const cartItemsJSON = localStorage.getItem('cartItems');
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

// Call updateCartList on page load to display cart items and update summary
updateCartList();
