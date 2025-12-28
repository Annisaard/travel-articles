"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, LogOut, Mail } from "lucide-react";
import Cookie from "js-cookie";
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from "@/lib/constants";
import { redirect } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Header() {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
  // const clearUserProfile = useStore((state) => state.clearUserProfile);
  // const userProfile = useStore((state) => state.userProfile);
  const logout = () => {
    Cookie.remove(ACCESS_TOKEN_KEY);
    Cookie.remove(USER_ID_KEY);
    redirect("/");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="md:rounded-sm bg-background flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1" color="text-gray-50" />
          <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full bg-primary-foreground hover:bg-primary-foreground"
          >
            <Mail size={15} className="text-green-500 hover:text-red-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full bg-primary-foreground hover:bg-primary-foreground"
          >
            <Bell size={15} className="text-green-500 hover:text-red-500" />
          </Button>
          <div className="flex gap-2 items-center">
            <Avatar className="size-8 rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                // alt={`${userProfile.UserName || "User"} avatar`}
              />
              <AvatarFallback className="rounded-lg">
                {/* {getInitials(userProfile.UserName)} */}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs text-green-500 font-medium">Annisa Rd</p>
              <p className="text-xs text-gray-300">annisarahmadhani78@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
