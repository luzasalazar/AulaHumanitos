import type { SistemaId } from './sistemas';
import cerebroModel from '../models/Cerebro.glb?url';
import pulmonesModel from '../models/Pulmones.glb?url';
import corazonModel from '../models/Corazon.glb?url';
import higadoModel from '../models/Higado.glb?url';
import estomagoModel from '../models/Estomago.glb?url';
import intestinosModel from '../models/Intestinos.glb?url';
import rinonesModel from '../models/Rinones.glb?url';
import pancreasModel from '../models/Pancreas.glb?url';
import tiroidesModel from '../models/Tiroides.glb?url';
import vejigaModel from '../models/Vejiga.glb?url';

export type OrganId =
  | 'cerebro'
  | 'pulmones'
  | 'corazon'
  | 'higado'
  | 'estomago'
  | 'intestinos'
  | 'rinones'
  | 'pancreas'
  | 'tiroides'
  | 'vejiga';

export interface Organo {
  id: OrganId;
  nombre: string;
  modelPath: string;
  sistemas: SistemaId[];
  descripcion: string;
  funcion: string;
  datoCurioso?: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  /** Escala uniforme aplicada a la malla original. */
  scale: number;
}

// Coordenadas: +Y hacia la cabeza, +Z hacia delante, +X hacia la izquierda
// anatómica. Las posiciones y escalas se ajustan a las dimensiones de cada GLB.
export const organos: Organo[] = [
  {
    id: 'cerebro', nombre: 'Cerebro', modelPath: cerebroModel, sistemas: ['nervioso'],
    descripcion: 'Está protegido dentro del cráneo y coordina gran parte de lo que hacemos.',
    funcion: 'Procesa la información, permite pensar y envía órdenes al cuerpo.', datoCurioso: 'Sigue activo incluso mientras dormimos.', color: '#882B8E',
    position: [0, 3.72, -0.05], rotation: [0, 0, 0], scale: 0.68,
  },
  {
    id: 'pulmones', nombre: 'Pulmones', modelPath: pulmonesModel, sistemas: ['respiratorio'],
    descripcion: 'Son dos órganos esponjosos que ocupan gran parte del tórax, a ambos lados del corazón.',
    funcion: 'Llevan oxígeno a la sangre y ayudan a eliminar dióxido de carbono.', datoCurioso: 'El pulmón derecho suele ser un poco más grande que el izquierdo.', color: '#33BDF2',
    position: [0, 2.6, 0.01], rotation: [0.1, 0, 0], scale: 0.95,
  },
  {
    id: 'corazon', nombre: 'Corazón', modelPath: corazonModel, sistemas: ['circulatorio'],
    descripcion: 'Es un músculo situado entre los pulmones, ligeramente hacia la izquierda.',
    funcion: 'Bombea la sangre para que circule por todo el cuerpo.', datoCurioso: 'Late más de 100.000 veces al día.', color: '#F8528D',
    position: [0.10, 2.60, 0.30], rotation: [0, 0, 0], scale: 0.45,
  },
  {
    id: 'higado', nombre: 'Hígado', modelPath: higadoModel, sistemas: ['digestivo'],
    descripcion: 'Es un órgano grande que ocupa la parte superior derecha del abdomen.',
    funcion: 'Procesa nutrientes, produce bilis y ayuda a limpiar la sangre.', datoCurioso: 'Puede regenerar parte de su tejido.', color: '#F9A65A',
    position: [-0.12, 2.06, 0.02], rotation: [0, 0, 0], scale: 0.55,
  },
  {
    id: 'estomago', nombre: 'Estómago', modelPath: estomagoModel, sistemas: ['digestivo'],
    descripcion: 'Se encuentra en la parte superior izquierda del abdomen, bajo el diafragma.',
    funcion: 'Mezcla los alimentos con jugos digestivos para descomponerlos.', datoCurioso: 'Su capacidad cambia según cuánto comemos.', color: '#F9E05A',
    position: [0.08, 2.02, 0.13], rotation: [0, 0, 0], scale: 0.46,
  },
  {
    id: 'intestinos', nombre: 'Intestinos', modelPath: intestinosModel, sistemas: ['digestivo'],
    descripcion: 'Ocupan la zona central e inferior del abdomen, debajo del estómago.',
    funcion: 'Absorben nutrientes y agua, y ayudan a formar los desechos.', datoCurioso: 'El intestino delgado mide varios metros de largo.', color: '#E9A83A',
    position: [0, 1.48, 0.08], rotation: [0, 0, 0], scale: 0.91,
  },
  {
    id: 'rinones', nombre: 'Riñones', modelPath: rinonesModel, sistemas: ['urinario'],
    descripcion: 'El modelo muestra los dos riñones, situados detrás de los demás órganos abdominales.',
    funcion: 'Filtran la sangre y producen la orina.', datoCurioso: 'El riñón derecho suele quedar un poco más bajo que el izquierdo.', color: '#B65E72',
    position: [0, 1.84, -0.28], rotation: [0, 0, 0], scale: 0.53,
  },
  {
    id: 'pancreas', nombre: 'Páncreas', modelPath: pancreasModel, sistemas: ['digestivo', 'endocrino'],
    descripcion: 'Está detrás del estómago, atravesando la parte superior del abdomen.',
    funcion: 'Produce sustancias que ayudan a digerir y hormonas que regulan el azúcar en la sangre.', color: '#D59B54',
    position: [0, 1.93, -0.16], rotation: [0, 0, 0], scale: 0.42,
  },
  {
    id: 'tiroides', nombre: 'Tiroides', modelPath: tiroidesModel, sistemas: ['endocrino'],
    descripcion: 'Se encuentra en la parte anterior del cuello, debajo de la laringe.',
    funcion: 'Produce hormonas que ayudan a regular el crecimiento y el uso de energía.', color: '#9B7ADE',
    position: [0, 3.17, -0.03 ], rotation: [0, 0, 0], scale: 0.23,
  },
  {
    id: 'vejiga', nombre: 'Vejiga', modelPath: vejigaModel, sistemas: ['urinario'],
    descripcion: 'Es un órgano hueco situado en la parte inferior de la pelvis.',
    funcion: 'Almacena la orina hasta que el cuerpo la expulsa.', color: '#68A9D1',
    position: [0, 0.93, 0.07], rotation: [0, 0, 0], scale: 0.36,
  },
];
