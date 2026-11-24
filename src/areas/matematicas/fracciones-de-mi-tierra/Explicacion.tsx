import { useEffect, useRef } from 'react';
import { BookOpen, Play, X } from 'lucide-react';
import type { Ejercicio } from './datos';
import { Ilustracion } from './Ilustraciones';

const EJEMPLO_DURAZNO: Ejercicio = { id: 'ejemplo-durazno', diseno: 'durazno', total: 4, resaltados: 3, opciones: [] };
const EJEMPLO_FRESAS: Ejercicio = { id: 'ejemplo-fresas', diseno: 'fresas', total: 5, resaltados: 2, opciones: [] };

function FraccionEtiquetada({ n, d }: { n: number; d: number }) {
  return (
    <div className="flex items-center justify-center gap-3" aria-label={`${n} de ${d}`}>
      <div className="flex flex-col items-center font-poppins text-4xl font-extrabold leading-none">
        <span className="text-pink-600">{n}</span>
        <span aria-hidden="true" className="my-1.5 block h-[3px] w-12 rounded-full bg-negro-suave" />
        <span className="text-morado">{d}</span>
      </div>
      <div className="flex flex-col gap-5 font-montserrat text-xs font-semibold sm:text-sm" aria-hidden="true">
        <span className="text-pink-600">← numerador</span>
        <span className="text-morado">← denominador</span>
      </div>
    </div>
  );
}

/* Mini dibujo: una unidad (círculo) partida en 4 partes iguales, 3 coloreadas. */
function MiniUnidad() {
  const partes = [
    'M40 40 L40 6 A34 34 0 0 1 74 40 Z',
    'M40 40 L74 40 A34 34 0 0 1 40 74 Z',
    'M40 40 L40 74 A34 34 0 0 1 6 40 Z',
    'M40 40 L6 40 A34 34 0 0 1 40 6 Z',
  ];
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
      {partes.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={i < 3 ? '#EC4899' : '#FFFFFF'}
          stroke={i < 3 ? '#9D174D' : '#C4A5C6'}
          strokeWidth="2.5"
          strokeDasharray={i < 3 ? undefined : '4 3'}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/* Mini dibujo: un conjunto de 5 elementos, 2 resaltados. */
function MiniConjunto() {
  const puntos = [[18, 28], [40, 22], [62, 28], [28, 54], [52, 54]];
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
      <ellipse cx="40" cy="40" rx="37" ry="34" fill="#FAF5FF" stroke="#882B8E" strokeWidth="2" strokeDasharray="5 4" />
      {puntos.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="9"
          fill={i < 2 ? '#EC4899' : '#FFFFFF'}
          stroke={i < 2 ? '#9D174D' : '#C4A5C6'}
          strokeWidth="2.5"
          strokeDasharray={i < 2 ? undefined : '4 3'}
        />
      ))}
    </svg>
  );
}

function TarjetaEjemplo({ ejercicio, n, d, titulo, texto }: {
  ejercicio: Ejercicio; n: number; d: number; titulo: string; texto: string;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-3xl border-2 border-pink-100 bg-white p-4 shadow-sm">
      <h3 className="text-center font-poppins text-lg font-bold text-black">{titulo}</h3>
      <div className="mt-2 flex flex-1 items-center gap-4">
        <div className="h-36 w-1/2 shrink-0">
          <Ilustracion ejercicio={ejercicio} />
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <FraccionEtiquetada n={n} d={d} />
          <p className="font-montserrat text-sm text-negro-suave/80">{texto}</p>
        </div>
      </div>
    </div>
  );
}

