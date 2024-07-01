<?php
header('Content-Type: application/json');
require_once 'db_connection.php'; // Ensure this file exists and connects to your database



$page = $_GET['page'] ?? 1;
$perPage = $_GET['perPage'] ?? 5;
$offset = ($page - 1) * $perPage;

try {
    // Query to fetch chalet data with limit and offset
    $query = "SELECT * FROM chalet LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $perPage, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    $chalets = [];
    while ($row = $result->fetch_assoc()) {
        $chalets[] = $row;
    }

    // Count total rows
    $countQuery = "SELECT COUNT(*) AS total FROM chalet";
    $countResult = $conn->query($countQuery);
    $totalRows = $countResult->fetch_assoc()['total'];
    $totalPages = ceil($totalRows / $perPage);

    $response = [
        'status' => 'success',
        'data' => [
            'chalets' => $chalets,
            'totalPages' => $totalPages
        ]
    ];

    echo json_encode($response);
    exit;
} catch (Exception $e) {
    $response = [
        'status' => 'error',
        'message' => 'Failed to fetch chalets: ' . $e->getMessage()
    ];

    echo json_encode($response);
    exit;
} finally {
    // Close connection
    $conn->close();
}
?>