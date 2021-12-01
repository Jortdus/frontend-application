import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
  Text,
  Plane,
} from "@react-three/drei";
import Header from "./components/header";
import { useSpring, a } from "@react-spring/three";
import "./App.css";
import calcHeight from "./heightCalcs";
import cityCalc from "./cityCalcs";
import { GridHelper } from "three";

const material = new THREE.MeshStandardMaterial({
  color: "#219",
});

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
const max = 55000;
const barValues = calcHeight();
const cityValue = cityCalc();

const BARWIDTH = 1;
const GAP = 0.1;

function Box({ value, ...props }) {
  const ref = useRef();
  let height = (4 / max) * value;
  return (
    <group {...props}>
      <mesh visible={true} ref={ref} material={material} receiveShadow={true}>
        <boxGeometry
          args={[BARWIDTH, height, BARWIDTH]}
          position={[0, height / 2, 0]}
        />
      </mesh>
    </group>
  );
}

const App = () => (
  <>
    <Header />

    <Canvas camera={{ fov: 90, position: [0, 4, 6] }}>
      <gridHelper />
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} castShadow={true} />
      <group position={[barValues.length * (BARWIDTH + GAP) * -0.5, 0, 0]}>
        {barValues.map((value, index) => (
          <Box
            key={index}
            position={[(BARWIDTH + GAP) * index, ((4 / max) * value) / 2, 0]}
            value={value}
          />
        ))}
        {cityValue.map((value, index) => (
          <Text
            anchorY="bottom"
            maxWidth={BARWIDTH - 0.1}
            fontSize={0.13}
            position={[(BARWIDTH + GAP) * index, 0.18, 0.6]}
          >
            {value}
          </Text>
        ))}
      </group>
      <OrbitControls></OrbitControls>
    </Canvas>
  </>
);

export default App;
