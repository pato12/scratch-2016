var movement = function(monto, fecha, motivo, tipo) {
  this.monto = monto;
  this.fecha = fecha;
  this.motivo = motivo;
  this.tipo = tipo;
};

movement.prototype.getMonto = function() {
  return this.monto;
}

movement.prototype.getFecha = function() {
  return this.fecha;
}

movement.prototype.getMotivo = function() {
  return this.motivo;
}

movement.prototype.getTipo = function() {
  return this.tipo;
}