var categoria = function (nombre, descripcion, esDefault) {
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.esDefault = esDefault;
  this.id = almacenamientoCategorias.getNextId();
};

categoria.prototype.toJSON = function () {
  return {
    "nombre": this.nombre,
    "descripcion": this.descripcion,
    "esDefault": this.esDefault,
    "id": this.id
  };
};

categoria.prototype.save = function () {
  var jsonCategoria = this.toJSON();
  var categorias = almacenamientoCategorias.get();

  categorias.push(jsonCategoria);

  almacenamientoCategorias.save(categorias);
};

categoria.default = {nombre: 'General', descripcion: 'Categoria general', esDefault: true, id: -1};

var almacenamientoCategorias = {
  save: function (json) {
    localStorage.Categorias = JSON.stringify(json);
  },
  get: function () {
    var defaultCategoria = [categoria.default];
    var jsonText = localStorage.Categorias || '[]';
    var parse = JSON.parse(jsonText);

    if(!parse.length) return defaultCategoria;
    else return parse;
  },
  getNextId: function () {
    var lastId = localStorage.CategoriasId ||  '1';

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
  getDefault: function () {
    var categorias = this.get();

    for (var i in categorias) {
      if (categorias[i].esDefault) {
        return categorias[i];
      }
    }

    return null;
  },
  comprobarCategoria: function (nombre) {
    var categorias = this.get();

    if(nombre.trim() == '') {
      return {nuevo: false, categoria: this.getDefault()};
    }

    for (var i in categorias) {
      if (categorias[i].nombre == nombre) {
        return {nuevo: false, categoria: categorias[i]};
      }
    }

    var cat = new categoria(nombre, '', false);
    cat.save();

    return {nuevo: true, categoria: cat.toJSON()};
  }
};
