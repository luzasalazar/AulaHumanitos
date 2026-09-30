import cuerpoHumanoPreview from '../../assets/previews/cuerpo-humano.svg';

export interface Activity {
  id: string;
  title: string;
  description: string;
  path: string;
  /** Imagen de previsualización opcional. Si no se define, la tarjeta
   *  usa el ícono del área como respaldo. */
  image?: string;
}

/**
 * Actividades disponibles por área.
 *
 * Para agregar una nueva actividad a futuro (por ejemplo "Multiplicaciones"
 * en Matemáticas):
 * 1. Crea la pantalla de esa actividad dentro de `areas/<area>/`.
 * 2. Registra su ruta en `core/router/AppRouter.tsx`.
 * 3. Agrega un objeto aquí, en la lista de esa área. Si tienes una imagen
 *    de previsualización, impórtala arriba y pásala en `image`; si no,
 *    la tarjeta usa automáticamente el ícono del área.
 *
 * La pantalla `AreaActivities` no necesita ningún cambio: lee esta lista
 * automáticamente y muestra el mensaje de "próximamente" si está vacía.
 */
export const activitiesByArea: Record<string, Activity[]> = {
  'ciencias-naturales': [
    {
      id: 'cuerpo-humano',
      title: 'Modelo del Cuerpo Humano',
      description: 'Explora los sistemas y órganos del cuerpo humano en un modelo interactivo en 3D.',
      path: '/ciencias-naturales/cuerpo-humano',
      image: cuerpoHumanoPreview,
    },
  ],
  matematicas: [],
  ingles: [],
};