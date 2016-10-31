var reporteGraficoController = function () {
};


// filtra todos los movimientos de acuerdo al periodo indicado
reporteGraficoController.prototype.filtrarPorPeriodo = function (movimientos, fechaInicio, periodo) {
  var fecha_inicio = new Date(fechaInicio).getTime();
  var fecha_final = fecha_inicio + parseInt(periodo) * 7 * 60 * 60 * 24 * 1000;

  return movimientos.filter(function(movimiento) {
    var fecha = Date.parse(movimiento.fecha);

    return fecha_inicio <= fecha && fecha <= fecha_final;
  });
};

//reduce todos los movimientos a un objeto con montos por categoria por dia
reporteGraficoController.prototype.agruparMovimientosPorCategoria = function(movimientos) {
    var reducidos = {};
    var days = [];
    var contadores = {};

    movimientos = movimientos.sort(function(a, b){
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });

    for(var i in movimientos) {
        var movimiento = movimientos[i];
        var fecha = timespanDay(movimiento.fecha);

        if(days.indexOf(fecha) === -1) {
          days.push(fecha);
        }

        if(!(movimiento.categoria in reducidos)) {
          reducidos[movimiento.categoria] = {};
          contadores[movimiento.categoria] = 0;
        }

        if(!(fecha in reducidos[movimiento.categoria])) {
            reducidos[movimiento.categoria][fecha] = 0;
        }

        reducidos[movimiento.categoria][fecha] += movimiento.monto * (movimiento.tipo === 'ingreso'? 1 : -1);
    }

    for(var i in days) {
      for(var j in reducidos) {
        var day = days[i];

        if(!(day in reducidos[j]))
          reducidos[j][day] = 0;

        reducidos[j][day] += contadores[j];
        contadores[j] = reducidos[j][day];
      }
    }

    return reducidos;
};

reporteGraficoController.prototype.crearArrayDatosNVD3 = function (movimientos) {
  var resultados = this.agruparMovimientosPorCategoria(movimientos);
  var final = [];

  for(var id_categoria in resultados) {
    var categoria = almacenamientoCategorias.getById(id_categoria);
    var values;

    values = Object.keys(resultados[id_categoria]).map(function(day){
      return [parseInt(day), resultados[id_categoria][day]];
    });

    final.push({
      key: categoria.nombre,
      values: values
    });
  }

  return final;
};

var timespanDay = function(fecha) {
    var d = new Date(fecha);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);

    return d.getTime();
};
