"use client";

import React, { useState } from "react";
import axios from "axios";
import { useDarkMode } from "../_components/darkModeContext/darkModeContext";
import { useLanguage } from "../_components/languageContext/languageContext";
import Footer from "../_components/footer";

import { useRouter } from "next/navigation";
import SplineViewerComponent from "../_components/spline";

export default function RegisterPage() {
  const { translations } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", formData);
      console.log(response);
      setSuccess(response.data.message);
      setError("");
      // Redirect to another page if needed
      router.push("/Login"); // Assuming you have a login page to navigate to after registration
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        "An error occurred during registration",
      );
      setSuccess("");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col  justify-center bg-gradient-to-t from-linear2 to-linear1 dark:bg-gray-900 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6 p-14">
        <div className="flex items-center justify-around">
          <div className="w-full">
            <SplineViewerComponent />
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="center-items flex h-full  flex-col justify-center rounded-lg bg-whiteBackground p-10 shadow-lg">
              <div className="text-2xl font-extrabold text-fontBlack dark:text-white">
                {translations.register}
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  {translations.mailIsep}
                </label>
                <input
                  className="w-full rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  {translations.password}
                </label>
                <input
                  className="w-full rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  {translations.name}
                </label>
                <input
                  className="w-full rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="surname"
                >
                  {translations.surname}
                </label>
                <input
                  className="w-full rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                  id="surname"
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="phoneNumber"
                >
                  {translations.phoneNumber}
                </label>
                <input
                  className="w-full rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                  id={"phoneNumber"}
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  {translations.register}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
