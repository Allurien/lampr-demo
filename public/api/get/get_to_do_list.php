<?php

$query = 'SELECT `title`, `complete`, `id` FROM `items`';
$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)){
        $row['complete'] = (bool)$row['complete'];

        $output['listItems'][] = $row;
    }
    $output['success'] = true;
} else {
    $output['message'] = 'No to do items found';
}