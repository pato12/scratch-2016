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

//Constructor 
var reporteGrafico = function() {
    this.movements = almacenamientoMovements.get();
    this.crearArrayDatosNVD3(movements);
};

/*
    Crea el array que consume la libreria para poder armar el grafico
*/
reporteGrafico.prototype.crearArrayDatosNVD3 = function(movimientos) {

};

//reduce todos los movimientos a un objeto con montos por categoria por dia
reporteGrafico.prototype.agruparMovimientosPorCategoria = function(movimientos) {
    var reducidos = {};
    for(var i in movimientos) {
        var movimiento = movimientos[i];
        var fecha = movimiento.fecha.substr(0, 15);
        
        if(!(fecha in reducidos)) {
            reducidos[fecha] = 0;
        }

        reducidos[fecha] += movimiento.monto * (movimiento.tipo === 'ingreso'? 1 : -1);
    }
    return reducidos;
};

var timespanDay = function(fecha) {
    var d = new Date(fecha);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);

    return d.getTime();
};