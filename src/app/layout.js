"use client";

import "./globals.css";

import React from "react";

import SolanaWalletProvider from "../context/SolanaWalletProvider";

const RootLayout = ({ children }) => (
  <html lang="en">
    <head />
    <body>
      <SolanaWalletProvider>{children}</SolanaWalletProvider>
    </body>
  </html>
);

export default RootLayout;
