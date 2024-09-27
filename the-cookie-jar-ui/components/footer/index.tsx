import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="mb-4">© 2024 Betting App. All Rights Reserved.</p>

        <div className="space-x-4">
          <Link href="/terms">Terms & conditions</Link>
          <Link href="/privacy">Privacy policy </Link>
        </div>

        {/* Social Media Icons (use icons or simple text links) */}
        <div className="mt-4 space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:underline"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
