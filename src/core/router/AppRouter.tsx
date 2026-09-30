import { HashRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import ModeloCuerpo from '../../areas/ciencias-naturales/modelo-3d-cuerpo/ModeloCuerpo';

/**
 * Se usa HashRouter (en vez de BrowserRouter) porque la app se sirve
 * como archivos locales dentro de Tauri, sin un servidor que resuelva
 * rutas — el hash evita errores de navegación al recargar o al empaquetar.
 */
export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ciencias-naturales" element={<ModeloCuerpo />} />
      </Routes>
    </HashRouter>
  );
}
