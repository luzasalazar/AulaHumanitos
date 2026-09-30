import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import logo from '../../assets/logo.png';

interface LayoutProps {
  children: ReactNode;
  /** Etiqueta breve de contexto (ej. "Ciencias Naturales") sobre el contenido. */
  eyebrow?: string;
  /** Color del eyebrow; por defecto usa el verde de marca. */
  eyebrowColor?: string;
}

export default function Layout({ children, eyebrow, eyebrowColor = '#4A9B09' }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gris-claro flex flex-col">
      <header className="bg-morado">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Fundación Humanitos" className="h-10 w-10 object-contain" />
            <span className="font-poppins font-bold text-xl text-white tracking-tight">
              Aula<span className="text-amarillo">Humanitos</span>
            </span>
          </Link>

          {!isHome && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                title="Volver a la pantalla anterior"
                aria-label="Volver a la pantalla anterior"
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-colors hover:bg-white/10 hover:text-amarillo focus-visible:outline focus-visible:outline-2 focus-visible:outline-amarillo"
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <Link
                to="/"
                title="Ir al inicio"
                aria-label="Ir al inicio"
                className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-colors hover:bg-white/10 hover:text-amarillo focus-visible:outline focus-visible:outline-2 focus-visible:outline-amarillo"
              >
                <Home size={20} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </header>

      {eyebrow && (
        <div className="max-w-5xl w-full mx-auto px-6 pt-6">
          <p className="font-montserrat text-sm font-semibold" style={{ color: eyebrowColor }}>
            {eyebrow}
          </p>
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
