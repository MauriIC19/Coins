<?php
class DB{
  function connect(){
    $host = "127.0.0.1";
    $name = "coins";
    $user = "root";
    $pass = "";

    $conn = new mysqli($host, $user, $pass, $name);

    if($conn->connect_errno > 0){
      echo $conn->error . "<br>";
    }
    return $conn;
  }
}
 ?>
