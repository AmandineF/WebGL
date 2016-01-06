/*global shower*/
// Start the app
require( ['detector', 'container', 'material', 'renderer', 'tp'], function ( Detector, container, material, renderer, tp ) {
  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage();
    container.innerHTML = "";
  }

  var onHover = function() {
    renderer.setContainer( this );
  };
  tp.init();
 // tp.draw();
  var lastSlideNumber = -1;
  var rendering = false;
  var tick = function() {
    window.requestAnimationFrame( tick );
    if ( shower.isSlideMode() ) {
      var slideNumber = shower.getCurrentSlideNumber();
      if ( slideNumber !== lastSlideNumber ) {
        // Have changed slide
        lastSlideNumber = slideNumber;

        // Check for presence of threejs container in new slide
        var slideId = shower.getSlideHash( slideNumber ).slice( 1 );
        var current = document.querySelector( "[id='" + slideId + "'] .threejs-container" );
        if ( current ) {
          //render webgl
          rendering = true;
          renderer.setContainer( current );
          current.removeEventListener( 'mouseover', onHover );
          current.addEventListener( 'mouseover', onHover );
          current.removeEventListener( 'mouseout', onHover );
          current.addEventListener( 'mouseout', onHover );
        }else{
          rendering = false; 
        }
          // Reset scene
          tp.reset();


        if(current && current.getAttribute("type"))
        switch (current.getAttribute("type"))
        {
          //
          case "cube":
            tp.part1.cube();
          break;
          case "cube_tp":
            tp.part1.cubeTp();
          break;

          case "plane":
            tp.part2.plane();
          break;
          case "paddle":
            tp.part2.paddle();
            tp.part2.paddle2();
          break;
          case "sphere":
            tp.part2.sphere();
          break;
          case "tp_part2":
            tp.tp_part2.plane();
            tp.tp_part2.paddleTP();
            tp.tp_part2.paddleTP2();
            tp.tp_part2.sphereTP();
          break;
          case "part4":
            tp.part4.loadTextureCubeBricks();
            tp.part4.loadTextureCubeCrate();
          break;
          case "part4ExMapping":
            tp.part4ExMapping.loadCubeTexture();
            break;
          case "forme1":
            tp.part2.circle();
            tp.part2.rond();
          break;
           case "forme2":
            tp.part2.cylindre();
            tp.part2.cube2();
          break;
           case "forme3":
            tp.part2.plane();
            tp.part2.texte();
          break;
          case "bounding":
            tp.part3.boundingBall();
          break;
          case "tp_part3":
            tp.part3.animatedScene();
            break;
          case "tp_part4":
            tp.part4.loadTP4();
            break;
          default:
            console.log("not found");
          break;
        }


       
      }
      if ( rendering ) {
        tp.draw();
      }
    }
  };
  tick();
} );
