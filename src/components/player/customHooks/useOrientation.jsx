import { useState } from "react";

const useOrientation = () => {
  const [isPotrait, setIsPotrait] = useState(false);
  const [isLandScape, setIsLandScape] = useState(false);
  screen.orientation.addEventListener("change", (event) => {
    const type = event.target.type;
    const angle = event.target.angle;
    console.log(`ScreenOrientation change: ${type}, ${angle} degrees.`);
    if (angle !== 0) {
      setIsPotrait(false);
      setIsLandScape(true);
    } else {
      setIsPotrait(true);
      setIsLandScape(false);
    }
  });
  return [isPotrait, isLandScape];
};

export default useOrientation;
