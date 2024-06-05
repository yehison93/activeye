import { parse } from "iptv-playlist-parser";
import { useState, useEffect } from "react";

export const useM3uToJson = ({ m3uFile }) => {
  const [parsed, setParsed] = useState();
  useEffect(() => {
    setParsed(parse(m3uFile));
  }, [m3uFile]);

  console.log(parsed.items);

  return [parsed];
};
