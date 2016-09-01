/*constructor del controller*/
var movementController = function() {
    //this.movementView = new movementView();
    //this.initialize();
};

/*logica que agrega un movimiento usando al modelo*/
movementController.prototype.agregarMovimiento = function(monto, fecha, motivo, tipo) {
    var movimiento = new movement(monto, fecha, motivo, tipo);
    this.validar(monto, fecha, motivo);
    movimiento.save();
};

movementController.prototype.cargarGrilla = function() {
    var movements = almacenamientoMovements.get();
    return movements;
};

/*
  logica para validar que todos los campos de la  UI de ingresos y egresos
  esten completos y sean correctos
*/
movementController.prototype.validar = function (monto, fecha, motivo) {
  if (monto === '' || motivo === '') {
    myApp.alert("Debe ingresar todos los campos!");
    return;
  }
  if (monto < 0) {
    myApp.alert("Debe ingresar monto positivo!");
    return;
  }
};
