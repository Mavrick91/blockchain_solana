"use client";

import Button from "../components/Button/Button";
import { useWallet } from "../context/SolanaWalletProvider";

const Header = () => {
  const { connectToSolflare, isConnectedToSolflare, disconnectToSolflare } =
    useWallet();

  return (
    <header className="pt-6 px-8">
      <nav aria-label="Global" className="flex items-center justify-between">
        <div className="text-sm font-semibold leading-6 text-white flex flex-1 justify-end">
          {!isConnectedToSolflare ? (
            <Button onClick={connectToSolflare}>
              Connect to Solflare <span aria-hidden="true">&nbsp;&rarr;</span>
            </Button>
          ) : (
            <Button onClick={disconnectToSolflare}>
              Disconnect <span aria-hidden="true">&nbsp;&rarr;</span>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
