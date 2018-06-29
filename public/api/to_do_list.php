<?php
header('Access-Control-Allow-Origin: *');

$output = [
    'success' => false
];

require_once('db_connect.php');

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'];
switch($method){
    case 'GET':
        $path = "get/$action.php";
        break;
    case 'POST':
        $path = "post/$action.php";
        break;
    case 'PATCH':
        $_PATCH = json_decode(file_get_contents('php://input'), true);
        include_once("patch/$action.php");
        break;
    case 'PUT':
        $output['msg'] = 'Put method used';
        break;
    case 'DELETE':
        $path = "delete/$action.php";
        break;
    default:
        $output['error'] = "Unknown request method: $method";
};
if(is_file($path)){
    include_once($path);
} else {
    $output['error'] = "Unknown action: $action";
}
print json_encode($output);