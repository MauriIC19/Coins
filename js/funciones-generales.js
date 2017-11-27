document.getElementById("navegacion-datos").addEventListener("click",mostrarContenidoFuncion);
document.getElementById("navegacion-grafica").addEventListener("click",mostrarContenidoFuncion);
document.getElementById("navegacion-indicador").addEventListener("click",mostrarContenidoFuncion);

function mostrarContenidoFuncion(){
  mostrarContenido(this.id);
}

function mostrarContenido(elemento){

  if(elemento == 'navegacion-datos'){
    document.getElementById('ajustable-uno').classList.remove("no-display");

    document.getElementById('ajustable-dos').classList.add("no-display");
    document.getElementById('ajustable-tres').classList.add("no-display");
  }

  if(elemento == 'navegacion-grafica'){
    document.getElementById('ajustable-dos').classList.remove("no-display");

    document.getElementById('ajustable-uno').classList.add("no-display");
    document.getElementById('ajustable-tres').classList.add("no-display");

    setTimeout(function(){grafica.reflow(); }, 0);

  }

  if(elemento == 'navegacion-indicador'){
    document.getElementById('ajustable-tres').classList.remove("no-display");

    document.getElementById('ajustable-uno').classList.add("no-display");
    document.getElementById('ajustable-dos').classList.add("no-display");

    setTimeout(function(){graficoKPI.reflow(); }, 0);


  }

}

/* Dropdown de Criptodivisas */

function activar_dropdown(){
  document.getElementById("seleccionar-criptodivisa").classList.add("is-active");
  document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","desactivar_dropdown()");
}

