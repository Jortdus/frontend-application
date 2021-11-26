import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { softShadows, MeshWobbleMaterial, OrbitControls, Text } from "@react-three/drei";
import Header from "./components/header";
import { useSpring, a } from "@react-spring/three";
import './App.css';

softShadows()

function Box(props) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef()
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => {
		// ref.current.rotation.y += delta / 2
		// ref.current.rotation.x += delta / 3
	})

	// Return the view, these are regular Threejs elements expressed in JSX
	return (
	<group {...props}>
		<mesh
		visible={true}
		position={[0,0,-0.55]}
		ref={ref}
		scale={clicked ? 1.5 : 1}
		onClick={(event) => click(!clicked)}
		onPointerOver={(event) => hover(true)}
		onPointerOut={(event) => hover(false)}>
		<boxGeometry args={[1, 1, 1]} />
		<meshStandardMaterial color={hovered ? 'blue' : 'orange'} />
		
		</mesh>
		<Text position={[0, 0, 0]} color="black" anchorX="center" anchorY="middle">text</Text>
	</group>
	)
  }

  const App = () => (
	<Canvas>
		<ambientLight />
		<pointLight position={[10, 10, -10]} />
		<Box position={[0, -1, 0]} />
		<OrbitControls></OrbitControls>
	</Canvas>
  )

export default App;