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
  localStorage.clear();
  var done = assert.async();
  var c1 = new categoria("salario", "bla", false);
  var c2 = new categoria("regalo", "bla", false);

  c1.save();
  c2.save();

    setTimeout((function(){
      var movement1 = new movement(30, new Date(2016, 11, 7).toString(), "motivo blabla", c1.id, "ingreso");
      var movement2 = new movement(100, new Date(2016, 11, 7).toString(), "motivo blabla", c2.id, "ingreso");
      var movement3 = new movement(40, new Date(2016, 11, 8).toString(), "motivo blabla", c2.id, "egreso");
      var movement4 = new movement(40, new Date(2016, 11, 8).toString(), "motivo distinto", c1.id, "egreso");

      //array ordenado
      var movements = [movement1.toJSON(), movement2.toJSON(), movement3.toJSON(), movement4.toJSON()];

      var controller = new reporteGraficoController();
      var fechaDesde = new Date(2016, 11, 6).toString();
      var filtrados = controller.filtrarPorPeriodo(movements, fechaDesde, "2");
      var resultadoObtenido = controller.crearArrayDatosNVD3(filtrados);

      var fecha1 = timespanDay (new Date(2016, 11, 7));
      var fecha2 = timespanDay (new Date(2016, 11, 8));

      var resultadoEsperado = [
                                {key: "salario", values: [[fecha1, 30], [fecha2, -10]]},
                                {key: "regalo", values: [[fecha1, 100], [fecha2, 60]]}
                              ];

      assert.deepEqual(resultadoObtenido, resultadoEsperado, "Los datos se agrupan correctamente por categoria y por dia");
      done();
    }).bind(this), 300);
});