
export default function SignupLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {children}  {/* This renders the signup page content */}
      </div>
    );
  }
  