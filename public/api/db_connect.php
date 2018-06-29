<?php
require_once('../../config/db.php');

$conn = mysqli_connect($db_cred['host'], $db_cred['user'], $db_cred['password'], $db_cred['database']);

if(!$conn){
    $output['error'] = 'Error connecting to database: '.mysqli_error();
    
    print json_encode($output);

    exit;
}