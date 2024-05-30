import "./App.css";
import Player from "./components/player/Player";
const url =
  "https://venevision.akamaized.net/hls/live/2098814/VENEVISION/master.m3u8";

const eye = (key) => {
  switch (key) {
    case "left":
      return "eye: left";
    case "right":
      return "eye: right";
    default:
      return "eye: right";
  }
};

function App() {
  return <Player url={url} eye={eye("right")} />;
}

export default App;
