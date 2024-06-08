import React from "react";
import Image from "next/image";

import frenchIcon from "../../assets/france.png";
import englishIcon from "../../assets/angleterre.png";
import spanishIcon from "../../assets/espagne.png";
import chineseIcon from "../../assets/chine.png";

export default function Footer() {
  return (
    <div className="ml-5 flex h-1/6 flex-row ">
      <div className="flex h-full flex-row space-x-4">
        <button>
          <Image alt="frenchIcon" src={frenchIcon} />
        </button>
        <button>
          <Image alt="englishIcon" src={englishIcon} />
        </button>
        <button>
          <Image alt="spanishIcon" src={spanishIcon} />
        </button>
        <button>
          <Image alt="chineseIcon" src={chineseIcon} />
        </button>
      </div>
    </div>
  );
}
