"use client";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSpaceAtlas } from "@/lib/space/store";
import { findBody } from "@/data/space";

/**
 * Camera controller.
 *
 *  - Free orbit / zoom / pan via drei's <OrbitControls>.
 *  - When the user selects a body:
 *      1. Pause the orbital simulation so the body holds still.
 *      2. Compute the desired camera position based on the body's
 *         current world position.
 *      3. Lerp the camera to that position.
 *      4. After arrival, switch to "follow" mode: translate the
 *         camera + target by the body's per-frame delta so the user
 *         can still orbit/zoom freely while the body drifts.
 *  - When the user deselects (Reset view): resume the simulation,
 *    fly back to the default overview position.
 */

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 35, 70);
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0, 0, 0);

export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { scene, camera } = useThree();
  const selectedBodyId = useSpaceAtlas((s) => s.selectedBodyId);
  const isPlaying = useSpaceAtlas((s) => s.isPlaying);
  const togglePlay = useSpaceAtlas((s) => s.togglePlay);

  const desiredPos = useRef(new THREE.Vector3().copy(DEFAULT_CAMERA_POS));
  const desiredTarget = useRef(new THREE.Vector3().copy(DEFAULT_CAMERA_TARGET));
  const isAnimating = useRef(false);
  const lastTargetPos = useRef<THREE.Vector3 | null>(null);
  // Tracks whether *we* paused the simulation (so we know to resume it).
  const wePaused = useRef(false);

  /* ---------- On selection change: pause + snapshot ---------- */
  useEffect(() => {
    if (!selectedBodyId) {
      desiredPos.current.copy(DEFAULT_CAMERA_POS);
      desiredTarget.current.copy(DEFAULT_CAMERA_TARGET);
      isAnimating.current = true;
      lastTargetPos.current = null;
      // If we paused the sim for the previous selection, resume it.
      if (wePaused.current && !isPlaying) {
        togglePlay();
        wePaused.current = false;
      }
      return;
    }

    // Find the body's current world position synchronously.
    let pos: THREE.Vector3 | null = null;
    scene.traverse((obj) => {
      if (pos) return;
      if ((obj as THREE.Mesh).isMesh && obj.userData?.bodyId === selectedBodyId) {
        pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
      }
    });
    if (!pos) return;

    const body = findBody(selectedBodyId);
    const r = body?.renderRadius ?? 1;
    const distFromSun = pos.length();
    const outward =
      distFromSun > 0.001
        ? pos.clone().multiplyScalar(1 / distFromSun)
        : new THREE.Vector3(0, 0.4, 1).normalize();
    const camDist = Math.max(r * 5, 2.5);
    const lift = Math.max(r * 2.5, 1.2);

    desiredPos.current.copy(pos).add(outward.multiplyScalar(camDist));
    desiredPos.current.y += lift;
    desiredTarget.current.copy(pos);

    isAnimating.current = true;
    lastTargetPos.current = pos.clone();

    // Pause the orbital simulation while we fly — this keeps the
    // body stationary so the camera can converge.
    if (isPlaying) {
      togglePlay();
      wePaused.current = true;
    }
  }, [selectedBodyId, scene, isPlaying, togglePlay]);

  /* ---------- Per-frame: animate or follow ---------- */
  useFrame(() => {
    if (!controlsRef.current) return;

    if (isAnimating.current) {
      // Fly-to mode: lerp toward the (fixed) desiredPos/desiredTarget.
      camera.position.lerp(desiredPos.current, 0.1);
      controlsRef.current.target.lerp(desiredTarget.current, 0.14);
      controlsRef.current.update();
      if (camera.position.distanceTo(desiredPos.current) < 0.15) {
        isAnimating.current = false;
        // Resume the simulation now that we've arrived.
        if (wePaused.current && !useSpaceAtlas.getState().isPlaying) {
          togglePlay();
          wePaused.current = false;
        }
        // Re-snapshot lastTargetPos so follow-mode starts from the
        // body's position at arrival (not at click time).
        let pos: THREE.Vector3 | null = null;
        if (selectedBodyId) {
          scene.traverse((obj) => {
            if (pos) return;
            if ((obj as THREE.Mesh).isMesh && obj.userData?.bodyId === selectedBodyId) {
              pos = new THREE.Vector3();
              obj.getWorldPosition(pos);
            }
          });
        }
        lastTargetPos.current = pos;
      }
    } else if (selectedBodyId) {
      // Follow mode: translate camera + target by the body's per-frame
      // delta so manual orbit/zoom is preserved.
      let targetPos: THREE.Vector3 | null = null;
      scene.traverse((obj) => {
        if (targetPos) return;
        if ((obj as THREE.Mesh).isMesh && obj.userData?.bodyId === selectedBodyId) {
          targetPos = new THREE.Vector3();
          obj.getWorldPosition(targetPos);
        }
      });
      if (targetPos && lastTargetPos.current) {
        const delta = new THREE.Vector3().subVectors(targetPos, lastTargetPos.current);
        if (delta.lengthSq() > 0) {
          camera.position.add(delta);
          controlsRef.current.target.add(delta);
          controlsRef.current.update();
        }
        lastTargetPos.current = targetPos;
      } else if (targetPos) {
        lastTargetPos.current = targetPos;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      enableRotate
      zoomSpeed={0.8}
      panSpeed={0.7}
      rotateSpeed={0.6}
      minDistance={1.5}
      maxDistance={300}
      enableDamping
      dampingFactor={0.08}
    />
  );
}
