import React from "react";
import { Toaster } from "react-hot-toast";
import { DiscardModalProvider } from "./DiscardModalContext";
import { UserProvider } from "./userContext";

export default function AppProviders({ children }) {
  return (
    <React.Fragment>
      <DiscardModalProvider>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </DiscardModalProvider>
    </React.Fragment>
  );
}
