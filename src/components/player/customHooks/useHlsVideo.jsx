/* eslint-disable react/prop-types */
import Hls from "hls.js";
import { useRef, useState, useCallback } from "react";

const configHls = {
  // debug: true,
  autoStartLoad: true,
  enableWorker: true,
  lowLatencyMode: true,
  backBufferLength: 90,
  startPosition: -1,
  maxBufferLength: 30,
  maxMaxBufferLength: 600,
  lowBufferWatchdogPeriod: 0.5,
  highBufferWatchdogPeriod: 3,
  enableSoftwareAES: true,
  manifestLoadingRetryDelay: 500,
  manifestLoadingMaxRetryTimeout: 5000,
  startLevel: -1,
};

const useHlsVideo = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(true);

  const attachVideo = useCallback((url) => {
    setError(true);
    if (Hls.isSupported()) {
      const hls = new Hls(configHls);
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
        setError(false);
      });
      hls.on(Hls.Events.ERROR, (e, data) => {
        // hls.recoverMediaError();
        if (videoRef.current.readyState > 0) {
          setError(false);
        } else {
          setError(true);
        }
        if (data.fatal) {
          setError(true);
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
  }, []);
  return [attachVideo, error, videoRef];
};

export default useHlsVideo;
