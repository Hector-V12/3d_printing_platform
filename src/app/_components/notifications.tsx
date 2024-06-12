"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import blackBellIcon from "../../../public/blackBellIcon.svg";
import axios from "axios";
import IsLoading from "./isLoading";

export interface Notifications {
  // Define the Notifications interface
  id: number;
  notificationTitle: string;
  content: string;
  notificationDate: Date;
  userId: number;
}

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState<Notifications[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotificationsList = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get("/api/notifications/getNotifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsList = await fetchNotificationsList();
        setNotificationsList(notificationsList);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <IsLoading />;
  }

  return (
    <div className="absolute right-0 top-12 z-10 mr-32 flex w-60 flex-col items-center justify-center rounded-xl bg-whiteBackground p-5 shadow-lg">
      <div className="mb-5 font-extrabold text-fontBlack">Notifications</div>
      <div className="h-64 w-full overflow-y-auto">
        {notificationsList.length > 0 ? (
          notificationsList.map((notification) => (
            <div key={notification.id} className="mb-4">
              <div className="font-bold">{notification.notificationTitle}</div>
              <div className="text-sm">{notification.content}</div>
              <div className="text-xs text-gray-500">{new Date(notification.notificationDate).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <Image alt="blackBellIcon" src={blackBellIcon} />
            <div>Vous n'avez</div>
            <div>pas de Notifications</div>
          </div>
        )}
      </div>
    </div>
  );
}
