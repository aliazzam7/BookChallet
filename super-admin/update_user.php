<?php
require_once 'db_connection.php';

if (isset($_GET['id']) && isset($_GET['password'])) {
    $userId = $_GET['id'];
    $newPassword = $_GET['password'];

    $stmt = $conn->prepare("UPDATE user SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $newPassword, $userId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'User password updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating user password']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'User ID or password not provided']);
}
?>
