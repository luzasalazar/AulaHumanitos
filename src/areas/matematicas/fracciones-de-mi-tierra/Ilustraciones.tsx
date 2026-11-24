import { useId } from 'react';
import type { Ejercicio } from './datos';

/* Resaltado = color fuerte con borde sólido.
   No resaltado = color pálido con borde punteado (se distingue sin depender solo del color). */

/* Contorno de durazno: redondeado, un poco más ancho que alto y con la hendidura arriba. */
const CONTORNO_DURAZNO =
  "M150 82 C172 60 252 66 254 152 C256 228 206 264 150 264 C94 264 44 228 46 152 C48 66 128 60 150 82 Z";

function Durazno({ total, resaltados }: { total: number; resaltados: number }) {
  const uid = useId().replace(/:/g, "");
  const ids = { forma: `forma-${uid}`, piel: `piel-${uid}`, palido: `palido-${uid}` };
  const cx = 150;
  const cy = 168;
  const r = 150; // más grande que el durazno; el recorte le da la forma
  const punto = (grados: number) => {
    const rad = ((grados - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const sector = (i: number) => {
    const [x1, y1] = punto((i * 360) / total);
    const [x2, y2] = punto(((i + 1) * 360) / total);
    return `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  };
  const indices = Array.from({ length: total }, (_, i) => i);
  // Primero las partes sin colorear, luego las coloreadas para que su borde sólido quede encima.
  const orden = [...indices.filter((i) => i >= resaltados), ...indices.filter((i) => i < resaltados)];
  return (
    <svg viewBox="0 0 300 280" className="h-full w-full" role="img"
      aria-label={`Un durazno dividido en ${total} partes iguales, ${resaltados} coloreadas`}>
      <defs>
        <clipPath id={ids.forma}>
          <path d={CONTORNO_DURAZNO} />
        </clipPath>
        {/* Piel del durazno: amarillo dorado que pasa a naranja y a rojo rosado. */}
        <radialGradient id={ids.piel} cx="105" cy="120" r="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE08A" />
          <stop offset="0.35" stopColor="#FFB45C" />
          <stop offset="0.7" stopColor="#F27A45" />
          <stop offset="1" stopColor="#D4483A" />
        </radialGradient>
        <radialGradient id={ids.palido} cx="105" cy="120" r="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF8EC" />
          <stop offset="1" stopColor="#FBE3D2" />
        </radialGradient>
      </defs>

      <ellipse cx="150" cy="268" rx="88" ry="8" fill="#000" opacity="0.08" />

      <g clipPath={`url(#${ids.forma})`}>
        {orden.map((i) => {
          const activa = i < resaltados;
          return (
            <path
              key={i}
              d={sector(i)}
              fill={activa ? `url(#${ids.piel})` : `url(#${ids.palido})`}
              stroke={activa ? "#8E2F17" : "#C99A7A"}
              strokeWidth={activa ? 4 : 3}
              strokeDasharray={activa ? undefined : "6 5"}
              strokeLinejoin="round"
            />
          );
        })}
        {/* Brillo suave de la piel */}
        <ellipse cx="108" cy="120" rx="26" ry="16" fill="#FFFFFF" opacity="0.28" transform="rotate(-35 108 120)" />
        {/* Hendidura natural del durazno, a la derecha del tallo y separada de las divisiones
            (queda entre las líneas de 0° y 45° cuando hay 4 u 8 partes). */}
        <path d="M152 82 Q172 94 171 130" stroke="#8E2F17" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.35" />
      </g>

      <path d={CONTORNO_DURAZNO} fill="none" stroke="#9C3B1E" strokeWidth="4" strokeLinejoin="round" />

      {/* Tallo y hoja */}
      <path d="M150 84 Q151 64 160 50" stroke="#6B4423" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M158 58 Q196 22 238 44 Q204 82 158 58 Z" fill="#4A9B09" stroke="#2F6A05" strokeWidth="3" strokeLinejoin="round" />
      <path d="M162 57 Q198 46 230 46" stroke="#2F6A05" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Fresa({ activa }: { activa: boolean }) {
  return (
    <g>
      <path
        d="M0,-18 C14,-18 22,-8 18,6 C14,20 4,28 0,30 C-4,28 -14,20 -18,6 C-22,-8 -14,-18 0,-18Z"
        fill={activa ? "#E11D48" : "#F6DDE3"}
        stroke={activa ? "#881337" : "#B58A96"}
        strokeWidth="2.5"
        strokeDasharray={activa ? undefined : "4 3"}
      />
      {[[-6, -4], [6, -4], [0, 4], [-6, 11], [6, 11], [0, 18]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill={activa ? "#FFE9A8" : "#C9A8B1"} />
      ))}
      <path d="M-11,-16 L0,-25 L11,-16 L4,-13 L0,-18 L-4,-13Z" fill="#4A9B09" stroke="#2F6A05" strokeWidth="1.5" />
    </g>
  );
}

function Uchuva({ activa }: { activa: boolean }) {
  return (
    <g>
      <circle
        cx="0" cy="2" r="16"
        fill={activa ? "#F59E0B" : "#F1EBDC"}
        stroke={activa ? "#9A5B00" : "#B7AC8E"}
        strokeWidth="2.5"
        strokeDasharray={activa ? undefined : "4 3"}
      />
      <path d="M0,-24 L9,-12 L16,-4 L-16,-4 L-9,-12Z" fill="#D9C48A" stroke="#8C7A3E" strokeWidth="1.5" />
      <path d="M0,-24 L0,-4" stroke="#8C7A3E" strokeWidth="1.2" />
    </g>
  );
}

function Canasta({ total, resaltados, tipo }: { total: number; resaltados: number; tipo: "fresas" | "uchuvas" }) {
  const columnas = total <= 5 ? total : Math.ceil(total / 2);
  const filas = Math.ceil(total / columnas);
  const ys = filas === 1 ? [105] : [58, 120];
  const nombre = tipo === "fresas" ? "fresas" : "uchuvas";
  return (
    <svg viewBox="0 0 360 270" className="h-full w-full" role="img"
      aria-label={`Una canasta con ${total} ${nombre}, ${resaltados} resaltadas`}>
      {Array.from({ length: total }, (_, i) => {
        const fila = Math.floor(i / columnas);
        const enFila = Math.min(columnas, total - fila * columnas);
        const col = i % columnas;
        const paso = 58;
        const x = 180 + (col - (enFila - 1) / 2) * paso;
        const activa = i < resaltados;
        return (
          <g key={i} transform={`translate(${x} ${ys[fila]}) scale(1.25)`}>
            {tipo === "fresas" ? <Fresa activa={activa} /> : <Uchuva activa={activa} />}
          </g>
        );
      })}
      <path d="M42 152 L318 152 L292 258 L68 258 Z" fill="#C98B4B" stroke="#7A4A1D" strokeWidth="4" strokeLinejoin="round" />
      {[185, 215, 245].map((y) => (
        <line key={y} x1={50 + (y - 152) * 0.25} y1={y} x2={310 - (y - 152) * 0.25} y2={y} stroke="#7A4A1D" strokeWidth="3" opacity="0.55" />
      ))}
      {[100, 150, 210, 260].map((x, i) => (
        <line key={x} x1={x} y1="152" x2={x + (i < 2 ? -8 : 8)} y2="258" stroke="#7A4A1D" strokeWidth="3" opacity="0.4" />
      ))}
      <rect x="30" y="142" width="300" height="20" rx="10" fill="#A8702F" stroke="#7A4A1D" strokeWidth="4" />
    </svg>
  );
}

/* Vista desde arriba: las parcelas cultivadas muestran surcos con matas verdes;
   las no resaltadas son tierra arada pálida con borde punteado. */
function Parcelas({ total, resaltados, columnas }: { total: number; resaltados: number; columnas: number }) {
  const filas = Math.ceil(total / columnas);
  const celda = Math.min(300 / columnas, 190 / filas);
  const ancho = celda * columnas;
  const alto = celda * filas;
  const x0 = (360 - ancho) / 2;
  const y0 = (260 - alto) / 2;
  const margen = 3;
  const lado = celda - margen * 2;
  const surcos = [0.2, 0.4, 0.6, 0.8];
  const matas = [0.17, 0.39, 0.61, 0.83];
  return (
    <svg viewBox="0 0 360 260" className="h-full w-full" role="img"
      aria-label={`Un terreno rectangular dividido en ${total} parcelas iguales, ${resaltados} resaltadas`}>
      {/* Pasto alrededor del terreno */}
      <rect x={x0 - 14} y={y0 - 14} width={ancho + 28} height={alto + 28} rx="14" fill="#A9D46F" stroke="#5E8A2E" strokeWidth="4" />
      {/* Caminos entre parcelas */}
      <rect x={x0 - 2} y={y0 - 2} width={ancho + 4} height={alto + 4} rx="6" fill="#E3CFA0" />
      {Array.from({ length: total }, (_, i) => {
        const col = i % columnas;
        const fila = Math.floor(i / columnas);
        const x = x0 + col * celda + margen;
        const y = y0 + fila * celda + margen;
        const activa = i < resaltados;
        // Surcos horizontales o verticales alternados, como un mosaico de cultivos.
        const horizontal = (col + fila) % 2 === 0;
        const pos = (a: number, b: number) =>
          horizontal ? [x + b * lado, y + a * lado] : [x + a * lado, y + b * lado];
        return (
          <g key={i}>
            <rect
              x={x} y={y} width={lado} height={lado} rx="4"
              fill={activa ? "#8A5A2B" : "#F1E4C6"}
              stroke={activa ? "#2F6A05" : "#B7A06A"}
              strokeWidth={activa ? 3 : 2.5}
              strokeDasharray={activa ? undefined : "6 4"}
            />
            {surcos.map((a) => {
              const [xa, ya] = pos(a, 0.1);
              const [xb, yb] = pos(a, 0.9);
              return (
                <line key={a} x1={xa} y1={ya} x2={xb} y2={yb}
                  stroke={activa ? "#6B4220" : "#D6C094"} strokeWidth={activa ? lado * 0.1 : 2} strokeLinecap="round" />
              );
            })}
            {activa &&
              surcos.flatMap((a) =>
                matas.map((b) => {
                  const [mx, my] = pos(a, b);
                  return (
                    <g key={`${a}-${b}`}>
                      <circle cx={mx} cy={my} r={lado * 0.085} fill="#3D8C0A" />
                      <circle cx={mx - lado * 0.025} cy={my - lado * 0.025} r={lado * 0.04} fill="#7CCB33" />
                    </g>
                  );
                }),
              )}
          </g>
        );
      })}
    </svg>
  );
}

export function Ilustracion({ ejercicio }: { ejercicio: Ejercicio }) {
  const { diseno, total, resaltados, columnas } = ejercicio;
  switch (diseno) {
    case "durazno":
      return <Durazno total={total} resaltados={resaltados} />;
    case "fresas":
      return <Canasta total={total} resaltados={resaltados} tipo="fresas" />;
    case "uchuvas":
      return <Canasta total={total} resaltados={resaltados} tipo="uchuvas" />;
    case "parcelas":
      return <Parcelas total={total} resaltados={resaltados} columnas={columnas ?? 4} />;
  }
}
