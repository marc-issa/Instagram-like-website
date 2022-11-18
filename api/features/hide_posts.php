<?php
include("../connectiondb.php");

$post_id = $_POST["post_id"];
$user_id = $_POST["user_id"];
$user_hiding_id = $_POST["id"];

$exist = getUserPost($conn, $post_id, $user_id);
echo json_encode($exist);

$stmt = $conn->prepare("INSERT INTO hidden_posts(post_id, user_id) VALUES(?,?)");

if($conn->connect_error){
    die("Connection Failed: ".$conn->connect_error);
}else{
    if(!$exist){
        $stmt->bind_param("ii", $post_id, $user_id);
        $stmt->execute();
    }
    
}

function getUserPost($conn, $post_id, $user_id){
    $stmt = $conn->prepare("SELECT id FROM posts WHERE user_id = ? and id = ?");

    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("ii", $user_id, $post_id);
        $stmt->execute();
        $results = $stmt->get_result();
        $exist = $results->fetch_assoc();
        if($exist){
            return true;
        }else{
            return false;
        }
        
    }
}

?>