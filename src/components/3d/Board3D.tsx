import React, { useMemo } from 'react';
import * as THREE from 'three';

interface Board3DProps {
  position?: [number, number, number];
}

export function Board3D({ position = [0, 0, 0] }: Board3DProps) {
  const squareSize = 2;
  const boardSize = squareSize * 8;
  const height = 0.5;

  const squares = useMemo(() => {
    const items = [];
    const walnut = new THREE.Color('#3E2723'); // Dark wood
    const maple = new THREE.Color('#D7CCC8');  // Light wood

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const isLight = (i + j) % 2 !== 0;
        const x = (i - 4 + 0.5) * squareSize;
        const z = (j - 4 + 0.5) * squareSize;
        items.push({
          position: [x, 0, z] as [number, number, number],
          color: isLight ? maple : walnut,
        });
      }
    }
    return items;
  }, []);

  return (
    <group position={position}>
      {/* Board Base / Border */}
      <mesh position={[0, -height / 2 - 0.01, 0]} receiveShadow>
        <boxGeometry args={[boardSize + 1, height, boardSize + 1]} />
        <meshStandardMaterial color="#2c1a12" roughness={0.9} />
      </mesh>

      {/* Squares */}
      {squares.map((sq, idx) => (
        <mesh key={idx} position={sq.position} receiveShadow castShadow>
          <boxGeometry args={[squareSize, height, squareSize]} />
          <meshStandardMaterial 
            color={sq.color} 
            roughness={0.6} // Slight glossy/matte wood
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}
