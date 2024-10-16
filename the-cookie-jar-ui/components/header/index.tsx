import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="p-4">
        <div className="text-lg font-bold mb-4">
          <Image src={logo} alt="The cookie jar logo"/>
        </div>

        <div className="text-default-700 rounded-lg">
          <nav className="grid grid-cols-12 mb-4">
            <Link href="/" className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md">
              Home
            </Link>
            <Link href="/fixtures" className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md">
              Fixtures
            </Link>
            <Link href="/profile" className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md">
              Profile
            </Link>
            <Link href="" className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md">
              Resources
            </Link>
          </nav>

          <nav className="grid grid-cols-12 mb-4">
            <Link href="" className="col-span-12 hover:bg-default-100 px-4 py-2 rounded-md">Logout</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
