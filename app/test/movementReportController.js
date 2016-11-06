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
  var movement1 = new movement(32, new Date(2016, 11, 7).toString(), "motivo blabla", 4, "egreso");
  var movement2 = new movement(100, new Date(2016, 11, 8).toString(), "motivo blabla", 4, "ingreso");
  var movement3 = new movement(100, new Date(2017, 9, 7).toString(), "motivo blabla", 4, "ingreso");
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
  var movement1 = new movement(32, new Date(2016, 11, 7).toString(), "motivo blabla", 4, "egreso");
  var movement2 = new movement(100, new Date(2016, 11, 8).toString(), "motivo blabla", 4, "ingreso");
  var movement3 = new movement(100, new Date(2017, 9, 7).toString(), "motivo blabla", 4, "ingreso");
  var now = new Date(2016, 11, 9);

  //array desordenado
  var movements = {
                    ingresos: [movement2.toJSON(), movement3.toJSON()],
                    egresos: [movement1.toJSON()]
                  };

  var controller = new movementsReportController(movements, now.getTime());
  var saldo = controller.calcularItemsReports()[0].saldo;

  assert.equal("68.00", saldo, "El saldo se calculó correctamente");
});


/*
    Quiero controlar que:
    -se calculen bien los saldos luego de eliminar un movimiento

    Nota: En caso de modificar este unit test, se debe tener el cuidado de poner
    el valor en modo flotante. En este caso, el resultado del saldo esperado es
    68, pero se debe indicar "68.00".
*/
QUnit.test( "testing al movementReportController para que cuando se elimina un movimiento se calcule bien el saldo", function( assert ) {
  localStorage.clear();
  //el primer movimiento tendra ID 1, el siguiente 2 y 3 respectivamente
  var controladorMovimientos = new movementController();
  var movement1 = controladorMovimientos.agregarMovimiento(10, new Date(2016, 11, 7).toString(), "motivo blabla", 4, "egreso");
  var movement2 = controladorMovimientos.agregarMovimiento(100, new Date(2016, 11, 8).toString(), "motivo blabla", 4, "ingreso");
  var movement3 = controladorMovimientos.agregarMovimiento(100, new Date(2016, 11, 9).toString(), "motivo blabla", 4, "ingreso");
  var now = new Date(2016, 11, 9);

  //array desordenado
  var movements = {
                    ingresos: [movement2.toJSON(), movement3.toJSON()],
                    egresos: [movement1.toJSON()]
                  };

  var controller = new movementsReportController(movements, now.getTime());
  controller.eliminarMovimiento("3");
  var saldoDespuesDeEliminarMovimiento3 = controller.calcularItemsReports()[0].saldo;
  var saldoCorrecto = 90.00;

  assert.equal(saldoCorrecto, saldoDespuesDeEliminarMovimiento3, "El saldo se calculó correctamente luego de eliminar un movimiento");
});