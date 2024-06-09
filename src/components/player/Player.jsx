/* eslint-disable react/prop-types */
import "aframe";
import "aframe-gif-shader";
import { Scene, Entity } from "aframe-react";
import {
  stereoComponent,
  getHeight,
  getRotation,
  getThetaLength,
} from "./js/functionsPlayer";
import { useCallback } from "react";

stereoComponent();

const Player = ({ settings, videoRef }) => {
  const Camera = useCallback(() => {
    return (
      <>
        <Entity
          primitive="a-camera"
          camera="active: true"
          look-controls="enabled: true; magicWindowTrackingEnabled: true"
          position="0 1.7 0"
          stereocam={settings.eye ? "eye: left" : "eye: right"}
        >
          <Entity primitive="a-cursor" position="0 0 0"></Entity>
        </Entity>
      </>
    );
  }, [settings.eye]);

  const BackGround = useCallback(() => {
    return (
      <>
        <Entity primitive="a-sky" src="#sky" rotation="0 300 0" />
      </>
    );
  }, []);

  const Tv = useCallback(() => {
    return (
      <>
        <Entity
          material="fog: false"
          position="0 1.5 0"
          primitive="a-curvedimage"
          src={"#logo"}
          visible={!settings.stateVideo}
          height="4"
          radius="10"
          theta-length="70"
          rotation="0 145 0"
          scale="0.8 0.8 0.8"
        />
        <Entity
          material={"fog: false"}
          position="0 1.5 0"
          primitive="a-curvedimage"
          src={"#videoassets"}
          visible={settings.stateVideo}
          height={getHeight(settings.sizeTV)}
          radius="20"
          theta-length={getThetaLength(settings.sizeTV)}
          rotation={getRotation(settings.sizeTV)}
          scale="0.8 0.8 0.8"
        />
      </>
    );
  }, [settings.sizeTV, settings.stateVideo]);

  const Parche = useCallback(() => {
    return (
      <>
        <Entity
          primitive="a-sky"
          color="black"
          radius="8"
          stereo={settings.eye ? "eye: right" : "eye: left"}
        />
      </>
    );
  }, [settings.eye]);

  return (
    <Scene
      className="container-player"
      style={{ with: "100%", height: "100%" }}
      device-orientation-permission-ui="
          enabled: true;
          denyButtonText: Denegar;
          allowButtonText: Permitir;
          deviceMotionMessage: Esta es una app de VR que requiere de tu permiso para acceder a los sensores de movimiento de tu dispositivo, deberías aceptar para que tengas la mejor experiencia posible.;
        "
      renderer="
          highRefreshRate: true;
          foveationLevel: 1;
          multiviewStereo: true;
          precision: medium;
        "
      fog={`type: exponential; color: ${settings.fog.color}; density: ${settings.fog.density}`}
      effect={true}
      embedded={!settings.stateVideo}
      xr-mode-ui={`enabled: true; enterVREnabled: true; enterVRButton: #myEnterVRButton; cardboardModeEnabled: true`}
    >
      <Entity magicleap-controls="hand: right" />
      <Entity primitive="a-assets">
        <img id="sky" src={settings.backGround} />
        <img id="logo" src={settings.logo} />
        <video
          id="videoassets"
          controls={true}
          preload="metadata"
          ref={videoRef}
          autoPlay={true}
          crossOrigin={"anonymous"}
          muted={!settings.stateVideo}
          width={16}
          height={9}
          playsInline={true}
          webkit-playsinline={true}
        ></video>
      </Entity>
      <Camera />
      <BackGround />
      <Parche />
      <Tv />
    </Scene>
  );
};

export default Player;
