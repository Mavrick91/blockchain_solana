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

const SolflareWalletProvider = ({ children }) => {
  const [isConnectedToSolflare, setIsConnectedToSolflare] = useState(false);

  const solflareProvider = useMemo(() => {
    if (typeof window !== "undefined") {
      const isSolflareInstalled = window.solflare && window.solflare.isSolflare;

      if (isSolflareInstalled) {
        return window.solflare;
      }
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

  const solFlarePublicKey = useMemo(() => {
    if (solflareProvider) return solflareProvider.publicKey;
    return null;
  }, [solflareProvider]);

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

export const useSolflareWallet = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useSolflareWallet must be used within a SolflareWalletProvider"
    );
  }

  return context;
};

export default SolflareWalletProvider;
