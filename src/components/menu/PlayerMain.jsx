import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Player from "../player/Player.jsx";
import logo from "../../assets/logoambliopa.png";
import FondoDefault from "../../assets/backgroundScenes/Sala-Moderna.jpg";
import useHlsVideo from "../player/customHooks/useHlsVideo";
import MenuConfig from "./component/MenuConfig.jsx";
import usePlaySound from "../player/customHooks/usePlaySound.jsx";
import alertSound from "../../assets/alertFinishTherapy.mp3";
import { List, Eyeglasses } from "react-bootstrap-icons";
import useLocalStorage from "../player/customHooks/useLocalStorage.jsx";
import { useEffect } from "react";
import useShake from "./customHooks/useShake.jsx";

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
  videoUrl: "",
  videoName: "",
};

const PlayerMain = () => {
  const [settings, setSettings] = useLocalStorage(defaultSettings, "settings");

  useEffect(() => {
    setSettings({ ...settings, timeTherapy: null, stateVideo: false });
  }, []);

  const [audioRef, playSound] = usePlaySound();

  const timeOut = (time) => {
    const timeOutId = setTimeout(() => {
      playSound(alertSound);
      setSettings({ ...settings, timeTherapy: 0 });
    }, time * 60000);
    return () => clearTimeout(timeOutId);
  };
  const [attachVideo, error, playerRef] = useHlsVideo();
  const [showMenu, setShowMenu] = useState(true);
  const funcShake = () => {
    playerRef.current.load();
    playerRef.current.play();
  };

  useShake(settings.stateVideo, funcShake);

  return (
    <div className="player-main">
      <Button
        style={{
          position: "absolute",
          top: 0,
          left: 0,

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
          right: 0,
          zIndex: 5,
        }}
        hidden={!showMenu}
        variant="outline-link fs-1 text-light"
        onClick={() =>
          setSettings({
            ...settings,
            rotation: `0 ${random()} 0`,
          })
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
