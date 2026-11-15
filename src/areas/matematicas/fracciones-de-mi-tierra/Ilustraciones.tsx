import type { Ejercicio } from './datos';

/* Resaltado = color fuerte con borde sólido.
   No resaltado = color pálido con borde punteado (se distingue sin depender solo del color). */

function Durazno({ total, resaltados }: { total: number; resaltados: number }) {
  const cx = 150;
  const cy = 165;
  const r = 100;
  const punto = (grados: number) => {
    const rad = ((grados - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  return (
    <svg viewBox="0 0 300 280" className="h-full w-full" role="img"
      aria-label={`Un durazno dividido en ${total} partes iguales, ${resaltados} coloreadas`}>
      {Array.from({ length: total }, (_, i) => {
        const [x1, y1] = punto((i * 360) / total);
        const [x2, y2] = punto(((i + 1) * 360) / total);
        const activa = i < resaltados;
        return (
          <path
            key={i}
            d={`M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`}
            fill={activa ? "#FFA94D" : "#FFF4DE"}
            stroke={activa ? "#B85A14" : "#C9A66B"}
            strokeWidth={activa ? 4 : 3}
            strokeDasharray={activa ? undefined : "6 5"}
            strokeLinejoin="round"
          />
        );
      })}
      <path d={`M${cx} 68 Q${cx + 4} 48 ${cx + 12} 36`} stroke="#6B4423" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d={`M${cx + 10} 52 Q${cx + 50} 14 ${cx + 92} 40 Q${cx + 56} 74 ${cx + 10} 52 Z`} fill="#4A9B09" stroke="#2F6A05" strokeWidth="3" />
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

function Parcelas({ total, resaltados, columnas }: { total: number; resaltados: number; columnas: number }) {
  const filas = Math.ceil(total / columnas);
  const celda = Math.min(300 / columnas, 190 / filas);
  const ancho = celda * columnas;
  const alto = celda * filas;
  const x0 = (360 - ancho) / 2;
  const y0 = (260 - alto) / 2;
  return (
    <svg viewBox="0 0 360 260" className="h-full w-full" role="img"
      aria-label={`Un terreno rectangular dividido en ${total} parcelas iguales, ${resaltados} resaltadas`}>
      <rect x={x0 - 10} y={y0 - 10} width={ancho + 20} height={alto + 20} rx="10" fill="#E8D9B5" stroke="#7A4A1D" strokeWidth="4" />
      {Array.from({ length: total }, (_, i) => {
        const x = x0 + (i % columnas) * celda;
        const y = y0 + Math.floor(i / columnas) * celda;
        const activa = i < resaltados;
        return (
          <g key={i}>
            <rect
              x={x + 2} y={y + 2} width={celda - 4} height={celda - 4} rx="6"
              fill={activa ? "#4A9B09" : "#F4EBD2"}
              stroke={activa ? "#2F6A05" : "#B7A06A"}
              strokeWidth={activa ? 3 : 2.5}
              strokeDasharray={activa ? undefined : "6 4"}
            />
            {activa && (
              <path
                d={`M${x + celda / 2} ${y + celda * 0.72} L${x + celda / 2} ${y + celda * 0.4}
                    M${x + celda / 2} ${y + celda * 0.52} Q${x + celda * 0.3} ${y + celda * 0.5} ${x + celda * 0.3} ${y + celda * 0.32}
                    M${x + celda / 2} ${y + celda * 0.46} Q${x + celda * 0.7} ${y + celda * 0.44} ${x + celda * 0.7} ${y + celda * 0.26}`}
                stroke="#F9E05A" strokeWidth="4" strokeLinecap="round" fill="none"
              />
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
