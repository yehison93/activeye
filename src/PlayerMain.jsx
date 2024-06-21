import { useState, useEffect } from "react";

import { Button, Container, Row } from "react-bootstrap";

import useHlsVideo from "./components/player/customHooks/useHlsVideo.jsx";
import useLocalStorage from "./components/player/customHooks/useLocalStorage.jsx";
// import useShake from "./components/menu/customHooks/useShake.jsx";
import usePlaySound from "./components/player/customHooks/usePlaySound.jsx";
import useM3uToJson from "./components/menu/customHooks/UseM3uToJson.jsx";
import { m3uFile } from "./assets/iptvList.js";
import useForm from "./components/menu/customHooks/UseForm.jsx";
import useTimeOut from "./components/menu/customHooks/useTimeOut.jsx";
import useChangeChannels from "./components/player/customHooks/useChangeChannels.jsx";

import Player from "./components/player/Player.jsx";
import MenuConfig from "./components/menu/component/MenuConfig.jsx";

import logo from "./assets/logoambliopa.png";
import FondoDefault from "./assets/backgroundScenes/Sala-Moderna.jpg";
import alertSound from "./assets/alertFinishTherapy.mp3";

import { List, Eyeglasses } from "react-bootstrap-icons";
import LoadPage from "./components/menu/component/LoadPage.jsx";

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
  positionTV: "2",
  stateVideo: false,
  rotation: "0 0 0",
  videoUrl: null,
  videoName: null,
  modeVR: false,
  loadedVR: false,
};

const url = (item) => {
  if (item.url.includes("r.mjh.nz")) {
    const urlApi = `/api/v1/stitch/embed/hls/channel/${item.tvg.id}/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus&`;
    return urlApi;
  } else {
    return item.url;
  }
};

const PlayerMain = () => {
  const [settings, setSettings] = useLocalStorage(defaultSettings, "settings");
  const [hasInitialized, setHasInitialized] = useState(false);

  const [parsed] = useM3uToJson({ m3uFile });
  const [channels, onChangeChannels] = useForm({
    parsed,
    initialSearch: "kids",
  });

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
        loadedVR: false,
      }));
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  const [attachVideo, error, playerRef] = useHlsVideo();

  const [showMenu, setShowMenu] = useState(true);

  const [audioRef, playSound] = usePlaySound();

  const changeChannels = useChangeChannels(
    settings.videoName,
    parsed,
    (item) => {
      const urlChannels = url(item);
      setSettings((prevSettings) => ({
        ...prevSettings,
        videoUrl: urlChannels,
        videoName: item.name,
      }));
      attachVideo(urlChannels);
    }
  );

  //funcion para reanudar el video agitando el dspositivo

  // const funcShake = () => {
  //   attachVideo(settings.stateVideo)
  // };
  //  useShake(settings.stateVideo, funcShake);

  const onTimeOut = (val) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      timeTherapy: 0,
    }));
    if (!val) {
      playSound(alertSound);
    }
  };

  const onTimeInterval = (timeLeft) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      timeTherapy: timeLeft,
    }));
  };

  const [startTime, finishTime] = useTimeOut(onTimeOut, onTimeInterval);

  return (
    <>
      <div hidden={!settings.loadedVR} className="player-main">
        <Button
          style={{
            position: "absolute",
            top: 0,
            right: !settings.eye ? "0" : null,
            left: settings.eye ? "0" : null,
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
            right: settings.eye ? "0" : null,
            left: !settings.eye ? "0" : null,
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
              timeOut={startTime}
              channels={channels}
              onChangeChannels={onChangeChannels}
            />
          </Row>
        </Container>
      </div>
      {!settings.loadedVR ? <LoadPage settings={settings} /> : null}

      <Player
        settings={settings}
        playerRef={playerRef}
        audioRef={audioRef}
        attachVideo={attachVideo}
        changeChannels={changeChannels}
        setSettings={setSettings}
        finishTime={finishTime}
      />
    </>
  );
};

export default PlayerMain;
