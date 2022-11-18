<?php
include("../connectiondb.php");

$post_id = $_POST["post_id"];
$user_id = $_POST["user_id"];
$user_hiding_id = $_POST["id"];

$permission = getUserPost($conn, $post_id, $user_id);
$exist = checkHidden($conn, $post_id, $user_id);
$response = [];

$stmt = $conn->prepare("INSERT INTO hidden_posts(post_id, user_id) VALUES(?,?)");

if($conn->connect_error){
    die("Connection Failed: ".$conn->connect_error);
}else{
    if(!$permission){
        if(!$exist){
            $stmt->bind_param("ii", $post_id, $user_id);
            $stmt->execute();
            $response["resp"] = "post-hidden";
            echo json_encode($response);
        }else{
            $response["resp"] = "hide-already-exists";
            echo json_encode($response);
        }
    }else{
        $response["resp"] = "user-hiding-own-post";
        echo json_encode($response);
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

function checkHidden($conn, $post_id, $user_id){
    $stmt = $conn->prepare("SELECT * FROM hidden_posts WHERE user_id = ? and post_id = ?");

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