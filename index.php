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
  <link rel="stylesheet" href="css/bulma.css">
  <link rel="stylesheet" href="css/estilos.css">
  <link rel="stylesheet" href="css/login.css">
  <link rel="stylesheet" href="css/font-awesome/css/font-awesome.css">
  <script src="js/particles.min.js"></script>
</head>

<body>
  <section id="particles-js" class="contenedor-login hero is-success is-fullheight ">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-3 is-offset-1">
          <div class="box">
            <div class="navbar-brand ">
              <div href="navbar-item" class="has-text-centered margen-automatico">
                <span class="parte-uno-logo is-size-3">Crypto</span><span class="parte-dos-logo is-size-3">Sight</span>
              </div>
            </div>
            <form class="" action="#" method="POST">
              <div class="field">
                <div class="control has-text-centered has-icons-left">
                  <input autocomplete="off" class="input  is-size-7" name="mail" type="text" placeholder="Usuario" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Usuario'">
                  <span class="icon is-size-7 is-left">
      <i class="fa fa-user"></i>
    </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-text-centered has-icons-left">
                  <input autocomplete="off" class="input margen-automatico is-size-7" name="pass" type="password" placeholder="Contraseña" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Contraseña'">
                  <span class="icon is-size-7 is-left">
      <i class="fa fa-unlock-alt"></i>
    </span>
                </div>
              </div>
              <input id="boton-login" type="submit" name="btn" value="Entrar">
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script type="text/javascript">
    particlesJS.load('particles-js', 'particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  </script>

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
        echo "<script>alert('Usuario y/o Contraseña Incorrectos')</script>";
      }
    }
?>
