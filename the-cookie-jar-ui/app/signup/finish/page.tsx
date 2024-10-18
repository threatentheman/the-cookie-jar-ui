// app/signup/finish/page.tsx
"use client";

import React, { useEffect } from "react";
import { auth } from "../../../lib/firebase"; // Adjust the import based on your project structure
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const FinishSignupPage = () => {
  useEffect(() => {
    const email = window.localStorage.getItem("emailForSignIn"); // Store email temporarily before navigating
    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // User signed in successfully
          console.log("Successfully verified email:", result);
          // You can redirect or show a success message here
        })
        .catch((error) => {
          console.error("Error during email verification:", error);
          // Handle error (e.g., show a message to the user)
        });
    }
  }, []);

  return (
    <div>
      <h1>Finishing your signup...</h1>
      {/* You can show a loading indicator here */}
    </div>
  );
};

export default FinishSignupPage;
