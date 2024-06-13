const quantityInput = document.querySelector('.price-cart input[name="quantity"]');
const addButton = document.querySelector('.price-cart button');

addButton.addEventListener('click', function(event) {
  const quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
  }
  event.preventDefault(); // Prevent default form submission if using a button within a form
});

quantityInput.addEventListener('change', function() {
  const value = parseInt(quantityInput.value);
  if (value < 1) {
    quantityInput.value = 1;
  }
});

const variationsSelect = document.querySelector('.product-variations select');

if (variationsSelect) {
  variationsSelect.addEventListener('change', function() {
    const selectedVariation = this.value;
    const productDetails = document.querySelector('.product-info');

    // Fetch product data based on selected variation (replace with your logic)
    const variationData = getVariationData(selectedVariation);

    if (variationData) {
      // Update product details (replace selectors with your actual elements)
      productDetails.querySelector('.price').textContent = `$${variationData.price}`;
      productDetails.querySelector('.product-image img').src = variationData.imageUrl;
      // Update other details as needed (e.g., stock availability)
    }
  });
}

// This function needs to be implemented based on your data storage (replace with your logic)
function getVariationData(variationId) {
  // Simulate fetching data from a database or API
  const variations = {
    "variation-1": {
      price: 14.99,
      imageUrl: "images/chicken-breast-bone-in.jpg"
    },
    "variation-2": {
      price: 12.99,
      imageUrl: "images/chicken-breast-boneless.jpg"
    }
  };
  return variations[variationId];
}

const productImageContainer = document.querySelector('.product-image');
const imageThumbs = document.querySelectorAll('.product-thumbnails img');

if (imageThumbs.length > 1) { // Check if there are multiple images
  const mainImage = productImageContainer.querySelector('img');

  imageThumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      mainImage.src = this.src;
      imageThumbs.forEach(thumb => thumb.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
