import React from "react";
import Image from "next/image";
import { useLanguage } from "./languageContext";

import frenchIcon from "../../public/frenchIcon.svg";
import englishIcon from "../../public/englishIcon.svg";
import spanishIcon from "../../public/spanishIcon.svg";
import chineseIcon from "../../public/chineseIcon.svg";

export default function Footer() {
  const { changeLanguage } = useLanguage();
  return (
    <div className="ml-5 flex h-1/6 flex-row ">
      <div className="flex h-full flex-row items-center justify-center space-x-4">
        <div>
          <button onClick={() => changeLanguage("fr")}>
            <Image alt="frenchIcon" src={frenchIcon} />
          </button>
        </div>
        <div>
          <button onClick={() => changeLanguage("en")}>
            <Image alt="englishIcon" src={englishIcon} />
          </button>
        </div>
        <div>
          <button onClick={() => changeLanguage("fr")}>
            <Image alt="spanishIcon" src={spanishIcon} />
          </button>
        </div>
        <div>
          <button onClick={() => changeLanguage("fr")}>
            <Image alt="chineseIcon" src={chineseIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
