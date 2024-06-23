/* eslint-disable react/prop-types */
import { Entity } from "aframe-react";
import { useCallback } from "react";

const BackGround = ({ settings }) => {
  const BackGrounBody = useCallback(() => {
    return (
      <>
        <Entity
          visible={settings.backGround}
          primitive="a-sky"
          src="#sky"
          rotation="0 300 0"
          radius="100"
        />
      </>
    );
  }, [settings.backGround]);
  return (
    <>
      <BackGrounBody />
    </>
  );
};

export default BackGround;