function desactivar_dropdown(){
  document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
  document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()");
}

  document.addEventListener("click", function (e) {
  	var level = 0;
	  var bandera = 0;
    var actualId = "";



  for (var element = e.target; element; element = element.parentNode) {
    if (element.id === 'contenedor-criptodivisa-id' || element.id === 'contenedor-promedio-movil-simple' || element.id === 'contenedor-promedio-movil-doble' || element.id === 'contenedor-promedio-movil-doble-ajustado' || element.id === 'contenedor-suvizacion-exponencial') {
    	bandera = 1;
      actualId = element.id;
    	break;
      return;
    }
    level++;
  }

  if(bandera==0){

  	document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
  	document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()")

    document.getElementById("promedio-movil-simple").classList.remove("is-active");
  	document.getElementById("promedio-movil-simple-accion").setAttribute("onclick","activar_dropdown_pms()")

    document.getElementById("promedio-movil-doble").classList.remove("is-active");
  	document.getElementById("promedio-movil-doble-accion").setAttribute("onclick","activar_dropdown_pmd()")

    document.getElementById("promedio-movil-doble-ajustado").classList.remove("is-active");
    document.getElementById("promedio-movil-doble-ajustado-accion").setAttribute("onclick","activar_dropdown_pmda()")

    document.getElementById("suavizacion-exponencial").classList.remove("is-active");
    document.getElementById("suavizacion-exponencial-accion").setAttribute("onclick","activar_dropdown_se()")

    if(document.getElementById("boton-pms").innerHTML=="Eliminar"){
        document.getElementById("icono-pms").classList.add("filtro-activo");
    }

    if(document.getElementById("boton-pmd").innerHTML=="Eliminar"){
        document.getElementById("icono-pmd").classList.add("filtro-activo");
    }

    if(document.getElementById("boton-pmda").innerHTML=="Eliminar"){
        document.getElementById("icono-pmda").classList.add("filtro-activo");
    }

    if(document.getElementById("boton-se").innerHTML=="Eliminar"){
        document.getElementById("icono-se").classList.add("filtro-activo");
    }

  }else{

    if (actualId == 'contenedor-criptodivisa-id') {
      document.getElementById("promedio-movil-simple").classList.remove("is-active");
      document.getElementById("promedio-movil-simple-accion").setAttribute("onclick","activar_dropdown_pms()")

      document.getElementById("promedio-movil-doble").classList.remove("is-active");
    	document.getElementById("promedio-movil-doble-accion").setAttribute("onclick","activar_dropdown_pmd()")

      document.getElementById("promedio-movil-doble-ajustado").classList.remove("is-active");
      document.getElementById("promedio-movil-doble-ajustado-accion").setAttribute("onclick","activar_dropdown_pmda()")

      document.getElementById("suavizacion-exponencial").classList.remove("is-active");
      document.getElementById("suavizacion-exponencial-accion").setAttribute("onclick","activar_dropdown_se()")

      if(document.getElementById("boton-pms").innerHTML=="Eliminar"){
          document.getElementById("icono-pms").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-pmd").innerHTML=="Eliminar"){
          document.getElementById("icono-pmd").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-pmda").innerHTML=="Eliminar"){
          document.getElementById("icono-pmda").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-se").innerHTML=="Eliminar"){
          document.getElementById("icono-se").classList.add("filtro-activo");
      }
    }

    if (actualId == 'contenedor-promedio-movil-simple') {
      document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
      document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()")

      document.getElementById("promedio-movil-doble").classList.remove("is-active");
    	document.getElementById("promedio-movil-doble-accion").setAttribute("onclick","activar_dropdown_pmd()")

      document.getElementById("promedio-movil-doble-ajustado").classList.remove("is-active");
      document.getElementById("promedio-movil-doble-ajustado-accion").setAttribute("onclick","activar_dropdown_pmda()")

      document.getElementById("suavizacion-exponencial").classList.remove("is-active");
      document.getElementById("suavizacion-exponencial-accion").setAttribute("onclick","activar_dropdown_se()")


      if(document.getElementById("boton-pmd").innerHTML=="Eliminar"){
          document.getElementById("icono-pmd").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-pmda").innerHTML=="Eliminar"){
          document.getElementById("icono-pmda").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-se").innerHTML=="Eliminar"){
          document.getElementById("icono-se").classList.add("filtro-activo");
      }

    }

    if (actualId == 'contenedor-promedio-movil-doble') {
      document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
    	document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()")

      document.getElementById("promedio-movil-simple").classList.remove("is-active");
    	document.getElementById("promedio-movil-simple-accion").setAttribute("onclick","activar_dropdown_pms()")

      document.getElementById("promedio-movil-doble-ajustado").classList.remove("is-active");
      document.getElementById("promedio-movil-doble-ajustado-accion").setAttribute("onclick","activar_dropdown_pmda()")

      document.getElementById("suavizacion-exponencial").classList.remove("is-active");
      document.getElementById("suavizacion-exponencial-accion").setAttribute("onclick","activar_dropdown_se()")

      if(document.getElementById("boton-pms").innerHTML=="Eliminar"){
          document.getElementById("icono-pms").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-pmda").innerHTML=="Eliminar"){
          document.getElementById("icono-pmda").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-se").innerHTML=="Eliminar"){
          document.getElementById("icono-se").classList.add("filtro-activo");
      }
    }

    if (actualId == 'contenedor-promedio-movil-doble-ajustado') {
      document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
      document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()")

      document.getElementById("promedio-movil-simple").classList.remove("is-active");
      document.getElementById("promedio-movil-simple-accion").setAttribute("onclick","activar_dropdown_pms()")

      document.getElementById("promedio-movil-doble").classList.remove("is-active");
      document.getElementById("promedio-movil-doble-accion").setAttribute("onclick","activar_dropdown_pmd()")

      document.getElementById("suavizacion-exponencial").classList.remove("is-active");
      document.getElementById("suavizacion-exponencial-accion").setAttribute("onclick","activar_dropdown_se()")

      if(document.getElementById("boton-pms").innerHTML=="Eliminar"){
          document.getElementById("icono-pms").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-pmd").innerHTML=="Eliminar"){
          document.getElementById("icono-pmd").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-se").innerHTML=="Eliminar"){
          document.getElementById("icono-se").classList.add("filtro-activo");
      }
    }

    if (actualId == 'contenedor-suvizacion-exponencial') {
      document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
      document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()")

      document.getElementById("promedio-movil-simple").classList.remove("is-active");
      document.getElementById("promedio-movil-simple-accion").setAttribute("onclick","activar_dropdown_pms()")

      document.getElementById("promedio-movil-doble").classList.remove("is-active");
      document.getElementById("promedio-movil-doble-accion").setAttribute("onclick","activar_dropdown_pmd()")

      document.getElementById("promedio-movil-doble-ajustado").classList.remove("is-active");
      document.getElementById("promedio-movil-doble-ajustado-accion").setAttribute("onclick","activar_dropdown_pmda()")

      if(document.getElementById("boton-pms").innerHTML=="Eliminar"){
          document.getElementById("icono-pms").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-pmd").innerHTML=="Eliminar"){
          document.getElementById("icono-pmd").classList.add("filtro-activo");
      }

      if(document.getElementById("boton-pmda").innerHTML=="Eliminar"){
          document.getElementById("icono-pmda").classList.add("filtro-activo");
      }

    }


  }

});

function activar_dropdown_pms(){
  document.getElementById("promedio-movil-simple").classList.add("is-active");
  document.getElementById("promedio-movil-simple-accion").setAttribute("onclick","desactivar_dropdown_pms()");
}

function desactivar_dropdown_pms(){
  document.getElementById("promedio-movil-simple").classList.remove("is-active");
  document.getElementById("promedio-movil-simple-accion").setAttribute("onclick","activar_dropdown_pms()");

  if(document.getElementById("boton-pms").innerHTML=="Eliminar"){
      document.getElementById("icono-pms").classList.add("filtro-activo");
  }
}

function activar_dropdown_pmd(){
  document.getElementById("promedio-movil-doble").classList.add("is-active");
  document.getElementById("promedio-movil-doble-accion").setAttribute("onclick","desactivar_dropdown_pmd()")
}

function desactivar_dropdown_pmd(){
  document.getElementById("promedio-movil-doble").classList.remove("is-active");
  document.getElementById("promedio-movil-doble-accion").setAttribute("onclick","activar_dropdown_pmd()")

  if(document.getElementById("boton-pmd").innerHTML=="Eliminar"){
      document.getElementById("icono-pmd").classList.add("filtro-activo");
  }

}

