import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import type { Material, Mesh, Object3D } from 'three';
import type { Organo } from '../data/organos';

interface OrganModelProps {
  organo: Organo;
  atenuado: boolean;
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

export default function OrganModel({ organo, atenuado, visible, onSelect }: OrganModelProps) {
  const { scene } = useGLTF(organo.modelPath);
  const model = useMemo(() => cloneWithMaterials(scene), [scene]);

  useEffect(() => {
    model.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      mesh.userData.organId = organo.id;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        if (material.userData.originalOpacity === undefined) {
          material.userData.originalOpacity = material.opacity;
          material.userData.originalTransparent = material.transparent;
          material.userData.originalDepthWrite = material.depthWrite;
        }
        material.transparent = atenuado ? true : material.userData.originalTransparent;
        material.opacity = atenuado ? 0.12 : material.userData.originalOpacity;
        material.depthWrite = atenuado ? false : material.userData.originalDepthWrite;
        material.needsUpdate = true;
      });
    });
  }, [model, organo.id, atenuado]);

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
