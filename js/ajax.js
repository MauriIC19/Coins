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
  btn = document.querySelectorAll('button');
  for (var i = 0; i < btn.length; i++) {
    btn[i].disabled = false;
  }
}

function cargarPronostico(e, tipo){
  switch (tipo) {
    case "PMS":
      k = document.getElementById('k').value;
      if (k) {
        var cargar = new XMLHttpRequest();
        cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
        cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n')+"&k="+k);
        cargar.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            dJSON = JSON.parse(this.responseText);
            console.log(dJSON);
            generarTabla(dJSON, tipo, k);
            generarTablaErrores(dJSON, tipo);
          }
        };
        e.onclick = function (){
            borrarTabla(e, tipo);
        };
      }
      else{
        alert('Por favor ingresa todos los campos');
      }
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
          generarTabla(dJSON, tipo, k, j);
          generarTablaErrores(dJSON, tipo);
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
          generarTabla(dJSON, tipo, k, j, m);
          generarTablaErrores(dJSON, tipo);
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
          generarTabla(dJSON, tipo, 1);
          generarTablaErrores(dJSON, tipo);
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
      document.getElementById('a').value ? a = parseFloat(document.getElementById('a').value) : a = null;
      document.getElementById('p').value ? p = document.getElementById('p').value : p = null;

      var cargar = new XMLHttpRequest();
      cargar.open("POST", "php/controlador.php?pronostico="+tipo, true);
      cargar.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      cargar.send("data="+localStorage.getItem('datos')+"&pronostico="+tipo+"&n="+localStorage.getItem('n')+"&k="+k+"&j="+j+"&m="+m+"&a="+a+"&p="+p);
      cargar.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          dJSON = JSON.parse(this.responseText);
          console.log(dJSON);
          generarTabla(dJSON, tipo, k, j, m, a);
          generarTablaErrores(dJSON, tipo);
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
          generarTabla(dJSON, tipo);
          generarTablaErrores(dJSON, tipo);
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
  cell1 = headers.insertCell();
  cell2 = headers.insertCell();
  cell1.innerHTML = "<b>" + tipo + "</b>";
  cell2.innerHTML = "<b>E<sub>ABS</sub>" + tipo + "</b>";
  //Añadimos la clase para poder quitarlas después
  cell1.classList.add(tipo);
  cell2.classList.add(tipo);

  tabla = document.getElementById('datos');
  row = tabla.insertRow();
  row.insertCell();
  row.insertCell();

  //Variable que contiene la cantidad de frecuencias
  n = Object.keys(dJSON).length;

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
}

