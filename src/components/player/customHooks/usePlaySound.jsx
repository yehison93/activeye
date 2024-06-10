import { useRef } from "react";

const usePlaySound = () => {
  const audioRef = useRef(null);
  const playAudio = (url) => {
    audioRef.current.src = url;
    audioRef.current.volume = 1;
    audioRef.current.play();
  };
  return [audioRef, playAudio];
};

export default usePlaySound;
