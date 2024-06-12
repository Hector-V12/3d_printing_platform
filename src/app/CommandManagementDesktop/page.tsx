"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../_components/footer";
import Header from "../_components/header";
import icon3d from "../../../public/icon3d.svg";
import boxIcon from "../../../public/boxIcon.svg";
import personIcon from "../../../public/personIcon.svg";
import uploadIcon from "../../../public/uploadIcon.svg";
import formatErrorIcon from "../../../public/formatErrorIcon.svg";
import axios from "axios";
import BasketButton from "../_components/basketButton";
import IsLoading from "../_components/isLoading";

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
}

export default function CommandManagementDesktop() {
  const [formatError, setFormatError] = useState(false);
  const [commandTitle, setCommandTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [usedSoftware, setUsedSoftware] = useState("");
  const [materialChoice, setMaterialChoice] = useState("");
  const [comment, setComment] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const [doneOrders, setDoneOrders] = useState<Order[]>([]);

  const handleOrderAgainClick = (order: Order) => {
    setCommandTitle(order.commandTitle);
    setQuantity(order.quantity.toString());
    setUsedSoftware(order.usedSoftware);
    setMaterialChoice(order.materialChoice);
    setComment(order.comment);
  };

  const fetchDoneOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get("/api/user/orders/done", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const doneOrders = await fetchDoneOrders();
        setDoneOrders(doneOrders);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
        <div className="mt-10 flex h-full w-full flex-row items-center">
          <div className="flex w-1/2 flex-col">
            <div className="mb-10 ml-10 mr-10 flex w-full flex-row justify-center">
              <div className="mt-8 flex w-auto flex-col rounded-xl bg-whiteBackground pb-10 pl-20 pr-20 pt-10">
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
                      placeholder="0"
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
            <div className="mb-24 ml-24 mr-24 mt-24 flex h-full w-2/3 flex-col items-center justify-center rounded-xl bg-whiteBackground">
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
              <div className="mb-24 ml-24 mr-24 mt-24 flex p-3 h-full w-2/3 flex-col items-center justify-center rounded-xl bg-whiteBackground">
                <div className="flex h-5/6 flex-row items-center space-x-2 border-b-4 border-black">
                  <div className="flex flex-row items-center space-x-2">
                    <Image alt="uploadIcon" src={uploadIcon} />
                    <input type="file" />
                    <button className="text-2xl font-extrabold text-fontBlack">
                      {uploadStatus && <p>{uploadStatus}</p>}
                      Importer un fichier
                    </button>
                  </div>
                  <Image
                    alt="3dIcon"
                    src={icon3d}
                    width={95}
                    className="mb-4"
                  />
                </div>
                <div className="center-items w-auto">
                  <Link
                    className="center-items my-3 flex justify-center text-xl font-extrabold text-fontBlack underline underline-offset-2"
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
