import { useRef } from "react";

const useTimeOut = (onTimeOut, onTimeInterval) => {
  const intervalIdRef = useRef(null);
  let tempTimeRef = useRef(null);

  const startTimer = (initialTime) => {
    tempTimeRef = initialTime * 60;
    intervalIdRef.current = setInterval(() => {
      if (tempTimeRef > 0) {
        tempTimeRef--;
        // onTimeInterval(tempTime);
      } else {
        finishTime();
      }
    }, 1000);
  };

  const finishTime = () => {
    const val = tempTimeRef.current <= 1;
    onTimeOut(val);
    clearInterval(intervalIdRef.current);
  };

  return [startTimer, finishTime];
};

export default useTimeOut;
