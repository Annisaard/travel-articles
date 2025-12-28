export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md px-6">{children}</div>
      </div>
      <div className="relative">
        <div className="bg-[url('/auth-bg.jpg')] bg-cover bg-right bg-no-repeat absolute top-0 left-0 w-full h-full z-0 " />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="p-6 absolute bottom-8 left-8 right-8 max-w-xs z-20">
          <div className="backdrop-blur-[4px] p-3 rounded-sm bg-[#393737]/73 mb-6">
            <p className="text-white-50">Trusted by over 10.000 travelers</p>
          </div>
          <h2 className="text-2xl font-bold text-white-50">Find Your Nest Stay in Nature</h2>
          <p className="text-xs text-gray-400">
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout
          </p>
        </div>
      </div>
    </div>
  );
}
