/* eslint-disable react/prop-types */
import { Entity } from "aframe-react";
import { stereoComponent } from "../js/functionsPlayer";
import { useCallback } from "react";

stereoComponent();

const Camera = ({ settings }) => {
  const Component = useCallback(() => {
    return (
      <Entity
        primitive="a-camera"
        camera="active: true"
        look-controls="enabled: true; magicWindowTrackingEnabled: true"
        position="0 0.9 0"
        rotation={settings.rotation}
        stereocam={settings.eye ? "eye: left" : "eye: right"}
      >
        <Entity
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
          animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
          cursor="fuse: true;  fuseTimeout: 1000"
          raycaster="objects: .clickable; far: 100; near: 0.01"
          position="0 0 -0.5"
          geometry="primitive: ring; radiusInner: 0.009; radiusOuter: 0.015"
          material={`color: black; shader: flat`}
        />
      </Entity>
    );
  }, [settings.eye, settings.rotation]);

  return <Component />;
};

export default Camera;
