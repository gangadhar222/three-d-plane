import React, { useState, useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";

extend({ OrbitControls });
const Cone = ()=>{
  return (
    <mesh>
      <sphereBufferGeometry args={[0.5, 32, 32 ]} />  
      <meshStandardMaterial  color="blue"/>
    </mesh>
  )
}
const Aeroplane = () => {
  const ref = useRef();
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel);
  });
  let pos = 0.5;
  let neg = -0.5
  useFrame(() => {
    if (ref.current) {
      if (ref.current.position.x > 40) {
        ref.current.position.x = -40;
        ref.current.rotation.y = Math.PI;
      } else {
        ref.current.position.x += pos;
      }
    }
  });
  return model ? (
    <mesh ref={ref}>
      <primitive object={model.scene} />
    </mesh>
  ) : null;
};

const Controls = () => {
  const { camera, gl } = useThree();

  return <orbitControls args={[camera, gl.domElement]} />;
};

export default () => {
  return (
    <>
      <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[15, 20, 5]} />
        <Controls />
        <mesh>
          <Aeroplane />
        </mesh>
        <Cone />
      </Canvas>
    </>
  );
};
