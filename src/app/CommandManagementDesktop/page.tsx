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
import prisma from "lib/prisma";
import { jsonlStreamConsumer } from "@trpc/server/unstable-core-do-not-import";
import frenchIcon from "../../public/frenchIcon.svg";
import englishIcon from "../../public/englishIcon.svg";
import spanishIcon from "../../public/spanishIcon.svg";
import chineseIcon from "../../public/chineseIcon.svg";

export interface Command {
  Title: string;
  Quantity: string | number;
  Software: string;
  Material: string;
  Remarque: string;
}

export default function CommandManagementDesktop() {
  const [formatError, setFormatError] = useState(false);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [software, setSoftware] = useState("");
  const [material, setMaterial] = useState("");
  const [remarque, setRemarque] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      quantity,
      software,
      material,
      remarque,
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
    <div className="flex h-screen w-full flex-col space-y-8 bg-gradient-to-t from-linear2 to-linear1">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-row space-x-8 space-y-12">
          <div className="flex flex-col justify-center space-x-10">
            <div className="h-full"></div>
            <div className="flex h-full flex-col space-y-4">
              <div>
                <button>
                  <Image
                    alt="frenchIcon"
                    src={frenchIcon}
                    height={45}
                    width={45}
                  />
                </button>
              </div>
              <div>
                <button>
                  <Image
                    alt="englishIcon"
                    src={englishIcon}
                    height={65}
                    width={65}
                  />
                </button>
              </div>
              <div>
                <button>
                  <Image
                    alt="spanishIcon"
                    src={spanishIcon}
                    height={65}
                    width={65}
                  />
                </button>
              </div>
              <div>
                <button>
                  <Image
                    alt="chineseIcon"
                    src={chineseIcon}
                    height={65}
                    width={65}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-1/2 flex-col">
            <div className="flex  w-full flex-row justify-center">
              <div className="mt-8 flex w-auto flex-col rounded-xl bg-whiteBackground pb-10 pl-20 pr-20 pt-10">
                <div className="mb-5 flex items-center justify-center text-2xl font-extrabold text-fontBlack">
                  Importer un fichier
                  <Image
                    className="ml-2"
                    alt="3dIcon"
                    src={icon3d}
                    height={35}
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <div>
                    <div className="text-xl font-extrabold text-fontBlack">
                      Titre de la commande
                    </div>
                    <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                      <Image alt="boxIcon" src={boxIcon} width={25} />
                      <input
                        className="border-0 bg-whiteBackground text-fontBlack outline-none"
                        placeholder="Dites nous en plus"
                        type="string"
                        name="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-fontBlack">
                      Quantité
                    </div>
                    <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
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
                  <div>
                    <div className="text-xl font-extrabold text-fontBlack">
                      Logiciel Utilisé
                    </div>
                    <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                      <Image alt="boxIcon" src={boxIcon} width={25} />
                      <input
                        className="w-full bg-whiteBackground text-fontBlack outline-none"
                        placeholder="Logiciel utilisé"
                        name="Software"
                        value={software}
                        onChange={(e) => setSoftware(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-fontBlack">
                      Choix du materiaux
                    </div>
                    <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                      <Image alt="boxIcon" src={boxIcon} width={25} />
                      <select
                        className="w-full  bg-whiteBackground text-fontBlack outline-none"
                        name="Material"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                      >
                        <option>Red</option>
                        <option>Blue</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-fontBlack">
                      Remarque
                    </div>
                    <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                      <Image alt="personIcon" src={personIcon} width={25} />
                      <input
                        className="w-full  bg-whiteBackground text-fontBlack outline-none"
                        placeholder="remarque"
                        name="Remarque"
                        value={remarque}
                        onChange={(e) => setRemarque(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button className="mb-3 flex  flex-row items-center space-x-12 bg-fontBlack p-2">
                    <Image alt="whiteCartIcon" src={whiteCartIcon} />
                    <div className="font-extrabold text-fontWhite">
                      Ajouter au panier
                    </div>
                  </button>
                  <div>
                    <Link
                      className="font-bold text-fontBlack underline underline-offset-2"
                      href="/ModelisationHelp"
                    >
                      Besoin d'aide avec la modélisation?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {formatError ? (
            <div className="ml-24 mr-24 mt-24 flex flex h-full w-2/3 flex-col flex-col items-center justify-center rounded-xl bg-whiteBackground">
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
            <div className="mr-24 flex h-full w-2/3 flex-col items-center justify-center rounded-xl bg-whiteBackground">
              <button className="flex h-full flex-row items-center space-x-2">
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
                  href="/ModelisationHelp"
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
