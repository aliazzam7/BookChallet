<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 to hide errors in production

require_once 'db_connection.php';

$location = ""; 
$budget = "  "; 
$date_start = "2024-06-27"; // Example start date
$date_end = "2024-06-10";   // Example end date

$user_id = 3;

// Trim whitespace from location and budget variables
$location = trim($location);
$budget = trim($budget);

// Convert date strings to DateTime objects for comparison
$date_start = new DateTime(trim($date_start));
$date_end = new DateTime(trim($date_end));

// Check if the start date is before the end date
if ($date_start >= $date_end) {
    $response = [
        'error' => 'The start date must be earlier than the end date.',
        'chalets' => [],
        'wishlist' => []
    ];
    echo json_encode($response);
    exit;
}

// Fetch reserved chalets within the date range
$reservedChaletsSql = "
    SELECT chalet_id 
    FROM reservation 
    WHERE (
        (`check-in` < '" . $date_end->format('Y-m-d') . "' AND `check-out` > '" . $date_start->format('Y-m-d') . "')
    )
";
$reservedResult = $conn->query($reservedChaletsSql);

$reservedChaletIds = [];
while ($row = $reservedResult->fetch_assoc()) {
    $reservedChaletIds[] = $row['chalet_id'];
}

$reservedChaletIdsStr = implode(',', $reservedChaletIds);

// Construct the main SQL query
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

// Fetch wishlist chalets for the user
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
