<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(200);
    exit(0);
}

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();

require_once '../db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$category = $data['category'] ?? null;
$amount = $data['amount'] ?? null;
$date = $data['date'] ?? null;
$notes = $data['notes'] ?? '';  

if (!$category || !$amount || !$date) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("INSERT INTO expenses (user_id, category, amount, date, notes) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $user_id, $category, $amount, $date, $notes);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Expense added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
