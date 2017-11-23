<?php

function PS($arr, $n, $k=null, $j=null, $m=null, $a=null, $pms=null, $pmd=null, $inicio=null, $serie=null){
//PS
  	$ps = array();
  	$acumulador = 0;
	for ($i=1; $i <= $n ; $i++) {
		$acumulador += $arr[$i-1];
		$ps[$i][0] = $acumulador/$i;
	}

//Errores Absoluto, Medio y Relativo de PS
	$suma = 0;
	$contador = 0;
	for ($i=1; $i < $n ; $i++) {
		$ps[$i][1] = abs($ps[$i][0] - $arr[$i]);
		$suma += $ps[$i][1];
		$contador++;
	}
	$ps[$n+1][0] = $suma/$contador;
	$ps[$n+1][1] = ($ps[$n+1][0]*100)/$ps[$n-1][0];

	return $ps;
	//
}

function PMS($arr, $n, $k=null, $j=null, $m=null, $a=null, $pms=null, $pmd=null, $inicio=null, $serie=null){
//PMS
  $pms = array();
	for ($i = $k; $i <= $n ; $i++) {
  		$acumulador = 0;
  		for ($j = 1; $j <= $k; $j++){
			$acumulador += $arr[$i-$j];
		}
		$pms[$i][0] = $acumulador/$k;
	}

//Errores Absoluto, Medio y Relativo de PMS
	$suma = 0;
	$contador = 0;
	for ($i = $k; $i < $n ; $i++) {
		$pms[$i][1] = abs($pms[$i][0] - $arr[$i]);
		$suma += $pms[$i][1];
		$contador++;
	}
	$pms[$n+1][0] = $suma/$contador;
	$pms[$n+1][1] = $pms[$n+1][0]*100/$pms[$n-1][0];

	return $pms;
}

function PMD($arr, $n, $k=null, $j=null, $m=null, $a=null, $pms=null, $pmd=null, $inicio=null, $serie=null){
//PMD
  $pmd = array();
	for ($x = $k+$j; $x <= $n ; $x++) {
  		$acumulador = 0;
  		for ($y = 1; $y <= $j; $y++){
			$acumulador += $pms[$x-$y][0];
		}
		$pmd[$x][0] = $acumulador/$j;
	}

//Errores Absoluto, Medio y Relativo de PMD
	$suma = 0;
	$contador = 0;
	for ($i = $k+$j; $i < $n ; $i++) {
		$pmd[$i][1] = abs($pmd[$i][0] - $arr[$i]);
		$suma += $pmd[$i][1];
		$contador++;
	}
	$pmd[$n+1][0] = $suma/$contador;
	$pmd[$n+1][1] = $pmd[$n+1][0]*100/$pmd[$n-1][0];

	return $pmd;
}

function PMDA($arr, $n, $k=null, $j=null, $m=null, $a=null, $pms=null, $pmd=null, $inicio=null, $serie=null){
//PMDA
  	$pmda = array();
  	for($i = $k+$j; $i <= $n; $i++){
  		$a = (2*$pms[$i][0])-$pmd[$i][0];
  		$b = (2*abs($pms[$i][0]-$pmd[$i][0]))/($n-1);
  		$pmda[$i][0] = $a+($b*$m);
  	}

//Errores Absoluto, Medio y Relativo de PMDA
	$suma = 0;
	$contador = 0;
	for ($i = $k+$j; $i < $n ; $i++) {
		$pmda[$i][1] = abs($pmda[$i][0] - $arr[$i]);
		$suma += $pmda[$i][1];
		$contador++;
	}
  $pmda[$n+1][0] = $suma/$contador;
	$pmda[$n+1][1] = $pmda[$n+1][0]*100/$pmda[$n-1][0];

	return $pmda;
}

function PTMAC($arr, $n, $k=null, $j=null, $m=null, $a=null, $pms=null, $pmd=null, $inicio=null, $serie=null){
//PTMAC
  	$tmac = array();
  	$ptmac = array();

  	for($i = 1; $i < $n; $i++){
  		$tmac[$i] = (($arr[$i]*100)/$arr[$i-1])-100;
  	}

	for ($i = 2; $i <= $n ; $i++) {
		$ptmac[$i][0] = ($arr[$i-1]+($arr[$i-1]*($tmac[$i-1]/100)));
	}

//Errores Absoluto, Medio y Relativo de PTMAC
	$suma = 0;
	$contador = 0;
	for ($i = 2; $i < $n ; $i++) {
		$ptmac[$i][1] = abs($ptmac[$i][0] - $arr[$i]);
		$suma += $ptmac[$i][1];
		$contador++;
	}
	$ptmac[$n+1][0] = $suma/$contador;
	$ptmac[$n+1][1] = $ptmac[$n+1][0]*100/$ptmac[$n-1][0];

	return $ptmac;
}

function SE($arr, $n, $k=null, $j=null, $m=null, $a=null, $pms=null, $pmd=null, $inicio=null, $serie=null){
//SE
  $se = array();
	for ($i = $inicio; $i <= $n ; $i++) {
		$se[$i][0] = $serie[$i-1][0]+($a*($arr[$i-1]-$serie[$i-1][0]));
	}

//Errores Absoluto, Medio y Relativo de SE
	$suma = 0;
	$contador = 0;
	for ($i = $inicio; $i < $n ; $i++) {
		$se[$i][1] = abs($se[$i][0] - $arr[$i]);
		$suma += $se[$i][1];
		$contador++;
	}
	$se[$n+1][0] = $suma/$contador;
	$se[$n+1][1] = $se[$n+1][0]*100/$se[$n-1][0];

	return $se;
}

?>
