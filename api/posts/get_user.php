<?php
include("../connectiondb.php");
$user_id = $_GET["id"];

$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");

if($conn->connect_error){
    die("Connection Failed: ".$conn->connect_error);
}else{
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    echo json_encode($user);
}
?>