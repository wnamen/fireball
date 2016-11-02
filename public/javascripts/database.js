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

  //searches api for query using NAME SEARCH BAR
  $('#name-form').on('submit', handleNameSearch);

  //searches api for query using ID SEARCH BAR
  $('#id-form').on('submit', handleIdSearch);

  //searches api for query using CLASS SEARCH BAR
  $('#class-form').on('submit', handleClassSearch);

  //searches api for query using MASS SEARCH BAR
  $('#mass-form').on('submit', handleMassSearch);

  //searches api for query using YEAR SEARCH BAR
  $('#year-form').on('submit', handleYearSearch);

});

function handleMeteors(meteors){
  console.log(meteors);
  meteors.forEach(function(meteor) {
    meteor.year = meteor.year.slice(0,4)
    renderMeteor(meteor);
  });
}

function handleNameSearch(e) {

  e.preventDefault();
  $("#meteors").empty();

  $.ajax({
    method: "GET",
    url: "https://data.nasa.gov/resource/y77d-th95.json",
    dataType: 'JSON',
    data: $(this).serialize().slice(0,5) + $(this).serialize().charAt(5).toUpperCase() + $(this).serialize().slice(6),
    success: handleMeteors
  });

  $(this).trigger("reset");
}

function handleIdSearch(e) {

  e.preventDefault();
  $("#meteors").empty();

  $.ajax({
    method: "GET",
    url: "https://data.nasa.gov/resource/y77d-th95.json",
    dataType: 'JSON',
    data: $(this).serialize(),
    success: handleMeteors
  });

  $(this).trigger("reset");
}

function handleClassSearch(e) {

  e.preventDefault();
  $("#meteors").empty();

  $.ajax({
    method: "GET",
    url: "https://data.nasa.gov/resource/y77d-th95.json",
    dataType: 'JSON',
    data: $(this).serialize(),
    success: handleMeteors
  });

  $(this).trigger("reset");
}

function handleMassSearch(e) {

  e.preventDefault();
  $("#meteors").empty();

  $.ajax({
    method: "GET",
    url: "https://data.nasa.gov/resource/y77d-th95.json",
    dataType: 'JSON',
    data: $(this).serialize(),
    success: handleMeteors
  });

  $(this).trigger("reset");
}

function handleYearSearch(e) {

  e.preventDefault();
  $("#meteors").empty();

  $.ajax({
    method: "GET",
    url: "https://data.nasa.gov/resource/y77d-th95.json",
    dataType: 'JSON',
    data: $(this).serialize() + "-01",
    success: handleMeteors
  });

  $(this).trigger("reset");
}

function renderMeteor(meteor) {
  var html = meteorTemplate(meteor);
  $('#meteors').prepend(html);
}
