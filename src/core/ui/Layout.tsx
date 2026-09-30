import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  /** Si se define, muestra un botón de regreso en el encabezado. */
  backTo?: { path: string; label: string };
  /** Etiqueta breve de contexto (ej. "Ciencias Naturales") sobre el contenido. */
  eyebrow?: string;
}

export default function Layout({ children, backTo, eyebrow }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gris-claro flex flex-col">
      <header className="bg-morado">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-poppins font-bold text-xl text-white tracking-tight">
              Aula<span className="text-amarillo">Humanitos</span>
            </span>
          </Link>

          {backTo && (
            <Link
              to={backTo.path}
              className="flex items-center gap-2 font-montserrat text-sm text-white/90 rounded-full px-3 py-2 transition-colors hover:text-amarillo focus-visible:outline focus-visible:outline-2 focus-visible:outline-amarillo"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              {backTo.label}
            </Link>
          )}
        </div>
      </header>

      {eyebrow && (
        <div className="max-w-5xl w-full mx-auto px-6 pt-6">
          <p className="font-montserrat text-sm font-semibold text-verde">{eyebrow}</p>
        </div>
      )}

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">{children}</main>

      <footer className="text-center py-6">
        <p className="font-opensans text-xs text-negro-suave/50">
          Fundación Humanitos · AulaHumanitos
        </p>
      </footer>
    </div>
  );
}
