"use client";

import Head from "next/head";
import { useState } from "react";
import styles from "./styles.module.css";

export default function Home() {
  const images = Array.from({ length: 50 }, (_, i) => `/images/image${i + 1}.jpg`);
  const phrases = [
    "You are a beacon of light today!",
    "Radiate positivity and joy!",
    "Embrace your unique strength.",
    "Today is full of opportunities.",
    "Share your wisdom with the world.",
    "A perfect day for great beginnings.",
    "Your creativity shines brightly.",
    "Inspire those around you!",
    "Celebrate every small victory today.",
    "You are a source of happiness.",
    "Be kind to yourself and others.",
    "Spread love and kindness.",
    "Take a bold step towards your dreams.",
    "Your energy is magnetic today.",
    "You are unstoppable!",
    "Find beauty in the simple things.",
    "Success is on your horizon.",
    "Cherish the present moment.",
    "Lead with courage and confidence.",
    "Your heart is your greatest guide.",
    "A smile can change everything.",
    "You are stronger than you think.",
    "Trust in your abilities.",
    "You have the power to make a difference.",
    "Your kindness inspires others.",
    "Believe in the magic of today.",
    "Today is yours to conquer.",
    "Greatness is within your reach.",
    "Be fearless in your pursuit of joy.",
    "You are making a positive impact.",
    "Take a moment to breathe deeply.",
    "Your presence lights up the room.",
    "Focus on what truly matters.",
    "Embrace challenges with grace.",
    "Every step forward counts.",
    "You are full of infinite potential.",
    "Let your soul shine.",
    "Gratitude opens doors to abundance.",
    "Your dreams are worth chasing.",
    "Celebrate your progress today.",
    "Keep moving forward with purpose.",
    "You are loved and appreciated.",
    "Let positivity guide your day.",
    "Today is a gift; unwrap it fully.",
    "Shine bright like the star you are.",
    "You are writing your success story.",
    "Your compassion is your superpower.",
    "Smile; the world needs it.",
    "You are exactly where you need to be.",
    "Share joy wherever you go.",
  ];

  const [randomIndex, setRandomIndex] = useState(null);

  const handleRandomize = () => {
    const index = Math.floor(Math.random() * images.length);
    setRandomIndex(index);
  };

  const selectedImage = randomIndex !== null ? images[randomIndex] : null;
  const selectedPhrase = randomIndex !== null ? phrases[randomIndex] : null;

  const shareText = selectedPhrase
    ? `Feeling inspired in Monad today: "${selectedPhrase}". Join the positive vibes with @Anna272493 and @monad_xyz!`
    : "";

  return (
    <div className={styles.container}>
      <Head>
        <title>Monad Randomizer</title>
        {selectedImage && (
          <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Monad Randomizer" />
            <meta name="twitter:description" content={shareText} />
            <meta name="twitter:image" content={`https://monad-random.vercel.app${selectedImage}`} />
            <meta name="og:title" content="Monad Randomizer" />
            <meta name="og:description" content={shareText} />
            <meta name="og:image" content={`https://monad-random.vercel.app${selectedImage}`} />
          </>
        )}
      </Head>
      {selectedImage ? (
        <>
          <h1 className={styles.header}>Your Monad Inspiration:</h1>
          <div className={styles.imageContainer}>
            <img src={selectedImage} alt="Monad" className={styles.image} />
          </div>
          <p className={styles.phrase}>{selectedPhrase}</p>
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
          <button onClick={handleRandomize} className={styles.tryAgainButton}>
            Try Again
          </button>
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