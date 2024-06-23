/* eslint-disable react/prop-types */
import { Container, Card, Spinner } from "react-bootstrap";

const LoadPage = ({ settings }) => {
  return (
    <Container
      fluid
      style={{
        padding: "10px",
        position: "absolute",
        zIndex: 5,
        backgroundColor: "white",
      }}
    >
      <Card
        style={{
          width: "100%",
          height: "100vh",
          margin: "auto",
          boxShadow: "0 0 10px #000",
          textAlign: "center",
        }}
      >
        <Card.Header
          style={{ backgroundColor: "var(--colortwo)", color: "white" }}
        >
          <h1>ActivEye</h1>
        </Card.Header>
        <Card.Body className="m-auto  d-flex flex-column justify-content-center align-items-center ">
          <Card.Img
            className="logo-load"
            src={settings.logo}
            alt="logo ActiEye"
          />
          <Card.Title className="text-center">Cargando...</Card.Title>
          <Spinner animation="border" variant="info" size="xxl" />
        </Card.Body>
        <Card.Footer
          style={{ backgroundColor: "var(--colorone)", color: "white" }}
        >
          Disfruta de la aplicación
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoadPage;
