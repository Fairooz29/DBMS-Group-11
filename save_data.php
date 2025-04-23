<?php
$host = 'localhost';
$user = 'root';
$password = '';
$db = 'warehouse_db';

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stage = $_POST['stage'];
$product_id = $_POST['product_id'];
$name = $_POST['name'];
$humidity = $_POST['humidity'];
$date = $_POST['date'];
$qty = $_POST['qty'];
$details = $_POST['details'];

$sql = "INSERT INTO supply_data (stage, product_id, product_name, humidity, date, quantity, details)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssis", $stage, $product_id, $name, $humidity, $date, $qty, $details);
if ($stmt->execute()) {
    echo "success";
} else {
    echo "error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
