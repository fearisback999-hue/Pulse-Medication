"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center, Bounds } from "@react-three/drei";
import * as THREE from "three";

function HeartModel({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);
  const groupRef = useRef<THREE.Group>(null);

  // This model ships with baked PBR textures (red body, gold coronaries,
  // pink aorta), so keep its original materials. Fully REMOVE the stray
  // leftover "Cube" mesh — just hiding it still lets <Bounds> measure it,
  // which shrinks the whole model.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const junk: THREE.Object3D[] = [];
    clone.traverse((child) => {
      if (child.name === "Cube") junk.push(child);
    });
    junk.forEach((node) => node.parent?.remove(node));
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Heartbeat pulse (lub-dub at ~70 BPM = 0.85s cycle) — no rotation
    const cycle = (t % 0.85) / 0.85;
    // Small amplitude so the (now much larger) heart never clips the frame.
    let scale = 1;
    if (cycle < 0.15) scale = 1 + 0.025 * (cycle / 0.15);
    else if (cycle < 0.3) scale = 1.025 - 0.025 * ((cycle - 0.15) / 0.15);
    else if (cycle < 0.45) scale = 1 + 0.04 * ((cycle - 0.3) / 0.15);
    else if (cycle < 0.7) scale = 1.04 - 0.04 * ((cycle - 0.45) / 0.25);
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
          {/* Bounds auto-fits the model to the frame so it can't be cropped;
              the small margin keeps a little padding even at the beat's peak. */}
          <Bounds fit clip observe margin={0.97}>
            <HeartModel url={url} />
          </Bounds>
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
