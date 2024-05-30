/* eslint-disable react/prop-types */
import Hls from "hls.js";
import { useRef } from "react";

const useHlsVideo = ({ url }) => {
  const videoRef = useRef(null);
  // console.log(videoRef);

  const playVideo = () => {
    const configHls = {
      minAutoBitrate: 100000, 
      lowLatencyMode: true,
      startPosition: 0, 
      maxBufferLength: 30, 
      maxMaxBufferLength: 30,
    };
    if (Hls.isSupported()) {
      const hls = new Hls(configHls);
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.recoverMediaError(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.log("error hls: ", event, data);
        hls.recoverMediaError();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
  };

  return [playVideo, videoRef];
};

export default useHlsVideo;
