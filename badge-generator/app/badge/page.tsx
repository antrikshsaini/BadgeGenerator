"use client";

import React, { useState } from "react";
import BadgeComponent from "../../components/BadgeComponent";
import axios from "axios";
import Navbar from "@/components/Navbar";

const BadgePage: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [badgeType, setBadgeType] = useState("Gold");

  const handleSaveBadge = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("User ID not found in local storage.");
      return;
    }

    const currentHtmlElement = document.getElementById("currentHtml");

    if (!currentHtmlElement) {
      alert("Failed to retrieve badge HTML.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/badge/", {
        organiser_id: userId,
        html: currentHtmlElement.outerHTML,
      });
      alert("Badge saved successfully!");
    } catch (error) {
      alert("Failed to save badge.");
    }
  };

  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Create Badge</h1>
      <div id="currentHtml" className="flex justify-center mb-4">
        <BadgeComponent
          companyName={companyName}
          fullName={fullName}
          badgeType={badgeType}
          onCompanyNameChange={setCompanyName}
          onFullNameChange={setFullName}
        />
      </div>
      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSaveBadge}
        >
          Save Badge
        </button>
      </div>
      <div className="flex justify-center">
        <select
          className="border p-2 rounded"
          value={badgeType}
          onChange={(e) => setBadgeType(e.target.value)}
        >
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
        </select>
      </div>
    </div>
  );
};

export default BadgePage;
