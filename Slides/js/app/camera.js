define( ["three"], function ( THREE ) {
	var WIDTH = window.innerWidth,
	  HEIGHT = window.innerHeight;

	// set some camera attributes
	var VIEW_ANGLE = 60,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 10,
	  FAR = 1000;
 // var camera = new THREE.PerspectiveCamera( 70, 1, 0.1, 500 );

  var camera = new THREE.PerspectiveCamera( VIEW_ANGLE,ASPECT,NEAR,FAR );
  camera.position.z = 300;
  camera.up = new THREE.Vector3( 0, 0, 1 );
  
  camera.orbitObject = null;

  return camera;
} );
