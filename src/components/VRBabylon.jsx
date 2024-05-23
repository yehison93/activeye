import { useRef, useState, useEffect } from "react";

import "aframe";
import * as AFRAME from "aframe";
import * as aframeStereoComponent from "aframe-stereo-component";
const stereoComponent = aframeStereoComponent.stereo_component;
const stereoCamComponent = aframeStereoComponent.stereocam_component;
AFRAME.registerComponent("stereo", stereoComponent);
AFRAME.registerComponent("stereocam", stereoCamComponent);
import image from "../assets/prueba.png";
AFRAME.registerComponent("play-on-click", {
  init: function () {
    this.onClick = this.onClick.bind(this);
  },
  play: function () {
    window.addEventListener("click", this.onClick);
  },
  pause: function () {
    window.removeEventListener("click", this.onClick);
  },
  onClick: function (evt) {
    var videoEl = this.el.getAttribute("material").src;
    if (!videoEl) {
      return;
    }
    this.el.object3D.visible = true;
    videoEl.play();
  },
});
AFRAME.registerComponent("hide-on-play", {
  schema: { type: "selector" },
  init: function () {
    this.onPlaying = this.onPlaying.bind(this);
    this.onPause = this.onPause.bind(this);
    this.el.object3D.visible = !this.data.playing;
  },
  play: function () {
    if (this.data) {
      this.data.addEventListener("playing", this.onPlaying);
      this.data.addEventListener("pause", this.onPause);
    }
  },
  pause: function () {
    if (this.data) {
      this.data.removeEventListener("playing", this.onPlaying);
      this.data.removeEventListener("pause", this.onPause);
    }
  },
  onPlaying: function (evt) {
    this.el.object3D.visible = false;
  },
  onPause: function (evt) {
    this.el.object3D.visible = true;
  },
});

const VRExperience = () => {
  const [stateVideo, setStateVideo] = useState(true);
  const ref = useRef(null);
  const toggle = () => {
    setStateVideo(!stateVideo);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: "0", top: "0" }}>
        <button id="myEnterVRButton" onClick={() => toggle()}>
          VR
        </button>
        <button id="myEnterARButton">AR</button>
      </div>

      <a-scene
        embedded={stateVideo}
        xr-mode-ui="enterVRButton: #myEnterVRButton; enterARButton: #myEnterARButton; cardboardModeEnabled: true"
      >
        <a-camera
          position="0 0 0"
          cursor-visible="false"
          stereocam="eye:left;"
        ></a-camera>
        <a-assets>
          <video
            id="videoBunny"
            preload="auto"
            src="https://cdn.aframe.io/videos/bunny.mp4"
            width="16"
            height="9"
            autoplay
            loop="true"
            crossOrigin="anonymous"
            muted={stateVideo}
            playsinline
            webkit-playsinline
          ></video>
          <video
            id="videoFireworks"
            preload="auto"
            src="https://cdn.aframe.io/videos/bunny.mp4"
            autoplay
            width="16"
            height="9"
            loop="true"
            crossOrigin="anonymous"
            muted
            playsinline
            webkit-playsinline
          ></video>
        </a-assets>

        <a-sky
          id="test2"
          color="#000"
          stereo="eye:left"
          position="0 0 -20"
        ></a-sky>

        <a-sky
          id="test"
          src="#videoFireworks"
          // phi-length="90"
          repeat="4"
          segments-height="10"
          segments-width="10"
          // theta-length="90"
          position="0 0 -20"
          play-on-click
          visible="false"
          stereo="eye:right"
          playsinline
          webkit-playsinline
        ></a-sky>
      </a-scene>
    </div>
  );
};

export default VRExperience;
