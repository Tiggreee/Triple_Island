"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  poster: string;
  posterAlt: string;
};

export function HeroVideo({ poster, posterAlt }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className={`cb-hero-ken object-cover ${playing ? "paused" : ""}`}
      />
      <video
        ref={videoRef}
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-out motion-reduce:hidden ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/media/coco/video/hero-vertical.mp4" media="(orientation: portrait)" type="video/mp4" />
        <source src="/media/coco/video/hero-1920.mp4" media="(min-width: 1024px)" type="video/mp4" />
        <source src="/media/coco/video/hero-1280.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
