"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import styles from "../styles.module.css";

const POINTS_PER_LEVEL = 10;

export default function VibesPage() {
  const [inspirationCount, setInspirationCount] = useState(0);
  const [mintHistory, setMintHistory] = useState([]);

  useEffect(() => {
    const storedCount = localStorage.getItem("inspirationCount");
    if (storedCount) {
      setInspirationCount(parseInt(storedCount, 10));
    }

    const storedHistory = localStorage.getItem("mintHistory");
    if (storedHistory) {
      setMintHistory(JSON.parse(storedHistory));
    }
  }, []);

  const inspirationLevel = Math.floor(inspirationCount / POINTS_PER_LEVEL);
  const pointsToNextLevel = POINTS_PER_LEVEL - (inspirationCount % POINTS_PER_LEVEL);

  return (
    <div className={styles.container}>
      {/* Toast для уведомлений, если понадобится */}
      <Toaster position="top-right" />

      <div className={styles.contentWrapper}>
        <h1 className={styles.header}>Your Saved Vibes</h1>

        <div className={styles.vibesLevelBox}>
          <p className={styles.levelText}>Level: {inspirationLevel}</p>
          <p className={styles.levelText}>Total Inspirations: {inspirationCount}</p>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${
                    ((POINTS_PER_LEVEL - pointsToNextLevel) / POINTS_PER_LEVEL) * 100
                  }%`,
                }}
              />
            </div>
            <p style={{ marginTop: "5px" }}>
              {pointsToNextLevel} more point(s) to reach the next level
            </p>
          </div>
        </div>

        {mintHistory.length === 0 ? (
          <p>No minted items yet.</p>
        ) : (
          <div className={styles.vibesGrid}>
            {mintHistory.map((item, idx) => (
              <div key={idx} className={styles.vibeItem}>
                <img src={item.image} alt="Minted" className={styles.vibeImage} />
                <p className={styles.phrase}>{item.phrase}</p>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
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
    </div>
  );
}