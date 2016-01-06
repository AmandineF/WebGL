define( ["three", "camera", "container", "controls", "geometry", "light", "material", "renderer", "scene", "models", "gameLogic"],
function ( THREE, camera, container, controls, geometry, light, material, renderer, scene, models, gameLogic ) {

var tp = {

    bearing: 0.3 * Math.PI,
    clock: new THREE.Clock( true ),
    mouse: { x: 300, y: 200 },
    init: function () {
        //rendering camera
        tp.clock.start();
        tp.savedObj = [];
        tp.rotateObj = false;
        tp.rotateCamera = false;

        tp.scene = scene;
        //general field width
        tp.fieldWidth = 400,tp.fieldHeight = 200;
        tp.planeWidth = tp.fieldWidth, tp.planeHeight = tp.fieldHeight, tp.planeQuality = 10;
        tp.translation = false;

        //part 1
        tp.cube = null;
        tp.ball = null;
        tp.raquette = null;

        //part 2
        tp.paddle = null;
        tp.paddle2 = null;
        tp.sphere = null;
        tp.rond = null;
        tp.circle = null;
        tp.cylindre = null;
        tp.plane = null;
        tp.cube2 = null;

        //tppart2
        tp.plane = null;
        tp.paddleTP = null;
        tp.paddleTP2 = null;
        tp.sphereTP = null;

        //part3
        tp.boundingBall = null;

        //part4
        tp.loadTextureCubeBricks = null;
        tp.loadTextureCubeCrate = null;

        //part4UVMapping
        tp.loadCubeTexture = null;
       // document.addEventListener( 'mousedown', tp.onDocumentMouseDown, false );


    },

    // onDocumentMouseDown: function(event){
    //     console.log("event");
    //               var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    //     var mv = new THREE.Vector3(
    //         (event.clientX / window.innerWidth) * 2 - 1,
    //         -(event.clientY / window.innerHeight) * 2 + 1,
    //         0.5 );
    //     camera.rotation.x -= mv.x*0.1;
    //             camera.rotation.y += mv.y*0.1;


       
    //     console.log("x: " + mv.x + ", y: " + mv.y);
    // },


    reset: function(){
        
        for( var i = scene.children.length - 1; i >= 3; i--) {
                scene.remove(scene.children[i]);

         }
       

        tp.savedObj = [];
        tp.rotateObj = false;
        tp.lightMove = true;
        tp.rotateCamera = false;
        tp.translation = false;
        tp.playGame = false;

    },

    part1 :  {
  

        ball : function(){
            var geometry = new THREE.SphereGeometry(50, 64, 64); // Radius size, number of vertical segments, number of horizontal rings.
            var sphere = new THREE.Mesh(geometry, material.tennisBall); // Create a mesh based on the specified geometry (cube) and material (blue skin).
            sphere.position.x = -100;
            sphere.position.y = -80;
            tp.ball = sphere;
            scene.add(tp.ball);
            tp.rotateCamera = true;
        },

        renderBall : function (){
           tp.ball.position.x +=1;
        },

        cube : function(){
            tp.cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
            scene.add(tp.cube);
            tp.cube.receiveShadow = true;
            tp.cube.name = "cube";
            tp.savedObj.push(tp.cube);
            tp.rotateObj = true;
            tp.cube.position.z = -40;
        },
        cubeTp : function(){
           this.cube();
           tp.rotateObj = false ;
           tp.cube.rotation.y = 20;
            tp.cube.rotation.z = 10;
        }


    },

    part2: {
        circle : function(){
            tp.circle = new THREE.Mesh(new THREE.CircleGeometry(80,32), new THREE.MeshPhongMaterial({
                    color: 0xFE2EF7,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                }));
            tp.circle.position.x = -100;
            scene.add(tp.circle);
            tp.savedObj.push(tp.circle);
            tp.rotateObj = true;
            
        },
        rond : function(){
            tp.rond = new THREE.Mesh(new THREE.SphereGeometry(60,8,6),new THREE.MeshPhongMaterial({
                    color: 0x156289,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                }));
            scene.add(tp.rond);
            tp.rond.position.x = 100;
            tp.savedObj.push(tp.rond);
            tp.rotateObj = true;
           
        },
        cylindre : function(){
            tp.cylindre = new THREE.Mesh(new THREE.CylinderGeometry(50,50,100,100),new THREE.MeshPhongMaterial({
                    color: 0xFF8000,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                }));
            scene.add(tp.cylindre);
            tp.cylindre.position.x = -100;
            tp.savedObj.push(tp.cylindre);
            tp.rotateObj = true;
            
        },
        cube2 : function(){
            tp.cube2 = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100, 5, 5, 5),new THREE.MeshPhongMaterial({
                    color: 0xFF0000,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                }));
            scene.add(tp.cube2);
            tp.cube2.position.x = 100;
            tp.savedObj.push(tp.cube2);
            tp.rotateObj = true;
            
        },
        plane : function(){
            tp.plane = new THREE.Mesh(new THREE.PlaneGeometry(180, 160, 32),new THREE.MeshPhongMaterial({
                    color: 0x01DF01,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                }));
            scene.add(tp.plane);
            tp.plane.position.x = -100;
            tp.savedObj.push(tp.plane);
            tp.rotateObj = true;
            
        },
        texte : function(){
            var geometry =new THREE.RingGeometry(50, 80, 60);
            var material = new THREE.MeshPhongMaterial({
                    color: 0x156289,
                    emissive: 0x072534,
                    side: THREE.DoubleSide,
                    shading: THREE.FlatShading
                });
            tp.texte = new THREE.Mesh( geometry, material );
            scene.add(tp.texte);
            tp.texte.position.x = 100;
            tp.savedObj.push(tp.texte);
            tp.rotateObj = true;
            
        },

        sphere : function(){
            var geometry = new THREE.SphereGeometry(50, 64, 64); 
            var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
            tp.sphere = new THREE.Mesh(geometry,sphereMaterial);
            scene.add(tp.sphere);
            tp.sphere.receiveShadow = true;
            tp.savedObj.push(tp.sphere);
            tp.rotateObj = true;
        },

        paddle : function(){
            tp.paddle = new THREE.Mesh(new THREE.CubeGeometry(100, 50, 10, 5, 5, 5), new THREE.MeshNormalMaterial());
            scene.add(tp.paddle);
            tp.paddle.receiveShadow = true;
            tp.paddle.position.x = 100;
            tp.paddle.position.y = 0;
            tp.savedObj.push(tp.paddle);
            tp.rotateObj = true;
            tp.rotateCamera = false;
        },

        paddle2 : function(){
            tp.paddle2 = new THREE.Mesh(new THREE.CubeGeometry(100, 50, 10, 10, 10, 10), new THREE.MeshNormalMaterial());
            scene.add(tp.paddle2);
            tp.paddle2.receiveShadow = true;
            tp.paddle2.position.x = -100;
            tp.paddle2.position.y = 0;
            tp.savedObj.push(tp.paddle2);
            tp.rotateObj = true;
            tp.rotateCamera = false;
        }
    },

    tp_part2 : {
      plane : function(){
            var planeMaterial = new THREE.MeshLambertMaterial({color: 0xFF8000});
            tp.plane = new THREE.Mesh(
            
               new THREE.PlaneGeometry(
                   tp.planeWidth * 0.95, 
                   tp.planeHeight,
                   tp.planeQuality,
                   tp.planeQuality),
            
               planeMaterial);
            tp.plane.receiveShadow = true;
            tp.plane.position.x = -20;
            scene.add(tp.plane);
        },
        paddleTP : function(){
            var paddle1Material = new THREE.MeshLambertMaterial({color: 0xFE2E2E});
            tp.paddleTP = new THREE.Mesh(new THREE.CubeGeometry(10, 50, 10, 1, 1, 1), paddle1Material);
            scene.add(tp.paddleTP);
            tp.paddleTP.receiveShadow = true;
            tp.paddleTP.position.x = -200;
            tp.paddleTP.position.z = 10;
            tp.rotateObj = true;
            tp.rotateCamera = false;
        },

        paddleTP2 : function(){
            var paddle2Material = new THREE.MeshLambertMaterial({color: 0x2E2EFE});
            tp.paddleTP2 = new THREE.Mesh(new THREE.CubeGeometry(10, 50, 10, 1, 1, 1), new THREE.MeshNormalMaterial());
            scene.add(tp.paddleTP2);
            tp.paddleTP2.receiveShadow = true;
            tp.paddleTP2.position.x = 160;
            tp.paddleTP2.position.z = 10;
            tp.rotateObj = true;
            tp.rotateCamera = false;
        },
        sphereTP : function(){
            var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x2E2E2E});
            tp.sphereTP = new THREE.Mesh(new THREE.SphereGeometry(5, 6, 6), sphereMaterial); 
            scene.add(tp.sphereTP);
            tp.sphereTP.receiveShadow = true;
            tp.sphereTP.x = 0;
            tp.rotateObj = true;
            tp.rotateCamera = false;
        }

    },
    part3 : {
        boundingBall : function(){
            tp.boundingBall = new THREE.Mesh(new THREE.SphereGeometry(50, 64, 64),material.tennisBall);
            scene.add(tp.boundingBall);
            tp.boundingBall.receiveShadow = true;
            tp.savedObj.push(tp.boundingBall);
            tp.rotateObj = true;
            tp.rotateCamera = false;
            tp.translation = true;
            tp.moveH = true;
        },

        animatedScene : function(){
            tp.tp_part2.plane();
            tp.tp_part2.sphereTP();
            tp.tp_part2.paddleTP2();
            tp.tp_part2.paddleTP();
            gameLogic.init(0, 100, tp.fieldWidth,tp.fieldHeight);

            tp.playGame = true;
            
        }
    },

    part4 : {
        loadTP4: function(){
            tp.part3.animatedScene();
            tp.sphereTP.material = material.tennisBall;
            tp.plane.material = material.tennisFond;
        },
        loadTextureCubeBricks : function(){
            tp.loadTextureCubeBricks = new THREE.Mesh(new THREE.CubeGeometry(90,90,90), material.cubeTextureBricks);
            scene.add(tp.loadTextureCubeBricks);
            tp.loadTextureCubeBricks.receiveShadow = true;
            tp.loadTextureCubeBricks.position.x = 100;
            tp.loadTextureCubeBricks.position.y = 0;
            tp.savedObj.push(tp.loadTextureCubeBricks);
            tp.rotateObj = true;
            tp.rotateCamera = false;
        },
        loadTextureCubeCrate : function(){
            tp.loadTextureCubeCrate = new THREE.Mesh(new THREE.CubeGeometry(90,90,90), material.cubeTextureCrate);
            scene.add(tp.loadTextureCubeCrate);
            tp.loadTextureCubeCrate.receiveShadow = true;
            tp.loadTextureCubeCrate.position.x = -100;
            tp.loadTextureCubeCrate.position.y = 0;
            tp.savedObj.push(tp.loadTextureCubeCrate);
            tp.rotateObj = true;
            tp.rotateCamera = false;
        }
    },

    part4ExMapping:{
        loadCubeTexture:function(){
            tp.loadCubeTexture = new THREE.Mesh(new THREE.SphereGeometry(100,100,100), material.cubeTexture);
            scene.add(tp.loadCubeTexture);
            tp.loadCubeTexture.receiveShadow = true;
            tp.loadCubeTexture.position.x = 0;
            tp.loadCubeTexture.position.y = 0;
            tp.savedObj.push(tp.loadCubeTexture);
            //tp.rotateObj = true;
            //tp.rotateCamera = true;
            //camera.lookAt(tp.loadCubeTexture.position);

        }

    },

    animate: function () {
      window.requestAnimationFrame( tp.animate );
      tp.draw();
    },

    moveObject : function(object){
        object.rotation.x += 0.005;
        object.rotation.y += 0.01;

        if(tp.translation) {
            if(tp.moveH){
                object.position.y +=1;
            }
            if(object.position.y == 90){
                tp.moveH = false;
            }
            if(!tp.moveH){
                object.position.y -=2;
            }
            if(object.position.y == -90){
                tp.moveH = true;
            }
        }
    },


    lightMove: false,

    //TODO see what this does
    draw: function () {
        if(tp.ball){
            tp.part1.renderBall();
        }
        if(tp.playGame){
            gameLogic.ballPhysics(tp.sphereTP);
            gameLogic.logic(tp.paddleTP, tp.paddleTP2, tp.sphereTP);
        }
      //controls.update();

      // Calculate where camera should move to and smoothly pan
      var camPosition = new THREE.Vector3(
        - 0.1 * tp.mouse.y,
        - 0.1 * tp.mouse.x,
        10 + 0.07 * Math.abs( tp.mouse.y )
      );


        //see what this does
        //console.log(camPosition)
        //à supprimer
      if ( tp.rotateCamera ) 
      {

      
        // camera.rotation.x += 0.0251;
        // camera.rotation.y += 0.003;
        camera.position.z -= 0.01;
     
        // var t = 0.25 * tp.clock.getElapsedTime();
        // var r = 15.0 + 12.0 * Math.cos( 0.3 * t );
        // if ( camera.orbitDist ) {
        //   r = camera.orbitDist;
        // } else if ( camera.orbitObject ) {
        //   r = 1.5 * camera.orbitObject.geometry.boundingSphere.radius;
        // }
        // camPosition = new THREE.Vector3(
        //     r * Math.sin( t ),
        //     r * Math.cos( t ),
        //     camera.orbitObject ? 0.4 * r : ( 12.0 + 9.0 * Math.cos( 1.3 * t ) )
        //     );
        // if ( camera.orbitObject ) {
        //   camPosition.add( camera.orbitObject.position );
        // }

        //   camera.position.x += ( camPosition.x - camera.position.x ) * 0.05;
        //   camera.position.y += ( camPosition.y - camera.position.y ) * 0.05;

      }


        if(tp.rotateObj) {
          for (index = 0; index < tp.savedObj.length; index++) {
              tp.moveObject(tp.savedObj[index]);
          } 
        }


      var time = 0.7 * tp.clock.getElapsedTime() ;
      var lightMovement = tp.lightMove ? 10 : 1;
      light.position.y = lightMovement * 3 * Math.sin ( 0.71 * time );
      light.position.x = lightMovement * Math.cos ( 1.21 * time );
      light.position.x = 30 - lightMovement * 3 * Math.cos ( 1.21 * time );

     
      renderer.render( scene, camera );
    }

  }
    return tp;
} );


