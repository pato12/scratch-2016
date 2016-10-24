/*inicializacion de la UI de grafico por categoriras*/
myApp.onPageInit('GraficoGastosPorCategoria', function (page) {
  var myCalendario;
  var controlador;
  var chart;


  controlador = new reporteGraficoController();

  // inicializo el calendario
  myCalendario = myApp.calendar({
    input: '#calendario-input-inicio',
    dateFormat: 'dd M yyyy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lu', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    toolbarCloseText: 'Hecho'
  });

  //seteo fecha actual al calendario por default
  myCalendario.setValue([new Date()]);


  // chartData.datum(result.data).transition().duration(500).call(chart); se actualiza





  nv.addGraph(function () {
    chart = nv.models.stackedAreaChart()
      .useInteractiveGuideline(true)
      .x(function (d) {
        return d[0];
      })
      .y(function(d) {
        return d[1];
      })
      .showControls(true)
      .duration(300)
      .clipEdge(false);


    chart.xAxis.tickFormat(function (d) {
      return d3.time.format('%d/%m/%y')(new Date(d));
    });

    //chart.yAxis.tickFormat(d3.format('$,.2f'));

    d3.select('#chart svg').datum(toDataChart()).call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });



  function toDataChart() {
    var movimientos = almacenamientoMovements.get();
    var filtrados = controlador.crearArrayDatosNVD3(movimientos.ingresos.concat(movimientos.egresos));

    return filtrados;
  }

});
