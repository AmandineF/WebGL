// --------------------------------------------- //
// ------- 			TP WebGL		   --------- //
// --------------------------------------------- //

// ------------------------------------- //
// ------- GLOBAL VARIABLES ------------ //
// ------------------------------------- //

//Scene object variables
var renderer, scene, camera, pointLight, spotLight;

//Field variables
var fieldWidth = 400, fieldHeight = 200;

//Paddle variables
var paddle1, paddle2, paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

//Plane variables
var plane, planeWidth=fieldWidth, planeHeight=fieldHeight, planeDepth, planeQuality=10;

//Table variables
var table;

//Ball variables
var ball, ballDirX = 1, ballDirY = 1, ballSpeed = 2;

//Game-related variables
var score1 = 0, score2 = 0, maxScore = 10, difficulty = 0.2;

// ------------------------------------- //
// --------------- SETUP --------------- //
// ------------------------------------- //
function setup(){
	document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
	miseEnPlace();
	modeles3D();
	score1 = 0;
	score2 = 0;
	draw();
}

// ------------------------------------- //
// --------------- PART 1 -------------- //
// ------------------------------------- //
function miseEnPlace(){
	//Scene variables
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

	//Camera variables
	var VIEW_ANGLE = 90, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

	//Create the scene
	scene = new THREE.Scene();

	//Create a WebGL renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);

	//Create the camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);

	//Attach the render-supplied DOM element
	var c = document.getElementById("gameCanvas");
	c.appendChild(renderer.domElement);

	//Create a point light
	pointLight = new THREE.PointLight(0xF8D898);
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 1.9;
	pointLight.distance = 10000;
	scene.add(pointLight);
		
	//Add a spot light
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
	
	//MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
	renderer.shadowMapEnabled = true;
}
function draw(){	
	//Draw THREE.JS scene
	renderer.render(scene, camera);

	//Loop draw function call
	requestAnimationFrame(draw);

	ballPhysics();
	paddlePhysics();
	cameraPhysics();
	paddle1Movement();
	paddle2Movement();
}

function cameraPhysics(){
	spotLight.position.x = ball.position.x * 2;
	spotLight.position.y = ball.position.y * 2;
	camera.position.x = 0;
	camera.position.y =-200;
	camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
	camera.rotation.x = 0.8;
}

