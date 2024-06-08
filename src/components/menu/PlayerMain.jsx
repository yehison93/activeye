import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Player from "../player/Player.jsx";
import logo from "../../assets/logoambliopa.png";
import fondoTest from "../../assets/backgroundScenes/Fondo-Test.jpg";
import useHlsVideo from "../player/customHooks/useHlsVideo";
import MenuConfig from "./component/MenuConfig.jsx";

const PlayerMain = () => {
  const [settings, setSettings] = useState({
    logo: logo,
    eye: false, //true: right, false: left
    timeTherapy: 0,
    backGround: fondoTest,
    fog: { density: 0.001, color: "" }, //la densidad se gradúa desde 0.001 a 0.005 se recomienda de 0.001 a 0.003
    sizeTV: "normal",
    stateVideo: false,
  });

  const [attachVideo, error, videoRef] = useHlsVideo();

  return (
    <div className="player-main">
      <Container className="player-menu">
        <Row>
          <MenuConfig
            videoError={error}
            settings={settings}
            setSettings={setSettings}
            attachVideo={attachVideo}
          />
        </Row>
      </Container>
      <Player settings={settings} videoRef={videoRef} error={error} />
    </div>
  );
};

export default PlayerMain;
