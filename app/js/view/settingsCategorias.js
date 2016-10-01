myApp.onPageBeforeAnimation('SettingsCategorias', function(page){
  var listado = almacenamientoCategorias.get();

  var listadoView = $$('#listadoCategorias');

  $$('#listadoCategorias li').remove();

  for (var i in listado) {
    var item = listado[i];
    var html = Template7.templates.categoriaItem(item);

    listadoView.append(html);
  }

  $$('#listadoCategorias input').on('change', cambiarDefault);
  $$('.swipeout-categoria').on('deleted', borrarCategoria);

  function cambiarDefault() {
    var categoriaId = $$(this).val();
    var categorias = almacenamientoCategorias.get();


    for(var i in categorias) {
      categorias[i].esDefault = categoriaId == categorias[i].id;
    }

    almacenamientoCategorias.save(categorias);
  }

  function borrarCategoria (e) {
    var id = $$(this).data('id');

    almacenamientoCategorias.deleteById(id);
    var categorias = almacenamientoCategorias.get();
    categorias[0].esDefault= "true";
  }

});
