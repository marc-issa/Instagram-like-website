<?php

$image_file = $_FILES["image"];

if (!isset($image_file)) {
    die('No file uploaded.');
}

move_uploaded_file(
    $image_file["tmp_name"],

    __DIR__ . "/images/" . $image_file["name"]
);

?>