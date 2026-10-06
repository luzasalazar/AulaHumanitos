import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HumanBody from './HumanBody';
import CameraFocus from './CameraFocus';
import { organos } from '../data/organos';
import type { OrganId } from '../data/organos';
import type { SistemaId } from '../data/sistemas';

interface BodySceneProps {
  sistemaActivo: SistemaId | 'todos';
  organoSeleccionado: OrganId | null;
  onSelectOrgano: (id: OrganId | null) => void;
}

const CENTRO_CUERPO: [number, number, number] = [0, 2.35, 0];

export default function BodyScene({ sistemaActivo, organoSeleccionado, onSelectOrgano }: BodySceneProps) {
  const organoActivo = organos.find((o) => o.id === organoSeleccionado);
  const puntoDeEnfoque = organoActivo?.position ?? CENTRO_CUERPO;

  return (
    <Canvas
      camera={{ position: [0, 2.5, 5.8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => onSelectOrgano(null)}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 5, 4]} intensity={2.1} />
      <directionalLight position={[-3, 2, -4]} intensity={0.8} />

      <HumanBody
        sistemaActivo={sistemaActivo}
        organoSeleccionado={organoSeleccionado}
        onSelectOrgano={onSelectOrgano}
      />
      <CameraFocus targetPosition={puntoDeEnfoque} />

      <OrbitControls
        makeDefault
        target={CENTRO_CUERPO}
        enablePan={false}
        minDistance={2.4}
        maxDistance={7.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
