<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? 'test';
    $location = $_POST['Location'] ?? 'test';
    $date = $_POST['date'] ?? 'test';
    $price = $_POST['price'] ?? 0.0;
    $owner_id = $_POST['Owner_Id'] ?? 0;

    if (empty($name) || empty($location) || empty($date) || empty($price) || empty($owner_id)) {
        $response = ['status' => 'error', 'message' => 'Please fill in all fields.'];
        echo json_encode($response);
        exit;
    }

    if (!$conn) {
        $response = ['status' => 'error', 'message' => 'Connection failed: ' . mysqli_connect_error()];
        echo json_encode($response);
        exit;
    }

    $stmt_check = $conn->prepare("SELECT id FROM chalet WHERE name = ?");
    $stmt_check->bind_param("s", $name);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        $response = ['status' => 'error', 'message' => 'Chalet name already taken.'];
        echo json_encode($response);
        $stmt_check->close();
        $conn->close();
        exit;
    }
    $stmt_check->close();

    $stmt = $conn->prepare("INSERT INTO chalet (name, location, date, price, host_id) VALUES (?, ?, ?, ?, ?)");
    $host_id = 1;
    $stmt->bind_param("sssdi", $name, $location, $date, $price, $host_id);

    if ($stmt->execute()) {
        $chalet_id = $stmt->insert_id;

        $stmt_owners = $conn->prepare("INSERT INTO owners (chalet_id, user_id) VALUES (?, ?)");
        $stmt_owners->bind_param("ii", $chalet_id, $owner_id);

        if ($stmt_owners->execute()) {
            $stmt_role = $conn->prepare("UPDATE user SET role = 'admin' WHERE id = ?");
            $stmt_role->bind_param("i", $owner_id);

            if ($stmt_role->execute()) {
                $response = ['status' => 'success', 'message' => 'Chalet created successfully, owner assigned, and user role updated to admin.'];
            } else {
                $response = ['status' => 'error', 'message' => 'Failed to update user role: ' . $stmt_role->error];
            }

            $stmt_role->close();
        } else {
            $response = ['status' => 'error', 'message' => 'Failed to assign owner: ' . $stmt_owners->error];
        }

        $stmt_owners->close();
    } else {
        $response = ['status' => 'error', 'message' => 'Failed to create chalet: ' . $stmt->error];
    }

    echo json_encode($response);

    $stmt->close();
    $conn->close();
} else {
    $response = ['status' => 'error', 'message' => 'Invalid request method.'];
    echo json_encode($response);
}
?>
