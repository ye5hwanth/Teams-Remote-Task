<?php

//Connecting to the database
$db_host = "localhost";
$db_user = "id19465111_yeshyesh";
$db_password = "Yeshwanth@2001";
$db_name = "id19465111_mydb1";

$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

if($conn->connect_error){
    die("Connection failed");
}

?>