import type { SistemaId } from './sistemas';

export type OrganId =
  | 'cerebro'
  | 'nervios'
  | 'nariz'
  | 'pulmones'
  | 'traquea'
  | 'bronquios'
  | 'corazon'
  | 'vasos-sanguineos'
  | 'higado'
  | 'estomago'
  | 'intestinos'
  | 'pancreas';

export interface Organo {
  id: OrganId;
  nombre: string;
  sistemas: SistemaId[];
  descripcion: string;
  funcion: string;
  datoCurioso?: string;
  color: string;
}

export const organos: Organo[] = [
  {
    id: 'cerebro', nombre: 'Cerebro', sistemas: ['nervioso'],
    descripcion: 'Está protegido dentro del cráneo y coordina gran parte de lo que hacemos.',
    funcion: 'Procesa la información, permite pensar y envía órdenes al cuerpo.', datoCurioso: 'Sigue activo incluso mientras dormimos.', color: '#882B8E',
  },
  {
    id: 'nervios', nombre: 'Nervios', sistemas: ['nervioso'],
    descripcion: 'Son hilos finísimos que transmiten señales entre el cerebro y el resto del cuerpo.',
    funcion: 'Avisan al cerebro de lo que tocas, oyes y hueles, y le llevan la orden de moverte.', datoCurioso: 'Los mensajes viajan por los nervios a más de 100 kilómetros por hora.', color: '#D4AC0D',
  },
  {
    id: 'nariz', nombre: 'Nariz', sistemas: ['respiratorio'],
    descripcion: 'Se encuentra en el centro del rostro y se comunica con las fosas nasales, por donde entra el aire al sistema respiratorio.',
    funcion: 'Filtra, calienta y humedece el aire antes de que llegue a los pulmones.',
    datoCurioso: 'Los mocos y los pequeños pelos de la nariz ayudan a atrapar polvo y otras partículas presentes en el aire.',
    color: '#26A69A',
  },
  {
    id: 'pulmones', nombre: 'Pulmones', sistemas: ['respiratorio'],
    descripcion: 'Son dos órganos esponjosos que ocupan gran parte del tórax, a ambos lados del corazón.',
    funcion: 'Llevan oxígeno a la sangre y ayudan a eliminar dióxido de carbono.', datoCurioso: 'El pulmón derecho suele ser un poco más grande que el izquierdo.', color: '#33BDF2',
  },
  {
    id: 'traquea', nombre: 'Tráquea', sistemas: ['respiratorio'],
    descripcion: 'Se encuentra delante del esófago y conecta la laringe con los bronquios.',
    funcion: 'Conduce el aire hacia los pulmones y ayuda a limpiarlo mediante el moco y los cilios de sus paredes.',
    datoCurioso: 'Tiene anillos de cartílago en forma de C que evitan que se cierre al respirar.',
    color: '#FF7043',
  },
  {
    id: 'bronquios', nombre: 'Bronquios', sistemas: ['respiratorio'],
    descripcion: 'Son dos conductos que se originan en la parte inferior de la tráquea y entran en los pulmones.',
    funcion: 'Distribuyen el aire dentro de los pulmones a través de ramificaciones cada vez más pequeñas.',
    datoCurioso: 'Se parecen a las ramas de un árbol porque se dividen en conductos más pequeños dentro de los pulmones.',
    color: '#AB47BC',
  },
  {
    id: 'corazon', nombre: 'Corazón', sistemas: ['circulatorio'],
    descripcion: 'Es un músculo situado entre los pulmones, ligeramente hacia la izquierda.',
    funcion: 'Bombea la sangre para que circule por todo el cuerpo.', datoCurioso: 'Late más de 100.000 veces al día.', color: '#F8528D',
  },
  {
    id: 'vasos-sanguineos', nombre: 'Vasos Sanguíneos', sistemas: ['circulatorio'],
    descripcion: 'Son tubos que transportan la sangre por todo el cuerpo.',
    funcion: 'Llevan oxígeno y nutrientes desde el corazón a las células y de vuelta al corazón.', datoCurioso: 'Si uniéramos todos los vasos sanguíneos de una persona adulta, podrían dar más de dos vueltas a la Tierra.', color: '#fa7ca8',
  },
  {
    id: 'higado', nombre: 'Hígado', sistemas: ['digestivo'],
    descripcion: 'Es un órgano grande que ocupa la parte superior derecha del abdomen.',
    funcion: 'Procesa nutrientes, produce bilis y ayuda a limpiar la sangre.', datoCurioso: 'Puede regenerar parte de su tejido.', color: '#F9A65A',
  },
  {
    id: 'estomago', nombre: 'Estómago', sistemas: ['digestivo'],
    descripcion: 'Se encuentra en la parte superior izquierda del abdomen, bajo el diafragma.',
    funcion: 'Mezcla los alimentos con jugos digestivos para descomponerlos.', datoCurioso: 'Su capacidad cambia según cuánto comemos.', color: '#F9E05A',
  },
  {
    id: 'intestinos', nombre: 'Intestinos', sistemas: ['digestivo'],
    descripcion: 'Ocupan la zona central e inferior del abdomen, debajo del estómago.',
    funcion: 'Absorben nutrientes y agua, y ayudan a formar los desechos.', datoCurioso: 'El intestino delgado mide varios metros de largo.', color: '#E9A83A',
  },
  {
    id: 'pancreas', nombre: 'Páncreas', sistemas: ['digestivo'],
    descripcion: 'Está detrás del estómago, atravesando la parte superior del abdomen.',
    funcion: 'Produce sustancias que ayudan a digerir y hormonas que regulan el azúcar en la sangre.', color: '#D59B54',
  },
];
