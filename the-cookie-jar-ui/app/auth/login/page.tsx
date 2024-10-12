// app/login/page.tsx
"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input, Button, Spacer } from "@nextui-org/react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1); // Step 1: phone input, Step 2: verification code
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [codeSent, setCodeSent] = useState(false); // Keeps track if a code was sent

  const handleSendCode = () => {
    if (phone) {
      // Simulate sending the code (replace this with your Firebase SMS logic)
      console.log("Phone number submitted: ", phone);
      setCodeSent(true);
      setStep(2); // Move to step 2 (verification)
      setMessage(`A 6-digit code has been sent to ${phone}`);
    } else {
      setMessage("Please enter a valid phone number.");
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      console.log("Code submitted:", verificationCode);
      setMessage("Login successful!");
      // Add your logic for verifying the code with Firebase
    } else {
      setMessage("Please enter a valid 6-digit code.");
    }
  };

  const handleResendCode = () => {
    // Simulate resending the code (replace with Firebase logic)
    setMessage(`A new code has been sent to ${phone}`);
    setCodeSent(true);
  };

  return (
    <section className="items-center justify-center min-h-screen p-8 sm:p-20">
      {message && <p className="border-l-2 pl-3 py-1 mb-10 bg-default-100 text-gray-700 text-sm">{message}</p>}
      {step === 1 && (
        <>
          <h3 className="text-gray-700 pb-2">Login with Phone Number</h3>
          <div className="pb-2 text-gray-700">
            <PhoneInput
              country={"gb"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
          </div>
          <Button onClick={handleSendCode}>Send Login Code</Button>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="text-gray-700 pb-2 mb-2">Enter your verification code</h3>
          <div className="mb-4">
            <Input
              label="6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              type="text"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={handleVerifyCode}>Verify Code</Button>
            <Button onClick={handleResendCode}>
              Resend Code
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
