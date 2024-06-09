"use client";

import React, { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import Image from "next/image";
import DarkModeToggle from "../_components/darkModeContext/darkModeToggle";

import currentCommands from "~/assets/currentCommandsIcon.svg";
import myAccount from "~/assets/myAccountIcon.svg";
import userIcon from "~/assets/userIcon.svg";
import timeIcon from "~/assets/timeIcon.svg";
import poweredIcon from "~/assets/poweredWholeIcon.svg";
import greenProfileIcon from "~/assets/greenProfileIcon.svg";
import greenTimeIcon from "~/assets/greenTimeIcon.svg";

import { useDarkMode } from "../_components/darkModeContext/darkModeContext";
import { useLanguage } from "../_components/languageContext/languageContext";
import { useAuth } from "../_components/authContext/authContext";
import axios from "axios";

interface Order {
  id: number;
  commandTitle: string;
  quantity: number;
  usedSoftware: string;
  materialChoice: string;
  comment: string;
  orderDate: Date;
  userId: number;
  status: boolean;
}

export default function ProfileDesktop() {
  const { darkMode } = useDarkMode();
  const { translations } = useLanguage();
  const { user, logout } = useAuth();

  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
  const [doneOrders, setDoneOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInProgressOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get("/api/user/orders/inProgress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  };

  const fetchDoneOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get("/api/user/orders/done", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const inProgressOrders = await fetchInProgressOrders();
        const doneOrders = await fetchDoneOrders();
        setDoneOrders(doneOrders);
        setInProgressOrders(inProgressOrders);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex h-screen w-full flex-col bg-gradient-to-t from-linear2 to-linear1 dark:bg-gradient-to-t dark:from-gray-900 dark:to-almostBlackGreen">
      <Header />
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-6xl rounded-2xl border-green-400 bg-whiteBackground p-10 dark:border dark:bg-gray-900 dark:text-green-400">
          <div className="flex w-1/2 flex-col items-center justify-between">
            <div className="">
              <Image
                alt="currentCommands"
                src={currentCommands}
                height={200}
                width={300}
              />
            </div>
            <div className="flex flex-col items-center text-2xl font-extrabold">
              {inProgressOrders?.length ? (
                inProgressOrders.map((order) => (
                  <div key={order.id} className="flex space-x-8">
                    <div className="flex space-x-2">
                      <div> Order:</div>
                      <div>{order.commandTitle}</div>
                    </div>
                    <div>Quantity: {order.quantity}</div>
                  </div>
                ))
              ) : (
                <div>
                  <div>Vous n'avez</div>
                  <div>pas encore effectué</div>
                  <div>de commande</div>
                </div>
              )}
            </div>

            <div className="h-1/3"></div>
          </div>

          <div className="mx-8 w-px bg-black dark:bg-green-400"></div>

          <div className="flex w-1/2 flex-col items-center space-y-4 pl-5 pr-5">
            <div className="flex flex-col items-center">
              <Image alt="myAccount" src={myAccount} height={150} width={250} />
              <div className="w-full pb-5">
                <div>
                  Bonjour {user?.surname} {user?.name}
                </div>
              </div>
            </div>

            <div className=" w-full">
              <div className="text-xl font-extrabold text-fontBlack dark:text-green-400">
                Identifiant
              </div>
              <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                <Image
                  alt="userIcon"
                  src={darkMode ? greenProfileIcon : userIcon}
                  width={25}
                />
                <div>{user?.surname}</div>
              </div>
            </div>
            <div className=" w-full">
              <div className="text-xl font-extrabold text-fontBlack  dark:text-green-400">
                Adresse Isep
              </div>
              <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                <Image
                  alt="userIcon"
                  src={darkMode ? greenProfileIcon : userIcon}
                  width={25}
                />
                <div>{user?.email}</div>
              </div>
            </div>
            <div className="w-full">
              <div className="text-xl font-extrabold text-fontBlack dark:text-green-400">
                Numéro
              </div>
              <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack p-2">
                <Image
                  alt="userIcon"
                  src={darkMode ? greenProfileIcon : userIcon}
                  width={25}
                />
                <div>{user?.phoneNumber}</div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start">
              <div className="text-xl font-extrabold">
                Historique des Commandes
              </div>
              <Image alt="timeIcon" src={darkMode ? greenTimeIcon : timeIcon} />
              <div className="flex w-full justify-between">
                <div className="flex w-full flex-col space-y-2 p-2">
                  <div className="border-l border-black p-2 dark:border-green-400">
                    {doneOrders?.length
                      ? doneOrders.map((order) => (
                          <div key={order.id} className="flex space-x-8">
                            <div className="flex space-x-2">
                              <div> Order:</div>
                              <div>{order.commandTitle}</div>
                            </div>
                            <div>Quantity: {order.quantity}</div>
                          </div>
                        ))
                      : false}
                  </div>
                </div>
                <div>
                  <Image
                    alt="poweredIcon"
                    src={poweredIcon}
                    height={150}
                    width={150}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between pl-10 pr-10">
              <DarkModeToggle />
              <button className="dark:text-green-400" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
