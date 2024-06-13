const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', function(event) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');

  let errorMessage = "";

  if (nameInput.value.trim() === "") {
    errorMessage = "Please enter your name.";
  } else if (emailInput.value.trim() === "") {
    errorMessage = "Please enter your email address.";
  } else if (!isEmailValid(emailInput.value)) {
    errorMessage = "Please enter a valid email address.";
  } else if (messageInput.value.trim() === "") {
    errorMessage = "Please enter a message.";
  }

  if (errorMessage !== "") {
    alert(errorMessage);
    event.preventDefault(); // Prevent form submission if there's an error
  }
});

function isEmailValid(email) {
  // Basic regex to check for a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
