import { useMemo } from 'react';
import * as THREE from 'three';

const SKIN = '#F2C6A4';
const SEGMENTS = 28;

/**
 * No tengo coordenadas de cadera/pie en tu `organos.ts` actual (el órgano
 * más bajo es la vejiga, en y=0.82), así que el largo de las piernas es una
 * proporción humana estándar relativa al torso que ya sí está calibrado con
 * tus datos reales — no un valor medido como el resto del cuerpo. Si al
 * verla no coincide con lo que esperabas, ajusta solo esta constante.
 */
const LARGO_PIERNA = 2.3;

type Perfil = [radio: number, y: number][];

// Perfil del torso + cuello + cabeza, de abajo hacia arriba. El tronco deja
// espacio alrededor de los órganos; la cabeza cubre el cerebro (centrado en
// y=3.72, con radio aproximado de 0.34 tras aplicar su escala).
const PERFIL_TORSO: Perfil = [
  [0.38, 0.68],
  [0.49, 0.85],
  [0.52, 1.15],
  [0.54, 1.55],
  [0.55, 1.95],
  [0.55, 2.3],
  [0.56, 2.6],
  [0.56, 2.9],
  [0.5, 3.0],
  [0.2, 3.08],
  [0.15, 3.17],
  [0.15, 3.3],
  [0.24, 3.38],
  [0.38, 3.48],
  [0.42, 3.65],
  [0.42, 3.86],
  [0.38, 4.03],
  [0.24, 4.15],
  [0, 4.22],
];

// Del hombro (y=0, local) hacia la mano (y negativo). Se posiciona a cada
// lado del torso.
const PERFIL_BRAZO: Perfil = [
  [0.15, 0],
  [0.125, -0.25],
  [0.095, -0.75],
  [0.083, -1.05],
  [0.072, -1.55],
  [0.095, -1.7],
  [0.035, -1.85],
];

// De la cadera (y=0, local) hacia el pie (y negativo), escalado por
// LARGO_PIERNA.
const PERFIL_PIERNA: Perfil = [
  [0.21, 0],
  [0.185, -0.13 * LARGO_PIERNA],
  [0.145, -0.32 * LARGO_PIERNA],
  [0.125, -0.45 * LARGO_PIERNA],
  [0.1, -0.62 * LARGO_PIERNA],
  [0.125, -0.68 * LARGO_PIERNA],
  [0.08, -0.76 * LARGO_PIERNA],
];

function perfilAPuntos(perfil: Perfil) {
  return perfil.map(([radio, y]) => new THREE.Vector2(radio, y));
}

export default function BodySilhouette() {
  const torso = useMemo(
    () => new THREE.LatheGeometry(perfilAPuntos(PERFIL_TORSO), SEGMENTS),
    [],
  );
  const brazo = useMemo(
    () => new THREE.LatheGeometry(perfilAPuntos(PERFIL_BRAZO), SEGMENTS),
    [],
  );
  const pierna = useMemo(
    () => new THREE.LatheGeometry(perfilAPuntos(PERFIL_PIERNA), SEGMENTS),
    [],
  );

  // Un solo material compartido: translúcido y sin escribir en el buffer de
  // profundidad, para que nunca tape visualmente a los órganos.
  const piel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SKIN,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  return (
    <group>
      {/* raycast={() => null} en cada mesh: la silueta es puramente visual,
          los clics la atraviesan directo hacia los órganos. */}
      <mesh geometry={torso} material={piel} raycast={() => null} />

      <mesh geometry={brazo} material={piel} position={[-0.67, 2.95, 0]} raycast={() => null} />
      <mesh geometry={brazo} material={piel} position={[0.67, 2.95, 0]} raycast={() => null} />

      <mesh geometry={pierna} material={piel} position={[-0.2, 0.68, 0]} raycast={() => null} />
      <mesh geometry={pierna} material={piel} position={[0.2, 0.68, 0]} raycast={() => null} />
    </group>
  );
}
