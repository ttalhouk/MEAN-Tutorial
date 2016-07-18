$(function(){
  $.get('/blocks', appendToList);
  function appendToList(blocks){
    console.log(blocks.length);
    var list = [];
    for (var i = 0; i < blocks.length; i+=1){
      list.push($('<li>',{ text: blocks[i] }));
    }
    console.log(list);
    $('.blocks-list').append(list)
  };
});
