/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "aframe";
import * as AFRAME from "aframe";
import { Scene, Entity } from "aframe-react";
import * as aframeStereoComponent from "aframe-stereo-component";
import useHlsVideo from "./customHooks/useHlsVideo";
import useOrientation from "./customHooks/useOrientation";
import fondoTest from "../../assets/fondoTest.jpg";
import { useWakeLock } from "react-screen-wake-lock";
import "aframe-always-fullscreen-component";
import "platform";

const stereoComponent = aframeStereoComponent.stereo_component;
const stereoCamComponent = aframeStereoComponent.stereocam_component;

AFRAME.registerComponent("stereo", stereoComponent);
AFRAME.registerComponent("stereocam", stereoCamComponent);

const Player = ({ url, eye }) => {
  const [stateVideo, setStateVideo] = useState(false);
  const [playVideo, videoRef] = useHlsVideo({ url });
  const [isPotrait, isLandScape] = useOrientation();
  const { released, request, release } = useWakeLock();

  const toggle = () => {
    setStateVideo(!stateVideo),
      playVideo(),
      released === false ? release() : request();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{ position: "absolute", zIndex: "2", left: "50%", top: "50%" }}
      >
        <button
          id="myEnterVRButton"
          onClick={() => {
            toggle();
          }}
        >
          VR
        </button>
      </div>
      <Scene
        className="container-player"
        style={{ with: "100%", height: "100%" }}
        device-orientation-permission-ui="
          enabled: true;
          denyButtonText: Denegar;
          allowButtonText: Permitir;
          deviceMotionMessage: Esta es una app de VR que requiere de tu permiso para acceder a los sensores de movimiento de tu dispositivo, deberías aceptar para que tengas la mejor experiencia posible.;
          mobileDesktopMessage: Esta es una app de VR que requiere de tu permiso para acceder a los sensores de movimiento de tu teléfono, deberías aceptar para que tengas la mejor experiencia posible.
        "
        renderer="
          highRefreshRate: true;
          foveationLevel: 1;
          multiviewStereo: true;
          precision: medium


        "
        effect={true}
        embedded={!stateVideo}
        // always-fullscreen
        xr-mode-ui="enterVRButton: #myEnterVRButton; cardboardModeEnabled: true"
      >
        <Entity
          primitive="a-camera"
          camera="active: true"
          // look-controls
          wasd-controls
          position="0 1.7 0"
          stereocam={"eye: left"}
        >
          <Entity primitive="a-cursor" position="0 0 0"></Entity>
        </Entity>

        <Entity primitive="a-assets" timeout="1000">
          <video
            id="videoassets"
            controls={true}
            ref={videoRef}
            preload={"auto"}
            autoPlay={true}
            crossOrigin="anonymous"
            muted={!stateVideo}
            playsInline={true}
            on
          ></video>
        </Entity>

        <Entity primitive="a-sky" src={fondoTest} rotation="0 300 0"></Entity>

        <Entity
          primitive="a-sky"
          color="#000000"
          radius="6"
          stereo={eye}
        ></Entity>
        <Entity
          primitive="a-sky"
          color="#000000"
          radius="15"
          opacity={"0.1"}
        ></Entity>
        <Entity
          position="0 1.5 0"
          primitive="a-curvedimage"
          src="#videoassets"
          height="6"
          radius="10"
          theta-length="70"
          rotation="0 145 0"
          scale="0.8 0.8 0.8"
        ></Entity>
      </Scene>
    </div>
  );
};

export default Player;
