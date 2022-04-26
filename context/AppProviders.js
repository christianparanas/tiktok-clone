import React from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./userContext";


export default function AppProviders({ children }) {
  return (
    <React.Fragment>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </React.Fragment>
  );
}
