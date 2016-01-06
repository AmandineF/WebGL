
// --------------------------------------------- //
// ------- 			TP PARTIE 1		   --------- //
// --------------------------------------------- //


// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //

// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// field variables
var fieldWidth = 400, fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;


var planeWidth, planeHeight, planeDepth, planeQuality;

// ball variables
var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// ------------------------------------- //
// ------- GAME FUNCTIONS -------------- //
// ------------------------------------- //

function setup()
{
	createScene();
	
	draw();
}

function createScene()
{
	createCamera();
	createObjects();

}


function createCamera(){
		// set the scene size

	var WIDTH = window.innerWidth,
	  HEIGHT = window.innerHeight;

	// set some camera attributes
	var VIEW_ANGLE = 60,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 10,
	  FAR = 1000;

	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	// add the camera to the scene
	scene.add(camera);
	
	//position en hauteur pour le moment 
	camera.position.z = 300;
	camera.rotation.x = -50

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);
}
	


	
function createObjects(){
	// set up the playing surface plane 
	 planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;

	createPlane();
	createLights();

	createPaddles();
	createTable();
	createTennisBall();
}

function createPlane()
{	
	THREE.ImageUtils.crossOrigin = '';
	var texture1 = THREE.ImageUtils.loadTexture( '../images/fond_tennis.png' );
	var planeMaterial =
	  new THREE.MeshLambertMaterial({
		  map: texture1
		});


	// create the playing surface plane
	var plane = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		planeHeight,
		planeQuality,
		planeQuality),

	  planeMaterial);
	  
	scene.add(plane);
	plane.receiveShadow = true;	
}	

function createPaddles(){
	// create the paddle1's material
	var paddle1Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x0000ff
		});
	// create the paddle2's material
	var paddle2Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xff0000
		});

	  	// // set up the paddle vars
	paddleWidth = 10;
	paddleHeight = 30;
	paddleDepth = 10;
	paddleQuality = 1;
		
	paddle1 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle1Material);

	// // add the sphere to the scene
	scene.add(paddle1);
	paddle1.receiveShadow = true;
    paddle1.castShadow = true;
	
	paddle2 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle2Material);
	  
	// // add the sphere to the scene
	scene.add(paddle2);
	paddle2.receiveShadow = true;
    paddle2.castShadow = true;	
	
	// set paddles on each side of the table
	paddle1.position.x = -fieldWidth/2 + paddleWidth;
	paddle2.position.x = fieldWidth/2 - paddleWidth;
	
	// lift paddles over playing surface
	paddle1.position.z = paddleDepth;
	paddle2.position.z = paddleDepth;
}


function createTable(){

	// create the table's material
	var tableMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x111111
		});

	var table = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 1.1,	// this creates the feel of a billiards table, with a lining
		planeHeight * 1.1,	// an arbitrary depth, the camera can't see much of it anyway
		planeQuality,
		planeQuality),

	  tableMaterial);
	table.position.z = -2;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
	scene.add(table);
	table.receiveShadow = true;	
}


function createTennisBall(){

	// // set up the sphere vars
	// lower 'segment' and 'ring' values will increase performance
	var radius = 5,
		segments = 6,
		rings = 6;
		
	// // create the sphere's material
	var texture2 = THREE.ImageUtils.loadTexture( '../images/tennisBall.jpg' );
	var sphereMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  map: texture2
		});
		
	// Create a ball with sphere geometry
	ball = new THREE.Mesh(

	  new THREE.SphereGeometry(
		radius,
		segments,
		rings),

	  sphereMaterial);

	// // add the sphere to the scene
	scene.add(ball);
	
	ball.position.x = 0;
	ball.position.y = 0;
	// set ball above the table surface
	ball.position.z = radius;
	ball.receiveShadow = true;
    ball.castShadow = true;
}
	
function createLights(){



				
	// // create a point light
	pointLight =
	  new THREE.PointLight(0xF8D898);

	// set its position
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 1.9;
	pointLight.distance = 10000;
	//add to the scene
	scene.add(pointLight);
		
	// add a spot light
	// this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
	
	// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
	renderer.shadowMapEnabled = true;		
}


function draw()
{	
	// draw THREE.JS scene
	renderer.render(scene, camera);
	// loop draw function call
	requestAnimationFrame(draw);
	//cameraPhysics();
}

