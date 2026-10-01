import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Layout from '../core/ui/Layout';
import EmptyState from '../core/ui/EmptyState';
import MaterialCard from './components/MaterialCard';
import { materiales } from './data/materiales';
import { areaRegistry } from '../core/registry/areaRegistry';

export default function BancoMaterial() {
  const [busqueda, setBusqueda] = useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('todas');

  // Opciones del filtro: se calculan a partir de las materias que
  // realmente aparecen en los materiales registrados.
  const opcionesMateria = useMemo(() => {
    const idsUnicos = Array.from(new Set(materiales.map((material) => material.materia)));
    return idsUnicos.map((id) => ({
      id,
      label: areaRegistry.find((area) => area.id === id)?.name ?? id,
    }));
  }, []);

  const materialesFiltrados = materiales.filter((material) => {
    const coincideBusqueda = material.titulo
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());
    const coincideMateria =
      materiaSeleccionada === 'todas' || material.materia === materiaSeleccionada;
    return coincideBusqueda && coincideMateria;
  });

  return (
    <Layout>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F3E8FB] via-white to-[#FFF8DC] px-8 py-10 mb-8 text-center">
        <span
          className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-amarillo/30"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-10 -right-6 w-32 h-32 rounded-full bg-azul/20"
          aria-hidden="true"
        />
        <span
          className="absolute top-6 right-10 w-6 h-6 rounded-full bg-rosa/40"
          aria-hidden="true"
        />

        <div className="relative">
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl text-negro-suave mb-3">
            Banco de{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Material</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-3 bg-amarillo/70 -z-0"
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="font-montserrat text-base text-negro-suave/70 max-w-xl mx-auto leading-relaxed">
            Guías, presentaciones y documentos de apoyo para todas las áreas — listos para
            explorar cuando quieras.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-negro-suave/40"
            aria-hidden="true"
          />
          <input
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre del documento..."
            aria-label="Buscar material por nombre"
            className="w-full rounded-full border border-black/10 bg-white pl-11 pr-4 py-3 font-montserrat text-sm text-negro-suave placeholder:text-negro-suave/40 focus:outline-none focus:ring-2 focus:ring-azul"
          />
        </div>

        <div className="relative sm:w-56">
          <select
            value={materiaSeleccionada}
            onChange={(event) => setMateriaSeleccionada(event.target.value)}
            aria-label="Filtrar por clase"
            className="w-full appearance-none rounded-full border border-black/10 bg-white pl-5 pr-12 py-3 font-montserrat text-sm text-negro-suave focus:outline-none focus:ring-2 focus:ring-azul"
          >
            <option value="todas">Todas las clases</option>

            {opcionesMateria.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-negro-suave/50"
            aria-hidden="true"
          />
        </div>
      </div>

      {materiales.length === 0 ? (
        <EmptyState message="Muy pronto subiremos guías y presentaciones de todas las materias." />
      ) : materialesFiltrados.length === 0 ? (
        <EmptyState message="No encontramos material que coincida con tu búsqueda." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {materialesFiltrados.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </Layout>
  );
}
