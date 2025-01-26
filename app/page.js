"use client";

import { useState } from "react";
import { ethers } from "ethers";
import styles from "./styles.module.css";

export default function HomePage() {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("No crypto wallet found! Please install MetaMask.");
        return;
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      await signer.getAddress();

      setWalletConnected(true);
    } catch (error) {
      console.error("Connect Wallet Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Лого в левом верхнем углу */}
      <div className={styles.logoTopLeft}>monadviber</div>

      {/* Обёртка для центрирования содержимого */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.inviteTitle}>Welcome to the world of Monad vibes!</h1>
        <p className={styles.inviteSubtitle}>
          Connect your wallet to explore unique, inspiring vibes.
        </p>

        <button
          className={`${styles.centerButton} ${walletConnected ? styles.disabledBtn : ""}`}
          onClick={connectWallet}
          disabled={walletConnected}
        >
          {walletConnected ? "Already Connected" : "Connect Wallet"}
        </button>

        {walletConnected && (
          <a href="/generate" className={styles.linkButton}>
            Proceed to Vibes
          </a>
        )}
      </div>
      {/* На главной странице нет футера — по вашему запросу */}
    </div>
  );
}