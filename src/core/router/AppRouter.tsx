import { useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import AreaActivities from '../screens/AreaActivities';
import BancoMaterial from '../../material/BancoMaterial';
import ModeloCuerpo from '../../areas/ciencias-naturales/modelo-3d-cuerpo/ModeloCuerpo';

function ScrollToTop() {
  const { key } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [key]);

  return null;
}

/**
 * Se usa HashRouter (en vez de BrowserRouter) porque la app se sirve
 * como archivos locales dentro de Tauri, sin un servidor que resuelva
 * rutas — el hash evita errores de navegación al recargar o al empaquetar.
 *
 * Las rutas de actividades concretas (ej. /ciencias-naturales/cuerpo-humano)
 * deben declararse ANTES de "/:areaId", aunque en React Router v6 el orden
 * no es estrictamente necesario porque siempre gana la ruta más específica.
 */
export default function AppRouter() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/banco-material" element={<BancoMaterial />} />
        <Route path="/ciencias-naturales/cuerpo-humano" element={<ModeloCuerpo />} />
        <Route path="/:areaId" element={<AreaActivities />} />
      </Routes>
    </HashRouter>
  );
}
