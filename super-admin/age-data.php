<?php
require_once 'db_connection.php';

$query = "SELECT BoD, COUNT(*) as count FROM user GROUP BY BoD";
$result = $conn->query($query);

$data = array();
$labels = array();
$counts = array();

while ($row = $result->fetch_assoc()) {
    $labels[] = $row['BoD'];
    $counts[] = $row['count'];
}

$response = array(
    'labels' => $labels,
    'counts' => $counts,
);

echo json_encode($response);
?>
