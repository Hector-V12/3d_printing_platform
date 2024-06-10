"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Define the prop type for fileUrl
interface ModelProps {
    fileUrl: string;
}

export const UrlModel: React.FC<ModelProps> = ({ fileUrl }) => {
    // Ensure the fileUrl is a valid URL or provide a default value
    const validatedFileUrl = fileUrl || "/cat.glb"; // Provide a default model path

    return (
        <div>
            <Canvas style={{ height: "500px", width: "100%" }}>
                <Model fileUrl={validatedFileUrl} />
            </Canvas>
        </div>
    );
};

export const TractorModel: React.FC<ModelProps> = ({ fileUrl }) => {
    // Ensure the fileUrl is a valid URL or provide a default value
    const validatedFileUrl = fileUrl || "/default-tractor.glb"; // Provide a default model path

    const myModel = useLoader(GLTFLoader, validatedFileUrl); // Use the fileUrl prop
    const modelRef = useRef<Mesh>(null);

    useFrame((_state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta / 2;
        }
    });

    return (
        <>
            <pointLight position={[-10, -10, -10]} color="#48cc90" intensity={5000} />
            <pointLight position={[10, 10, 10]} color="#36e2e2" intensity={5000} />
            <primitive object={myModel.scene} ref={modelRef} />
        </>
    );
};

export const Model: React.FC<ModelProps> = ({ fileUrl }) => {
    // Ensure the fileUrl is a valid URL or provide a default value
    const validatedFileUrl = fileUrl || "/cat.glb"; // Provide a default model path

    const myModel = useLoader(GLTFLoader, validatedFileUrl); // Use the fileUrl prop
    const modelRef = useRef<Mesh>(null);

    useFrame((_state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta / 2;
        }
    });

    return (
        <>
            <pointLight position={[-10, -10, -10]} color="#48cc90" intensity={5000} />
            <pointLight position={[10, 10, 10]} color="#36e2e2" intensity={5000} />
            <primitive object={myModel.scene} ref={modelRef} />
        </>
    );
};
