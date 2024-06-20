/* eslint-disable react/prop-types */
import { Entity } from "aframe-react";
import { useCallback } from "react";

const TitleChannels = ({ title, position }) => {
  const TitleChannelsBody = useCallback(() => {
    return (
      <>
        {title.length > 0 && (
          <Entity
            primitive="a-text"
            value={title}
            color="#fff"
            align="center"
            width="40"
            font="kelsonsans"
          />
        )}
        {/* <Entity
          text={`value: ${title}; color: #fff; align: center; width: 40;`}
        /> */}
      </>
    );
  }, [title]);
  return (
    <>
      <Entity position={position}>
        <TitleChannelsBody />
      </Entity>
    </>
  );
};

export default TitleChannels;
