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

// Perfil del torso + cuello + cabeza, de abajo hacia arriba. Los puntos
// están alineados con tus órganos reales: cintura (0.95-2.3) rodea
// estómago/hígado/riñones/páncreas; pecho (2.6-2.9) rodea pulmones/corazón/
// timo; cuello (3.08-3.45) rodea la tiroides; cabeza (3.55-4.1) rodea el
// cerebro.
const PERFIL_TORSO: Perfil = [
  [0.34, 0.55],
  [0.4, 0.85],
  [0.38, 1.15],
  [0.3, 1.55],
  [0.31, 1.95],
  [0.37, 2.3],
  [0.44, 2.6],
  [0.46, 2.9],
  [0.42, 3.0],
  [0.2, 3.08],
  [0.15, 3.17],
  [0.15, 3.45],
  [0.19, 3.55],
  [0.31, 3.7],
  [0.31, 3.85],
  [0.19, 4.0],
  [0, 4.1],
];

// Del hombro (y=0, local) hacia la mano (y negativo). Se posiciona a cada
// lado del torso.
const PERFIL_BRAZO: Perfil = [
  [0.13, 0],
  [0.11, -0.25],
  [0.085, -0.75],
  [0.075, -1.05],
  [0.065, -1.55],
  [0.085, -1.7],
  [0.03, -1.85],
];

// De la cadera (y=0, local) hacia el pie (y negativo), escalado por
// LARGO_PIERNA.
const PERFIL_PIERNA: Perfil = [
  [0.19, 0],
  [0.17, -0.13 * LARGO_PIERNA],
  [0.13, -0.32 * LARGO_PIERNA],
  [0.11, -0.45 * LARGO_PIERNA],
  [0.09, -0.62 * LARGO_PIERNA],
  [0.11, -0.68 * LARGO_PIERNA],
  [0.07, -0.76 * LARGO_PIERNA],
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

      <mesh geometry={brazo} material={piel} position={[-0.5, 2.95, 0]} raycast={() => null} />
      <mesh geometry={brazo} material={piel} position={[0.5, 2.95, 0]} raycast={() => null} />

      <mesh geometry={pierna} material={piel} position={[-0.2, 0.8, 0]} raycast={() => null} />
      <mesh geometry={pierna} material={piel} position={[0.2, 0.8, 0]} raycast={() => null} />
    </group>
  );
}
