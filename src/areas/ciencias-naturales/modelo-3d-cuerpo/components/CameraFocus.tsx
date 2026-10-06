import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

interface CameraFocusProps {
  targetPosition: [number, number, number];
}

/**
 * No mueve la cámara directamente: va acercando suavemente el punto hacia
 * el que mira OrbitControls (su `target`) hasta la posición del órgano
 * seleccionado, o de vuelta al centro del cuerpo cuando no hay selección.
 */
export default function CameraFocus({ targetPosition }: CameraFocusProps) {
  const desired = useRef(new Vector3());

  useFrame((state) => {
    const controls = state.controls as unknown as {
      target: Vector3;
      update: () => void;
    } | null;
    if (!controls) return;

    desired.current.set(...targetPosition);
    controls.target.lerp(desired.current, 0.08);
    controls.update();
  });

  return null;
}
