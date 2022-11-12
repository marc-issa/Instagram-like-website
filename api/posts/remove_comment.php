<?php
    include("../connectiondb.php");

    $com_id = $_POST["com_id"];

    $response = [];

    $stmt = $conn->prepare("DELETE FROM comments WHERE id = ?");
        
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("i", $com_id);
        $stmt->execute();
        $response["resp"] = "comment-deleted";
        echo json_encode($response);
    }
?>