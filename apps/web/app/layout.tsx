import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../components/antd-context/AntdRegistry";
import { QueryRootClient } from "~/components/react-query/QueryRootClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Survey App",
  description: "A survey application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <QueryRootClient>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </QueryRootClient>
      </body>
    </html>
  );
}
