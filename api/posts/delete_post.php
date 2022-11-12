<?php
    include("../connectiondb.php");

    $post_id = $_POST["post_id"];

    $response = [];

    $stmt = $conn->prepare("DELETE FROM posts WHERE id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        deleteLikes($conn, $post_id);
        deleteComments($conn, $post_id);
        $stmt->bind_param("i", $post_id);
        $stmt->execute();
        if($stmt){
            $response["resp"] = "post-deleted";
        }else{
            $response["resp"] = "error-deleting-post";
        }
        echo json_encode($response);
    }

    function deleteComments($conn, $post_id){
        $stmt = $conn->prepare("DELETE FROM comments WHERE post_id = ?");
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("i", $post_id);
            $stmt->execute();
        }
    }

    function deleteLikes($conn, $post_id){
        $stmt = $conn->prepare("DELETE FROM likes WHERE post_id = ?");
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("i", $post_id);
            $stmt->execute();
        }
    }
?>