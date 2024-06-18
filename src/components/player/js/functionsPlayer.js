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
      return "-55";
    case "small":
      return "-45";
    case "big":
      return "-65";
  }
};
const getThetaLength = (cases) => {
  switch (cases) {
    case "normal":
      return "110";
    case "small":
      return "90";
    case "big":
      return "130";
  }
};
const getHeight = (cases) => {
  switch (cases) {
    case "normal":
      return "19.8";
    case "small":
      return "16.2";
    case "big":
      return "23.4";
  }
};

export { getHeight, getRotation, getThetaLength, stereoComponent };
