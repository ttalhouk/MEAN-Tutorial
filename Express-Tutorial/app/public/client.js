$(function(){
  $.get('/blocks', appendToList);
  function appendToList(data){
    var list = [];
    for (var i; i < data.length; i+=1){
      list.push($('<li>',{ text: data[i] }));
    }
    $('.blocks-list').append(list)
  };
});
