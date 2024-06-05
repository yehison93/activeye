/* eslint-disable react/prop-types */
import { Container } from "react-bootstrap";
import MenuVideoSelect from "./videoselect/MenuVideoSelect";

const MenuConfig = ({ parsed, toggle, videoError }) => {
  return (
    <Container>
      <MenuVideoSelect
        parsed={parsed}
        toggle={toggle}
        videoError={videoError}
      />
    </Container>
  );
};

export default MenuConfig;
