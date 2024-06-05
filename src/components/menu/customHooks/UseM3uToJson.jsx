import { parse } from "iptv-playlist-parser";

const useM3uToJson = ({ m3uFile }) => {
  const parsed = parse(m3uFile);

  return [parsed.items];
};

export default useM3uToJson;
