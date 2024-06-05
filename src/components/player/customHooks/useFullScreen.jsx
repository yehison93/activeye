const useFullScreen = (callback) => {
  const element = document.documentElement;
  const triggerFull = () => {
    if (element) {
      element.requestFullscreen();
      if (callback && typeof callback === "function") {
        callback(true);
      }
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if (callback && typeof callback === "function") {
      callback(false);
    }
  };
  return [triggerFull, exitFull];
};

export default useFullScreen;
