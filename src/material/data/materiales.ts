export type TipoMaterial = 'guia' | 'presentacion' | 'infografia';

export interface Material {
  id: string;
  titulo: string;
  /** Puede coincidir con el id de un área (ciencias-naturales, matematicas, ingles)
   *  para heredar su color e ícono; sino escribir el nombre de otra área. */
  materia: string;
  /** Debe ser uno de los valores de `TipoMaterial` */
  tipo: TipoMaterial;
  /** Ruta dentro de /public/materiales/, ej: '/materiales/guia-fracciones.pdf' */
  archivo: string;
}

/** Etiqueta para mostrar cada tipo de material en pantalla. */
export const TIPO_LABELS: Record<TipoMaterial, string> = {
  guia: 'Guía',
  presentacion: 'Presentación',
  infografia: 'Infografía',
};

/**
 * Registro del Banco de Material.
 *
 * Para agregar un archivo nuevo:
 * 1. Copia el archivo (PDF, PPTX, DOCX, imagen) dentro de `public/materiales/`
 *    en la raíz del proyecto. Todo lo que está en
 *    `public/`.
 * 2. Agrega en la lista de materiales un objeto de tipo `Material`.
 * 3. En `archivo`, escribe la ruta empezando en `/materiales/...`, con el
 *    mismo nombre del archivo que copiaste.
 *
 */
export const materiales: Material[] = [
    {
        id: 'M001',
        titulo: 'Guía de sumas',
        materia: 'matematicas',
        tipo: 'guia',
        archivo: '/materiales/Guia_Sumas_y_Restas.pdf',
    },
    {
        id: 'M002',
        titulo: 'Aprendizaje de máquina',
        materia: 'Tecnología',
        tipo: 'presentacion',
        archivo: '/materiales/Aprendizaje de maquina.pptx',
    },
    {
        id: 'M003',
        titulo: 'Guía energías renovables',
        materia: 'ciencias-naturales',
        tipo: 'guia',
        archivo: '/materiales/Parcial 1_Localizacion Falla Parque Solar.pdf',
    },
    {
        id: 'M004',
        titulo: 'Teorema Maestro',
        materia: 'matematicas',
        tipo: 'presentacion',
        archivo: '/materiales/Presentación-Teorema Maestro.pptx',
    },
    {
        id: 'M005',
        titulo: 'Taller Verbo To Be',
        materia: 'ingles',
        tipo: 'guia',
        archivo: '/materiales/Taller_DOFA_Lumina_v1.pdf',
    },
  // Ejemplo de cómo se vería una vez agregado un archivo real:
  // {
  //   id: 'guia-fracciones',
  //   titulo: 'Guía de fracciones',
  //   materia: 'matematicas',
  //   tipo: 'guia',
  //   archivo: '/materiales/guia-fracciones.pdf',
  // },
];
