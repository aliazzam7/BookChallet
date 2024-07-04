<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 to hide errors in production

require_once 'db_connection.php';
session_start();

if (isset($_SESSION['location']) && isset($_SESSION['budget']) && isset($_SESSION['date_start']) && isset($_SESSION['date_end']) && isset($_SESSION['user_id'])) {
    $location = $_SESSION['location'];
    $budget = $_SESSION['budget'];
    $date_start = $_SESSION['date_start'];
    $date_end = $_SESSION['date_end'];
    $user_id = $_SESSION['user_id'];
}

$location = trim($location);
$budget = trim($budget);


$date_start = new DateTime(trim($date_start));
$date_end = new DateTime(trim($date_end));


if ($date_start >= $date_end) {
    $response = [
        'error' => 'The start date must be earlier than the end date.',
        'chalets' => [],
        'wishlist' => []
    ];
    echo json_encode($response);
    exit;
}


$reservedChaletsSql = "
    SELECT chalet_id 
    FROM reservation 
    WHERE (
        (`check_in` < '" . $date_end->format('Y-m-d') . "' AND `check_out` > '" . $date_start->format('Y-m-d') . "')
    )
";
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
