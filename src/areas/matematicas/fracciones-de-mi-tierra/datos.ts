export type Diseno = "durazno" | "fresas" | "uchuvas" | "parcelas";

export interface Fraccion {
  n: number; // numerador
  d: number; // denominador
}

export interface Ejercicio {
  id: string;
  diseno: Diseno;
  total: number; // partes, frutas o parcelas en total
  resaltados: number; // partes, frutas o parcelas resaltadas
  columnas?: number; // solo para parcelas
  opciones: Fraccion[]; // 4 opciones, ninguna equivalente a otra
}

export const PREGUNTAS: Record<Diseno, string> = {
  durazno: "¿Qué fracción del durazno está coloreada?",
  fresas: "¿Qué fracción de las fresas está resaltada?",
  uchuvas: "¿Qué fracción de las uchuvas está resaltada?",
  parcelas: "¿Qué fracción del terreno está resaltada?",
};

export const TITULOS: Record<Diseno, string> = {
  durazno: "Duraznos de Cácota",
  fresas: "Canasta de fresas",
  uchuvas: "Canasta de uchuvas",
  parcelas: "Parcelas campesinas",
};

const f = (n: number, d: number): Fraccion => ({ n, d });

// 2 ejercicios por cada diseño = 8 ejercicios.
// La respuesta correcta siempre es { n: resaltados, d: total }.
export const EJERCICIOS: Ejercicio[] = [
  {
    id: "durazno-1",
    diseno: "durazno",
    total: 4,
    resaltados: 3,
    opciones: [f(3, 4), f(1, 4), f(2, 4), f(4, 4)],
  },
  {
    id: "durazno-2",
    diseno: "durazno",
    total: 8,
    resaltados: 5,
    opciones: [f(5, 8), f(3, 8), f(4, 8), f(6, 8)],
  },
  {
    id: "fresas-1",
    diseno: "fresas",
    total: 6,
    resaltados: 4,
    opciones: [f(4, 6), f(2, 6), f(3, 6), f(5, 6)],
  },
  {
    id: "fresas-2",
    diseno: "fresas",
    total: 8,
    resaltados: 3,
    opciones: [f(3, 8), f(5, 8), f(3, 5), f(1, 8)],
  },
  {
    id: "uchuvas-1",
    diseno: "uchuvas",
    total: 10,
    resaltados: 7,
    opciones: [f(7, 10), f(3, 10), f(5, 10), f(7, 8)],
  },
  {
    id: "uchuvas-2",
    diseno: "uchuvas",
    total: 5,
    resaltados: 2,
    opciones: [f(2, 5), f(3, 5), f(2, 3), f(1, 5)],
  },
  {
    id: "parcelas-1",
    diseno: "parcelas",
    total: 12,
    columnas: 4,
    resaltados: 5,
    opciones: [f(5, 12), f(7, 12), f(5, 7), f(4, 12)],
  },
  {
    id: "parcelas-2",
    diseno: "parcelas",
    total: 8,
    columnas: 4,
    resaltados: 6,
    opciones: [f(6, 8), f(2, 8), f(4, 8), f(5, 8)],
  },
];

export const claveFraccion = (x: Fraccion) => `${x.n}/${x.d}`;

export const esCorrecta = (e: Ejercicio, x: Fraccion) =>
  x.n === e.resaltados && x.d === e.total;

export function mezclar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Nueva partida: ejercicios y opciones en orden aleatorio. */
export function crearPartida(): Ejercicio[] {
  return mezclar(EJERCICIOS).map((e) => ({ ...e, opciones: mezclar(e.opciones) }));
}

export const FELICITACIONES = [
  "¡Muy bien!",
  "¡Excelente!",
  "¡Lo lograste!",
  "¡Qué buen ojo!",
];
