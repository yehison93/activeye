/* eslint-disable react/prop-types */

import "aframe";
import { Scene, Entity } from "aframe-react";
import { useState, useEffect } from "react";
import Camera from "./components/Camera";
import BackGround from "./components/BackGround";
import Patch from "./components/Patch";
import Logo from "./components/Logo";
import Tv from "./components/Tv";
import Controls from "./components/Controls";
import chevronIcon from "../../assets/IconsControls/chevron-up.svg";
import pauseIcon from "../../assets/IconsControls/pause-fill.svg";
import playIcon from "../../assets/IconsControls/play-fill.svg";
import { getHeight, getRotation, getThetaLength } from "./js/functionsPlayer";

const Player = ({
  settings,
  setSettings,
  playerRef,
  audioRef,
  attachVideo,
  changeChannels,
  finishTime,
}) => {
  const [param, setParam] = useState({});
  useEffect(() => {
    setParam((prevParam) => ({
      ...prevParam,
      height: getHeight(settings.sizeTV),
      rotation: getRotation(settings.sizeTV),
      thetaLength: getThetaLength(settings.sizeTV),
    }));
  }, [settings.sizeTV]);

  return (
    <>
      <video
        id="videoassets"
        controls={true}
        src={null}
        preload="auto"
        ref={playerRef}
        autoPlay={true}
        crossOrigin={"anonymous"}
        muted={!settings.stateVideo}
        width={16}
        height={9}
        playsInline={true}
      />
      <Scene
        id="MainScene"
        className="container-player"
        style={{ width: "auto", height: "100vh", margin: "0", padding: "0", backgroundColor: "black" }}
        device-orientation-permission-ui="
          enabled: true;
          denyButtonText: Denegar;
          allowButtonText: Permitir;
          deviceMotionMessage: Esta es una app de VR que requiere de tu permiso para acceder a los sensores de movimiento de tu dispositivo, deberías aceptar para que tengas la mejor experiencia posible.;
        "
        loading-screen="dotsColor: darkblue; backgroundColor: aqua"
        renderer="
          highRefreshRate: true;
          foveationLevel: 1;
          multiviewStereo: true;
          precision: medium;
        "
        backGroundoundColor="black"
        fog={`
        type: exponential; color: ${
          settings.stateVideo ? settings.fog.color : "white"
        };
        density: ${settings.stateVideo ? settings.fog.density : 0.015}
        `}
        effect={true}
        xr-mode-ui={`enabled: true; enterVREnabled: true; enterVRButton: #myEnterVRButton; cardboardModeEnabled: true`}
        events={{
          "enter-vr": () => {
            setSettings((prevSettings) => ({
              ...prevSettings,
              modeVR: true,
            }));
          },
          "exit-vr": () => {
            setSettings((prevSettings) => ({
              ...prevSettings,
              timeTherapy: null,
              rotation: "0 0 0",
              modeVR: false,
            }));
            finishTime();
          },
        }}
      >
        <Entity
          events={{
            loaded: () => {
              setSettings((prevSettings) => ({
                ...prevSettings,
                loadedVR: true,
              }));
            },
          }}
          primitive="a-assets"
          timeout="10000"
        >
          <audio
            ref={audioRef}
            autoPlay={true}
            src={null}
            muted={!settings.stateVideo}
            crossOrigin={"anonymous"}
            preload="metadata"
            controls={true}
          />
          <img id="logo" src={settings.logo} loading="eager" />
          <img id="sky" src={settings.backGround} loading="eager" />
          <img id="playIcon" src={playIcon} width={100} height={100} />
          <img id="pauseIcon" src={pauseIcon} width={100} height={100} />
          <img id="chevronIcon" src={chevronIcon} width={100} height={100} />
        </Entity>

        <Entity light="type: ambient; color: #ffd28e" />
        <Logo settings={settings} />
        <Camera settings={settings} />
        <BackGround settings={settings} />
        <Patch settings={settings} />
        <Entity position={`0 ${settings.positionTV} 0`} rotation="15 0 0">
          <Tv settings={settings} playerRef={playerRef} param={param} />
          {settings.modeVR ? (
            <Controls
              playerRef={playerRef}
              attachVideo={attachVideo}
              changeChannels={changeChannels}
              settings={settings}
              param={param}
            />
          ) : null}
        </Entity>
      </Scene>
    </>
  );
};

export default Player;
