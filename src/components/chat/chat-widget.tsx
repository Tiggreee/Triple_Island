"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Azulejo } from "@/components/ui/azulejo";
import { REAL_VILLAS, type VillaData } from "@/lib/villas-data";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };

const SYSTEM_PROMPT =
  "You are the Coco B Isla concierge, a warm and concise assistant for a collection of " +
  "luxury villas, wellness retreats and a pop-up boutique hotel in Isla Mujeres, Mexico, on " +
  "the calm western shore, a short ferry ride from Cancún. The villa collection has exactly " +
  "four villas: Coco, Lola, Encantada and Cielo. Retreats cover weddings, yoga, wellness, " +
  "culinary, fitness and corporate. Only use the facts you're given; never invent villa names " +
  "or prices. When a guest mentions a group size, name the specific villa that fits it — " +
  "capacity is a known fact, not a guess. Calendar/date availability is not something you " +
  "know; for that, point the guest to the inquiry form at /solicitud. Keep replies short and " +
  "helpful. Never use markdown tables, pipes (|) or headings — present options as short plain " +
  "lines or simple bullets, one per line.";

const WELCOME: ChatMessage = {
  role: "assistant",
  content: "Hi! I'm the Coco B Isla concierge. Ask me about our villas, retreats or planning a stay.",
};

function formatReply(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "\u2022 ")
    .replace(/^\s*[-:|\s]{3,}\s*$/gm, "")
    .replace(/^\s*\|(.*)\|\s*$/gm, (_, row: string) => row.split("|").map((c) => c.trim()).filter(Boolean).join(" · "))
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function villasInText(text: string): VillaData[] {
  const lower = text.toLowerCase().replace(/\s+/g, " ");
  return REAL_VILLAS.filter((v) =>
    v.slug === "coco" ? lower.includes("casa coco") : new RegExp(`\\b${v.slug}\\b`).test(lower),
  );
}

function guestsInConversation(messages: ChatMessage[]): number | undefined {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role !== "user") continue;
    const content = messages[i].content.replace(/\s+/g, " ");
    const match = content.match(/\b(\d{1,2})\s*(?:guests?|people|pax|of us)\b/i);
    const n = match ? Number(match[1]) : NaN;
    if (n >= 1 && n <= 28) return n;
  }
  return undefined;
}

