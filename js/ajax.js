frecuencias = []
ps = []
pms = []
pmd = []
pmda = []
ptmac = []
se = []
errores = [];

mejorValor = 0;

function cargarDatos(tipo) {

  if (tipo == 0) {
    document.getElementById("texto-lista-opciones").innerHTML = "Ethereum";
    maximoKPI = 500;
    minimoKPI = 200;
    moneda = "Ethereum"
  } else {
    document.getElementById("texto-lista-opciones").innerHTML = "Bitcoin";

    maximoKPI = 10000;
    minimoKPI = 5000;
    moneda = "Bitcoin"
  }

  //Restablecer Botones de Filtros

  //Promedio Simple

  document.getElementById("icono-ps").classList.remove("filtro-activo");
  document.getElementById("ps-principal").onclick = function() {
    cargarPronostico(this, 'PS');
  };

  //Promedio Móvil Simple

  document.getElementById("icono-pms").classList.remove("filtro-activo");
  document.getElementById("boton-pms").innerHTML = "Calcular";
  document.getElementById("kpms").value = "";
  document.getElementById("boton-pms").onclick = function() {
    cargarPronostico(this, 'PMS');
  };

  //Promedio Móvil Doble

  document.getElementById("icono-pmd").classList.remove("filtro-activo");
  document.getElementById("boton-pmd").innerHTML = "Calcular";
  document.getElementById("kpmd").value = "";
  document.getElementById("jpmd").value = "";
  document.getElementById("boton-pmd").onclick = function() {
    cargarPronostico(this, 'PMD');
  };

  //Promedio Móvil Doble Ajustado

  document.getElementById("icono-pmda").classList.remove("filtro-activo");
  document.getElementById("boton-pmda").innerHTML = "Calcular";
  document.getElementById("kpmda").value = "";
  document.getElementById("jpmda").value = "";
  document.getElementById("mpmda").value = "";
  document.getElementById("boton-pmda").onclick = function() {
    cargarPronostico(this, 'PMDA');
  };

  //Suavicación Exponencial

  document.getElementById("icono-se").classList.remove("filtro-activo");
  document.getElementById("boton-se").innerHTML = "Calcular";
  document.getElementById("kse").value = "";
  document.getElementById("jse").value = "";
  document.getElementById("mse").value = "";
  document.getElementById("boton-se").onclick = function() {
    cargarPronostico(this, 'SE');
  };

  //PTMAC

  document.getElementById("icono-ptmac").classList.remove("filtro-activo");
  document.getElementById("ptmac-principal").onclick = function() {
    cargarPronostico(this, 'PTMAC');
  };

  var periodo = []
  frecuencias = []
  ps = []
  pms = []
  pmd = []
  pmda = []
  ptmac = []
  se = []

  var cargar = new XMLHttpRequest();
  cargar.open("GET", "php/controlador.php?tipo=" + tipo, true);
  cargar.send();
  cargar.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      dJSON = JSON.parse(this.responseText);
      //console.log(JSON.stringify(dJSON,null,2));

      tabla = document.getElementById('datos');
      tabla.innerHTML = "";
      headers = document.getElementById('titulos');
      headers.innerHTML = "";
      tablaE = document.getElementById('errores');
      tablaE.innerHTML = "";
      headersE = document.getElementById('titulosErrores');
      headersE.innerHTML = "";
      cell1 = headers.insertCell();
      cell2 = headers.insertCell();
      cell1.innerHTML = "<b>Periodo</b>";
      cell2.innerHTML = "<b>Frecuencia</b>";
      cell3 = headersE.insertCell();
      cell4 = headersE.insertCell();
      cell5 = headersE.insertCell();
      cell3.innerHTML = "<b>Pronóstico</b>";
      cell4.innerHTML = "<b>E<sub>MEDIO</sub></b>";
      cell5.innerHTML = "<b>E<sub>RELATIVO</sub></b>";
      localStorage.setItem('n', dJSON.length);
      localStorage.setItem('datos', "[");
      localStorage.setItem('periodos', "");
      pushArrayFrecuencia(dJSON);

      if (frecuencias.indexOf(0) > -1) {
        document.getElementById("ptmac-principal").classList.add("no-eventos");
      } else {
        document.getElementById("ptmac-principal").classList.remove("no-eventos");
      }
      for (i = 0; i < dJSON.length; i++) {
        row = tabla.insertRow(i);
        cell1 = row.insertCell();
        cell2 = row.insertCell();
        cell1.innerHTML = dJSON[i].periodo;
        cell2.innerHTML = dJSON[i].frecuencia;
        i + 1 == dJSON.length ? localStorage.setItem('datos', localStorage.getItem('datos') + dJSON[i].frecuencia) : localStorage.setItem('datos', localStorage.getItem('datos') + dJSON[i].frecuencia + ",");
        i + 1 == dJSON.length ? localStorage.setItem('periodos', localStorage.getItem('periodos') + '"' + dJSON[i].periodo + '"') : localStorage.setItem('periodos', localStorage.getItem('periodos') + '"' + dJSON[i].periodo + '"' + ",");
      }

      localStorage.setItem('datos', localStorage.getItem('datos') + "]");
      localStorage.getItem('Errores') ? localStorage.removeItem('Errores') : "";
      localStorage.setItem('Errores', '');
    }
  };



  btn = document.querySelectorAll('button');
  for (var i = 0; i < btn.length; i++) {
    btn[i].disabled = false;
  }

  habilitarFiltros();

}

