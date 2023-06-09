import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";

import { useRef } from "react";

interface BarProps {
  height: number;
  position: [number, number, number];
  label: string;
}

function Bar({ height, position, label }: BarProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  return (
    <group position={position}>
      <mesh ref={mesh} scale={[1, height * 0.2, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        position={[0, -2, 0]}
        fontSize={0.15}
      >
        {label}
      </Text>
    </group>
  );
}

interface ChartProps {
  data: Array<{ racer: string; wins: number }>;
}

export default function BarChart3D({ data }: ChartProps) {
  return (
    <Canvas style={{ width: "100%", height: "400px" }}>
      <ambientLight />
      <pointLight position={[0, 10, 10]} />
      <group position={[-10, 0, 0]}>
        {data.map((item, index) => (
          <Bar
            key={index}
            height={item.wins}
            label={item.racer}
            position={[index * 2, item.wins / 4, 0]}
          />
        ))}
      </group>
    </Canvas>
  );
}
