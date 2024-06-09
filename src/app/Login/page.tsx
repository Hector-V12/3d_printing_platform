"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../_components/languageContext/languageContext";
import { useAuth } from "../_components/authContext/authContext";
import axios from "axios";

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
    <div className="flex min-h-screen items-center justify-end bg-gradient-to-r from-gray-800 to-black p-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg">
          <h1 className="mb-2 text-center text-3xl font-bold">Connexion</h1>
          <h2 className="mb-6 text-center text-xl font-light text-gray-500">
            Moodle
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                {translations.userName}
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="text"
                placeholder="Insérez votre identifiant"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                {translations.password}
              </label>
              <input
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="Insérez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
                onClick={handleLogin}
              >
                {translations.connexion}
              </button>
            </div>
            {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
