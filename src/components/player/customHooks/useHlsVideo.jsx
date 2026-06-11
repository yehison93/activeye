import { useRef, useState, useEffect } from "react";
import Hls from "hls.js";

const ruidoTV = "../../../assets/ruidoTV.mp4";

const hlsConfig = {
  autoStartLoad: true,
  startPosition: -1,
  capLevelOnFPSDrop: false,
  initialLiveManifestSize: 3,
  maxBufferLength: 30,
  maxMaxBufferLength: 600,
  maxBufferHole: 0.5,
  liveSyncDurationCount: 3,
  enableWorker: true,
  enableSoftwareAES: true,
  fragLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 9000,
      maxLoadTimeMs: 100000,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0,
      },
      errorRetry: {
        maxNumRetry: 10,
        retryDelayMs: 1000,
        maxRetryDelayMs: 15000,
        backoff: "linear",
      },
    },
  },
  lowLatencyMode: true,
  fpsDroppedMonitoringPeriod: 5000,
  fpsDroppedMonitoringThreshold: 0.2,
  appendErrorMaxRetry: 3,
  abrEwmaFastLive: 3.0,
  abrEwmaSlowLive: 9.0,
  abrEwmaDefaultEstimate: 500000,
  abrBandWidthFactor: 0.95,
  abrBandWidthUpFactor: 0.7,
  maxStarvationDelay: 4,
  maxLoadingDelay: 4,
};

const useHlsVideo = () => {
  const playerRef = useRef(null);
  const [error, setError] = useState(true);

  // FIX 1: retryCount y retryTime como refs en lugar de useState.
  // Con useState, el .catch() de playVideo() capturaba el valor inicial del estado
  // (0 y 1000) congelado en el closure — nunca incrementaba correctamente,
  // por lo que el limite de reintentos nunca se alcanzaba y la app se colgaba
  // reintentando indefinidamente sin llegar al fallback.
  const retryCountRef = useRef(0);
  const retryTimeRef = useRef(1000);
  const maxRetries = 5;

  // FIX 2: guardar la instancia HLS para destruirla al cambiar de canal.
  // Sin esto, cada attachVideo() creaba una nueva instancia Hls que quedaba
  // activa en memoria: múltiples instancias competían por el mismo elemento
  // <video>, causando conflictos de buffer, audio duplicado y freezes.
  const hlsRef = useRef(null);

  const playFallbackVideo = () => {
    playerRef.current.src = ruidoTV;
    playerRef.current.loop = true;
    setError(true);
  };

  const playVideo = () => {
    // FIX 3: eliminar el .load() antes de .play() en streams HLS.
    // En IPTV live, llamar .load() reinicia el buffer que HLS.js ya estaba
    // llenando, provocando un bucle donde el video nunca arrancaba porque
    // siempre se reseteaba antes de tener suficientes datos para reproducir.
    playerRef.current.muted = false;
    playerRef.current
      .play()
      .then(() => {
        setError(false);
        retryCountRef.current = 0;
        retryTimeRef.current = 1000;
      })
      .catch((err) => {
        if (retryCountRef.current < maxRetries) {
          console.error("Playback error:", err);
          setTimeout(playVideo, retryTimeRef.current);
          retryCountRef.current += 1;
          retryTimeRef.current += 1000;
        } else {
          playFallbackVideo();
        }
      });
  };

  const attachVideo = (url) => {
    setError(true);

    // FIX 4: destruir la instancia HLS anterior antes de crear una nueva.
    // Sin este destroy(), al cambiar de canal la instancia anterior seguía
    // activa: descargaba segmentos del canal viejo, los metía en el buffer
    // del <video> mezclados con los del canal nuevo, causando que el video
    // se congelara, mostrara el canal equivocado o no cargara del todo.
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    retryCountRef.current = 0;
    retryTimeRef.current = 1000;

    if (url) {
      playerRef.current.loop = false;
      playerRef.current.muted = true;

      if (Hls.isSupported()) {
        const hls = new Hls(hlsConfig);
        hls.loadSource(url.trim());
        hls.attachMedia(playerRef.current);
        hlsRef.current = hls;

        // FIX 5: esperar el evento MANIFEST_PARSED antes de llamar play().
        // Antes se llamaba playVideo() inmediatamente después de attachMedia(),
        // cuando HLS.js aún no había descargado ni parseado el manifiesto m3u8.
        // El <video> no tenía fuente válida todavía, .play() fallaba, agotaba
        // los reintentos y caía al fallback aunque el canal estuviera bien.
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          playVideo();
        });

        // Manejo de errores fatales de HLS — recuperación automática
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // Error de red: intentar recuperar
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                // Error de media: intentar recuperar el buffer
                hls.recoverMediaError();
                break;
              default:
                // Error irrecuperable: fallback
                playFallbackVideo();
                break;
            }
          }
        });
      } else {
        // Safari: soporta HLS nativo
        playerRef.current.src = url;
        playerRef.current.type = "application/x-mpegURL";
        playVideo();
      }
    }

    playerRef.current.onerror = (event) => {
      if (event.target.error?.code === 3 || event.target.error?.code === 4) {
        playVideo();
      } else {
        playFallbackVideo();
      }
    };
  };

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (playerRef.current) {
        playerRef.current.onerror = null;
      }
    };
  }, []);

  return [attachVideo, error, playerRef];
};

export default useHlsVideo;
