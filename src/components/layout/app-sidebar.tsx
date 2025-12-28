"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChartColumnStacked, LayoutGrid, MessageSquare, Newspaper } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Articles",
    url: "/articles",
    icon: Newspaper,
  },
  {
    title: "Comments",
    url: "/comments",
    icon: MessageSquare,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: ChartColumnStacked,
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar {...props} variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                {state === "collapsed" ? (
                  <Image
                    src={"/Logo.svg"}
                    alt="logo"
                    width={35}
                    height={35}
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={"/Logo.svg"}
                      alt="logo"
                      width={35}
                      height={35}
                      className="object-contain"
                    />
                    <p className="text-green-400 font-bold text-base">Travelnesia</p>
                  </div>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-2.5">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={cn("hover:bg-sky-50", pathname === item.url && "bg-sky-50")}
            >
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
