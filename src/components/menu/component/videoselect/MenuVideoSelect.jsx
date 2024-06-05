/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import VideoCards from "./VideoCards";
import useM3uToJson from "../../customHooks/UseM3uToJson";
import { m3uFile } from "../../../../assets/kidsList";
import { useState, useEffect } from "react";
import useForm from "../../customHooks/UseForm";

const MenuVideoSelect = ({ toggle, videoError }) => {
  const [parsed] = useM3uToJson({ m3uFile });
  const [channels, onChange] = useForm(parsed);
  const [selectVideo, setSelectVideo] = useState(false);
  const [nameChannel, setNameChannel] = useState("");

  useEffect(() => {
    if (!videoError) {
      setSelectVideo(true);
    } else {
      setSelectVideo(false);
    }
  }, [videoError]);

  return (
    <Container className="justify-content-center">
      <Row style={{ position: "sticky", top: "0", zIndex: "2" }}>
        <Card
          className="bg-transparent border-0 text-light p-0 mx-auto my-3"
          style={{ width: "100%", boxShadow: "0 0 10px #000" }}
        >
          <Card.Header style={{ backgroundColor: "var(--colorone-degrade)" }}>
            <h2 className="text-center">Selecciona un canal</h2>
          </Card.Header>
          <Card.Footer
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

            <Button
              style={{
                backgroundColor: "var(--colortwo)",
                fontSize: "1.5em",
              }}
              hidden={!selectVideo}
            >
              {`${nameChannel} esta listo`}
            </Button>
          </Card.Footer>
        </Card>
      </Row>

      <Row xs={2} sm={3} md={"auto"} className="p-0 m-0">
        {channels.map((item, index) => {
          return (
            <>
              <Col className="py-2">
                <VideoCards
                  key={`${index}${item.name.split(" ").join("")}`}
                  items={item}
                  toggle={toggle}
                  setNameChannel={setNameChannel}
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
