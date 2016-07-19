$(function(){
  $.get('/blocks', appendToList);
  function appendToList(blocks){
    var list = [];
    var content, block;
    for (var i = 0; i < blocks.length; i+=1){
      block = blocks[i];
      content = '<a href="/blocks/'+block+'">'+block+'</a>' + '<a href="#" data-block="' + block + '"><img src="del.ico" width="20px" height="20px" / ></a>';
      list.push($('<li>',{ html: content}));
    }
    $('.blocks-list').append(list)
  };
  $('form').on('submit', function(e){
    e.preventDefault();
    var form = $(this);
    var blockData = form.serialize();
    $.ajax({
      type: "POST",
      url: "/blocks",
      data: blockData
    }).done(function(blockName){
    appendToList([blockName]);
    form.trigger('reset');// clears text input
    });
  });
  $('.blocks-list').on('click', 'a[data-block]', function(e){
    e.preventDefault();
    if(!confirm('Are you sure?')){ // confirmation of delete
      return false
    };
    var target = $(e.currentTarget)
    $.ajax({
      type: "DELETE",
      url: "/blocks/"+ target.data('block')
    }).done(function(){
      target.parents('li').remove() // removes target li item
    });
  });
});
