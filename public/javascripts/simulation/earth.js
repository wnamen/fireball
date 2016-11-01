
(function () {

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
		// rotation = 6;

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
	// sphere.rotation.y = rotation;
	scene.add(sphere)

    var clouds = createClouds(radius, segments);
	// clouds.rotation.y = rotation;
	scene.add(clouds)

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		// sphere.rotation.y += 0.0005;
		// clouds.rotation.y += 0.0005;
		// points.rotation.y += 0.0005;
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
				transparent: true
			})
		);
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('../images/galaxy_starfield.png'),
				side: THREE.BackSide
			})
		);
	}

	// function createPoint(radius, segments, data) {
	//
		// var x = parseInt(data[0][0])+180;
		// var y = parseInt((data[0][1])-84)*-1;
		//
		// var position = latLongToVector3(y, x, 600, 2);
	//
	// 	var cubeGeometry = new THREE.CubeGeometry(60,60,60);
	// 	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xffff00 });
	// 	var cube = new THREE.Mesh( cubeGeometry, cubeMaterial);
	//
	// 	cube.position = position;
	// 	cube.lookAt( new THREE.Vector3(0,0,0) );
	// 	cube.name = 'cube';
	//
	// 	new THREE.Mesh(
	// 		new THREE.SphereGeometry(radius, segments, segments),
	// 			new THREE.MeshFaceMaterial( cube ));
	//
	// 	scene.add(cube);
	// }
	//
	function latLongToVector3(lat, lon, radius, heigth) {
			var phi = (lat)*Math.PI/180;
			var theta = (lon-180)*Math.PI/180;

			// console.log(phi);
			// console.log(theta);

			var x = -(radius+heigth) * Math.cos(phi) * Math.cos(theta);
			var y = (radius+heigth) * Math.sin(phi);
			var z = (radius+heigth) * Math.cos(phi) * Math.sin(theta);

			return new THREE.Vector3(x,y,z);
	}


	// simple function that converts the density data to the markers on screen
	// the height of each marker is relative to the density.
	function createPoint(radius, segments, data) {
			// console.log(data)
	// 		// the geometry that will contain all our cubes
			var geom = new THREE.Geometry();
	// 		// material to use for each of our elements. Could use a set of materials to
	// 		// add colors relative to the density. Not done here.
			// var cubeMat = new THREE.MeshLambertMaterial({color: 0x000000,opacity:0.6, emissive:0xffffff});
	// 		// for (var i = 0 ; i < data.length-1 ; i++) {
	//
	// 				//get the data, and set the offset, we need to do this since the x,y coordinates
	// 				//from the data aren't in the correct format
					var x = parseInt(data[0])+180;
					var y = parseInt((data[1])-84)*-1;

					// console.log(data[0][0]);
	//
	// 				// calculate the position where we need to start the cube
					var position = latLongToVector3(y, x, 0, .5);
					// console.log(position);

	// 				// create the cube
					var cubeGeometry = new THREE.CubeGeometry(.01,.01,.01);
					var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xBC7A20 });
					var cube = new THREE.Mesh( cubeGeometry, cubeMaterial);
	//
	// 				// position the cube correctly
					cube.position = position;
					cube.lookAt( new THREE.Vector3(0,0,0) );
					cube.name = 'cube';
					// cube.rotation.y = 6;

	//
	// 				// merge with main model
					// THREE.GeometryUtils.merge(geom,cube);
	// 		// }
	//
	// 		// create a new mesh, containing all the other meshes.
			// var total = new THREE.Mesh(geom,new THREE.MeshFaceMaterial());
	// 		console.log(cube);
	// 		// and add the total mesh to the scene
			scene.add(cube);
	}


		$.ajax({
			url: "https://data.nasa.gov/resource/y77d-th95.json",
			type: "GET",
			data: {
				"$limit" : 1000,
				"$$app_token" : "MkppVWDs5NEBZihs6wrZOO1vG"
			}
		}).done(function (data) {
			console.log(data.length);
			data.forEach(function (point) {
				if (point.geolocation !== undefined) {
					createPoint(radius, segments, point.geolocation.coordinates)
				}
			});
		});

}());
