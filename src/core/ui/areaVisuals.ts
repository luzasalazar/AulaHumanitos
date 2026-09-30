import { Leaf, Calculator, Languages, type LucideIcon } from 'lucide-react';

export interface AreaVisual {
  icon: LucideIcon;
  color: string;
  tint: string;
}

export const AREA_VISUALS: Record<string, AreaVisual> = {
  'ciencias-naturales': { icon: Leaf, color: '#4A9B09', tint: '#EAF5E1' },
  matematicas: { icon: Calculator, color: '#33BDF2', tint: '#E7F7FD' },
  ingles: { icon: Languages, color: '#F8528D', tint: '#FDE9F1' },
};

export const DEFAULT_AREA_VISUAL: AreaVisual = AREA_VISUALS['ciencias-naturales'];
