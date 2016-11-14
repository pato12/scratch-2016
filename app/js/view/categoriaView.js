myApp.onPageInit("categoria", function (page) {
    var myCategoriaController = new categoriaController();

    // agrego el evento on click del boton de agregar
    $$('#agregarCategoria').on('click', guardar);

    // funciones auxiliares!

    function guardar() {
        // obtengo el json del form
        var data = myApp.formToJSON('#form-categoria');

        if (!almacenamientoCategorias.existeCategoria(data.nombre, data.tipo)) {

            // y agrego la categoria
            data.esDefault = data.esDefault == "si";

            if (!myCategoriaController.agregarCategoria(data.nombre, data.descripcion, data.esDefault, data.tipo)) {
                return;
            }

            // y mostramos una notificacion!
            myApp.addNotification({
                message: 'Se agregó correctamente.',
                hold: 3000
            });

            // se hace un back
            mainView.router.back();
        }
        else {
            myApp.alert('La categoría ya existe', 'Categoría duplicada');
        }




    }
});
