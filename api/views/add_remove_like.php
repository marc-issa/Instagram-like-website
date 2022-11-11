<?php
    include("../connectiondb.php");

    $post_id = $_GET["post_id"];
    $user_id = $_GET["user_id"];

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