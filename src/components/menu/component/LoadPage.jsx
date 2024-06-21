/* eslint-disable react/prop-types */
import { Container, Card, Spinner } from "react-bootstrap";

const LoadPage = ({ settings }) => {
  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        position: "relative",
        zIndex: 5,
      }}
    >
      <Card
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          paddingBottom: "100px",
        }}
      >
        <Card.Header className="text-center">
          <h1>ActivEye</h1>
        </Card.Header>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Img
            src={settings.logo}
            variant="top"
            alt="logo ActiEye"
            style={{ maxWidth: "200px", height: "200px" }}
          />
          <Card.Title className="text-center">Cargando...</Card.Title>
          <Spinner animation="border" variant="info" size="xxl" />
        </Card.Body>
        <Card.Footer className="text-center">
          Disfruta de la aplicación
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoadPage;
