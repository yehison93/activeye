/* eslint-disable react/prop-types */
import { Container, Row } from "react-bootstrap";
import MenuVideoSelect from "./videoselect/MenuVideoSelect";
import MenuConfigSelect from "./configselect/MenuConfigSelect";
import { useState } from "react";

const MenuConfig = ({
  videoError,
  settings,
  setSettings,
  attachVideo,
  setShowMenu,
  timeOut,
  channels,
  onChangeChannels,
  iptvSources,
  setIptvSources,
}) => {
  const [viewConfig, setViewConfig] = useState(false);
  return (
    <Container className="mb-5">
      <Row>
        <MenuVideoSelect
          videoError={videoError}
          setViewConfig={setViewConfig}
          settings={settings}
          attachVideo={attachVideo}
          setSettings={setSettings}
          channels={channels}
          onChangeChannels={onChangeChannels}
        />
      </Row>
      <Row hidden={!viewConfig}>
        <MenuConfigSelect
          settings={settings}
          setSettings={setSettings}
          setShowMenu={setShowMenu}
          timeOut={timeOut}
          iptvSources={iptvSources}
          setIptvSources={setIptvSources}
        />
      </Row>
    </Container>
  );
};

export default MenuConfig;
