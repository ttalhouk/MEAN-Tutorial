(function(){ // wrap the app in a closure
  var app = angular.module('store',[]);

  app.controller('storeController', function(){
    this.products = gems;
  });
  var gems = [
    {
      name: 'tetrahedron',
      price: 10.95,
      description: "3 sided",
      canPurchase: true,
      soldOut: false
    },
    {
      name: 'dodecahedron',
      price: 2.95,
      description: "10 sided",
      canPurchase: false,
      soldOut: false
    }
  ]
}());
