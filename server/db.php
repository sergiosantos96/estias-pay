<?php
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
