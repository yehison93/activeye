import Hls from "hls.js";
import { useRef, useState } from "react";

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
import ruidoTV from "../../../assets/ruidoTV.mp4";

const useHlsVideo = () => {
  const playerRef = useRef(null);
  const [error, setError] = useState(true);

  const attachVideo = (url) => {
    const playFallbackVideo = () => {
      playerRef.current.src = ruidoTV;
      playerRef.current.loop = true;
      playerRef.current.volume = 0.1;
      setError(true);
      playerRef.current.play().catch(() => {
        console.error("Error al reproducir el video de respaldo.");
      });
    };
    if (url)
      if (Hls.isSupported()) {
        const hls = new Hls(hlsConfig);
        hls.loadSource(url.trim());
        hls.attachMedia(playerRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          playerRef.current
            .play()
            .then(() => {
              setError(false);
            })
            .catch(playFallbackVideo);
        });
      } else {
        playerRef.current.src = url;
        playerRef.current
          .play()
          .then(() => {
            setError(false);
          })
          .catch(playFallbackVideo);
      }

    playerRef.current.onerror = playFallbackVideo;
  };
  return [attachVideo, error, playerRef];
};

export default useHlsVideo;
