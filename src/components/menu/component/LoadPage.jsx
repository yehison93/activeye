/* eslint-disable react/prop-types */
import { Container, Card, Spinner } from "react-bootstrap";

const LoadPage = ({ settings }) => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light"
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: 5,
      }}
    >
      <Card
        className="text-center"
        style={{
          height: "70%",
          width: "90%",
          boxShadow: "0 0 10px #000",
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
          className="card-footer-load-page"
          style={{ backgroundColor: "var(--colorone)", color: "white" }}
        >
          Disfruta de la aplicación
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoadPage;
