/*
  Test controller que se encarga de probar el buen funcionamiento del controller de movimientos
*/
var myApp = {alert: function(){}};

/*
  Quiero controlar que:
  -se almacene un ingreso positivo
*/
QUnit.test( "testing al movementController al registrar un ingreso", function( assert ) {
  var controller = new movementController();
  var resultado = controller.agregarMovimiento(-10, new Date().toString(), 'Salario', 1, 'ingreso');
  var resultado2 = controller.agregarMovimiento(10, new Date().toString(), 'Salario', 1, 'ingreso');

  assert.notOk(resultado, "El controller tiene que fallar cuando se agrega un ingreso negativo." );
  assert.ok(resultado2, "El controller tiene que funcionar cuando se agrega un ingreso positivo." );
});

/*
  Quiero controlar que:
  -se almacene un movimiento de egreso valido
  Nota: se valida que se ingrese un egreso positivo, y es porque la "resta" se hace en la logica interna
  segun el tipo de movimiento
*/
QUnit.test( "testing al movementController al registrar un egreso", function( assert ) {
  var controller = new movementController();
  var resultado = controller.agregarMovimiento(-10, new Date().toString(), 'Salario', 1, 'egreso');
  var resultado2 = controller.agregarMovimiento(10, new Date().toString(), 'Salario', 1, 'egreso');

  assert.notOk(resultado, "El controller tiene que fallar cuando se agrega un egreso con signo negativo." );
  assert.ok(resultado2, "El controller tiene que funcionar cuando se agrega un egreso positivo." );
});

/*
  Quiero controlar que:
  -se modifique correctamente un movimiento
*/
QUnit.test( "testing al movementController al modificar un movimiento", function( assert ) {
  localStorage.clear();
  //el primer movimiento ingresado tendra ID = 1
  var controller = new movementController();
  controller.agregarMovimiento(10, new Date().toString(), 'Salario', 1, 'ingreso'); //tendra ID = 1
  controller.editarMovimiento(1, 15, new Date().toString(), 1, 'Salario');
  var movimiento = almacenamientoMovements.getById(1).monto;

  assert.equal(movimiento, "15", "El controller tiene que pasar cuando se modifica correctamente un movimiento." );
});

/*
  Quiero controlar que:
  -se modifique correctamente un movimiento
*/
QUnit.test( "testing al movementController al eliminar un movimiento", function( assert ) {
  localStorage.clear();
  //el primer movimiento ingresado tendra ID = 1
  var controller = new movementController();
  controller.agregarMovimiento(10, new Date().toString(), 'Salario', 1, 'ingreso'); //tendra ID = 1
  almacenamientoMovements.deleteById(1);
  var movimiento = almacenamientoMovements.getById(1);

  assert.equal(movimiento, null, "El controller tiene que pasar cuando se elimina correctamente un movimiento." );
});

