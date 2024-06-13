

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartList = document.getElementById('cart-list'); // Replace with your cart list element ID

function updateCartList() {
  const cartItems = getCartItemsFromLocalStorage();

  cartList.innerHTML = ""; // Clear existing cart list content

  if (cartItems.length === 0) {
    cartList.innerHTML = '<p>Your cart is currently empty.</p>';
    return;
  }

  for (const item of cartItems) {
    // Create cart list item elements with product details and a remove button
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - Price: $${item.price}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeFromCart(item.name);
    });
    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  }
}

function addToCart(productName, price) {
  const cartItems = getCartItemsFromLocalStorage();
  const existingItem = cartItems.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity++; // Increase quantity if product already exists
  } else {
    cartItems.push({ name: productName, price: price, quantity: 1 });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartList();
}

function removeFromCart(productName) {
  const cartItems = getCartItemsFromLocalStorage();
  const updatedCartItems = cartItems.filter(item => item.name !== productName);

  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  updateCartList();
}

function getCartItemsFromLocalStorage() {
  const cartItemsJSON = localStorage.getItem('cartItems');
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

// Call updateCartList on page load to display existing cart items
updateCartList();

addToCartButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    const product = this.closest('.product');
    const productName = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('p').textContent.slice(1)); // Extract price

    addToCart(productName, price);
  });
});
