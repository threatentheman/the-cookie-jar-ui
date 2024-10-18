"use client";

import React, { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { auth } from "../../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";

const bookmakersList = [
  "Bet365",
  "William Hill",
  "Ladbrokes",
  "Coral",
  "Betfair",
  "Paddy Power",
  "Sky Bet",
  "BetVictor",
  "Unibet",
  "888sport",
  "Betfred",
  "BoyleSports",
  "Virgin Bet",
  "SpreadEx",
  "Betway",
  "Bwin",
  "SBK",
  "Smarkets",
  "QuinnBet",
  "VBet",
  "Parimatch",
  "MansionBet",
  "BetStars",
  "Sportingbet",
  "BetDaq",
  "BetUK",
  "Betiton",
];

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    riskAppetite: "",
    bookmakers: [],
    password: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isFormVisible, setIsFormVisible] = useState(true);

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
        setMessage({
          type: "success",
          text: "We have sent you a verification link. Please check your mail box.",
        });
        setIsFormVisible(false); // Hide the form
      } catch (error) {
        console.error("Error sending verification email:", error);
        setMessage({
          type: "error",
          text: "Error sending verification email: " + error.message,
        });
      }
    } else {
      setMessage({ type: "error", text: "Please enter a valid email." });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      const { user } = userCredential;

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
        setMessage({
          type: "success",
          text: "Sign up successful! User data saved successfully!",
        });
        setIsFormVisible(false); // Hide the form
      } else {
        setMessage({
          type: "error",
          text: "Error saving user profile: " + data.error,
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error signing up: " + error.message });
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

        {/* Notification Message */}
        {message.text && (
          <p
            className={`mt-2 px-4 py-2 border-l-4 mb-6 ${
              message.type === "success"
                ? "bg-green-100 border-green-700 text-green-700"
                : message.type === "error"
                ? "bg-red-100 border-red-700 text-red-700"
                : "bg-gray-100 border-gray-500 text-gray-700"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Form */}
        {isFormVisible ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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
              label="Your risk appetite (Optional)"
              onSelectionChange={(value) =>
                handleRiskAppetiteChange(value.currentKey)
              }
              selectionMode="single"
            >
              <SelectItem key="low" value="low">
                Low
              </SelectItem>
              <SelectItem key="medium" value="medium">
                Medium
              </SelectItem>
              <SelectItem key="high" value="high">
                High
              </SelectItem>
            </Select>

            <Select
              label="Select your bookmakers (Optional)"
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

            <Button type="submit">
              {isCodeSent ? "Complete Sign Up" : "Send Verification Link"}
            </Button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default SignupPage;
