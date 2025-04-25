import "../views/styles/css/globals.css"
import { baseMetadata } from "@/views/configs/metadata/base-metadata"
import { geistMono, geistSans } from "@/views/styles/fonts/geist"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import React from "react"

export const metadata = baseMetadata

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}

export default RootLayout
