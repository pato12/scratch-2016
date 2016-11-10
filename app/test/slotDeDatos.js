/*
  Test que se encarga de cargar datos de prueba
*/
var myApp = {alert: function(){}};

QUnit.test( "creacion de Slot de datos", function( assert ) {
    var done = assert.async();
    var slotDeDatos = new scriptSlotDatos(100);
    done();
    
});