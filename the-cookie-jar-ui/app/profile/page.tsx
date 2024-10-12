// app/profile/page.tsx
"use client";

import React, { useState } from "react";
import { Select, SelectItem, Button, Input } from "@nextui-org/react";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    riskAppetite: "",
    bookmakers: [],
  });

  const bookmakersList = [
    "Bet365",
    "William Hill",
    "Paddy Power",
    "Betfair",
    "Ladbrokes",
  ];

  const riskAppetiteList = ["low", "medium", "high"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (keys: Set<string>) => {
    setFormData({ ...formData, bookmakers: Array.from(keys) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Perform the submit action here (e.g., send data to an API)
  };

  return (
    <main className="min-h-screen bg-gray-100 p-12 flex justify-center items-center">
      <div className="bg-white  rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile Page</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Input
              type="text"
              id="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              label="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <Input
              type="tel"
              id="number"
              name="number"
              label="Number"
              value={formData.number}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Risk Appetite */}
          <div>
            <Select label="Your risk appetite" className="">
              {riskAppetiteList.map((risk, index) => (
                <SelectItem key={index}>{risk}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Bookmakers */}
          <div>
            <Select
              selectionMode="multiple"
              onSelectionChange={handleSelectChange}
              label="Select your bookmakers"
              selectedKeys={new Set(formData.bookmakers)}
              searchable
            >
              {bookmakersList.map((bookmaker) => (
                <SelectItem key={bookmaker} value={bookmaker}>
                  {bookmaker}
                </SelectItem>
              ))}
            </Select>
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" className="">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
