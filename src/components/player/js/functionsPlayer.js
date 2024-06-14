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
      return "145";
    case "small":
      return "155";
    case "big":
      return "135";
  }
};
const getThetaLength = (cases) => {
  switch (cases) {
    case "normal":
      return "70";
    case "small":
      return "50";
    case "big":
      return "90";
  }
};
const getHeight = (cases) => {
  switch (cases) {
    case "normal":
      return "12.7";
    case "small":
      return "9";
    case "big":
      return "16.2";
  }
};

export { getHeight, getRotation, getThetaLength, stereoComponent };
