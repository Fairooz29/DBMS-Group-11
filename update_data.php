<?php
$host = 'localhost';
$user = 'root';
$password = '';
$db = 'warehouse_db';

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id']; // Row ID from database
$stage = $_POST['stage'];
$product_id = $_POST['product_id'];
$name = $_POST['name'];
$humidity = $_POST['humidity'];
$date = $_POST['date'];
$qty = $_POST['qty'];
$details = $_POST['details'];

$sql = "UPDATE supply_data 
        SET stage=?, product_id=?, product_name=?, humidity=?, date=?, quantity=?, details=?
        WHERE id=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssisi", $stage, $product_id, $name, $humidity, $date, $qty, $details, $id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
