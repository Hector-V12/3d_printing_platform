"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import userIcon from "../../public/userIcon.svg";
import doorIcon from "../../public/doorIcon.svg";
import moodleConnexionIcon from "../../public/moodleConnexionIcon.svg";
import frenchIcon from "../../public/frenchIcon.svg";
import englishIcon from "../../public/englishIcon.svg";
import spanishIcon from "../../public/spanishIcon.svg";
import chineseIcon from "../../public/chineseIcon.svg";
import arrowIcon from "../../public/arrowRedIcon.svg";

import prisma from "lib/prisma";
import Link from "next/link";
import DarkModeToggle from "../_components/darkModeToogle";

export interface LoginProps {
  identifiant: string;
  motDePasse: string;
}

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      name: true,
    },
  });
  return posts;
};

export default function Login() {
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-t from-linear2 to-linear1 dark:bg-gray-900 dark:text-white">
      <div className="h-1/7 m-10 mr-20 flex flex-row items-center">
        <div className="w-full">
          <DarkModeToggle />
        </div>
        <div className="flex items-center justify-center space-x-10">
          <button>
            <Image alt="frenchIcon" src={frenchIcon} height={45} width={45} />
          </button>
          <button>
            <Image alt="englishIcon" src={englishIcon} height={45} width={45} />
          </button>
          <button>
            <Image alt="spanishIcon" src={spanishIcon} height={45} width={45} />
          </button>
          <button>
            <Image alt="chineseIcon" src={chineseIcon} height={45} width={45} />
          </button>
        </div>
      </div>
      <div className="flex h-screen flex-row-reverse">
        <div className="center-items mr-20 flex h-4/5 w-6/12 flex-col justify-center rounded-2xl bg-whiteBackground dark:bg-gray-900 dark:text-white">
          <div className="flex flex-col items-center space-y-12">
            <div>
              <Image
                className="mb-20"
                alt="Moodle"
                src={moodleConnexionIcon}
                height={300}
                width={400}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="mb-8">
                  <div className="text-2xl font-extrabold text-fontBlack dark:text-white">
                    Identifiant
                  </div>
                  <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                    <Image alt="userIcon" src={userIcon} width={35} />
                    <input
                      className="border-0 bg-whiteBackground text-fontGray outline-none"
                      placeholder="Insérez votre Identifiant"
                      value={identifiant}
                      onChange={(e) => setIdentifiant(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <div className="text-2xl font-extrabold text-fontBlack dark:text-white">
                    Mot de Passe
                  </div>
                  <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                    <Image alt="doorIcon" src={doorIcon} width={35} />
                    <input
                      type="password"
                      className="bg-whiteBackground text-fontGray outline-none"
                      placeholder="Insérez votre mot de passe"
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                    />
                    <button type="submit">
                      <Image alt="arrowIcon" src={arrowIcon} width={45} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
