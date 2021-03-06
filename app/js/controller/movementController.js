/*constructor del controller*/
var movementController = function() {
};

/*logica que agrega un movimiento usando al modelo.
  Genera una rutina de validacion que, si no es pasada con exito, corta
  la ejecucion del procedimiento.
*/
movementController.prototype.agregarMovimiento = function(monto, fecha, motivo, categoria, tipo) {
    if (!this.validar(monto, fecha, motivo)){
      return false;
    }
    var movimiento = new movement(monto, fecha, motivo, categoria, tipo);
    movimiento.save();
    return movimiento;
};

/*
  modifica un movimiento usando su ID
*/
movementController.prototype.editarMovimiento = function(id, monto, fecha, categoria, motivo) {
    if (!this.validar(monto, fecha, motivo)){
      return false;
    }
    var movimiento = almacenamientoMovements.getById(id);

    movimiento.monto = monto;
    movimiento.fecha = fecha;
    movimiento.motivo = motivo;
    movimiento.categoria = categoria;

    almacenamientoMovements.saveById(movimiento);

    return true;
};

/*
  Retorna los movimientos almacenados en el localStorage
  para poder cargar una grilla
*/
movementController.prototype.cargarGrilla = function() {
    var movements = almacenamientoMovements.get();
    return movements;
};

/*
  Logica para validar que todos los campos de la  UI de ingresos y egresos
  esten completos y sean correctos.
  Retorna true si pasa todas las validaciones.
  Retorna false si no cumple con alguna de ellas.
*/
movementController.prototype.validar = function (monto, fecha, motivo) {
  if (monto.toString().trim() === '') {
    myApp.alert("Debe ingresar todos los campos!");
    return false;
  }
  if (monto < 0) {
    myApp.alert("Debe ingresar monto positivo!");
    return false;
  }
  return true;
};
