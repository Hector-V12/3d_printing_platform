"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../_components/languageContext/languageContext";
import { useAuth } from "../_components/authContext/authContext";
import axios from "axios";
import Footer from "../_components/footer";
import userIcon from "../../../public/userIcon.svg";
import doorIcon from "../../../public/doorIcon.svg";
import moodleConnexionIcon from "../../../public/MoodleConnexionIcon.svg";

import arrowIcon from "../../../public/arrowRedIcon.svg";
import Image from "next/image";

import SplineViewerComponent from "~/app/_components/spline";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col justify-center bg-gradient-to-t from-linear2 to-linear1 dark:bg-gray-900 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6 p-14">
        <div className="flex justify-around w-full max-w-6xl">
          <div className="w-full">
            <SplineViewerComponent />
          </div>
          <div className="flex h-full w-full max-w-md flex-col justify-center space-y-8 rounded-lg bg-whiteBackground p-10 shadow-lg">
            <div>
              <h1 className="mb-2 text-center text-3xl font-bold">
                {translations.connexion}
              </h1>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  {translations.mailIsep}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                  </svg>
                  <input
                    className="border-0 bg-whiteBackground text-black outline-none"
                    placeholder={translations.placeholderEmail}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6 space-y-8">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  {translations.password}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <input
                    type="password"
                    className="bg-whiteBackground text-black outline-none"
                    placeholder={translations.placeholderPassword}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={handleLogin}>
                    <Image alt="arrowIcon" src={arrowIcon} width={45} />
                  </button>
                </div>
                <div>
                  <Link
                    className="font-bold text-black underline"
                    href="/Register"
                  >
                    {translations.notHaveAccount}
                  </Link>
                </div>
              </div>
              {error && (
                <div className="mt-4 text-sm text-red-500">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
