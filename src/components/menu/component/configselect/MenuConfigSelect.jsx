/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Button, Card, Stack, Alert } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import { ChevronUp } from "react-bootstrap-icons";
import AdditionalConfig from "./AdditionalConfig";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { HeadsetVr } from "react-bootstrap-icons";
import useFullScreen from "../../../player/customHooks/useFullScreen";

const random = () => {
  return Math.random() * 0.9;
};

const MenuConfigSelect = ({ settings, setSettings, setShowMenu, timeOut }) => {
  var sceneEl = document.querySelector("a-scene");

  const [addonsButton, setAddonsButton] = useState(false);
  const [viewSettings, setViewSettings] = useState(false);

  const [selectSettings, setSelectSettings] = useState({
    eye: false,
    time: false,
  });
  const toggleFullScreen = useFullScreen();

  return (
    <>
      <Card
        className="bg-transparent border-0 text-light p-0 mx-auto my-1"
        style={{
          boxShadow: "0 0 10px #000",
          position: "relative",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "var(--colorone-degrade)",
            position: "sticky",
            top: "0",
            textAlign: "center",
            zIndex: "2",
          }}
        >
          <Stack
            direction="horizontal"
            gap={3}
            style={{ justifyContent: "center" }}
          >
            <h2 className="text-center p-0 my-auto mx-0">Configuraciones</h2>
            <Button
              variant="outline-link text-light"
              style={{ border: "none" }}
              onClick={() => setViewSettings(!viewSettings)}
            >
              {viewSettings ? <Eye /> : <EyeSlash />}
            </Button>
          </Stack>
          <Button
            style={{
              backgroundColor: "var(--colorone)",
              color: "white",
              fontSize: "1rem",
              animation: selectSettings.eye ? "pulse 1s infinite" : "none",
            }}
            hidden={
              !selectSettings.eye ||
              !selectSettings.time ||
              settings.timeTherapy === 0 ||
              !settings.timeTherapy
            }
            onClick={() => {
              setSettings((prevSettings) => ({
                ...prevSettings,
                rotation: `0 ${random()} 0`,
              }));
              setShowMenu(false);
              timeOut(settings.timeTherapy);
              toggleFullScreen();
            }}
            id="myEnterVRButton"
          >
            {` listo `} <HeadsetVr />
          </Button>
        </Card.Header>
        <Card.Body
          className="pb-5"
          hidden={viewSettings}
          style={{ backgroundColor: "var(--colortwo-degrade)" }}
        >
          <Alert variant="info" hidden={!settings.modeVR}>
            Para volver a configurar <strong>ojo a tratar</strong> y{" "}
            <strong>tiempo de terapia</strong> debes{" "}
            <Alert.Link onClick={() => sceneEl.exitVR()}>
              salir del modo VR
            </Alert.Link>
          </Alert>
          <Form>
            <Form.Group hidden={settings.modeVR} className="mb-3">
              <Form.Label>Ojo a tratar</Form.Label>
              <Form.Select
                required
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    eye: e.target.value === "true" ? true : false,
                    rotation: `0 ${random()} 0`,
                  });
                  setSelectSettings({
                    ...selectSettings,
                    eye: true,
                  });
                }}
              >
                <option>Selecciona el ojo no parchado </option>
                <option value={true}>Derecho </option>
                <option value={false}>Izquierdo </option>
              </Form.Select>
            </Form.Group>
            <Form.Group hidden={settings.modeVR} className="mb-3">
              <Form.Label>Duración de la terapia</Form.Label>
              <Form.Select
                required
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    timeTherapy: e.target.value,
                  });
                  setSelectSettings({
                    ...selectSettings,
                    time: true,
                  });
                }}
              >
                <option>Selecciona el tiempo de duración </option>
                <option value={1}>1 minuto (solo para pruebas)</option>
                {[30, 45, 60, 90, 120].map((time) => (
                  <option key={time} value={time}>
                    {time} minutos
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Algunas configuraciones adicionales</Form.Label>
              <Card
                className="bg-transparent border-0 p-0 mx-auto my-1"
                style={{
                  width: "100%",
                  boxShadow: "0 0 10px #000",
                }}
              >
                <Card.Header className="m-0 p-1 px-3 bg-light">
                  <Button
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => setAddonsButton(!addonsButton)}
                    variant="outline-transparent m-0 p-0"
                  >
                    Selecciona tus preferencias
                    <span
                      style={{
                        fontSize: "0.8em",
                      }}
                    >
                      {addonsButton ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown style={{ fontWeight: "bold" }} />
                      )}
                    </span>
                  </Button>
                </Card.Header>
                {addonsButton ? (
                  <AdditionalConfig
                    settings={settings}
                    setSettings={setSettings}
                  />
                ) : null}
              </Card>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default MenuConfigSelect;
