/*
  Test controller que se encarga de probar el buen funcionamiento del controller para reportes graficos
*/
var myApp = {alert: function(){}};

/*
    Quiero controlar que:
    -se agrupen bien los gastos por categoria y por dia para asegurarme de que la libreria 
    recibe los datos correctamente
*/
QUnit.test( "testing al reporteGraficoController", function( assert ) {

  var categoriaController = new categoriaController();
  categoriaController.agregarCategoria("salario", "bla", false);
  categoriaController.agregarCategoria("regalo", "bla", false);

  var movement1 = new movement(30, new Date(2016, 11, 7).toString(), "motivo blabla", 1, "ingreso");
  var movement2 = new movement(100, new Date(2016, 11, 7).toString(), "motivo blabla", 2, "ingreso");
  var movement3 = new movement(40, new Date(2016, 11, 7).toString(), "motivo blabla", 2, "egreso");
  var movement4 = new movement(40, new Date(2016, 11, 8).toString(), "motivo distinto", 1, "egreso");

  var now = new Date(2016, 11, 9);

  //array ordenado
  var movements = [movement1.toJSON(), movement2.toJSON(), movement3.toJSON(), movement4.toJSON()];

  var controller = new reporteGraficoController();
  var resultadoObtenido = controller.crearArrayDatosNVD3(movements);

  var fecha1 = timespanDay (new Date(2016, 11, 7));
  var fecha2 = timespanDay (new Date(2016, 11, 8));

  var resultadoEsperado = [
                            {key: "salario", values: [[fecha1, 30] [fecha2, 40]]},
                            {key: "regalo", values: [[fecha1, 60]]} 
                          ];

  assert.deepEqual(resultadoObtenido, resultadoEsperado, "Los datos se agrupan correctamente por categoria y por dia");
});