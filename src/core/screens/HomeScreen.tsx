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
    </Layout>
  );
}
