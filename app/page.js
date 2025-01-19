"use client"; // Если у вас App Router (Next.js 13+). Для /pages/ можно убрать.

import Head from "next/head";
import { useState, useEffect } from "react";
import { ethers } from "ethers"; // НЕ ЗАБУДЬТЕ УСТАНОВИТЬ: npm install ethers
import styles from "./styles.module.css";

// Адрес вашего контракта в Monad Devnet
const MYNFT_ADDRESS = "0x0D8e5ed789a5E717d557a592bd2b674ADa513583";

// Упрощённый ABI: mintNFT(string imageURI, string phrase)
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

// 50 изображений
const images = Array.from({ length: 50 }, (_, i) => `/images/image${i + 1}.jpg`);

// 50 мотивирующих фраз с упоминанием Monad
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

// Число очков, которое нужно набрать, чтобы получить +1 уровень
const POINTS_PER_LEVEL = 10;

export default function Home() {
  // Индекс выбранной (рандомной) картинки/фразы
  const [randomIndex, setRandomIndex] = useState(null);

  // Счётчик очков вдохновения
  const [inspirationCount, setInspirationCount] = useState(0);

  // При загрузке считываем сохранённое значение из localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem("inspirationCount");
    if (storedCount) {
      setInspirationCount(parseInt(storedCount, 10));
    }
  }, []);

  // Гарантируем, что при клике «Click the Button» всегда будет новая картинка + фраза
  const handleRandomize = () => {
    if (images.length < 2) {
      // Если вдруг всего 1 картинка, просто ставим 0
      setRandomIndex(0);
    } else {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * images.length);
      } while (newIndex === randomIndex);
      setRandomIndex(newIndex);
    }

    setInspirationCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("inspirationCount", newCount.toString());
      return newCount;
    });
  };

  // Расчёт уровня: каждые 10 очков = +1 уровень
  const inspirationLevel = Math.floor(inspirationCount / POINTS_PER_LEVEL);

  // Сформируем выбранные данные
  const selectedImage = randomIndex !== null ? images[randomIndex] : null;
  const selectedPhrase = randomIndex !== null ? phrases[randomIndex] : null;

  // Текст для шаринга
  const shareText = selectedPhrase
    ? `Feeling inspired by Monad today: "${selectedPhrase}". Join the positivity!`
    : "";

  // Функция минта NFT
  const handleMint = async () => {
    if (!selectedImage || !selectedPhrase) {
      alert("Please generate an image & phrase first!");
      return;
    }

    try {
      if (!window.ethereum) {
        alert("No crypto wallet found! Please install Metamask or another EVM wallet.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(MYNFT_ADDRESS, MYNFT_ABI, signer);
      console.log("Minting NFT with:", selectedImage, selectedPhrase);

      const tx = await contract.mintNFT(selectedImage, selectedPhrase);
      console.log("Transaction hash:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Mint error:", error);
      alert("Failed to mint NFT. Check console for details.");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Monad Randomizer</title>
        {selectedImage && (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Monad Randomizer" />
            <meta name="twitter:description" content={shareText} />
            <meta
              name="twitter:image"
              content={`https://monad-random.vercel.app${selectedImage}`}
            />
            <meta property="og:title" content="Monad Randomizer" />
            <meta property="og:description" content={shareText} />
            <meta
              property="og:image"
              content={`https://monad-random.vercel.app${selectedImage}`}
            />
          </>
        )}
      </Head>

      {selectedImage ? (
        <>
          {/* Отображаем счётчик и уровень только здесь */}
          <div className={styles.inspirationStats}>
            <p>
              <strong>Inspirations:</strong> {inspirationCount}
            </p>
            <p>
              <strong>Level:</strong> {inspirationLevel}
            </p>
          </div>

          <h1 className={styles.header}>Your Monad Inspiration:</h1>
          <div className={styles.imageContainer}>
            <img src={selectedImage} alt="Monad" className={styles.image} />
          </div>
          <p className={styles.phrase}>{selectedPhrase}</p>

          {/* Горизонтальный ряд кнопок */}
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
            >
              Mint as NFT
            </button>
            <button onClick={handleRandomize} className={styles.tryAgainButton}>
              Try Again
            </button>
          </div>

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
        </>
      ) : (
        <>
          <h1 className={styles.header}>
            Want to discover your Monad vibe for today?
          </h1>
          <button onClick={handleRandomize} className={styles.randomButton}>
            Click the Button
          </button>
          <p className={styles.footer}>
            Created with love by Annad for the Monad community ❤️
          </p>
        </>
      )}
    </div>
  );
}