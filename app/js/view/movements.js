/*inicializacion de la UI de movimientos para ingresos y egresos*/
myApp.onPageInit('movements', function (page) {
      var myMovementController = new movementController();
      var titulo;
      var myCalendario;

      // defino el titulo segun el tipo
      titulo = page.query.tipo == 'ingreso' ? 'Registar Ingreso' : 'Registar Egreso';

      // inicializo el calendario
      myCalendario = myApp.calendar({
          input: '#calendario-input',
          dateFormat: 'dd M yyyy',
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          monthNamesShort: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          dayNamesShort: ['Dom', 'Lu', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
          toolbarCloseText: 'Hecho'
        });

        //seteo fecha actual al calendario por default
        myCalendario.setValue([new Date()]);

        // cambio el titulo de la pagina
        $$('#movimientoTitulo').html(titulo);

        // agrego el evento on click del boton de agregar
        $$('#agregarMovimiento').on('click', guardar);


        // funciones auxiliares!

        function guardar() {
          // obtengo el json del form
          var data = myApp.formToJSON('#form-movement');

          // la fecha del calendario se obtiene con .value y es un array de int en timespan
          // lo parseamos y lo hacemos string

          data.fecha = (new Date(myCalendario.value[0])).toString();


          // y agrego el movimiento
          // el `tipo` viene dado por la url ?tipo=ingreso
          // y se optiene con `page.query.tipo`
          if (!myMovementController.agregarMovimiento(data.monto, data.fecha, data.motivo, page.query.tipo)) {
            return;
          }

          // redirijo al index.html
          mainView.router.loadPage('index.html');


          // y mostramos una notificacion!
          myApp.addNotification({
            message: 'Se agregó correctamente.',
            hold: 3000
          });
        }
      });
