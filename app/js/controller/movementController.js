/*constructor del controller*/
var movementController = function() {
    //this.movementView = new movementView();
    //this.initialize();
};

/*logica que agrega un movimiento usando al modelo.
  Genera una rutina de validacion que, si no es pasada con exito, corta
  la ejecucion del procedimiento.
*/
movementController.prototype.agregarMovimiento = function(monto, fecha, motivo, tipo) {
    if (!this.validar(monto, fecha, motivo)){
      return false;
    }
    var movimiento = new movement(monto, fecha, motivo, tipo);
    movimiento.save();
    return true;
};

movementController.prototype.editarMovimiento = function(id, monto, fecha, motivo) {
    if (!this.validar(monto, fecha, motivo)){
      return false;
    }
    var movimiento = almacenamientoMovements.getById(id);
    
    movimiento.monto = monto;
    movimiento.fecha = fecha;
    movimiento.motivo = motivo;

    almacenamientoMovements.saveById(movimiento);

    return true;
};

movementController.prototype.cargarGrilla = function() {
    var movements = almacenamientoMovements.get();
    return movements;
};

/*
  logica para validar que todos los campos de la  UI de ingresos y egresos
  esten completos y sean correctos.
  Retorna true si pasa todas las validaciones.
  Retorna false si no cumple con alguna de ellas.
*/
movementController.prototype.validar = function (monto, fecha, motivo) {
  if (monto === '' || motivo === '') {
    myApp.alert("Debe ingresar todos los campos!");
    return false;
  }
  if (monto < 0) {
    myApp.alert("Debe ingresar monto positivo!");
    return false;
  }
  return true;
};
