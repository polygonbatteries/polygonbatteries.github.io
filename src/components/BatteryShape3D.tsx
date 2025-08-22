import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh } from 'three';

export type BatteryShape = 'cylindrical' | 'rectangular' | 'square' | 'circular' | 'hexagonal' | 'prismatic' | 'pouch';

interface BatteryShape3DProps {
  shape: BatteryShape;
  length: number;
  width: number;
  height: number;
  color?: string;
}

const BatteryMesh = ({ shape, length, width, height, color = "#4F46E5" }: BatteryShape3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const normalizedLength = Math.max(length / 50, 0.5);
  const normalizedWidth = Math.max(width / 50, 0.5);
  const normalizedHeight = Math.max(height / 50, 0.5);

  const renderShape = () => {
    const commonProps = {
      ref: meshRef,
      onPointerOver: () => setHovered(true),
      onPointerOut: () => setHovered(false),
      scale: hovered ? 1.1 : 1,
    };

    switch (shape) {
      case 'cylindrical':
        return (
          <mesh {...commonProps}>
            <cylinderGeometry args={[normalizedWidth / 2, normalizedWidth / 2, normalizedHeight, 16]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
      
      case 'rectangular':
        return (
          <mesh {...commonProps}>
            <boxGeometry args={[normalizedLength, normalizedHeight, normalizedWidth]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
      
      case 'square':
        const squareSize = Math.max(normalizedWidth, normalizedLength);
        return (
          <mesh {...commonProps}>
            <boxGeometry args={[squareSize, normalizedHeight, squareSize]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
      
      case 'circular':
        return (
          <mesh {...commonProps}>
            <cylinderGeometry args={[normalizedWidth / 2, normalizedWidth / 2, normalizedHeight / 4, 32]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
      
      case 'hexagonal':
        return (
          <mesh {...commonProps}>
            <cylinderGeometry args={[normalizedWidth / 2, normalizedWidth / 2, normalizedHeight, 6]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
      
      case 'prismatic':
        return (
          <mesh {...commonProps}>
            <boxGeometry args={[normalizedLength * 0.8, normalizedHeight * 1.2, normalizedWidth * 0.6]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
      
      case 'pouch':
        return (
          <mesh {...commonProps}>
            <boxGeometry args={[normalizedLength, normalizedHeight * 0.3, normalizedWidth]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
      
      default:
        return (
          <mesh {...commonProps}>
            <boxGeometry args={[normalizedLength, normalizedHeight, normalizedWidth]} />
            <meshStandardMaterial color={hovered ? "#6366F1" : color} />
          </mesh>
        );
    }
  };

  return (
    <>
      {renderShape()}
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#374151"
        anchorX="center"
        anchorY="middle"
      >
        {`${length}×${width}×${height}mm`}
      </Text>
    </>
  );
};

export const BatteryShape3D = (props: BatteryShape3DProps) => {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <BatteryMesh {...props} />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
};