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
  // Ejemplo de cómo se vería una vez agregado un archivo real:
  // {
  //   id: 'M005',
  //   titulo: 'Guía de fracciones',
  //   materia: 'matematicas',
  //   tipo: 'guia',
  //   archivo: '/materiales/guia-fracciones.pdf',
  // },
];
