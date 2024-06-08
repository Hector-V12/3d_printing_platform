import React, { useState } from "react";
import Image from "next/image";
import Notifications from "./notifications";

import poweredIcon from "../../public/poweredIcon.svg";
import bellRedIcon from "../../public/bellRedIcon.svg";
import cartRedIcon from "../../public/cartRedIcon.svg";
import userRedIcon from "../../public/userRedIcon.svg";
import bellGreenIcon from "~/assets/greenBell.png";
import cartGreenIcon from "~/assets/greenCartIcon.svg";
import userGreenIcon from "~/assets/greenPersonIcon.svg";

import DarkModeToggle from "./darkModeToggle";
import Link from "next/link";
import { useDarkMode } from "./darkModeContext";

export default function Header() {
  const { darkMode } = useDarkMode();
  const [notificationsActive, setNotificationsActive] = useState(false);

  const onNotificationsClick = () => {
    setNotificationsActive(!notificationsActive);
  };

  return (
    <div>
      <div className="flex flex-row  items-center bg-whiteBackground p-2 dark:bg-slate-900">
        <div className="flex w-4/6 space-x-8">
          <Image alt={poweredIcon} src={poweredIcon} width={50} />
          <DarkModeToggle />
        </div>
        <div className="mr-8 flex  w-3/6 flex-row-reverse">
          <div className="flex space-x-12 ">
            <button onClick={onNotificationsClick}>
              <Image
                alt="bellRedIcon"
                src={darkMode ? bellGreenIcon : bellRedIcon}
                width={35}
              />
            </button>
            <Link href="/PaymentDesktop">
              <Image
                alt="cartRedIcon"
                src={darkMode ? cartGreenIcon : cartRedIcon}
                width={35}
              />
            </Link>
            <Link href="/ProfileDesktop">
              <Image
                alt="userRedIcon"
                src={darkMode ? userGreenIcon : userRedIcon}
                width={35}
              />
            </Link>
          </div>
        </div>
      </div>
      {notificationsActive ? <Notifications /> : false}
    </div>
  );
}
