<?php

$title = $_POST['title'];
$details = $_POST['details'];

if(!$title){
    $output['errors'][] = 'No title found';
}

if(!$details){
    $output['errors'][] = 'No details found';
}

if(empty($output['errors'])){
    $query = "INSERT INTO `items` (`title`, `details`) VALUES ('$title',  '$details')";
    $result = mysqli_query($conn, $query);

    if(mysqli_affected_rows($conn) > 0){
        $output['success'] = true;
        $output['insertID'] = mysqli_insert_id($conn);
    } else {
        $output['errors'][] = 'Error inserting item';
    }
}