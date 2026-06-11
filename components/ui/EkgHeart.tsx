"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Environment,
  ContactShadows,
  Trail,
} from "@react-three/drei";
import * as THREE from "three";

/* =====================================================================
   EkgHeart — cinematic WebGL hero
   - Physically-shaded anatomical-ish heart that beats in lub-dub
   - Glowing 3D EKG ribbon (tube geometry) running through space
   - Bright "comet" particle racing along the ribbon, leaving a trail
   - Ambient gold particle field with depth
   - Slow camera dolly + subtle parallax
   - Studio HDR environment for premium reflections
   ===================================================================== */

const BEAT = 0.92; // seconds per cardiac cycle (~65 BPM)
const R_WAVE = 0.46; // fraction of cycle at QRS peak

// --- Build a 3D heart by extruding a 2D heart shape ------------------
function useHeartGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    const x = 0,
      y = 0;
    s.moveTo(x, y);
    s.bezierCurveTo(x, y - 0.6, x - 1.4, y - 0.6, x - 1.4, y + 0.5);
    s.bezierCurveTo(x - 1.4, y + 1.3, x - 0.7, y + 1.6, x, y + 2.4);
    s.bezierCurveTo(x + 0.7, y + 1.6, x + 1.4, y + 1.3, x + 1.4, y + 0.5);
    s.bezierCurveTo(x + 1.4, y - 0.6, x, y - 0.6, x, y);

    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.9,
      bevelEnabled: true,
      bevelSegments: 24,
      bevelThickness: 0.55,
      bevelSize: 0.55,
      steps: 4,
      curveSegments: 64,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, []);
}

// --- Cardiac scaling curve (lub-dub) ---------------------------------
function beatScale(t: number) {
  const c = (t / BEAT) % 1;
  // Atrial bump, big ventricular contraction at R, recoil, T relaxation
  if (c < R_WAVE - 0.12) return 1;
  if (c < R_WAVE - 0.05) return 1 + 0.025 * ((c - (R_WAVE - 0.12)) / 0.07);
  if (c < R_WAVE) return 1.025 + 0.06 * ((c - (R_WAVE - 0.05)) / 0.05);
  if (c < R_WAVE + 0.12) return 1.085 - 0.07 * ((c - R_WAVE) / 0.12);
  if (c < R_WAVE + 0.3) return 1.015 + 0.03 * ((c - R_WAVE - 0.12) / 0.18);
  if (c < 0.85) return 1.045 - 0.045 * ((c - R_WAVE - 0.3) / (0.85 - R_WAVE - 0.3));
  return 1;
}

function Heart() {
  const geometry = useHeartGeometry();
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const arteryRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = beatScale(t);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(s);
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.22) * 0.06;
    }
    // R-wave halo flash
    if (haloRef.current) {
      const c = (t / BEAT) % 1;
      const flash =
        c < R_WAVE - 0.04 || c > R_WAVE + 0.4
          ? 0
          : Math.max(0, 1 - Math.abs(c - R_WAVE) * 7);
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.05 + flash * 0.35;
      haloRef.current.scale.setScalar(1.45 + flash * 0.18);
    }
    if (arteryRef.current) {
      const c = (t / BEAT) % 1;
      const ignite = Math.max(0, 1 - Math.abs(c - R_WAVE) * 5);
      const mat = arteryRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.25 + ignite * 0.75;
    }
  });

  // Gold "coronary" wireframe overlay
  const arteries = useMemo(() => {
    const edges = new THREE.EdgesGeometry(geometry, 35);
    return edges;
  }, [geometry]);

  return (
    <group rotation={[Math.PI, 0, 0]}>
      {/* Soft halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#E8364E"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={groupRef}>
        {/* Body — premium physical material with clearcoat */}
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#A8132B"
            roughness={0.32}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.18}
            sheen={1}
            sheenColor="#FF6B7E"
            sheenRoughness={0.5}
            emissive="#3A0612"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Subsurface "inner glow" — slightly smaller, additive */}
        <mesh geometry={geometry} scale={0.96}>
          <meshBasicMaterial
            color="#FF4D6A"
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Gold coronary edges that flare on each R-wave */}
        <lineSegments ref={arteryRef} geometry={arteries} scale={1.005}>
          <lineBasicMaterial
            color="#FFE9A8"
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>
    </group>
  );
}

