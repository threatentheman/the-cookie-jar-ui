import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link href="/">Betting App</Link>
        </div>

        {/* Navigation */}
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/resources">Help/Resources</Link>
          <Link href="/recommendations/pre-match">Fixtures</Link>
          <Link href="/recommendations/live">Live betting</Link>
          <Link href="/profile">Profile</Link>
        </nav>

        {/* Login/Signup Button */}
        <div>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
