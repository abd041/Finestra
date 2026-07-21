"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  imageAlt: string;
};

/**
 * Autoplay video that respects prefers-reduced-motion
 * (poster image only when reduced motion is requested).
 */
export function HeroVideo({ src, poster, imageAlt }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(mq.matches);
      const el = videoRef.current;
      if (!el) return;
      if (mq.matches) {
        el.pause();
      } else {
        void el.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (reduceMotion) {
    return (
      <Image
        src={poster}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
