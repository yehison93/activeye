/* eslint-disable react/prop-types */
import { getHeight, getRotation, getThetaLength } from "../js/functionsPlayer";
import { useCallback } from "react";
import { Entity } from "aframe-react";
import ReactHlsPlayer from "react-hls-player";

const hlsConfig = {
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

const Tv = ({ settings, playerRef }) => {
  const TvBody = useCallback(() => {
    return (
      <>
        <Entity
          rotation={`0 ${getRotation(settings.sizeTV)} 0`}
          material={"fog: false"}
          position={`0 ${settings.positionTV} 0`}
          visible={settings.stateVideo}
          primitive="a-curvedimage"
          src={"#videoassets"}
          height={getHeight(settings.sizeTV)}
          radius="-20"
          theta-length={getThetaLength(settings.sizeTV)}
        />
      </>
    );
  }, [settings.positionTV, settings.sizeTV, settings.stateVideo]);
  return (
    <>
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
      </Entity>
      <TvBody />
    </>
  );
};

export default Tv;
