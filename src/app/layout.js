"use client";

import "./globals.css";

import React from "react";

import NotificationProvider from "../context/NotificationProvider";
import SolanaWalletProvider from "../context/SolanaWalletProvider";

const RootLayout = ({ children }) => (
  <html lang="en">
    <head />
    <body>
      <SolanaWalletProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </SolanaWalletProvider>
    </body>
  </html>
);

export default RootLayout;
