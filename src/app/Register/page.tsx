"use client";

import React, { useState } from "react";
import { useAuth } from "../_components/authContext/authContext";
import { useDarkMode } from "../_components/darkModeContext/darkModeContext";
import { useLanguage } from "../_components/languageContext/languageContext";
import Footer from "../_components/footer";
import { useRouter } from "next/navigation";
import SplineViewerComponent from "../_components/spline";
import Link from "next/link";
import CustomButton from "../_components/button";

interface FormData {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
}

export default function RegisterPage() {
  const { translations } = useLanguage();
  const { register } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    surname: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
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
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.surname,
        formData.phoneNumber
      );
      setSuccess("Registration successful!");
      setError("");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      setError(
        error.response?.data?.message || "An error occurred during registration"
      );
      setSuccess("");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col justify-center bg-gradient-to-t from-linear2 to-linear1 dark:bg-gray-900 dark:text-white">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6 p-14">
        <div className="flex justify-around w-full max-w-6xl">
          <div className="w-full">
            <SplineViewerComponent />
          </div>
          <div className="flex h-full w-1/2 max-w-md flex-col justify-center space-y-8 rounded-lg bg-whiteBackground p-10 shadow-lg">
            <div>
              <h1 className="mb-2 text-center text-3xl text-slate-700 font-bold">
                {translations.register}
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  {translations.mailIsep}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                  <input
                    className="w-full border-0 bg-whiteBackground text-black outline-none"
                    placeholder={translations.placeholderEmail}
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  {translations.password}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <input
                    className="w-full border-0 bg-whiteBackground text-black outline-none"
                    placeholder={translations.placeholderPassword}
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  {translations.name}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <input
                    className="w-full border-0 bg-whiteBackground text-black outline-none"
                    placeholder={translations.placeholderName}
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="surname"
                >
                  {translations.surname}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <input
                    className="w-full border-0 bg-whiteBackground text-black outline-none"
                    placeholder={translations.placeholderSurname}
                    id="surname"
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="phoneNumber"
                >
                  {translations.phoneNumber}
                </label>
                <div className="border-1 flex flex-row space-x-4 border-b border-fontBlack bg-whiteBackground p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <input
                    className="w-full border-0 bg-whiteBackground text-black outline-none"
                    placeholder={translations.placeholderPhone}
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {error && (
                <div className="mt-4 text-sm text-red-500">{error}</div>
              )}
              {success && (
                <div className="mt-4 text-sm text-green-500">{success}</div>
              )}
              <div className="flex items-center justify-center mb-4">
                <CustomButton type="submit" text={translations.register} />
              </div>
              <div>
                <Link className="font-bold text-black underline" href="/Login">
                  {translations.alreadyHaveAccount}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
