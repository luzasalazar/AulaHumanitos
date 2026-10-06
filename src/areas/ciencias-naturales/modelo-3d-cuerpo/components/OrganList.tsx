import { organos } from '../data/organos';
import type { OrganId } from '../data/organos';
import type { SistemaId } from '../data/sistemas';

interface OrganListProps {
  sistemaActivo: SistemaId | 'todos';
  organoSeleccionado: OrganId | null;
  onSelect: (id: OrganId) => void;
}

export default function OrganList({ sistemaActivo, organoSeleccionado, onSelect }: OrganListProps) {
  const lista =
    sistemaActivo === 'todos' ? organos : organos.filter((o) => o.sistemas.includes(sistemaActivo));

  return (
    <ul className="space-y-1">
      {lista.map((organo) => {
        const activo = organo.id === organoSeleccionado;
        return (
          <li key={organo.id}>
            <button
              type="button"
              onClick={() => onSelect(organo.id)}
              aria-pressed={activo}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left font-montserrat text-sm transition-colors ${
                activo
                  ? 'bg-black/5 font-semibold text-negro-suave'
                  : 'text-negro-suave/70 hover:bg-black/5'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: organo.color }}
                aria-hidden="true"
              />
              {organo.nombre}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
