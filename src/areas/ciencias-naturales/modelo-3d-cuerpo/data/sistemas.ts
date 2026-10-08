export type SistemaId = 'digestivo' | 'respiratorio' | 'circulatorio' | 'nervioso' | 'endocrino' | 'urinario';

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
    nombre: 'Digestivo',
    color: '#F9E05A',
    descripcion: 'Transforma los alimentos que comemos en la energía que el cuerpo necesita.',
  },
  {
    id: 'respiratorio',
    nombre: 'Respiratorio',
    color: '#33BDF2',
    descripcion: 'Nos permite respirar y llevar oxígeno a todo el cuerpo.',
  },
  {
    id: 'circulatorio',
    nombre: 'Circulatorio',
    color: '#F8528D',
    descripcion: 'Lleva la sangre por todo el cuerpo gracias al corazón y los vasos sanguíneos.',
  },
  {
    id: 'nervioso',
    nombre: 'Nervioso',
    color: '#882B8E',
    descripcion: 'Controla lo que hacemos y sentimos, enviando mensajes por todo el cuerpo.',
  },
  {
    id: 'endocrino', nombre: 'Endocrino', color: '#9B7ADE',
    descripcion: 'Produce hormonas que regulan distintas funciones del cuerpo.',
  },
  {
    id: 'urinario', nombre: 'Urinario', color: '#68A9D1',
    descripcion: 'Filtra la sangre y ayuda a eliminar desechos mediante la orina.',
  },
];
