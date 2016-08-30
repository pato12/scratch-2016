var almacenamientoMovements = {
  save: function (json) {
    localStorage.Movements = JSON.stringify(json);
  },
  get: function () {
    var jsonText = localStorage.Movements || '{"ingresos": [], "egresos": []}';
    return JSON.parse(jsonText);
  }
};

var movement = function (monto, fecha, motivo , tipo) {
  this.monto = monto;
  this.fecha = fecha;
  this.motivo = motivo;
  this.tipo = tipo;
};

movement.prototype.getMonto = function () {
  return this.monto;
};

movement.prototype.getFecha = function () {
  return this.fecha;
};

movement.prototype.getMotivo = function () {
  return this.motivo;
};

movement.prototype.getTipo = function () {
  return this.tipo;
};

movement.prototype.toJSON = function () {
  return {
    "monto": this.monto,
    "fecha": this.fecha,
    "motivo": this.motivo,
    "tipo": this.tipo
  };
};

movement.prototype.save = function () {
  var jsonMovement = this.toJSON();
  var movements = almacenamientoMovements.get();

  if(jsonMovement.tipo == 'ingreso')
    movements.ingresos.push(jsonMovement);
  else
    movements.egresos.push(jsonMovement);

  almacenamientoMovements.save(movements);
};

movement.getAll = function () {
  return almacenamientoMovements.get();
};
