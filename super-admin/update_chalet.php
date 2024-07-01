<?php
require_once 'db_connection.php'; // Include your database connection file

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate the input data
if (isset($data['chaletId'], $data['name'], $data['location'], $data['date'])) {
    $chaletId = $data['chaletId'];
    $name = $data['name'];
    $location = $data['location'];
    $date = $data['date'];

    // Prepare an update statement
    $stmt = $conn->prepare("UPDATE chalet SET name = ?, location = ?, date = ? WHERE id = ?");
    $stmt->bind_param('sssi', $name, $location, $date, $chaletId);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}

$conn->close();
?>
