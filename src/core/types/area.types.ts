/**
 * Representa una de las áreas educativas mostradas en la pantalla principal.
 * `disponible` controla si la tarjeta navega a su `path` o se muestra
 * como "Próximamente" (sin ruta funcional todavía).
 */
export interface Area {
  id: string;
  name: string;
  description: string;
  path: string;
  disponible: boolean;
}
