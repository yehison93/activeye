/* eslint-disable react/prop-types */
import { Entity } from "aframe-react";
import { useCallback } from "react";

const BackGround = ({ settings }) => {
  const BackGrounBody = useCallback(() => {
    return (
      <>
        {settings.backGround === "whitout" ? (
          <Entity
            primitive="a-sky"
            rotation="0 300 0"
            color={settings.fog.color}
            radius="50"
          />
        ) : (
          <Entity
            primitive="a-sky"
            src={"#sky"}
            rotation="0 300 0"
            radius="50"
          />
        )}
      </>
    );
  }, [settings.backGround, settings.fog.color]);
  return (
    <>
      <BackGrounBody />
    </>
  );
};

export default BackGround;
