//Genera las filas que contienen los datos del reporte
myApp.onPageBeforeAnimation('Movements-Report', function (page) {

  render();

  function render() {
		var myMovementsReportController = new movementsReportController();
    var listadoItemReports = myMovementsReportController.calcularItemsReports();

    var listadoView = $$('#listadoItemsReporte');

    listadoView.find('li').remove();

    for (var i in listadoItemReports) {
      var item = listadoItemReports[i];
      var html = Template7.templates.reporteItemTemplate(item.toJSON());

      listadoView.append(html);
    }

    //Comienza el proceso de borrado de un movimiento cuando se preciona el boton "deleted"
    $$('.swipeout-movement').on('deleted', function (e) {
      var id = $$(this).data('id');
      myMovementsReportController.eliminarMovimiento(id);
      render();
    });
  }
});
