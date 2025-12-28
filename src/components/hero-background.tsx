import { cn } from "@/lib/utils";

export function HeroBackground({
  children,
  imageStyle,
}: Readonly<{ children: React.ReactNode; imageStyle?: string }>) {
  return (
    <section className="min-h-screen gap-10 relative bg-linear-to-b from-white/0 via-65% to-[#181818]/60">
      <div
        className={cn(
          "bg-[url('/landing-bg.jpg')] bg-cover bg-center bg-no-repeat absolute top-0 left-0 w-full h-full z-0 ",
          imageStyle,
        )}
      />
      <div className="z-10 w-full relative">{children}</div>
    </section>
  );
}
