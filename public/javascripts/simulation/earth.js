var dataCSV = [];

(function () {

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

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width  = window.innerWidth,
			height = window.innerHeight;

	// Earth params
	var radius   = .5,
			segments = 32;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position = camera.position;
	scene.add(light);

  var sphere = createSphere(radius, segments);
	scene.add(sphere)

  var clouds = createClouds(radius, segments);
	scene.add(clouds)

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('../images/2_no_clouds_4k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('../images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				name: "permanent",
				specularMap: THREE.ImageUtils.loadTexture('../images/water_4k.png'),
				specular:    new THREE.Color('grey')
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('../images/fair_clouds_4k.png'),
				name: "permanent",
				transparent: true
			})
		);
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('../images/galaxy_starfield.png'),
				name: "permanent",
				side: THREE.BackSide
			})
		);
	}

	function latLongToVector3(lat, lon, radius, heigth) {
		var phi = (lat)*Math.PI/180;
		var theta = (lon-180)*Math.PI/180;

		var x = -(radius+heigth) * Math.cos(phi) * Math.cos(theta);
		var y = (radius+heigth) * Math.sin(phi);
		var z = (radius+heigth) * Math.cos(phi) * Math.sin(theta);

		return new THREE.Vector3(x,y,z);
	}


	// simple function that converts the density data to the markers on screen
	// the height of each marker is relative to the density.
	function createPoint(radius, segments, data) {

		//get the data, and set the offset, we need to do this since the x,y coordinates
		//from the data aren't in the correct format
		var x = parseInt(data[0]);
		var y = parseInt(data[1]);

		// calculate the position where we need to start the cube
		var position = latLongToVector3(x, y, 0, .5);

		// create the point
		var pointGeometry = new THREE.SphereGeometry(.005,.005,.005);
		var pointMaterial = new THREE.MeshPhongMaterial( { color: 0x771E10 });
		var point = new THREE.Mesh( pointGeometry, pointMaterial);

		// position the point correctly
		point.position = position;
		point.lookAt( new THREE.Vector3(0,0,0) );
		point.name = 'point';

		// and add the point to the scene
		scene.add(point);
	}


	$.ajax({
		url: "https://data.nasa.gov/resource/y77d-th95.json",
		type: "GET",
		data: {
			"$limit" : 500,
			"$$app_token" : "MkppVWDs5NEBZihs6wrZOO1vG"
		}
	}).done(function (data) {
		console.log(data);
		dataCSV = data;

		data.forEach(function (point) {
			var coord = [point.reclat, point.reclong]
			createPoint(radius, segments, coord);
		});

		console.log(scene.children);
		console.log(scene.children.length);

	});

	function handleNameSearch(e) {

	  e.preventDefault();
		removePoints();

	  $.ajax({
	    method: "GET",
	    url: "https://data.nasa.gov/resource/y77d-th95.json",
	    dataType: 'JSON',
	    data: $(this).serialize().slice(0,5) + $(this).serialize().charAt(5).toUpperCase() + $(this).serialize().slice(6),
		}).done(function (data) {

			console.log(data);
			dataCSV = data;

			data.forEach(function (point) {
				var coord = [point.reclat, point.reclong]
				createPoint(radius, segments, coord);
			});
		})

	  $(this).trigger("reset");
	}

	function handleIdSearch(e) {

	  e.preventDefault();

	  $.ajax({
	    method: "GET",
	    url: "https://data.nasa.gov/resource/y77d-th95.json",
	    dataType: 'JSON',
	    data: $(this).serialize(),
		}).done(function (data) {

			console.log(data);
			dataCSV = data;

			removePoints();

			data.forEach(function (point) {
				var coord = [point.reclat, point.reclong]
				createPoint(radius, segments, coord);
			});
		})

	  $(this).trigger("reset");
	}

	function handleClassSearch(e) {

		e.preventDefault();

	  $.ajax({
	    method: "GET",
	    url: "https://data.nasa.gov/resource/y77d-th95.json",
	    dataType: 'JSON',
	    data: $(this).serialize(),
		}).done(function (data) {

			console.log(data);
			dataCSV = data;

			removePoints();

			data.forEach(function (point) {
				var coord = [point.reclat, point.reclong]
				createPoint(radius, segments, coord);
			});
		})

	  $(this).trigger("reset");
	}

	function handleMassSearch(e) {

	  e.preventDefault();

	  $.ajax({
	    method: "GET",
	    url: "https://data.nasa.gov/resource/y77d-th95.json",
	    dataType: 'JSON',
	    data: $(this).serialize(),
		}).done(function (data) {

			console.log(data);
			dataCSV = data;

			removePoints();

			data.forEach(function (point) {
				var coord = [point.reclat, point.reclong]
				createPoint(radius, segments, coord);
			});
		})

	  $(this).trigger("reset");
	}

	function handleYearSearch(e) {

	  e.preventDefault();

	  $.ajax({
	    method: "GET",
	    url: "https://data.nasa.gov/resource/y77d-th95.json",
	    dataType: 'JSON',
	    data: $(this).serialize() + "-01"
	  }).done(function (data) {

			console.log(data);
			dataCSV = data;

			removePoints();

			data.forEach(function (point) {
				var coord = [point.reclat, point.reclong]
				createPoint(radius, segments, coord);
			});
		});


	  $(this).trigger("reset");
	}

	function removePoints() {
		for (var i = 0; i < scene.children.length; i++) {
			var child = scene.children[i];
				if (child.name === "point") {
					scene.remove(child);
					i--
				}
		}
	}

}());

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
