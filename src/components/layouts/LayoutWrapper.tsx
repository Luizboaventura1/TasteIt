'use client'

import { usePathname } from 'next/navigation'
import MainNavbar from './MainNavbar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbar = pathname === '/' || pathname === "/profile"

  return (
    <>
      {hideNavbar && <div className="h-[80px]">
        <div className="fixed z-40 top-0 left-0 w-full">
          <MainNavbar />
        </div>
      </div>}
      {children}
    </>
  )
}
