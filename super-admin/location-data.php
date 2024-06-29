<?php
require_once 'db_connection.php';

$sql = 'SELECT location, COUNT(*) as count FROM chalet GROUP BY location';
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = [
            'location' => $row['location'],
            'count' => $row['count']
        ];
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($data);
?>
