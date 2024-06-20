/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { Entity } from "aframe-react";

const Tv = ({ settings, param }) => {
  const TvBody = useCallback(() => {
    return (
      <>
        <Entity
          rotation={`0 ${param.rotation} 0`}
          material={"fog: false"}
          visible={settings.stateVideo && settings.videoUrl}
          primitive="a-curvedimage"
          src={"#videoassets"}
          height={param.height}
          radius="-20"
          theta-length={param.thetaLength}
        />
      </>
    );
  }, [
    param.height,
    param.rotation,
    param.thetaLength,
    settings.stateVideo,
    settings.videoUrl,
  ]);
  return (
    <>
      <TvBody />
    </>
  );
};

export default Tv;
