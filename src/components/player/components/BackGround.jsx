/* eslint-disable react/prop-types */
import { Entity } from "aframe-react";
import { useCallback } from "react";

const BackGround = ({ settings }) => {
  const BackGrounBody = useCallback(() => {
    return (
      <>
        <Entity primitive="a-assets">
          <img id="sky" src={settings.backGround} />
        </Entity>

        <Entity primitive="a-sky" src="#sky" rotation="0 300 0" />
      </>
    );
  }, [settings.backGround]);
  return <BackGrounBody />;
};

export default BackGround;
