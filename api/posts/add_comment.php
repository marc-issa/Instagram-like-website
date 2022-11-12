<?php
    include("../connectiondb.php");

    $post_id = $_POST["post_id"];
    $user_id = $_POST["user_id"];
    $com = $_POST["com"];

    $response = [];

    $stmt = $conn->prepare("INSERT INTO comments(com, post_id, user_id) VALUES(?,?,?)");
        
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("sii", $com, $post_id, $user_id);
        $stmt->execute();
    }
?>