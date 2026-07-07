import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import { ToastContainer } from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lorem Ipsum | Dolor Sit Amet",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  keywords: ["lorem", "ipsum", "dolor", "sit", "amet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased dark">
      <body className="min-h-full bg-cyber-bg flex flex-col font-sans selection:bg-cyber-cyan/35 selection:text-white relative">
        <AppProvider>
          {/* Main cyberpunk screen scanlines overlay */}
          <div className="absolute inset-0 scanlines opacity-5 pointer-events-none z-50 h-full w-full" />
          
          {/* Main page content wrapper */}
          <div className="flex-1 flex flex-col z-10">
            {children}
          </div>

          {/* Toast Alerts Overlay */}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
