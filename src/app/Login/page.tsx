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

export interface LoginProps {
  identifiant: string;
  motDePasse: string;
}
export default function Login() {
  return (
    <div className="from-linear2 to-linear1 flex h-screen w-full flex-col bg-gradient-to-t">
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
        <div className="bg-whiteBackground center-items mt-15 mr-20 flex h-4/5 w-6/12 flex-col justify-center rounded-2xl p-5">
          <div className="flex flex-col items-center">
            <Image className="mb-20" alt="Moodle" src={moodleConnexionIcon} />
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="mb-8">
                  <div className="text-fontBlack text-xl font-extrabold">
                    Identifiant
                  </div>
                  <div className="border-fontBlack border-1 flex flex-row border-b p-1">
                    <Image alt="userIcon" src={userIcon} width={25} />
                    <input
                      className="text-fontGray bg-whiteBackground border-0"
                      placeholder="Insérez votre Identifiant"
                    />
                  </div>
                </div>
                <div className="mb8">
                  <div className="text-fontBlack text-xl font-extrabold">
                    Mot de Passe
                  </div>
                  <div className="border-fontBlack border-1 flex flex-row border-b p-1">
                    <Image alt="doorIcon" src={doorIcon} width={25} />
                    <input
                      className="text-fontGray bg-whiteBackground"
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
        </div>
      </div>
    </div>
  );
}
