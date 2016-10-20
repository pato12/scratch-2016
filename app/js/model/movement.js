//logica para efectuar operaciones sobre el localStorage de movimientos
var almacenamientoMovements = {
  save: function(json) {
    localStorage.Movements = JSON.stringify(json);
  },
  get: function() {
    var jsonText = localStorage.Movements || '{"ingresos": [], "egresos": []}';
    return JSON.parse(jsonText);
  },
  getNextId: function() {
    var lastId = localStorage.MovementsId ||  '0';

    lastId = parseInt(lastId) + 1;

    localStorage.MovementsId = lastId;

    return lastId;
  },
  getById: function(id) {
    var movements = this.get();
    var listado = [];

    listado = listado.concat(movements.ingresos, movements.egresos);

    for (var i in listado) {
      if (listado[i].id == id)
        return listado[i];
    }

    return null;
  },
  saveById: function(movimiento) {
    if (!movimiento.id) {
      return false;
    }

    var movements = this.get();
    var listado = movimiento.tipo == 'ingreso' ? movements.ingresos : movements.egresos;

    for (var i in listado) {
      if (listado[i].id == movimiento.id) {
        listado[i] = movimiento;
        break;
      }
    }

    this.save(movements);
  },
  deleteById: function(id) {
    var movements = this.get();

    for (var k in movements) {
      for (var i in movements[k]) {
        if (movements[k][i].id == id) {
          movements[k].splice(i, 1);
          break;
        }
      }
    }

    this.save(movements);
  }
};

//definicion del constructor con sus atributos
var movement = function(monto, fecha, motivo, categoria, tipo) {
  this.monto = monto;
  this.fecha = fecha;
  this.motivo = motivo;
  this.categoria = categoria;
  this.tipo = tipo;
  this.id = almacenamientoMovements.getNextId();
};

/*getters*/
movement.prototype.getMonto = function() {
  return this.monto;
};
movement.prototype.getFecha = function() {
  return this.fecha;
};
movement.prototype.getMotivo = function() {
  return this.motivo;
};
movement.prototype.getTipo = function() {
  return this.tipo;
};

/*Formatea a json un objeto movimiento*/
movement.prototype.toJSON = function() {
  return {
    "monto": this.monto,
    "fecha": this.fecha,
    "motivo": this.motivo,
    "tipo": this.tipo,
    "categoria": this.categoria,
    "id": this.id
  };
};

/*Logica que almacena un movimiento en el json local*/
movement.prototype.save = function() {
  var jsonMovement = this.toJSON();
  var movements = almacenamientoMovements.get();

  if (jsonMovement.tipo == 'ingreso')
    movements.ingresos.push(jsonMovement);
  else
    movements.egresos.push(jsonMovement);

  almacenamientoMovements.save(movements);
};

/*logica que retorna todos los movimientos del json local*/
movement.getAll = function() {
  return almacenamientoMovements.get();
};
