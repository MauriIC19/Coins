<?php
require_once('conexion.php');
require_once('funciones.php');

$conn = new DB();
$conn = $conn->connect();

if (isset($_GET['tipo'])) {
  $sql = "SELECT periodo, frecuencia FROM coin WHERE tipo = {$_GET['tipo']} ORDER BY periodo ASC";
  $registros = $conn->query($sql);

  $data = array();
  while ($registro = $registros->fetch_assoc()) {
    $data[] = $registro;
  }

  echo json_encode($data);
}

if (isset($_POST['pronostico'])) {
  switch ($_POST['pronostico']) {
    case 'PMS':
      $arr = json_decode($_POST['data'], true);
      $n = intval($_POST['n']);
      $k = intval($_POST['k']);
      $pms = PMS($arr, $n, $k);
      echo json_encode($pms);
      break;

    case 'PMD':
      $arr = json_decode($_POST['data'], true);
      $n = intval($_POST['n']);
      $k = intval($_POST['k']);
      $j = intval($_POST['j']);
      $pms = PMS($arr, $n, $k);
      $pmd = PMD($arr, $n, $k, $j, null, null,$pms);
      echo json_encode($pmd);
      break;

      case 'PMDA':
      //$arr, $n, $k=null, $j=null, $m=null, $a=null, $pms=null, $pmd=null, $inicio=null, $serie=null
        $arr = json_decode($_POST['data'], true);
        $n = intval($_POST['n']);
        $k = intval($_POST['k']);
        $j = intval($_POST['j']);
        $m = intval($_POST['m']);
        $pms = PMS($arr, $n, $k);
        $pmd = PMD($arr, $n, $k, $j, null, null,$pms);
        $pmda = PMDA($arr, $n, $k, $j, $m, null, $pms, $pmd);
        echo json_encode($pmda);
        break;

      case 'PTMAC':
        $arr = json_decode($_POST['data'], true);
        $n = intval($_POST['n']);
        $ptmac = PTMAC($arr, $n);
        echo json_encode($ptmac);
        break;

      case 'SE':
        $arr = json_decode($_POST['data'], true);

        $_POST['n'] ? $n = intval($_POST['n']) : $n = null;
        $_POST['k'] ? $k = intval($_POST['k']) : $k = null;
        $_POST['j'] ? $j = intval($_POST['j']) : $j = null;
        $_POST['m'] ? $m = intval($_POST['m']) : $m = null;
        $_POST['a'] ? $a = intval($_POST['a']) : $a = null;
        ($j && $k) ?  $pms = PMS($arr, $n, $k, $j, $m, $a, null, null, null) : $pms = null;
        $m ?  $pmd = PMD($arr, $n, $k, $j, $m, $a, $pms, null, null) : $pmd = null;

        // $_POST['p'] == "PTMAC" ? $inicio = 3 : $inicio = null;
        // $_POST['p'] == "PS" ? $inicio = 2 : $inicio = 10;
        // $_POST['p'] == "PMS" ? $inicio = $k + 1 : $inicio = null;
        // $_POST['p'] == "PMD" ? $inicio = $j + $k + 1 : $inicio = null;
        // $_POST['p'] == "PMDA" ? $inicio = $j + $k + 1 : $inicio = null;

        $pronostico = $_POST['p'];

        if ($pronostico == "PTMAC") { $inicio = 3; }

      	if ($pronostico == "PS") { $inicio = 2; }

      	if ($pronostico == "PMS") { $inicio = $k+1; }

      	if ($pronostico == "PMD") { $inicio = $j + $k + 1; }

      	if ($pronostico == "PMDA") { $inicio = $j + $k + 1; }

        $serie = $_POST['p']($arr, $n, $k, $j, $m, $a, $pms, $pmd, $inicio, null);

        $se = $_POST['pronostico']($arr, $n, $k, $j, $m, $a, $pms, $pmd, $inicio, $serie);
        echo json_encode($se);
        break;

      default:
        $arr = json_decode($_POST['data'], true);
        $n = intval($_POST['n']);
        $ps = $_POST['pronostico']($arr, $n);
        echo json_encode($ps);
        break;
  }
}
?>
