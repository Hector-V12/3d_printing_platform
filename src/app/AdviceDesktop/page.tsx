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

export default function AdviceDesktop() {
  return (
    <div className="flex h-screen w-full flex-col  bg-gradient-to-t from-linear2 to-linear1">
      <Header />
      <div className="flex h-full items-center justify-center">
        <div className="flex h-3/4 w-3/6 max-w-6xl  rounded-2xl bg-whiteBackground  p-16 dark:bg-slate-900">
          <div className="flex flex-col items-center space-y-8 font-extrabold dark:text-green-400">
            <div>Conseils de pratique pour la modelisation 3D</div>
            <div className="font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet consectetur adipiscing elit ut aliquam purus. Volutpat est
              velit egestas dui id ornare arcu. In iaculis nunc sed augue lacus
              viverra. Amet luctus venenatis lectus magna fringilla urna
              porttitor rhoncus. Malesuada fames ac turpis egestas integer eget
              aliquet nibh. Lacus viverra vitae congue eu consequat ac felis.
              Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla
              facilisi. A diam sollicitudin tempor id eu nisl nunc mi ipsum.
              Tortor at auctor urna nunc id cursus.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
