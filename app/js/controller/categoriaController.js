var categoriaController = function() {

};

categoriaController.prototype.agregarCategoria = function(nombre, descripcion, esDefault) {
    if(this.validar(nombre)){
        var newCategoria = new categoria(nombre, descripcion, esDefault);
        newCategoria.save();
        return true;
    }
    return false;
};

categoriaController.prototype.validar = function(nombre) {
    if(nombre.trim() === "") {
        myApp.alert("Debe ingresar un nombre");
        return false;
    }
    return true;
};