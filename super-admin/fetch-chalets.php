<?php
require_once 'db_connection.php';

$query = "SELECT id, name, location, price, capacity, description, date_added FROM chalet";
$result = $conn->query($query);

$chalets = array();

while ($row = $result->fetch_assoc()) {
    $chalets[] = $row;
}

echo json_encode($chalets);
?>
