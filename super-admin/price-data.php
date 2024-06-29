<?php
require_once 'db_connection.php';

$query = "SELECT price, COUNT(*) as count FROM chalet GROUP BY price";
$result = $conn->query($query);

$data = array();

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
