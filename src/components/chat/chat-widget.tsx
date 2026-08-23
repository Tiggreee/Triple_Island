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
  "culinary, fitness and corporate. Only use these facts; never invent villa names, prices or " +
  "availability. If you do not know something, say so and point the guest to the inquiry form " +
  "at /solicitud. Keep replies short and helpful. To book or check availability, guide the " +
  "guest to /solicitud. Never use markdown tables, pipes (|) or headings — present options as " +
  "short plain lines or simple bullets, one per line.";

const WELCOME: ChatMessage = {
  role: "assistant",
  content: "Hi! I'm the Coco B Isla concierge. Ask me about our villas, retreats or planning a stay.",
};

// UX-023: limpia artefactos de markdown para no imprimir sintaxis cruda al usuario.
function formatReply(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "\u2022 ")
    .replace(/^\s*[-:|\s]{3,}\s*$/gm, "")
    .replace(/^\s*\|(.*)\|\s*$/gm, (_, row: string) => row.split("|").map((c) => c.trim()).filter(Boolean).join(" · "))
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// UX-023/026: detecta villas mencionadas para mostrar card + salto al stepper.
function villasInText(text: string): VillaData[] {
  const lower = text.toLowerCase();
  return REAL_VILLAS.filter((v) =>
    v.slug === "coco" ? lower.includes("casa coco") : new RegExp(`\\b${v.slug}\\b`).test(lower),
  );
}

const QUICK_REPLIES = ["Check availability", "What's included?", "Where are you?", "Plan a stay"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserGone, setTeaserGone] = useState(false);
  const [online, setOnline] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // UX-003: teaser aparece 2.6s despues del FAB, solo en pantallas anchas.
  useEffect(() => {
    if (window.innerWidth <= 620) return;
    const t = window.setTimeout(() => setShowTeaser(true), 2600);
    return () => window.clearTimeout(t);
  }, []);

  // UX-022: punto de estado verde en horario (7-23 Central), ambar fuera.
  useEffect(() => {
    const h = Number(
      new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", hour: "numeric", hour12: false }).format(new Date()),
    );
    // Se deriva tras montar (client-only) para no romper la hidratacion SSR.
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
        className={`cb-chat-fab fixed bottom-5 right-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40 md:h-[62px] md:w-[62px] ${
          teaserVisible || open ? "" : "cb-fab-bounce"
        }`}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-[121] flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          <header className="flex items-center gap-3 border-b border-border bg-[linear-gradient(140deg,#0e5f6b,#107480,#17879a)] px-4 py-3 text-white">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Azulejo tone="white" size={20} />
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0e5f6b] ${online ? "bg-green-400" : "bg-amber-400"}`} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Coco B Concierge</p>
              <p className="text-[11px] text-white/75">{online ? "Typically replies in a few minutes" : "Back at 7:00 a.m. Central"}</p>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => {
              const villas = m.role === "assistant" ? villasInText(m.content) : [];
              return (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex flex-col items-start gap-1.5"}>
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[84%] whitespace-pre-line rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-white"
                        : "max-w-[84%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-background px-3.5 py-2 text-sm text-foreground"
                    }
                  >
                    {m.role === "assistant" ? formatReply(m.content) : m.content}
                  </p>
                  {villas.map((v) => (
                    <div key={v.slug} className="w-[84%] overflow-hidden rounded-xl border border-border bg-surface">
                      <div className="flex gap-3 p-2.5">
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                          <Image src={v.photo} alt={v.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground">{v.name}</p>
                          <p className="mt-0.5 text-xs text-muted">From ${v.priceFrom.toLocaleString()} · {v.suites} suites</p>
                          <Link
                            href={`/solicitud?villa=${v.slug}`}
                            onClick={() => setOpen(false)}
                            className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[1px] text-primary hover:underline"
                          >
                            See dates &amp; inquire <span aria-hidden>→</span>
                          </Link>
                        </div>
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

          {!loading && (
            <div className="flex flex-wrap gap-1.5 px-3 pt-2">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr}
                  type="button"
                  onClick={() => void send(qr)}
                  className="rounded-full border border-primary/40 px-3 py-1 text-[11px] font-medium text-primary transition hover:bg-primary/5"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the concierge…"
              aria-label="Message"
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || input.trim().length === 0}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
