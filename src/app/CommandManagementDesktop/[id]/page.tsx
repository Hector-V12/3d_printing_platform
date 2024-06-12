"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../_components/footer";
import Header from "../../_components/header";
import icon3d from "../../../../public/icon3d.svg";
import boxIcon from "../../../../public/boxIcon.svg";
import personIcon from "../../../../public/personIcon.svg";
import uploadIcon from "../../../../public/uploadIcon.svg";
import formatErrorIcon from "../../../../public/formatErrorIcon.svg";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { Model } from "~/app/_components/model";
import { OrbitControls } from "@react-three/drei";
import BasketButton from "~/app/_components/basketButton";
import IsLoading from "~/app/_components/isLoading";

export interface Command {
  CommandTitle: string;
  Quantity: string | number;
  UsedSoftware: string;
  MaterialChoice: string;
  Comment: string;
}

interface Order {
  id?: number;
  commandTitle: string;
  quantity: number;
  usedSoftware: string;
  materialChoice: string;
  comment: string;
  orderDate?: Date;
  userId: number;
  status?: boolean;
  fileUrl?: string;
}

export default function CommandManagementDesktop({
  params,
  searchParams,
}: any) {
  const [formatError, setFormatError] = useState(false);
  const [commandTitle, setCommandTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [usedSoftware, setUsedSoftware] = useState("");
  const [materialChoice, setMaterialChoice] = useState("");
  const [comment, setComment] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [doneOrders, setDoneOrders] = useState<Order[]>([]);
  const { id } = params.id;

  const handleOrderAgainClick = (order: Order) => {
    setCommandTitle(order.commandTitle || "");
    setQuantity(order.quantity.toString() || "");
    setUsedSoftware(order.usedSoftware || "");
    setMaterialChoice(order.materialChoice || "");
    setComment(order.comment || "");
  };

  useEffect(() => {
    if (params.id) {
      fetchOrderData(params.id as string);
    }
  }, []);

  const fetchOrderData = async (orderId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("User token not found");
      }

      const response = await axios.get(`/api/user/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const order: Order = response.data;
      setCommandTitle(order.commandTitle || "");
      setQuantity(order.quantity.toString() || "");
      setUsedSoftware(order.usedSoftware || "");
      setMaterialChoice(order.materialChoice || "");
      setComment(order.comment || "");
      setFileUrl(order.fileUrl || "");
      console.log(order.fileUrl);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError("Order not found.");
      } else {
        console.error("Failed to fetch order data:", error);
        setError("Failed to fetch order data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("User token not found");
      }

      const response = await axios.post(
        "/api/upload",
        {
          commandTitle,
          quantity: parseInt(quantity),
          usedSoftware,
          materialChoice,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order created successfully");
      setCommandTitle("");
      setQuantity("");
      setUsedSoftware("");
      setMaterialChoice("");
      setComment("");
      console.log("Order created successfully:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <IsLoading />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-t from-linear2 to-linear1">
      <Header />
      <form onSubmit={handleSubmit} className="flex-grow">
        <div className="mt-10 flex w-full flex-row items-center">
          <div className="flex w-1/2 flex-col">
            <div className="mb-10 ml-10 mr-10 flex w-full flex-row justify-center">
              <div className="mt-8 flex w-1/2 flex-col rounded-xl bg-whiteBackground pb-10 pl-20 pr-20 pt-10">
                <div className="mb-5 flex items-center justify-center font-extrabold text-fontBlack">
                  Importer un fichier
                  <Image className="ml-2" alt="3dIcon" src={icon3d} />
                </div>

                <div className="mb-3 flex flex-col">
                  <div className="text-xl font-extrabold text-fontBlack">
                    Titre de la commande
                  </div>
                  <div className="border-1 flex flex-row border-b border-fontBlack p-1">
                    <Image alt="boxIcon" src={boxIcon} width={25} />
                    <input
                      className="border-0 bg-whiteBackground text-fontBlack outline-none"
                      placeholder="Dites nous en plus"
                      name="commandTitle"
                      value={commandTitle}
                      onChange={(e) => setCommandTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xl font-extrabold text-fontBlack">
                    Quantité
                  </div>
                  <div className="border-1 flex flex-row border-b border-fontBlack p-1">
                    <Image alt="boxIcon" src={boxIcon} width={25} />
                    <input
                      className="w-full bg-whiteBackground text-fontBlack outline-none"
                      placeholder={quantity}
                      name="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xl font-extrabold text-fontBlack">
                    Logiciel Utilisé
                  </div>
                  <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                    <Image alt="boxIcon" src={boxIcon} width={25} />
                    <input
                      className="w-full bg-whiteBackground text-fontBlack outline-none"
                      placeholder="Logiciel utilisé"
                      name="UsedSoftware"
                      value={usedSoftware}
                      onChange={(e) => setUsedSoftware(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xl font-extrabold text-fontBlack">
                    Choix du materiaux
                  </div>
                  <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                    <Image alt="boxIcon" src={boxIcon} width={25} />
                    <select
                      className="w-full bg-whiteBackground text-fontBlack outline-none"
                      name="MaterialChoice"
                      value={materialChoice}
                      onChange={(e) => setMaterialChoice(e.target.value)}
                    >
                      <option>Red</option>
                      <option>Blue</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xl font-extrabold text-fontBlack">
                    Remarque
                  </div>
                  <div className="border-1 flex flex-row border-b border-fontBlack p-1">
                    <Image alt="personIcon" src={personIcon} width={25} />
                    <input
                      className="w-full bg-whiteBackground text-fontBlack outline-none"
                      placeholder="remarque"
                      name="remarque"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
                <BasketButton text="Ajouter au panier" />
                <div>
                  <Link
                    className="font-bold text-fontBlack underline underline-offset-2"
                    href="/"
                  >
                    Besoin d'aide avec la modélisation?
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {formatError ? (
            <div className="mb-24 ml-24 mr-24 mt-24 flex h-full w-1/2 flex-col items-center justify-center rounded-xl bg-whiteBackground">
              <button className="mb-5 flex flex-row items-center space-x-8">
                <div className="text-5xl font-extrabold text-red-900 ">
                  Format Incorrect!
                </div>

                <Image alt="3dIcon" src={formatErrorIcon} width={50} />
              </button>
              <div className="center-items w-1/5">
                <Link
                  className="center-items flex justify-center text-2xl font-extrabold text-fontBlack underline underline-offset-2"
                  href=""
                >
                  Besoin d'aide avec la modélisation?
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-1/2">
              <div className="mb-24 ml-24 mr-24 mt-24 flex h-full w-2/4 flex-col items-center justify-center rounded-xl bg-whiteBackground">
                <div className="flex flex-row items-center border-b-4 border-black">
                  <div>
                    <Canvas style={{ height: "500px", width: "100%" }}>
                      <OrbitControls />
                      <mesh>
                        <Model fileUrl={fileUrl} />
                      </mesh>
                    </Canvas>
                  </div>
                </div>
                <div className="center-items w-auto">
                  <Link
                    className="center-items flex justify-center text-lg font-extrabold text-fontBlack underline underline-offset-2 my-3"
                    href="/"
                  >
                    Besoin d'aide avec la modélisation?
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
}
