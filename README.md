# Frontend application

![GitHub last commit](https://img.shields.io/github/last-commit/jortdus/frontend-application)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/jortdus/frontend-application)

Track Tech, front-end programming with a focus on visualization. 

## What is this code?
The code in this repository is a collection of assigments where functional programming is the standard. 

## Table of Contents
* [Features](#features)
* [Support](#support)
* [Credits](#credits)
* [License](#license)

### How did i start off?
First off, i asked myself what data do i want to visualize. The dataset contains the following data; 

* The date of when the data is retrieved
* The date of the report
* The location of the retrieved data
* Area code of the location
* Amount of corona particles in the sewage water per 100.000 residents. 

This time i decided not to go for D3 but instead take a dive into three.js, a library used to make a 3D environment and create objects within this environment including lighting and shadows.

Rubric requires the code to be used in an application so i used React to create it.

for my project i imported the following items

```js
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { throttle } from "lodash";

```

react-three-fiber is a React renderer for Three.js and helps me a ton in writing Three.js code.
react-three-drei is a collection of helpers and full functional abstractions. 
Lodash is a utility library that in this case helps me throttle certain functions.

Code of canvas construction explained with code comments.
```js
    return (
        <>
            // render the Header component that is used to put a range element on the page. 
            <Header rangeValue={rangeValue} setrangeValue={setrangeValue} />

            // Canvas is a JSX element from react-three-fiber where your 3D environment is created
            <Canvas camera={{ fov: 90, position: [0, 4, 6] }}>
                // Generates a grid to help visualize and comprehend a 3D environment
                <gridHelper />
                // Ambientlight and pointlight are used to render light in the 3D environment
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 5, 10]} castShadow={true} />
                // Text is a JSX element from react-three-drei that makes it very easy to put 3D text into the environment.
                <Text
                    anchorY="bottom"
                    maxWidth={10}
                    position={[0, 3.2, 0.6]}
                    fontSize={0.3}
                    className="title-header"
                >
                    // Header to clearify visualisation
                    Corona deeltjes per 100.000 inwoners x 1 miljard
                </Text>
                // Here i use a group element to combine two three.js-drei elements
                <group
                    position={[
                        barValues.length * (BARWIDTH + GAP) * -0.5,
                        0,
                        0,
                    ]}
                >
                    // map function that iterates over barValues array, providing data to the chart bar and text.
                    {barValues.map(({ normalizedParticles }, index) => (
                        <React.Fragment key={index}>
                            <Box
                                // positon bar on bottom of grid so it does not go under the plane.
                                position={[
                                    (BARWIDTH + GAP) * index,
                                    ((4 / maxParticles) * normalizedParticles) /
                                        2,
                                    0,
                                ]}
                                // particles divided by 100.000.000.000, scaled on a value of 80.000
                                value={normalizedParticles}
                            />
                            <Text
                                anchorY="bottom"
                                maxWidth={BARWIDTH - 0.1}
                                fontSize={0.13}
                                position={[(BARWIDTH + GAP) * index, 2.8, 0.6]}
                            >
                                // particles divided by 100.000.000.000
                                {normalizedParticles}
                            </Text>
                        </React.Fragment>
                    ))}
                     // map function that iterates over barValues array, providing city names on the X axes. 
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
                // OrbitControls gives the user the ability to move the camera within the 3D environment
                <OrbitControls></OrbitControls>
            </Canvas>
        </>
    );
```

compiledData is used to create a new array that can be used to create the visualisation.

```js
import Covid from "./data/covid.json";

function compiledData(range) {
    return Covid.reduce((cityValue, e) => {
        // filtering out empty results
        if (e["RNA_flow_per_100000"] === 0) {
            return cityValue;
        }
        // creating a new array containing objectes with particles, location and date
        cityValue.push({
            particles: e["RNA_flow_per_100000"],
            location: e["RWZI_AWZI_name"],
            date: e["Date_measurement"],
        });
        return cityValue;
    }, [])
        .slice(0, range ? range : 10)
        // Divides the particles value by 100.000.000.000
        .map((e) => ({
            ...e,
            normalizedParticles: Math.floor(e.particles / 1000000000),
        }));
}
```

I used a config file to make things nice and tidy 

```js
export const maxParticles = 80000;
export const BARWIDTH = 1;
export const GAP = 0.1;
export const defaultRange = 10;
```

The Header component is used to display the input element on the page

```js
const Header = ({ rangeValue, setrangeValue }) => {
    // This is used to retrieve the input value when changed.
    const onchange = (e) => {
        setrangeValue(e.currentTarget.value);
    };
    return (
        <header>
            <div className="form">
                <form>
                    <label htmlFor="vol">
                        Aantal getoonde resultaten: {rangeValue}
                    </label>
                    <br />
                    <input
                        type="range"
                        id="rangeInput"
                        name="vol"
                        min="4"
                        max="25"
                        value={rangeValue}
                        onChange={onchange}
                    ></input>
                </form>
            </div>
        </header>
    );
};
```

# Process

## Week 1 
The first week of this course wasn't as productive. This week i decided to use Three.js instead of D3 to make a visualization and i took my time to refresh my React knowledge. 

I decided to create a 3D rendered bar chart to give a spin to the boring 2D chart. 
I started off getting a basic understanding of Three.js and got some helpful tips on renderers and packages that could make it easier to write Three.js.

In week 1 i put my focus on converting some of my code from my last project to React semantic code and i made a basic 3D environment. 

```js
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
```

This code was very basic and created 3 boxes in a 3D environment.


## Week 2
Week 2 was a lot more productive, i modulized a lot of my code and managed to reduce a lot of my code.

Before
```js 
const covidFetch = fetch('./datasets/covid.json')
    .then(results => results.json())

// parsing dataset
function parseCovid() {
    return covidFetch.then(data => {
        data.forEach(e => {
            // filtering out empty results
            if (e['RNA_flow_per_100000'] == 0) {
                return
            } else {
                // creating a new array containing objectes with particles, location and date
                cityValue.push({
                    particles: e['RNA_flow_per_100000'],
                    location: e['RWZI_AWZI_name'],
                    date: e['Date_measurement']
                })
            }
        })
    }).catch(err => {
        console.log(err)
    })
}

// preparing data for D3 
function prepareData(cityValue, range) {
    let combinedData = cityValue.slice(0, range ? range : 10)
    return combinedData.map(e => {
        return [e.particles, e.location]
    })
}

function updateData(range) {
    let compiledData = prepareData(cityValue, range)
    redraw(compiledData)
}
```

After
```js 
function compiledData(range) {
    return Covid.reduce((cityValue, e) => {
        // filtering out empty results
        if (e["RNA_flow_per_100000"] === 0) {
            return cityValue;
        }
        // creating a new array containing objectes with particles, location and date
        cityValue.push({
            particles: e["RNA_flow_per_100000"],
            location: e["RWZI_AWZI_name"],
            date: e["Date_measurement"],
        });
        return cityValue;
    }, [])
        .slice(0, range ? range : 10)
        .map((e) => ({
            ...e,
            normalizedParticles: Math.floor(e.particles / 1000000000),
        }));
}
```

The readability of the code is much better and uses a lot less code. 

Finally i was able to take the processed data and implement this into the 3D chart.

```js
        {barValues.map(({ normalizedParticles }, index) => (
            <React.Fragment key={index}>
                <Box
                    // positon bar on bottom of grid so it does not go under the plane.
                    position={[
                        (BARWIDTH + GAP) * index,
                        ((4 / maxParticles) * normalizedParticles) /
                            2,
                        0,
                    ]}
                    // particles divided by 100.000.000.000, scaled on a value of 80.000
                    value={normalizedParticles}
                />
                <Text
                    anchorY="bottom"
                    maxWidth={BARWIDTH - 0.1}
                    fontSize={0.13}
                    position={[(BARWIDTH + GAP) * index, 2.8, 0.6]}
                >
                    // particles divided by 100.000.000.000
                    {normalizedParticles}
                </Text>
            </React.Fragment>
        ))}
```

The result of which is [this wonderful 3D chart](https://jortdus.github.io/frontend-application/)

I am very happy with what i was able to do with Three.js in this short amount of time and i will proudly put this on my portfolio website.


## Support
23899@hva.nl

## Credits
This project uses the following open source packages:

+ [Three.js](https://threejs.org/)
+ [React](https://reactjs.org/)
+ [react-three-fiber](https://github.com/pmndrs/react-three-fiber)

The following dataset is used

+ [RIVM Rioolwaterdata](https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.json)

## License
Matching app is released under the [MIT](https://github.com/jortdus/blok-tech/blob/main/LICENSE)
