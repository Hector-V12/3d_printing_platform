import React from "react";
import Image from "next/image";

import blackBellIcon from "../../public/blackBellIcon.svg";

export default function Notifications() {
  return (
    <div className="bg-whiteBackground absolute right-0 top-12 z-10 mr-32 flex w-44 flex-col items-center justify-center rounded-xl p-2 shadow-lg ">
      <div className="text-fontBlack mb-5 font-extrabold">Notifications</div>
      <Image alt="blackBellIcon" src={blackBellIcon} />
      <div>Recevez vos</div>
      <div>notifications</div>
      <div>ici</div>
    </div>
  );
}
