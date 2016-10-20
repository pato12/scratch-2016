
//Constructor de UNA fila de la tabla de reportes de gastos
var itemReport = function (tipo, monto, saldo, id, fecha) {
  this.monto = parseFloat(monto).toFixed(2);
  this.saldo = saldo.toFixed(2);
  this.fecha = new Date(fecha).toLocaleDateString();
  this.tipo = tipo;
  this.id = id;

  
};

// formatea la fila a un Json
itemReport.prototype.toJSON = function () {
  return {
  //  monto: (this.tipo === 'egreso' ? '($' +this.monto + ')' : '$' + this.monto),
    monto: this.monto,
    egreso: this.tipo === 'egreso',
    fecha: this.fecha,
    saldo: (this.saldo < 0 ? '($' + Math.abs(this.saldo) + ')' : '$' + this.saldo),
    saldoNegativo: this.saldo < 0,
    id: this.id
  };
};
