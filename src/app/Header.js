"use client";

import Button from "../components/Button/Button";

const Header = () => (
  <header className="pt-6 px-8">
    <nav aria-label="Global" className="flex items-center justify-between">
      <div className="text-sm font-semibold leading-6 text-white flex flex-1 justify-end">
        {false ? (
          <Button onClick={() => null}>
            Connect to Solflare <span aria-hidden="true">&nbsp;&rarr;</span>
          </Button>
        ) : (
          <Button onClick={() => null}>
            Disconnect <span aria-hidden="true">&nbsp;&rarr;</span>
          </Button>
        )}
      </div>
    </nav>
  </header>
);

export default Header;
