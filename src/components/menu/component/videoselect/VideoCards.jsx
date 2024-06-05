/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import * as Flags from "country-flag-icons/react/3x2";

const VideoCards = ({ items, toggle, setNameChannel }) => {
  const SpecificFlag = Flags[items.tvg.id.split(".")[1].toUpperCase()];

  return (
    <>
      <Card
        onClick={() => {
          toggle(items.url);
          setNameChannel(items.name);
        }}
        className="text-light m-auto p-0"
        style={{
          width: "150px",
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
          <SpecificFlag style={{ width: "1em" }} />
        </Card.Footer>
      </Card>
    </>
  );
};

export default VideoCards;
