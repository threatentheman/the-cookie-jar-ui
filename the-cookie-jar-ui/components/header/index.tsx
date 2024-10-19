"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext for user state
import { auth } from "../../lib/firebase"; // Firebase auth object
import { signOut } from "firebase/auth"; // Firebase signOut function
import { useRouter } from "next/navigation"; // For redirecting after logout

const Header = () => {
  const { user } = useAuth(); // Access the user state from AuthContext
  const router = useRouter(); // Use router for redirection

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user using Firebase Auth
      router.push("/auth/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white">
      <div className="p-4">
        <div className="text-lg font-bold mb-4">
          <Image src={logo} alt="The cookie jar logo" />
        </div>

        <div className="text-default-700 rounded-lg">
          <nav className="grid grid-cols-12 mb-4">
            <Link
              href="/"
              className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/fixtures"
              className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md"
            >
              Fixtures
            </Link>
            <Link
              href="/profile"
              className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md"
            >
              Profile
            </Link>
            <Link
              href=""
              className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md"
            >
              Resources
            </Link>
          </nav>

          <nav className="grid grid-cols-12 mb-4">
            {/* Conditionally show Login or Logout button */}
            {!user ? (
              <Link
                href="/auth/login"
                className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md"
              >Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md text-left"
              >Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
