"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import React from "react";
import * as THREE from "three";

/* ---------------- LOADER ---------------- */

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="monster-loader">

        <div className="loader-circle">
          <span />
        </div>

        <div className="loader-title">
          AWAKENING...
        </div>

        <div className="loader-line">
          <div
            className="loader-progress"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="loader-number">
          {Math.round(progress)}%
        </div>

      </div>
    </Html>
  );
}

/* ---------------- MODEL PATHS ---------------- */

const modelPaths = {
  a: "/models/godzilla-model-a.glb",
  b: "/models/godzilla-model-b.glb",
};

/* ---------------- MODEL ---------------- */

function Model({
  model,
  variant = "showcase",
  isLive = false,
}: {
  model: "a" | "b";
  variant?: "hero" | "showcase" | "footer";
  isLive?: boolean;
}) {
  const gltf = useGLTF(modelPaths[model]);
  const ref = useRef<THREE.Group>(null);

  const config = useMemo(() => {
    const scale =
      variant === "hero" ? 8.4 : variant === "footer" ? 1.75 : 2.35;

    const position: [number, number, number] =
      variant === "hero"
        ? [1.1, -1.25, 0]
        : variant === "footer"
        ? [0, -0.25, 0]
        : [0, -0.15, 0];

    const rotationY = variant === "hero" ? -Math.PI * 0.12 : Math.PI * 0.18;

    return { scale, position, rotationY };
  }, [variant]);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    const idleY = Math.sin(t * 2) * 0.04;
    const idleZ = Math.sin(t * 1.2) * 0.008;

    if (isLive) {
      const stomp = Math.abs(Math.sin(t * 1.5)) * 0.05;
      const sway = Math.sin(t * 0.8) * 0.06;
      const twist = Math.sin(t * 0.6) * 0.02;

      ref.current.position.y = idleY + stomp;
      ref.current.position.x = sway;

      ref.current.rotation.z = idleZ + twist;
      ref.current.rotation.y += Math.sin(t * 0.3) * 0.002;
    } else {
      ref.current.position.y = idleY;
      ref.current.rotation.z = idleZ;
    }
  });

  return (
    <group
      ref={ref}
      rotation={[0, config.rotationY, 0]}
      position={config.position}
      scale={config.scale}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

/* ---------------- STAGE ---------------- */

export default React.memo(function ModelStage({
  model,
  variant = "showcase",
  cameraPosition,
  autoRotate = true,
  autoRotateSpeed = 0.8,
  isLive = false,
}: {
  model: "a" | "b";
  variant?: "hero" | "showcase" | "footer";
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  isLive?: boolean;
}) {
  const defaultCameraPosition: [number, number, number] =
    variant === "hero"
      ? [0, 0.85, 8.2]
      : variant === "footer"
      ? [0, 0.5, 7.8]
      : [0, 0.4, 7.2];

  const finalCameraPosition = cameraPosition ?? defaultCameraPosition;

  const fov = variant === "hero" ? 20 : variant === "footer" ? 34 : 12;

  const dpr =
    typeof window !== "undefined" && window.devicePixelRatio > 1 ? 1.5 : 1;

  return (
    <Canvas
      className="model-canvas"
      dpr={[1, dpr]}
      frameloop="demand"
      camera={{
        position: finalCameraPosition,
        fov,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <directionalLight position={[4, 7, 5]} intensity={1.2} />

      {/* ✅ Loader + Suspense */}
      <Suspense fallback={<Loader />}>
        <Model model={model} variant={variant} isLive={isLive} />

        <Environment preset="city" />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />
      </Suspense>
    </Canvas>
  );
});

/* ---------------- PRELOAD ---------------- */

useGLTF.preload(modelPaths.a);
useGLTF.preload(modelPaths.b);