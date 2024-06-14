/* eslint-disable react/prop-types */
import { Card, Col, Row, Form } from "react-bootstrap";

const AdditionalConfig = ({ settings, setSettings }) => {
  const backGrounds = import.meta.glob("../../../../assets/backgroundScenes/*");
  return (
    <>
      <Card.Body className="text-light">
        <Form.Group className="mb-3">
          <Form.Label>Tamaño del TV</Form.Label>
          <Form.Select
            onChange={(e) =>
              setSettings({
                ...settings,
                sizeTV: e.target.value,
              })
            }
          >
            <option>Selecciona el tamaño del TV </option>
            <option value={"small"}>40 pulgadas (normal) </option>
            <option value={"normal"}>60 pulgadas (grande) </option>
            <option value={"big"}>80 pulgadas (muy grande)</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Posición del TV</Form.Label>
          <Form.Select
            onChange={(e) =>
              setSettings({
                ...settings,
                positionTV: e.target.value,
              })
            }
          >
            <option>Selecciona la altura del TV </option>
            <option value={"1.5"}>Sentado normal (normal)</option>
            <option value={"5"}>Reclinado (alto)</option>
            <option value={"10"}>Acostado (muy alto)</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Selecciona la imagen del entorno</Form.Label>
          <Form.Select
            onChange={async (e) => {
              const importFunc = backGrounds[e.target.value];
              if (importFunc) {
                const image = await importFunc();
                setSettings({
                  ...settings,
                  backGround: image.default,
                });
              }
            }}
          >
            <option>Selecciona un fondo </option>
            {Object.keys(backGrounds).map((item, index) => (
              <option key={(item, index)} value={item}>
                {item
                  .split("/")
                  .reduce((x, y) => y)
                  .split(".")[0]
                  .split("-")
                  .join(" ")}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Card>
            <Card.Header>
              <Form.Label>Opciones de luz de fondo</Form.Label>
            </Card.Header>
            <Card.Body>
              <Row xs={1} sm={2}>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Selecciona un color</Form.Label>
                    <Form.Select
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          fog: {
                            ...settings.fog,
                            color: e.target.value,
                          },
                        })
                      }
                      style={{ backgroundColor: settings.fog.color }}
                    >
                      <option>Color</option>
                      {[
                        "white",
                        "black",
                        "red",
                        "blue",
                        "green",
                        "yellow",
                        "purple",
                        "orange",
                        "pink",
                        "brown",
                        "grey",
                        "cyan",
                        "magenta",
                        "lime",
                        "maroon",
                        "navy",
                        "olive",
                        "teal",
                        "aqua",
                        "blueviolet",
                        "brown",
                        "burlywood",
                        "cadetblue",
                        "chartreuse",
                        "chocolate",
                        "coral",
                        "cornflowerblue",
                        "crimson",
                        "cyan",
                        "darkblue",
                        "darkcyan",
                        "darkgoldenrod",
                        "darkgray",
                        "darkgreen",
                        "darkkhaki",
                        "darkmagenta",
                        "darkolivegreen",
                        "darkorange",
                        "darkorchid",
                        "darkred",
                        "darksalmon",
                        "darkseagreen",
                        "darkslateblue",
                        "darkslategray",
                        "darkturquoise",
                        "darkviolet",
                        "deeppink",
                        "deepskyblue",
                        "dimgray",
                        "dimgrey",
                        "dodgerblue",
                        "firebrick",
                        "forestgreen",
                        "fuchsia",
                        "gainsboro",
                        "ghost",
                      ].map((item, index) => (
                        <option
                          key={(item, index)}
                          value={item}
                          style={{
                            backgroundColor: item,
                            color: item === "white" ? "black" : "white",
                          }}
                        >
                          {item.toUpperCase()}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Intensidad</Form.Label>
                  <Form.Range
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        fog: {
                          ...settings.fog,
                          density: e.target.value,
                        },
                      });
                    }}
                    min={0}
                    max={0.002}
                    step={0.000000005}
                    defaultValue={0.001}
                    type="form-range"
                    title="selecciona la intensidad"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Form.Group>
      </Card.Body>
    </>
  );
};

export default AdditionalConfig;
