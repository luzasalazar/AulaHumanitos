import Layout from '../core/ui/Layout';
import EmptyState from '../core/ui/EmptyState';
import MaterialCard from './components/MaterialCard';
import { materiales } from './data/materiales';

export default function BancoMaterial() {
  return (
    <Layout eyebrow="Banco de Material" eyebrowColor="#882B8E">
      <h1 className="font-poppins font-bold text-3xl md:text-4xl text-negro-suave mb-3">
        Banco de Material
      </h1>
      <p className="font-montserrat text-base text-negro-suave/70 max-w-2xl mb-8 leading-relaxed">
        Guías, presentaciones y documentos de apoyo para todas las áreas.
      </p>

      {materiales.length === 0 ? (
        <EmptyState message="Muy pronto subiremos guías y presentaciones de todas las materias." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {materiales.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </Layout>
  );
}
