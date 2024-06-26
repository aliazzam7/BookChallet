<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 to hide errors in production

require_once 'db_connection.php';


$location = "new york  "; 
$budget = "  "; 
$date = "  "; 

$user_id = 3;

// Trim whitespace from location, budget, and date variables
$location = trim($location);
$budget = trim($budget);
$date = trim($date);



$reservedChaletsSql = "SELECT chalet_id FROM reservation WHERE '$date' >= `check-in` AND '$date' < `check-out`";
$reservedResult = $conn->query($reservedChaletsSql);

$reservedChaletIds = [];
while ($row = $reservedResult->fetch_assoc()) {
    $reservedChaletIds[] = $row['chalet_id'];
}

$reservedChaletIdsStr = implode(',', $reservedChaletIds);

$sql = "SELECT id, name, location, price, description, image FROM chalet";

if (!empty($location)) {
    $sql .= " WHERE location = '" . $conn->real_escape_string($location) . "'";
}

if (!empty($budget)) {
    $sql .= (strpos($sql, 'WHERE') === false ? " WHERE " : " AND ") . "price <= $budget";
}

if (!empty($reservedChaletIds)) {
    $sql .= (strpos($sql, 'WHERE') === false ? " WHERE " : " AND ") . "id NOT IN ($reservedChaletIdsStr)";
}

$result = $conn->query($sql);

$chalets = [];
while ($row = $result->fetch_assoc()) {
    $chalets[] = $row;
}

$wishlistSql = "SELECT chalet_id FROM whishlist WHERE user_id = $user_id";
$wishlistResult = $conn->query($wishlistSql);

$wishlistChaletIds = [];
while ($row = $wishlistResult->fetch_assoc()) {
    $wishlistChaletIds[] = $row['chalet_id'];
}

$response = [
    'chalets' => $chalets,
    'wishlist' => $wishlistChaletIds
];

echo json_encode($response);

$conn->close();
?>
