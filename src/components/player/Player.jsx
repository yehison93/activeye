/* eslint-disable react/prop-types */
import "aframe";
import { Scene, Entity } from "aframe-react";
import {
  stereoComponent,
  getHeight,
  getRotation,
  getThetaLength,
} from "./js/functionsPlayer";
import { useCallback } from "react";
import ReactHlsPlayer from "react-hls-player";

stereoComponent();

var hlsConfig = {
  autoStartLoad: true,
  startPosition: -1,
  capLevelOnFPSDrop: false,
  initialLiveManifestSize: 3,
  maxBufferLength: 30,
  maxMaxBufferLength: 600,
  maxBufferHole: 0.5,
  liveSyncDurationCount: 3,
  enableWorker: true,
  enableSoftwareAES: true,
  fragLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 9000,
      maxLoadTimeMs: 100000,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0,
      },
      errorRetry: {
        maxNumRetry: 10,
        retryDelayMs: 1000,
        maxRetryDelayMs: 15000,
        backoff: "linear",
      },
    },
  },
  lowLatencyMode: true,
  fpsDroppedMonitoringPeriod: 5000,
  fpsDroppedMonitoringThreshold: 0.2,
  appendErrorMaxRetry: 3,
  abrEwmaFastLive: 3.0,
  abrEwmaSlowLive: 9.0,
  abrEwmaDefaultEstimate: 500000,
  abrBandWidthFactor: 0.95,
  abrBandWidthUpFactor: 0.7,
  maxStarvationDelay: 4,
  maxLoadingDelay: 4,
};

const Player = ({ settings, playerRef, audioRef }) => {
  const Camera = useCallback(() => {
    return (
      <Entity
        primitive="a-camera"
        camera="active: true"
        look-controls="enabled: true; magicWindowTrackingEnabled: true"
        position="0 0.9 0"
        rotation={settings.rotation}
        stereocam={settings.eye ? "eye: left" : "eye: right"}
      >
        <Entity primitive="a-cursor" position="0 0 0"></Entity>
      </Entity>
    );
  }, [settings.eye, settings.rotation]);

  const BackGround = useCallback(() => {
    return (
      <>
        <img id="sky" src={settings.backGround} />
        <Entity primitive="a-sky" src="#sky" rotation="0 300 0" />
      </>
    );
  }, [settings.backGround]);

  const Tv = useCallback(() => {
    return (
      <>
        <Entity
          material="fog: false"
          position="0 1 0"
          primitive="a-curvedimage"
          src={"#logo"}
          height="10"
          radius="20"
          theta-length="40"
          rotation={settings.stateVideo ? "0 340 0" : "0 160 0"}
          scale="0.8 0.8 0.8"
        />
        <Entity
          material={"fog: false"}
          position={`0 ${settings.positionTV} 0`}
          primitive="a-curvedimage"
          src={"#videoassets"}
          visible={settings.stateVideo}
          height={getHeight(settings.sizeTV)}
          radius="20"
          theta-length={getThetaLength(settings.sizeTV)}
          rotation={`-10 ${getRotation(settings.sizeTV)} 10`}
          scale="0.8 0.8 0.8"
        />
      </>
    );
  }, [settings.positionTV, settings.sizeTV, settings.stateVideo]);

  const Parche = useCallback(() => {
    return (
      <>
        <Entity
          primitive="a-sky"
          visible={settings.timeTherapy !== 0}
          color="black"
          radius="5"
          stereo={settings.eye ? "eye: right" : "eye: left"}
        />
      </>
    );
  }, [settings.eye, settings.timeTherapy]);

  return (
    <Scene
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
      fog={`type: exponential; color: ${settings.fog.color};
        density: ${settings.stateVideo ? settings.fog.density : 0.002}`}
      effect={true}
      embedded={!settings.stateVideo}
      xr-mode-ui={`enabled: true; enterVREnabled: true; enterVRButton: #myEnterVRButton; cardboardModeEnabled: true`}
    >
      <Entity primitive="a-assets">
        <ReactHlsPlayer
          id="videoassets"
          controls={true}
          hlsConfig={hlsConfig}
          preload="metadata"
          playerRef={playerRef}
          autoPlay={false}
          crossOrigin={"anonymous"}
          muted={!settings.stateVideo}
          width={16}
          height={9}
          playsInline={true}
        />
        <img id="logo" src={settings.logo} />
        <audio
          ref={audioRef}
          autoPlay={true}
          muted={!settings.stateVideo}
          crossOrigin={"anonymous"}
          preload="metadata"
          controls={true}
        />
      </Entity>
      <Camera />
      <BackGround />
      <Parche />
      <Tv />
    </Scene>
  );
};

export default Player;
