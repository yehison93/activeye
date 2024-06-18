import { useEffect, useState } from "react";

const useVrState = (onVrState) => {
  const [isVr, setIsVr] = useState(false);

  useEffect(() => {
    const sceneEl = document.querySelector("a-scene");

    const enterVrHandler = () => {
      setIsVr(true);
      onVrState(true); // Actualiza el estado con el nuevo valor de isVr
    };

    const exitVrHandler = () => {
      setIsVr(false);
      onVrState(false); // Actualiza el estado con el nuevo valor de isVr
    };

    sceneEl.addEventListener("enter-vr", enterVrHandler);
    sceneEl.addEventListener("exit-vr", exitVrHandler);

    return () => {
      sceneEl.removeEventListener("enter-vr", enterVrHandler);
      sceneEl.removeEventListener("exit-vr", exitVrHandler);
    };
  }, []);

  return isVr; // Opcionalmente puedes retornar el estado actual de isVr
};

export default useVrState;