// ------------------------------------- //
// --------------- PART 2 -------------- //
// ------------------------------------- //
/*
function modeles3D(){
	createPlane();
	createTable();
	createPaddles();
	createBall();
}

function createPlane(){	
	THREE.ImageUtils.crossOrigin = '';
	var texture1 = THREE.ImageUtils.loadTexture( '../images/fond_tennis.png' );
	var planeMaterial = new THREE.MeshLambertMaterial({map:texture1});
	plane = new THREE.Mesh(new THREE.PlaneGeometry(planeWidth * 0.95, planeHeight, planeQuality, planeQuality), planeMaterial);	  
	scene.add(plane);
	plane.receiveShadow = true;	
}	

function createPaddles(){
	var paddle1Material = new THREE.MeshLambertMaterial({color: 0x0000ff});
	var paddle2Material = new THREE.MeshLambertMaterial({color: 0xff0000});

	paddleWidth = 10;
	paddleHeight = 30;
	paddleDepth = 10;
	paddleQuality = 1;
		
	paddle1 = new THREE.Mesh(new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality), paddle1Material);

	scene.add(paddle1);
	paddle1.receiveShadow = true;
    paddle1.castShadow = true;
	
	paddle2 = new THREE.Mesh(new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality), paddle2Material);
	
	scene.add(paddle2);
	paddle2.receiveShadow = true;
    paddle2.castShadow = true;	
	
	paddle1.position.x = -fieldWidth/2 + paddleWidth;
	paddle2.position.x = fieldWidth/2 - paddleWidth;
	
	paddle1.position.z = paddleDepth;
	paddle2.position.z = paddleDepth;
}

function createTable(){
	var tableMaterial = new THREE.MeshLambertMaterial({color: 0x111111});

	table = new THREE.Mesh(new THREE.PlaneGeometry(
		planeWidth * 1.1,
		planeHeight * 1.1,
		planeQuality,
		planeQuality), tableMaterial);

	table.position.z = -2;
	scene.add(table);
	table.receiveShadow = true;	
}

function createBall(){

	var radius = 5, segments = 6, rings = 6;
		
	var texture2 = THREE.ImageUtils.loadTexture( '../images/tennisBall.jpg' );
	var sphereMaterial = new THREE.MeshLambertMaterial({map: texture2});
	ball = new THREE.Mesh(new THREE.SphereGeometry(radius,segments,rings), sphereMaterial);
	scene.add(ball);
	
	ball.position.x = 0;
	ball.position.y = 0;
	ball.position.z = radius;
	ball.receiveShadow = true;
    ball.castShadow = true;
}


// ------------------------------------- //
// --------------- PART 3 -------------- //
// ------------------------------------- //
function draw(){	
	//Draw THREE.JS scene
	renderer.render(scene, camera);

	//Loop draw function call
	requestAnimationFrame(draw);

	ballPhysics();
	paddlePhysics();
	cameraPhysics();
	paddle1Movement();
	paddle2Movement();
}

function cameraPhysics(){
	spotLight.position.x = ball.position.x * 2;
	spotLight.position.y = ball.position.y * 2;
	camera.position.x = 0;
	camera.position.y =-200;
	camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
	camera.rotation.x = 0.8;
}

function ballPhysics()
{
	// if ball goes off the 'left' side (Player's side)
	if (ball.position.x <= -fieldWidth/2)
	{	
		// CPU scores
		score2++;
		// update scoreboard HTML
		document.getElementById("scores").innerHTML = score1 + "-" + score2;
		// reset ball to center
		resetBall(2);
		matchScoreCheck();	
	}
	
	// if ball goes off the 'right' side (CPU's side)
	if (ball.position.x >= fieldWidth/2)
	{	
		// Player scores
		score1++;
		// update scoreboard HTML
		document.getElementById("scores").innerHTML = score1 + "-" + score2;
		// reset ball to center
		resetBall(1);
		matchScoreCheck();	
	}
	
	// if ball goes off the top side (side of table)
	if (ball.position.y <= -fieldHeight/2)
	{
		ballDirY = -ballDirY;
	}	
	// if ball goes off the bottom side (side of table)
	if (ball.position.y >= fieldHeight/2)
	{
		ballDirY = -ballDirY;
	}
	
	// update ball position over time
	ball.position.x += ballDirX * ballSpeed;
	ball.position.y += ballDirY * ballSpeed;
	
	// limit ball's y-speed to 2x the x-speed
	// this is so the ball doesn't speed from left to right super fast
	// keeps game playable for humans
	if (ballDirY > ballSpeed * 2)
	{
		ballDirY = ballSpeed * 2;
	}
	else if (ballDirY < -ballSpeed * 2)
	{
		ballDirY = -ballSpeed * 2;
	}
}

//Handles Player 1 paddle movement
function paddle1Movement()
{
	//Move left
	if (Key.isDown(Key.UP))		
	{
		//If paddle is not touching the side of table, we move
		if (paddle1.position.y < fieldHeight * 0.45) {
			paddle1DirY = paddleSpeed * 0.5;
		} else {
			paddle1DirY = 0;
		}
	}	

	//Move right
	else if (Key.isDown(Key.DOWN))
	{
		//If paddle is not touching the side of table, we move
		if (paddle1.position.y > -fieldHeight * 0.45) {
			paddle1DirY = -paddleSpeed * 0.5;
		} else {
			paddle1DirY = 0;
		}
	}

	//Else don't move paddle
	else
	{
		paddle1DirY = 0;
	}
	
	paddle1.scale.y += (1 - paddle1.scale.y) * 0.2;	
	paddle1.scale.z += (1 - paddle1.scale.z) * 0.2;	
	paddle1.position.y += paddle1DirY;
}


//Handles player 2 paddle movement
function paddle2Movement()
{
	//Move left
	if (Key.isDown(Key.A))		
	{
		//If paddle is not touching the side of table, we move
		if (paddle2.position.y < fieldHeight * 0.45)
		{
			paddle2DirY = paddleSpeed * 0.5;
		}else{
			paddle2DirY = 0;
		}
	}	

	//Move right
	else if (Key.isDown(Key.Q))
	{
		//If paddle is not touching the side of table, we move
		if (paddle2.position.y > -fieldHeight * 0.45)
		{
			paddle2DirY = -paddleSpeed * 0.5;
		} else {
			paddle2DirY = 0;
		}
	}

	//Else don't move paddle
	else
	{
		paddle2DirY = 0;
	}
	
	paddle2.scale.y += (1 - paddle2.scale.y) * 0.2;	
	paddle2.scale.z += (1 - paddle2.scale.z) * 0.2;	
	paddle2.position.y += paddle2DirY;
}

// Handles paddle collision logic
function paddlePhysics()
{
	// PLAYER PADDLE LOGIC
	
	// if ball is aligned with paddle1 on x plane
	// remember the position is the CENTER of the object
	// we only check between the front and the middle of the paddle (one-way collision)
	if (ball.position.x <= paddle1.position.x + paddleWidth
	&&  ball.position.x >= paddle1.position.x)
	{
		// and if ball is aligned with paddle1 on y plane
		if (ball.position.y <= paddle1.position.y + paddleHeight/2
		&&  ball.position.y >= paddle1.position.y - paddleHeight/2)
		{
			// and if ball is travelling towards player (-ve direction)
			if (ballDirX < 0)
			{
				// stretch the paddle to indicate a hit
				paddle1.scale.y = 5;
				// switch direction of ball travel to create bounce
				ballDirX = -ballDirX;
				// we impact ball angle when hitting it
				// this is not realistic physics, just spices up the gameplay
				// allows you to 'slice' the ball to beat the opponent
				ballDirY -= paddle1DirY * 0.7;
			}
		}
	}
	
	// OPPONENT PADDLE LOGIC	
	
	// if ball is aligned with paddle2 on x plane
	// remember the position is the CENTER of the object
	// we only check between the front and the middle of the paddle (one-way collision)
	if (ball.position.x <= paddle2.position.x + paddleWidth
	&&  ball.position.x >= paddle2.position.x)
	{
		// and if ball is aligned with paddle2 on y plane
		if (ball.position.y <= paddle2.position.y + paddleHeight/2
		&&  ball.position.y >= paddle2.position.y - paddleHeight/2)
		{
			// and if ball is travelling towards opponent (+ve direction)
			if (ballDirX > 0)
			{
				// stretch the paddle to indicate a hit
				paddle2.scale.y = 5;	
				// switch direction of ball travel to create bounce
				ballDirX = -ballDirX;
				// we impact ball angle when hitting it
				// this is not realistic physics, just spices up the gameplay
				// allows you to 'slice' the ball to beat the opponent
				ballDirY -= paddle2DirY * 0.7;
			}
		}
	}
}

function resetBall(loser)
{
	// position the ball in the center of the table
	ball.position.x = 0;
	ball.position.y = 0;
	
	// if player lost the last point, we send the ball to opponent
	if (loser == 1)
	{
		ballDirX = -1;
	}
	// else if opponent lost, we send ball to player
	else
	{
		ballDirX = 1;
	}
	
	// set the ball to move +ve in y plane (towards left from the camera)
	ballDirY = 1;
}

var bounceTime = 0;
// checks if either player or opponent has reached 7 points
function matchScoreCheck()
{
	// if player has 7 points
	if (score1 >= maxScore)
	{
		// stop the ball
		ballSpeed = 0;
		// write to the banner
		document.getElementById("scores").innerHTML = "Blue wins!";		
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
		// make paddle bounce up and down
		bounceTime++;
		paddle1.position.z = Math.sin(bounceTime * 0.1) * 10;
		// enlarge and squish paddle to emulate joy
		paddle1.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
		paddle1.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
	}
	// else if opponent has 7 points
	else if (score2 >= maxScore)
	{
		// stop the ball
		ballSpeed = 0;
		// write to the banner
		document.getElementById("scores").innerHTML = "Red wins!";
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
		// make paddle bounce up and down
		bounceTime++;
		paddle2.position.z = Math.sin(bounceTime * 0.1) * 10;
		// enlarge and squish paddle to emulate joy
		paddle2.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
		paddle2.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
	}
}*/
