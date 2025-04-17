<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "agritruck";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$action = $_POST['action'] ?? null;

switch ($action) {
  case 'add':
    $product_id = $_POST['product_id'];
    $logistic_id = $_POST['logistic_id'];
    $name = $_POST['name'];
    $delivery_date = $_POST['delivery_date'];
    $stmt = $conn->prepare("INSERT INTO logistics (product_id, logistic_id, name, delivery_date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $product_id, $logistic_id, $name, $delivery_date);
    $stmt->execute();
    echo "Inserted";
    break;

  case 'delete':
    $id = $_POST['id'];
    $stmt = $conn->prepare("DELETE FROM logistics WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo "Deleted";
    break;

  case 'edit':
    $id = $_POST['id'];
    $product_id = $_POST['product_id'];
    $logistic_id = $_POST['logistic_id'];
    $name = $_POST['name'];
    $delivery_date = $_POST['delivery_date'];
    $stmt = $conn->prepare("UPDATE logistics SET product_id=?, logistic_id=?, name=?, delivery_date=? WHERE id=?");
    $stmt->bind_param("ssssi", $product_id, $logistic_id, $name, $delivery_date, $id);
    $stmt->execute();
    echo "Updated";
    break;

  case 'search':
    $search = "%" . $_POST['search'] . "%";
    $stmt = $conn->prepare("SELECT * FROM logistics WHERE name LIKE ?");
    $stmt->bind_param("s", $search);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    echo json_encode($data);
    break;

  default:
    // Fetch all records
    $result = $conn->query("SELECT * FROM logistics");
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    echo json_encode($data);
    break;
}

$conn->close();
?>