import "aframe";

const PlayerVr = () => {
  return (
    <a-scene>
      <a-assets>
        <video
          id="videoiptv"
          autoPlay
          src="https://vcp2.myplaytv.com/valetv/valetv/playlist.m3u8"
        ></video>
      </a-assets>

      <a-videosphere
        src="#videoiptv"
        width="16"
        height="9"
        position="0 0 -20"
      ></a-videosphere>
    </a-scene>
  );
};

export default PlayerVr;
