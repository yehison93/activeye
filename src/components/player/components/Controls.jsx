/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Entity } from "aframe-react";
import TitleChannels from "./TitleChannels";

const Controls = ({
  playerRef,
  attachVideo,
  changeChannels,
  settings,
  param,
}) => {
  return (
    <>
      <Entity
        primitive="a-plane"
        width="25"
        height="10"
        opacity="0"
        position={`0 ${-1 * (param.height / 2 + 3)} -21`}
        className="clickable"
      >
        <Entity
          className="clickable"
          primitive="a-image"
          src="#playIcon"
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
        <TitleChannels title={settings.videoName} position={"0 -4 0"} />
      </Entity>
    </>
  );
};

export default Controls;
