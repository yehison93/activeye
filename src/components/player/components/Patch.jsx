/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { Entity } from "aframe-react";

const Patch = ({ settings }) => {
  const PatchBody = useCallback(() => {
    return (
      <>
        <Entity
          primitive="a-sky"
          visible={settings.timeTherapy != 0}
          color="black"
          radius="10"
          stereo={settings.eye === "right" ? "eye: right" : "eye: left"}
        />
      </>
    );
  }, [settings.eye, settings.timeTherapy]);

  return <PatchBody />;
};

export default Patch;
