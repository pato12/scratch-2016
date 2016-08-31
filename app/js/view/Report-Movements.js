myApp.onPageInit('movements', function (page) {
    var myMovementController = new movementController();
    //Funcion para grear el reporte, toma como parametros los array de ingresos y egresos
    function crearReporte() {
        var ingresosEgresos = myMovementController.crearReporte();
        var movimientos = [];
        //Concatena los arrays
        movimientos.concat(ingresosEgresos);
        //defino la lógica de ordenamiento, para ponerlos por fecha
        movimientos.sort(function (a, b) { return ingresos.fecha - egresos.fecha });

        //creo la grilla

    /*    var grilla = '#Tabla-Movimientos';
        var saldo = 0;
        for (var index = 0; index < movimientos.length; index++) {
            var element = movimientos[index];
            if (element.getTipo == "Ingreso") {
                saldo += element.getMonto;
                grilla += <tr><td> <div class="col-33">element.getMonto</div> </td><td>  <div class="col-33"></div> </td> <td><div class="col-33">Saldo</div> </td></tr>

            } else {
                saldo -= element.getMonto;

                grilla += <tr><td> <div class="col-33"></div> </td><td>  <div class="col-33">element.getMonto</div> </td> <td><div class="col-33">Saldo</div> </td></tr>

            }

        }*/
    }

    // aca llamaria al metodo... solo si no me limitara...
});


