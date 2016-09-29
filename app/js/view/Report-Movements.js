//Genera las filas que contienen los datos del reporte
myApp.onPageInit('Movements-Report', function(page) {
	var movements = almacenamientoMovements.get();
	var myMovementsReportController = new movementsReportController(movements);
	var listadoItemReports = myMovementsReportController.calcularItemsReports();

	var listadoView = $$('#listadoItemsReporte');

	for (var i in listadoItemReports) {
		var item = listadoItemReports[i];
		var html = Template7.templates.reporteItemTemplate(item.toJSON());

		listadoView.append(html);
	}

//Comienza el proceso de borrado de un movimiento cuando se preciona el boton "deleted"
	$$('.swipeout').on('deleted', function(e) {
		var id = $$(this).data('id');
		myMovementsReportController.eliminarMovimiento(id);
	});
});
