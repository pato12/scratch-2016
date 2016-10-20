myApp.onPageInit("categoria", function (page) {
    var myCategoriaController = new categoriaController();

    // agrego el evento on click del boton de agregar
    $$('#agregarCategoria').on('click', guardar);

    // funciones auxiliares!

    function guardar() {
        // obtengo el json del form
        var data = myApp.formToJSON('#form-categoria');

        if (!almacenamientoCategorias.existeCategoria(data.nombre)) {
            // y agrego la categoria
            data.esDefault = data.esDefault == "si";
            if (!myCategoriaController.agregarCategoria(data.nombre, data.descripcion, data.esDefault)) {
                return;
            }
            // y mostramos una notificacion!
            myApp.addNotification({
                message: 'Se agregó correctamente.',
                hold: 3000
            });
        }
        else {
                myApp.addNotification({
                message: 'Categoría existente',
                hold: 3000
            });
        }

        // se hace un back
        mainView.router.back();


    }
});