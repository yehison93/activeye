import Hls from "hls.js";
import { useRef, useState } from "react";
import ruidoTV from "../../../assets/ruidoTV.mp4";

const useHlsVideo = () => {
  const playerRef = useRef(null);
  const [error, setError] = useState(true);

  const attachVideo = (url) => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(playerRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        playerRef.current
          .play()
          .then(() => {
            setError(false);
          })
          .catch(() => {
            playerRef.current.src = ruidoTV;
            playerRef.current.loop = true;
            playerRef.current.volume = 0.1;
            setError(true);
            playerRef.current.play();
          });
      });
    } else {
      playerRef.current.src = url;
      playerRef.current
        .play()
        .then(() => {
          setError(false);
        })
        .catch(() => {
          playerRef.current.src = ruidoTV;
          playerRef.current.loop = true;
          playerRef.current.volume = 0.1;
          setError(true);
          playerRef.current.play();
        });
    }

    playerRef.current.onerror = () => {
      playerRef.current.load();
      playerRef.current.play().catch(() => {
        playerRef.current.src = ruidoTV;
        playerRef.current.loop = true;
        playerRef.current.volume = 0.1;
        setError(true);
        playerRef.current.play();
      });
    };
  };

  return [attachVideo, error, playerRef];
};

export default useHlsVideo;
