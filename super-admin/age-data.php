<?php
require_once 'db_connection.php';

$sql = "SELECT
            SUM(CASE WHEN TIMESTAMPDIFF(YEAR, BoD, CURDATE()) <= 18 THEN 1 ELSE 0 END) AS age_0_18,
            SUM(CASE WHEN TIMESTAMPDIFF(YEAR, BoD, CURDATE()) BETWEEN 19 AND 30 THEN 1 ELSE 0 END) AS age_19_30,
            SUM(CASE WHEN TIMESTAMPDIFF(YEAR, BoD, CURDATE()) BETWEEN 31 AND 50 THEN 1 ELSE 0 END) AS age_31_50,
            SUM(CASE WHEN TIMESTAMPDIFF(YEAR, BoD, CURDATE()) >= 51 THEN 1 ELSE 0 END) AS age_51_plus
        FROM user";

$result = $conn->query($sql);

$data = $result->fetch_assoc();

$conn->close();

// Format data into expected JSON structure for Chart.js
$labels = ['0-18', '19-30', '31-50', '51+'];
$counts = [
    $data['age_0_18'],
    $data['age_19_30'],
    $data['age_31_50'],
    $data['age_51_plus']
];

$response = [
    'labels' => $labels,
    'counts' => $counts
];

header('Content-Type: application/json');
echo json_encode($response);
?>
