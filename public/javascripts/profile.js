console.log("sanity check is working!!!!");

var profileHtml;
var profileTemplate;

$(document).ready(function() {

  profileHtml = $('#profile-template').html();
  profileTemplate = Handlebars.compile(profileHtml);

  $.ajax({
  method: 'GET',
  url: '/',
  data: 'json',
  success: handleProfile
});
}
