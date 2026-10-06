import { Suspense } from 'react';
import { Html } from '@react-three/drei';
import { organos } from '../data/organos';
import type { OrganId } from '../data/organos';
import type { SistemaId } from '../data/sistemas';
import OrganModel from './OrganModel';

interface HumanBodyProps {
  sistemaActivo: SistemaId | 'todos';
  organoSeleccionado: OrganId | null;
  onSelectOrgano: (id: OrganId | null) => void;
}

function Modelos() {
  return <Html center className="pointer-events-none whitespace-nowrap rounded-lg bg-white/90 px-3 py-2 text-sm text-slate-600 shadow">Cargando modelos…</Html>;
}

export default function HumanBody({ sistemaActivo, organoSeleccionado, onSelectOrgano }: HumanBodyProps) {
  return (
    <Suspense fallback={<Modelos />}>
      {organos.map((organo) => (
        <OrganModel
          key={organo.id}
          organo={organo}
          seleccionado={organo.id === organoSeleccionado}
          visible={sistemaActivo === 'todos' || organo.sistemas.includes(sistemaActivo)}
          onSelect={onSelectOrgano}
        />
      ))}
    </Suspense>
  );
}
