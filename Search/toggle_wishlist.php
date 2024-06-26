<?php
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['user_id']) || !isset($input['chalet_id'])) {
    http_response_code(400);
    die('Error: Missing user_id or chalet_id in POST request');
}

require_once 'db_connection.php';

$user_id = $input['user_id'];
$chalet_id = $input['chalet_id'];



$checkSql = "SELECT id FROM whishlist WHERE user_id = $user_id AND chalet_id = $chalet_id";
$checkResult = $conn->query($checkSql);

if ($checkResult === FALSE) {
    echo "Error checking wishlist: " . $conn->error;
} elseif ($checkResult->num_rows > 0) {
    $deleteSql = "DELETE FROM whishlist WHERE user_id = $user_id AND chalet_id = $chalet_id";
    if ($conn->query($deleteSql) === TRUE) {
        echo "removed";
    } else {
        echo "Error removing from wishlist: " . $conn->error;
    }
} else {
    $addSql = "INSERT INTO whishlist (user_id, chalet_id) VALUES ($user_id, $chalet_id)";
    if ($conn->query($addSql) === TRUE) {
        echo "added";
    } else {
        echo "Error adding to wishlist: " . $conn->error;
    }
}

$conn->close();
?>
