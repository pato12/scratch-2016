myApp.onPageBeforeAnimation('SettingsCategorias', function (page) {
  render();

  $$('#listadoCategorias input').on('change', cambiarDefault);
  $$('.swipeout-categoria').on('deleted', borrarCategoria);

  function render() {
    var listado = almacenamientoCategorias.get();
    var listadoView = $$('#listadoCategorias');

    listadoView.find('li').remove();

    if (listado.length == 1) {
      var item = listado[0];
      var html = Template7.templates.categoriaItemNotRemovable(item);

      listadoView.append(html);
    } else {
      for (var i in listado) {
        var item = listado[i];
        var html = Template7.templates.categoriaItem(item);

        listadoView.append(html);
      }
    }
  }

  function cambiarDefault() {
    var categoriaId = $$(this).val();
    var categorias = almacenamientoCategorias.get();

    for (var i in categorias) {
      categorias[i].esDefault = categoriaId == categorias[i].id;
    }

    almacenamientoCategorias.save(categorias);
  }

  function cambiarCategoriaAlDefault(categoriaBorrada) {
    var movements = almacenamientoMovements.get();
    var categoriaDefault = almacenamientoCategorias.getDefault();

    for(var k in movements) {
      for(var i in movements[k]) {
        if(movements[k][i].categoria == categoriaBorrada)
        movements[k][i].categoria = categoriaDefault.id;
      }
    }

    almacenamientoMovements.save(movements);
  }

  function borrarCategoria(e) {
    var id = $$(this).data('id');
    var categoria = almacenamientoCategorias.getById(id);

    almacenamientoCategorias.deleteById(id);

    if (categoria.esDefault) {
      var categorias = almacenamientoCategorias.get();

      categorias[0].esDefault = true;

      almacenamientoCategorias.save(categorias);
    }

    cambiarCategoriaAlDefault(id);
    render();
  }

});
