"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function HeartModel({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);
  const groupRef = useRef<THREE.Group>(null);

  // The compressed model lost its textures (renders white), so paint it
  // with anatomical reds — varied per mesh for wet cardiac-tissue depth.
  const tinted = useMemo(() => {
    const clone = scene.clone(true);
    const anatomicalColors = ["#7a0000", "#8B0000", "#6B0000", "#9B1010", "#A01828"];
    let meshIndex = 0;
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const shade = anatomicalColors[meshIndex % anatomicalColors.length];
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(shade),
          roughness: 0.3 + (meshIndex % 3) * 0.08, // vary roughness slightly
          metalness: 0.05,
          envMapIntensity: 1.4,
        });
        meshIndex++;
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Heartbeat pulse (lub-dub at ~70 BPM = 0.85s cycle) — no rotation
    const cycle = (t % 0.85) / 0.85;
    let scale = 1;
    if (cycle < 0.15) scale = 1 + 0.06 * (cycle / 0.15);
    else if (cycle < 0.3) scale = 1.06 - 0.06 * ((cycle - 0.15) / 0.15);
    else if (cycle < 0.45) scale = 1 + 0.09 * ((cycle - 0.3) / 0.15);
    else if (cycle < 0.7) scale = 1.09 - 0.09 * ((cycle - 0.45) / 0.25);
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={tinted} />
      </group>
    </Center>
  );
}

interface GlbHeartProps {
  url?: string;
  className?: string;
}

export function GlbHeart({ url = "/models/hero-heart.glb", className }: GlbHeartProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        {/* Main warm key light from top-right */}
        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#fff0e0" />
        {/* Cool fill from the left to reveal depth */}
        <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#ffcccc" />
        {/* Rim/backlight for the wet-tissue gloss */}
        <pointLight position={[0, -2, 4]} intensity={1.2} color="#ff4444" />
        {/* Subtle bounce light from below */}
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#cc0000" />

        <Suspense fallback={null}>
          <HeartModel url={url} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI * 2) / 3}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/hero-heart.glb", true);
