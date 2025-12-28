export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="max-w-md">{children}</div>
      <div className="relative">
        <div className="bg-[url('/auth-bg.jpg')] bg-cover bg-right bg-no-repeat absolute top-0 left-0 w-full h-full z-0 " />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>
    </div>
  );
}
