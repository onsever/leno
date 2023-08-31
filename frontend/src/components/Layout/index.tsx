import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
