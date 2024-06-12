import React from "react";
import Image from "next/image";
import { useLanguage } from "./languageContext/languageContext";

import frenchIcon from "../../../public/FrenchFlag.png";
import englishIcon from "../../../public/UKFlag.png";
import spanishIcon from "../../../public/SpanishFlag.png";
import chineseIcon from "../../../public/ChineseFlag.png";

export default function Footer() {
  const { changeLanguage, translations } = useLanguage();
  return (
    <div className="ml-5 flex h-1/6 flex-row mb-4 ">
      <div className="flex h-full flex-row justify-center space-x-4">
        <button onClick={() => changeLanguage("fr")}>
          <Image alt="frenchIcon" src={frenchIcon} width={30} />
        </button>
        <button onClick={() => changeLanguage("en")}>
          <Image alt="englishIcon" src={englishIcon} width={30} />
        </button>
        <button onClick={() => changeLanguage("es")}>
          <Image alt="spanishIcon" src={spanishIcon} width={30} />
        </button>
        <button onClick={() => changeLanguage("zh")}>
          <Image alt="chineseIcon" src={chineseIcon} width={30} />
        </button>
      </div>
    </div>
  );
}
