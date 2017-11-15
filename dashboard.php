<?php
  session_start();
  if (!isset($_SESSION['name'])) {
    header('Location: index.php');
  }
 ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <script src="js/ajax.js"></script>
  <link rel="stylesheet" href="css/estilos.css">
  <title>Dashboard</title>
</head>
<body onload="deshabilitarBotones()">
  <header>
    <h2>Dashboard</h2>
    <form action="#" method="POST">
      <input type="submit" name="btnC" value="Salir">
    </form>
  </header>
  <div id="tablas" class="seccion">
    <div id="opciones">
      <select required id="variables" onchange="cargarDatos(this.value)">
        <option selected disabled hidden value="">Selecciona...</option>
        <option value="0">Ethereum</option>
        <option value="1">Bitcoin</option>
      </select>

      <button onclick="cargarPronostico(this, 'PS')">PS</button>
      <button onclick="cargarPronostico(this, 'PMS')">PMS</button>
      <button onclick="cargarPronostico(this, 'PMD')">PMD</button>
      <button onclick="cargarPronostico(this, 'PMDA')">PMDA</button>

      <label id="kl" for="k">K:</label>
      <input id="k"  type="text" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">

      <label for="j" id="jl" >J:</label>
      <input id="j"  type="text" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">

      <label for="m" id="ml" >M:</label>
      <input id="m"  type="text" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">

      <button onclick="cargarPronostico(this, 'PTMAC')">PTMAC</button>
      <button onclick="cargarPronostico(this, 'SE')">SE</button>

      <select required id="p">
        <option value="" selected disabled hidden>Selecciona...</option>
        <option value="PS">PS</option>
        <option value="PMS">PMS</option>
        <option value="PMD">PMD</option>
        <option value="PMDA">PMDA</option>
        <option value="PTMAC">PTMAC</option>
      </select>

      <label  id="al" for="a" >A:</label>
      <input id="a"  type="text" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
    </div>

    <table id="tablaDatos">
      <thead><tr id="titulos"></tr></thead>
      <tbody id="datos"></tbody>
    </table>
    <table id="tablaErrores">
      <thead><tr id="titulosErrores"></tr></thead>
      <tbody id="errores"></tbody>
    </table>
  </div>
  <div id="graficas" class="seccion"></div>
</body>
</html>
<?php
  if (isset($_POST['btnC'])) {
    session_destroy();
    header('Location: index.php');
  }
 ?>
