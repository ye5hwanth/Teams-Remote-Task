<?php 
include('dbConnection.php');

//Deleting data from the database
$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$phone = $mydata['phone'];

if(!empty($phone)){
    $sql = "DELETE FROM user_info WHERE phone = {$phone}";
    if($conn->query($sql) == TRUE){
        echo "Deleted Successfully";
    } else {
        echo "Unable to delete";
    }
} else {
    echo "Error occured";
}

?>