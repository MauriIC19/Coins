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
    <script src="js/highstock/highcharts-more.js"></script>
    <script src="js/highstock/modules/solid-gauge.js"></script>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/bulma.css">
    <link rel="stylesheet" href="css/font-awesome/css/font-awesome.css">
    <title>Dashboard</title>
</head>

<body class="is-fullheight">
    <section class="hero height-100">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container height-90">
            <div class="height-95 contenedor-principal columns is-multiline">
                <div class="titulo-dashboard column is-12">
                    <h1 class="title is-4">Dashboard</h1>
                </div>
                <div class="column is-2">
                    <div  class="columns is-multiline">
                        <div id="contenedor-criptodivisa-id" class="contenedor-criptodivisa column is-12">
                            <h4 class="is-size-7">Criptodivisas</h4>
                            <div id="seleccionar-criptodivisa" class="dropdown" onclick="activar_dropdown()">
                                <div class="dropdown-trigger">
                                    <button id="boton-seleccionar-criptodivisa" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span id="texto-lista-opciones" class="is-size-7">Lista de Opciones</span>
                                        <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <a onclick="cargarDatos(0)" class="dropdown-item is-size-7">
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

                        <div class="">

                        </div>

                        <div id="navegacion-datos" class="navegacion contenedor-criptodivisa column is-12 has-text-centered no-eventos">
                            <figure class="image is-48x48 margen-automatico">
                              <img src="img/tabla.png" alt="">
                            </figure>
                            <h4 class="is-size-7">Tabla de Datos</h4>
                        </div>

                        <div id="navegacion-grafica" class="navegacion contenedor-criptodivisa column is-12 has-text-centered no-eventos">
                            <figure class="image is-48x48 margen-automatico">
                              <img src="img/grafica.png" alt="">
                            </figure>
                            <h4 class="is-size-7">Gráfica</h4>
                        </div>

                        <div id="navegacion-indicador" class="navegacion contenedor-criptodivisa column is-12 has-text-centered no-eventos">
                            <figure class="image is-48x48 margen-automatico">
                              <img src="img/indicador.png" alt="">
                            </figure>
                            <h4 class="is-size-7">Indicador</h4>
                        </div>

                        <div class="navegacion contenedor-criptodivisa column is-12 has-text-centered">
                            <h4 class="is-size-7">Créditos</h4>
                        </div>

                        <div class="navegacion contenedor-criptodivisa column is-12 has-text-centered">
                            <h4 class="is-size-7">Cerrar Sesión</h4>
                        </div>
                    </div>

                </div>
                <div class="height-95 column is-10 no-padding-top">
                    <div class="height-100 columns is-multiline">
                        <div id="contenedor-general-derecha" class="column is-12 no-padding-top">
                            <div id="contenedor-general-derecha-interno" class="height-95 columns is-multiline">
                                <div  class="column is-12 is-size-7 contenedor-filtros">
                                    <div class="columns is-multiline is-narrow">
                                        <div id="ps-principal" class="column is-2 no-seleccionado ">
                                            <div class="navbar-item filtro has-text-centered cursor-pointer">
                                                <p class="margen-automatico">
                                                    <span class="icon is-small">
                            <i id="icono-ps" class="fa fa-dot-circle-o " aria-hidden="true"></i>
                          </span><span>&nbsp&nbsp;P. Simple</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div id="contenedor-promedio-movil-simple"  class="column is-2 no-seleccionado">
                                            <div id="promedio-movil-simple" class="navbar-item has-dropdown cursor-pointer">
                                                <div id="promedio-movil-simple-accion" class="navbar-link margen-automatico" onclick="activar_dropdown_pms()">
                                                    <p> <span class="icon is-small">
                              <i id="icono-pms" class="fa fa-dot-circle-o " aria-hidden="true"></i>
                            </span><span>&nbsp&nbsp;P.M. Simple</span></p>
                                                </div>
                                                <div  class="auxiliares-contenedor navbar-dropdown is-size-7">
                                                    <div class="columns is-multiline has-text-centered">
                                                        <div class="column is-12">
                                                            <h3 class="titulo-auxiliares-contenedor">Auxiliares</h3>
                                                        </div>
                                                        <div class="column is-12">
                                                            <h3>Valor de K</h3>
                                                            <input id="kpms" type="text" name="" value="" placeholder="K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div class="column is-12">
                                                            <button id="boton-pms" type="button" class="boton-auxiliar" name="button" onclick="cargarPronostico(this, 'PMS')">Calcular</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="contenedor-promedio-movil-doble" class="column is-2 no-seleccionado">
                                            <div id="promedio-movil-doble" class="navbar-item has-dropdown cursor-pointer">
                                                <div id="promedio-movil-doble-accion" class="navbar-link margen-automatico" onclick="activar_dropdown_pmd()">
                                                    <p> <span class="icon is-small">
                              <i id="icono-pmd" class="fa fa-dot-circle-o " aria-hidden="true"></i>
                            </span><span>&nbsp&nbsp;P.M. Doble</span>
                                                    </p>
                                                </div>
                                                <div class="auxiliares-contenedor navbar-dropdown is-size-7">
                                                    <div class="columns is-multiline has-text-centered">
                                                        <div class="column is-12">
                                                            <h3 class="titulo-auxiliares-contenedor">Auxiliares</h3>
                                                        </div>
                                                        <div class="column is-12">
                                                            <h3>Valor de K</h3>
                                                            <input id="kpmd" type="text" name="" value="" placeholder="K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div class="column is-12">
                                                              <h3>Valor de J</h3>
                                                            <input id="jpmd" type="text" name="" value="" placeholder="J" onfocus="this.placeholder = ''" onblur="this.placeholder = 'J'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div class="column is-12">
                                                            <button id="boton-pmd" type="button" class="boton-auxiliar" name="button">Calcular</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="contenedor-promedio-movil-doble-ajustado" class="column is-2 no-seleccionado">
                                            <div id="promedio-movil-doble-ajustado" class="navbar-item has-dropdown cursor-pointer">
                                                <div id="promedio-movil-doble-ajustado-accion" class="navbar-link margen-automatico" onclick="activar_dropdown_pmda()">
                                                    <p>
                                                        <span class="icon is-small">
                              <i id="icono-pmda" class="fa fa-dot-circle-o " aria-hidden="true"></i>
                            </span><span>&nbsp&nbsp;P.M.D. Aju.</span>
                                                    </p>
                                                </div>
                                                <div class="auxiliares-contenedor navbar-dropdown is-size-7">
                                                    <div class="columns is-multiline has-text-centered">
                                                        <div class="column is-12">
                                                            <h3 class="titulo-auxiliares-contenedor">Auxiliares</h3>
                                                        </div>
                                                        <div class="column is-12">
                                                            <h3>Valor de K</h3>
                                                            <input id="kpmda" type="text" name="" value="" placeholder="K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div class="column is-12">
                                                            <h3>Valor de J</h3>
                                                            <input id="jpmda" type="text" name="" value="" placeholder="J" onfocus="this.placeholder = ''" onblur="this.placeholder = 'J'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div class="column is-12">
                                                              <h3>Valor de M</h3>
                                                            <input id="mpmda" type="text" name="" value="" placeholder="M" onfocus="this.placeholder = ''" onblur="this.placeholder = 'M'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div class="column is-12">
                                                            <button id="boton-pmda" type="button" class="boton-auxiliar" name="button">Calcular</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="contenedor-suvizacion-exponencial" class="column is-2 no-seleccionado">
                                            <div id="suavizacion-exponencial" class="navbar-item has-dropdown cursor-pointer">
                                                <div id="suavizacion-exponencial-accion" class="navbar-link margen-automatico" onclick="activar_dropdown_se()">
                                                    <p> <span class="icon is-small">
                              <i id="icono-se" class="fa fa-dot-circle-o " aria-hidden="true"></i>
                            </span><span>&nbsp&nbsp;S. Exp.</span></p>
                                                </div>
                                                <div class="auxiliares-contenedor navbar-dropdown is-size-7">
                                                    <div class="columns is-multiline has-text-centered">
                                                        <div class="column is-12">
                                                            <h3 class="titulo-auxiliares-contenedor">Auxiliares</h3>
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
                                                                        <p class="margen-automatico"><span id="lista-pronosticos" class="is-size-7">Pronósticos</span>
                                                                            <span class="icon is-small">
                                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    </span></p>
                                                                    </button>
                                                                </div>
                                                                <div class="dropdown-menu has-text-left" id="dropdown-menu" role="menu">
                                                                    <div class="dropdown-content">
                                                                        <a onclick="habilitarVariables('PS')" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. Simple</span>
                                    </a>
                                                                        <a onclick="habilitarVariables('PMS')" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. Móvil Simple</span>
                                    </a>
                                                                        <a onclick="habilitarVariables('PMD')" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. Móvil Doble</span>
                                    </a>
                                                                        <a onclick="habilitarVariables('PMDA')" class="dropdown-item is-size-7">
                                      <span>&nbsp;P. M. Doble A.</span>
                                    </a>
                                                                        <a onclick="habilitarVariables('PTMAC')" class="dropdown-item is-size-7">
                                      <span>&nbsp;P.T.M.A.C.</span>
                                    </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div id="contenedor-kse" class="no-display column is-12">
                                                          <h3>Valor de K</h3>
                                                            <input id="kse" type="text" name="" value="" placeholder="K" onfocus="this.placeholder = ''" onblur="this.placeholder = 'K'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div id="contenedor-jse" class="no-display column is-12">
                                                            <h3>Valor de J</h3>
                                                            <input id="jse" type="text" name="" value="" placeholder="J" onfocus="this.placeholder = ''" onblur="this.placeholder = 'J'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div id="contenedor-mse" class="no-display column is-12">
                                                          <h3>Valor de M</h3>
                                                            <input id="mse" type="text" name="" value="" placeholder="M" onfocus="this.placeholder = ''" onblur="this.placeholder = 'M'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>
                                                        <div id="contenedor-ase" class="no-display column is-12">
                                                            <h3>Valor de A</h3>
                                                            <input id="ase" type="text" name="" value="" placeholder="A" onfocus="this.placeholder = ''" onblur="this.placeholder = 'A'" onkeypress="validateNumber(this, event)" onkeyup="validateNumber(this, event)">
                                                        </div>

                                                        <div id="contenedor-boton-se" class="no-display column is-12">
                                                            <button id="boton-se" type="button" class="boton-auxiliar" name="button">Calcular</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="ptmac-principal"class="column is-2 no-seleccionado" onclick="cargarPronostico(this, 'PTMAC')">
                                            <div class="navbar-item filtro cursor-pointer">
                                                <p class="margen-automatico">
                                                    <span class="icon is-small ">
                            <i id="icono-ptmac" class="fa fa-dot-circle-o " aria-hidden="true"></i>
                        </span><span>&nbsp&nbsp;P.T.M.A.C.</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="height-100 contenido-ajustable column is-12">

                                  <div class="columns is-multiline is narrow height-100">
                                    <div id="ajustable-uno" class="height-100 column is-12">
                                      <div id="contenedor-tablaDatos" class="height-75 overflow-y is-size-7">

                                          <table id="tablaDatos" class="table is-striped">
                                              <thead>
                                                  <tr id="titulos"></tr>
                                              </thead>
                                              <tbody id="datos"></tbody>
                                          </table>


                                      </div>
                                      <div id="contenedor-tablaErrores" class="height-25 overflow-y is-size-7">
                                          <table id="tablaErrores" class="is-striped table">
                                              <thead>
                                                  <tr id="titulosErrores"></tr>
                                              </thead>
                                              <tbody id="errores"></tbody>
                                          </table>
                                      </div>
                                    </div>

                                    <div id="ajustable-dos" class="height-100 no-display column is-12">

                                      <button type="button" name="button" ></button>
                                      <div class="height-100 is-size-7">
                                          <div id="grafica" style="width:100%; height:100%;"></div>
                                      </div>
                                    </div>

                                    <div id="ajustable-tres" class="no-display column is-12">
                                      <div id="contenedor-kpi" class="height-85 is-size-7">
                                          <div style="width: 100%; height: 100%; margin: 0 auto">
                                              <div id="container-rpm" style="width: 100%; height: 100%; float: left"></div>
                                          </div>
                                      </div>

                                        <div class="height-15 is-size-7 has-text-centered contenedor-mejor-pronostico">

                                          <h2 id="mejor" class="title is-7"></h2>
                                        </div>


                                    </div>
                                  </div>




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

                </div>
            </div>
            <div>
                <div id="tablas" class="seccion">
                </div>
            </div>
        </div>
    </section>
    <!--
    <div class="cerrar-sesion navbar-item">
        <form id="form-cerrar-sesion" action="#" method="POST">
            <figure class="">
                <input type="hidden" name="btnC" value="">
                <img onclick="document.getElementById('form-cerrar-sesion').submit();" class="imagen-cerrar-sesion is-24x24" src="img/cerrar-sesion.svg" alt="">
            </figure>
        </form>
    </div>
    <a href="creditos.php">Créditos</a>
  -->
</body>

<script src="js/funciones-generales.js"></script>
<script src="js/ajax.js"></script>
</html>
