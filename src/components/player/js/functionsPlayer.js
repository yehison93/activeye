import * as aframeStereoComponent from "aframe-stereo-component";
import * as AFRAME from "aframe";

export function stereoComponent() {
  const stereoComponent = aframeStereoComponent.stereo_component;
  const stereoCamComponent = aframeStereoComponent.stereocam_component;

  AFRAME.registerComponent("stereo", stereoComponent);
  AFRAME.registerComponent("stereocam", stereoCamComponent);
}
