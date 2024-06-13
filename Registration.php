<?php

include 'configuration.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $username = $_POST['username_reg'];
  $password = $_POST['password_reg'];
  $confirmPassword = $_POST['confirm_password'];

  // Validation (optional but recommended)
  if (empty($name) || empty($email) || empty($username) || empty($password) || empty($confirmPassword)) {
    echo "Please fill out all required fields.";
  } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format.";
  } else if ($password != $confirmPassword) {
    echo "Passwords do not match.";
  } else {
    // Hash password before storing
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO Customers (name, email, username, password) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $username, $hashed_password);

    if (mysqli_stmt_execute($stmt)) {
      echo "Registration successful! Please login.";
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
  }

  mysqli_close($conn);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chifamba Chickens - Register</title>
  <link rel="stylesheet" href="LoginAndRegStyle.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
  <script src="LoginAndRegJavaScript.js"></script>
</head>
<body>
  <main>
    <section class="login-register">
      <div class="container">
        <h2>Register</h2>
        <form action="" method="post">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="username_reg">Username:</label>
            <input type="text" id="username_reg" name="username_reg" placeholder="Enter desired username" required>
          </div>
          <div class.form-group>
            <label for="password_reg">Password:</label>
            <input type="password" id="password_reg" name="password_reg" placeholder="Enter password" required>
          </div>
          <div class="form-group">
            <label for="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm password" required>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </section>
  </main>

</body>
</html>