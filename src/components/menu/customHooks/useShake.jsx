import { useEffect } from "react";
import Shake from "shake.js";

const useShake = (state, func) => {
  const myShakeEvent = new Shake({
    threshold: 10, // optional shake strength threshold
    timeout: 3000, // optional, determines the frequency of event generation
  });
  useEffect(() => {
    if (state) {
      window.addEventListener("shake", onShakeEvent, false);
      myShakeEvent.start();
    } else {
      window.removeEventListener("shake", onShakeEvent, false);
      myShakeEvent.stop();
    }
  }, [myShakeEvent, onShakeEvent, state]);

  //function to call when shake occurs
  function onShakeEvent() {
    func();
  }
};

export default useShake;
