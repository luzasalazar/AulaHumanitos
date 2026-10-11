import type { SistemaId } from './sistemas';

/** Place the matching MP4 files in public/videos/cuerpo-humano/. */
export const videosPorSistema: Record<SistemaId | 'todos', string> = {
  todos: '/videos/cuerpo-humano/cuerpo_completo.mp4',
  circulatorio: '/videos/cuerpo-humano/sistema_circulatorio.mp4',
  digestivo: '/videos/cuerpo-humano/sistema_digestivo.mp4',
  nervioso: '/videos/cuerpo-humano/sistema_nervioso.mp4',
  respiratorio: '/videos/cuerpo-humano/sistema_respiratorio.mp4',
};