function pushArrayFrecuencia(dJSON) {
  for (var i = 0; i < Object.keys(dJSON).length; i++) {
    frecuencias.push(parseInt(dJSON[i].frecuencia));
  }
  frecuencias.push("");
  generarGrafica();

}

function cargarPronostico(e, tipo) {

  switch (tipo) {
    case "PMS":

      document.getElementById("boton-pms").innerHTML = "Eliminar";

      pms = []
      k = document.getElementById('kpms').value;
      if (k) {
        var cargar = new XMLHttpRequest();
        cargar.open("POST", "php/controlador.php?pronostico=" + tipo, true);
        cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        cargar.send("data=" + localStorage.getItem('datos') + "&pronostico=" + tipo + "&n=" + localStorage.getItem('n') + "&k=" + k);
        cargar.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            dJSON = JSON.parse(this.responseText);



            generarTabla(dJSON, tipo, k);
            pushArrayPMS(dJSON, k);
            generarTablaErrores(dJSON, tipo);
          }
        };
        e.onclick = function() {

          borrarTabla(e, tipo);


          document.getElementById("boton-pms").innerHTML = "Calcular";
          document.getElementById("icono-pms").classList.remove("filtro-activo");
          pms = [];
          generarGrafica();

        };
      } else {
        alert('Por favor ingresa todos los campos');
      }
      break;

    case "PMD":

      document.getElementById("boton-pmd").innerHTML = "Eliminar";

      pmd = []
      k = document.getElementById('kpmd').value;
      j = document.getElementById('jpmd').value;
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico=" + tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data=" + localStorage.getItem('datos') + "&pronostico=" + tipo + "&n=" + localStorage.getItem('n') + "&k=" + k + "&j=" + j);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          generarTabla(dJSON, tipo, k, j);
          pushArrayPMD(dJSON, k, j)
          generarTablaErrores(dJSON, tipo);
        }
      };
      e.onclick = function() {

        borrarTabla(e, tipo);

        document.getElementById("boton-pmd").innerHTML = "Calcular";
        document.getElementById("icono-pmd").classList.remove("filtro-activo");
        pmd = [];
        generarGrafica();

      };
      break;

    case "PMDA":

      document.getElementById("boton-pmda").innerHTML = "Eliminar";

      pmda = []
      k = document.getElementById('kpmda').value;
      j = document.getElementById('jpmda').value;
      m = document.getElementById('mpmda').value;
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico=" + tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data=" + localStorage.getItem('datos') + "&pronostico=" + tipo + "&n=" + localStorage.getItem('n') + "&k=" + k + "&j=" + j + "&m=" + m);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          generarTabla(dJSON, tipo, k, j, m);
          pushArrayPMDA(dJSON, k, j)
          generarTablaErrores(dJSON, tipo);
        }
      };
      e.onclick = function() {

        borrarTabla(e, tipo);

        document.getElementById("boton-pmda").innerHTML = "Calcular";
        document.getElementById("icono-pmda").classList.remove("filtro-activo");
        pmda = [];
        generarGrafica();

      };
      break;

    case "PTMAC":
      ptmac = []
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico=" + tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data=" + localStorage.getItem('datos') + "&pronostico=" + tipo + "&n=" + localStorage.getItem('n'));
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          generarTabla(dJSON, tipo, 1);
          pushArrayPTMAC(dJSON);
          generarTablaErrores(dJSON, tipo);
          document.getElementById("icono-ptmac").classList.add("filtro-activo");
        }
      };
      e.onclick = function() {

        borrarTabla(e, tipo);

        document.getElementById("icono-ptmac").classList.remove("filtro-activo");
        ptmac = [];
        generarGrafica();

      };
      break;

    case "SE":

      document.getElementById("boton-se").innerHTML = "Eliminar";

      se = []
      document.getElementById('kse').value ? k = document.getElementById('kse').value : k = null;
      document.getElementById('jse').value ? j = document.getElementById('jse').value : j = null;
      document.getElementById('mse').value ? m = document.getElementById('mse').value : m = null;
      document.getElementById('ase').value ? a = parseFloat(document.getElementById('ase').value) : a = null;
      document.getElementById('lista-pronosticos').getAttribute("value") ? p = document.getElementById('lista-pronosticos').getAttribute("value") : p = null;

      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico=" + tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data=" + localStorage.getItem('datos') + "&pronostico=" + tipo + "&n=" + localStorage.getItem('n') + "&k=" + k + "&j=" + j + "&m=" + m + "&a=" + a + "&p=" + p);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          generarTabla(dJSON, tipo, k, j, m, a);
          pushArraySE(dJSON, k, j, p)
          generarTablaErrores(dJSON, tipo);
        }
      };
      e.onclick = function() {

        borrarTabla(e, tipo);

        document.getElementById("boton-se").innerHTML = "Calcular";
        document.getElementById("icono-se").classList.remove("filtro-activo");
        se = [];
        generarGrafica();

      };
      break;

    default:
      ps = []
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico=" + tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data=" + localStorage.getItem('datos') + "&pronostico=" + tipo + "&n=" + localStorage.getItem('n'));
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          generarTabla(dJSON, tipo);
          pushArrayPs(dJSON)
          generarTablaErrores(dJSON, tipo);
          document.getElementById("icono-ps").classList.add("filtro-activo");
        }
      };
      e.onclick = function() {

        borrarTabla(e, tipo);

        document.getElementById("icono-ps").classList.remove("filtro-activo");
        ps = [];
        generarGrafica();


      };
      break;
  }
}

