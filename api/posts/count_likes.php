<?php
    include("../connectiondb.php");

    $id = $_GET["id"];

    $response = [];

    $stmt = $conn->prepare("SELECT COUNT(post_id) FROM likes where post_id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $num_likes = $result->fetch_assoc();

        $response["resp"] = $num_likes["COUNT(post_id)"];
        echo json_encode($response);
    }
?>