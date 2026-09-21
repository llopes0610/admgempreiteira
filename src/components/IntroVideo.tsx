"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    const alreadyViewed = sessionStorage.getItem("admg-intro-viewed");

    if (alreadyViewed) {
      return;
    }

    setVisible(true);

    // Segurança caso o evento onEnded não seja disparado por algum motivo.
    // O vídeo possui aproximadamente 8 segundos.
    const fallbackTimer = setTimeout(() => {
      closeIntro();
    }, 10000);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  const closeIntro = () => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;
    setFadeOut(true);

    setTimeout(() => {
      sessionStorage.setItem("admg-intro-viewed", "true");
      setVisible(false);
    }, 700);
  };

  const handleVideoEnd = () => {
    closeIntro();
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black transition-opacity duration-700 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
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
        {/* MOBILE */}
        <source
          src="/videos/intro-mobile.mp4"
          media="(max-width: 768px)"
          type="video/mp4"
        />

        {/* DESKTOP / TABLET */}
        <source
          src="/videos/intro.mp4"
          type="video/mp4"
        />

        Seu navegador não suporta reprodução de vídeo.
      </video>

      <button
        type="button"
        onClick={closeIntro}
        aria-label="Pular introdução"
        className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-black/70 sm:right-5 sm:top-5 sm:text-xs md:right-8 md:top-8"
      >
        Pular intro
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent md:h-32" />
    </div>
  );
}