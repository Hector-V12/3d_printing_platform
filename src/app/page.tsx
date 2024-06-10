"use client";

import React, { useState } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Image from "next/image";

import currentCommands from "@/public/currentCommandsIcon.svg";
import myAccount from "@/public/myAccountIcon.svg";
import userIcon from "@/public/userIcon.svg";
import timeIcon from "@/public/timeIcon.svg";
import poweredIcon from "@/public/poweredWholeIcon.svg";

export default function AdviceDesktop() {
  return (
    <div className="flex h-screen w-full flex-col  bg-gradient-to-t from-linear2 to-linear1">
      <Header />
      <div className="flex h-full items-center justify-center">
        <div className="flex h-auto w-3/6 max-w-6xl  rounded-2xl bg-whiteBackground  p-16 dark:bg-slate-900">
          <div className="flex flex-col items-center space-y-8 font-extrabold dark:text-green-400">
            <div>Conseils de pratique pour la modelisation 3D</div>
            <div className="font-normal">
              Taille de la pièce : maximum 240 * 240 * 240 mm
              <br />
              <br />



              Format : .3mf, .stl ou STEP (.step, .stp)
              <br />
              <br />


              Eviter au maximum les supports :

              Une partie de votre pièce en suspension peut avoir besoin de support. Faites en sorte qu'une face de votre modèle donne la plus grande surface de contact possible avec la surface d'impression

              <br />
              <br />

              Une seule pièce par fichier :

              Si vous nous envoyez un fichier, il faut une seule pièce dessus. Si un fichier contient un bateau, le mât doit faire partie du modèle de la coque. Seul cas accepté de plusieurs morceaux sur un même fichier : le print-in-place. Si ce terme ne vous dit rien, une pièce par fichier
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
