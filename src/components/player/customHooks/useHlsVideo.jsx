/* eslint-disable react/prop-types */
import Hls from "hls.js";
import { useRef } from "react";

const configHls = {
  debug: true,
  autoStartLoad: true,
  startPosition: -1,
  maxBufferLength: 30,
  maxMaxBufferLength: 60,
  lowBufferWatchdogPeriod: 0.5,
  highBufferWatchdogPeriod: 3,
  nudgeOffset: 0.1,
  nudgeMaxRetry: 3,
  maxFragLookUpTolerance: 0.5,
  enableWorker: true,
  enableSoftwareAES: true,
  manifestLoadingMaxRetry: 4,
  manifestLoadingTimeOut: 10000,
  levelLoadingMaxRetry: 4,
  levelLoadingTimeOut: 10000,
  fragLoadingMaxRetry: 6,
  fragLoadingTimeOut: 20000,
  fragLoadingRetryDelay: 1000,
  startLevel: 0,
  initialLiveManifestSize: 2,
  maxLevel: 10,
  minLevel: 0,
  levelTargetDuration: 10,
  levelMaxDuration: 30,
  startFragPrefetch: true,
  appendErrorMaxRetry: 3,
  enableCEA708Captions: true,
  enableWebVTT: true,
  enableIMSCaptions: true,
  enableSCTECaptions: true,
  enableTTMLCaptions: true,
  enableDVBTTCaptions: true,
  enableSMPTECaptions: true,
  enableCEA608Captions: true,
  enableSCTE35Captions: true,
  enableSCTE20Captions: true,
  enableSCTE104Captions: true,
  enableSCTE128Captions: true,
  enableSCTE203Captions: true,
  enableSCTE208Captions: true,
  enableSCTE224Captions: true,
  enableSCTE240Captions: true,
  enableSCTE256Captions: true,
  enableSCTE272Captions: true,
  enableSCTE288Captions: true,
  enableSCTE304Captions: true,
  enableSCTE320Captions: true,
  enableSCTE336Captions: true,
  enableSCTE352Captions: true,
  enableSCTE368Captions: true,
  enableSCTE384Captions: true,
  enableSCTE400Captions: true,
  enableSCTE416Captions: true,
  enableSCTE432Captions: true,
  enableSCTE448Captions: true,
  enableSCTE464Captions: true,
  enableSCTE480Captions: true,
  enableSCTE496Captions: true,
  enableSCTE512Captions: true,
  enableSCTE528Captions: true,
  enableSCTE544Captions: true,
  enableSCTE560Captions: true,
  enableSCTE576Captions: true,
  enableSCTE592Captions: true,
  enableSCTE608Captions: true,
  enableSCTE624Captions: true,
  enableSCTE640Captions: true,
  enableSCTE656Captions: true,
  enableSCTE672Captions: true,
  enableSCTE688Captions: true,
  enableSCTE704Captions: true,
  enableSCTE720Captions: true,
  enableSCTE736Captions: true,
  enableSCTE752Captions: true,
  enableSCTE768Captions: true,
  enableSCTE784Captions: true,
  enableSCTE800Captions: true,
  enableSCTE816Captions: true,
  enableSCTE832Captions: true,
  enableSCTE848Captions: true,
  enableSCTE864Captions: true,
  enableSCTE880Captions: true,
  enableSCTE896Captions: true,
  enableSCTE912Captions: true,
  enableSCTE928Captions: true,
  enableSCTE944Captions: true,
};

const useHlsVideo = ({ url }) => {
  const videoRef = useRef(null);

  

  const playVideo = () => {
    if (Hls.isSupported()) {
      const hls = new Hls(configHls);
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.recoverMediaError(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
      hls.on(Hls.Events.ERROR, () => {
        hls.recoverMediaError(), videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
  };

  return [playVideo, videoRef];
};

export default useHlsVideo;
