import { PersonStanding } from 'lucide-react';
import Layout from '../../../core/ui/Layout';

/**
 * Pantalla provisional. Aquí se incorporará más adelante el modelo 3D
 * (react-three-fiber + .glb + selección de órganos). Por ahora solo
 * reserva el espacio visual y la navegación.
 */
export default function ModeloCuerpo() {
  return (
    <Layout backTo={{ path: '/', label: 'Volver al inicio' }} eyebrow="Ciencias Naturales">
      <h1 className="font-poppins font-bold text-3xl md:text-4xl text-negro-suave mb-4">
        Cuerpo Humano
      </h1>
      <p className="font-montserrat text-base text-negro-suave/70 max-w-2xl mb-8 leading-relaxed">
        Explora los sistemas del cuerpo humano y descubre la función de cada
        órgano en un modelo interactivo en tres dimensiones.
      </p>

      <div className="rounded-3xl border-2 border-dashed border-verde/40 bg-[#EAF5E1] flex flex-col items-center justify-center text-center py-24 px-6">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm">
          <PersonStanding size={40} color="#4A9B09" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h2 className="font-poppins font-semibold text-xl text-negro-suave mb-2">
          Modelo 3D del cuerpo humano
        </h2>
        <span className="inline-flex font-montserrat text-sm text-verde bg-white rounded-full px-4 py-1.5 border border-verde/30">
          Próximamente
        </span>
      </div>
    </Layout>
  );
}