function generarTablaErrores(dJSON, tipo){
  //Añadimos la clase para poder quitarlas después
  tablaE = document.getElementById('errores');
  n = parseInt(localStorage.getItem('n'))+1;
  row = tablaE.insertRow();

    cell3 = row.insertCell();
    cell3.classList.add(tipo);
    cell4 = row.insertCell();
    cell4.classList.add(tipo);
    cell5 = row.insertCell();
    cell5.classList.add(tipo);
    if (dJSON[n]) {
      tipo ? cell3.innerHTML = "<b>"+tipo+"</b>" : cell3.innerHTML = "-";
      dJSON[n][0] ? cell4.innerHTML = parseFloat(dJSON[n][0]).toFixed(2) : cell5.innerHTML = "-";
      dJSON[n][1] ? cell5.innerHTML = parseFloat(dJSON[n][1]).toFixed(2) : cell5.innerHTML = "-";
    }
    else{
      cell3.innerHTML = "-";
      cell4.innerHTML = "-";
      cell5.innerHTML = "-";
    }
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

function deshabilitarBotones(){
  btn = document.querySelectorAll('button');
  for (var i = 0; i < btn.length; i++) {
    btn[i].disabled = true;
  }
}

function  habilitarCampo(e, p, s=null){
  if (p) {
    switch (p) {
      case 'PMS':
        deshabilitarCampos(e, p, s);
        document.getElementById('kl').classList.remove('no-visible');
        document.getElementById('k').classList.remove('no-visible');
        document.getElementById('k').value = "";
        s ? document.getElementById('ab').classList.remove('no-visible') : document.getElementById('kb').classList.remove('no-visible');
        e.onclick = function (){
          deshabilitarCampos(e, p, s);
        }
        if (s) {
          document.getElementById('a').classList.remove('no-visible');
          document.getElementById('al').classList.remove('no-visible');
          document.getElementById('p').classList.add('no-visible');
        }
        break;
      case 'PMD':
        deshabilitarCampos(e, p, s);
        document.getElementById('kl').classList.remove('no-visible');
        document.getElementById('k').classList.remove('no-visible');
        document.getElementById('k').value = "";
        document.getElementById('kb').classList.add('no-visible');
        document.getElementById('jl').classList.remove('no-visible');
        document.getElementById('j').classList.remove('no-visible');
        document.getElementById('j').value = "";
        s ? document.getElementById('ab').classList.remove('no-visible') : document.getElementById('jb').classList.remove('no-visible');
        e.onclick = function (){
          deshabilitarCampos(e, p, s);
        }
        if (s) {
          document.getElementById('a').classList.remove('no-visible');
          document.getElementById('al').classList.remove('no-visible');
          document.getElementById('p').classList.add('no-visible');
        }
        break;
      case 'PMDA':
        deshabilitarCampos(e, p, s);
        document.getElementById('kl').classList.remove('no-visible');
        document.getElementById('k').classList.remove('no-visible');
        document.getElementById('k').value = "";
        document.getElementById('kb').classList.add('no-visible');
        document.getElementById('jl').classList.remove('no-visible');
        document.getElementById('j').classList.remove('no-visible');
        document.getElementById('j').value = "";
        document.getElementById('jb').classList.add('no-visible');
        document.getElementById('ml').classList.remove('no-visible');
        document.getElementById('m').classList.remove('no-visible');
        document.getElementById('m').value = "";
        s ? document.getElementById('ab').classList.remove('no-visible') : document.getElementById('mb').classList.remove('no-visible');
        e.onclick = function (){
          deshabilitarCampos(e, p, s);
        }
        if (s) {
          document.getElementById('a').classList.remove('no-visible');
          document.getElementById('al').classList.remove('no-visible');
          document.getElementById('p').classList.add('no-visible');
        }
        break;
      case 'PS':
        if (s) {
          document.getElementById('a').classList.remove('no-visible');
          document.getElementById('al').classList.remove('no-visible');
          document.getElementById('ab').classList.remove('no-visible');
          document.getElementById('p').classList.add('no-visible');
        }
        break;
      case 'PTMAC':
        if (s) {
          document.getElementById('a').classList.remove('no-visible');
          document.getElementById('al').classList.remove('no-visible');
          document.getElementById('ab').classList.remove('no-visible');
          document.getElementById('p').classList.add('no-visible');
        }
        break;
      case 'SE':
        deshabilitarCampos(e, p, s);
        document.getElementById('p').classList.remove('no-visible');
        e.onclick = function (){
          deshabilitarCampos(e, p, s);
        }
        if (s) { habilitarCampo(e, s, 1); }
        break;
      default:
      break;
    }
  }
}

function  deshabilitarCampos(e, p, s=null){
  if (p) {
    switch (p) {
      case 'PMS':
        document.getElementById('kl').classList.add('no-visible');
        document.getElementById('k').classList.add('no-visible');
        document.getElementById('k').value = "";
        document.getElementById('kb').classList.add('no-visible');
        document.getElementById('jl').classList.add('no-visible');
        document.getElementById('j').classList.add('no-visible');
        document.getElementById('j').value = "";
        document.getElementById('jb').classList.add('no-visible');
        document.getElementById('ml').classList.add('no-visible');
        document.getElementById('m').classList.add('no-visible');
        document.getElementById('m').value = "";
        document.getElementById('mb').classList.add('no-visible');
        document.getElementById('al').classList.add('no-visible');
        document.getElementById('a').classList.add('no-visible');
        document.getElementById('a').value = 0;
        document.getElementById('ab').classList.add('no-visible');
        e.onclick = function (){
          habilitarCampo(e, p, s);
        }
        break;
      default:
        document.getElementById('kl').classList.add('no-visible');
        document.getElementById('k').classList.add('no-visible');
        document.getElementById('k').value = "";
        document.getElementById('jl').classList.add('no-visible');
        document.getElementById('j').classList.add('no-visible');
        document.getElementById('j').value = "";
        document.getElementById('ml').classList.add('no-visible');
        document.getElementById('m').classList.add('no-visible');
        document.getElementById('m').value = "";
        document.getElementById('mb').classList.add('no-visible');
        document.getElementById('p').classList.add('no-visible');
        document.getElementById('al').classList.add('no-visible');
        document.getElementById('a').classList.add('no-visible');
        document.getElementById('a').value = 0;
        document.getElementById('ab').classList.add('no-visible');
        e.onclick = function (){
          habilitarCampo(e, p, s);
        }
        break;
    }
  }
}

function validateNumber(i, evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = new RegExp('^[0-9\.\b\t]$');
  if( !regex.test(key)) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
  n = parseInt(localStorage.getItem('n'));
  ls= 0; li = 0;
  if (i.id == 'k'){ ls = n; li = 1; }
  if (i.id == 'j'){ ls = n - document.getElementById('k').value - 1; li = 1; }
  if (i.id == 'm'){ ls = n * n; li = 1; }
  if (i.id == 'a'){ ls = 1; li = 0; }
  if(i.value > ls){
    i.value = ls
  }
  if(i.value < li && i.value){
    i.value = li
  }
}