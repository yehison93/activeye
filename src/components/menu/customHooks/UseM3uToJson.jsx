import { parse } from "iptv-playlist-parser";
import { useState, useEffect } from "react";

const useM3uToJson = ({ m3uFile, m3uUrl }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const parseAndSet = (text) => {
      try {
        const parsed = parse(text.split("/n").join(""));
        setItems(parsed.items || []);
      } catch (e) {
        setItems([]);
      }
    };

    if (m3uFile) {
      parseAndSet(m3uFile);
    } else if (m3uUrl) {
      fetch(m3uUrl)
        .then((res) => res.text())
        .then((txt) => {
          if (!cancelled) parseAndSet(txt);
        })
        .catch(() => {
          if (!cancelled) setItems([]);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [m3uFile, m3uUrl]);

  return [items];
};

export default useM3uToJson;
