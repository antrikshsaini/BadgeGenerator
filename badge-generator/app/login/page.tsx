"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      if (response.data) {
        const { user_id, is_admin } = response.data;

        localStorage.setItem("user_id", user_id);
        localStorage.setItem("is_admin", is_admin ? "true" : "false");

        if (is_admin) {
          router.push("/superuser");
        } else {
          router.push("/organiser");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
