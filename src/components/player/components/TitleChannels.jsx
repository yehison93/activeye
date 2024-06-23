/* eslint-disable react/prop-types */
import { Entity } from "aframe-react";
import { useCallback } from "react";

const TitleChannels = ({ settings, position }) => {
  const TitleChannelsBody = useCallback(() => {
    return (
      <>
        {settings.videoName.length > 0 && (
          <Entity
            primitive="a-text"
            value={settings.videoName}
            color={settings.fog.color === "white" ? "black" : "white"}
            align="center"
            width="40"
            font="kelsonsans"
          />
        )}
      </>
    );
  }, [settings.fog.color, settings.videoName]);
  return (
    <>
      <Entity position={position}>
        <TitleChannelsBody />
      </Entity>
    </>
  );
};

export default TitleChannels;
