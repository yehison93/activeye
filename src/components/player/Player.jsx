/* eslint-disable react/prop-types */
import "aframe";
import { Scene, Entity } from "aframe-react";
import Camera from "./components/Camera";
import BackGround from "./components/BackGround";
import Patch from "./components/Patch";
import Logo from "./components/Logo";
import Tv from "./components/Tv";

const Player = ({ settings, playerRef, audioRef }) => {
  return (
    <Scene
      id="MainScene"
      className="container-player"
      style={{ with: "100vw", height: "100vh", margin: "0", padding: "0" }}
      device-orientation-permission-ui="
          enabled: true;
          denyButtonText: Denegar;
          allowButtonText: Permitir;
          deviceMotionMessage: Esta es una app de VR que requiere de tu permiso para acceder a los sensores de movimiento de tu dispositivo, deberías aceptar para que tengas la mejor experiencia posible.;
        "
      loading-screen="dotsColor: #072b7c; backgroundColor: #6cc6ccb0"
      renderer="
          highRefreshRate: true;
          foveationLevel: 1;
          multiviewStereo: true;
          precision: medium;
        "
      fog={`type: exponential; color: ${
        settings.stateVideo ? settings.fog.color : "white"
      };
        density: ${settings.stateVideo ? settings.fog.density : 0.002}`}
      effect={true}
      xr-mode-ui={`enabled: true; enterVREnabled: true; enterVRButton: #myEnterVRButton; cardboardModeEnabled: true`}
    >
      <Entity primitive="a-assets">
        <audio
          ref={audioRef}
          autoPlay={true}
          src={null}
          muted={!settings.stateVideo}
          crossOrigin={"anonymous"}
          preload="metadata"
          controls={true}
        />
      </Entity>
      <Entity light="type: ambient; color: #ffd28e" />
      <Logo settings={settings} />
      <Camera settings={settings} />
      <BackGround settings={settings} />
      <Patch settings={settings} />
      <Tv settings={settings} playerRef={playerRef} />
    </Scene>
  );
};

export default Player;
