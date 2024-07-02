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

        // Start a transaction
        $conn->begin_transaction();

        try {
            // Update chalet data
            $updateChaletQuery = "UPDATE chalet SET name = ?, location = ?, date = ?, price = ? WHERE id = ?";
            $stmtChalet = $conn->prepare($updateChaletQuery);
            $stmtChalet->bind_param("sssdi", $name, $location, $date, $price, $chaletId);
            $stmtChalet->execute();
            $stmtChalet->close();

            // Delete current owners
            $deleteOwnersQuery = "DELETE FROM owners WHERE chalet_id = ?";
            $stmtDeleteOwners = $conn->prepare($deleteOwnersQuery);
            $stmtDeleteOwners->bind_param("i", $chaletId);
            $stmtDeleteOwners->execute();
            $stmtDeleteOwners->close();

            // Insert new owners
            $insertOwnerQuery = "INSERT INTO owners (chalet_id, user_id) VALUES (?, ?)";
            $stmtInsertOwner = $conn->prepare($insertOwnerQuery);

            foreach ($ownerIds as $ownerId) {
                $stmtInsertOwner->bind_param("ii", $chaletId, $ownerId);
                $stmtInsertOwner->execute();
            }
            $stmtInsertOwner->close();

            // Commit transaction
            $conn->commit();

            // Return success response
            $response = [
                'status' => 'success',
                'message' => 'Chalet updated successfully.'
            ];
        } catch (Exception $e) {
            // Rollback transaction on error
            $conn->rollback();

            // Return error response
            $response = [
                'status' => 'error',
                'message' => 'Failed to update chalet: ' . $e->getMessage()
            ];
        }
    } else {
        // Return error response for missing data
        $response = [
            'status' => 'error',
            'message' => 'Missing required data.'
        ];
    }

    echo json_encode($response);
    $conn->close();
} else {
    // Return error response for invalid request method
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];
    echo json_encode($response);
}
?>
