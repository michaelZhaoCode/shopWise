import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";

const Cart = () => {
    const cart = useGLTF('./shopping_cart/scene.gltf')

    return (
        <mesh>
            <hemisphereLight intensity={5} groundColor="black" />
            <pointLight intensity={5} />
            <spotLight
              position={[-20, 50, 10]}
              angle={0.12}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={1024}
            />
            <primitive
            object={cart.scene}
            scale={3}
            position={[0, -1.4, 0]}
            />
        </mesh>
    )
}

const CartCanvas = () => {
    return (
        <Canvas
        // define some props
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={<CanvasLoader />}>
        <OrbitControls // allows user to rotate model, with limited rotation around specific angle/axis
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Cart scale={[2, 2, 2]}/>
      </Suspense>
      <Preload all />
      </Canvas>
    )
}

export default CartCanvas;