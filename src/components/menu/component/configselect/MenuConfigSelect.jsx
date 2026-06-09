/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Form, Button, Card, Stack, Alert } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import { ChevronUp } from "react-bootstrap-icons";
import AdditionalConfig from "./AdditionalConfig";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { HeadsetVr } from "react-bootstrap-icons";
import useFullScreen from "../../../player/customHooks/useFullScreen";

const MenuConfigSelect = ({
  settings,
  setSettings,
  setShowMenu,
  timeOut,
  iptvSources,
  setIptvSources,
}) => {
  var sceneEl = document.querySelector("a-scene");

  const [addonsButton, setAddonsButton] = useState(false);
  const [viewSettings, setViewSettings] = useState(false);

  const [localSources, setLocalSources] = useState(iptvSources || []);
  const [newSource, setNewSource] = useState("");

  // sync when prop changes
  useEffect(() => {
    setLocalSources(iptvSources || []);
  }, [iptvSources]);

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
              animation: "pulse 1s infinite",
            }}
            hidden={
              !settings.eye ||
              !settings.timeTherapy ||
              settings.timeTherapy === 0
            }
            onClick={() => {
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
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    eye: e.target.value,
                  });
                }}
              >
                <option value="">Selecciona el ojo no parchado </option>
                <option value={"right"}>Derecho </option>
                <option value={"left"}>Izquierdo </option>
              </Form.Select>
            </Form.Group>
            <Form.Group hidden={settings.modeVR} className="mb-3">
              <Form.Label>Duración de la terapia</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    timeTherapy: e.target.value,
                  });
                }}
              >
                <option value="">Selecciona el tiempo de duración </option>
                <option value={1}>1 minuto (solo para pruebas)</option>
                {[30, 45, 60, 90, 120].map((time) => (
                  <option key={time} value={time}>
                    {time} minutos
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>IPTV Sources (M3U/M3U8 URLs)</Form.Label>

              {localSources.length === 0 ? (
                <div className="text-muted mb-2">No hay URLs configuradas.</div>
              ) : (
                localSources.map((s, idx) => (
                  <Stack direction="horizontal" gap={2} key={idx} className="mb-2">
                    <Form.Control
                      value={s}
                      onChange={(e) => {
                        const updated = [...localSources];
                        updated[idx] = e.target.value;
                        setLocalSources(updated);
                      }}
                    />
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        setLocalSources(localSources.filter((_, i) => i !== idx));
                      }}
                    >
                      Eliminar
                    </Button>
                  </Stack>
                ))
              )}

              <Stack direction="horizontal" gap={2} className="mt-2">
                <Form.Control
                  placeholder="https://example.com/list.m3u8"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (newSource && newSource.trim() !== "") {
                      setLocalSources([...localSources, newSource.trim()]);
                      setNewSource("");
                    }
                  }}
                >
                  Agregar
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    setIptvSources(localSources);
                  }}
                >
                  Guardar
                </Button>
              </Stack>
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
