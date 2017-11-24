<?php
session_start();
if (!isset($_SESSION['name'])) {
  header('Location: index.php');
}

if (isset($_POST['btnC'])) {
  session_destroy();
  header('Location: index.php');
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="css/estilos.css">
  <link rel="stylesheet" href="css/bulma.css">
  <link rel="stylesheet" href="css/font-awesome/css/font-awesome.css">
  <title>Dashboard</title>
</head>
<body>
  <div id="autores">
    <h2>Proyecto realizado por:</h2>
    <h3>Mauricio Arturo Ibarra Corona</h3>
    <h3>Luis Jorge Lozano Domínguez</h3>
    <h3>Miguel Ángel Urbina Arias</h3>
    <h3>Jorge Andrés Maya Moreno</h3>
  </div>
  <div id="materia">
    <h2>Sistemas de Soporte a la Decisión</h2>
    <h2>M.S.I. Francisco Javier Paulín Martínez</h2>
  </div>
  <a href="dashboard.php">Regresar</a>
</body>
    <script src="js/ajax.js"></script>
</html>