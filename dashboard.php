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

  <script src="js/highstock/highstock.js"></script>

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
                <span class="is-size-6 parte-uno-saludo">Hola,&nbsp;</span><span class="is-size-6 parte-dos-saludo">Luis Jorge</span>
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
                  <button id="boton-seleccionar-criptodivisa" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
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
                      </span><span>&nbsp;Ethereum</span>
                    </a>

                    <a onclick="cargarDatos(1)" class="dropdown-item is-size-7">
                      <span class="icon is-small">
                        <i class="fa fa-btc" aria-hidden="true"></i>
                      </span><span>&nbsp;Bitcoin</span>
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
                  <div class="columns is-multiline is-narrow">

                    <div id="promedio-simple" class="column is-2 no-seleccionado" onclick="cargarPronostico(this, 'PS')">
                      <div class="navbar-item" >
                        <span class="icon is-small">
                          <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                        </span><span>&nbsp&nbsp;P. Simple</span>
                      </div>
                    </div>

                    <div  class="column is-2 no-seleccionado" >
                      <div id="promedio-movil-simple" class="navbar-item has-dropdown" >
                        <div id="promedio-movil-simple-accion" class="navbar-link" onclick="activar_dropdown_pms()">
                          <span class="icon is-small">
                            <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                          </span><span>&nbsp&nbsp;P. Móvil Simple</span>
                        </div>

                        <div class="auxiliares-contenedor navbar-dropdown is-size-7">
                          <div class="columns is-multiline has-text-centered">
                            <div class="column is-12">
                              <h3>Auxiliares</h3>
                            </div>
                            <div class="column is-12">
                              <input id="kpms" type="text" name="" value="" placeholder="Ingrese K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>
                            <div class="column is-12">
                              <button type="button" class="boton-auxiliar" name="button" onclick="cargarPronostico(this, 'PMS')">Calcular</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="column is-2 no-seleccionado">
                      <div id="promedio-movil-doble" class="navbar-item has-dropdown" >
                        <div id="promedio-movil-doble-accion" class="navbar-link" onclick="activar_dropdown_pmd()">
                          <span class="icon is-small">
                            <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                          </span><span>&nbsp&nbsp;P. Móvil Doble</span>
                        </div>

                        <div class="auxiliares-contenedor navbar-dropdown is-size-7">
                          <div class="columns is-multiline has-text-centered">
                            <div class="column is-12">
                              <h3>Auxiliares</h3>
                            </div>
                            <div class="column is-12">
                              <input id="kpmd" type="text" name="" value="" placeholder="Ingrese K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>
                            <div class="column is-12">
                              <input id="jpmd" type="text" name="" value="" placeholder="Ingrese J" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese J'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>
                            <div class="column is-12">
                              <button type="button" class="boton-auxiliar" name="button" onclick="cargarPronostico(this, 'PMD')">Calcular</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="column is-2 no-seleccionado">
                      <div id="promedio-movil-doble-ajustado" class="navbar-item has-dropdown" >
                        <div id="promedio-movil-doble-ajustado-accion" class="navbar-link" onclick="activar_dropdown_pmda()">
                          <span class="icon is-small">
                            <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                          </span><span>&nbsp&nbsp;P. Mov. Dob. Aju.</span>
                        </div>

                        <div class="auxiliares-contenedor navbar-dropdown is-size-7">
                          <div class="columns is-multiline has-text-centered">
                            <div class="column is-12">
                              <h3>Auxiliares</h3>
                            </div>
                            <div class="column is-12">
                              <input id="kpmda" type="text" name="" value="" placeholder="Ingrese K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>
                            <div class="column is-12">
                              <input id="jpmda" type="text" name="" value="" placeholder="Ingrese J" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese J'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>
                            <div class="column is-12">
                              <input id="mpmda" type="text" name="" value="" placeholder="Ingrese M" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese M'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>
                            <div class="column is-12">
                              <button type="button" class="boton-auxiliar" name="button" onclick="cargarPronostico(this, 'PMDA')">Calcular</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="column is-2 no-seleccionado">
                      <div id="suavizacion-exponencial" class="navbar-item has-dropdown" >
                        <div id="suavizacion-exponencial-accion" class="navbar-link" onclick="activar_dropdown_se()">
                          <span class="icon is-small">
                            <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                          </span><span>&nbsp&nbsp;Suav. Exp.</span>
                        </div>

                        <div class="auxiliares-contenedor navbar-dropdown is-size-7">
                          <div class="columns is-multiline has-text-centered">
                            <div class="column is-12">
                              <h3>Auxiliares</h3>
                            </div>

                            <div class="column is-12">
                              <input id="kse" type="text" name="" value="" placeholder="Ingrese K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>

                            <div class="column is-12">
                              <input id="jse" type="text" name="" value="" placeholder="Ingrese J" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese J'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>

                            <div class="column is-12">
                              <input id="mse" type="text" name="" value="" placeholder="Ingrese M" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese M'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>

                            <div class="column is-12">
                              <input id="ase" type="text" name="" value="" placeholder="Ingrese A" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese A'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                            </div>

                            <div class="column is-12">
                              <!--<select required id="p">
                                <option value="" selected disabled hidden>Selecciona...</option>
                                <option value="PS">PS</option>
                                <option value="PMS">PMS</option>
                                <option value="PMD">PMD</option>
                                <option value="PMDA">PMDA</option>
                                <option value="PTMAC">PTMAC</option>
                              </select>-->

                              <div id="seleccionar-se" class="dropdown" onclick="activar_dropdown_se_interno()">
                                <div class="dropdown-trigger">
                                  <button id="boton-seleccionar-se" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span id="lista-pronosticos" class="is-size-7">Pronósticos</span>
                                    <span class="icon is-small">
                                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                  </button>
                                </div>
                                <div class="dropdown-menu has-text-left" id="dropdown-menu" role="menu">
                                  <div class="dropdown-content">
                                    <a onclick="document.getElementById('lista-pronosticos').setAttribute('value','PS'); document.getElementById('lista-pronosticos').innerHTML = 'P. Simple'"  class="dropdown-item is-size-7">
                                      <span>&nbsp;P. Simple</span>
                                    </a>

                                    <a onclick="document.getElementById('lista-pronosticos').setAttribute('value','PMS'); document.getElementById('lista-pronosticos').innerHTML = 'P. Móvil Simple'" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. Móvil Simple</span>
                                    </a>

                                    <a onclick="document.getElementById('lista-pronosticos').setAttribute('value','PMD'); document.getElementById('lista-pronosticos').innerHTML = 'P. Móbil Doble'" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. Móvil Doble</span>
                                    </a>

                                    <a onclick="document.getElementById('lista-pronosticos').setAttribute('value','PMDA'); document.getElementById('lista-pronosticos').innerHTML = 'P. M. Doble A.'" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. M. Doble A.</span>
                                    </a>

                                    <a onclick="document.getElementById('lista-pronosticos').setAttribute('value','PTMAC'); document.getElementById('lista-pronosticos').innerHTML = 'P. T. M. A. de C.'" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. T. M. A. de C.</span>
                                    </a>

                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="column is-12">
                              <button type="button" class="boton-auxiliar" name="button" onclick="cargarPronostico(this, 'SE')">Calcular</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="ptmac" class="column is-2 no-seleccionado" onclick="cargarPronostico(this, 'PTMAC')">
                      <div class="navbar-item" >
                        <span class="icon is-small">
                          <i class="fa fa-dot-circle-o " aria-hidden="true"></i>
                        </span><span>&nbsp&nbsp;P. M. T. A. de C.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="column is-12 is-size-7">
                  <table id="tablaDatos" class="table is-striped">
                    <thead><tr id="titulos"></tr></thead>
                    <tbody id="datos"></tbody>
                  </table>
                </div>

                <div class="column is-12 is-size-7">
                  <table id="tablaErrores is-striped">
                    <thead><tr id="titulosErrores"></tr></thead>
                    <tbody id="errores"></tbody>
                  </table>
                </div>

                <div class="column is-12 is-size-7">
                  <div id="grafica" style="width:100%; height:400px;"></div>
                </div>




              </div>
            </div>
          </div>

<!--

          <div id="opciones">
            <button >PS</button>
            <button >PMS</button>
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



            <label  id="al" for="a" >A:</label>
            <input id="a"  type="text" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
          </div>


-->



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
    <script src="js/ajax.js"></script>
</html>
