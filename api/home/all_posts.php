<?php
    include("../connectiondb.php");

    $response = [];
    $posts = [];

    $stmt = $conn->prepare("SELECT * FROM posts");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->execute();
        $result = $stmt->get_result();
        while($post = $result->fetch_assoc()){
            array_push($posts, $post);
        }
        $response["posts"] = $posts;
        echo json_encode($response);
    }
?>