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
import logoGarage from "~/assets/Logo_Garage.svg";

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

interface Model {
  id: string;
  commandTitle: string;
}

export default function Header() {
  const { darkMode } = useDarkMode();
  const { translations } = useLanguage();
  const router = useRouter();

  const [notificationsActive, setNotificationsActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Model[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onNotificationsClick = () => {
    setNotificationsActive(!notificationsActive);
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchText(query);

    if (query.length > 0) {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get('/api/user/orders/validated', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % searchResults.length);
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + searchResults.length) % searchResults.length);
    } else if (event.key === 'Enter' && selectedIndex >= 0 && selectedIndex < searchResults.length) {
      const selectedResult = searchResults[selectedIndex];
      if (selectedResult) {
        handleResultClick(selectedResult.id);
      }
    }
  };

  const handleResultClick = (orderId: string) => {
    setSearchText(''); // Clear the search bar
    setSearchResults([]); // Clear the search results
    setSelectedIndex(-1);
    router.push(`/CommandManagementDesktop/${orderId}`)

  };

  return (
    <div>
      <div className="flex flex-row  items-center border-green-400 bg-whiteBackground p-2 dark:border-b dark:bg-slate-900">
        <div className="flex w-1/6 space-x-8">
          <Image alt={logoGarage} src={logoGarage} width={150} />
        </div>
        <div className="relative flex-grow mx-4">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full py-2 px-4 rounded-full text-gray-800"
            value={searchText}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          {searchResults.length > 0 && (
            <ul className="absolute z-10 bg-white text-gray-800 w-full mt-1 rounded-lg shadow-lg">
              {searchResults.map((result, index) => (
                <li
                  key={result.id}
                  className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${index === selectedIndex ? 'bg-gray-300' : ''}`}
                  onClick={() => handleResultClick(result.id)}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  {result.commandTitle}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mr-8 flex  w-1/6 flex-row-reverse">
          <div className="flex space-x-12 ">
            <button onClick={onNotificationsClick}>
              <Image
                alt="bellRedIcon"
                src={darkMode ? bellGreenIcon : bellRedIcon}
                width={35}
              />
            </button>
            <Link href="/CommandManagementDesktop">
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
