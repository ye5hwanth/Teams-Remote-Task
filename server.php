<?php 
include('dbConnection.php');

//Uploading data into the database
$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$name = $mydata['name'];
$phone = $mydata['phone'];
$email = $mydata['email'];
$password = $mydata['password'];

if(!empty($name) && !empty($phone) && !empty($email) && !empty($password)){
    $sql = "INSERT INTO user_info(name, phone, email, password) VALUES('$name', '$phone', '$email', '$password')";
    if($conn->query($sql) == TRUE){
        echo "Registration Successfull";
    } else{
        echo "Unsuccessfull";
    }
} else{
    echo "Can't have empty fields";
}

?>