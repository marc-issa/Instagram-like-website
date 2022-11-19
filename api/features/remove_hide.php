<?php
include("../connectiondb.php");

$post_id = $_POST["post_id"];
$user_id = $_POST["user_id"];

$response = [];

$stmt = $conn->prepare("DELETE FROM hidden_posts WHERE post_id = ? and user_id = ?");

if($conn->connect_error){
    echo "Connection Failed: ".$conn->conect_error;
}else{
    $stmt->bind_param("ii", $post_id, $user_id);
    $stmt->execute();
    $response["resp"] = "hide-removed";
    echo json_encode($response);
}
?>