var dashboard = function() {
  this.movements = [];
}

dashboard.prototype.addMovement = function(movement) {
  this.movements.push(movement);
}