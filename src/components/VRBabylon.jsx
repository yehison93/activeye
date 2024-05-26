import { useRef, useState, useEffect } from "react";
import "aframe";
import * as AFRAME from "aframe";
import "aframe-video-controls";
import * as aframeStereoComponent from "aframe-stereo-component";
import Hls from "hls.js";
import fondoTest from "../assets/fondoTest.jpg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useWakeLock } from "react-screen-wake-lock";
const stereoComponent = aframeStereoComponent.stereo_component;
const stereoCamComponent = aframeStereoComponent.stereocam_component;

AFRAME.registerComponent("stereo", stereoComponent);
AFRAME.registerComponent("stereocam", stereoCamComponent);

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
const url =
  "https://venevision.akamaized.net/hls/live/2098814/VENEVISION/master.m3u8";
const VRExperience = () => {
  const [stateVideo, setStateVideo] = useState(true);
  const videoRef = useRef(null);
  const handle = useFullScreenHandle();
  const toggle = () => {
    setStateVideo(!stateVideo);
  };
  const playVideo = () => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
  };
  const { released, request, release } = useWakeLock();

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: "0", top: "0" }}>
        <button
          id="myEnterVRButton"
          onClick={() => {
            playVideo(), toggle();
          }}
        >
          VR
        </button>
      </div>

      <a-scene
        // background="color: #000"
        embedded={stateVideo}
        xr-mode-ui="enterVRButton: #myEnterVRButton; cardboardModeEnabled: true"
      >
        <a-camera position="0 0 10" stereocam="eye:left;" look-controls>
          <a-cursor position="0 0 0"></a-cursor>
          {/* <a-entity
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: black; shader: flat"
          ></a-entity> */}
        </a-camera>

        <a-assets timeout="10000">
          <video
            controls
            ref={videoRef}
            id="videoFireworks"
            preload="auto"
            autoPlay
            width="16"
            height="9"
            loop="true"
            crossOrigin="anonymous"
            muted={stateVideo}
            playsinline
            webkit-playsinline
          ></video>
        </a-assets>
        <a-sky src={fondoTest} rotation="0 300 0"></a-sky>

        <a-sky
          // position="0 0 0"
          color="#000"
          radius="2"
          stereo="eye: left"
        ></a-sky>
        <a-curvedimage
          src="#videoFireworks"
          height="60"
          radius="100"
          theta-length="70"
          visible="false"
          rotation="0 145 0"
          scale="0.8 0.8 0.8"
          play-on-click
        ></a-curvedimage>

        {/* <a-entity
          id="controls"
          video-controls="src:#videoFireworks; size:2;  barColor: #fff"
        ></a-entity> */}
        {/* <a-entity
          position="0 0 -1.5"
          text="align: center;
                width: 6;
                wrapCount: 100;
                color: black;
                value: Click or tap to start video"
          hide-on-play="#videoFireworks"
        ></a-entity> */}
      </a-scene>
    </div>
  );
};

export default VRExperience;
