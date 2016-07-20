(function(){ // wrap the app in a closure
  var app = angular.module('store',[]);

  app.controller('storeController', function(){
    this.products = gems;
  });
  app.controller('panelController', function(){
    this.tab = 1;
    this.selectTab = function(setTab){
      this.tab = setTab;
    };
    this.isSelected = function(setTab){
      return this.tab === setTab;
    }
  });

  var gems = [
    {
      name: 'tetrahedron',
      price: 11,
      description: "3 sided",
      canPurchase: true,
      soldOut: false,
      images:[
      {
        full: 'tet-gem1.png',
        thumb: 'tet_thumb.jpg'
      },
      {
        full: 'tet2.jpg',
        thumb: 'tet_thumb2.jpg'
      }],
      reviews:[
      {
          stars: 5,
          body: "love the shine",
          author: "joe@thomas.com"
      },
      {
        stars: 3,
        body: "its ok",
        author: "jim@thomas.com"
      }]
    },
    {
      name: 'dodecahedron',
      price: 2.95,
      description: "10 sided",
      canPurchase: false,
      soldOut: false,
      images:[
      {
        full: 'gem-01.gif',
        thumb: 'dec_thumb.jpg'
      },
      {
        full: 'dec2.jpg',
        thumb: 'dec_thumb2.jpg'
      }],
      reviews:[
      {
          stars: 5,
          body: "love the shine",
          author: "joe@thomas.com"
      },
      {
        stars: 3,
        body: "its ok",
        author: "jim@thomas.com"
      }]
    }
  ];
}());
