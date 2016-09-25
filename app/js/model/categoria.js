var categoria = function(nombre, descripcion, esDefault) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.esDefault = esDefault;
    this.id = almacenamientoCategorias.getNextId();
};

categoria.prototype.toJSON = function() {
    return {
        "nombre": this.nombre,
        "descripcion": this.descripcion,
        "esDefault": this.esDefault
    };
};

categoria.prototype.save = function() {
  var jsonCategoria = this.toJSON();
  var categorias = almacenamientoCategorias.get();

  categorias.push(jsonCategoria);

  almacenamientoCategorias.save(categorias);
};

var almacenamientoCategorias = {
  save: function(json) {
    localStorage.Categorias = JSON.stringify(json);
  },
  get: function() {
    var jsonText = localStorage.Categorias || '[]';
    return JSON.parse(jsonText);
  },
  getNextId: function() {
    var lastId = localStorage.CategoriasId ||  '0';

    lastId = parseInt(lastId) + 1;

    localStorage.CategoriasId = lastId;

    return lastId;
  },
  getById: function(id) {
    var categorias = this.get();
    var listado = categorias;

    for (var i in listado) {
      if (listado[i].id == id)
        return listado[i];
    }

    return null;
  },
  saveById: function(categoria) {
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
  deleteById: function(id) {
    var categorias = this.get();

    for (var k in categorias) {
      for (var i in categorias[k]) {
        if (categorias[k][i].id == id) {
          categorias[k].splice(i, 1);
          break;
        }
      }
    }
    
    this.save(categorias);
  }
};

