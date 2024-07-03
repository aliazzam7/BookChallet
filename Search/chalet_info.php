<?php
require_once 'db_connection.php';

if (!isset($_GET['chalet_id'])) {
    echo "Chalet ID not provided.";
    exit;
}

$chalet_id = intval($_GET['chalet_id']);

$sql = "SELECT * FROM chalet WHERE id = $chalet_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $chalet = $result->fetch_assoc();
} else {
    echo "Chalet not found.";
    exit;
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chalet Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .chalet-image {
            max-width: 100%;
            height: auto;
            margin-bottom: 20px;
        }
        .chalet-info {
            margin-bottom: 10px;
        }
        .chalet-info label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Chalet Information</h1>
    <?php if (!empty($chalet['image'])): ?>
        <img src="<?php echo htmlspecialchars($chalet['image']); ?>" alt="Chalet Image" class="chalet-image">
    <?php endif; ?>

    <div class="chalet-info">
        <label>Name:</label>
        <p><?php echo htmlspecialchars($chalet['name']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Location:</label>
        <p><?php echo htmlspecialchars($chalet['location']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Price:</label>
        <p><?php echo htmlspecialchars($chalet['price']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Date:</label>
        <p><?php echo htmlspecialchars($chalet['date']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Description:</label>
        <p><?php echo htmlspecialchars($chalet['description']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Host ID:</label>
        <p><?php echo htmlspecialchars($chalet['host_id']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Number of Bedrooms:</label>
        <p><?php echo htmlspecialchars($chalet['numOf_bedrooms']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Number of Guests:</label>
        <p><?php echo htmlspecialchars($chalet['numOf_guests']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Number of Baths:</label>
        <p><?php echo htmlspecialchars($chalet['numOf_baths']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Number of Beds:</label>
        <p><?php echo htmlspecialchars($chalet['numOf_beds']); ?></p>
    </div>

    <div class="chalet-info">
        <label>Start Time:</label>
        <p><?php echo htmlspecialchars($chalet['start_time']); ?></p>
    </div>

    <div class="chalet-info">
        <label>End Time:</label>
        <p><?php echo htmlspecialchars($chalet['end_time']); ?></p>
    </div>
</div>

</body>
</html>
