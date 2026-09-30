import type { Area } from "../types/area.types";

export const areaRegistry: Area[] = [
  {
    id: 'ciencias-naturales',
    name: 'Ciencias Naturales',
    description: 'Explora el cuerpo humano y descubre cómo funciona.',
    path: '/ciencias-naturales',
    disponible: true,
  },
  {
    id: 'matematicas',
    name: 'Matemáticas',
    description: 'Practica sumas, multiplicaciones, divisiones y fracciones.',
    path: '/matematicas',
    disponible: false,
  },
  {
    id: 'ingles',
    name: 'Inglés',
    description: 'Aprende vocabulario y practica pronunciación.',
    path: '/ingles',
    disponible: false,
  },
];
