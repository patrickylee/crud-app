$(document).ready(function(){
  $('.delete-article').on('click', function(e) {
    const id = e.target.dataset.id;
    // or
    // const target = $(e.target);
    // const id = target.attr('data-id');

    // send a delete request upon clicking the button to the url of the current article. App.js will catch this request and proceed to actually deleting the article
    $.ajax ({
      type: 'DELETE',
      url: '/article/'+id,
      success: function(response) {
        alert('Deleting Article');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
