<?php
    include("../connectiondb.php");

    $username = $_POST["username"];
    $pwd = $_POST["pwd"];

    $response = [];

    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? and password = ?");
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("ss", $username, $pwd);
            $stmt->execute();
            $result = $stmt->get_result();
            $id = $result->fetch_assoc();
            
            if($id){
                $response["resp"] = $id["id"];
            } else{
                $response["resp"] = "User Not Found";
            }
            echo json_encode($response);
        }
?>