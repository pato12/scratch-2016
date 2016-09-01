//logica para guardar y recuperar movimientos
var almacenamientoMovements = {
  save: function (json) {
    localStorage.Movements = JSON.stringify(json);
  },
  get: function () {
    var jsonText = localStorage.Movements || '{"ingresos": [], "egresos": []}';
    return JSON.parse(jsonText);
  }
};

//definicion del constructor con sus atributos
var movement = function (monto, fecha, motivo , tipo) {
  this.monto = monto;
  this.fecha = fecha;
  this.motivo = motivo;
  this.tipo = tipo;
};

/*getters*/
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

/*Formatea a json un objeto movimiento*/
movement.prototype.toJSON = function () {
  return {
    "monto": this.monto,
    "fecha": this.fecha,
    "motivo": this.motivo,
    "tipo": this.tipo
  };
};

/*Logica que almacena un movimiento en el json local*/
movement.prototype.save = function () {
  var jsonMovement = this.toJSON();
  var movements = almacenamientoMovements.get();

  if(jsonMovement.tipo == 'ingreso')
    movements.ingresos.push(jsonMovement);
  else
    movements.egresos.push(jsonMovement);

  almacenamientoMovements.save(movements);
};

/*logica que retorna todos los movimientos del json local*/
movement.getAll = function () {
  return almacenamientoMovements.get();
};
