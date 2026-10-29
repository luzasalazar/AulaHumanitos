import { useEffect, useRef, useState } from 'react';

interface BodyVideoProps {
  src: string;
}

/** Tiempo máximo que esperamos a que termine un salto antes de forzar el siguiente. */
const SEEK_TIMEOUT_MS = 400;

function mimeFromSrc(src: string) {
  return src.toLowerCase().split('?')[0].endsWith('.webm') ? 'video/webm' : 'video/mp4';
}

export default function BodyVideo({ src }: BodyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSeekingRef = useRef(false);
  // Último destino pedido por la barra que todavía no se aplicó al video.
  const pendingTimeRef = useRef<number | null>(null);
  // Cuándo empezó el último salto (para detectar uno que nunca termina).
  const seekStartedAtRef = useRef(0);
  const retryTimerRef = useRef<number | null>(null);
  // Si el video se estaba reproduciendo al empezar a arrastrar la barra.
  const wasPlayingRef = useRef(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  /**
   * Carga el archivo completo en memoria y lo reproduce desde una URL `blob:`.
   * En la app de escritorio el video lo sirve el protocolo interno de Tauri,
   * que puede no responder a peticiones por rangos (Range), y sin eso el
   * navegador no puede saltar a otra posición. Una URL `blob:` la sirve el
   * propio navegador y siempre permite saltar.
   */
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    setVideoUrl(null);
    setUnavailable(false);

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const typed = blob.type ? blob : new Blob([blob], { type: mimeFromSrc(src) });
        objectUrl = URL.createObjectURL(typed);
        setVideoUrl(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  useEffect(
    () => () => {
      if (retryTimerRef.current !== null) window.clearTimeout(retryTimerRef.current);
    },
    [],
  );

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    setDuration(video.duration);
    video.pause();
    video.currentTime = video.duration / 2;
    setProgress(0.5);
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || isSeekingRef.current || !Number.isFinite(video.duration) || video.duration <= 0) return;
    // Mientras haya un salto en curso o pendiente, currentTime va por detrás
    // de la barra: no lo usamos para mover la barra o "saltaría" hacia atrás.
    if (video.seeking || pendingTimeRef.current !== null) return;
    setProgress(video.currentTime / video.duration);
  };

  /**
   * Aplica el destino pendiente solo si no hay otro salto en curso. Si lo hay,
   * se queda pendiente y `onSeeked` lo aplicará apenas termine. Así no
   * cancelamos saltos a medias y el navegador alcanza a pintar fotogramas
   * mientras se arrastra la barra. Si un salto lleva demasiado sin terminar,
   * se considera atascado y se permite el siguiente.
   */
  const applyPendingSeek = () => {
    const video = videoRef.current;
    const target = pendingTimeRef.current;
    if (!video || target === null) return;

    const stuck = video.seeking && performance.now() - seekStartedAtRef.current > SEEK_TIMEOUT_MS;
    if (video.seeking && !stuck) return;

    pendingTimeRef.current = null;
    seekStartedAtRef.current = performance.now();
    video.currentTime = target;
  };

  const handleSeek = (value: number) => {
    setProgress(value);
    if (duration <= 0) return;
    pendingTimeRef.current = value * duration;
    applyPendingSeek();

    // Red de seguridad: si quedó un destino pendiente y `seeked` nunca llega,
    // lo reintentamos poco después.
    if (retryTimerRef.current !== null) window.clearTimeout(retryTimerRef.current);
    retryTimerRef.current = window.setTimeout(applyPendingSeek, SEEK_TIMEOUT_MS + 50);
  };

  const handleScrubStart = () => {
    const video = videoRef.current;
    isSeekingRef.current = true;
    if (video && !video.paused) {
      wasPlayingRef.current = true;
      video.pause();
    }
  };

  const handleScrubEnd = () => {
    const video = videoRef.current;
    isSeekingRef.current = false;
    if (video && wasPlayingRef.current) {
      wasPlayingRef.current = false;
      video.play().catch(() => setIsPlaying(false));
    }
  };

  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.ended) video.currentTime = 0;
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const handleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.fullscreenElement === video) {
        await document.exitFullscreen();
      } else {
        await video.requestFullscreen();
      }
    } catch {
      // Pantalla completa puede no estar disponible en algunos entornos integrados.
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex h-[480px] w-full items-center justify-center bg-black">
        <video
          ref={videoRef}
          className="body-video h-full w-full object-cover"
          src={videoUrl ?? undefined}
          muted
          playsInline
          preload="auto"
          aria-label="Video educativo del sistema del cuerpo humano"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onSeeked={applyPendingSeek}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => setUnavailable(true)}
        />
        {!videoUrl && !unavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <p className="font-montserrat text-sm text-white">Cargando video…</p>
          </div>
        )}
        {unavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#EAF5E1] px-8 text-center">
            <p className="max-w-md font-montserrat text-sm text-negro-suave/70">
              Este video todavía no está disponible. Agrega el archivo correspondiente en
              <span className="mt-2 block font-semibold">public/videos/cuerpo-humano/</span>
            </p>
          </div>
        )}
      </div>

      <div className="bg-white px-5 py-4 sm:px-8">
        <p className="mb-3 text-center font-poppins text-sm font-semibold text-morado">
          ¡Arrastra la barra hacia adelante o atrás para girar el cuerpo!
        </p>
        <label className="sr-only" htmlFor="body-video-progress">
          Posición del video
        </label>
        <input
          id="body-video-progress"
          className="body-video-progress h-3 w-full cursor-pointer touch-pan-y appearance-none rounded-full bg-[#E7E3ED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-morado"
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          style={{ background: `linear-gradient(to right, #882B8E ${progress * 100}%, #E7E3ED ${progress * 100}%)` }}
          disabled={duration <= 0}
          onChange={(event) => handleSeek(Number(event.currentTarget.value))}
          onPointerDown={handleScrubStart}
          onPointerUp={handleScrubEnd}
          onPointerCancel={handleScrubEnd}
          aria-valuetext={duration > 0 ? `${Math.round(progress * 100)} % del video` : 'Cargando video'}
        />

        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-amarillo px-4 text-morado shadow-sm transition hover:bg-[#E8CE3D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarillo"
            onClick={handlePlayPause}
            disabled={duration <= 0}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            title={isPlaying ? 'Pausar video' : 'Reproducir video'}
          >
            {isPlaying ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-morado text-morado transition hover:bg-[#F7EFF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-morado"
            onClick={handleFullscreen}
            disabled={duration <= 0}
            aria-label="Ver video en pantalla completa"
            title="Ver video en pantalla completa"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
