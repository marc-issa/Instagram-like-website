<?php
    include("../connectiondb.php");

    $post_id = $_POST["post_id"];
    $user_id = $_POST["user_id"];

    $response = [];

    $stmt = $conn->prepare("SELECT * FROM likes WHERE post_id = ? and user_id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("ii", $post_id, $user_id);
        $stmt->execute();
        $results = $stmt->get_result();
        $like = $results->fetch_assoc();

        if(!$like){
            addLike($conn, $post_id, $user_id);
            $response["resp"] = "like-added";
        }else{
            removeLike($conn, $post_id, $user_id);
            $response["resp"] = "like-removed";
        }
        echo json_encode($response);
    }

    function addLike($conn, $post_id, $user_id){
        $stmt = $conn->prepare("INSERT INTO likes(post_id, user_id) VALUES(?,?)");
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("ii", $post_id, $user_id);
            $stmt->execute();
        }
    }

    function removeLike($conn, $post_id, $user_id){
        $stmt = $conn->prepare("DELETE FROM likes WHERE post_id = ? and user_id = ?");
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("ii", $post_id, $user_id);
            $stmt->execute();
        }
    }
?>