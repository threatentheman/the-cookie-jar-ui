"use client";

import React, { useState, useEffect } from "react";
import { Select, SelectItem, Button, Input } from "@nextui-org/react";
import useSWR from "swr";
import { useAuth } from "../../context/AuthContext"; // Use the auth context to get user status
import {
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile = () => {
  const { user, loading: authLoading } = useAuth(); // Get user and loading status from AuthContext
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    riskAppetite: "",
    bookmakers: [],
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",  // Field to confirm new password
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false); // Toggle password fields visibility
  const [message, setMessage] = useState("");

  // Use SWR to fetch user profile data and cache it
  const { data, error, mutate } = useSWR(
    user ? `/api/getUserProfile?uid=${user.uid}` : null,
    fetcher
  );

  // Populate formData with user profile data once loaded
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        riskAppetite: data.riskAppetite || "",
        bookmakers: data.bookmakers || [],
      });
    }
    console.log(data);
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookmakersChange = (keys: Set<string>) => {
    setFormData({ ...formData, bookmakers: Array.from(keys) });
  };

  const handleRiskAppetiteChange = (value: string) => {
    setFormData({ ...formData, riskAppetite: value });
  };

  const handlePasswordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const user = auth.currentUser;  // Get the current user from Firebase Auth

      if (!user) {
        setMessage("You must be signed in to update your profile.");
        return;
      }

      // Make sure the uid is included in the formData
      const updatedProfileData = {
        ...formData,
        uid: user.uid,  // Include the user's uid from Firebase Auth
      };

      const response = await fetch("/api/updateUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfileData),  // Pass the profile data including uid
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully.");
      } else {
        setMessage(`Error updating profile: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error updating profile: ${error.message}`);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Ensure new passwords match
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;

      if (user && passwords.newPassword) {
        // Reauthenticate the user with the current password
        const credential = EmailAuthProvider.credential(
          user.email,
          passwords.currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        // Update password in Firebase
        await updatePassword(user, passwords.newPassword);
        setMessage("Password updated successfully.");
      } else {
        setMessage("Please enter a new password.");
      }
    } catch (error) {
      setMessage(`Error updating password: ${error.message}`);
    }
  };

  if (authLoading || !data) {
    return <p>Loading...</p>; // Show loading while fetching auth or profile data
  }

  if (!user) {
    return <p>You need to sign in to view this page.</p>; // If no user is signed in
  }

  return (
    <main className="min-h-screen bg-gray-100 p-12 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile Page</h1>
        {message && <p className="text-red-700 mb-4">{message}</p>}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <Input
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Select
            label="Your Risk Appetite"
            onSelectionChange={(value) =>
              handleRiskAppetiteChange(value.currentKey)
            }
            selectionMode="single"
            selectedKeys={new Set([formData.riskAppetite])} // Match selected value
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
            label="Select Bookmakers"
            selectionMode="multiple"
            onSelectionChange={handleBookmakersChange}
            selectedKeys={new Set(formData.bookmakers)} // Pre-select user’s bookmakers
            searchable
          >
            {bookmakersList.map((bookmaker) => (
              <SelectItem key={bookmaker} value={bookmaker}>
                {bookmaker}
              </SelectItem>
            ))}
          </Select>
          <Button type="submit">Save Profile</Button>
        </form>

        {/* Change Password Section */}
        <Button
          className="mt-8"
          onClick={() => setShowPasswordFields(!showPasswordFields)}
        >
          {showPasswordFields ? "Cancel Password Change" : "Change Password"}
        </Button>

        {showPasswordFields && (
          <form onSubmit={handleChangePassword} className="space-y-6 mt-4">
            <Input
              type="password"
              name="currentPassword"
              label="Current Password"
              value={passwords.currentPassword}
              onChange={handlePasswordsChange}
              required
            />
            <Input
              type="password"
              name="newPassword"
              label="New Password"
              value={passwords.newPassword}
              onChange={handlePasswordsChange}
              required
            />
            <Input
              type="password"
              name="confirmNewPassword"
              label="Confirm New Password"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordsChange}
              required
            />
            <Button type="submit">Change Password</Button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Profile;
