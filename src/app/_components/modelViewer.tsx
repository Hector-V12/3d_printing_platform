"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const ModelViewer: React.FC = () => {
    return (
        <div>
            <Canvas style={{ height: "500px", width: "100%" }}>
                <EthereumModel />
            </Canvas>
        </div>
    );
};

export const TractorModel: React.FC = ({ fileUrl }: any) => {
    const myModel = useLoader(GLTFLoader, "/cat.glb");
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

export const EthereumModel: React.FC = ({ fileUrl }: any) => {
    const myModel = useLoader(GLTFLoader, "/ethereum-logo.glb");
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
