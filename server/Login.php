<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = 'localhost';
$db = 'estias_db';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit();
}

// Check if user exists
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit();
}

// ✅ Verify password
if (password_verify($password, $user['password'])) {
    echo json_encode(["success" => true, "message" => "Login successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid password"]);
}

$conn->close();
