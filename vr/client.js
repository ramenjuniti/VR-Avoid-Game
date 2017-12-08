// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import { VRInstance } from 'react-vr-web';
import * as OVRUI from 'ovrui';
import 'webvr-polyfill';

var fallbackFonts = {
  '../static_assets/fonts/japanese.fnt': '../static_assets/fonts/japanese.png'
};

// use the embedded defaultFont and and fallbacks
var font = OVRUI.loadFont();
var count = 0;

function init(bundle, parent, options) {
  WebVRPolyfill.InstallWebVRSpecShim();
  function addFallback(fallbackFont) {
    OVRUI.addFontFallback(font, fallbackFont);
    count--;
    if (count === 0) {
      // all fallbacks are loaded start the VRInstance
      // 'font' contains everything React VR needs to render <Text> elements with
      // your custom font.

      // Pass it to the boilerplate init code
      const vr = new VRInstance(bundle, 'VR_Avoid_Game', parent, {
        // Pass in the custom font as an initialization property
        font: font,
        ...options,
        raycasters: [
          {
            getType: () => "mycursor",
            getRayOrigin: () => [0, 0, 0],
            getRayDirection: () => [0, 0, -1],
            drawsCursor: () => true
          }
        ],
        cursorVisibility: 'visible',
        ...options,
      });

      vr.render = function () {
        // Any custom behavior you want to perform on each frame goes here
      };
      // Begin the animation loop
      vr.start();
      return vr;
    }
  }

  for (var key in fallbackFonts) {
    // allow each font to asynchronously load in parallel and start VR instance when all complete
    count++;
    OVRUI.loadFont(key, fallbackFonts[key]).then((fallbackFont) => {
      addFallback(fallbackFont);
    });
  }
}

window.ReactVR = { init };
