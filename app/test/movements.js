var myApp = {alert: function(){}};

QUnit.test( "El controller tiene que fallar cuando se agrega un movimiento invalido", function( assert ) {
  var controller = new movementController();
  var resultado = controller.agregarMovimiento(-10, new Date().toString(), 'a', 'tipo');

  assert.ok( !resultado, "Paso!" );
});
