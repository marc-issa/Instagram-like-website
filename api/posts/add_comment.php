<?php
    include("../connectiondb.php");

    $post_id = $_POST["post_id"];
    $user_id = $_POST["user_id"];
    $com = $_POST["com"];

    $response = [];

    $stmt = $conn->prepare("SELECT * FROM comments WHERE post_id = ? and user_id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("ii", $post_id, $user_id);
        $stmt->execute();
        $results = $stmt->get_result();
        $like = $results->fetch_assoc();

        addComment($conn, $post_id, $user_id, $com);
        $response["resp"] = "Comment added";
        $response["Comment-content"] = $com;
        
        echo json_encode($response);
    }

    function addComment($conn, $post_id, $user_id, $com){
        $stmt = $conn->prepare("INSERT INTO comments(com, post_id, user_id) VALUES(?,?,?)");
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("sii", $com, $post_id, $user_id);
            $stmt->execute();
        }
    }
?>