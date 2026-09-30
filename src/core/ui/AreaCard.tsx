import { Link } from 'react-router-dom';
import { Leaf, Calculator, Languages, type LucideIcon } from 'lucide-react';
import type { Area } from '../types/area.types';

interface AreaVisual {
  icon: LucideIcon;
  color: string;
  tint: string;
}

const AREA_VISUALS: Record<string, AreaVisual> = {
  'ciencias-naturales': { icon: Leaf, color: '#4A9B09', tint: '#EAF5E1' },
  matematicas: { icon: Calculator, color: '#33BDF2', tint: '#E7F7FD' },
  ingles: { icon: Languages, color: '#F8528D', tint: '#FDE9F1' },
};

interface AreaCardProps {
  area: Area;
}

export default function AreaCard({ area }: AreaCardProps) {
  const visual = AREA_VISUALS[area.id] ?? AREA_VISUALS['ciencias-naturales'];
  const Icon = visual.icon;

  const card = (
    <div
      className={`relative h-full flex flex-col bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden transition-all duration-200 ${
        area.disponible ? 'group-hover:shadow-lg group-hover:-translate-y-1' : 'opacity-90'
      }`}
    >
      <div className="h-2" style={{ backgroundColor: visual.color }} aria-hidden="true" />

      <div className="flex flex-col flex-1 p-7">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: visual.tint }}
        >
          <Icon size={28} color={visual.color} strokeWidth={2} aria-hidden="true" />
        </div>

        <h3 className="font-poppins font-semibold text-xl text-negro-suave mb-2">
          {area.name}
        </h3>
        <p className="font-montserrat text-sm text-negro-suave/70 leading-relaxed flex-1">
          {area.description}
        </p>

        <div className="mt-6">
          {area.disponible ? (
            <span className="inline-flex items-center font-poppins font-semibold text-sm text-morado bg-amarillo rounded-full px-5 py-2.5 transition-colors group-hover:bg-morado group-hover:text-white">
              Comenzar
            </span>
          ) : (
            <span className="inline-flex items-center font-montserrat text-sm text-negro-suave/50 bg-gris-claro rounded-full px-5 py-2.5 border border-black/10">
              Próximamente
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!area.disponible) {
    return (
      <div className="h-full" aria-disabled="true">
        {card}
      </div>
    );
  }

  return (
    <Link
      to={area.path}
      className="group block h-full rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
      aria-label={`${area.name}: ${area.description}`}
    >
      {card}
    </Link>
  );
}
