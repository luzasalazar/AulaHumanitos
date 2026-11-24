import { useState } from 'react';
import { Check, CircleHelp, Lightbulb, RotateCcw, Sparkles } from 'lucide-react';
import Layout from '../../../core/ui/Layout';
import {
  FELICITACIONES,
  PREGUNTAS,
  TITULOS,
  claveFraccion,
  crearPartida,
  esCorrecta,
  type Fraccion,
} from './datos';
import { Ilustracion } from './Ilustraciones';
import { DialogoAyuda, PantallaIntro } from './Explicacion';

const TOTAL = 8;

function FraccionVisual({ fraccion }: { fraccion: Fraccion }) {
  return (
    <span
      className="inline-flex flex-col items-center font-poppins font-bold leading-none"
      aria-label={`${fraccion.n} de ${fraccion.d}`}
    >
      <span className="text-2xl sm:text-3xl">{fraccion.n}</span>
      <span aria-hidden="true" className="my-1 block h-[2px] w-10 shrink-0 rounded-full bg-current" />
      <span className="text-2xl sm:text-3xl">{fraccion.d}</span>
    </span>
  );
}

function mensajeFinal(aciertos: number) {
  if (aciertos === TOTAL) return '¡Perfecto! Eres un campeón de las fracciones.';
  if (aciertos >= 6) return '¡Muy buen trabajo! Casi lo lograste todo.';
  if (aciertos >= 4) return '¡Vas muy bien! Con otra partida lo harás aún mejor.';
  return '¡Sigue practicando! Cada intento te enseña algo nuevo.';
}