function pushArrayPs(dJSON) {
  ps.push("")
  for (var i = 1; i < Object.keys(dJSON).length; i++) {
    ps.push(parseInt(dJSON[i][0]));
  }
  generarGrafica();

}

function pushArrayPMS(dJSON, k) {
  for (i = 0; i < k; i++) {
    pms.push("");
  }
  for (var i = k; i < Object.keys(dJSON).length + parseInt(k) - 1; i++) {
    pms.push(parseInt(dJSON[i][0]));
  }
  generarGrafica();

}

function pushArrayPMD(dJSON, k, j) {
  k = parseInt(k);
  j = parseInt(j);
  for (i = 0; i < (k + j); i++) {
    pmd.push("");
  }
  for (var i = (k + j); i < Object.keys(dJSON).length + k + j - 1; i++) {
    pmd.push(parseInt(dJSON[i][0]));
  }
  generarGrafica();

}

function pushArrayPMDA(dJSON, k, j) {
  k = parseInt(k);
  j = parseInt(j);
  for (i = 0; i < (k + j); i++) {
    pmda.push("");
  }
  for (var i = (k + j); i < Object.keys(dJSON).length + k + j - 1; i++) {
    pmda.push(parseInt(dJSON[i][0]));
  }
  generarGrafica();

}

function pushArrayPTMAC(dJSON) {
  ptmac.push("")
  ptmac.push("")
  for (var i = 2; i <= Object.keys(dJSON).length; i++) {
    ptmac.push(parseInt(dJSON[i][0]));
  }
  generarGrafica();

}

