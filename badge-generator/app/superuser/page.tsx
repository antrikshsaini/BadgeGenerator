"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation"; // Adjust this import based on your routing library

export default function SuperuserPage() {
  const [organisers, setOrganisers] = useState([]);
  const [badges, setBadges] = useState([]);
  const [newOrganiser, setNewOrganiser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganisersAndBadges = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const isAdmin = localStorage.getItem("is_admin") === "true"; // Check if user is admin

        if (!userId || !isAdmin) {
          router.push("/login");
          return;
        }

        const badgesResponse = await axios.get(
          "http://localhost:8000/api/badges/",
          { params: { organiser_id: userId } }
        );
        setBadges(badgesResponse.data);

        const organisersResponse = await axios.get(
          "http://localhost:8000/api/organisers/"
        );
        setOrganisers(organisersResponse.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisersAndBadges();
  }, [router]);

  const handleCreateOrganiser = async () => {
    try {
      await axios.post("http://localhost:8000/api/user/", {
        ...newOrganiser,
        is_organiser: true,
      });
      setNewOrganiser({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Failed to create organiser:", error);
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-3xl mb-8">Superuser Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Create New Organiser</h2>
        <input
          type="text"
          placeholder="Name"
          value={newOrganiser.name}
          onChange={(e) =>
            setNewOrganiser({ ...newOrganiser, name: e.target.value })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newOrganiser.email}
          onChange={(e) =>
            setNewOrganiser({ ...newOrganiser, email: e.target.value })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={newOrganiser.password}
          onChange={(e) =>
            setNewOrganiser({ ...newOrganiser, password: e.target.value })
          }
          className="mb-2 p-2 border rounded w-full"
        />
        <button
          onClick={handleCreateOrganiser}
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Create Organiser
        </button>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Organisers List</h2>
        <ul>
          {organisers.map((organiser: any) => (
            <li key={organiser.id} className="mb-4 p-4 border rounded">
              <p>{organiser.name}</p>
              <p>{organiser.email}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl mb-4">All Badges</h2>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge: any) => (
            <div
              key={badge.id}
              className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded shadow-lg"
            >
              <div dangerouslySetInnerHTML={{ __html: badge.html }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
