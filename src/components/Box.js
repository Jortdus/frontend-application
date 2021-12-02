import React, { useRef } from "react";
import * as THREE from "three";
import { maxParticles, BARWIDTH } from "../config";

const material = new THREE.MeshStandardMaterial({
    color: "#219",
});

function Box({ value, ...props }) {
    const ref = useRef();
    let height = (4 / maxParticles) * value;
    return (
        <group {...props}>
            <mesh
                visible={true}
                ref={ref}
                material={material}
                receiveShadow={true}
            >
                <boxGeometry
                    args={[BARWIDTH, height, BARWIDTH]}
                    position={[0, height / 2, 0]}
                />
            </mesh>
        </group>
    );
}

export default Box;
