/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { Entity } from "aframe-react";

const Logo = ({ settings }) => {
  const LogoBody = useCallback(() => {
    return (
      <>
        <Entity
          material="fog: false"
          position="0 1 0"
          primitive="a-curvedimage"
          src={"#logo"}
          height="10"
          radius="-20"
          theta-length="40"
          rotation={settings.stateVideo ? "0 170 0" : "0 340 0"}
          scale="0.8 0.8 0.8"
        />
      </>
    );
  }, [settings.stateVideo]);

  return (
    <>
      <LogoBody />
    </>
  );
};

export default Logo;
