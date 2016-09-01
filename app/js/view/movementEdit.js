myApp.onPageInit('movementsEdit', function (page) {
  var myMovementController = new movementController();
  var myCalendario;
  var movimiento;
  var id;

  // obtengo el id
  id = page.query.id;

  // si el id no es valido, lo redirijo al index
  if(!id) {
    mainView.router.loadPage('index.html');
    return;
  }

  // busco por el id
  movimiento = almacenamientoMovements.getById(id);

  // inicializo el calendario
  myCalendario = myApp.calendar({
    input: '#calendario-input',
    dateFormat: 'dd M yyyy'
  });


  // agrego el evento on click del boton de agregar
  $$('#agregarMovimiento').on('click', guardar);


  myApp.formFromJSON('#form-movement', movimiento);
  myCalendario.setValue([new Date(movimiento.fecha)]);

  // funciones auxiliares!

  function guardar() {
    // obtengo el json del form
    var data = myApp.formToJSON('#form-movement');

    // la fecha del calendario se obtiene con .value y es un array de int en timespan
    // lo parseamos y lo hacemos string

    data.fecha = (new Date(myCalendario.value[0])).toString();


    // y modifico el movimiento
    if(!myMovementController.editarMovimiento(id, data.monto, data.fecha, data.motivo)) {
        return;
    }

    // redirijo al index.html
    mainView.router.loadPage('index.html');


    // y mostramos una notificacion!
    myApp.addNotification({
        message: 'Se modificó correctamente.'
    });
  }
});
