<?php
include("../connectiondb.php");

$user_id = $_POST["id"];

if(isset($_POST["username"])){
    $stmt = $conn->prepare("UPDATE users SET username = ? WHERE id = ?");

    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("si", $_POST["username"],$user_id);
        $stmt->execute();
    }
}

if(isset($_POST["email"])){
    $stmt = $conn->prepare("UPDATE users SET email = ? WHERE id = ?");

    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("si", $_POST["email"],$user_id);
        $stmt->execute();
    }
}

if(isset($_POST["first_name"])){
    $stmt = $conn->prepare("UPDATE users SET first_name = ? WHERE id = ?");

    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("si", $_POST["first_name"],$user_id);
        $stmt->execute();
    }
}

if(isset($_POST["last_name"])){
    $stmt = $conn->prepare("UPDATE users SET last_name = ? WHERE id = ?");

    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $stmt->bind_param("si", $_POST["last_name"],$user_id);
        $stmt->execute();
    }
}

if(isset($_POST["password"])){
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");

    if($conn->connect_error){
        die("Connection Failed: ".$conn->connect_error);
    }else{
        $password = $_POST["password"];
        $password = hash("sha256", $password);

        $stmt->bind_param("si", $password,$user_id);
        $stmt->execute();
    }
}
?>