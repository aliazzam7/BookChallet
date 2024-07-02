<?php
header('Content-Type: application/json');
require_once 'db_connection.php'; // Assuming db_connection.php includes your MySQLi connection code

// Validate and process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle form data
    $name = $_POST['name'] ?? 'test';
    $location = $_POST['Location'] ?? 'test';
    $date = $_POST['date'] ?? 'test';
    $price = $_POST['price'] ?? 0.0;
    $owner_id = $_POST['Owner_Id'] ?? 0;

    // Validate input data (add your own validation as needed)
    if (empty($name) || empty($location) || empty($date) || empty($price) || empty($owner_id)) {
        $response = [
            'status' => 'error',
            'message' => 'Please fill in all fields.'
        ];
        echo json_encode($response);
        exit;
    }

    // Create MySQLi connection (assuming db_connection.php sets up $conn)
    if (!$conn) {
        $response = [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
        echo json_encode($response);
        exit;
    }

    // Check if the name already exists
    $stmt_check = $conn->prepare("SELECT id FROM chalet WHERE name = ?");
    $stmt_check->bind_param("s", $name);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        $response = [
            'status' => 'error',
            'message' => 'Chalet name already taken.'
        ];
        echo json_encode($response);
        $stmt_check->close();
        $conn->close();
        exit;
    }
    $stmt_check->close();

    // Prepare INSERT statement for chalet table
    $stmt = $conn->prepare("INSERT INTO chalet (name, location, date, price, host_id) VALUES (?, ?, ?, ?, ?)");
    $host_id = 1; // Assuming host_id is an integer
    $stmt->bind_param("sssdi", $name, $location, $date, $price, $host_id);

    // Execute statement and check for success
    if ($stmt->execute()) {
        // Get the auto-incremented chalet ID
        $chalet_id = $stmt->insert_id;

        // Prepare INSERT statement for owners table
        $stmt_owners = $conn->prepare("INSERT INTO owners (chalet_id, user_id) VALUES (?, ?)");
        $stmt_owners->bind_param("ii", $chalet_id, $owner_id);

        // Execute statement and check for success
        if ($stmt_owners->execute()) {
            // Update user role to 'admin' in users table
            $stmt_role = $conn->prepare("UPDATE user SET role = 'admin' WHERE id = ?");
            $stmt_role->bind_param("i", $owner_id);

            if ($stmt_role->execute()) {
                // Return success response
                $response = [
                    'status' => 'success',
                    'message' => 'Chalet created successfully, owner assigned, and user role updated to admin.'
                ];
            } else {
                // Return error response for user role update
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to update user role: ' . $stmt_role->error
                ];
            }

            // Close role statement
            $stmt_role->close();
        } else {
            // Return error response for owners table insertion
            $response = [
                'status' => 'error',
                'message' => 'Failed to assign owner: ' . $stmt_owners->error
            ];
        }

        // Close owners statement
        $stmt_owners->close();
    } else {
        // Return error response for chalet table insertion
        $response = [
            'status' => 'error',
            'message' => 'Failed to create chalet: ' . $stmt->error
        ];
    }

    echo json_encode($response);

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Handle invalid request method
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method.'
    ];
    echo json_encode($response);
}
?>
