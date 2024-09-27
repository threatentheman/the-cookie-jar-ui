"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Spacer,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

export default function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [riskAppetite, setRiskAppetite] = useState(50); // Default to 50% on slider
  const [sportsbooks, setSportsbooks] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [responsibleGambling, setResponsibleGambling] = useState(false);

  const handleSportsbookChange = (selected) => {
    setSportsbooks(selected);
  };

  const handleSubmit = () => {
    if (!fullName || !email || !password || !confirmPassword || !country) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreement || !responsibleGambling) {
      alert(
        "You must agree to the terms and acknowledge responsible gambling."
      );
      return;
    }

    console.log({
      fullName,
      email,
      password,
      country,
      riskAppetite,
      sportsbooks,
      dateOfBirth,
    });
  };

  const sportsbooksList = [
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
  ];

  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-8 sm:p-20 text-gray-700">
      <h2>Registration</h2>

      <Input
        className="border border-gray-400 rounded-md overflow-hidden px-4 py-2 mb-4"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
      />
      <Input
        className="border border-gray-400 rounded-md overflow-hidden px-4 py-2 mb-4"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <Dropdown>
        <DropdownTrigger>
          <p className="border border-gray-400 rounded-md overflow-hidden px-4 py-2 mb-4">Country</p>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown Variants" className="text-gray-700">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Spacer y={1} />

      <p>Risk Appetite: {riskAppetite}%</p>
      <input
        type="range"
        min="0"
        max="100"
        value={riskAppetite}
        onChange={(e) => setRiskAppetite(e.target.value)}
        className="w-full"
      />
      <p>Choose Your Registered Sportsbooks</p>
      <CheckboxGroup
        color="primary"
        value={sportsbooks}
        onChange={handleSportsbookChange}
        defaultValue={[]}
      >
        {sportsbooksList.map((book) => (
          <Checkbox key={book} value={book}>
            {book}
          </Checkbox>
        ))}
      </CheckboxGroup>

      <Input
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
      />
      <Spacer y={1} />

      {/* Terms & Conditions */}
      <Checkbox isSelected={agreement} onChange={setAgreement}>
        I agree to the Terms & Conditions and Privacy Policy.
      </Checkbox>
      <Spacer y={1} />

      {/* Responsible Gambling */}
      <Checkbox
        isSelected={responsibleGambling}
        onChange={setResponsibleGambling}
      >
        I acknowledge that I will gamble responsibly.
      </Checkbox>
      <Spacer y={1} />

      {/* Submit Button */}
      <Button onClick={handleSubmit} color="success">
        Register
      </Button>
    </div>
  );
}
