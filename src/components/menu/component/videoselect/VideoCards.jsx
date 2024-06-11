/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalAlert from "./ModalAlert";
import { Button, Card } from "react-bootstrap";
import { useWakeLock } from "react-screen-wake-lock";

const VideoCards = ({
  items,
  setNameChannel,
  attachVideo,
  settings,
  setSettings,
  setViewButtonVideo,
}) => {
  const { released, request, release } = useWakeLock();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const url = () => {
    if (items.url.includes("r.mjh.nz")) {
      return `/api/v1/stitch/embed/hls/channel/${items.tvg.id}/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus&`;
    } else {
      return items.url;
    }
  };

  const toogle = () => {
    attachVideo(url());
    released === false ? release() : request();
    setNameChannel(items.name);
    setSettings({ ...settings, stateVideo: true });
    setViewButtonVideo(true);
  };

  const showTV = () => {
    if (!items.group.title.toLowerCase().includes("kids")) {
      setShowModal(true);
    } else {
      toogle();
    }
  };

  return (
    <>
      <ModalAlert
        show={showModal}
        handleClose={handleCloseModal}
        modalAction={toogle}
      />
      <Button
        variant="outline-light"
        className="button-video-cards"
        style={{
          border: "none",
          width: "100%",
        }}
        onClick={() => showTV()}
      >
        <Card
          className="text-light m-auto p-0"
          style={{
            maxWidth: "150px",
            backgroundColor: "transparent",
            boxShadow: "0 0 10px #000",
          }}
        >
          <Card.Header
            style={{
              backgroundColor: "var(--colorone-degrade)",
            }}
          >
            {items.group.title.split(";").join(", ")}
          </Card.Header>
          <Card.Body
            style={{
              width: "100%",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Img
              src={items.tvg.logo}
              alt={`logo del canal ${items.name}`}
              style={{
                opacity: 0.9,
                width: "100px",
                height: "auto",
                margin: "0 auto",
                padding: 0,
              }}
              loading="lazy"
            />
          </Card.Body>

          <Card.Footer
            className="text-center"
            style={{
              backgroundColor: "var(--colortwo-degrade)",
              height: "90px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {`${items.name} `}
          </Card.Footer>
        </Card>
      </Button>
    </>
  );
};

export default VideoCards;
