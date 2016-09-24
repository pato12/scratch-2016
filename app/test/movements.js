var myApp = {alert: function(){}};

QUnit.test( "testing al movementController", function( assert ) {
  var controller = new movementController();
  var resultado = controller.agregarMovimiento(-10, new Date().toString(), 'a', 'tipo');
  var resultado2 = controller.agregarMovimiento(10, new Date().toString(), 'a', 'tipo');

  assert.notOk(resultado, "El controller tiene que fallar cuando se agrega un movimiento invalido." );
  assert.ok(resultado2, "El controller tiene que funcionar cuando se agrega un movimiento valido." );
  assert.ok(true, "ok test." );
});
