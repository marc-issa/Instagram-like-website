<?php
    include("../connectiondb.php");
    include("../check_avail.php");
    
    $user_id = $_POST["id"];
    $img_path = $_POST["img_path"];
    $cap = $_POST["cap"];
    
    $response = [];

    $stmt = $conn->prepare("INSERT INTO posts(img_url, caption, user_id) VALUES(?,?,?);");
    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("sss", $img_path, $cap, $user_id);
        $stmt->execute();

        $response["resp"] = getLastPostId($conn)["last_insert_id()"];
        echo json_encode($response);
    }
?>