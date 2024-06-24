import { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
const ruidoTV = "../../../assets/ruidoTV.mp4";
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
const useHlsVideo = () => {
  const playerRef = useRef(null);
  const [error, setError] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [retryTime, setRetryTime] = useState(1000);
  const maxRetries = 5; // adjust this value according to your needs

  const playFallbackVideo = () => {
    playerRef.current.src = ruidoTV;
    playerRef.current.loop = true;
    setError(true);
  };

  const playVideo = () => {
    playerRef.current.muted = false;
    playerRef.current.load();
    playerRef.current
      .play()
      .then(() => {
        setError(false);
        setRetryCount(0); // reset retry count on successful playback
        setRetryTime(1000);
      })
      .catch((error) => {
        if (retryCount < maxRetries) {
          console.error("Playback error:", error);
          setRetryCount(retryCount + 1);
          setTimeout(playVideo, retryTime); // retry after 1 second
          setRetryTime(retryTime + 1000);
        } else {
          playFallbackVideo();
        }
      });
  };

  const attachVideo = (url) => {
    setError(true);
    if (url) {
      playerRef.current.loop = false;
      playerRef.current.muted = true;

      if (Hls.isSupported()) {
        const hls = new Hls(hlsConfig);
        hls.loadSource(url.trim());
        hls.attachMedia(playerRef.current);
      } else {
        playerRef.current.src = url;
        playerRef.current.type = "application/x-mpegURL";
      }
    }
    playVideo();
    playerRef.current.onerror = (event) => {
      if (event.target.error.code === 3 || event.target.error.code === 4) {
        // MediaError codes 3 and 4 indicate network errors
        playVideo(); // retry playback
      } else {
        playFallbackVideo();
      }
    };
  };

  useEffect(() => {
    // clean up event listeners on component unmount
    return () => {
      playerRef.current.onerror = null;
    };
  }, []);

  return [attachVideo, error, playerRef];
};

export default useHlsVideo;
