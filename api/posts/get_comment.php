<?php
    include("../connectiondb.php");

    $post_id = $_GET["post_id"];

    $comments = [];
    $response = [];

    $stmt = $conn->prepare("SELECT com FROM comments WHERE post_id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("i", $post_id);
        $stmt->execute();
        $results = $stmt->get_result();

        while($comment = $results->fetch_assoc()){
            array_push($comments, $comment["com"]);
        }
        
        $response["resp"] = $comments;
        echo json_encode($response);
    }
?>