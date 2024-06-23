/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Entity } from "aframe-react";
import TitleChannels from "./TitleChannels";
import { useCallback } from "react";

const Controls = ({
  playerRef,
  attachVideo,
  changeChannels,
  settings,
  param,
}) => {
  const ControlsBody = useCallback(() => {
    const colorButtons = settings.fog.color === "white" ? "black" : "white";
    return (
      <>
        <Entity
          className="clickable"
          primitive="a-image"
          src="#playIcon"
          color={colorButtons}
          position="-2 0 0.1"
          width={3}
          height={3}
          events={{
            click: () => {
              attachVideo(settings.videoUrl);
            },
          }}
        />
        <Entity
          className="clickable"
          primitive="a-image"
          src="#pauseIcon"
          color={colorButtons}
          position="2 0 0.1"
          width={3}
          height={3}
          events={{
            click: () => {
              playerRef.current.pause();
            },
          }}
        />
        <Entity
          className="clickable"
          primitive="a-image"
          src="#chevronIcon"
          color={colorButtons}
          position="6 0 0.1"
          width={3.3}
          height={2.2}
          events={{
            click: () => {
              changeChannels("next");
            },
          }}
        />
        <Entity />
        <Entity
          className="clickable"
          primitive="a-image"
          src="#chevronIcon"
          color={colorButtons}
          rotation="0 0 180"
          position="-6 0 0.1"
          width={3.3}
          height={2.2}
          events={{
            click: () => {
              changeChannels("prev");
            },
          }}
        />
      </>
    );
  }, [
    attachVideo,
    changeChannels,
    playerRef,
    settings.fog.color,
    settings.videoUrl,
  ]);
  return (
    <>
      <Entity
        primitive="a-plane"
        width="25"
        height="10"
        opacity="0"
        position={`0 ${-1 * (param.height / 2 + 4)} -21`}
        className="clickable"
      >
        <ControlsBody />
        <TitleChannels settings={settings} position={"0 -4 0"} />
      </Entity>
    </>
  );
};

export default Controls;
