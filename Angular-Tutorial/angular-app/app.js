(function(){ // wrap the app in a closure
  var app = angular.module('store',[]);

  app.controller('storeController', function(){
    this.products = gems;
  });

  // defined panel controller in the directive
  // app.controller('panelController', function(){
  //   this.tab = 1;
  //   this.selectTab = function(setTab){
  //     this.tab = setTab;
  //   };
  //   this.isSelected = function(setTab){
  //     return this.tab === setTab;
  //   }
  // });

  app.controller('reviewController', function(){
    this.review = {};
    this.addReview = function(product){
      product.reviews.push(this.review);
      // this.review is the context from the function call
      this.review = {}; // resets the form
    };
  });

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



  var gems = [
      {
        name: 'Azurite',
        description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
        shine: 8,
        price: 110.50,
        rarity: 7,
        color: '#CCC',
        faces: 14,
        images: [
          "tet-gem1.png",
          "images/gem-05.gif",
          "images/gem-09.gif"
        ],
        reviews: [{
          stars: 5,
          body: "I love this gem!",
          author: "joe@example.org"
        }, {
          stars: 1,
          body: "This gem sucks.",
          author: "tim@example.org"
        }]
      }, {
        name: 'Bloodstone',
        description: "Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides, however.",
        shine: 9,
        price: 22.90,
        rarity: 6,
        color: '#EEE',
        faces: 12,
        images: [
          "gem-01.gif",
          "images/gem-03.gif",
          "images/gem-04.gif"
        ],
        reviews: [{
          stars: 3,
          body: "I think this gem was just OK, could honestly use more shine, IMO.",
          author: "JimmyDean@example.org"
        }, {
          stars: 4,
          body: "Any gem with 12 faces is for me!",
          author: "gemsRock@example.org"
        }]
        }, {
          name: 'Zircon',
          description: "Zircon is our most coveted and sought after gem. You will pay much to be the proud owner of this gorgeous and high shine gem.",
          shine: 70,
          price: 1100,
          rarity: 2,
          color: '#000',
          faces: 6,
          images: [
            "tet-gem1.png",
            "images/gem-07.gif",
            "images/gem-08.gif"
          ],
          reviews: [{
            stars: 1,
            body: "This gem is WAY too expensive for its rarity value.",
            author: "turtleguyy@example.org"
          }, {
            stars: 1,
            body: "BBW: High Shine != High Quality.",
            author: "LouisW407@example.org"
          }, {
            stars: 1,
            body: "Don't waste your rubles!",
            author: "nat@example.org"
          }]
      }
    ];
}());
