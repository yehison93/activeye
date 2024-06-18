/* eslint-disable react/prop-types */
import { getHeight, getRotation, getThetaLength } from "../js/functionsPlayer";
import { useCallback } from "react";
import { Entity } from "aframe-react";

const Tv = ({ settings, playerRef }) => {
  const TvBody = useCallback(() => {
    return (
      <>
        <Entity
          rotation={`0 ${getRotation(settings.sizeTV)} 0`}
          material={"fog: false"}
          position={`0 ${settings.positionTV} 0`}
          visible={settings.stateVideo}
          primitive="a-curvedimage"
          src={"#videoassets"}
          height={getHeight(settings.sizeTV)}
          radius="-20"
          theta-length={getThetaLength(settings.sizeTV)}
        />
      </>
    );
  }, [settings.positionTV, settings.sizeTV, settings.stateVideo]);
  return (
    <>
      <Entity primitive="a-assets">
        <video
          id="videoassets"
          controls={true}
          src={null}
          preload="metadata"
          ref={playerRef}
          autoPlay={false}
          crossOrigin={"anonymous"}
          muted={!settings.stateVideo}
          width={16}
          height={9}
          playsInline={true}
        />
      </Entity>
      <TvBody />
    </>
  );
};

export default Tv;