/** Explicación corta sobre fracciones: se usa al entrar y en el botón de ayuda. */
export function ContenidoExplicacion({ eyebrow }: { eyebrow: string }) {
  return (
    <div>
      <div className="text-center">
        <p className="font-montserrat text-sm font-semibold text-pink-600">{eyebrow}</p>
        <h1 className="mt-1 font-poppins text-2xl font-extrabold text-black sm:text-3xl">¿Qué es una fracción?</h1>
        <p className="mx-auto mt-2 max-w-2xl font-montserrat text-base text-negro-suave/80">
          Una fracción representa <strong>una parte de un todo</strong>.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Izquierda: el concepto */}
        <div className="flex flex-col rounded-3xl border-2 border-purple-100 bg-white p-5 shadow-sm">
          <h2 className="font-poppins text-lg font-bold text-black">Las partes de una fracción</h2>

          <div className="mt-4 flex items-stretch gap-4">
            <div
              className="flex flex-col items-center justify-center font-poppins text-5xl font-extrabold leading-none"
              aria-hidden="true"
            >
              <span className="flex flex-1 items-center text-pink-600">3</span>
              <span className="my-2 block h-1 w-14 rounded-full bg-negro-suave" />
              <span className="flex flex-1 items-center text-morado">4</span>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex-1 rounded-2xl border-l-8 border-pink-500 bg-pink-50 p-3">
                <p className="font-poppins font-bold text-pink-600">Numerador</p>
                <p className="font-montserrat text-sm text-negro-suave/80">
                  El número de <strong>arriba</strong>. Indica <strong>cuántas partes</strong> del todo tomamos.
                </p>
              </div>
              <div className="flex-1 rounded-2xl border-l-8 border-morado bg-purple-50 p-3">
                <p className="font-poppins font-bold text-morado">Denominador</p>
                <p className="font-montserrat text-sm text-negro-suave/80">
                  El número de <strong>abajo</strong>. Indica <strong>en cuántas partes iguales</strong> está
                  dividido el todo.
                </p>
              </div>
            </div>
          </div>

          <h2 className="mt-6 font-poppins text-lg font-bold text-black">¿Qué puede ser el todo?</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center rounded-2xl bg-gris-claro p-3 text-center">
              <MiniUnidad />
              <p className="mt-2 font-poppins font-bold text-black">Una unidad</p>
              <p className="font-montserrat text-sm text-negro-suave/80">Un solo objeto partido en partes iguales.</p>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-gris-claro p-3 text-center">
              <MiniConjunto />
              <p className="mt-2 font-poppins font-bold text-black">Un conjunto</p>
              <p className="font-montserrat text-sm text-negro-suave/80">Un grupo de objetos; tomamos algunos.</p>
            </div>
          </div>
        </div>

        {/* Derecha: ejemplos */}
        <div className="flex flex-col gap-5">
          <TarjetaEjemplo
            ejercicio={EJEMPLO_DURAZNO}
            n={3}
            d={4}
            titulo="Ejemplo: una unidad"
            texto="Un durazno partido en 4 partes iguales. Tomamos 3."
          />
          <TarjetaEjemplo
            ejercicio={EJEMPLO_FRESAS}
            n={2}
            d={5}
            titulo="Ejemplo: un conjunto"
            texto="Una canasta con 5 fresas. Tomamos 2."
          />
        </div>
      </div>
    </div>
  );
}

const BOTON =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-2.5 font-poppins text-base font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-200';

/** Pantalla inicial de la actividad. */
export function PantallaIntro({ onEmpezar }: { onEmpezar: () => void }) {
  return (
    <section className="mx-auto max-w-5xl rounded-[2rem] border border-pink-100 bg-white p-5 shadow-[0_16px_50px_-30px_rgba(136,43,142,0.45)] sm:p-8">
      <ContenidoExplicacion eyebrow="Antes de empezar…" />
      <div className="mt-6 text-center">
        <button type="button" onClick={onEmpezar} className={BOTON}>
          <Play size={18} aria-hidden="true" /> ¡Empezar la actividad!
        </button>
      </div>
    </section>
  );
}

/** Ventana de ayuda que muestra la misma explicación durante los ejercicios. */
export function DialogoAyuda({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (abierto && !dialogo.open) dialogo.showModal();
    if (!abierto && dialogo.open) dialogo.close();
  }, [abierto]);

  return (
    <dialog
      ref={ref}
      onClose={onCerrar}
      onClick={(e) => {
        if (e.target === ref.current) onCerrar(); // clic fuera de la tarjeta
      }}
      aria-label="Ayuda: ¿Qué es una fracción?"
      className="m-auto max-h-[92vh] w-[min(64rem,94vw)] rounded-[2rem] bg-gris-claro p-0 shadow-2xl backdrop:bg-black/50"
    >
      <div className="relative p-5 sm:p-8">
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar ayuda"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-negro-suave shadow transition hover:bg-pink-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-morado"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <ContenidoExplicacion eyebrow="Recordemos…" />
        <div className="mt-6 text-center">
          <button type="button" onClick={onCerrar} className={BOTON}>
            <BookOpen size={18} aria-hidden="true" /> Volver al ejercicio
          </button>
        </div>
      </div>
    </dialog>
  );
}
