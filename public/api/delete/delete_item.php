<?php

$id = $_DELETE['id'];

if(!$id){
    $output['errors'][] = 'No id found';
}

if(empty($output['errors'])){
    $query = "DELETE FROM `items` WHERE ('$id')";
    $result = mysqli_query($conn, $query);

    if(mysqli_affected_rows($conn) > 0){
        $output['success'] = true;
        $output['deleteID'] = mysqli_delete_id($conn);
    } else {
        $output['errors'][] = 'Error deleting item';
    }
}
