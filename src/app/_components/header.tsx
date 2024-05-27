import React, { useState } from "react";
import Image from "next/image";
import Notifications from "./notifications";

import poweredIcon from "../../public/poweredIcon.svg";
import bellRedIcon from "../../public/bellRedIcon.svg";
import cartRedIcon from "../../public/cartRedIcon.svg";
import userRedIcon from "../../public/userRedIcon.svg";

export default function Header() {
  const [notificationsActive, setNotificationsActive] = useState(false);

  const onNotificationsClick = () => {
    setNotificationsActive(!notificationsActive);
  };

  return (
    <div>
      <div className="bg-whiteBackground flex  flex-row items-center">
        <div className="w-4/6">
          <Image alt={poweredIcon} src={poweredIcon} width={50} />
        </div>
        <div className="mr-8 flex  w-3/6 flex-row-reverse">
          <div className="flex space-x-12 ">
            <button onClick={onNotificationsClick}>
              <Image alt="bellRedIcon" src={bellRedIcon} width={35} />
            </button>
            <button>
              <Image alt="cartRedIcon" src={cartRedIcon} width={35} />
            </button>
            <button>
              <Image alt="userRedIcon" src={userRedIcon} width={35} />
            </button>
          </div>
        </div>
      </div>
      {notificationsActive ? <Notifications /> : false}
    </div>
  );
}
