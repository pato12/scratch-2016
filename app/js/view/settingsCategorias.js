myApp.onPageBeforeAnimation('SettingsCategorias', function (page) {
  render();

  //Busca las categorías guardadas y las muestra
  function render() {
    var listado = almacenamientoCategorias.get();
    var listadoViewIngresos = $$('#listadoCategoriasIngresos');
    var listadoViewEgresos = $$('#listadoCategoriasEgresos');

    var ingresos = [];
    var egresos = [];

    for(var i in listado) {
      if(listado[i].tipo == 'ingreso')
      ingresos.push(listado[i]);
      else
      egresos.push(listado[i]);

    }

    listadoViewIngresos.find('li').remove();
    listadoViewEgresos.find('li').remove();

    if (ingresos.length == 1) {
      var item = ingresos[0];
      var html = Template7.templates.categoriaItemNotRemovable(item);

      listadoViewIngresos.append(html);
    } else {
      for (var i in ingresos) {
        var item = ingresos[i];
        var html = Template7.templates.categoriaItem(item);

        listadoViewIngresos.append(html);
      }
    }

    if (egresos.length == 1) {
      var item = egresos[0];
      var html = Template7.templates.categoriaItemNotRemovable(item);

      listadoViewEgresos.append(html);
    } else {
      for (var i in egresos) {
        var item = egresos[i];
        var html = Template7.templates.categoriaItem(item);

        listadoViewEgresos.append(html);
      }
    }

    $$('#listadoCategoriasEgresos input, #listadoCategoriasIngresos input').on('change', cambiarDefault);
    $$('.swipeout-categoria').on('deleted', borrarCategoria);
  }
//Cambia el default de una historia
  function cambiarDefault() {
    var categoriaId = $$(this).val();
    var categorias = almacenamientoCategorias.get();
    var tipo = $$(this).parents('ul.listado').data('tipo');

    for (var i in categorias) {
      if(tipo == categorias[i].tipo) {
        categorias[i].esDefault = categoriaId == categorias[i].id;
      }
    }

    almacenamientoCategorias.save(categorias);
  }

  function cambiarCategoriaAlDefault(categoriaBorrada, tipo) {
    var movements = almacenamientoMovements.get();
    var categoriaDefault = almacenamientoCategorias.getDefault(tipo);

    for(var k in movements) {
      for(var i in movements[k]) {
        if(movements[k][i].categoria == categoriaBorrada)
        movements[k][i].categoria = categoriaDefault.id;
      }
    }

    almacenamientoMovements.save(movements);
  }
//Borra la categoría seleccionada
  function borrarCategoria(e) {
    var id = $$(this).data('id');
    var categoria = almacenamientoCategorias.getById(id);

    almacenamientoCategorias.deleteById(id);

    if (categoria.esDefault) {
      var categorias = almacenamientoCategorias.get();

      for(var i in categorias) {
        if(categorias[i].tipo == categoria.tipo) {
          categorias[i].esDefault = true;
          break;
        }
      }

      almacenamientoCategorias.save(categorias);
    }

    cambiarCategoriaAlDefault(id, categoria.tipo);
    setTimeout(render, 300);
  }

});
