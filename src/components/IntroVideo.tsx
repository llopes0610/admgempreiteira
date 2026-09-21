"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const alreadyViewed = sessionStorage.getItem("admg-intro-viewed");

    if (alreadyViewed) {
      return;
    }

    setVisible(true);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 8400);

    const closeTimer = setTimeout(() => {
      sessionStorage.setItem("admg-intro-viewed", "true");
      setVisible(false);
    }, 9000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const closeIntro = () => {
    setFadeOut(true);

    setTimeout(() => {
      sessionStorage.setItem("admg-intro-viewed", "true");
      setVisible(false);
    }, 600);
  };

  const handleVideoEnd = () => {
    closeIntro();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="h-full w-full object-cover"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={closeIntro}
        className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-black/70 md:right-8 md:top-8"
      >
        Pular intro
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}