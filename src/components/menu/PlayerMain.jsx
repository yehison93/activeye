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

const PlayerMain = () => {
  const [settings, setSettings] = useState({
    logo: logo,
    eye: false, //true: right, false: left
    timeTherapy: null,
    backGround: FondoDefault,
    fog: { density: 0, color: "white" }, //la densidad se gradúa desde 0.001 a 0.005 se recomienda de 0.001 a 0.003
    sizeTV: "normal",
    stateVideo: false,
    rotation: "0 0 0",
  });
  const [audioRef, playSound] = usePlaySound();

  const timeOut = (time) => {
    const timeOutId = setTimeout(() => {
      playSound(alertSound);
      setSettings({ ...settings, timeTherapy: 0 });
    }, time * 60000);
    return () => clearTimeout(timeOutId);
  };
  const [attachVideo, error, videoRef] = useHlsVideo();
  const [showMenu, setShowMenu] = useState(true);

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
        variant="outline-link fs-1 text-light"
        onClick={() =>
          setSettings({
            ...settings,
            rotation: `0 ${() => {
              return Math.random() * 0.9;
            }} 0`,
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
      <Player settings={settings} videoRef={videoRef} audioRef={audioRef} />
    </div>
  );
};

export default PlayerMain;
