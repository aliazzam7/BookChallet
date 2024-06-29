<?php
require_once 'db_connection.php';

$query = "SELECT id, username, email, role, date_registered FROM user";
$result = $conn->query($query);

$users = array();

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>
