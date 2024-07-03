<?php
// Assuming you have a database connection established in db_connection.php
require_once 'db_connection.php';

// Check if the ID and password parameters are set in the query string
if (isset($_GET['id']) && isset($_GET['password'])) {
    $userId = $_GET['id'];
    $newPassword = $_GET['password'];

    // Prepare an UPDATE statement to update the user's password
    $stmt = $conn->prepare("UPDATE user SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $newPassword, $userId);

    // Execute the statement
    if ($stmt->execute()) {
        // Return success response
        echo json_encode(['success' => true, 'message' => 'User password updated successfully']);
    } else {
        // Return error response
        echo json_encode(['success' => false, 'message' => 'Error updating user password']);
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // Return error response if ID or password parameters are not provided
    echo json_encode(['success' => false, 'message' => 'User ID or password not provided']);
}
?>
