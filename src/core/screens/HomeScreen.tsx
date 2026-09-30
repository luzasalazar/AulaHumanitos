import { Link } from 'react-router-dom';
import { FolderOpen, ChevronRight } from 'lucide-react';
import Layout from '../ui/Layout';
import AreaCard from '../ui/AreaCard';
import { areaRegistry } from '../registry/areaRegistry';

export default function HomeScreen() {
  return (
    <Layout>
      <div className="text-center mb-10">
        <h1 className="font-poppins font-bold text-4xl md:text-5xl text-morado mb-3">
          ¿Qué quieres aprender hoy?
        </h1>
        <p className="font-montserrat text-base text-negro-suave/60 max-w-xl mx-auto">
          Elige un área para comenzar a explorar y practicar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {areaRegistry.map((area) => (
          <AreaCard key={area.id} area={area} />
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-montserrat font-semibold text-sm text-negro-suave/50 mb-4">
          Otros recursos
        </h2>
        <Link
          to="/banco-material"
          className="group flex items-center gap-5 bg-white rounded-2xl border-l-4 border-morado shadow-sm p-6 transition-all hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-morado"
        >
          <div className="w-14 h-14 rounded-xl bg-morado/10 flex items-center justify-center shrink-0">
            <FolderOpen size={26} color="#882B8E" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="font-poppins font-semibold text-lg text-negro-suave">Banco de Material</h3>
            <p className="font-montserrat text-sm text-negro-suave/60">
              Guías y presentaciones de apoyo para todas las materias.
            </p>
          </div>
          <ChevronRight
            size={22}
            className="text-negro-suave/30 group-hover:text-morado transition-colors shrink-0"
            aria-hidden="true"
          />
        </Link>
      </section>
    </Layout>
  );
}
