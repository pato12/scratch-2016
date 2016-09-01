myApp.onPageInit('Movements-Report', function(page) {
	var myMovementsReportController = new movementsReportController();
	var listadoItemReports = myMovementsReportController.calcularItemsReports();

	var listadoView = $$('#listadoItemsReporte');

	for (var i in listadoItemReports) {
		var item = listadoItemReports[i];
		var html = Template7.templates.reporteItemTemplate(item.toJSON());

		listadoView.append(html);
	}


	$$('.swipeout').on('deleted', function(e) {
		var id = $$(this).data('id');
		myMovementsReportController.eliminarMovimiento(id);
	});
});