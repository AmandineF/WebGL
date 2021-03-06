// Configure Require.js
var require = {
  // Default load path for js files
  baseUrl: 'js/app',
  shim: {
    // --- Use shim to mix together all THREE.js subcomponents
    'threeCore': { exports: 'THREE' },
    'TrackballControls': { deps: ['threeCore'], exports: 'THREE' },
    'gentilis': { deps: ['threeCore'] },
    'gentilisBold': { deps: ['threeCore'] },
    // --- end THREE sub-components
    'detector': { exports: 'Detector' },
    'stats': { exports: 'Stats' },
    'tween': {exports : 'tween'}
  },
  // Third party code lives in js/lib
  paths: {
    // --- start THREE sub-components
    three: '../lib/three',
    threeCore: '../lib/three.min',
    TrackballControls: '../lib/controls/TrackballControls',
    gentilis: '../../fonts/gentilis_regular.typeface',
    gentilisBold: '../../fonts/gentilis_bold.typeface',
    // --- end THREE sub-components
    detector: '../lib/Detector',
    stats: '../lib/stats.min',
    // Require.js plugins
    text: '../lib/text',



 //   shader: '../lib/shader',
    // Where to look for shader files
   // shaders: '../shaders'
  }
};
