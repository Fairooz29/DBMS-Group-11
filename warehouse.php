<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warehouse Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; }
        .sidebar { width: 220px; height: 100vh; background-color: #0077b6; color: white; padding: 20px; }
        .main-content { margin-left: 260px; padding: 20px; flex-grow: 1; }
        .top-cards { display: flex; gap: 20px; margin-bottom: 20px; }
        .card { flex: 1; background: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #3498db; color: white; }
        button { padding: 8px 15px; cursor: pointer; border: none; border-radius: 4px; }
        button:hover { opacity: 0.9; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center; }
        .modal-content { background: white; padding: 20px; border-radius: 5px; width: 90%; max-width: 500px; }
        input, select { padding: 8px; margin: 5px 0; width: 100%; box-sizing: border-box; }
        .close { float: right; cursor: pointer; font-size: 20px; }
        .edit-btn { background-color: #f39c12; color: white; }
        .delete-btn { background-color: #e74c3c; color: white; }
        #save-btn { background-color: #2ecc71; color: white; }
        #update-btn { background-color: #f39c12; color: white; }
        /* style.css - With Agricultural Icons */
/* ... (keep all your existing styles) ... */

/* Add icons to navigation menu */
.nav > li:nth-child(1) > a::before { content: '🌾'; margin-right: 8px; } /* Crop */
.nav > li:nth-child(2) > a::before { content: '👨‍🌾'; margin-right: 8px; } /* Consumer */
.nav > li:nth-child(3) > a::before { content: '🏭'; margin-right: 8px; } /* Real Time Supply */
.nav > li:nth-child(4) > a::before { content: '📈'; margin-right: 8px; } /* Trends */
.nav > li:nth-child(5) > a::before { content: '📊'; margin-right: 8px; } /* Analytics */
.nav > li:nth-child(6) > a::before { content: '💡'; margin-right: 8px; } /* Recommendations */
.nav > li:nth-child(7) > a::before { content: '📋'; margin-right: 8px; } /* Directory */

/* Add icons to buttons */
button[onclick*="logistics"]::before { content: '🚚'; margin-right: 8px; }
button[onclick*="inventory"]::before { content: '📦'; margin-right: 8px; }
button[onclick*="storage"]::before { content: '🏠'; margin-right: 8px; }

/* Add icons to table headers */
th:nth-child(1)::before { content: '📋'; margin-right: 8px; } /* Stage */
th:nth-child(2)::before { content: '🆔'; margin-right: 8px; } /* Crop ID */
th:nth-child(3)::before { content: '🌽'; margin-right: 8px; } /* Crop Name */
th:nth-child(4)::before { content: '📍'; margin-right: 8px; } /* Location */
th:nth-child(5)::before { content: '📅'; margin-right: 8px; } /* Date */
th:nth-child(6)::before { content: '🔢'; margin-right: 8px; } /* Quantity */

/* Add icons to action buttons */
.edit-btn::before { content: '✏️'; margin-right: 5px; }
.delete-btn::before { content: '🗑️'; margin-right: 5px; }
#save-btn::before { content: '💾'; margin-right: 5px; }
#update-btn::before { content: '🔄'; margin-right: 5px; }

/* Custom CSS icons for form fields */
label[for="crop-id"]::before { content: '🌱'; margin-right: 5px; }
label[for="details"]::before { content: '📍'; margin-right: 5px; }
label[for="date"]::before { content: '📅'; margin-right: 5px; }
label[for="qty"]::before { content: '🔢'; margin-right: 5px; }

/* Decorative vegetable corner accents */
.main-content::before {
  content: '🌽🥕🍆🥦🍅';
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 24px;
  opacity: 0.2;
  z-index: -1;
}

/* Status indicators using CSS and emoji */
.card:nth-child(1)::before { content: '💰'; margin-right: 8px; } /* Sales */
.card:nth-child(2)::before { content: '📊'; margin-right: 8px; } /* Stock */
.card:nth-child(3)::before { content: '📥'; margin-right: 8px; } /* Inbound */
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>AgriTruck</h2>
        <ul class="nav">
            <li class="dropdown">
                <a href="#">Crop ▾</a>
                <ul class="submenu">
                    <li><a href="crop.html">Crop Info</a></li>
                    <li><a href="historical_data.html">Data</a></li>
                </ul>
            </li>
            <li><a href="consumer.html">Consumer</a></li>
            <li><a href="warehouse.html">Real Time Supply</a></li>
            <li><a href="trends.html">Trends</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Recommendations</a></li>
            <li><a href="#">Directory</a></li>
        </ul>
    </div>

    <div class="main-content">
        <div class="top-cards">
            <div class="card">Sales: <strong id="sales-count">0</strong></div>
            <div class="card">Stock: <strong id="stock-count">0</strong></div>
            <div class="card">Inbound: <strong id="inbound-count">0</strong></div>
        </div>

        <div class="tabs">
            <div>
                <button onclick="openModal('logistics')">Add Logistics</button>
                <button onclick="openModal('inventory')">Add Inventory</button>
                <button onclick="openModal('storage')">Add Storage</button>
            </div>
            <input type="text" id="searchInput" placeholder="Search table..." onkeyup="searchTable()">
        </div>

        <h2>Real-time supply Data</h2>
        <table>
            <thead>
                <tr>
                    <th>Stage</th>
                    <th>Crop ID</th>
                    <th>Crop Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="data-table">
                <?php
                // Database connection
                $conn = new mysqli("localhost", "root", "", "agritruck");
                
                if ($conn->connect_error) {
                    die("<tr><td colspan='7'>Connection failed: " . $conn->connect_error . "</td></tr>");
                }
                
                // Load data from warehouse table
                $sql = "SELECT warehouseId as id, stage, CropId as crop_id, CropName as crop_name, 
                        date, quantity, details FROM warehouse ORDER BY warehouseId DESC";
                $result = $conn->query($sql);
                
                // Initialize counters
                $salesCount = 0;
                $stockCount = 0;
                $inboundCount = 0;
                
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        // Update counters based on stage
                        if ($row['stage'] === 'logistics') $salesCount++;
                        elseif ($row['stage'] === 'inventory') $stockCount++;
                        elseif ($row['stage'] === 'storage') $inboundCount++;
                        
                        echo "<tr data-id='".$row['id']."'>
                            <td>".htmlspecialchars($row['stage'])."</td>
                            <td>".($row['crop_id'] ? htmlspecialchars($row['crop_id']) : '-')."</td>
                            <td>".($row['crop_name'] ? htmlspecialchars($row['crop_name']) : '-')."</td>
                            <td>".htmlspecialchars($row['details'])."</td>
                            <td>".htmlspecialchars($row['date'])."</td>
                            <td>".htmlspecialchars($row['quantity'])."</td>
                            <td>
                                <button class='edit-btn' onclick=\"openModal('".$row['stage']."', this.closest('tr'))\">Edit</button>
                                <button class='delete-btn' onclick=\"deleteEntry(this)\">Delete</button>
                            </td>
                        </tr>";
                    }
                } else {
                    echo "<tr><td colspan='7'>No data found in warehouse</td></tr>";
                }
                
                // Close connection
                $conn->close();
                ?>
            </tbody>
        </table>
        <script>
            // Update counts with PHP values
            document.getElementById('sales-count').textContent = <?php echo $salesCount; ?>;
            document.getElementById('stock-count').textContent = <?php echo $stockCount; ?>;
            document.getElementById('inbound-count').textContent = <?php echo $inboundCount; ?>;
        </script>
    </div>

    <!-- Modal -->
    <div class="modal" id="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h3 id="modal-title">Add Data</h3>
            <div id="form-fields"></div>
            <button id="save-btn" onclick="processForm('save')">Save</button>
            <button id="update-btn" onclick="processForm('update')" style="display: none;">Update</button>
        </div>
    </div>

    <?php
    // Handle form submissions
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $conn = new mysqli("localhost", "root", "", "agritruck");
        
        if ($conn->connect_error) {
            die(json_encode(["status" => "error", "message" => "Connection failed"]));
        }
        
        // Temporarily disable foreign key checks
        $conn->query("SET FOREIGN_KEY_CHECKS=0");
        
        $action = $_POST['action'] ?? '';
        $id = $_POST['id'] ?? 0;
        $stage = $_POST['stage'] ?? '';
        $crop_id = isset($_POST['crop_id']) && $_POST['crop_id'] !== '' ? $_POST['crop_id'] : NULL;
        $crop_name = isset($_POST['crop_name']) && $_POST['crop_name'] !== '' ? $_POST['crop_name'] : NULL;
        $date = $_POST['date'] ?? '';
        $qty = $_POST['qty'] ?? 0;
        $details = $_POST['details'] ?? '';
        
        // For storage entries, explicitly set crop_id and crop_name to NULL
        if ($stage === 'storage') {
            $crop_id = NULL;
            $crop_name = NULL;
        }
        
        // For logistics and inventory, validate crop exists if crop_id is provided
        if (($stage === 'logistics' || $stage === 'inventory') && $crop_id !== NULL) {
            $checkSql = "SELECT CropId, CropName FROM crop WHERE CropId = ?";
            $checkStmt = $conn->prepare($checkSql);
            $checkStmt->bind_param("i", $crop_id);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();
            
            if ($checkResult->num_rows === 0) {
                $conn->query("SET FOREIGN_KEY_CHECKS=1");
                die("<script>alert('Error: The specified Crop ID does not exist in our system.'); window.history.back();</script>");
            }
            
            // Get the crop name from database
            $cropData = $checkResult->fetch_assoc();
            $crop_name = $cropData['CropName'];
            $checkStmt->close();
        }
        
        if ($action === 'save') {
            $sql = "INSERT INTO warehouse (stage, CropId, CropName, date, quantity, details)
                    VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sisssi", $stage, $crop_id, $crop_name, $date, $qty, $details);
        } 
        elseif ($action === 'update') {
            $sql = "UPDATE warehouse SET stage=?, CropId=?, CropName=?, date=?, quantity=?, details=? 
                    WHERE warehouseId=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sisssii", $stage, $crop_id, $crop_name, $date, $qty, $details, $id);
        }
        elseif ($action === 'delete') {
            $sql = "DELETE FROM warehouse WHERE warehouseId=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
        }
        
        if ($stmt->execute()) {
            echo "<script>alert('Operation successful!'); window.location.href = window.location.href;</script>";
        } else {
            $errorMsg = $stmt->error;
            echo "<script>alert('Error: " . addslashes($errorMsg) . "'); window.history.back();</script>";
        }
        
        // Re-enable foreign key checks
        $conn->query("SET FOREIGN_KEY_CHECKS=1");
        
        $stmt->close();
        $conn->close();
        exit;
    }
    ?>