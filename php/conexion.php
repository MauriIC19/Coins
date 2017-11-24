<?php
class DB{
  function connect(){
    $host = "localhost";
    $name = "coins";
    $user = "root";
    $pass = "root";

    $conn = new mysqli($host, $user, $pass, $name);

    if($conn->connect_errno > 0){
      echo $conn->error . "<br>";
    }
    return $conn;
  }
}
 ?>
