<?php

    function checkUsername($username, $conn){
        $stmt = $conn->prepare("SELECT id FROM users WHERE username=?");
        
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            
            if($user){
                return true;
            }
            return false;
        }
    }

    function checkEmail($email, $conn){
        $stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
        
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();
            
            if($user){
                return true;
            }
            return false;
        }
    }

    function getId($username, $conn){
        $stmt = $conn->prepare("SELECT id FROM users WHERE username=?");
        
        if($conn->connect_error){
            die("Connection Failed: ".$conn->connect_error);
        }else{
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            $id = $result->fetch_assoc();
            
            return $id;
        }
    }

    function getLastPostId($conn){
        $stmt = $conn->prepare("SELECT last_insert_id()");
        $stmt->execute();
        $results = $stmt->get_result();
        return $results->fetch_assoc();
    }
?>