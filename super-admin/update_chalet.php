<?php
header('Content-Type: application/json');
require_once 'db_connection.php'; // Ensure this file exists and connects to your database

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['chaletId'], $data['name'], $data['location'], $data['date'], $data['price'], $data['owner_ids'])) {
        $chaletId = $data['chaletId'];
        $name = $data['name'];
        $location = $data['location'];
        $date = $data['date'];
        $price = $data['price'];
        $ownerIds = explode('-', $data['owner_ids']);

        
        $conn->begin_transaction();

        try {
            
            $updateChaletQuery = "UPDATE chalet SET name = ?, location = ?, date = ?, price = ? WHERE id = ?";
            $stmtChalet = $conn->prepare($updateChaletQuery);
            $stmtChalet->bind_param("sssdi", $name, $location, $date, $price, $chaletId);
            $stmtChalet->execute();
            $stmtChalet->close();

            
            $deleteOwnersQuery = "DELETE FROM owners WHERE chalet_id = ?";
            $stmtDeleteOwners = $conn->prepare($deleteOwnersQuery);
            $stmtDeleteOwners->bind_param("i", $chaletId);
            $stmtDeleteOwners->execute();
            $stmtDeleteOwners->close();

            
            $insertOwnerQuery = "INSERT INTO owners (chalet_id, user_id) VALUES (?, ?)";
            $stmtInsertOwner = $conn->prepare($insertOwnerQuery);

            foreach ($ownerIds as $ownerId) {
                $stmtInsertOwner->bind_param("ii", $chaletId, $ownerId);
                $stmtInsertOwner->execute();
            }
            $stmtInsertOwner->close();

            
            $conn->commit();

            
            $response = [
                'status' => 'success',
                'message' => 'Chalet updated successfully.'
            ];
        } catch (Exception $e) {
           
            $conn->rollback();

            
            $response = [
                'status' => 'error',
                'message' => 'Failed to update chalet: ' . $e->getMessage()
            ];
        }
    } else {
        
        $response = [
            'status' => 'error',
            'message' => 'Missing required data.'
        ];
    }

    echo json_encode($response);
    $conn->close();
} else {
    
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];
    echo json_encode($response);
}
?>
