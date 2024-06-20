/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Entity } from "aframe-react";
import chevronIcon from "../../../assets/IconsControls/chevron-up.svg";
import dashIcon from "../../../assets/IconsControls/dash-lg.svg";
import plusIcon from "../../../assets/IconsControls/plus-lg.svg";
import pauseIcon from "../../../assets/IconsControls/pause-fill.svg";
import playIcon from "../../../assets/IconsControls/play-fill.svg";

const Controls = ({ playerRef, attachVideo, changeChannels, settings }) => {
  return (
    <>
      <Entity primitive="a-assets">
        <img
          id="playIcon"
          color="#fff"
          src={playIcon}
          width={100}
          height={100}
        />
        <img id="pauseIcon" src={pauseIcon} width={100} height={100} />
        <img id="plusIcon" src={plusIcon} width={100} height={100} />
        <img id="dashIcon" src={dashIcon} width={100} height={100} />
        <img id="chevronIcon" src={chevronIcon} width={100} height={100} />
      </Entity>
      <Entity
        primitive="a-plane"
        width="25"
        height="10"
        color="#fff"
        opacity="0"
        position="0 -15 -20"
        className="clickable"
      >
        <Entity
          className="clickable"
          primitive="a-image"
          src="#playIcon"
          position="-2 0 0.1"
          width={5}
          height={5}
          events={{
            click: () => {
              attachVideo(settings.Url);
            },
          }}
        />
        <Entity
          className="clickable"
          primitive="a-image"
          src="#pauseIcon"
          position="2 0 0.1"
          width={5}
          height={5}
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
          position="8 0 0.1"
          width={5}
          height={5}
          events={{
            click: () => {
              changeChannels(true);
            },
          }}
        />
        <Entity />
        <Entity
          className="clickable"
          primitive="a-image"
          src="#chevronIcon"
          rotation="0 0 180"
          position="-8 0 0.1"
          width={5}
          height={5}
          events={{
            click: () => {
              changeChannels(false);
            },
          }}
        />
      </Entity>
    </>
  );
};

export default Controls;
