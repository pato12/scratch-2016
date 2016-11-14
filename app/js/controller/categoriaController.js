var categoriaController = function() {

};
//controlador que maneja la lógica del agregado de categorías
categoriaController.prototype.agregarCategoria = function(nombre, descripcion, esDefault, tipo) {
    if(this.validar(nombre)){
        var newCategoria = new categoria(nombre, descripcion, esDefault, tipo);
        newCategoria.save();
        return newCategoria;
    }
    return false;
};
//Validador de campos obligatorios
categoriaController.prototype.validar = function(nombre) {
    if(nombre.trim() === "") {
        myApp.alert("Debe ingresar un nombre");
        return false;
    }
    return true;
};
