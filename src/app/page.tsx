"use client";

import { HeroBackground } from "@/components/hero-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <>
      <HeroBackground>
        <div className="px-9 w-full min-h-screen flex flex-col">
          <header className="py-4 flex justify-between">
            <div className="flex items-center gap-1.5">
              <Image
                src={"/Logo.svg"}
                alt="logo"
                width={35}
                height={35}
                className="object-contain"
              />
              <h2 className="text-xl font-roboto font-bold text-green-400">Travelnesia</h2>
            </div>
            <div className="flex gap-5 items-center">
              <Link href="/sign-in">
                <p className="text-sm font-bold font-roboto">Log In</p>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" variant="secondary" className="cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </div>
          </header>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="max-w-xl mx-auto pb-8">
              <h1 className="text-5xl font-bold text-center text-green-400">
                Travel Article And News exciting <span className="text-red-500">Journey</span> with
                us
              </h1>
            </div>
            <Link href="/sign-in">
              <Button className="cursor-pointer">Discover Now</Button>
            </Link>
          </div>
        </div>
      </HeroBackground>
      <section></section>
    </>
  );
}
