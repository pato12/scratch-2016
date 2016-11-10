//Simulador de datos que crea slot de datos para prueba o para demos
var scriptSlotDatos = function(cantDatos) {
    this.cant = cantDatos; //cantidad de datos a simular
    this.crearSlot();
};

//metodo que crea los datos segun la cantidad instanciada
scriptSlotDatos.prototype.crearSlot = function() {
    var controladorMovimientos = new movementController();
    var controladorCategorias = new categoriaController();

    for(i=0; i<this.cant; i++) {
        //1) CREO UNA CATEGORIA
        var tipo; //ingreso o egreso
        //para valores de i par, corresponde un ingreso, para valores de i impar corresponde un egreso
        //es para simular ingresos y egresos
        if(i%2 === 0)
            tipo = "ingreso";
        else
            tipo = "egreso";

        //genero numeros aleatorios entre 1 y 7 que van a simular categorias
        //ej: categoria1,...,categoria3,..., categoria7
        var nombreCategoria = Math.round((6*Math.random())+1);
        var categoria = almacenamientoCategorias.getByName("categoria"+nombreCategoria, tipo);
        if (categoria === null) {
          categoria = controladorCategorias.agregarCategoria("categoria"+nombreCategoria, "algunaDescripcion", false, tipo);
        }

        var montoAleatorio = Math.round(Math.random()*10000)/100;
        var fechaAleatoria = new Date(Date.now() + 3600 * 1000 * 24 * 7 * Math.random() * (Math.random() > 0.5? 1 : -1));
        controladorMovimientos.agregarMovimiento(montoAleatorio, fechaAleatoria, "motivo"+i, categoria.id, tipo);
    }
};
