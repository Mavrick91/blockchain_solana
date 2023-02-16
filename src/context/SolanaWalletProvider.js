"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [isConnectedToSolflare, setIsConnectedToSolflare] = useState(false);

  const solflareProvider = useMemo(() => {
    const isSolflareInstalled = window.solflare && window.solflare.isSolflare;

    if (isSolflareInstalled) {
      return window.solflare;
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnectedToSolflare]);

  useEffect(() => {
    const isSolflareInstalled = window.solflare && window.solflare.isSolflare;

    if (isSolflareInstalled) {
      window.solflare.on("connect", () => {
        setIsConnectedToSolflare(true);
      });

      window.solflare.on("disconnect", () => {
        setIsConnectedToSolflare(false);
      });
    }
  }, []);

  const solFlarePublicKey = useMemo(
    () => solflareProvider.publicKey,
    [solflareProvider.publicKey]
  );

  const connectToSolflare = useCallback(() => {
    if (solflareProvider) {
      solflareProvider.connect();
    }
  }, [solflareProvider]);

  const disconnectToSolflare = useCallback(() => {
    if (solflareProvider) {
      solflareProvider.disconnect();
    }
  }, [solflareProvider]);

  return (
    <WalletContext.Provider
      value={{
        solflareProvider,
        connectToSolflare,
        isConnectedToSolflare,
        disconnectToSolflare,
        solFlarePublicKey,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
};

export default WalletProvider;
