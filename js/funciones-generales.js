/* Dropdown de Criptodivisas */

function activar_dropdown(){
  document.getElementById("seleccionar-criptodivisa").classList.add("is-active");
  document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","desactivar_dropdown()")
}

function desactivar_dropdown(){
  document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
  document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()")
}

  document.addEventListener("click", function (e) {
  	var level = 0;
	var bandera = 0;
  for (var element = e.target; element; element = element.parentNode) {
    if (element.id === 'contenedor-criptodivisa-id') {
    	bandera = 1;

    	break;
      return;
    }
    level++;
  }

  if(bandera==0){
  	document.getElementById("seleccionar-criptodivisa").classList.remove("is-active");
  	 document.getElementById("seleccionar-criptodivisa").setAttribute("onclick","activar_dropdown()")
  }


});