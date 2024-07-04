<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $chaletId = $data['id'];

        $conn->begin_transaction();

        try {
            $deleteReservationsQuery = "DELETE FROM reservation WHERE chalet_id = ?";
            $stmtReservations = $conn->prepare($deleteReservationsQuery);
            $stmtReservations->bind_param("i", $chaletId);
            $stmtReservations->execute();
            $stmtReservations->close();

            $deleteWishlistQuery = "DELETE FROM whishlist WHERE chalet_id = ?";
            $stmtWishlist = $conn->prepare($deleteWishlistQuery);
            $stmtWishlist->bind_param("i", $chaletId);
            $stmtWishlist->execute();
            $stmtWishlist->close();

            $selectOwnerQuery = "SELECT user_id FROM owners WHERE chalet_id = ?";
            $stmtSelectOwner = $conn->prepare($selectOwnerQuery);
            $stmtSelectOwner->bind_param("i", $chaletId);
            $stmtSelectOwner->execute();
            $stmtSelectOwner->bind_result($ownerId);
            $stmtSelectOwner->fetch();
            $stmtSelectOwner->close();

            $deleteOwnersQuery = "DELETE FROM owners WHERE chalet_id = ?";
            $stmtOwners = $conn->prepare($deleteOwnersQuery);
            $stmtOwners->bind_param("i", $chaletId);
            $stmtOwners->execute();
            $stmtOwners->close();

            $checkUserQuery = "SELECT COUNT(*) FROM owners WHERE user_id = ?";
            $stmtCheckUser = $conn->prepare($checkUserQuery);
            $stmtCheckUser->bind_param("i", $ownerId);
            $stmtCheckUser->execute();
            $stmtCheckUser->bind_result($count);
            $stmtCheckUser->fetch();
            $stmtCheckUser->close();

            if ($count == 0) {
                $updateRoleQuery = "UPDATE user SET role = 'user' WHERE id = ?";
                $stmtUpdateRole = $conn->prepare($updateRoleQuery);
                $stmtUpdateRole->bind_param("i", $ownerId);
                $stmtUpdateRole->execute();
                $stmtUpdateRole->close();
            }

            $deleteChaletQuery = "DELETE FROM chalet WHERE id = ?";
            $stmtChalet = $conn->prepare($deleteChaletQuery);
            $stmtChalet->bind_param("i", $chaletId);
            $stmtChalet->execute();
            $stmtChalet->close();

            $conn->commit();

            $response = [
                'status' => 'success',
                'message' => 'Chalet deleted successfully.'
            ];
            echo json_encode($response);
            exit;
        } catch (Exception $e) {
            $conn->rollback();

            $response = [
                'status' => 'error',
                'message' => 'Failed to delete chalet: ' . $e->getMessage()
            ];
            echo json_encode($response);
            exit;
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Chalet ID not provided.'
        ];
        echo json_encode($response);
        exit;
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];
    echo json_encode($response);
    exit;
}
?>