const QUICK_REPLY_POOL = [
  "Check availability",
  "What's included?",
  "Where are you?",
  "Plan a stay",
  "What's the minimum stay?",
  "Do you host retreats?",
  "How does payment work?",
];
const QUICK_REPLIES_VISIBLE = 4;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserGone, setTeaserGone] = useState(false);
  const [online, setOnline] = useState(true);
  const [usedQuickReplies, setUsedQuickReplies] = useState<string[]>([]);
  const [nearFooter, setNearFooter] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const visibleQuickReplies = QUICK_REPLY_POOL.filter((qr) => !usedQuickReplies.includes(qr)).slice(0, QUICK_REPLIES_VISIBLE);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const el = composerRef.current;
    if (!el) return;
    el.style.height = "44px";
    el.style.height = `${Math.min(110, Math.max(44, el.scrollHeight))}px`;
  }, [input]);

  useEffect(() => {
    document.body.dataset.chatOpen = open ? "1" : "0";
    return () => {
      delete document.body.dataset.chatOpen;
    };
  }, [open]);

  // The FAB is fixed to the viewport, so near the end of the page it sits on
  // top of the footer's own text (same 780px clearance FloatingBar uses).
  useEffect(() => {
    function onScroll() {
      const nearBottom = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 780;
      setNearFooter(nearBottom);
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
    if (window.innerWidth <= 620) return;
    const t = window.setTimeout(() => setShowTeaser(true), 2600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = Number(
      new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", hour: "numeric", hour12: false }).format(new Date()),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnline(h >= 7 && h < 23);
  }, []);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = (await response.json()) as { ok?: boolean; reply?: string; error?: string };

      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.error ?? "No response");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string }]);
    } catch {
      setError("The concierge is unavailable right now — leave your question and we'll reply within 24 hours.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  const teaserVisible = showTeaser && !teaserGone && !open;

  return (
    <>
      {teaserVisible && (
        <div className="cb-chat-teaser fixed bottom-[88px] right-5 z-[119] flex max-[620px]:hidden max-w-[260px] items-start gap-2 rounded-2xl rounded-br-[4px] border border-border bg-surface px-4 py-3 shadow-lg animate-[cw-msg-pop_.35s_ease-out]">
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setTeaserGone(true);
            }}
            className="text-left"
          >
            <span className="block text-sm font-semibold text-foreground">Planning a stay?</span>
            <span className="mt-0.5 block text-xs leading-5 text-muted">
              Ask me about dates, rates or which villa fits your group.
            </span>
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setTeaserGone(true)}
            className="-mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-background hover:text-foreground"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setTeaserGone(true);
        }}
        aria-expanded={open}
        aria-label={open ? "Close concierge chat" : "Open concierge chat"}
        aria-hidden={nearFooter && !open}
        className={`${open ? "" : "cb-chat-fab"} fixed bottom-5 right-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40 min-[621px]:h-[62px] min-[621px]:w-[62px] ${
          nearFooter && !open ? "pointer-events-none translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        } ${teaserVisible || open ? "" : "cb-fab-bounce"}`}
      >
        {!open && (
          <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#5bcaeb] animate-[cw-ring-pulse_1.8s_ease-out_2]" />
        )}
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {!open && showTeaser && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-surface bg-brand" />
        )}
      </button>

      {open && (
        <div className="fixed inset-x-0 bottom-0 z-[121] flex h-[88svh] w-full flex-col overflow-hidden rounded-t-[18px] border border-border bg-surface shadow-2xl min-[621px]:inset-x-auto min-[621px]:bottom-24 min-[621px]:right-5 min-[621px]:h-[min(620px,calc(100svh-140px))] min-[621px]:w-[min(92vw,384px)] min-[621px]:rounded-[20px]">
          <div className="flex justify-center pt-2.5 pb-1 min-[621px]:hidden" aria-hidden="true">
            <span className="h-[5px] w-11 rounded-[3px] bg-[#d8d0c4]" />
          </div>
          <header className="relative flex items-center gap-3 overflow-hidden border-b border-border bg-[linear-gradient(140deg,#0e5f6b,#107480,#17879a)] px-4 py-3 text-white">
            <Azulejo
              tone="white"
              size={140}
              className="pointer-events-none absolute -right-6 -top-10 opacity-[0.16] [mask-image:linear-gradient(135deg,#000_35%,transparent_75%)]"
            />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Azulejo tone="white" size={20} />
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0e5f6b] ${online ? "bg-green-400" : "bg-amber-400"}`} />
            </span>
            <div className="flex-1 leading-tight">
              <p className="text-sm font-semibold">Coco B Concierge</p>
              <p className="text-[11px] text-white/75">{online ? "Typically replies in a few minutes" : "Back at 7:00 a.m. Central"}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close concierge chat"
              className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => {
              const villas = m.role === "assistant" ? villasInText(m.content) : [];
              const guestsForHandoff = villas.length > 0 ? guestsInConversation(messages.slice(0, i + 1)) : undefined;
              return (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex flex-col items-start gap-1.5"}>
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[88%] min-[621px]:max-w-[84%] animate-[cw-msg-pop_.3s_ease-out] whitespace-pre-line rounded-2xl rounded-br-[5px] bg-primary px-3.5 py-2 text-sm text-white"
                        : "max-w-[88%] min-[621px]:max-w-[84%] animate-[cw-msg-pop_.3s_ease-out] whitespace-pre-line rounded-2xl rounded-bl-[5px] border border-border bg-background px-3.5 py-2 text-sm text-foreground"
                    }
                  >
                    {m.role === "assistant" ? formatReply(m.content) : m.content}
                  </p>
                  {villas.map((v) => (
                    <div key={v.slug} className="w-[84%] overflow-hidden rounded-xl border border-border bg-surface">
                      <div className="relative h-[110px] w-full">
                        <Image src={v.photo} alt={v.name} fill sizes="260px" className="object-cover" />
                      </div>
                      <div className="space-y-2 p-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{v.name}</p>
                          <p className="mt-0.5 text-xs text-muted">From ${v.priceFrom.toLocaleString()} · {v.suites} suites</p>
                        </div>
                        <Link
                          href={`/solicitud?villa=${v.slug}${guestsForHandoff ? `&guests=${guestsForHandoff}` : ""}`}
                          onClick={() => setOpen(false)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[1px] text-white transition hover:opacity-90"
                        >
                          See dates &amp; inquire <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <span className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-background px-3.5 py-2.5" aria-label="Concierge is typing">
                  {[0, 160, 320].map((delay) => (
                    <span key={delay} className="cw-typing inline-flex" style={{ animationDelay: `${delay}ms` }}>
                      <Azulejo tone="brand" size={10} />
                    </span>
                  ))}
                </span>
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-border bg-background px-3.5 py-3 text-center text-xs">
                <p className="text-muted">{error}</p>
                <Link
                  href="/solicitud"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[1px] text-white transition hover:opacity-90"
                >
                  Leave your question <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          {!loading && visibleQuickReplies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5 px-3 pt-2">
              {visibleQuickReplies.map((qr) => (
                <button
                  key={qr}
                  type="button"
                  onClick={() => {
                    setUsedQuickReplies((prev) => [...prev, qr]);
                    void send(qr);
                  }}
                  className="flex min-h-[38px] items-center rounded-full border border-primary/40 px-3.5 text-[11px] font-medium text-primary transition hover:bg-primary/5"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-2 border-t border-border px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={composerRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                placeholder="Ask the concierge…"
                aria-label="Message"
                className="h-11 max-h-[110px] min-h-11 w-full resize-none rounded-2xl border border-border bg-background px-4 py-2.5 text-base leading-normal text-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || input.trim().length === 0}
                aria-label="Send message"
                className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Azulejo tone="white" size={16} className="transition-transform duration-[450ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:rotate-90" />
              </button>
            </div>
            <p className="px-1 text-center text-[11px] leading-4 text-muted">
              Answers use live villa data. For a formal quote we&apos;ll reply by email within 24 hours.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
