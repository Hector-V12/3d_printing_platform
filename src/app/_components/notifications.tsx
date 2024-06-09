"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import blackBellIcon from "../../public/blackBellIcon.svg";
import axios from "axios";

// Define the Notifications interface
interface Notification {
  id: number;
  notificationTitle: string;
  content: string;
  notificationDate: Date;
  userId: number;
}

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute right-0 top-12 z-10 mr-32 flex w-44 flex-col items-center justify-center rounded-xl bg-whiteBackground p-10 shadow-lg ">
      <div className="mb-5 font-extrabold text-fontBlack">Notifications</div>
      <div>
        {notificationsList.length > 0 ? (
          notificationsList.map((notification) => (
            <div key={notification.id} className="flex items-center space-x-8">
              <div className="flex space-x-2">
                <div> Order:</div>
                <div>{notification.notificationTitle}</div>
              </div>
              <div>{notification.content}</div>
            </div>
          ))
        ) : (
          <div>
            <Image alt="blackBellIcon" src={blackBellIcon} />
            <div>Vous n'avez</div>
            <div>pas de Notifications</div>
          </div>
        )}
      </div>
    </div>
  );
}
