'use client'

import { Calendar, Home, Inbox, Search, Settings, Settings2 } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
export const items = [
  {
    title: "Criar Investimento",
    url: "/dashboard/fixed-income-investment/create",
    icon: Home,
  },
  {
    title: "Meus investimentos",
    url: "/dashboard/fixed-income-investment/list",
    icon: Inbox,
  },
  {
    title: "Análises",
    url: "/dashboard/fixed-income-investment/analysis",
    icon: Settings2,
  },
  {
    title: "Configurações",
    url: "/dashboard/fixed-income-investment/settings",
    icon: Settings,
  }
]

export function AppSidebar() {
  const pathname = usePathname() 
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                    <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}