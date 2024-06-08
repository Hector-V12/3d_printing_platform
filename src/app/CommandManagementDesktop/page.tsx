"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Footer from "../_components/footer";
import Header from "../_components/header";

import icon3d from "../../public/icon3d.svg";
import boxIcon from "../../public/boxIcon.svg";
import personIcon from "../../public/personIcon.svg";
import whiteCartIcon from "../../public/cartWhiteIcon.svg";
import uploadIcon from "../../public/uploadIcon.svg";
import formatErrorIcon from "../../public/formatErrorIcon.svg";
import Notifications from "../_components/notifications";
import { prisma } from "../../../lib/prisma";

export interface Command {
  CommandTitle: string;
  Quantity: string | number;
  UsedSoftware: string;
  MaterialChoice: string;
  Comment: string;
}

export default function CommandManagementDesktop() {
  const [formatError, setFormatError] = useState(false);
  const [commandTitle, setCommandTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [usedSoftware, setUsedSoftware] = useState("");
  const [materialChoice, setMaterialChoice] = useState("");
  const [comment, setComment] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      commandTitle,
      quantity,
      usedSoftware,
      materialChoice,
      comment,
    };

    console.log(data);
  };

  /*try {
    const response = await axios.post("/api/commands", data);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const result = response.data;
    console.log("Success:", result);
    setCommands([...commands, result]); // Update the commands state with the new command
  } catch (error) {
    console.error("Error:", error);
  }
};*/

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-t from-linear2 to-linear1">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex w-full flex-row items-center">
          <div className="flex w-1/2 flex-col">
            <div className=" mb-10 ml-10 mr-10  flex  w-full flex-row justify-center">
              <div className="mt-8 flex w-auto flex-col rounded-xl bg-whiteBackground pb-10 pl-20 pr-20 pt-10">
                <div className="mb-5 flex items-center justify-center font-extrabold text-fontBlack">
                  Importer un fichier{" "}
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
                      className="w-full  bg-whiteBackground text-fontBlack outline-none"
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
                      className="w-full  bg-whiteBackground text-fontBlack outline-none"
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
                      className="w-full  bg-whiteBackground text-fontBlack outline-none"
                      placeholder="remarque"
                      name="remarque"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className=" mb-3 flex  flex-row items-center space-x-12 bg-fontBlack p-2"
                >
                  <Image alt="whiteCartIcon" src={whiteCartIcon} />
                  <div className="font-extrabold text-fontWhite">
                    Ajouter au panier
                  </div>
                </button>

                <div>
                  <Link
                    className="font-bold text-fontBlack underline underline-offset-2"
                    href="/AdviceDesktop"
                  >
                    Besoin d'aide avec la modélisation?
                  </Link>
                </div>
              </div>
            </div>
            <Footer />
          </div>

          {formatError ? (
            <div className="mb-24 ml-24 mr-24 mt-24 flex h-full w-2/3 flex-col items-center justify-center rounded-xl bg-whiteBackground">
              <button className="mb-5  flex flex-row items-center space-x-8">
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
            <div className="mb-24 ml-24 mr-24 mt-24 flex  h-full w-2/3  flex-col items-center justify-center rounded-xl bg-whiteBackground">
              <button className="flex h-5/6 flex-row items-center space-x-2">
                <div className=" flex  flex-row items-center space-x-2 border-b-4 border-black ">
                  <Image alt="uploadIcon" src={uploadIcon} />
                  <div className="text-4xl font-extrabold ">
                    Importer un fichier 3d
                  </div>
                </div>
                <Image alt="3dIcon" src={icon3d} width={95} />
              </button>
              <div className="center-items w-1/5 ">
                <Link
                  className="center-items flex justify-center text-xl font-extrabold text-fontBlack underline underline-offset-2"
                  href="/AdviceDesktop"
                >
                  Besoin d'aide avec la modélisation?
                </Link>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
