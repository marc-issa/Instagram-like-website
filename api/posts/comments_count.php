<?php
    include("../connectiondb.php");

    $id = $_GET["post_id"];

    $response = [];

    $stmt = $conn->prepare("SELECT COUNT(post_id) FROM comments where post_id = ?");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $num_comments = $result->fetch_assoc();

        $response["resp"] = $num_comments["COUNT(post_id)"];
        echo json_encode($response);
    }
?>