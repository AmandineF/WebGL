define( ["three", "scene"], function ( THREE, scene ) {



        
  // // create a point light
  var pointLight = new THREE.PointLight(0xFCFFDF);

  // set its position
  pointLight.position.x = -1000;
  pointLight.position.y = 0;
  pointLight.position.z = 1000;
  pointLight.intensity = 3;
  pointLight.distance = 2000;
  //add to the scene
  scene.add(pointLight);
    
  // add a spot light
  // this is important for casting shadows
  var spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
 //   scene.add(spotLight);
  
  // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC

  var light = new THREE.DirectionalLight( 0xffffff );
  //var light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2, 1 );
  light.position.set( 25, -20, 100 );
  light.target.position.set( 0, 0, 0 );
  light.castShadow = true;
  light.shadowCameraNear = 10;
  light.shadowCameraFar = 90;
  light.shadowCameraFov = 65;
  light.shadowBias = 0.001;
  light.shadowDarkness = 0.6;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 2048;
  scene.add( light );
  return light;
} );
