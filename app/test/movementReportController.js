/*
  Tester controller que se encarga de probar los reportes de movimientos
*/
var myApp = {alert: function(){}};

/*
    Quiero controlar que:
    -se muestren todos los movimientos
    -de los ultimos 30 dias
    -ordenados por fecha
*/
QUnit.test( "testing al movementReportController", function( assert ) {
  var movement1 = new movement("32", new Date(2016, 11, 7).toString(), "motivo blabla", "egreso");
  var movement2 = new movement("100", new Date(2016, 11, 8).toString(), "motivo blabla", "ingreso");
  var movement3 = new movement("100", new Date(2017, 9, 7).toString(), "motivo blabla", "ingreso");
  var now = new Date(2016, 11, 9);

  //array desordenado
  var movements = { 
                    ingresos: [movement2.toJSON(), movement3.toJSON()], 
                    egresos: [movement1.toJSON()]
                  };
  //array ordenado
  var movementIdeal = [movement2.toJSON(), movement1.toJSON()];

  var controller = new movementsReportController(movements, now.getTime());

  assert.deepEqual(controller.listadoMovements, movementIdeal, "El listado se ordena correctamente y corresponde a los ultimos 30 dias");
});

/*
    Quiero controlar que:
    -se calculen bien los saldos
    
    Nota: En caso de modificar este unit test, se debe tener el cuidado de poner 
    el valor en modo flotante. En este caso, el resultado del saldo esperado es 
    68, pero se debe indicar "68.00".
*/
QUnit.test( "testing al movementReportController", function( assert ) {
  var movement1 = new movement("32", new Date(2016, 11, 7).toString(), "motivo blabla", "egreso");
  var movement2 = new movement("100", new Date(2016, 11, 8).toString(), "motivo blabla", "ingreso");
  var movement3 = new movement("100", new Date(2017, 9, 7).toString(), "motivo blabla", "ingreso");
  var now = new Date(2016, 11, 9);

  //array desordenado
  var movements = { 
                    ingresos: [movement2.toJSON(), movement3.toJSON()], 
                    egresos: [movement1.toJSON()]
                  };
  //array ordenado
  var movementIdeal = [movement2.toJSON(), movement1.toJSON()];

  var controller = new movementsReportController(movements, now.getTime());
  var saldo = controller.calcularItemsReports()[0].saldo;

  assert.equal("68.00", saldo, "El saldo se calculó correctamente");
});