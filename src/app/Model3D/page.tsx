"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { EthereumModel, TractorModel } from "../_components/modelViewer";
import Header from "../_components/header";
import Footer from "../_components/footer";
import Link from "next/link";

export default function Model3D() {
    return (
        <div className=" flex h-screen w-full flex-col bg-gradient-to-t from-linear2 to-linear1 dark:bg-gradient-to-t dark:from-gray-900 dark:to-almostBlackGreen">
            <Header />

            <div className="flex h-full space-x-8">
                <div className="h-200vh w-[200vh]">
                    <div className="center-items flex flex-col">
                        <div>
                            <Canvas style={{ height: "500px", width: "100%" }}>
                                <OrbitControls />
                                <mesh>
                                    <EthereumModel />
                                </mesh>
                            </Canvas>
                        </div>
                    </div>
                </div>
                <div className="h-100vh w-[100vh]">
                    <div className="center-items flex flex-col">
                        <button>Order</button>
                        <div>
                            <Canvas style={{ height: "500px", width: "100%" }}>
                                <OrbitControls />
                                <mesh>
                                    <TractorModel />
                                </mesh>
                            </Canvas>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}