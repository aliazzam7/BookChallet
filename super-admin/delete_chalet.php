<?php
header('Content-Type: application/json');
require_once 'db_connection.php'; // Ensure this file exists and connects to your database

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $chaletId = $data['id'];

        // Start a transaction
        $conn->begin_transaction();

        try {
            // Delete reservations related to the chalet
            $deleteReservationsQuery = "DELETE FROM reservation WHERE chalet_id = ?";
            $stmtReservations = $conn->prepare($deleteReservationsQuery);
            $stmtReservations->bind_param("i", $chaletId);
            $stmtReservations->execute();
            $stmtReservations->close();

            // Delete wishlist items related to the chalet
            $deleteWishlistQuery = "DELETE FROM whishlist WHERE chalet_id = ?";
            $stmtWishlist = $conn->prepare($deleteWishlistQuery);
            $stmtWishlist->bind_param("i", $chaletId);
            $stmtWishlist->execute();
            $stmtWishlist->close();

            // Delete chalet
            $deleteChaletQuery = "DELETE FROM chalet WHERE id = ?";
            $stmtChalet = $conn->prepare($deleteChaletQuery);
            $stmtChalet->bind_param("i", $chaletId);
            $stmtChalet->execute();
            $stmtChalet->close();

            // Commit transaction
            $conn->commit();

            // Return success response
            $response = [
                'status' => 'success',
                'message' => 'Chalet deleted successfully.'
            ];
            echo json_encode($response);
            exit;
        } catch (Exception $e) {
            // Rollback transaction on error
            $conn->rollback();

            // Return error response
            $response = [
                'status' => 'error',
                'message' => 'Failed to delete chalet: ' . $e->getMessage()
            ];
            echo json_encode($response);
            exit;
        }
    } else {
        // Return error response if chalet ID is not provided
        $response = [
            'status' => 'error',
            'message' => 'Chalet ID not provided.'
        ];
        echo json_encode($response);
        exit;
    }
} else {
    // Return error response for invalid request method
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];
    echo json_encode($response);
    exit;
}
?>
