import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { Canvas } from 'react-three-fiber'
import './styles.css'

import Controls from './controls'

let world = []
for (let i = 0; i < 500; i++) {
  world.push(
    <mesh key={i} position={[Math.random() * 1600 - 800, 0, Math.random() * 1600 - 800]} scale={[20, Math.random() * 160 + 10, 20]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /*ref={ref => ref && ref.translate(0, 0.5, 0)}*/ />
      <meshPhongMaterial attach="material" color="#ad0071" flatShading={true} />
    </mesh>
  )
}

function Plane() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1800, 1800]} ref={ref => ref && ref.translate(0, 0.5, 0)} />
      <meshPhongMaterial attach="material" color="#ad0071" flatShading={true} />
    </mesh>
  )
}

function App() {
  const [screenSpacePanning, toggle] = useState(false)
  return (
    <>
      <label className="checkbox">
        screenSpacePanning <input type="checkbox" onChange={() => toggle(!screenSpacePanning)} />
      </label>
      <Canvas camera={{ position: [400, 200, 0] }}>
        <Controls screenSpacePanning={screenSpacePanning} />
        <fog attach="fog" args={['#ff6161', 0.002, 1000]} />
        <directionalLight position={[1, 1, 1]} color="#ad0071" />
        <directionalLight position={[-1, -1, -1]} color="#ffd738" />
        <ambientLight color="#444444" />
        {world}
        <Plane />
      </Canvas>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
