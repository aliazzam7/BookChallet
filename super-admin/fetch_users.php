<?php

require_once 'db_connection.php';


$sql = "SELECT id, fname, lname, phone, email, password FROM user";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {

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


$conn->close();

header('Content-Type: application/json');
echo json_encode($users);
?>
