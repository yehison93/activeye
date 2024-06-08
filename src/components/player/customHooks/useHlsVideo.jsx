/* eslint-disable react/prop-types */
import Hls from "hls.js";
import { useRef, useState } from "react";
import ruidoTV from "../../../assets/ruidoTV.mp4";

const configHls = {
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

  const attachVideo = (url) => {
    videoRef.current.onplaying = () => {
      if (!videoRef.current.src.includes(ruidoTV)) {
        if (videoRef.current.readyState >= 1) {
          setError(false);
        } else {
          setError(true);
        }
      }
    };
    if (Hls.isSupported()) {
      const hls = new Hls(configHls);
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setError(false);
        videoRef.current.play();
      });
      hls.on(Hls.Events.ERROR, (e, data) => {
        if (data.fatal) {
          videoRef.current.onerror = () => {
            videoRef.current.src = ruidoTV;
            videoRef.current.loop = true;
            videoRef.current.volume = 0.1;
            setError(true);
            videoRef.current.play();
          };
        } else {
          hls.recoverMediaError();
        }
      });
    } else if (videoRef.current.canPlayType("video/mp4")) {
      setError(true);
      videoRef.current.pause();
      videoRef.current.src = url;
      videoRef.current.play();

      //funcion de error en la reproduccion
      videoRef.current.onerror = () => {
        videoRef.current.src = ruidoTV;
        videoRef.current.loop = true;
        videoRef.current.volume = 0.1;
        setError(true);
        videoRef.current.play();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      setError(true);
      videoRef.current.pause();
      videoRef.current.src = url;
      videoRef.current.play();

      //funcion de error en la reproduccion
      videoRef.current.onerror = () => {
        videoRef.current.src = ruidoTV;
        videoRef.current.loop = true;
        videoRef.current.volume = 0.1;
        setError(true);
        videoRef.current.play();
      };
    }
  };
  return [attachVideo, error, videoRef];
};

export default useHlsVideo;
