<?php
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $location = $_POST['Location'];
    $date = $_POST['date'];

    // Validate and sanitize input as needed

    $sql = "INSERT INTO chalet (name, location, date) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $name, $location, $date);
    
    if ($stmt->execute()) {
        echo 'Chalet saved successfully.';
    } else {
        echo 'Error saving chalet: ' . $conn->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo 'Method not allowed.';
}
?>
