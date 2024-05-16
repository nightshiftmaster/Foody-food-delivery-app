import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDownProvider from "@/providers/CountDownProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foody App",
  description: "Tasty and fasty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CountDownProvider>
            <QueryProvider>
              <Notification />
              <Navbar />
              {children}
              <Footer />
              <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={3000}
              />
            </QueryProvider>
          </CountDownProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
