"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../_components/languageContext/languageContext";
import { useAuth } from "../_components/authContext/authContext";
import axios from "axios";
import Footer from "../_components/footer";
import userIcon from "~/assets/userIcon.svg";
import doorIcon from "~/assets/doorIcon.svg";
import moodleConnexionIcon from "~/assets/MoodleConnexionIcon.svg";

import arrowIcon from "~/assets/arrowRedIcon.svg";
import Image from "next/image";

import SplineViewerComponent from "~/app/_components/spline";

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

      router.push("/AdviceDesktop");
    } catch (error) {
      console.log(error);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col  justify-center bg-gradient-to-t from-linear2 to-linear1 dark:bg-gray-900 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6 p-14">
        <div className="flex items-center justify-around">
          <div className="w-full">
            <SplineViewerComponent />
          </div>
          <div className="flex h-full w-full max-w-md flex-col justify-center space-y-8 rounded-lg bg-whiteBackground p-10 shadow-lg">
            <div>
              <h1 className="mb-2 text-center text-3xl font-bold">
                {translations.connexion}
              </h1>
              <h2 className="mb-6 text-center text-xl font-light text-gray-500">
                Moodle
              </h2>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  {translations.userName}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <Image alt="userIcon" src={userIcon} width={35} />
                  <input
                    className="border-0 bg-whiteBackground text-black outline-none"
                    placeholder="Insérez votre Identifiant"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  {translations.password}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <Image alt="doorIcon" src={doorIcon} width={35} />
                  <input
                    type="password"
                    className="bg-whiteBackground text-black outline-none"
                    placeholder="Insérez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">
                    <Image alt="arrowIcon" src={arrowIcon} width={45} />
                  </button>
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
