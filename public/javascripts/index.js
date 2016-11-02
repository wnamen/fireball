$(document).ready(function() {
  $('#simulation-forms').css('display', 'none');

  //added slideToggle to new recipe form
  $('#form-toggle').click(function(e){
    e.preventDefault();

    $('#simulation-forms').slideToggle('slow');
  })

  $('#form-cancel').click(function(e){
    e.preventDefault();

    $('#simulation-forms').slideToggle('slow');
  })
});
