import { useState, useEffect } from "react";

import { Button, Container, Row } from "react-bootstrap";

import useHlsVideo from "./components/player/customHooks/useHlsVideo.jsx";
import useLocalStorage from "./components/player/customHooks/useLocalStorage.jsx";
import useShake from "./components/menu/customHooks/useShake.jsx";
import usePlaySound from "./components/player/customHooks/usePlaySound.jsx";

import Player from "./components/player/Player.jsx";
import MenuConfig from "./components/menu/component/MenuConfig.jsx";

import logo from "./assets/logoambliopa.png";
import FondoDefault from "./assets/backgroundScenes/Sala-Moderna.jpg";
import alertSound from "./assets/alertFinishTherapy.mp3";

import { List, Eyeglasses } from "react-bootstrap-icons";
import useVrState from "./components/player/customHooks/useVrState.jsx";

const random = () => {
  return Math.random() * 0.9;
};
const defaultSettings = {
  logo: logo,
  eye: false, //true: right, false: left
  timeTherapy: null,
  backGround: FondoDefault,
  fog: { density: 0, color: "white" }, //la densidad se gradúa desde 0.001 a 0.005 se recomienda de 0.001 a 0.003
  sizeTV: "normal",
  positionTV: "1.5",
  stateVideo: false,
  rotation: "0 0 0",
  videoUrl: null,
  videoName: null,
  modeVR: false,
};

const PlayerMain = () => {
  const [settings, setSettings] = useLocalStorage(defaultSettings, "settings");
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        timeTherapy: null,
        positionTV: "1.5",
        rotation: "0 0 0",
        stateVideo: false,
        videoUrl: null,
        videoName: null,
        modeVR: false,
      }));
      setHasInitialized(true);
    } else if (!settings.modeVR) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        timeTherapy: null,
        rotation: "0 0 0",
        modeVR: false,
      }));
    }
  }, [hasInitialized, settings.modeVR]);

  useVrState((currentIsVr) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      modeVR: currentIsVr,
    }));
  });

  const [audioRef, playSound] = usePlaySound();

  const timeOut = (initialTime) => {
    let timeLeft = initialTime * 60;

    const finishTime = () => {
      clearInterval(intervalId);
      playSound(alertSound);
    };

    const intervalId = setInterval(() => {
      timeLeft -= 1;
      setSettings((prevSettings) => ({
        ...prevSettings,
        timeTherapy: timeLeft,
      }));

      if (timeLeft <= 0 || !timeLeft) {
        finishTime();
      }
    }, 1000);
  };

  const [attachVideo, error, playerRef] = useHlsVideo();
  const [showMenu, setShowMenu] = useState(true);
  const funcShake = () => {
    playerRef.current.load();
    playerRef.current.play();
    setSettings((prevSettings) => ({
      ...prevSettings,
      rotation: `0 ${random()} 0`,
    }));
  };

  useShake(settings.stateVideo, funcShake);

  return (
    <div className="player-main">
      <Button
        style={{
          position: "absolute",
          top: 0,
          right: settings.eye ? "0" : null,
          left: !settings.eye ? "0" : null,
          zIndex: 5,
        }}
        variant="outline-link fs-1 text-light"
        onClick={() => setShowMenu(!showMenu)}
      >
        <List />
      </Button>
      <Button
        style={{
          position: "absolute",
          top: 0,
          right: !settings.eye ? "0" : null,
          left: settings.eye ? "0" : null,
          zIndex: 5,
        }}
        hidden={settings.modeVR}
        variant="outline-link fs-1 text-light"
        onClick={() =>
          setSettings((prevSettings) => ({
            ...prevSettings,
            rotation: `0 ${random()} 0`,
          }))
        }
      >
        <Eyeglasses />
      </Button>

      <Container className="player-menu">
        <Row hidden={!showMenu}>
          <MenuConfig
            videoError={error}
            settings={settings}
            setSettings={setSettings}
            attachVideo={attachVideo}
            setShowMenu={setShowMenu}
            timeOut={timeOut}
          />
        </Row>
      </Container>
      <Player settings={settings} playerRef={playerRef} audioRef={audioRef} />
    </div>
  );
};

export default PlayerMain;
