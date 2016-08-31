var almacenamientoMovements = {

  get: function () {
    var jsonText = localStorage.Movements || '{"ingresos": [], "egresos": []}';
    return JSON.parse(jsonText);
  }

};

var movementsReport = function (ingreso, egresos, saldo, tipo, monto) {
 if (this.tipo = "ingreso") {
  this.ingreso = monto;
     
 } else {
  this.egresos = monto;
     
 }
  this.saldo = 0;
};

movementsReport.prototype.getIngreso = function () {
  return this.ingreso;
};

movementsReport.prototype.getEgreso = function () {
  return this.egresos;
};

movementsReport.prototype.getSaldo = function () {
  return this.saldo;
};

movementsReport.getMovements = function () {
  return almacenamientoMovements.get();
};
