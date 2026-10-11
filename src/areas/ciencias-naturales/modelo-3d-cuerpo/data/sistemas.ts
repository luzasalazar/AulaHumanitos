export type SistemaId = 'digestivo' | 'respiratorio' | 'circulatorio' | 'nervioso';

export interface Sistema {
  id: SistemaId;
  nombre: string;
  /** Color de marca asociado a este sistema (botón de filtro, acentos). */
  color: string;
  descripcion: string;
}

export const sistemas: Sistema[] = [
  {
    id: 'digestivo',
    nombre: '🍎 Sistema Digestivo',
    color: '#F9E05A',
    descripcion: 'Transforma los alimentos que comemos en la energía que el cuerpo necesita.',
  },
  {
    id: 'respiratorio',
    nombre: '🫁 SistemaRespiratorio',
    color: '#33BDF2',
    descripcion: 'Nos permite respirar y llevar oxígeno a todo el cuerpo.',
  },
  {
    id: 'circulatorio',
    nombre: '❤️ Sistema Circulatorio',
    color: '#fa7ca8',
    descripcion: 'Lleva la sangre por todo el cuerpo gracias al corazón y los vasos sanguíneos.',
  },
  {
    id: 'nervioso',
    nombre: '🧠 Sistema Nervioso',
    color: '#882B8E',
    descripcion: 'Controla lo que hacemos y sentimos, enviando mensajes por todo el cuerpo.',
  },
];
