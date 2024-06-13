const loginBtn = document.querySelector('.nav-tabs li:nth-child(1) a');
const registerBtn = document.querySelector('.nav-tabs li:nth-child(2) a');
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');

loginBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default tab switch behavior (if using a framework)
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
});

registerBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default tab switch behavior (if using a framework)
  loginForm.classList.remove('active');
  registerForm.classList.add('active');
});

// Basic form validation (optional)
loginForm.addEventListener('submit', function(event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Implement validation logic for username and password (e.g., empty fields)
  if (username === '' || password === '') {
    event.preventDefault(); // Prevent form submission if validation fails
    alert('Please fill in all required fields.');
  }
});

// Similar validation logic can be implemented for the registration form