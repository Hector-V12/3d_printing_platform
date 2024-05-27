import React from "react";
import Image from "next/image";
import userIcon from "../../public/userIcon.svg";
import doorIcon from "../../public/doorIcon.svg";
import moodleConnexionIcon from "../../public/MoodleConnexionIcon.svg";
import frenchIcon from "../../public/frenchIcon.svg";
import englishIcon from "../../public/englishIcon.svg";
import spanishIcon from "../../public/spanishIcon.svg";
import chineseIcon from "../../public/chineseIcon.svg";
import arrowIcon from "../../public/arrowRedIcon.svg";

import prisma from "lib/prisma";

export interface LoginProps {
  identifiant: string;
  motDePasse: string;
  posts: { title: string }[];
}

async function getPosts() {
  const posts = await prisma.post.findMany({
    select: {
      name: true,
    },
  });
  return posts;
}

export default async function Login(props: LoginProps) {
  const posts = await getPosts();
  console.log({ posts });

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-t from-linear2 to-linear1">
      <div className="h-1/7 items-centee m-10 mr-20 flex w-full flex-row">
        <div className="w-4/6"></div>
        <div className="flex w-2/6 items-center justify-center space-x-10">
          <button>
            <Image alt="frenchIcon" src={frenchIcon} height={30} width={30} />
          </button>
          <button>
            <Image alt="englishIcon" src={englishIcon} height={30} width={30} />
          </button>
          <button>
            <Image alt="spanishIcon" src={spanishIcon} height={30} width={30} />
          </button>
          <button>
            <Image alt="chineseIcon" src={chineseIcon} height={30} width={30} />
          </button>
        </div>
      </div>
      <div className="flex h-screen flex-row-reverse">
        <div className="center-items mt-15 mr-20 flex h-4/5 w-6/12 flex-col justify-center rounded-2xl bg-whiteBackground p-5">
          <div className="flex flex-col items-center">
            <Image className="mb-20" alt="Moodle" src={moodleConnexionIcon} />
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="mb-8">
                  <div className="text-xl font-extrabold text-fontBlack">
                    Identifiant
                  </div>
                  <div className="border-1 flex flex-row border-b border-fontBlack p-1">
                    <Image alt="userIcon" src={userIcon} width={25} />
                    <input
                      className="border-0 bg-whiteBackground text-fontGray"
                      placeholder="Insérez votre Identifiant"
                    />
                  </div>
                </div>
                <div className="mb8">
                  <div className="text-xl font-extrabold text-fontBlack">
                    Mot de Passe
                  </div>
                  <div className="border-1 flex flex-row border-b border-fontBlack p-1">
                    <Image alt="doorIcon" src={doorIcon} width={25} />
                    <input
                      className="bg-whiteBackground text-fontGray"
                      placeholder="Insérez votre mot de passe"
                    />
                    <button>
                      <Image alt="arrowIcon" src={arrowIcon} width={30} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul>
            {posts.map((post, index) => (
              <li key={index} className="text-lg">
                {post.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
