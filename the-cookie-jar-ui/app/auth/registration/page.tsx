// app/signup/page.tsx
"use client";

import React, { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { auth } from "../../../lib/firebase";
import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";

const bookmakersList = [
  "Bet365", "William Hill", "Ladbrokes", "Coral", "Betfair", "Paddy Power", "Sky Bet", "BetVictor", "Unibet", 
  "888sport", "Betfred", "BoyleSports", "Virgin Bet", "SpreadEx", "Betway", "Bwin", "SBK", "Smarkets", 
  "QuinnBet", "VBet", "Parimatch", "MansionBet", "BetStars", "Sportingbet", "BetDaq", "BetUK", "Betiton"
];

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    riskAppetite: "",
    bookmakers: [],  // Multiple bookmakers selected by the user
    password: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSelectChange = (keys: Set<string>) => {
    setSignupData({ ...signupData, bookmakers: Array.from(keys) });
  };

  const handleSendCode = async () => {
    if (signupData.email) {
      window.localStorage.setItem("emailForSignIn", signupData.email); // Store email temporarily
      const actionCodeSettings = {
        url: `${window.location.origin}/signup/finish`,
        handleCodeInApp: true,
      };
  
      try {
        await sendSignInLinkToEmail(auth, signupData.email, actionCodeSettings);
        setIsCodeSent(true);
        setMessage("A verification link has been sent to your email.");
      } catch (error) {
        console.error("Error sending verification email:", error); // Log error details
        setMessage("Error sending verification email: " + error.message);
      }
    } else {
      setMessage("Please enter a valid email.");
    }
  };
  

  const handleVerifyCode = async () => {
    try {
        // Register user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
        const { user } = userCredential;

        // Prepare user profile data
        const userProfileData = {
            uid: user.uid,
            name: signupData.name,
            email: signupData.email,
            phone: "", // Assuming phone is no longer needed
            riskAppetite: signupData.riskAppetite,
            bookmakers: signupData.bookmakers,
        };

        const response = await fetch('/api/saveUserProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfileData),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("Sign up successful! " + data.message);
        } else {
            setMessage("Error saving user profile: " + data.error);
        }
    } catch (error) {
        setMessage("Error signing up: " + error.message);
    }
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCodeSent) {
      handleVerifyCode();
    } else {
      handleSendCode();
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-12 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {message && <p className="text-green-700 mt-2 bg-green-100 border-l-4 px-4 py-2 border-green-700 mb-6">{message}</p>}
      
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <Input
            type="text"
            name="name"
            label="Name"
            value={signupData.name}
            onChange={handleInputChange}
            required
          />

          {/* Email */}
          <Input
            type="email"
            name="email"
            label="Email"
            value={signupData.email}
            onChange={handleInputChange}
            required
          />

          {/* Password */}
          <Input
            type="password"
            name="password"
            label="Password"
            value={signupData.password}
            onChange={handleInputChange}
            required
          />

          {/* Risk Appetite (Optional) */}
          <Select label="Your risk appetite (Optional)">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </Select>

          {/* Bookmakers Multi-Select */}
          <Select
            label="Select your bookmakers (Optional)"
            selectionMode="multiple"
            onSelectionChange={handleSelectChange}
            searchable
          >
            {bookmakersList.map((bookmaker) => (
              <SelectItem key={bookmaker} value={bookmaker}>
                {bookmaker}
              </SelectItem>
            ))}
          </Select>

          {/* Submit Button */}
          <Button type="submit">
            {isCodeSent ? "Complete Sign Up" : "Send Verification Link"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
