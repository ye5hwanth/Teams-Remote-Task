<?php 
include('dbConnection.php');

//Getting data from the database
$sql = "SELECT * FROM user_info";
$result = $conn->query($sql);
if($result->num_rows > 0){
    $data = array();
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
}

echo json_encode($data);

?>