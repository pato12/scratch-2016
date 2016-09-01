var itemReport = function (tipo, monto, saldo, id) {
  this.ingreso = '-';
  this.egreso = '-';
  this.saldo = saldo;
  this.id = id;

  if (tipo === 'ingreso')
    this.ingreso = monto;
  else
    this.egreso = monto;
};

itemReport.prototype.toJSON = function () {
  return {
    ingreso: (this.ingreso !== '-' ? '$' + this.ingreso : '-'),
    egreso: (this.egreso !== '-' ? '$' + this.egreso : '-'),
    saldo: (this.saldo < 0 ? '($' + Math.abs(this.saldo) + ')' : '$' + this.saldo),
    saldoNegativo: this.saldo < 0,
    id: this.id
  };
};
