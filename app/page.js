"use client";

import Head from "next/head";
import { useState } from "react";

export default function Home() {
    const images = Array.from({ length: 20 }, (_, i) => `/images/image${i + 1}.jpg`);
    const phrases = [
        "You are a leader of ideas today!",
        "A day for peace and reflection.",
        "Your potential is at its peak today!",
        "Today, you inspire everyone around you.",
        "Be yourself and brighten the world!",
        "Every step today leads to success.",
        "Perfect day for new ideas!",
        "You are a shining star in this world.",
        "Your positivity is contagious today!",
        "Stay confident: you're on the right path.",
        "Today, your creativity knows no bounds.",
        "You are unstoppable today!",
        "A great day to achieve your dreams.",
        "Share your wisdom with the world today.",
        "Focus and conquer challenges today.",
        "You are the architect of your success.",
        "Your energy today is truly magnetic.",
        "Lead by example and inspire others.",
        "A day for bold decisions and actions.",
        "Celebrate your uniqueness today!",
    ];

    const [randomIndex, setRandomIndex] = useState(null);

    const handleRandomize = () => {
        const index = Math.floor(Math.random() * images.length);
        setRandomIndex(index);
    };

    const selectedImage = randomIndex !== null ? images[randomIndex] : null;
    const selectedPhrase = randomIndex !== null ? phrases[randomIndex] : null;

    const shareText = selectedPhrase
        ? `Today, I am in Monad: "${selectedPhrase}".`
        : "";

    return (
        <div
            style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#6A0DAD", // Фиолетовый фон
                color: "#FFFFFF",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Head>
                <title>Monad Randomizer</title>
                {selectedImage && (
                    <>
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content="Monad Randomizer" />
                        <meta name="twitter:description" content={shareText} />
                        <meta name="twitter:image" content={`https://monad-random.vercel.app${selectedImage}`} />
                        <meta property="og:title" content="Monad Randomizer" />
                        <meta property="og:description" content={shareText} />
                        <meta property="og:image" content={`https://monad-random.vercel.app${selectedImage}`} />
                    </>
                )}
            </Head>
            {selectedImage ? (
                <>
                    <h1
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "#FFD700", // Золотой текст
                            animation: "fadeIn 1s ease-in-out",
                        }}
                    >
                        Your day in Monad today:
                    </h1>
                    <img
                        src={selectedImage}
                        alt="Monad"
                        style={{
                            maxWidth: "300px",
                            borderRadius: "10px",
                            marginTop: "20px",
                            animation: "zoomIn 1.2s ease-in-out",
                        }}
                    />
                    <p
                        style={{
                            fontSize: "36px", // Увеличенный шрифт
                            fontFamily: "'Roboto Slab', serif", // Приятный шрифт
                            color: "#FFD700", // Золотой текст
                            fontWeight: "bold",
                            marginTop: "10px",
                            lineHeight: "1.5",
                            animation: "fadeInUp 1.5s ease-in-out",
                        }}
                    >
                        {selectedPhrase}
                    </p>
                    <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                            shareText
                        )}&url=https://monad-random.vercel.app&hashtags=Monad`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            marginTop: "20px",
                            backgroundColor: "#FFD700",
                            color: "#6A0DAD", // Фиолетовый текст
                            borderRadius: "5px",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "16px",
                            transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                        Share on X
                    </a>
                </>
            ) : (
                <>
                    <h1
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "#FFD700", // Золотой текст
                            animation: "fadeIn 1s ease-in-out",
                        }}
                    >
                        Who are you today in Monad?
                    </h1>
                    <button
                        onClick={handleRandomize}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#FFD700",
                            color: "#6A0DAD",
                            borderRadius: "5px",
                            border: "none",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginTop: "20px",
                            transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                        Click Here
                    </button>
                    <p
                        style={{
                            marginTop: "50px",
                            fontSize: "16px",
                            fontFamily: "'Roboto', sans-serif",
                            color: "#FFD700",
                        }}
                    >
                        Created by Annad with love for the Monad community
                    </p>
                </>
            )}
            <style jsx global>{`
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                @keyframes zoomIn {
                    0% { transform: scale(0.5); }
                    100% { transform: scale(1); }
                }
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}