// moved from app.js
(function(){
  var app = angular.module('store-products', [])

  app.directive('productTitle',function(){
    return{
      restrict:'E', // defines type of dirctive "E" element
      templateUrl:'product-title.html'
    };
  });
  app.directive('productPanels',function(){
    return{
      restrict:'E', // defines type of dirctive "E" element
      templateUrl:'product-panels.html',
      controller: function(){
        this.tab = 1;
        this.selectTab = function(setTab){
          this.tab = setTab;
        };
        this.isSelected = function(setTab){
          return this.tab === setTab;
        }
      },
      controllerAs:'panel'
    };
  });
  app.directive('productSpecs',function(){
    return{
      restrict:'E', // defines type of dirctive "E" element
      templateUrl:'product-specs.html'
    };
  });

})();
