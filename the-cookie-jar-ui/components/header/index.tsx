import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="md:h-screen">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link href="/">Betting App</Link>
        </div>

        {/* Navigation */}
        <nav className="grid grid-cols-12">
          <Link href="/" className="col-span-12">Home</Link>
          <Link href="/fixture" className="col-span-12">Fixtures</Link>
          <Link href="/profile" className="col-span-12">Profile</Link>
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
