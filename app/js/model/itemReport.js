
//Constructor de UNA fila de la tabla de reportes de gastos
var itemReport = function (tipo, monto, saldo, id, fecha) {
  this.monto = monto;
  this.saldo = saldo;
  this.fecha = fecha;
  this.tipo = tipo;
  this.id = id;

  
};
// formatear la fila a un Json
itemReport.prototype.toJSON = function () {
  return {
    monto: (this.tipo === 'egreso' ? '($' +this.monto + ')' : '$' + this.monto),
    egreso: this.tipo === 'egreso',
    fecha: this.fecha,
    saldo: (this.saldo < 0 ? '($' + Math.abs(this.saldo) + ')' : '$' + this.saldo),
    saldoNegativo: this.saldo < 0,
    id: this.id
  };
};