function pushArraySE(dJSON, k = null, j = null, tipo = null) {
  ii = 1;
  switch (tipo) {
    case 'PS':
      ii = 2
      is = Object.keys(dJSON).length
      break;
    case 'PMS':
      ii = parseInt(k) + 1;
      is = Object.keys(dJSON).length + parseInt(k) - 1;
      break;
    case 'PMD':
      ii = parseInt(k) + parseInt(j) + 1;
      is = Object.keys(dJSON).length + parseInt(k) - 1 + parseInt(j);
      break;
    case 'PMDA':
      ii = parseInt(k) + parseInt(j) + 1;
      is = Object.keys(dJSON).length + parseInt(k) - 1 + parseInt(j);
      break;
    case 'PTMAC':
      ii = 3;
      is = Object.keys(dJSON).length + 1;
      break;
  }
  for (i = 0; i < ii; i++) {
    se.push("");
  }
  for (i = ii; i <= is; i++) {
    se.push(parseInt(dJSON[i][0]));
  }
  generarGrafica();

}


function generarTabla(dJSON, tipo, k = null, j = null, m = null, a = null) {

  generarGrafica()

  //Insertamos los títulos a la tabla
  headers = document.getElementById('titulos');
  cell1 = headers.insertCell();
  cell2 = headers.insertCell();
  cell1.innerHTML = "<b>" + tipo + "</b>";
  cell2.innerHTML = "<b>E<sub>ABS</sub>" + tipo + "</b>";
  //Añadimos la clase para poder quitarlas después
  cell1.classList.add(tipo);
  cell2.classList.add(tipo);

  n = parseInt(localStorage.getItem('n'));

  if (document.querySelectorAll('#datos > tr').length < n + 1) {
    tabla = document.getElementById('datos');
    row = tabla.insertRow();
    cell1 = row.insertCell();
    cell1.innerHTML = "2017-11-08"
    cell2 = row.insertCell();
    cell2.innerHTML = "-";
  }


  //Variable que contiene la cantidad de frecuencias
  //n = Object.keys(dJSON).length;

  //Volver n dinámica
  for (i = 0; i < n + 1; i++) {
    row = tabla.rows[i];
    cell1 = row.insertCell();
    cell1.classList.add(tipo);
    cell2 = row.insertCell();
    cell2.classList.add(tipo);

    if (dJSON[i]) {



      dJSON[i][0] ? cell1.innerHTML = parseFloat(dJSON[i][0]).toFixed(2) : cell1.innerHTML = "-";
      dJSON[i][1] ? cell2.innerHTML = parseFloat(dJSON[i][1]).toFixed(2) : cell2.innerHTML = "-";
    } else {
      cell1.innerHTML = "-";
      cell2.innerHTML = "-";
    }
  }


}

function generarTablaErrores(dJSON, tipo) {

  //Añadimos la clase para poder quitarlas después
  tablaE = document.getElementById('errores');
  n = parseInt(localStorage.getItem('n')) + 1;

  row = tablaE.insertRow();

  cell3 = row.insertCell();
  cell3.classList.add(tipo);
  cell4 = row.insertCell();
  cell4.classList.add(tipo);
  cell5 = row.insertCell();
  cell5.classList.add(tipo);
  if (dJSON[n]) {
    tipo ? cell3.innerHTML = "<b>" + tipo + "</b>" : cell3.innerHTML = "-";
    dJSON[n][0] ? cell4.innerHTML = parseFloat(dJSON[n][0]).toFixed(2) : cell5.innerHTML = "-";
    dJSON[n][1] ? cell5.innerHTML = parseFloat(dJSON[n][1]).toFixed(2) : cell5.innerHTML = "-";
    errores.push(tipo);
    errores.push(dJSON[n][1]);
    errores.push(dJSON[n - 1][0])
    getMejor(dJSON, tipo);
  } else {
    cell3.innerHTML = "-";
    cell4.innerHTML = "-";
    cell5.innerHTML = "-";
  }
}

