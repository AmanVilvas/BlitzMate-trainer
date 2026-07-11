import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, SoftShadows, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pawn3D } from './Pawn3D';
import { Board3D } from './Board3D';

gsap.registerPlugin(ScrollTrigger);

// Shared scroll proxy
const scrollProxy = {
  cameraY: 12,
  cameraZ: 1,
  cameraRotX: -Math.PI / 2 + 0.08, // Nearly top-down
  fogDensity: 0.03,
};

function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    // Kill old triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#landing-content',
        start: 'top top',
        end: '40% bottom',
        scrub: 2,
      }
    });

    // Camera descends from bird-eye top-down → face-level cinematic view
    tl.to(scrollProxy, {
      cameraY: 3.5,
      cameraZ: 4,
      cameraRotX: -0.35,
      fogDensity: 0.2,
      ease: 'power3.inOut',
      duration: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useFrame(() => {
    if (!cameraRef.current) return;
    // Lerp camera smoothly toward target
    cameraRef.current.position.y += (scrollProxy.cameraY - cameraRef.current.position.y) * 0.06;
    cameraRef.current.position.z += (scrollProxy.cameraZ - cameraRef.current.position.z) * 0.06;
    cameraRef.current.rotation.x += (scrollProxy.cameraRotX - cameraRef.current.rotation.x) * 0.06;
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 12, 1]}
        rotation={[-Math.PI / 2 + 0.08, 0, 0]}
        fov={50}
      />

      {/* Warm ambient fill — very dim */}
      <ambientLight intensity={0.12} color="#ffe8c8" />

      {/* PRIMARY: Warm spotlight from upper-left — the "museum spotlight" */}
      <spotLight
        position={[-4, 9, 4]}
        target-position={[0, 0, 0]}
        angle={0.45}
        penumbra={1}
        intensity={80}
        color="#ffcc88"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0002}
      />

      {/* SECONDARY: Soft cool-neutral rim light from the right */}
      <spotLight
        position={[5, 4, -3]}
        angle={0.9}
        penumbra={1}
        intensity={15}
        color="#fff5e8"
        castShadow={false}
      />

      {/* Volumetric fog for board fade */}
      <fogExp2 attach="fog" color="#0c0b0a" density={0.03} />

      {/* Starfield for depth */}
      <Stars radius={60} depth={20} count={800} factor={2} saturation={0} fade speed={0.3} />

      {/* Chessboard — sits below the pawn */}
      <Board3D position={[0, -0.8, 0]} />

      {/* Hero Pawn — centered above the board */}
      <Pawn3D position={[0, 0.2, 0]} scale={1.1} />
    </>
  );
}

export function Experience() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0c0b0a');
        }}
      >
        <React.Suspense fallback={null}>
          <SoftShadows size={20} samples={10} focus={0.5} />
          <Scene />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
