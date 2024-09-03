"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function OrganiserPage() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const organiserId = localStorage.getItem("user_id");

        if (!organiserId) {
          router.push("/login");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/badges/", {
          params: { organiser_id: organiserId },
        });

        setBadges(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch badges.");
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [router]);

  if (loading) {
    return <p>Loading badges...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-3xl mb-8">Organiser Dashboard</h1>

      <div className="mb-8">
        <a href="/badge" className="bg-blue-500 text-white p-2 rounded">
          Create New Badge
        </a>
      </div>

      <div>
        <h2 className="text-2xl mb-4">Your Badges</h2>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge: any) => (
            <div
              key={badge.id}
              className="p-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded shadow-lg"
            >
              <div dangerouslySetInnerHTML={{ __html: badge.html }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
