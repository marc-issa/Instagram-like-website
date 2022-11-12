<?php 
include("../connectiondb.php");

$user_id = $_POST["user_id"];

$response = [];
$commented_posts = [];

    $stmt = $conn->prepare("SELECT post_id FROM comments WHERE user_id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $results = $stmt->get_result();
        
        while($commented_post = $results->fetch_assoc()){
            array_push($commented_posts, $commented_post["post_id"]);
        }
        
        $response["user-comments"] = $commented_posts;
        echo json_encode($response);
    }
?>