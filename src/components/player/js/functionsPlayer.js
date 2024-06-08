import * as aframeStereoComponent from "aframe-stereo-component";
import * as AFRAME from "aframe";

function stereoComponent() {
  const stereoComponent = aframeStereoComponent.stereo_component;
  const stereoCamComponent = aframeStereoComponent.stereocam_component;

  AFRAME.registerComponent("stereo", stereoComponent);
  AFRAME.registerComponent("stereocam", stereoCamComponent);
}

const getRotation = (cases) => {
  switch (cases) {
    case "normal":
      return "0 145 0";
    case "small":
      return "0 160 0";
    case "big":
      return "0 130 0";
  }
};
const getThetaLength = (cases) => {
  switch (cases) {
    case "normal":
      return "70";
    case "small":
      return "50";
    case "big":
      return "100";
  }
};
const getHeight = (cases) => {
  switch (cases) {
    case "normal":
      return "16";
    case "small":
      return "8";
    case "big":
      return "24";
  }
};

export { getHeight, getRotation, getThetaLength, stereoComponent };
