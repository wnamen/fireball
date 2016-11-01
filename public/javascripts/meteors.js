console.log("sanity check is working!!!!");

var meteorHtml;
var meteorTemplate;

$(document).ready(function() {

  meteorHtml = $('#meteor-template').html();
  meteorTemplate = Handlebars.compile(meteorHtml);

  $.ajax({
    url: "https://data.nasa.gov/resource/y77d-th95.json",
    type: "GET",
    data: {
      "$limit" : 100,
      "$$app_token" : "MkppVWDs5NEBZihs6wrZOO1vG"
    }
  }).done(function (data) {
    console.log(data);

    handleMeteors(data);
  });
});

function handleMeteors(meteors){

  meteors.forEach(function(meteor) {
    meteor.year = meteor.year.slice(0,4)
    renderMeteor(meteor);
  });
}

function renderMeteor(meteor) {
  var html = meteorTemplate(meteor);
  $('#meteors').prepend(html);
}
