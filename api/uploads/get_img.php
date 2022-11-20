<?php   
    $pic = $_GET["img_path"];
    $response = [];

    $size = getimagesize($pic);

    header('Content-type: '.$size['mime']);

    echo json_encode(readfile($pic));
?>