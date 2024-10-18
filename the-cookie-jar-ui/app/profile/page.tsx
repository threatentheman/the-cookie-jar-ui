// app/signup/page.tsx
"use client";

import React, { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const bookmakersList = [
  "Bet365", "William Hill", "Ladbrokes", "Coral", "Betfair", "Paddy Power", "Sky Bet",
  "BetVictor", "Unibet", "888sport", "Betfred", "BoyleSports", "Virgin Bet", "SpreadEx",
  "Betway", "Bwin", "SBK", "Smarkets", "QuinnBet", "VBet", "Parimatch", "MansionBet",
  "BetStars", "Sportingbet", "BetDaq", "BetUK", "Betiton",
];

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    riskAppetite: "",
    bookmakers: [],
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleBookmakersChange = (keys: Set<string>) => {
    setSignupData({ ...signupData, bookmakers: Array.from(keys) });
  };

  const handleRiskAppetiteChange = (value: string) => {
    setSignupData({ ...signupData, riskAppetite: value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      const user = userCredential.user;

      // Store the user profile in MongoDB
      const userProfileData = {
        uid: user.uid,
        name: signupData.name,
        email: signupData.email,
        riskAppetite: signupData.riskAppetite,
        bookmakers: signupData.bookmakers,
      };

      const response = await fetch("/api/saveUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfileData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Signup successful! User data saved.");
      } else {
        setMessage(`Error saving user profile: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Signup error: ${error.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-12 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {message && <p className="text-red-700 mb-4">{message}</p>}
        <form onSubmit={handleSignup} className="space-y-6">
          <Input
            type="text"
            name="name"
            label="Name"
            value={signupData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={signupData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={signupData.password}
            onChange={handleInputChange}
            required
          />
          <Select
            label="Your Risk Appetite"
            onSelectionChange={handleRiskAppetiteChange}
            selectionMode="single"
          >
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </Select>
          <Select
            label="Select Bookmakers"
            selectionMode="multiple"
            onSelectionChange={handleBookmakersChange}
            searchable
          >
            {bookmakersList.map((bookmaker) => (
              <SelectItem key={bookmaker} value={bookmaker}>
                {bookmaker}
              </SelectItem>
            ))}
          </Select>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
