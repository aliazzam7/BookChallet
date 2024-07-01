<?php
header('Content-Type: application/json');
require_once 'db_connection.php'; // Assuming db_connection.php includes your MySQLi connection code

// Validate and process form data

    // Handle form data
    $name = $_POST['name'] ?? 'test';
    $location = $_POST['Location'] ?? 'test';
    $date = $_POST['date'] ?? 'test';

    // Validate input data (add your own validation as needed)

    // Create MySQLi connection (assuming db_connection.php sets up $conn)
    if (!$conn) {
        $response = [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
        echo json_encode($response);
        exit;
    }

    // Prepare INSERT statement
    $stmt = $conn->prepare("INSERT INTO chalet (name, location, date, host_id) VALUES (?, ?, ?, ?)");
    $host_id = "1"; // Assuming host_id is a string
    $stmt->bind_param("sssi", $name, $location, $date, $host_id);
    // Execute statement
    if ($stmt->execute()) {
        // Return success response
        $response = [
            'status' => 'success',
            'message' => 'Chalet created successfully. '
        ];
    } else {
        // Return error response
        $response = [
            'status' => 'error',
            'message' => 'Failed to create chalet: ' . $conn->error
        ];
    }

    echo json_encode($response);

    // Close statement and connection
    $stmt->close();
    $conn->close();

?>
