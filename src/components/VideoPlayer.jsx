import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { StereoEffect } from "three/addons/effects/StereoEffect.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

export default function ThreeJSComponent() {
  const containerRef = useRef(null);

  useEffect(() => {
    let container, camera, scene, renderer, effect;
    const spheres = [];
    let mouseX = 0,
      mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) * 10;
      mouseY = (event.clientY - windowHalfY) * 10;
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      effect.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      renderer.setAnimationLoop(render);
    }

    function render() {
      const timer = 0.0001 * Date.now();
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      for (let i = 0, il = spheres.length; i < il; i++) {
        const sphere = spheres[i];
        sphere.position.x = 5000 * Math.cos(timer + i);
        sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
      }

      // Renderiza la escena para el ojo izquierdo
      effect.setEyeSeparation(-0.5);
      effect.render(scene, camera);

      // Limpia la mitad derecha de la pantalla
      renderer.setScissorTest(true);
      renderer.setScissor(
        window.innerWidth / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight
      );
      renderer.clear();

      // Desactiva la prueba de tijera
      renderer.setScissorTest(false);
    }

    if (containerRef.current) {
      container = containerRef.current;
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        100000
      );
      camera.position.z = 3200;
      scene = new THREE.Scene();
      scene.background = new THREE.CubeTextureLoader()
        .setPath("textures/cube/Park3Med/")
        .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
      const geometry = new THREE.SphereGeometry(100, 32, 16);
      const textureCube = new THREE.CubeTextureLoader()
        .setPath("textures/cube/Park3Med/")
        .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
      textureCube.mapping = THREE.CubeRefractionMapping;
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        envMap: textureCube,
        refractionRatio: 0.95,
      });
      for (let i = 0; i < 500; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 10000 - 5000;
        mesh.position.y = Math.random() * 10000 - 5000;
        mesh.position.z = Math.random() * 10000 - 5000;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
        // scene.add(mesh);
        spheres.push(mesh);
      }
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.xr.enabled = true;
      container.appendChild(renderer.domElement);
      container.appendChild(VRButton.createButton(renderer));
      effect = new StereoEffect(renderer);
      effect.setSize(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", onWindowResize);
      document.addEventListener("mousemove", onDocumentMouseMove);
      animate();
    }

    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <div ref={containerRef} />;
}
