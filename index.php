<?php
  require_once('php/conexion.php');
  session_start();
  if (isset($_SESSION['name'])) {
    header('Location: dashboard.php');
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Index</title>
  </head>
  <body>
    <form class="" action="#" method="POST">
      <input type="mail" name="mail" value="">
      <input type="password" name="pass" value="">
      <input type="submit" name="btn" value="Entrar">
    </form>
  </body>
</html>
<?php
if (isset($_POST['btn'])) {
      $conn = new DB();
      $conn = $conn->connect();
      $mail = $_POST['mail'];
      $pass = $_POST['pass'];

      $querySesion = "SELECT * FROM usuario
                      WHERE correoUsuario = '{$mail}'
                      AND passUsuario = '{$pass}';";
      $res = $conn->query($querySesion);
      if ($res->num_rows != 0) {
          if (!is_bool($res)){
          session_start();
          $res = $res->fetch_assoc();
          $_SESSION['name'] = $res['nombreUsuario'];
          header('Location: dashboard.php');
        }
      }
      else{
        echo "Usuario incorrecto";
        //Commit de prueba
      }
    }
?>
