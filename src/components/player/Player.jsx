import { useRef, useState } from "react";
import "aframe";
import * as AFRAME from "aframe";
import { Scene, Entity } from "aframe-react";
import * as aframeStereoComponent from "aframe-stereo-component";
import useHlsVideo from "./customHooks/useHlsVideo";
import fondoTest from "../../assets/fondoTest.jpg";
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
const Player = () => {
  const [stateVideo, setStateVideo] = useState(false);
  const [playVideo, videoRef] = useHlsVideo({ url });
  const handle = useFullScreenHandle();
  const toggle = () => {
    setStateVideo(!stateVideo);
  };

  const { released, request, release } = useWakeLock();

  return (
    <div
      style={{
        // position: "relative",
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          // position: "absolute",
          left: "0",
          top: "0",
        }}
      >
        <button
          id="myEnterVRButton"
          onClick={() => {
            toggle(), playVideo(), released === false ? release() : request();
          }}
        >
          VR
        </button>
      </div>
      <Scene
        className="container-player"
        embedded={!stateVideo}
        xr-mode-ui="enterVRButton: #myEnterVRButton; cardboardModeEnabled: true"
      >
        <Entity
          primitive="a-camera"
          lock-controls
          position="0 1.7 0"
          stereocam="eye:left;"
        >
          <Entity primitive="a-cursor" position="0 0 0"></Entity>
        </Entity>

        <Entity primitive="a-assets" timeout="5000">
          <video
            id="videoFireworks"
            controls={true}
            ref={videoRef}
            preload="auto"
            autoPlay={true}
            width="16"
            height="9"
            loop={true}
            crossOrigin="anonymous"
            muted={!stateVideo}
            playsInline={true}
          ></video>
        </Entity>

        <Entity primitive="a-sky" src={fondoTest} rotation="0 300 0"></Entity>

        <Entity
          primitive="a-sky"
          color="#000"
          radius="2"
          stereo="eye: left"
        ></Entity>
        <Entity
          primitive="a-curvedimage"
          src="#videoFireworks"
          height="60"
          radius="100"
          theta-length="70"
          visible="false"
          rotation="0 145 0"
          scale="0.8 0.8 0.8"
          play-on-click
        ></Entity>
      </Scene>
    </div>
  );
};

export default Player;
