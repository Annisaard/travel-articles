import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarInset> */}
      <div className="flex flex-col w-full p-2">
        <div className="mb-2">
          <Header />
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto px-6 py-5 rounded-md bg-background">
          {children}
        </div>
      </div>
      <Toaster position="top-center" richColors />
      {/* </SidebarInset> */}
    </SidebarProvider>
  );
}
