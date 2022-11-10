<?php
    $host = "localhost";
    $username = "root";
    $password = "";
    $db = "instagram-like-app";

    $conn = new mysqli($host, $username, $password, $db);
    
    if($conn){
        echo "Connected";
    }
    else{
        echo "Error Connecting to database";
    }
?>