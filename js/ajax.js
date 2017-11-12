function cargarDatos(tipo){
  var cargar = new XMLHttpRequest();
  cargar.open("GET", "php/controlador.php?tipo="+tipo, true);
  cargar.send();
  cargar.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     dJSON = JSON.parse(this.responseText);
     tabla = document.getElementById('datos');
     tabla.innerHTML = "";
     headers = document.getElementById('titulos');
     headers.innerHTML = "";
     cell1 = headers.insertCell();
     cell2 = headers.insertCell();
     cell1.innerHTML = "<b>Periodo</b>";
     cell2.innerHTML = "<b>Frecuencia</b>";
     localStorage.setItem('n', dJSON.length);
     localStorage.setItem('datos', "[");
     localStorage.setItem('periodos', "");
     for (i = 0; i<dJSON.length; i++) {
       row = tabla.insertRow(i);
       cell1 = row.insertCell();
       cell2 = row.insertCell();
       cell1.innerHTML = dJSON[i].periodo;
       cell2.innerHTML = dJSON[i].frecuencia;
       i+1 == dJSON.length ? localStorage.setItem('datos', localStorage.getItem('datos')+dJSON[i].frecuencia) : localStorage.setItem('datos', localStorage.getItem('datos')+dJSON[i].frecuencia+",");
       i+1 == dJSON.length ? localStorage.setItem('periodos', localStorage.getItem('periodos')+'"'+dJSON[i].periodo+'"') : localStorage.setItem('periodos', localStorage.getItem('periodos')+'"'+dJSON[i].periodo+'"'+",");
     }
     localStorage.setItem('datos', localStorage.getItem('datos')+"]");
    }
  };
}

function cargarPronostico(e, tipo){
  switch (tipo) {
    case "PMS":
      k = document.getElementById('k').value;
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n')+"&k="+k);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          console.log(dJSON);
          generarTabla(dJSON, tipo, k)
        }
      };
      e.onclick = function (){
          borrarTabla(e, tipo);
      };
    break;

    case "PMD":
      k = document.getElementById('k').value;
      j = document.getElementById('j').value;
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n')+"&k="+k+"&j="+j);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          console.log(dJSON);
          generarTabla(dJSON, tipo, k, j)
        }
      };
      e.onclick = function (){
          borrarTabla(e, tipo);
      };
      break;

    case "PMDA":
      k = document.getElementById('k').value;
      j = document.getElementById('j').value;
      m = document.getElementById('m').value;
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n')+"&k="+k+"&j="+j+"&m="+m);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          console.log(dJSON);
          generarTabla(dJSON, tipo, k, j, m)
        }
      };
      e.onclick = function (){
          borrarTabla(e, tipo);
      };
      break;

    case "PTMAC":
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n'));
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          console.log(dJSON);
          generarTabla(dJSON, tipo, 1)
        }
      };
      e.onclick = function (){
          borrarTabla(e, tipo);
      };
      break;

    case "SE":
      document.getElementById('k').value ? k = document.getElementById('k').value : k = null;
      document.getElementById('j').value ? j = document.getElementById('j').value : j = null;
      document.getElementById('m').value ? m = document.getElementById('m').value : m = null;
      document.getElementById('a').value ? a = document.getElementById('a').value : a = null;
      document.getElementById('p').value ? p = document.getElementById('p').value : p = null;

      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n')+"&k="+k+"&j="+j+"&m="+m+"&a="+a+"&p="+p);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          console.log(dJSON);
          generarTabla(dJSON, tipo, k, j, m, a)
        }
      };
      e.onclick = function (){
          borrarTabla(e, tipo);
      };
      break;

    default:
      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n'));
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          console.log(dJSON);
          generarTabla(dJSON, tipo)
        }
      };
      e.onclick = function (){
          borrarTabla(e, tipo);
      };
      break;
  }
}

function generarTabla(dJSON, tipo, k=null, j=null, m=null, a=null){
  //Insertamos los títulos a la tabla
  headers = document.getElementById('titulos');
  cell3 = headers.insertCell();
  cell4 = headers.insertCell();
  cell3.innerHTML = "<b>" + tipo + "</b>";
  cell4.innerHTML = "<b>E<sub>ABS</sub>" + tipo + "</b>";
  //Añadimos la clase para poder quitarlas después
  cell3.classList.add(tipo);
  cell4.classList.add(tipo);

  tabla = document.getElementById('datos');
  row = tabla.insertRow();
  row.insertCell();
  row.insertCell();

  //Variable que contiene la cantidad de frecuencias
  n = Object.keys(dJSON).length;

  
  // x = localStorage.getItem('periodos');
  // x = x.split(',');
  // x = x[n-2].replace('"','');
  // x = x.split('-');
  // x[2] = x[2].replace('"', '');
  // x[2] = parseInt(x[2])+1;

  // //PMS
  // if (k && !j) {
  //   k = parseInt(k);
  //   n = n + k - 1;
  //   console.log(n);
  // }
  //
  // //PMD
  // if (k && j && !m) {
  //   k = parseInt(k);
  //   n = n +  k + 1;
  //   console.log(n);
  // }
  //
  // //PMDA
  // if (k && j && m) {
  //   k = parseInt(k);
  //   n = n + k +1;
  //   console.log(n);
  // }
  //
  // //PTMAC
  // if (k && !j && !m && tipo != "PMS") {
  //   k = parseInt(k);
  //   n = n+1;
  //   console.log(n);
  // }
  //
  // if (a) {
  //   n = n +1;
  //   console.log(n);
  // }

  //Volver n dinámica
  for (i = 0; i < 119; i++) {
     row = tabla.rows[i];
     cell1 = row.insertCell();
     cell1.classList.add(tipo);
     cell2 = row.insertCell();
     cell2.classList.add(tipo);
     if (dJSON[i]) {
       dJSON[i][0] ? cell1.innerHTML = parseFloat(dJSON[i][0]).toFixed(2) : cell1.innerHTML = "-";
       dJSON[i][1] ? cell2.innerHTML = parseFloat(dJSON[i][1]).toFixed(2) : cell2.innerHTML = "-";
     }
     else{
       cell1.innerHTML = "-";
       cell2.innerHTML = "-";
     }
  }
  // row1 = tabla.insertRow();
  // cell1 = row1.insertCell();
  // cell1.classList.add(tipo);
  // cell1.innerHTML = "<b>Error Medio</b>";
  // cell1.colSpan = 2;
  //
  // cell2 = row1.insertCell();
  // cell2.innerHTML = parseFloat(dJSON[n][0]).toFixed(2);
  // cell2.classList.add(tipo);
  // cell2.colSpan = 2;
  //
  // row2 = tabla.insertRow();
  // cell1 = row2.insertCell();
  // cell1.classList.add(tipo);
  // cell1.innerHTML = "<b>Error Relativo</b>";
  // cell1.colSpan = 2;
  //
  // cell2 = row2.insertCell();
  // cell2.colSpan = 2;
  // cell2.innerHTML = parseFloat(dJSON[n][1]).toFixed(2)+"%";
  // cell2.classList.add(tipo);
}

function borrarTabla(e, tipo){
  cells = document.querySelectorAll('.'+tipo);
  for (var i = 0; i < cells.length; i++) {
    cells[i].remove();
  }
  e.onclick = function (){
      cargarPronostico(e, tipo);
  };
}
