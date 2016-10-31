/*inicializacion de la UI de grafico por categoriras*/
myApp.onPageInit('GraficoGastosPorCategoria', function (page) {
  var myCalendario;
  var controlador;
  var chart;
  var fecha;


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

  fecha = new Date(Date.now() - 3 * 7 * 24 * 60 * 60 * 1000);

  //seteo fecha anterior al calendario por default
  myCalendario.setValue([fecha]);

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

    chart.yAxis.tickFormat(d3.format('$,.2f'));

    d3.select('#chart svg').datum(toDataChart()).call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });


  $$('#filtrar-btn').on('click', filtrar);

  function filtrar() {
    d3.select('#chart svg').datum(toDataChart()).transition().duration(500).call(chart);
  }

  function toDataChart() {
    var movements = almacenamientoMovements.get();
    var movimientos = movements.ingresos.concat(movements.egresos);
    var form = myApp.formToJSON('#form-filter');
    var filtrados = controlador.filtrarPorPeriodo(movimientos, form.fecha, form.periodo);
    var resultados = controlador.crearArrayDatosNVD3(filtrados);

    return resultados;
  }

});
