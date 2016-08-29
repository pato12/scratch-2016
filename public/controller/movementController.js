var movementController = function() {
    //this.movementView = new movementView();
    //this.initialize();
}

movementController.prototype.agregarMovimiento = function(monto, fecha, motivo, tipo) {
    var movimiento = new movimiento(monto, fecha, motivo, tipo);
  
    var newJSONMovement = {
      "monto": "",
      "fecha": "",
      "motivo": ""
    }
    newJSONMovement.monto = monto;
    newJSONMovement.fecha = fecha;
    newJSONMovement.motivo = motivo;
    var movementJSON = this.getMovementJSON ();
    movementJSON.tipo.push(newJSONMovement);
   
}

movementController.prototype.getMovementJSON = function () {
  var serverRequest = new XMLHttpRequest();
  serverRequest.open("GET", "/public/movements.json", false);
  serverRequest.send();
  var movementJSON;
  try{
      movementJSON = JSON.parse(serverRequest.response);
  }
  catch (e) {
      console.log(e.toString + ' while parsing JSON');
  }
  return movementJSON;
}
