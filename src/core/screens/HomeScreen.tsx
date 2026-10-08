import { Link } from 'react-router-dom';
import { FolderOpen, ChevronRight } from 'lucide-react';
import Layout from '../ui/Layout';
import AreaCard from '../ui/AreaCard';
import { areaRegistry } from '../registry/areaRegistry';
import vicky from '../../assets/vicky.png';

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

      <section className="mt-10">
        <h2 className="font-montserrat font-semibold text-md text-negro-suave/50 mb-3">
          Sección para docentes
        </h2>

        <Link
          to="/banco-material"
          className="group flex items-center w-full h-36 bg-white rounded-2xl border-l-4 border-morado shadow-sm px-6 transition-all hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-morado"
        >
          {/* Icono */}
          <div className="w-14 h-14 rounded-xl bg-morado/10 flex items-center justify-center shrink-0">
            <FolderOpen
              size={26}
              color="#882B8E"
              aria-hidden="true"
            />
          </div>

          {/* Texto */}
          <div className="ml-5 shrink-0 max-w-[400px]">
            <h3 className="font-poppins font-semibold text-lg text-negro-suave">
              Banco de Material
            </h3>

            <p className="font-montserrat text-sm text-negro-suave/60">
              Guías y presentaciones de apoyo para todas las materias.
            </p>
          </div>

          {/* Profesora: ocupa todo el espacio disponible */}
          <div className="flex-1 h-full flex items-end justify-center overflow-hidden">
            <img
              src={vicky}
              alt=""
              className="max-h-[90%] w-full object-contain object-bottom"
            />
          </div>

          {/* Flecha */}
          <ChevronRight
            size={22}
            className="text-negro-suave/30 group-hover:text-morado transition-colors shrink-0 ml-4"
            aria-hidden="true"
          />
        </Link>
      </section>
    </Layout>
  );
}
