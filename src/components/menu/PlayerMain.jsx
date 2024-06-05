import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Player from "../player/Player";
import logo from "../../assets/logoambliopa.png";
import fondoTest from "../../assets/fondoTest.jpg";
import useFullScreen from "../player/customHooks/useFullScreen";
import { useWakeLock } from "react-screen-wake-lock";
import useHlsVideo from "../player/customHooks/useHlsVideo";
import useM3uToJson from "./customHooks/UseM3uToJson.jsx";
import { m3uFile } from "../../assets/kidsList.js";
import MenuConfig from "./component/MenuConfig.jsx";

const eye = (key) => {
  switch (key) {
    case "left":
      return "eye: left";
    case "right":
      return "eye: right";
    default:
      return "eye: right";
  }
}; //la densidad se gradúa desde 0.001 a 0.005
const fog = { density: "0.002", color: "black" };

const PlayerMain = () => {
  const [stateVideo, setStateVideo] = useState(false);
  const [triggerFull] = useFullScreen(null);
  const { released, request, release } = useWakeLock();
  const [attachVideo, error, videoRef] = useHlsVideo();
  const [parsed] = useM3uToJson({ m3uFile });

  const toggle = (url) => {
    setStateVideo(true);
    triggerFull();
    released === false ? release() : request();
    attachVideo(url);
  };

  return (
    <div className="player-main">
      <Container className="player-menu">
        <Row>
          <MenuConfig parsed={parsed} toggle={toggle} videoError={error} />
        </Row>
        <Row>
          <Button id="myEnterVRButton">VR Button</Button>
        </Row>
      </Container>
      <Player
        logo={logo}
        eye={eye("right")}
        background={fondoTest}
        stateVideo={stateVideo}
        fog={fog}
        videoRef={videoRef}
        error={error}
      />
    </div>
  );
};

export default PlayerMain;
