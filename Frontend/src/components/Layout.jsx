import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Login from "./Login/Login";

function Layout({ children }) {
  const authStatus = useSelector((state) => state.auth.authenticated);
  return authStatus ? (
    <SidebarProvider>
      <AppSidebar />

      <main className="mr-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  ) : (
    <Login />
  );
}

export default Layout;
