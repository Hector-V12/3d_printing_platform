"use client";

import React, { useEffect, useState } from "react";
import Footer from "../_components/footer";
import Header from "../_components/header";
import Image from "next/image";
import DarkModeToggle from "../_components/darkModeContext/darkModeToggle";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDarkMode } from "../_components/darkModeContext/darkModeContext";
import { useAuth } from "../_components/authContext/authContext";
import { useLanguage } from "../_components/languageContext/languageContext";

export default function ProfileMail() {
  const { darkMode } = useDarkMode();
  const { translations } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const userEmail = user?.email;
      const response = await axios.post(
        "/api/sendEmail",
        {
          content,
          userEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Email sent successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-gradient-to-t from-linear2 to-linear1 dark:bg-gradient-to-t dark:from-gray-900 dark:to-almostBlackGreen">
      <Header />
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-6xl rounded-2xl border-green-400 bg-whiteBackground p-10 dark:border dark:bg-gray-900 dark:text-green-400">
          <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl font-bold">Contact Form</h2>
            <div className="mb-4">
              <label className="mb-1 block">Message:</label>
              <textarea
                name="Content"
                className="w-full rounded border-gray-300 focus:border-green-400 focus:ring focus:ring-green-400"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded bg-green-400 px-4 py-2 text-white hover:bg-green-500"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
