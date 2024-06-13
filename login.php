<?php

include 'configuration.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM Customers WHERE username = ?";
  $stmt = mysqli_prepare($conn, $sql);

  mysqli_stmt_bind_param($stmt, "s", $username);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $hashed_password = $row['password'];

    if (password_verify($password, $hashed_password)) {
      $_SESSION['user_id'] = $row['customer_id'];
      $_SESSION['username'] = $username;
      header("Location: welcome.php");
    } else {
      echo "Invalid username or password";
    }
  } else {
    echo "Invalid username or password";
  }

  mysqli_stmt_close($stmt);
  mysqli_close($conn);
}

?>