function activar_dropdown_pmda(){
  document.getElementById("promedio-movil-doble-ajustado").classList.add("is-active");
  document.getElementById("promedio-movil-doble-ajustado-accion").setAttribute("onclick","desactivar_dropdown_pmda()")
}

function desactivar_dropdown_pmda(){
  document.getElementById("promedio-movil-doble-ajustado").classList.remove("is-active");
  document.getElementById("promedio-movil-doble-ajustado-accion").setAttribute("onclick","activar_dropdown_pmda()")

  if(document.getElementById("boton-pmda").innerHTML=="Eliminar"){
      document.getElementById("icono-pmda").classList.add("filtro-activo");
  }

}

function activar_dropdown_se(){
  document.getElementById("suavizacion-exponencial").classList.add("is-active");
  document.getElementById("suavizacion-exponencial-accion").setAttribute("onclick","desactivar_dropdown_se()")
}

function desactivar_dropdown_se(){
  document.getElementById("suavizacion-exponencial").classList.remove("is-active");
  document.getElementById("suavizacion-exponencial-accion").setAttribute("onclick","activar_dropdown_se()")

  if(document.getElementById("boton-se").innerHTML=="Eliminar"){
      document.getElementById("icono-se").classList.add("filtro-activo");
  }
}

function activar_dropdown_se_interno(){
  document.getElementById("seleccionar-se").classList.add("is-active");
  document.getElementById("seleccionar-se").setAttribute("onclick","desactivar_dropdown_se_interno()")
}

function desactivar_dropdown_se_interno(){
  document.getElementById("seleccionar-se").classList.remove("is-active");
  document.getElementById("seleccionar-se").setAttribute("onclick","activar_dropdown_se_interno()")
}

/* Contenedor Filtros */

function habilitarFiltros(){
  document.querySelector(".contenedor-filtros").classList.add("habilitar-eventos");

  document.getElementById("navegacion-datos").classList.remove("no-eventos");
  document.getElementById("navegacion-grafica").classList.remove("no-eventos");
  document.getElementById("navegacion-indicador").classList.remove("no-eventos");

  document.getElementById("navegacion-datos").classList.add("habilitar-eventos");
  document.getElementById("navegacion-grafica").classList.add("habilitar-eventos");
    document.getElementById("navegacion-indicador").classList.add("habilitar-eventos");

}

/* Suavización Exponencial */

function habilitarVariables(filtro){

  if(filtro == 'PS'){
    document.getElementById('lista-pronosticos').setAttribute('value','PS');
    document.getElementById('lista-pronosticos').innerHTML = 'P. Simple';

    document.getElementById('contenedor-kse').classList.add("no-display");
    document.getElementById('contenedor-jse').classList.add("no-display");
    document.getElementById('contenedor-mse').classList.add("no-display");

    document.getElementById('contenedor-ase').classList.remove("no-display");
    document.getElementById('contenedor-boton-se').classList.remove("no-display");
  }

  if (filtro == 'PMS') {
    document.getElementById('lista-pronosticos').setAttribute('value','PMS');
    document.getElementById('lista-pronosticos').innerHTML = 'P. Móvil Simple';

    document.getElementById('contenedor-jse').classList.add("no-display");
    document.getElementById('contenedor-mse').classList.add("no-display");

    document.getElementById('contenedor-kse').classList.remove("no-display");
    document.getElementById('contenedor-ase').classList.remove("no-display");
    document.getElementById('contenedor-boton-se').classList.remove("no-display");
  }

  if (filtro == 'PMD') {
    document.getElementById('lista-pronosticos').setAttribute('value','PMD');
    document.getElementById('lista-pronosticos').innerHTML = 'P. Móbil Doble';

    document.getElementById('contenedor-mse').classList.add("no-display");

    document.getElementById('contenedor-kse').classList.remove("no-display");
    document.getElementById('contenedor-jse').classList.remove("no-display");
    document.getElementById('contenedor-ase').classList.remove("no-display");
    document.getElementById('contenedor-boton-se').classList.remove("no-display");
  }

  if (filtro == 'PMDA') {
    document.getElementById('lista-pronosticos').setAttribute('value','PMDA');
    document.getElementById('lista-pronosticos').innerHTML = 'P. M. Doble A.'

    document.getElementById('contenedor-kse').classList.remove("no-display");
    document.getElementById('contenedor-jse').classList.remove("no-display");
    document.getElementById('contenedor-mse').classList.remove("no-display");
    document.getElementById('contenedor-ase').classList.remove("no-display");
    document.getElementById('contenedor-boton-se').classList.remove("no-display");
  }

  if (filtro == 'PTMAC') {
    document.getElementById('lista-pronosticos').setAttribute('value','PTMAC');

    document.getElementById('lista-pronosticos').innerHTML = 'P.T.M.A.C.'

    document.getElementById('contenedor-kse').classList.add("no-display");
    document.getElementById('contenedor-jse').classList.add("no-display");
    document.getElementById('contenedor-mse').classList.add("no-display");

    document.getElementById('contenedor-ase').classList.remove("no-display");
    document.getElementById('contenedor-boton-se').classList.remove("no-display");
  }

}
