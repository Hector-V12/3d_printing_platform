"use client";

import React, { useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import Image from "next/image";

import currentCommands from "@/public/currentCommandsIcon.svg";
import myAccount from "@/public/myAccountIcon.svg";
import userIcon from "@/public/userIcon.svg";
import timeIcon from "@/public/timeIcon.svg";
import poweredIcon from "@/public/poweredWholeIcon.svg";

export default function ProfileDesktop() {
  return (
    <div className="flex h-screen w-full flex-col gap-10 bg-gradient-to-t from-linear2 to-linear1">
      <Header />
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-6xl rounded-2xl bg-whiteBackground p-10">
          <div className="flex w-1/2 flex-col items-center justify-between">
            <div className="">
              <Image
                alt="currentCommands"
                src={currentCommands}
                height={200}
                width={300}
              />
            </div>
            <div className="flex flex-col items-center text-2xl font-extrabold">
              <div>Vous n'avez</div>
              <div>pas encore effectué</div>
              <div>de commande</div>
            </div>

            <div className="h-1/3"></div>
          </div>

          <div className="mx-8 w-px bg-black"></div>

          <div className="flex w-1/2 flex-col items-center space-y-4 pl-5 pr-5">
            <div className="flex flex-col items-center">
              <Image alt="myAccount" src={myAccount} height={150} width={250} />
              <div className="w-full pb-5">
                <div>Bonjour Romain Herreknecht</div>
              </div>
            </div>

            <div className=" w-full">
              <div className="text-xl font-extrabold text-fontBlack">
                Identifiant
              </div>
              <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                <Image alt="userIcon" src={userIcon} width={25} />
                <input
                  className="w-full border-0 bg-whiteBackground text-black outline-none placeholder:text-black"
                  placeholder="Rohe61420"
                />
              </div>
            </div>
            <div className=" w-full">
              <div className="text-xl font-extrabold text-fontBlack">
                Adresse Isep
              </div>
              <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                <Image alt="userIcon" src={userIcon} width={25} />
                <input
                  className="w-full border-0 bg-whiteBackground outline-none placeholder:text-black"
                  placeholder="romain.herreknecht@eleve.isep.fr"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="text-xl font-extrabold text-fontBlack">
                Numéro
              </div>
              <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                <Image alt="userIcon" src={userIcon} width={25} />
                <input
                  className="w-full border-0 bg-whiteBackground text-fontGray outline-none"
                  placeholder="Veuillez renseigner un numéro!"
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-start">
              <div className="text-xl font-extrabold">
                Historique des Commandes
              </div>
              <Image alt="timeIcon" src={timeIcon} />
              <div className="flex w-full justify-between">
                <div className="flex w-full flex-col space-y-2"></div>
                <div>
                  <Image
                    alt="poweredIcon"
                    src={poweredIcon}
                    height={150}
                    width={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
