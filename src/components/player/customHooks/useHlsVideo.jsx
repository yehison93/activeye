/* eslint-disable react/prop-types */
import Hls from "hls.js";
import { useRef } from "react";

const useHlsVideo = ({ url }) => {
  const videoRef = useRef(null);
  // console.log(videoRef);

  const playVideo = () => {
    const configHls = {
      minAutoBitrate: 0,
      lowLatencyMode: true,
      debug: true,
    };
    if (Hls.isSupported()) {
      const hls = new Hls(configHls);
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
  };

  return [playVideo, videoRef];
};

export default useHlsVideo;
