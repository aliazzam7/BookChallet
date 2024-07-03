<?php
// Include database connection
require_once 'db_connection.php';

// SQL query to fetch user data
$sql = "SELECT id, fname, lname, phone, email, password FROM user";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    // Fetch data and store in array
    while ($row = $result->fetch_assoc()) {
        $users[] = [
            'id' => $row['id'],
            'first_name' => $row['fname'],
            'last_name' => $row['lname'],
            'phone_number' => $row['phone'],
            'email' => $row['email'],
            'password' => $row['password']
        ];
    }
}

// Close database connection
$conn->close();

// Output JSON response
header('Content-Type: application/json');
echo json_encode($users);
?>