// --- The 3D EKG ribbon -----------------------------------------------
function ekgCurve() {
  // Lead II rhythm pulled through 3D space, with slight z-curl so it
  // feels like it lives in the world rather than pasted on glass
  const pts: THREE.Vector3[] = [];
  const L = 22;
  const N = 380;
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const x = -L / 2 + u * L;
    let y = 0;
    // Six beats across the span
    const beats = 6;
    const c = (u * beats) % 1;
    if (c > 0.12 && c < 0.18) y = 0.18 * Math.sin(((c - 0.12) / 0.06) * Math.PI);
    else if (c > 0.22 && c < 0.27) y = -0.12;
    else if (c > 0.27 && c < 0.305) y = 1.55;
    else if (c > 0.305 && c < 0.345) y = -0.6;
    else if (c > 0.345 && c < 0.38) y = 0.05;
    else if (c > 0.5 && c < 0.6) y = 0.35 * Math.sin(((c - 0.5) / 0.1) * Math.PI);
    const z = Math.sin(u * Math.PI * 2) * 0.6;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
}

function EkgRibbon() {
  const curve = useMemo(() => ekgCurve(), []);

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 600, 0.045, 12, false),
    [curve]
  );
  const tubeGlow = useMemo(
    () => new THREE.TubeGeometry(curve, 600, 0.14, 12, false),
    [curve]
  );

  return (
    <group position={[0, -0.2, -1.2]}>
      {/* Outer soft glow */}
      <mesh geometry={tubeGlow}>
        <meshBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Inner bright line */}
      <mesh geometry={tube}>
        <meshBasicMaterial
          color="#FFE9A8"
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>

      <CometRunner curve={curve} />
    </group>
  );
}

// --- Bright comet that races along the curve with a trail ------------
function CometRunner({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const u = (t / (BEAT * 6)) % 1; // one full sweep over six beats
    const p = curve.getPointAt(u);
    if (ref.current) ref.current.position.copy(p);
  });
  return (
    <Trail
      width={2}
      length={6}
      color={"#FFE9A8"}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>
    </Trail>
  );
}

// --- Slow camera dolly + parallax ------------------------------------
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const cam = state.camera;
    const targetX = Math.sin(t * 0.12) * 0.6;
    const targetY = Math.cos(t * 0.09) * 0.35 + 0.1;
    const targetZ = 7.4 + Math.sin(t * 0.07) * 0.4;
    cam.position.x += (targetX - cam.position.x) * 0.02;
    cam.position.y += (targetY - cam.position.y) * 0.02;
    cam.position.z += (targetZ - cam.position.z) * 0.02;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

// --- The full scene --------------------------------------------------
function Scene() {
  return (
    <>
      <color attach="background" args={["#050811"]} />
      <fog attach="fog" args={["#050811", 9, 22]} />

      {/* Studio HDR for premium reflections */}
      <Environment preset="studio" />

      {/* Key & rim lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#FFE2B5" castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.9} color="#7AB6FF" />
      <pointLight position={[0, 0, 4]} intensity={1.4} color="#FF4D6A" distance={9} decay={2} />
      <pointLight position={[3, -2, 2]} intensity={1.1} color="#C9A84C" distance={8} decay={2} />

      {/* Hero */}
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.35}>
        <Heart />
      </Float>

      {/* The ribbon */}
      <EkgRibbon />

      {/* Ambient particle field with depth */}
      <Sparkles count={140} scale={[14, 8, 8]} size={3} speed={0.25} color="#C9A84C" opacity={0.6} />
      <Sparkles count={60} scale={[18, 10, 6]} size={6} speed={0.15} color="#FFE9A8" opacity={0.4} />
      <Sparkles count={40} scale={[10, 6, 4]} size={2} speed={0.4} color="#FF6B7E" opacity={0.5} />

      {/* Soft floor shadow grounding the heart */}
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.55}
        scale={10}
        blur={3}
        far={6}
        color="#000"
      />

      <CameraRig />
    </>
  );
}

export function EkgHeart({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative w-full h-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0.2, 7.4], fov: 38 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>

        {/* HUD overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 font-mono text-xs tracking-[0.2em]">
          <div className="flex items-center gap-2 text-gold-400/70">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LEAD II · LIVE
          </div>
          <div className="self-end text-right">
            <div className="text-gold-300/90 text-3xl font-bold tracking-tight tabular-nums">65</div>
            <div className="text-gold-400/60 text-[10px]">BPM · HEART RATE</div>
          </div>
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)"
        }} />
      </div>
    </div>
  );
}

// Help TS see custom JSX elements
export type _R3FTypeHelper = ThreeElements;
