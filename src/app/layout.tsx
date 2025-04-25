import "../views/styles/css/globals.css";
import { geistSans, geistMono } from "@/views/styles/fonts/geist";
import React from "react";
import { baseMetadata } from "@/views/configs/metadata/base-metadata";

export const metadata = baseMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
