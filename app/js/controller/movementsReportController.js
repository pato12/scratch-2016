// Toma como dato las dos listas (igreso y egreso) y devuelve un único array compuesto por movimientos ordenado por fecha en forma descendente 
var movementsReportController = function (movements, now) {
  this.listadoMovements = [];
  now = now || Date.now();

  this.listadoMovements = this.listadoMovements.concat(movements.ingresos, movements.egresos);

  this.listadoMovements = this.listadoMovements.filter(function(movimiento){
    return (now - 3600 * 24 * 31 * 1000) < Date.parse(movimiento.fecha);
  });
  this.listadoMovements = this.listadoMovements.filter(function(movimiento){
    return now > Date.parse(movimiento.fecha);
  });
  this.listadoMovements.sort(function (a, b) {
    return Date.parse(b.fecha) - Date.parse(a.fecha);
  });
};
//  Toma como parámetro el array de movimientos ordenados y devuelve un array con las filas del reporte
movementsReportController.prototype.calcularItemsReports = function () {
  var saldo = 0;
  var listadoItemReport = [];

  for (var i = this.listadoMovements.length - 1; i >= 0; i--) {
    var movimiento = this.listadoMovements[i];

    if (movimiento.tipo === 'ingreso')
      saldo += parseFloat(movimiento.monto);
    else
      saldo -= parseFloat(movimiento.monto);

    listadoItemReport.push(new itemReport(movimiento.tipo, movimiento.monto, saldo, movimiento.id, movimiento.fecha));
  }

  listadoItemReport.reverse();

  return listadoItemReport;
};
// Elimina un movimiento por ID y redirecciona al index.html
movementsReportController.prototype.eliminarMovimiento = function (id) {
  almacenamientoMovements.deleteById(id);
  mainView.router.loadPage('Index.html');
};
