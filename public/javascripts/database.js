console.log("sanity check is working!!!!");

var meteorHtml;
var meteorTemplate;

var dataCSV = [];

$(document).ready(function() {

  meteorHtml = $('#meteor-template').html();
  meteorTemplate = Handlebars.compile(meteorHtml);

  $('#search-forms').css('display', 'none');

  //added slideToggle to new recipe form
  $('#form-toggle').click(function(e){
    e.preventDefault();

    $('#search-forms').slideToggle('slow');
  })

  $('#form-cancel').click(function(e){
    e.preventDefault();

    $('#search-forms').slideToggle('slow');
  })


  $.ajax({
    url: "https://data.nasa.gov/resource/y77d-th95.json",
    type: "GET",
    data: {
      "$limit" : 100,
      "$$app_token" : "MkppVWDs5NEBZihs6wrZOO1vG"
    }
  }).done(function (data) {
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


  $('#export-csv').on('click', function(e){
    e.preventDefault();
    handleExportCSV({ filename: "meteorite-data.csv" })
  });

});

function handleMeteors(meteors){
  dataCSV = meteors;

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

function handleExportCSV(args) {
  console.log("here");

  var data, filename, link;
  var csv = convertArrayOfObjectsToCSV({
      data: dataCSV
  });

  if (csv == null) return;

  filename = 'meteorite-data.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

function convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
      return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr++;
      });
      result += lineDelimiter;
  });

  return result;
}
