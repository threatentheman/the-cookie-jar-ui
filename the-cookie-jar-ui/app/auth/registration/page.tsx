// app/signup/page.tsx
"use client";

import React, { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const bookmakersList = [
  "Bet365", "William Hill", "Ladbrokes", "Coral", "Betfair", "Paddy Power", "Sky Bet", "BetVictor", "Unibet", 
  "888sport", "Betfred", "BoyleSports", "Virgin Bet", "SpreadEx", "Betway", "Bwin", "SBK", "Smarkets", 
  "QuinnBet", "VBet", "Parimatch", "MansionBet", "BetStars", "Sportingbet", "BetDaq", "BetUK", "Betiton"
];

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    riskAppetite: "",
    bookmakers: [],  // Multiple bookmakers selected by the user
    verificationCode: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handlePhoneChange = (phone: string) => {
    setSignupData({ ...signupData, phone });
  };

  const handleSelectChange = (keys: Set<string>) => {
    setSignupData({ ...signupData, bookmakers: Array.from(keys) });
  };

  const handleSendCode = () => {
    if (signupData.phone || signupData.email) {
      setIsCodeSent(true);
      setMessage("A 6-digit code has been sent to your email or phone.");
    } else {
      setMessage("Please enter a valid email or phone number.");
    }
  };

  const handleVerifyCode = () => {
    if (signupData.verificationCode.length === 6) {
      setMessage("Sign up successful!");
    } else {
      setMessage("Please enter a valid 6-digit code.");
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
          />

          {/* Phone Number */}
          <PhoneInput
            country={"gb"}
            value={signupData.phone}
            onChange={handlePhoneChange}
            inputProps={{ name: "phone", required: true }}
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

          {/* Verification Code Input (Visible after code is sent) */}
          {isCodeSent && (
            <Input
              type="text"
              name="verificationCode"
              label="Enter the code"
              value={signupData.verificationCode}
              onChange={handleInputChange}
              required
              maxLength={6}
            />
          )}

          {/* Submit Button */}
          <Button type="submit">
            {isCodeSent ? "Complete Sign Up" : "Send Verification Code"}
          </Button>

          {message && <p className="text-gray-700 mt-2">{message}</p>}
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
