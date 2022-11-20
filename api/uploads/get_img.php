<?php   
    $pic = $_GET["img_path"];
    $response = [];

    $size = getimagesize($pic);

    header('Content-type: '.$size['mime']);

    readfile($pic);
?>