<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(200);
    exit;
}

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once '../db.php';

// Check authentication
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$amount = $data['amount'] ?? null;

if (!$amount) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing amount']);
    exit;
}

$user_id = $_SESSION['user_id'];

if (!is_numeric($amount)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount']);
    exit;
}

// Save to a new "budgets" table, or update an existing one (one budget per user)
$stmt = $conn->prepare("INSERT INTO budgets (user_id, amount) VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE amount = VALUES(amount)");

$stmt->bind_param("id", $user_id, $amount);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Budget set successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
