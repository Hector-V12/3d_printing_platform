"use client";

import React, { useState } from "react";
import axios from "axios";
import { useDarkMode } from "../_components/darkModeContext/darkModeContext";
import { useLanguage } from "../_components/languageContext/languageContext";
import Footer from "../_components/footer";

import { useRouter } from "next/navigation";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-800 to-black p-10">
      <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">Register</h1>
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        {success && (
          <div className="mb-4 text-center text-green-500">{success}</div>
        )}
        <form onSubmit={handleSubmit}>
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
              Password
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
              Name
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
              Surname
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
              Phone Number
            </label>
            <input
              className="w-full rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
              id="phoneNumber"
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
