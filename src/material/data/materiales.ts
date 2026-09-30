export type TipoMaterial = 'pdf' | 'pptx' | 'docx' | 'imagen';

export interface Material {
  id: string;
  titulo: string;
  /** Debe coincidir con el id de un área (ciencias-naturales, matematicas, ingles)
   *  para heredar su color e ícono; si es un tema general, usa cualquier texto. */
  materia: string;
  tipo: TipoMaterial;
  /** Ruta dentro de /public/materiales/, ej: '/materiales/guia-fracciones.pdf' */
  archivo: string;
}

/**
 * Registro del Banco de Material.
 *
 * Para publicar un archivo nuevo:
 * 1. Copia el archivo real (PDF, PPTX, DOCX, imagen) dentro de `public/materiales/`
 *    en la raíz del proyecto — NO dentro de `src/assets/`. Todo lo que está en
 *    `public/` se copia tal cual al paquete final sin que Vite lo procese,
 *    que es justo lo que necesitas para un PDF o PPTX descargable.
 * 2. Agrega aquí un objeto describiéndolo: título, materia y tipo.
 * 3. En `archivo`, escribe la ruta empezando en `/materiales/...`, con el
 *    mismo nombre del archivo que copiaste.
 *
 * Mientras este arreglo esté vacío, la pantalla de Banco de Material
 * muestra automáticamente el mensaje de "próximamente".
 */
export const materiales: Material[] = [
  // Ejemplo de cómo se vería una vez agregado un archivo real:
  // {
  //   id: 'guia-fracciones',
  //   titulo: 'Guía de fracciones',
  //   materia: 'matematicas',
  //   tipo: 'pdf',
  //   archivo: '/materiales/guia-fracciones.pdf',
  // },
];
