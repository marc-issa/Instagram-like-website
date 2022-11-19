<?php
include("../connectiondb.php");

$user_id = $_POST["user_id"];

$response = [];
$hidden_posts = [];

$stmt = $conn->prepare("SELECT post_id FROM hidden_posts WHERE user_id = ?");

if($conn->connect_error){
    echo "Connection Failed: ".$conn->connect_error;
}else{
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $results = $stmt->get_result();
    while($post = $results->fetch_assoc()){
        array_push($hidden_posts, $post["post_id"]);
    }
    $response["hidden-posts"] = $hidden_posts;
    echo json_encode($response);
}
?>