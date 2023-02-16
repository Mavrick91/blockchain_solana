"use client";

import BackgroundDecoration from "../components/BackgroundDecoration";
import Header from "./Header";

const Home = () => (
  <div className="isolate bg-gray-900 flex-grow">
    <BackgroundDecoration />
    <Header />
    <main>
      <div className="relative py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to a world of seamless transactions with Solana!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Experience fast and secure transactions with Solana. Start now!
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Home;
