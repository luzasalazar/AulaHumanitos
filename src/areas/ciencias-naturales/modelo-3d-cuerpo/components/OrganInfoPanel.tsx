import { organos } from '../data/organos';
import { sistemas } from '../data/sistemas';
import type { SistemaId } from '../data/sistemas';

interface OrganInfoPanelProps {
  organoId: string | null;
  sistemaActivo: SistemaId | 'todos';
}

export default function OrganInfoPanel({ organoId, sistemaActivo }: OrganInfoPanelProps) {
  const organo = organos.find((o) => o.id === organoId);

  if (!organo) {
    const sistema = sistemaActivo === 'todos' ? null : sistemas.find((s) => s.id === sistemaActivo);
    return (
      <div className="rounded-2xl border-2 border-dashed border-black/10 bg-white p-5 text-center">
        <p className="font-montserrat text-sm text-negro-suave/60">
          {sistema
            ? `Toca un órgano del sistema ${sistema.nombre.toLowerCase()} para conocer más sobre él.`
            : 'Toca un órgano del modelo o de la lista para conocer más sobre él.'}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-black/5 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: organo.color }}
          aria-hidden="true"
        />
        <h3 className="font-poppins font-bold text-lg text-negro-suave">{organo.nombre}</h3>
      </div>

      <p className="font-montserrat text-sm text-negro-suave/80 leading-relaxed mb-3">
        {organo.descripcion}
      </p>

      <div className="mb-3">
        <p className="font-poppins font-semibold text-xs text-negro-suave/50 mb-1">¿Qué hace?</p>
        <p className="font-montserrat text-sm text-negro-suave/80 leading-relaxed">
          {organo.funcion}
        </p>
      </div>

      {organo.datoCurioso && (
        <div className="rounded-xl bg-amarillo/15 px-4 py-3">
          <p className="font-montserrat text-sm text-negro-suave/80 leading-relaxed">
            <span className="font-semibold">Dato curioso: </span>
            {organo.datoCurioso}
          </p>
        </div>
      )}
    </div>
  );
}
