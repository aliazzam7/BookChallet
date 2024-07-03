<?php
// Assuming you have a database connection established in db_connection.php
require_once 'db_connection.php';

// Check if the ID parameter is set in the query string
if (isset($_GET['id'])) {
    $userId = $_GET['id'];

    // Prepare a DELETE statement to delete the user with the specified ID
    $stmt = $conn->prepare("DELETE FROM user WHERE id = ?");
    $stmt->bind_param("i", $userId);

    // Execute the statement
    if ($stmt->execute()) {
        // Return success response
        echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
    } else {
        // Return error response
        echo json_encode(['success' => false, 'message' => 'Error deleting user']);
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // Return error response if ID parameter is not set
    echo json_encode(['success' => false, 'message' => 'User ID not provided']);
}
?>
