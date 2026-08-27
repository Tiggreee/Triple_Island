"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FloatingBar() {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const heroHeight = document.getElementById("site-hero")?.offsetHeight ?? window.innerHeight;
      const past = y > heroHeight * 0.75;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 780;
      setVisible(past && !nearBottom);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.dataset.floatbar = visible ? "1" : "0";
    return () => {
      delete document.body.dataset.floatbar;
    };
  }, [visible]);

  useEffect(() => {
    const target = document.body;
    const sync = () => setChatOpen(target.dataset.chatOpen === "1");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(target, { attributeFilter: ["data-chat-open"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{ bottom: chatOpen ? "74px" : "0" }}
      className={`fixed inset-x-0 z-[55] transition-all duration-500 ease-[cubic-bezier(.2,.9,.3,1)] motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 border-t border-white/50 bg-white/70 px-6 py-4 [backdrop-filter:blur(22px)_saturate(1.25)] sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">Four private villas · 3 to 27 suites</p>
          <p className="text-xs text-muted">From $1,665 USD / night + 21% tax</p>
        </div>
        <Link href="/villas">
          <Button variant="primary" icon>
            Explore the villas
          </Button>
        </Link>
      </div>
    </div>
  );
}
