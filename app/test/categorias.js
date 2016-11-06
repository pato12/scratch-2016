/*
  Test controller que se encarga de probar el buen funcionamiento asociadas a las categorias
*/
var myApp = {alert: function(){}};

/*
  Quiero controlar que:
  -no se ingresen categorias repetidas, es decir, no tengan el mismo nombre
*/
QUnit.test( "testing para validar que no se ingresen categorias repetidas", function( assert ) {
  localStorage.clear();

  almacenamientoCategorias.comprobarCategoria("prueba");
  var cantidad1 = almacenamientoCategorias.getCantidadCategorias();
  almacenamientoCategorias.comprobarCategoria("prueba");
  var cantidad2 = almacenamientoCategorias.getCantidadCategorias();
  almacenamientoCategorias.comprobarCategoria("Prueba");
  var cantidad3 = almacenamientoCategorias.getCantidadCategorias();

  assert.equal(cantidad2,cantidad1, "El test tiene que pasar cuando no se repiten las categorias con el mismo nombre" );
  assert.equal(cantidad3,cantidad1, "El test tiene que pasar cuando no se repiten las categorias con el mismo nombre alternando mayusc y minusc (keysensitive)" );
});

/*
    Quiero controlar que:
    -se ingresen categorias que no existen
*/
QUnit.test( "testing para validar que se ingresen categorias nuevas", function( assert ) {
  localStorage.clear();

  almacenamientoCategorias.comprobarCategoria("prueba");
  var cantidad1 = almacenamientoCategorias.getCantidadCategorias();
  almacenamientoCategorias.comprobarCategoria("otroDiferente");
  var cantidad2 = almacenamientoCategorias.getCantidadCategorias();

  assert.notEqual(cantidad2,cantidad1, "El test tiene que pasar cuando se agregan nuevas categorias con distinto nombre" );
});

/*
    Quiero controlar que:
    -se elimine correctamente una categoria
*/
QUnit.test( "testing para validar que se elimine correctamente una categoria", function( assert ) {
  localStorage.clear();

  almacenamientoCategorias.comprobarCategoria("prueba");
  almacenamientoCategorias.comprobarCategoria("prueba2");
  almacenamientoCategorias.comprobarCategoria("prueba3");
  console.log(almacenamientoCategorias.get());
  almacenamientoCategorias.deleteById(3);
  var cantidadDespuesDeEliminar = almacenamientoCategorias.getCantidadCategorias();
  var cantidadCorrecta = 3; // 1(categoria general) + 3 categorias ingresadas - 1 categoria eliminada = 3
  assert.equal(cantidadDespuesDeEliminar, cantidadCorrecta, "El test tiene que pasar cuando no se repiten las categorias con el mismo nombre" );
});

