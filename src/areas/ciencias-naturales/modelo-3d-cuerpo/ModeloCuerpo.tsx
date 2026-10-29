import { useState } from 'react';
import Layout from '../../../core/ui/Layout';
import SystemFilters from './components/SystemFilters';
import BodyVideo from './components/BodyVideo';
import OrganList from './components/OrganList';
import OrganInfoPanel from './components/OrganInfoPanel';
import type { OrganId } from './data/organos';
import type { SistemaId } from './data/sistemas';
import { videosPorSistema } from './data/videos';

export default function ModeloCuerpo() {
  const [sistemaActivo, setSistemaActivo] = useState<SistemaId | 'todos'>('todos');
  const [organoSeleccionado, setOrganoSeleccionado] = useState<OrganId | null>(null);

  const handleSistemaChange = (sistema: SistemaId | 'todos') => {
    setSistemaActivo(sistema);
    setOrganoSeleccionado(null);
  };

  return (
    <Layout eyebrow="Ciencias Naturales">
      <h1 className="font-poppins font-bold text-3xl md:text-4xl text-negro-suave mb-2 text-center">
        Cuerpo Humano
      </h1>
      <p className="font-montserrat text-sm text-negro-suave/60 mb-8 text-center">
        Explora los videos de cada sistema del cuerpo y selecciona un órgano para descubrir
        qué hace.
      </p>

      {/* Zona 1: navegación por sistema */}
      <div className="mb-9">
        <SystemFilters sistemaActivo={sistemaActivo} onSelect={handleSistemaChange} />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]">
        {/* Zona 2: reproductor de video */}
        <div
          className="rounded-3xl overflow-hidden border border-black/5"
          style={{ background: 'linear-gradient(180deg, #EAF5E1, #FFFFFF)' }}
        >
          <BodyVideo key={sistemaActivo} src={videosPorSistema[sistemaActivo]} />
        </div>

        {/* Zona 3: lista de órganos + información educativa */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-white border border-black/5 shadow-sm p-4 max-h-56 overflow-y-auto">
            <p className="font-poppins font-semibold text-xs text-negro-suave/50 mb-2 px-1">
              {sistemaActivo === 'todos' ? 'Todos los órganos' : 'Órganos de este sistema'}
            </p>
            <OrganList
              sistemaActivo={sistemaActivo}
              organoSeleccionado={organoSeleccionado}
              onSelect={setOrganoSeleccionado}
            />
          </div>

          <OrganInfoPanel organoId={organoSeleccionado} sistemaActivo={sistemaActivo} />
        </div>
      </div>
    </Layout>
  );
}
