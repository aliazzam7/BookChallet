<?php
require_once 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $id = $data['id'];

    $query = "DELETE FROM chalet WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Chalet deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete chalet.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No chalet ID provided.']);
}
?>
