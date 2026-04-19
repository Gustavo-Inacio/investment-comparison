import { AppSidebar } from "@/components/app-sidebar"
import { AppTopBar } from "@/components/app-topbar"
import { MobileNav } from "@/components/bottom-navbar/bottom-navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppTopBar />
        {children}
      </main>
      {/* <MobileNav /> */}
    </SidebarProvider>
  )
}