import React, { useEffect, useState } from "react";
import Image from "next/image";
import Notifications from "./notifications";

import poweredIcon from "../../public/poweredIcon.svg";
import bellRedIcon from "../../public/bellRedIcon.svg";
import cartRedIcon from "../../public/cartRedIcon.svg";
import userRedIcon from "../../public/userRedIcon.svg";
import bellGreenIcon from "~/assets/greenBell.png";
import cartGreenIcon from "~/assets/greenCartIcon.svg";
import userGreenIcon from "~/assets/greenPersonIcon.svg";

import DarkModeToggle from "./darkModeContext/darkModeToggle";
import Link from "next/link";
import { useDarkMode } from "./darkModeContext/darkModeContext";
import { useLanguage } from "./languageContext/languageContext";
import { useAuth } from "./authContext/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export interface Notifications {
  id?: number;
  notificationsTitle: string;
  content: string;
  notificationDate: Date;
  userId: number;
}

export default function Header() {
  const { darkMode } = useDarkMode();
  const { translations } = useLanguage();
  const router = useRouter();

  const [notificationsActive, setNotificationsActive] = useState(false);

  const onNotificationsClick = () => {
    setNotificationsActive(!notificationsActive);
  };

  return (
    <div>
      <div className="flex flex-row  items-center border-green-400 bg-whiteBackground p-2 dark:border-b dark:bg-slate-900">
        <div className="flex w-4/6 space-x-8">
          <Image alt={poweredIcon} src={poweredIcon} width={50} />
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
            <Link href={"/ProfileDesktop"}>
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
