"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function HeartModel({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url, true);
  const groupRef = useRef<THREE.Group>(null);

  // Recolor the model's materials with an anatomical heart tone.
  const tinted = useMemo(() => {
    const clone = scene.clone(true);
    const target = new THREE.Color(color);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = new THREE.MeshStandardMaterial({
          color: target,
          roughness: 0.35,
          metalness: 0.05,
        });
        mesh.material = mat;
      }
    });
    return clone;
  }, [scene, color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow rotation
    groupRef.current.rotation.y = t * 0.25;
    // Heartbeat pulse (lub-dub at ~70 BPM = 0.85s cycle)
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
  color?: string;
}

export function GlbHeart({
  url = "/models/hero-heart.glb",
  className,
  color = "#c4243a",
}: GlbHeartProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff5e6" />
        <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#ff6b8a" />
        <pointLight position={[0, -3, 3]} intensity={0.5} color="#C9A84C" />

        <Suspense fallback={null}>
          <HeartModel url={url} color={color} />
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
