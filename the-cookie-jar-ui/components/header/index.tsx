import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-default-600 text-white p-4">
      <div className="md:h-screen">
        {/* Logo */}
        <div className="text-lg font-bold mb-4">
          <Link href="/">The Cookie Jar</Link>
        </div>

        {/* Navigation */}
        <nav className="grid grid-cols-12 mb-4">
          <Link href="/" className="col-span-12">Home</Link>
          <Link href="/fixture" className="col-span-12">Fixtures</Link>
          <Link href="/profile" className="col-span-12">Profile</Link>
        </nav>

        {/* Login/Signup Button */}
        <div>
          <Link href="">Logout</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
