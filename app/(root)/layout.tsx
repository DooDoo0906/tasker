import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LefSideBar from "../components/shared/LefSideBar";
import Header from "../components/shared/Header";
import { dark } from "@clerk/themes";
import BottomBar from "../components/shared/BottomBar";
import AuthGuard from "../auth/auth-guard";
import ToastProvider from "@/context/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doo Doo Tasker",
  description: "Better way to arrange your task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <AuthGuard>
        <html lang="en">
          <body className={inter.className}>
            <header>
              <Header />
            </header>
            <main className="flex flex-row ">
              <div>
                <LefSideBar />
              </div>
              <section className="mt-24 max-lg:ml-5 lg:ml-60 mr-5">
                <ToastProvider>{children}</ToastProvider>
              </section>
            </main>
            <BottomBar />
          </body>
        </html>
      </AuthGuard>
    </ClerkProvider>
  );
}
