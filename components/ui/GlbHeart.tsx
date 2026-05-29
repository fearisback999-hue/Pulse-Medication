"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function HeartModel({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);
  const groupRef = useRef<THREE.Group>(null);

  // This model ships with baked PBR textures (red body, gold coronaries,
  // pink aorta), so keep its original materials — just hide the stray
  // leftover "Cube" mesh that came with the export.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.name === "Cube") child.visible = false;
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
        <primitive object={model} />
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
        {/* Neutral lighting so the model's baked PBR colors read true */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, -2, 4]} intensity={0.6} color="#ffffff" />

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
