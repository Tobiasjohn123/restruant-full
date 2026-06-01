import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function TestScene() {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}