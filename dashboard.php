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
  <script src="js/ajax.js"></script>
  <link rel="stylesheet" href="css/estilos.css">
  <link rel="stylesheet" href="css/bulma.css">
  <link rel="stylesheet" href="css/font-awesome/css/font-awesome.css">
  <title>Dashboard</title>
</head>
<body onload="deshabilitarBotones()">

  <section class="hero">

    <div class="shadow-head hero-head">
      <div class="navbar">
        <div class="container">

          <div class="navbar-brand">
            <div href="navbar-item" class="has-text-centered">
              <span class="parte-uno-logo is-size-3">Crypto</span><span class="parte-dos-logo is-size-3">Sight</span>
              <h3 class="parte-tres-logo is-size-7">Universidad Autónoma de Querétaro</h3>
            </div>
          </div>

          <div id="navbarMenuHeroA" class="navbar-menu">
            <div class="navbar-end">
              <div class="navbar-item">
                <span class="is-size-6 parte-uno-saludo">Hola,&nbsp</span><span class="is-size-6 parte-dos-saludo">Luis Jorge</span>
              </div>

              <div class="navbar-item">
                <figure class="">
                  <img class="imagen-perfil" src="img/perfil.jpg" alt="">
                </figure>
              </div>

              <div class="cerrar-sesion navbar-item">
                <form id="form-cerrar-sesion" action="#" method="POST">
                  <figure class="">
                    <input type="hidden" name="btnC" value="">
                    <img onclick="document.getElementById('form-cerrar-sesion').submit();" class="imagen-cerrar-sesion" src="img/cerrar-sesion.svg" alt="">
                  </figure>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container">
      <div class="contenedor-principal columns is-multiline">

        <div class="titulo-dashboard column is-12">

          <h1 class="title is-4">Dashboard</h1>


        </div>

        <div class="column is-2">
          <div class="columns is-multiline">
            <div class="contenedor-criptodivisa column is-12">
              <h4 class="is-size-7">Criptodivisas</h4>
              <div id="seleccionar-criptodivisa" class="dropdown" onclick="activar_dropdown()">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span class="is-size-7">Lista de Opciones</span>
                    <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a onclick="cargarDatos(0)"  class="dropdown-item is-size-7">
                      <span class="icon is-small">
                        <i class="fa fa-gg" aria-hidden="true"></i>
                      </span><span>&nbspEthereum</span>
                    </a>

                    <a onclick="cargarDatos(1)" class="dropdown-item is-size-7">
                      <span class="icon is-small">
                        <i class="fa fa-btc" aria-hidden="true"></i>
                      </span><span>&nbspBitcoin</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-10">

          <div class="columns is-multiline">
            <div id="contenedor-general-derecha" class="column is-12">
              <div class="columns is-multiline">
                <div class="column is-12 is-size-7">
                  <div class="columns is-multiline">
                    <div id="promedio-simple" class="colum is-2 no-seleccionado" onclick="cargarPronostico(this, 'PS')">
                      <div class="navbar-item" >
                        <span class="icon is-small">
                          <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                        </span><span>&nbsp&nbspP. Simple</span>
                      </div>
                    </div>
                    <div  class="colum is-2 no-seleccionado" >
                      <div id="promedio-movil-simple" class="navbar-item has-dropdown" >
                        <div id="promedio-movil-simple-accion" class="navbar-link" onclick="activar_dropdown_pms()">
                          <span class="icon is-small">
                            <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                          </span><span>&nbsp&nbspP. Móvil Simple</span>
                        </div>

                        <div class="auxiliares-contenedor navbar-dropdown is-size-7">

                          <div class="columns is-multiline has-text-centered">
                            <div class="column is-12">
                              <h3>Auxiliares</h3>
                            </div>

                            <div class="column is-12">
                              <input type="text" name="" value="" placeholder="Ingrese J" >
                            </div>

                            <div class="column is-12">
                                <button type="button" name="button">Calcular</button>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>





                  </div>
                </div>
              </div>
            </div>
          </div>



          <div id="opciones">
            <button >PS</button>
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
          <h2 id="mejor">

          </h2>
        </div>

      </div>

      <div>
        <div id="tablas" class="seccion">

        </div>
      </div>
    </div>



  </section>
</body>
</html>
