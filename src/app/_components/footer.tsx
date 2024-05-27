import React from "react";
import Image from "next/image";

import frenchIcon from "../../public/frenchIcon.svg";
import englishIcon from "../../public/englishIcon.svg";
import spanishIcon from "../../public/spanishIcon.svg";
import chineseIcon from "../../public/chineseIcon.svg";

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
