import { useState } from 'react';

interface BodyVideoProps {
  src: string;
}

export default function BodyVideo({ src }: BodyVideoProps) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black">
      <video
        className="body-video h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        controls
        playsInline
        preload="metadata"
        aria-label="Video educativo del sistema del cuerpo humano"
        onError={() => setUnavailable(true)}
      />
      {unavailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#EAF5E1] px-8 text-center">
          <p className="max-w-md font-montserrat text-sm text-negro-suave/70">
            Este video todavía no está disponible. Agrega el archivo correspondiente en
            <span className="mt-2 block font-semibold">public/videos/cuerpo-humano/</span>
          </p>
        </div>
      )}
    </div>
  );
}
