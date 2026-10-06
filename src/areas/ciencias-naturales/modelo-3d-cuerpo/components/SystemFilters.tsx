import { sistemas } from '../data/sistemas';
import type { SistemaId } from '../data/sistemas';

interface SystemFiltersProps {
  sistemaActivo: SistemaId | 'todos';
  onSelect: (sistema: SistemaId | 'todos') => void;
}

export default function SystemFilters({ sistemaActivo, onSelect }: SystemFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filtrar por sistema">
      <button
        type="button"
        onClick={() => onSelect('todos')}
        aria-pressed={sistemaActivo === 'todos'}
        className={`font-poppins font-semibold text-sm rounded-full px-5 py-2.5 border transition-colors ${
          sistemaActivo === 'todos'
            ? 'bg-verde text-white border-verde'
            : 'bg-white text-negro-suave/70 border-black/10 hover:border-verde/50'
        }`}
      >
        Todo el cuerpo
      </button>

      {sistemas.map((sistema) => {
        const activo = sistemaActivo === sistema.id;
        return (
          <button
            key={sistema.id}
            type="button"
            onClick={() => onSelect(sistema.id)}
            aria-pressed={activo}
            className="font-poppins font-semibold text-sm rounded-full px-5 py-2.5 border transition-colors"
            style={
              activo
                ? { backgroundColor: sistema.color, color: '#1C1C1C', borderColor: sistema.color }
                : { backgroundColor: '#FFFFFF', color: 'rgba(28,28,28,0.6)', borderColor: 'rgba(0,0,0,0.1)' }
            }
          >
            {sistema.nombre}
          </button>
        );
      })}
    </div>
  );
}
