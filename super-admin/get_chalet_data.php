<?php
header('Content-Type: application/json');
require_once 'db_connection.php'; 

if (isset($_GET['chaletId'])) {
    $chaletId = $_GET['chaletId'];


    if (!$conn) {
        $response = [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
        echo json_encode($response);
        exit;
    }

   
    $chaletQuery = "SELECT name, location, date, price FROM chalet WHERE id = ?";
    $stmtChalet = $conn->prepare($chaletQuery);
    $stmtChalet->bind_param("i", $chaletId);
    $stmtChalet->execute();
    $chaletResult = $stmtChalet->get_result();
    $chaletData = $chaletResult->fetch_assoc();
    $stmtChalet->close();

    
    $ownersQuery = "SELECT user_id FROM owners WHERE chalet_id = ?";
    $stmtOwners = $conn->prepare($ownersQuery);
    $stmtOwners->bind_param("i", $chaletId);
    $stmtOwners->execute();
    $ownersResult = $stmtOwners->get_result();

    $ownerIds = [];
    while ($row = $ownersResult->fetch_assoc()) {
        $ownerIds[] = $row['user_id'];
    }
    $stmtOwners->close();

    if ($chaletData) {
        $response = [
            'status' => 'success',
            'chalet' => $chaletData,
            'owners' => implode('-', $ownerIds) 
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Chalet data not found'
        ];
    }

    echo json_encode($response);
    $conn->close();
} else {
    $response = [
        'status' => 'error',
        'message' => 'Chalet ID not provided'
    ];
    echo json_encode($response);
}
?>
