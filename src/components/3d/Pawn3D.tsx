import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Pawn3DProps {
  position?: [number, number, number];
  scale?: number;
}

export function Pawn3D({ position = [0, 0, 0], scale = 1 }: Pawn3DProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Float gently — breathing motion
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      // Slow gentle rotation
      group.current.rotation.y += 0.003;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    // Flat base ring
    pts.push(new THREE.Vector2(0.0, 0.0));
    pts.push(new THREE.Vector2(0.85, 0.0));
    pts.push(new THREE.Vector2(0.85, 0.12));
    pts.push(new THREE.Vector2(0.78, 0.22));
    pts.push(new THREE.Vector2(0.72, 0.38));
    // Taper up to neck
    pts.push(new THREE.Vector2(0.55, 0.65));
    pts.push(new THREE.Vector2(0.38, 1.05));
    pts.push(new THREE.Vector2(0.28, 1.5));
    // Collar flare
    pts.push(new THREE.Vector2(0.48, 1.62));
    pts.push(new THREE.Vector2(0.5,  1.72));
    pts.push(new THREE.Vector2(0.30, 1.82));
    // Neck to head
    pts.push(new THREE.Vector2(0.22, 2.0));
    // Head sphere approximation
    pts.push(new THREE.Vector2(0.28, 2.10));
    pts.push(new THREE.Vector2(0.45, 2.25));
    pts.push(new THREE.Vector2(0.50, 2.45));
    pts.push(new THREE.Vector2(0.45, 2.65));
    pts.push(new THREE.Vector2(0.28, 2.78));
    pts.push(new THREE.Vector2(0.10, 2.82));
    pts.push(new THREE.Vector2(0.0,  2.83));
    return pts;
  }, []);

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 48]} />
        <meshStandardMaterial
          color="#f8f4ec"          // Warm ivory
          roughness={0.65}          // Matte museum finish
          metalness={0.08}
          envMapIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
