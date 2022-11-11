<?php
    include("../connectiondb.php");
    include("../check_avail.php");

    $username = $_POST["username"];
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $email = $_POST["email"];
    $pwd = $_POST["pwd"];

    $response = [];

    $auth_username = checkUsername($username, $conn);
    $auth_email = checkEmail($email, $conn);

    if($auth_username){
        $response["resp"] = "username found";
    }
    elseif($auth_email){
        $response["resp"] = "email found";
    }
    else{
        $stmt = $conn->prepare("INSERT INTO users(username, email, first_name, last_name, password) VALUES(?,?,?,?,?);");
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("sssss", $username, $email, $first_name, $last_name, $password);
            $stmt->execute();

            $id = getId($username, $conn);
            $response["resp"] = $id["id"];
        }
    }

    echo json_encode($response);
?>