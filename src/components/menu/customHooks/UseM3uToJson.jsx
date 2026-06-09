import { parse } from "iptv-playlist-parser";
import { useState, useEffect } from "react";

const useM3uToJson = ({ m3uFile }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        if (Array.isArray(m3uFile)) {
          const texts = await Promise.all(
            m3uFile.map(async (u) => {
              try {
                const res = await fetch(u);
                if (!res.ok) return "";
                return await res.text();
              } catch (e) {
                console.warn("Failed to fetch IPTV list:", u, e);
                return "";
              }
            })
          );
          const combined = texts.join("\n");
          const parsed = parse(combined || "");
          if (!cancelled) setItems(parsed.items || []);
        } else if (typeof m3uFile === "string") {
          const parsed = parse(m3uFile.replace(/\r\n/g, "\n"));
          if (!cancelled) setItems(parsed.items || []);
        } else {
          setItems([]);
        }
      } catch (e) {
        console.error("Error parsing IPTV lists:", e);
        if (!cancelled) setItems([]);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [m3uFile]);

  return [items];
};

export default useM3uToJson;
