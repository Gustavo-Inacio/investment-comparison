'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { items } from "../app-sidebar"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-sm md:hidden">
      <ul className="flex justify-around items-center h-16">
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <li key={item.title}>
              <Link
                href={item.url}
                className={cn(
                  "flex flex-col items-center text-xs transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className="mt-1">{item.title.split(" ")[0]}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
