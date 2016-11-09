/*
  Inicialización de la pagina movementsEdit
*/
myApp.onPageInit('movementsEdit', function (page) {
  var myMovementController = new movementController();
  var myCalendario;
  var movimiento;
  var categoria;
  var id;
  var autocomplete;

  // obtengo el id
  id = page.query.id;

  // si el id no es valido, lo redirijo al index
  if (!id) {
    mainView.router.loadPage('index.html');
    return;
  }

  // busco por el id
  movimiento = almacenamientoMovements.getById(id);
  categoria = almacenamientoCategorias.getById(movimiento.categoria);

  movimiento.categoria = categoria.nombre;

  // inicializo el calendario
  myCalendario = myApp.calendar({
    input: '#calendario-input',
    dateFormat: 'dd M yyyy'
  });

  // agrego el evento on click del boton de agregar
  $$('#agregarMovimiento').on('click', guardar);

  myApp.formFromJSON('#form-movement', movimiento);
  myCalendario.setValue([new Date(movimiento.fecha)]);

  // inicializo el autocomplete
  autocomplete = myApp.autocomplete({
    input: '#autocomplete-categorias',
    openIn: 'dropdown',
    source: function (autocomplete, query, render) {
      var results = [];
      var categorias = almacenamientoCategorias.get();

      if (query.length === 0) {
        render(results);
        return;
      }

      for (var i = 0; i < categorias.length; i++) {
        if (categorias[i].nombre.toLowerCase().indexOf(query.toLowerCase()) >= 0 && categorias[i].tipo == movimiento.tipo) results.push(categorias[i].nombre);
      }

      render(results);
    }
  });

  autocomplete.input.trigger('change');

  // funciones auxiliares!

  function guardar() {
    // obtengo el json del form
    var data = myApp.formToJSON('#form-movement');
    var comprobarCategoria = almacenamientoCategorias.comprobarCategoria(data.categoria, movimiento.tipo);

    // la fecha del calendario se obtiene con .value y es un array de int en timespan
    // lo parseamos y lo hacemos string

    data.fecha = (new Date(myCalendario.value[0])).toString();
    data.categoria = comprobarCategoria.categoria.id;

    // y modifico el movimiento
    if (!myMovementController.editarMovimiento(id, data.monto, data.fecha, data.categoria, data.motivo)) {

      // si esta mal algo, borro la categoria que se creo
      if (comprobarCategoria.nuevo) {
        almacenamientoCategorias.deleteById(data.categoria);
      }

      return;
    }

    // redirijo para la pagina anterior
    mainView.router.back();

    // y mostramos una notificacion!
    myApp.addNotification({
      message: 'Se modificó correctamente.',
      hold: 3000
    });
  }
});
