import { useEffect, useRef } from "react";
import * as THREE from "three";
import "aframe";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

function MiComponente() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.set(500, 350, 750);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.xr.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.add(new Element("SJOz3qjfQXU", 0, 0, 240, 0));
    group.add(new Element("Y2-xZ-1HE-Q", 240, 0, 0, Math.PI / 2));
    group.add(new Element("IrydklNpcFI", 0, 0, -240, Math.PI));
    group.add(new Element("9ubytEsCaS0", -240, 0, 0, -Math.PI / 2));
    scene.add(group);

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 4;

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  function Element(id, x, y, z, ry) {
    const div = document.createElement("div");
    div.style.width = "480px";
    div.style.height = "360px";
    div.style.backgroundColor = "#000";

    const iframe = document.createElement("iframe");
    iframe.style.width = "480px";
    iframe.style.height = "360px";
    iframe.style.border = "0px";
    iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
    div.appendChild(iframe);

    const object = new CSS3DObject(div);
    object.position.set(x, y, z);
    object.rotation.y = ry;

    return object;
  }

  return <a-entity ref={containerRef}></a-entity>;
}

export default MiComponente;