function getMejor(dJSON, tipo) {

  txt = document.getElementById('mejor');
  nums = [];

  if (dJSON == 1) {
    errores.splice(errores.indexOf(tipo), 3);
  }



  for (i = 1; i < errores.length; i += 3) {
    nums.push(parseFloat(errores[i]));
  }

  nums = nums.sort(function(a, b) {
    return a - b
  });

  mejorPronostico = errores[errores.indexOf(nums[0]) - 1];
  mejorValor = Math.round(errores[errores.indexOf(nums[0]) + 1] * 100) / 100

  if (mejorPronostico == 'PS') {
    mejorError = "Promedio Simple";
  }

  if (mejorPronostico == 'PMS') {
    mejorError = "Promedio Móvil Simple";
  }

  if (mejorPronostico == 'PMD') {
    mejorError = "Promedio Móvil Doble";
  }

  if (mejorPronostico == 'PMDA') {
    mejorError = "Promedio Móvil Doble Ajustado";
  }

  if (mejorPronostico == 'SE') {
    mejorError = "Suavización Exponencial";
  }

  if (mejorPronostico == 'PTMAC') {
    mejorError = "Pronóstico de Tasa Media de Crecimiento";
  }


  if (errores[errores.indexOf(nums[0]) - 1]) {
    txt.innerHTML = "Mejor Pronóstico: " + mejorError;
  } else {
    txt.innerHTML = "";
  }
}

function borrarTabla(e, tipo) {

  cells = document.querySelectorAll('.' + tipo);
  for (var i = 0; i < cells.length; i++) {
    cells[i].remove();
  }
  e.onclick = function() {
    cargarPronostico(e, tipo);
  };
  getMejor(1, tipo);
}



function validateNumber(i, evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = new RegExp('^[0-9\.\b\t]$');
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
  n = parseInt(localStorage.getItem('n'));
  ls = 0;
  li = 0;
  if (i.id == 'kpms') {
    ls = n - 1;
    li = 1;
  }

  if (i.id == 'kpmd') {
    ls = n - 2;
    li = 1;
  }
  if (i.id == 'jpmd') {
    ls = n - document.getElementById('kpmd').value - 1;
    li = 1;
  }

  if (i.id == 'kpmda') {
    ls = n - 2;
    li = 1;
  }
  if (i.id == 'jpmda') {
    ls = n - document.getElementById('kpmda').value - 1;
    li = 1;
  }
  if (i.id == 'mpmda') {
    ls = n * n;
    li = 1;
  }

  if (i.id == 'kse') {
    ls = n - 1;
    li = 1;
  }
  if (i.id == 'jse') {
    ls = n - document.getElementById('kse').value - 1;
    li = 1;
  }
  if (i.id == 'mse') {
    ls = n * n;
    li = 1;
  }
  if (i.id == 'ase') {
    ls = 1;
    li = 0;
  }

  if (i.id == 'k') {
    ls = n - 1;
    li = 1;
  }
  if (i.id == 'j') {
    ls = n - document.getElementById('k').value - 1;
    li = 1;
  }
  if (i.id == 'm') {
    ls = n * n;
    li = 1;
  }
  if (i.id == 'a') {
    ls = 1;
    li = 0;
  }
  if (i.value > ls) {
    i.value = ls
  }
  if (i.value < li && i.value) {
    i.value = li
  }
}

/*------ Funciones Front End ------*/


function generarGrafica() {



  //Datos de la gráfica
  grafica = Highcharts.stockChart('grafica', {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Pronósticos'
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    plotOptions: {
      series: {
        pointStart: Date.UTC(2017, 6, 13),
        pointInterval: 24 * 3600 * 1000
      }
    },

    series: [{
        name: 'Frecuencias',
        data: frecuencias,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'Promedio Simple',
        data: ps,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'Promedio Móvil Simple',
        data: pms,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'Promedio Móvil Doble',
        data: pmd,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'Promedio Móvil Doble Ajustado',
        data: pmda,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'PTMAC',
        data: ptmac,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'SE',
        data: se,
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  });

  setTimeout(function() {
    generarKPI()
  }, 0);


}

function generarKPI() {

  var gaugeOptions = {

    chart: {
      type: 'solidgauge'
    },

    title: {
      text: '¿Es un buen momento para invertir en ' + moneda + '?',
      y: 40,
      style: {
        fontSize: '16px'
      }
    },

    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },

    tooltip: {
      enabled: false
    },

    yAxis: {
      stops: [
        [0.1, '#55BF3B'],
        [0.5, '#DDDF0D'],
        [0.9, '#DF5353']
      ],
      lineWidth: 0,
      minorTickInterval: null,

      title: {

      },
      labels: {

      }
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    }
  };

  graficoKPI = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
    yAxis: {
      min: minimoKPI,
      max: maximoKPI,

    },

    series: [{
      name: 'RPM',
      data: [mejorValor],

      tooltip: {
        valueSuffix: ' revolutions/min'
      }
    }]

  }));
}
