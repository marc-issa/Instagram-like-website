<?php 
include("../connectiondb.php");

$user_id = $_POST["user_id"];

$response = [];
$liked_posts = [];

    $stmt = $conn->prepare("SELECT post_id FROM likes WHERE user_id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $results = $stmt->get_result();
        
        while($liked_post = $results->fetch_assoc()){
            array_push($liked_posts, $liked_post["post_id"]);
        }
        
        $response["liked"] = $liked_posts;
        echo json_encode($response);
    }
?>