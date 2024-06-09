/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import VideoCards from "./VideoCards";
import useM3uToJson from "../../customHooks/UseM3uToJson";
import { m3uFile } from "../../../../assets/kidsList";
import { useState } from "react";
import useForm from "../../customHooks/UseForm";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";

const MenuVideoSelect = ({
  videoError,
  setViewConfig,
  settings,
  attachVideo,
  setSettings,
}) => {
  const [parsed] = useM3uToJson({ m3uFile });
  const [channels, onChange] = useForm(parsed);
  const [nameChannel, setNameChannel] = useState("");
  const [viewVideoSelect, setViewVideoSelect] = useState(false);
  const [viewButtonVideo, setViewButtonVideo] = useState(false);

  return (
    <Container>
      <Row style={{ position: "sticky", top: "0", zIndex: "2" }}>
        <Card
          className="bg-transparent border-0 text-light p-0 mx-auto my-1"
          style={{ width: "100%", boxShadow: "0 0 10px #000" }}
        >
          <Card.Header
            style={{
              backgroundColor: "var(--colorone-degrade)",
              textAlign: "center",
            }}
          >
            <Stack
              direction="horizontal"
              gap={3}
              style={{ justifyContent: "center" }}
            >
              <h2 className="text-center">Selecciona un canal</h2>
              <Button
                variant="outline-link"
                style={{ border: "none" }}
                onClick={() => setViewVideoSelect(!viewVideoSelect)}
              >
                {viewVideoSelect ? <Eye /> : <EyeSlash />}
              </Button>
            </Stack>
            <Button
              style={{
                backgroundColor: "var(--colorone)",
                color: "white",
                fontSize: "1rem",
                animation: !videoError ? "pulse 1s infinite" : "none",
              }}
              disabled={videoError}
              hidden={!viewButtonVideo || videoError}
              onClick={() => {
                setViewConfig(true);
                setViewVideoSelect(true);
                setViewButtonVideo(false);
              }}
            >
              {!videoError ? `${nameChannel} listo` : "ningún canal listo"}
            </Button>
          </Card.Header>
          <Card.Footer
            hidden={viewVideoSelect}
            className="text-center"
            style={{ backgroundColor: "var(--colortwo-degrade)" }}
          >
            <FloatingLabel
              controlId="floatingInput"
              label="Busca aquí y selecciona un canal"
              className="fs-5 text-dark"
            >
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e) => onChange(e.target.value)}
              />
            </FloatingLabel>
          </Card.Footer>
        </Card>
      </Row>

      <Row
        hidden={viewVideoSelect}
        xs={2}
        sm={3}
        md={"auto"}
        style={{ justifyContent: "center" }}
      >
        {channels.map((item) => {
          return (
            <>
              <Col className="py-1">
                <VideoCards
                  key={uuidv4()}
                  items={item}
                  setNameChannel={setNameChannel}
                  attachVideo={attachVideo}
                  settings={settings}
                  setSettings={setSettings}
                  setViewButtonVideo={setViewButtonVideo}
                />
              </Col>
            </>
          );
        })}
      </Row>
    </Container>
  );
};

export default MenuVideoSelect;
