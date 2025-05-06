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