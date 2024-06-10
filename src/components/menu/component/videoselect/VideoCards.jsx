/* eslint-disable react/prop-types */
import { Button, Card } from "react-bootstrap";
import * as Flags from "country-flag-icons/react/3x2";
import useFullScreen from "../../../player/customHooks/useFullScreen";
import { useWakeLock } from "react-screen-wake-lock";

const VideoCards = ({
  items,
  setNameChannel,
  attachVideo,
  settings,
  setSettings,
  setViewButtonVideo,
}) => {
  // const SpecificFlag = Flags[items.tvg.id.split(".")[1].toUpperCase()];
  const [triggerFull] = useFullScreen(null);
  const { released, request, release } = useWakeLock();

  return (
    <>
      <Button
        variant="outline-light"
        className="button-video-cards"
        style={{
          border: "none",
          width: "100%",
        }}
        onClick={() => {
          attachVideo(items.url);
          // triggerFull();
          released === false ? release() : request();
          setNameChannel(items.name);
          setSettings({ ...settings, stateVideo: true });
          setViewButtonVideo(true);
        }}
      >
        <Card
          className="text-light m-auto p-0"
          style={{
            minWidth: "100%",
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
              style={{
                opacity: 0.9,
                width: "100px",
                height: "auto",
                margin: "0 auto",
                padding: 0,
              }}
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
            <br />
            {/* <SpecificFlag style={{ width: "1em" }} /> */}
          </Card.Footer>
        </Card>
      </Button>
    </>
  );
};

export default VideoCards;
