import { FileText, Presentation, Image as ImageIcon, type LucideIcon } from 'lucide-react';
import { TIPO_LABELS, type Material, type TipoMaterial } from '../data/materiales';
import { areaRegistry } from '../../core/registry/areaRegistry';
import { AREA_VISUALS, DEFAULT_AREA_VISUAL } from '../../core/ui/areaVisuals';

const ICONOS_POR_TIPO: Record<TipoMaterial, LucideIcon> = {
  guia: FileText,
  presentacion: Presentation,
  infografia: ImageIcon,
};

interface MaterialCardProps {
  material: Material;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const Icon = ICONOS_POR_TIPO[material.tipo];
  const visual = AREA_VISUALS[material.materia] ?? DEFAULT_AREA_VISUAL;
  const materiaLabel = areaRegistry.find((a) => a.id === material.materia)?.name ?? material.materia;

  return (
    <a
      href={material.archivo}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 bg-white rounded-2xl border border-black/5 shadow-sm p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: visual.tint }}
      >
        <Icon size={24} color={visual.color} strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h3 className="font-poppins font-semibold text-base text-negro-suave">{material.titulo}</h3>
        <p className="font-montserrat text-sm text-negro-suave/60">
          {materiaLabel} · {TIPO_LABELS[material.tipo]}
        </p>
      </div>
    </a>
  );
}
