import ReactHlsPlayer from "react-hls-player";

const HslPlayer = () => {
  return (
    <ReactHlsPlayer
      src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
      autoPlay={true}
      controls={true}
      muted={true}
      width="100%"
      height="auto"
      hlsConfig={{
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        lowLatencyMode: true,
      }}
    />
  );
};

export default HslPlayer;
