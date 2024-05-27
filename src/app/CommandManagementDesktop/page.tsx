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

export interface CommandManagementDesktopProps {
  profileImage: StaticImageData | undefined;
}

export default function CommandManagementDesktop(
  props: CommandManagementDesktopProps,
) {
  const [formatError, setFormatError] = useState(true);

  return (
    <div className="from-linear2 to-linear1 flex h-screen w-full flex-col bg-gradient-to-t">
      <Header />
      <div className="mt-10 flex w-full flex-row items-center">
        <div className="flex w-1/2 flex-col">
          <div className=" mb-10 ml-10 mr-10  flex  w-full flex-row justify-center">
            <div className="bg-whiteBackground mt-8 flex w-auto flex-col rounded-xl pb-10 pl-20 pr-20 pt-10">
              <div className="text-fontBlack mb-5 flex items-center justify-center font-extrabold">
                Importer un fichier{" "}
                <Image className="ml-2" alt="3dIcon" src={icon3d} />
              </div>

              <div className="mb-3 flex flex-col">
                <div className="text-fontBlack text-xl font-extrabold">
                  Titre de la commande
                </div>
                <div className="border-fontBlack border-1 flex flex-row border-b p-1">
                  <Image alt="boxIcon" src={boxIcon} width={25} />
                  <input
                    className="text-fontBlack bg-whiteBackground border-0"
                    placeholder="Dites nous en plus"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="text-fontBlack text-xl font-extrabold">
                  Quantité
                </div>
                <div className="border-fontBlack border-1 flex flex-row border-b p-1">
                  <Image alt="boxIcon" src={boxIcon} width={25} />
                  <input
                    className="bg-whiteBackground text-fontBlack w-full"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="text-fontBlack text-xl font-extrabold">
                  Technologie d'impression
                </div>
                <div className="border-fontBlack border-1 flex flex-row border-b p-1">
                  <Image alt="boxIcon" src={boxIcon} width={25} />
                  <select className="bg-whiteBackground  text-fontBlack w-full" />
                </div>
              </div>
              <div className="mb-3">
                <div className="text-fontBlack text-xl font-extrabold">
                  Choix du materiaux
                </div>
                <div className="border-fontBlack border-1 flex flex-row border-b p-1">
                  <Image alt="boxIcon" src={boxIcon} width={25} />
                  <select className="bg-whiteBackground  text-fontBlack w-full" />
                </div>
              </div>
              <div className="mb-3">
                <div className="text-fontBlack text-xl font-extrabold">
                  Remarque
                </div>
                <div className="border-fontBlack border-1 flex flex-row border-b p-1">
                  <Image alt="personIcon" src={personIcon} width={25} />
                  <input
                    className="bg-whiteBackground  text-fontBlack w-full"
                    placeholder="remarque"
                  />
                </div>
              </div>
              <button className=" bg-fontBlack mb-3  flex flex-row items-center space-x-12 p-2">
                <Image alt="whiteCartIcon" src={whiteCartIcon} />
                <div className="text-fontWhite font-extrabold">
                  Ajouter au panier
                </div>
              </button>

              <div>
                <Link
                  className="text-fontBlack font-bold underline underline-offset-2"
                  href=""
                >
                  Besoin d'aide avec la modélisation?
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>

        {formatError ? (
          <div className="bg-whiteBackground mb-24 ml-24 mr-24 mt-24 flex flex h-full w-2/3 flex-col flex-col items-center justify-center rounded-xl">
            <button className="mb-5  flex flex-row items-center space-x-8">
              <div className="text-5xl font-extrabold text-red-900 ">
                Format Incorrect!
              </div>

              <Image alt="3dIcon" src={formatErrorIcon} width={50} />
            </button>
            <div className="center-items w-1/5">
              <Link
                className="text-fontBlack center-items flex justify-center text-2xl font-extrabold underline underline-offset-2"
                href=""
              >
                Besoin d'aide avec la modélisation?
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-whiteBackground mb-24 ml-24 mr-24 mt-24 flex flex h-full w-2/3 flex-col flex-col items-center justify-center rounded-xl">
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
                className="text-fontBlack center-items flex justify-center text-xl font-extrabold underline underline-offset-2"
                href=""
              >
                Besoin d'aide avec la modélisation?
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
