"use client";

import { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";

// react-hot-toast и react-confetti
import { toast, Toaster } from "react-hot-toast";
import Confetti from "react-confetti";

import styles from "../styles.module.css";

// Примерный контракт
const MYNFT_ADDRESS = "0x0D8e5ed789a5E717d557a592bd2b674ADa513583";
const MYNFT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_imageURI", "type": "string" },
      { "internalType": "string", "name": "_phrase", "type": "string" }
    ],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const images = Array.from({ length: 50 }, (_, i) => `/images/image${i + 1}.jpg`);
const phrases = [
  "Harness the power of Monad and watch your potential unfold.",
  "Your code is your canvas; Monad is your palette of possibility.",
  "In the realm of Monad, every line of code has meaning.",
  "Keep forging forward—Monad is your unstoppable ally.",
  "Your determination is the fuel; Monad is the engine of innovation.",
  "Write your success story in Monad's ledger of achievements.",
  "Believe in your synergy with Monad—unstoppable growth awaits.",
  "In Monad we trust—embrace each block with confidence.",
  "Shine bright in Monad’s network; your brilliance is undeniable.",
  "Your dreams find a home in the Monad ecosystem.",
  "Elevate your spirit with each Monad transaction.",
  "You are the architect of tomorrow—Monad is your foundation.",
  "Think big, code bigger—Monad amplifies your vision.",
  "Each challenge is a stepping stone to Monad’s endless horizon.",
  "You are a beacon of light in Monad’s decentralized universe.",
  "Infinite potential meets unstoppable passion—welcome to Monad.",
  "Every step in Monad brings you closer to your greatest self.",
  "Let your code speak volumes—Monad hears every command.",
  "Your commitment fuels Monad’s evolution.",
  "Stay curious, stay bold—Monad rewards the brave.",
  "The future is bright in Monad’s dynamic network.",
  "One block at a time, you’re rewriting the rules with Monad.",
  "Your energy is magnetic—attract success in Monad’s orbit.",
  "Dare to dream, dare to build—Monad stands behind you.",
  "Push the boundaries—Monad expands with your ambition.",
  "You are the spark that ignites Monad’s next big milestone.",
  "Your creativity is a treasure—Monad helps you unlock it.",
  "Focus on the code; Monad focuses on your legacy.",
  "Innovation thrives where Monad meets your courage.",
  "You are a catalyst for change—Monad is your enabler.",
  "Own your journey—Monad provides the path.",
  "Raise the bar—Monad is here to keep you reaching.",
  "Your presence in Monad is a testament to endless possibility.",
  "Keep coding with heart—Monad amplifies your passion.",
  "Celebrate each merge—Monad celebrates your dedication.",
  "Opportunity knocks in Monad—will you answer?",
  "Your conviction powers the next evolution of Monad.",
  "Step into greatness—Monad paves the way.",
  "You are unstoppable—Monad is the wind beneath your wings.",
  "Pursue excellence—Monad supports every bold move.",
  "Let your code guide you—Monad is your steady compass.",
  "Rise above doubts—Monad helps you soar higher.",
  "Break barriers—Monad thrives on your fearless innovation.",
  "Triumph is near—Monad stands ready to celebrate you.",
  "Walk the path of purpose—Monad unites your vision with reality.",
  "You are the hero of your own story—Monad is your loyal sidekick.",
  "Dare to push limits—Monad transforms them into new frontiers.",
  "Your spirit defines you—Monad’s network propels you forward.",
  "Be brave in your convictions—Monad rewards boldness.",
  "Each day is a fresh start—Monad is the stage for your brilliance.",
];

export default function GeneratePage() {
  const [randomIndex, setRandomIndex] = useState(null);
  const [isMinting, setIsMinting] = useState(false);

  // Для конфетти
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRandomize = () => {
    if (images.length < 2) {
      setRandomIndex(0);
    } else {
      let newIdx;
      do {
        newIdx = Math.floor(Math.random() * images.length);
      } while (newIdx === randomIndex);
      setRandomIndex(newIdx);
    }
    // level up
    const currentCount = parseInt(localStorage.getItem("inspirationCount") || "0", 10);
    localStorage.setItem("inspirationCount", (currentCount + 1).toString());
  };

  const handleMint = async () => {
    if (randomIndex === null) {
      toast.error("Please generate an image & phrase first!");
      return;
    }
    if (!window.ethereum) {
      toast.error("No crypto wallet found! Please install MetaMask.");
      return;
    }

    setIsMinting(true);
    const selectedImage = images[randomIndex];
    const selectedPhrase = phrases[randomIndex];

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(MYNFT_ADDRESS, MYNFT_ABI, signer);

      const tx = await contract.mintNFT(selectedImage, selectedPhrase);
      await tx.wait();

      toast.success("NFT minted successfully!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      const mintedItem = {
        image: selectedImage,
        phrase: selectedPhrase,
        timestamp: Date.now(),
      };
      const oldHistory = JSON.parse(localStorage.getItem("mintHistory") || "[]");
      const newHistory = [mintedItem, ...oldHistory];
      localStorage.setItem("mintHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Mint error:", error);
      toast.error("Failed to mint NFT. Check console for details.");
    } finally {
      setIsMinting(false);
    }
  };

  const selectedImage = randomIndex !== null ? images[randomIndex] : null;
  const selectedPhrase = randomIndex !== null ? phrases[randomIndex] : null;

  const shareText = selectedPhrase
    ? `Feeling inspired by Monad today: "${selectedPhrase}". Join the positivity!`
    : "";

  return (
    <div className={styles.container}>
      <Head>
        <title>monadviber</title>
      </Head>

      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Лого, кнопка */}
      <div className={styles.logoTopLeft}>monadviber</div>
      <button
        className={styles.topRightButton}
        onClick={() => (window.location.href = "/vibes")}
      >
        Your Saved Vibes
      </button>

      {/* Контент по центру */}
      <div className={styles.contentWrapper}>
        {selectedImage ? (
          <>
            <h1 className={styles.header}>Your Monad Inspiration</h1>
            <div className={styles.imageContainer}>
              <img src={selectedImage} alt="Monad" className={styles.image} />
            </div>
            <p className={styles.phrase}>{selectedPhrase}</p>

            <div className={styles.buttonRow}>
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                  shareText
                )}&url=https://monad-random.vercel.app&hashtags=Monad`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                Share on X
              </a>
              <button
                onClick={handleMint}
                className={styles.mintButton}
                disabled={isMinting}
              >
                {isMinting ? <div className={styles.spinner}></div> : "Mint as NFT"}
              </button>
              <button onClick={handleRandomize} className={styles.tryAgainButton}>
                Try Again
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className={styles.header}>Want to discover your Monad vibe today?</h1>
            <button onClick={handleRandomize} className={styles.randomButton}>
              Click the Button
            </button>
          </>
        )}
      </div>

      {/* Футер (липкий) */}
      <footer className={styles.footer}>
        <div className={styles.footerSeparator}></div>
        <p>Join the Monad Community:</p>
        <div className={styles.footerLinks}>
          <a
            href="https://discord.com/invite/monad"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <a
            href="https://www.monad.xyz/"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
          <a
            href="https://x.com/monad_xyz"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            X (Twitter)
          </a>
        </div>
      </footer>
    </div>
  );
}