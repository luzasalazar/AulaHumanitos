import { useState } from 'react';
import { Check, Lightbulb, RotateCcw, Sparkles } from 'lucide-react';
import Layout from '../../../core/ui/Layout';

const COLORS = [
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Yellow', hex: '#FACC15' },
  { name: 'Green', hex: '#22C55E' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Purple', hex: '#A855F7' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Black', hex: '#202124' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Brown', hex: '#8B5E3C' },
  { name: 'Gray', hex: '#9CA3AF' },
];

type Color = (typeof COLORS)[number];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function makeChoices(answer: Color): Color[] {
  const distractors = shuffle(COLORS.filter((color) => color.name !== answer.name)).slice(0, 3);
  return shuffle([answer, ...distractors]);
}

function makeRound(previousFirst?: string): Color[] {
  const round = shuffle(COLORS);
  if (previousFirst && round[0].name === previousFirst) {
    [round[0], round[1]] = [round[1], round[0]];
  }
  return round;
}

export default function AprendeColores() {
  const [round, setRound] = useState(() => makeRound());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choices, setChoices] = useState(() => makeChoices(round[0]));
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [madeMistake, setMadeMistake] = useState(false);

  const answer = round[questionIndex];
  const isCorrect = selectedColor === answer.name;
  const finished = questionIndex === COLORS.length - 1 && isCorrect;

  const handleSelect = (color: Color) => {
    if (selectedColor) return;
    setSelectedColor(color.name);
    if (color.name === answer.name) {
      if (!madeMistake) setCorrectCount((count) => count + 1);
    } else {
      setMadeMistake(true);
    }
  };

  const handleNext = () => {
    if (questionIndex === COLORS.length - 1) {
      const nextRound = makeRound(round[0].name);
      setRound(nextRound);
      setQuestionIndex(0);
      setChoices(makeChoices(nextRound[0]));
      setCorrectCount(0);
    } else {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setChoices(makeChoices(round[nextIndex]));
    }
    setMadeMistake(false);
    setSelectedColor(null);
  };

  const handleRetry = () => setSelectedColor(null);

  return (
    <Layout eyebrow="Inglés" eyebrowColor="#F8528D">
      <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-[0_16px_50px_-30px_rgba(136,43,142,0.45)]">
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-yellow-100/70" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-pink-100/60" aria-hidden="true" />

        <div className="relative px-4 py-5 sm:px-8 sm:py-7">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-pink-600">
              <Sparkles size={17} aria-hidden="true" />
              <span className="font-poppins text-xs font-semibold sm:text-sm">¡Vamos a jugar!</span>
            </div>
            <span className="font-montserrat text-xs font-semibold text-negro-suave/50 sm:text-sm">
              {questionIndex + 1} de {COLORS.length}
            </span>
          </div>

          <div
            className="mb-5 h-2.5 overflow-hidden rounded-full bg-pink-100"
            role="progressbar"
            aria-label="Progreso de la actividad"
            aria-valuemin={0}
            aria-valuemax={COLORS.length}
            aria-valuenow={questionIndex + (isCorrect ? 1 : 0)}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-500"
              style={{ width: `${((questionIndex + (isCorrect ? 1 : 0)) / COLORS.length) * 100}%` }}
            />
          </div>

          <div className="mb-5 text-center">
            <p className="mb-1 font-montserrat text-sm font-medium text-negro-suave/60">
              Toca el color que dice la palabra
            </p>
            <h1 className="font-poppins text-4xl font-extrabold tracking-wide text-black sm:text-5xl">
              {answer.name}
            </h1>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-5" aria-label="Opciones de color">
            {choices.map((color, index) => {
              const wasSelected = selectedColor === color.name;
              const showAnswer = selectedColor !== null && color.name === answer.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleSelect(color)}
                  disabled={selectedColor !== null}
                  aria-label={`Color ${color.name}`}
                  className={`group relative flex aspect-[1.35] min-w-0 cursor-pointer items-center justify-center rounded-2xl border-4 p-1 shadow-[0_0_0_2px_rgba(28,28,28,0.12),0_5px_8px_rgba(28,28,28,0.16)] transition duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-morado sm:rounded-3xl sm:p-2 disabled:cursor-default ${
                    wasSelected && !isCorrect
                      ? 'border-rose-500 ring-4 ring-rose-100'
                      : showAnswer
                        ? 'border-emerald-500 ring-4 ring-emerald-100'
                        : 'border-white hover:-translate-y-1 hover:scale-[1.02] hover:border-pink-200 hover:shadow-lg disabled:hover:transform-none'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="sr-only">Opción {index + 1}: {color.name}</span>
                  {wasSelected && !isCorrect && <span className="absolute inset-0 rounded-[1.15rem] bg-white/20" />}
                  {showAnswer && (
                    <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-600 shadow-md">
                      <Check size={19} strokeWidth={3} aria-hidden="true" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedColor && (
            <div
            className={`mt-5 rounded-2xl border p-4 text-center sm:p-5 ${
                isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-orange-200 bg-orange-50'
              }`}
              role="status"
              aria-live="polite"
            >
              <p className={`font-poppins text-lg font-bold ${isCorrect ? 'text-emerald-700' : 'text-orange-700'}`}>
                {isCorrect ? (finished ? '¡Fantástico, completaste todos los colores!' : '¡Correcto!') : '¡Casi! Ese no es el color.'}
              </p>
              <p className="mt-1 font-montserrat text-sm text-negro-suave/65">
                {isCorrect
                  ? finished
                    ? `¡Lograste ${correctCount} respuestas correctas!`
                    : '¡Ya puedes continuar con el siguiente color!'
                  : 'Mira la palabra una vez más e inténtalo de nuevo.'}
              </p>
              <button
                type="button"
                onClick={isCorrect ? handleNext : handleRetry}
                className={`mx-auto mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-poppins text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 ${
                  isCorrect
                    ? 'bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-200'
                    : 'bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-200'
                }`}
              >
                {isCorrect ? <>{finished ? <RotateCcw size={17} aria-hidden="true" /> : <Check size={17} aria-hidden="true" />} {finished ? 'Jugar otra vez' : 'Siguiente'}</> : <><RotateCcw size={16} aria-hidden="true" /> Volver a intentar</>}
              </button>
            </div>
          )}

          {!selectedColor && (
            <p className="mt-4 flex items-center justify-center gap-2 text-center font-montserrat text-xs text-negro-suave/50 sm:text-sm">
              <Lightbulb size={16} className="text-amarillo" aria-hidden="true" />
              ¡Tú puedes! Escoge uno de los cuatro colores.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
