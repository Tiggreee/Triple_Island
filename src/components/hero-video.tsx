"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/media/coco/video/hero-poster.jpg"
      aria-hidden="true"
    >
      <source src="/media/coco/video/hero-vertical.mp4" media="(orientation: portrait)" type="video/mp4" />
      <source src="/media/coco/video/hero-1920.mp4" media="(min-width: 1024px)" type="video/mp4" />
      <source src="/media/coco/video/hero-1280.mp4" type="video/mp4" />
    </video>
  );
}
