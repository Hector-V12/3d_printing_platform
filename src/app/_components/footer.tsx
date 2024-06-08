import React from "react";
import Image from "next/image";
import { useLanguage } from "./languageContext/languageContext";

import frenchIcon from "../../assets/france.png";
import englishIcon from "../../assets/angleterre.png";
import spanishIcon from "../../assets/espagne.png";
import chineseIcon from "../../assets/chine.png";

export default function Footer() {
  const { changeLanguage, translations } = useLanguage();
  return (
    <div className="ml-5 flex h-1/6 flex-row ">
      <div className="flex h-full flex-row space-x-4">
        <button onClick={() => changeLanguage("fr")}>
          <Image alt="frenchIcon" src={frenchIcon} />
        </button>
        <button onClick={() => changeLanguage("en")}>
          <Image alt="englishIcon" src={englishIcon} />
        </button>
        <button onClick={() => changeLanguage("es")}>
          <Image alt="spanishIcon" src={spanishIcon} />
        </button>
        <button onClick={() => changeLanguage("zh")}>
          <Image alt="chineseIcon" src={chineseIcon} />
        </button>
      </div>
      <div>{translations.footerText}</div>
    </div>
  );
}
