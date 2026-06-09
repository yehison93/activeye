import { m3uFile } from "./iptvList.js";

export const preloadedLists = [
  {
    name: "Pluto TV (incluido)",
    type: "inline",
    m3u: m3uFile,
  },
  {
    name: "TDTChannels (España)",
    type: "url",
    url: "https://tdtchannels.github.io/tdtchannels/tdtchannels.m3u",
  },
  {
    name: "Lista de prueba (vacía)",
    type: "inline",
    m3u: "#EXTM3U\n",
  },
];
