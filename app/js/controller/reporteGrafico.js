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
      }
    }

    for(var j in reducidos) {
      reducidos[j] = reducir(reducidos[j]);
    }


    return crearPareto(reducidos);
};


//crea un array de datos de gastos por categoria y por dia para que luego lo consuma la libreria
reporteGraficoController.prototype.crearArrayDatosNVD3 = function (movimientos) {
  var resultados = this.agruparMovimientosPorCategoria(movimientos);
  var final = [];

  for(var id_categoria in resultados) {
    var categoria = id_categoria === 'others'? {nombre: 'Otros', id: '0'} : almacenamientoCategorias.getById(id_categoria);
    var values;

    values = Object.keys(resultados[id_categoria]).sort().map(function(day){
      return [parseInt(day), Number(resultados[id_categoria][day])];
    });

    final.push({
      key: categoria.nombre,
      values: values
    });
  }

  return final;
};

// pasa de una fecha en string a timespan a las 00:00
var timespanDay = function(fecha) {
    var d = new Date(fecha);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);

    return d.getTime();
};

// funcion auxiliar para calcular el saldo acumulado
var reducir = function(cat) {
  var days = Object.keys(cat).sort();

  days.reduce(function(anterior, actual, index){
    cat[actual] = anterior + cat[actual];

    return cat[actual];
  }, 0);

  return cat;
};

// crea el objeto teniendo encuenta el principio de pareto
var crearPareto = function (reducidos) {
  var resultados = {};
  var mergear = [];
  var total = 0.0;
  var porcentaje = 0;

  if(Object.keys(reducidos).length < 8)
    return reducidos;

  for(var i in reducidos) {
    total += reducidos[i][Object.keys(reducidos[i]).pop()];
  }

  for(var i in reducidos) {
    var subtotal = reducidos[i][Object.keys(reducidos[i]).pop()];
    porcentaje += subtotal * 100 / total;

    if(porcentaje < 80) {
      resultados[i] = reducidos[i];
    } else {
      mergear.push(reducidos[i]);
    }
  }

  if(mergear.length) {
    var days = Object.keys(mergear[0]).sort();
    var others = {};

    days.reduce(function(anterior, actual, index){
      var s = 0;

      for(var i in mergear) {
        s += mergear[i][actual];
      }

      others[actual] = s;

      return others[actual];
    }, 0);

    resultados['others'] = others;
  }

  return resultados;
};



if (!Array.prototype.reduce)
{
  Array.prototype.reduce = function(fun /*, inicial*/)
  {
    var longitud = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    // no se devuelve ningún valor si no hay valor inicial y el array está vacío
    if (longitud == 0 && arguments.length == 1)
      throw new TypeError();

    var indice = 0;
    if (arguments.length >= 2)
    {
      var rv = arguments[1];
    }
    else
    {
      do
      {
        if (indice in this)
        {
          rv = this[indice++];
          break;
        }

        // si el array no contiene valores, no existe valor inicial a devolver
        if (++indice >= longitud)
          throw new TypeError();
      }
      while (true);
    }

    for (; indice < longitud; indice++)
    {
      if (indice in this)
        rv = fun.call(null, rv, this[indice], indice, this);
    }

    return rv;
  };
}
