/* eslint-disable react/prop-types */
import "aframe";
import "aframe-gif-shader";
import { Scene, Entity } from "aframe-react";
import { stereoComponent } from "./js/functionsPlayer";
import ruidoTV from "../../assets/ruidoTV.mp4";

stereoComponent();
const Player = ({
  logo,
  eye,
  background,
  stateVideo,
  fog,
  videoRef,
  error,
}) => {
  return (
    <Scene
      className="container-player"
      style={{ with: "100%", height: "100%" }}
      device-orientation-permission-ui="
          enabled: true;
          denyButtonText: Denegar;
          allowButtonText: Permitir;
          deviceMotionMessage: Esta es una app de VR que requiere de tu permiso para acceder a los sensores de movimiento de tu dispositivo, deberías aceptar para que tengas la mejor experiencia posible.;
          mobileDesktopMessage: Esta es una app de VR que requiere de tu permiso para acceder a los sensores de movimiento de tu teléfono, deberías aceptar para que tengas la mejor experiencia posible.;
        "
      renderer="
          highRefreshRate: true;
          foveationLevel: 1;
          multiviewStereo: true;
          precision: medium;
        "
      fog={`type: exponential; color: ${
        stateVideo ? fog.color : "white"
      }; density: ${fog.density}`}
      effect={true}
      embedded={!stateVideo}
      xr-mode-ui={`enterVRButton: #myEnterVRButton; cardboardModeEnabled: true`}
    >
      <Entity
        primitive="a-camera"
        camera="active: true"
        wasd-controls
        position="0 1.7 0"
        stereocam={"eye: left"}
      >
        <Entity primitive="a-cursor" position="0 0 0"></Entity>
      </Entity>

      <Entity primitive="a-assets" timeout="1000">
        {/* <img id="ruidoTv" src={ruidoTv} /> */}
        <img id="sky" src={background} />
        <img id="logo" src={logo} />
        <video
          id="ruidoTV"
          src={ruidoTV}
          loop="true"
          autoPlay={true}
          muted={!stateVideo}
          playsInline={true}
        ></video>
        <video
          id="videoassets"
          controls={true}
          ref={videoRef}
          preload={"auto"}
          autoPlay={true}
          crossOrigin="anonymous"
          muted={!stateVideo}
          playsInline={true}
        ></video>
      </Entity>

      <Entity primitive="a-sky" src="#sky" rotation="0 300 0" />

      <Entity primitive="a-sky" color="black" radius="8" stereo={eye} />
      <Entity
        material="fog: false"
        position="0 1.5 0"
        primitive="a-curvedimage"
        src={"#logo"}
        visible={!stateVideo}
        height="8"
        radius="10"
        theta-length="70"
        rotation="0 145 0"
        scale="0.8 0.8 0.8"
      />
      <Entity
        material={"fog: false"}
        position="0 1.5 0"
        primitive="a-curvedimage"
        src={error ? "#ruidoTV" : "#videoassets"}
        visible={stateVideo}
        height="8"
        radius="10"
        theta-length="70"
        rotation="0 145 0"
        scale="0.8 0.8 0.8"
      />
    </Scene>
  );
};

export default Player;
