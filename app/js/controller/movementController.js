var movementController = function() {
    //this.movementView = new movementView();
    //this.initialize();
};

movementController.prototype.agregarMovimiento = function(monto, fecha, motivo, tipo) {
    var movimiento = new movement(monto, fecha, motivo, tipo);
    movimiento.save();
};

movementController.prototype.cargarGrilla = function() {
    var movements = almacenamientoMovements.get();
    return movements;
};

