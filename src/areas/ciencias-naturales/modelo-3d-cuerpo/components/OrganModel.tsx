import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { Color } from 'three';
import type { Material, Mesh, Object3D } from 'three';
import type { Organo } from '../data/organos';

interface OrganModelProps {
  organo: Organo;
  seleccionado: boolean;
  visible: boolean;
  onSelect: (id: Organo['id']) => void;
}

function cloneWithMaterials(source: Object3D) {
  const clone = source.clone(true);
  clone.traverse((object) => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map((material) => material.clone())
      : (mesh.material as Material).clone();
  });
  return clone;
}

export default function OrganModel({ organo, seleccionado, visible, onSelect }: OrganModelProps) {
  const { scene } = useGLTF(organo.modelPath);
  const model = useMemo(() => cloneWithMaterials(scene), [scene]);

  useEffect(() => {
    model.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      mesh.userData.organId = organo.id;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        const tinted = material as Material & { color?: Color };
        if (tinted.color) {
          if (material.userData.originalColor === undefined) material.userData.originalColor = tinted.color.getHex();
          tinted.color.setHex(material.userData.originalColor);
          if (seleccionado) tinted.color.lerp(new Color('#FFE082'), 0.4);
        }
        const emissive = (material as Material & { emissive?: { set: (color: string) => void; setHex: (color: number) => void; getHex: () => number }; emissiveIntensity?: number }).emissive;
        if (emissive && material.userData.originalEmissive === undefined) {
          material.userData.originalEmissive = emissive.getHex();
          material.userData.originalEmissiveIntensity = (material as Material & { emissiveIntensity?: number }).emissiveIntensity ?? 0;
        }
        if (emissive) {
          emissive.setHex(seleccionado ? 0xffd54a : material.userData.originalEmissive);
          (material as Material & { emissiveIntensity?: number }).emissiveIntensity = seleccionado
            ? 0.65
            : material.userData.originalEmissiveIntensity;
        }
      });
    });
  }, [model, organo.id, seleccionado]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(organo.id);
  };

  return (
    <primitive
      object={model}
      position={organo.position}
      rotation={organo.rotation}
      scale={organo.scale}
      visible={visible}
      onClick={handleClick}
    />
  );
}
