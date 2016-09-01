var movementsReportController = function () {
  this.listadoMovements = [];

  var movements = almacenamientoMovements.get();

  this.listadoMovements = this.listadoMovements.concat(movements.ingresos, movements.egresos);

  this.listadoMovements = this.listadoMovements.filter(function(movimiento){
    return (Date.now() - 3600 * 24 * 31 * 1000) < Date.parse(movimiento.fecha);
  });
  this.listadoMovements.sort(function (a, b) {
    return Date.parse(b.fecha) - Date.parse(a.fecha);
  });
};

movementsReportController.prototype.calcularItemsReports = function () {
  var saldo = 0;
  var listadoItemReport = [];

  for (var i = this.listadoMovements.length - 1; i >= 0; i--) {
    var movimiento = this.listadoMovements[i];

    if (movimiento.tipo === 'ingreso')
      saldo += parseFloat(movimiento.monto);
    else
      saldo -= parseFloat(movimiento.monto);

    listadoItemReport.push(new itemReport(movimiento.tipo, movimiento.monto, saldo, movimiento.id));
  }

  listadoItemReport.reverse();

  return listadoItemReport;
};

movementsReportController.prototype.eliminarMovimiento = function (id) {
  almacenamientoMovements.deleteById(id);
};