export default function FraccionesDeMiTierra() {
  const [mostrarIntro, setMostrarIntro] = useState(true);
  const [ayudaAbierta, setAyudaAbierta] = useState(false);
  const [partida, setPartida] = useState(() => crearPartida());
  const [indice, setIndice] = useState(0);
  const [seleccionada, setSeleccionada] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [madeMistake, setMadeMistake] = useState(false);
  const [felicitacion, setFelicitacion] = useState(FELICITACIONES[0]);

  const ejercicio = partida[indice];
  const respuesta = ejercicio.opciones.find((opcion) => esCorrecta(ejercicio, opcion));
  const isCorrect = seleccionada !== null && respuesta !== undefined && seleccionada === claveFraccion(respuesta);
  const terminado = indice === TOTAL - 1 && isCorrect;

  const elegir = (opcion: Fraccion) => {
    if (seleccionada !== null) return;
    setSeleccionada(claveFraccion(opcion));
    if (esCorrecta(ejercicio, opcion)) {
      if (!madeMistake) setAciertos((actuales) => actuales + 1);
      setFelicitacion(FELICITACIONES[Math.floor(Math.random() * FELICITACIONES.length)]);
    } else {
      setMadeMistake(true);
    }
  };

  const avanzar = () => {
    if (indice < TOTAL - 1) setIndice((actual) => actual + 1);
    setMadeMistake(false);
    setSeleccionada(null);
  };

  const reiniciar = () => {
    setPartida(crearPartida());
    setIndice(0);
    setSeleccionada(null);
    setAciertos(0);
    setMadeMistake(false);
  };

  return (
    <Layout eyebrow="Matemáticas">
      {mostrarIntro ? (
        <PantallaIntro onEmpezar={() => setMostrarIntro(false)} />
      ) : terminado ? (
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-pink-100 bg-white p-6 text-center shadow-[0_16px_50px_-30px_rgba(136,43,142,0.45)] sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-600">
            <Sparkles size={26} aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-poppins text-3xl font-extrabold text-morado sm:text-4xl">¡Terminaste!</h1>
          <p className="mt-5 font-poppins text-5xl font-bold text-verde sm:text-6xl" aria-live="polite">
            {aciertos} de {TOTAL}
          </p>
          <p className="mt-2 text-lg font-semibold">respuestas correctas</p>
          <p className="mt-4 text-lg">{mensajeFinal(aciertos)}</p>
          <button
            type="button"
            onClick={reiniciar}
            className="mx-auto mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 font-poppins text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            <RotateCcw size={17} aria-hidden="true" /> Jugar otra vez
          </button>
        </section>
      ) : (
        <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-[0_16px_50px_-30px_rgba(136,43,142,0.45)]">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-yellow-100/70" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-pink-100/60" aria-hidden="true" />

          <div className="relative px-4 py-5 sm:px-8 sm:py-7">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-pink-600 sm:px-4">
                <Sparkles size={17} className="shrink-0" aria-hidden="true" />
                <span className="truncate font-poppins text-xs font-semibold sm:text-sm">{TITULOS[ejercicio.diseno]}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <span className="font-montserrat text-xs font-semibold text-negro-suave/50 sm:text-sm">
                  {indice + 1} de {TOTAL}
                </span>
                <button
                  type="button"
                  onClick={() => setAyudaAbierta(true)}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 border-purple-200 bg-purple-50 px-3 py-1.5 font-poppins text-sm font-bold text-morado transition hover:-translate-y-0.5 hover:bg-purple-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-morado"
                >
                  <CircleHelp size={18} aria-hidden="true" /> Ayuda
                </button>
              </div>
            </div>

            <div
              className="mb-5 h-2.5 overflow-hidden rounded-full bg-pink-100"
              role="progressbar"
              aria-label="Progreso de la actividad"
              aria-valuemin={0}
              aria-valuemax={TOTAL}
              aria-valuenow={indice + (isCorrect ? 1 : 0)}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-500"
                style={{ width: `${((indice + (isCorrect ? 1 : 0)) / TOTAL) * 100}%` }}
              />
            </div>

            <div className="mb-4 text-center sm:mb-5">
              <p className="mb-1 font-montserrat text-sm font-medium text-negro-suave/60">
                Observa la ilustración y elige la fracción correcta
              </p>
              <h1 className="font-poppins text-2xl font-extrabold text-black sm:text-3xl">
                {PREGUNTAS[ejercicio.diseno]}
              </h1>
            </div>

            <div className="mx-auto h-52 max-w-md sm:h-64" key={ejercicio.id}>
              <Ilustracion ejercicio={ejercicio} />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 sm:mt-5 sm:gap-4" role="group" aria-label="Opciones de respuesta">
              {ejercicio.opciones.map((opcion, index) => {
                const clave = claveFraccion(opcion);
                const wasSelected = seleccionada === clave;
                const correcta = esCorrecta(ejercicio, opcion);
                const showAnswer = seleccionada !== null && correcta;
                return (
                  <button
                    key={clave}
                    type="button"
                    onClick={() => elegir(opcion)}
                    disabled={seleccionada !== null}
                    aria-label={`Opción ${index + 1}: ${opcion.n} de ${opcion.d}`}
                    aria-pressed={wasSelected}
                    className={`relative flex min-h-24 min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border-4 p-1 shadow-[0_0_0_2px_rgba(28,28,28,0.12),0_5px_8px_rgba(28,28,28,0.16)] transition duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-morado sm:min-h-28 sm:rounded-3xl sm:p-2 disabled:cursor-default ${
                      wasSelected && !isCorrect
                        ? 'border-rose-500 bg-rose-50 text-rose-700 ring-4 ring-rose-100'
                        : showAnswer
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-4 ring-emerald-100'
                          : 'border-white bg-white text-morado hover:-translate-y-1 hover:scale-[1.02] hover:border-pink-200 hover:shadow-lg disabled:hover:transform-none'
                    }`}
                  >
                    <span className="sr-only">Opción {index + 1}: </span>
                    <FraccionVisual fraccion={opcion} />
                    {showAnswer && (
                      <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-emerald-600 shadow sm:right-2 sm:top-2 sm:h-7 sm:w-7">
                        <Check size={16} strokeWidth={3} aria-hidden="true" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {seleccionada && (
              <div
                className={`mt-5 rounded-2xl border p-4 text-center sm:p-5 ${
                  isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-orange-200 bg-orange-50'
                }`}
                role="status"
                aria-live="polite"
              >
                <p className={`font-poppins text-lg font-bold ${isCorrect ? 'text-emerald-700' : 'text-orange-700'}`}>
                  {isCorrect ? (terminado ? '¡Fantástico, completaste todos los ejercicios!' : felicitacion) : '¡Casi! Esa no es la respuesta.'}
                </p>
                <p className="mt-1 font-montserrat text-sm text-negro-suave/65">
                  {isCorrect
                    ? terminado
                      ? `¡Lograste ${aciertos} respuestas correctas!`
                      : '¡Ya puedes continuar con el siguiente ejercicio!'
                    : 'Mira la ilustración una vez más e inténtalo de nuevo.'}
                </p>
                <button
                  type="button"
                  onClick={isCorrect ? avanzar : () => setSeleccionada(null)}
                  className={`mx-auto mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-poppins text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 ${
                    isCorrect
                      ? 'bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-200'
                      : 'bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-200'
                  }`}
                >
                  {isCorrect ? (
                    <><Check size={17} aria-hidden="true" /> Siguiente</>
                  ) : (
                    <><RotateCcw size={16} aria-hidden="true" /> Volver a intentar</>
                  )}
                </button>
              </div>
            )}

            {!seleccionada && (
              <p className="mt-4 flex items-center justify-center gap-2 text-center font-montserrat text-xs text-negro-suave/50 sm:text-sm">
                <Lightbulb size={16} className="text-amarillo" aria-hidden="true" />
                ¡Tú puedes! Escoge una de las cuatro fracciones.
              </p>
            )}
          </div>
        </section>
      )}
      <DialogoAyuda abierto={ayudaAbierta} onCerrar={() => setAyudaAbierta(false)} />
    </Layout>
  );
}
