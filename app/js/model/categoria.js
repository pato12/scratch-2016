var categoria = function (nombre, descripcion, esDefault, tipo) {
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.esDefault = esDefault;
  this.tipo = tipo;
  this.id = almacenamientoCategorias.getNextId();
};

categoria.prototype.toJSON = function () {
  return {
    "nombre": this.nombre,
    "descripcion": this.descripcion,
    "esDefault": this.esDefault,
    "id": this.id,
    "tipo": this.tipo
  };
};

categoria.prototype.save = function () {
  var jsonCategoria = this.toJSON();
  var categorias = almacenamientoCategorias.get();

  categorias.push(jsonCategoria);

  almacenamientoCategorias.save(categorias);
};


var almacenamientoCategorias = {
  save: function (json) {
    localStorage.Categorias = JSON.stringify(json);
  },
  get: function () {
    var defaultCategoria = [{ nombre: 'General', descripcion: 'Categoria general ingreso', esDefault: true, id: 1, tipo: 'ingreso'}, { nombre: 'General', descripcion: 'Categoria general egreso', esDefault: true, id: 2, tipo: 'egreso'}];
    var jsonText = localStorage.Categorias || '[]';
    var parse = JSON.parse(jsonText);

    if (!parse.length) {
      this.save(defaultCategoria);
      return defaultCategoria;
    }
    else return parse;
  },
  getNextId: function () {
    var lastId = localStorage.CategoriasId || '2';

    lastId = parseInt(lastId) + 1;

    localStorage.CategoriasId = lastId;

    return lastId;
  },
  getById: function (id) {
    var categorias = this.get();
    var listado = categorias;

    for (var i in listado) {
      if (listado[i].id == id)
        return listado[i];
    }

    return null;
  },
  getByName: function (nombre) {
    var categorias = this.get();
    var listado = categorias;

    for (var i in listado) {
      if (listado[i].nombre == nombre)
        return listado[i];
    }

    return null;
  },
  saveById: function (categoria) {
    if (!categoria.id) {
      return false;
    }

    var listado = this.get();

    for (var i in listado) {
      if (listado[i].id == categoria.id) {
        listado[i] = categoria;
        break;
      }
    }

    this.save(listado);
  },
  deleteById: function (id) {
    var categorias = this.get();

    for (var i in categorias) {
      if (categorias[i].id == id) {
        categorias.splice(i, 1);
        break;
      }
    }

    this.save(categorias);
  },
  getDefault: function (tipo) {
    var categorias = this.get();

    for (var i in categorias) {
      if (categorias[i].esDefault && categorias[i].tipo == tipo) {
        return categorias[i];
      }
    }

    return null;
  },
  /*
    Comprueba si se agrego una categoria. Devuelve true si se agrego y false en caso contrario
  */
  seAgregoCategoria: function (nombre, tipo) {
    return !!this.existeCategoria(nombre, tipo);
  },
  /*
    Comprueba si existe una categoria del nombre pasado por parametro.
    Si existe, devuelve la categoria. Si no existe, devuelve null.
  */
  existeCategoria: function (nombre, tipo) {
    var categorias = this.get();

    for (var i in categorias) {
      if (categorias[i].nombre.toLowerCase() == nombre.toLowerCase().trim() && categorias[i].tipo == tipo) {
        return categorias[i];
      }
    }

    return null;
  },
  /*
    Comprueba si existe una categoria del nombre pasado por parametro.
    Si existe, devuelve la categoria. Si no existe, crea la categoria y la devuelve tambien.
  */
  comprobarCategoria: function (nombre, tipo) {
    var categorias = this.get();

    if (nombre.trim() == '') {
      return { nuevo: false, categoria: this.getDefault(tipo) };
    }

    var catExistente = this.existeCategoria(nombre, tipo);

    if (catExistente === null) {
      var cat = new categoria(nombre.trim(), '', false, tipo);
      cat.save();
      return { nuevo: true, categoria: cat.toJSON() };

    } else {
      return { nuevo: false, categoria: catExistente };

    }
  },
  /*
    Devuelve la cantidad de categorias
  */
  getCantidadCategorias: function() {
    return this.get().length;
  }
};
