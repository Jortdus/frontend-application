import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import Header from "./components/header";
import "./App.css";
import compiledData from "./dataCompile";
import { throttle } from "lodash";
import { maxParticles, BARWIDTH, GAP } from "./config";
import Box from "./components/Box";

const App = () => {
    const [rangeValue, setrangeValue] = useState(10);
    const [barValues, setbarValues] = useState(compiledData(rangeValue));
    useEffect(() => {
        setrangeValue(rangeValue);
    }, [rangeValue]);
    const throttled = useRef(
        throttle((newValue) => {
            setbarValues(compiledData(newValue));
        }, 100)
    );

    useEffect(() => {
        throttled.current(rangeValue);
    }, [rangeValue]);

    return (
        <>
            <Header rangeValue={rangeValue} setrangeValue={setrangeValue} />

            <Canvas camera={{ fov: 90, position: [0, 4, 6] }}>
                {/* <gridHelper /> */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 5, 10]} castShadow={true} />
                <Text
                    anchorY="bottom"
                    maxWidth={10}
                    position={[0, 3.2, 0.6]}
                    fontSize={0.3}
                >
                    Corona deeltjes per 100.000 inwoners x 1 miljard
                </Text>
                <group
                    position={[
                        barValues.length * (BARWIDTH + GAP) * -0.5,
                        0,
                        0,
                    ]}
                >
                    {barValues.map(({ normalizedParticles }, index) => (
                        <React.Fragment key={index}>
                            <Box
                                position={[
                                    (BARWIDTH + GAP) * index,
                                    ((4 / maxParticles) * normalizedParticles) /
                                        2,
                                    0,
                                ]}
                                value={normalizedParticles}
                            />
                            <Text
                                anchorY="bottom"
                                maxWidth={BARWIDTH - 0.1}
                                fontSize={0.13}
                                position={[(BARWIDTH + GAP) * index, 2.8, 0.6]}
                            >
                                {normalizedParticles}
                            </Text>
                        </React.Fragment>
                    ))}
                    {barValues.map(({ location }, index) => (
                        <Text
                            key={index}
                            maxWidth={BARWIDTH - 0.1}
                            fontSize={0.13}
                            position={[(BARWIDTH + GAP) * index, 0.13, 0.6]}
                        >
                            {location}
                        </Text>
                    ))}
                </group>
                <OrbitControls></OrbitControls>
            </Canvas>
        </>
    );
};

export default App;
