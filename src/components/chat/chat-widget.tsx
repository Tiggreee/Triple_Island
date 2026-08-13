"use client";

import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string; time: string };

const WELCOME_TEXT =
  "Welcome to Coco B Isla. I can check real availability, quote a season or work out which " +
  "villa fits your group — no payment, no card.";

const STARTER_REPLIES = ["Check availability", "What's the rate?", "Talk to a person"];
const FOLLOWUP_REPLIES = ["Check availability", "Talk to a person"];

function timeNow() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function isWithinConciergeHours(date: Date): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: "America/Chicago",
    }).format(date),
  );
  return hour >= 7 && hour < 23;
}

function AzulejoMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 255 254" fill="currentColor" aria-hidden="true" className={className} style={style}>
      <path d="M122.518 40.7148C130.85 40.0698 134.844 45.1707 140.435 50.6709C145.632 55.7783 152.196 61.3063 149.065 69.374C143.835 82.8625 128.143 103.778 147.474 113.649C155.732 117.638 173.536 107.146 181.176 103.927C190.709 99.7765 194.194 104.943 200.541 111.134C214.229 124.541 215.906 126.98 202.806 140.407C187.819 155.767 187.854 152.418 168.854 143.699C157.272 138.385 147.08 134.629 139.257 148.376C138.77 160.151 142.25 166.218 147.429 176.559C149.609 180.916 152.23 186.16 150.181 190.979C147.532 197.215 135.382 208.704 129.39 211.616C120.423 212.809 110.398 200.69 104.738 194.03C94.609 182.124 123.806 158.253 111.302 143.912C97.241 127.782 78.5049 149.8 63.7176 149.657C57.9035 149.601 46.1896 135.869 42.2693 131.385C34.3893 123.16 54.2003 106.963 60.2664 102.475C69.2452 95.8288 93.6301 120.143 105.871 111.704C125.745 97.9993 99.6445 77.9009 101.493 62.249C101.935 58.5253 118.787 42.7733 122.518 40.7148Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M131.732 0C142.582 3.76947 152.3 15.7301 160.501 23.958L193.04 56.6152L228.056 91.5117C236.309 99.7304 247.542 109.174 252.806 119.343C256.423 126.328 252.91 136.773 247.702 142.084C229.121 161.044 210.224 179.809 191.454 198.576L159.722 230.289C153.496 236.509 142.898 248.658 135.115 252.162C126.874 255.871 117.202 252.611 110.959 246.415C104.882 240.382 98.4783 234.038 92.2694 227.812L55.3983 190.834L23.4715 159.022C17.7546 153.329 11.8204 147.66 6.4354 141.77C-0.0997882 134.626 -2.13769 125.538 2.56626 116.814C4.08844 113.982 6.14853 111.514 8.40318 109.245C28.3009 89.2252 48.3308 69.3383 68.2743 49.3604L96.3836 21.1982C104.544 13.0298 111.663 3.58688 122.742 0H131.732ZM126.205 18.9131C120.105 20.8048 106.833 35.571 101.688 40.7148L65.2811 77.1299C58.9056 83.5113 23.6266 117.18 20.5526 122.685C19.8259 123.991 19.0135 126.638 19.3338 128.125C19.8832 130.668 23.2825 134.31 25.0165 136.203C33.3314 145.275 119.197 231.616 123.028 233.341C124.545 234.025 126.388 234.292 128.042 234.436C134.262 232.699 150.084 215.35 155.189 210.253L219.695 145.729C222.408 143.013 225.378 139.97 228.079 137.308C235.965 129.533 237.407 125.742 229.367 117.607C212.045 100.083 194.602 82.7002 177.177 65.2861L148.986 37.1211C143.864 32.0029 138.777 26.842 133.547 21.833C131.515 19.8878 128.923 19.2072 126.205 18.9131Z"
      />
    </svg>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME_TEXT, time: timeNow() },
  ]);
  const [quickReplies, setQuickReplies] = useState<string[]>(STARTER_REPLIES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suppressTeaserRef = useRef(false);
  useEffect(() => {
    suppressTeaserRef.current = open || teaserDismissed;
  }, [open, teaserDismissed]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(min-width: 621px)").matches) return;
    const timer = window.setTimeout(() => {
      if (!suppressTeaserRef.current) setTeaserVisible(true);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function growTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "44px";
    el.style.height = `${Math.min(el.scrollHeight, 110)}px`;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text, time: timeNow() }];
    setMessages(nextMessages);
    setInput("");
    setQuickReplies([]);
    setError(null);
    setLoading(true);
    requestAnimationFrame(growTextarea);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; reply?: string; error?: string };

      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.error ?? "No response");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string, time: timeNow() }]);
      setQuickReplies(FOLLOWUP_REPLIES);
    } catch {
      setError("Sorry, the concierge is unavailable right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function sendQuickReply(text: string) {
    setInput(text);
    requestAnimationFrame(() => {
      const form = textareaRef.current?.closest("form");
      form?.requestSubmit();
    });
  }

  const away = !isWithinConciergeHours(new Date());

  return (
    <>
      {teaserVisible && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed right-[100px] bottom-[38px] z-[119] hidden max-w-[270px] rounded-2xl rounded-br-[4px] border border-border bg-white px-4 py-3.5 text-left text-[13.5px] leading-relaxed text-foreground shadow-[0_14px_34px_rgba(11,32,40,0.18)] sm:block"
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              setTeaserVisible(false);
              setTeaserDismissed(true);
            }}
            role="button"
            tabIndex={0}
            aria-label="Dismiss"
            className="absolute top-1.5 right-2 text-[15px] text-muted opacity-50 hover:opacity-100"
          >
            ×
          </span>
          <b className="font-semibold">Planning a stay?</b>
          <br />
          Ask me about dates, rates or which villa fits your group.
        </button>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setTeaserVisible(false);
        }}
        aria-expanded={open}
        aria-label={open ? "Close concierge chat" : "Open concierge chat"}
        className="fixed right-[26px] bottom-[26px] z-[120] flex h-14 w-14 items-center justify-center rounded-full border-0 bg-primary text-white shadow-[0_14px_34px_rgba(11,32,40,0.32)] transition-colors hover:bg-primary-dark sm:h-[62px] sm:w-[62px]"
      >
        <span className="pointer-events-none absolute -inset-1.5 rounded-full border-2 border-brand opacity-0 animate-[cw-ring-pulse_2.4s_ease-out_2]" />
        <svg
          viewBox="0 0 24 24"
          className={`h-[27px] w-[27px] transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        >
          <path
            d="M4.5 5.5h15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4.5 3.6V16.5h-1a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z"
            fill="none"
            stroke="#fff"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="11" r="1.15" fill="#fff" />
          <circle cx="12.6" cy="11" r="1.15" fill="#fff" />
          <circle cx="16.2" cy="11" r="1.15" fill="#fff" />
        </svg>
        <span
          className={`absolute text-[22px] leading-none text-white transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        >
          ×
        </span>
      </button>

      {open && (
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Coco B Concierge chat"
          className="fixed inset-x-0 bottom-0 z-[121] flex h-[88svh] w-full flex-col overflow-hidden rounded-t-[20px] border border-border bg-background shadow-[0_30px_70px_rgba(11,32,40,0.34)] sm:inset-x-auto sm:right-[26px] sm:bottom-[100px] sm:h-[min(620px,calc(100svh-140px))] sm:w-[384px] sm:rounded-[20px]"
        >
          <header
            className="relative shrink-0 overflow-hidden px-[18px] pt-[18px] pb-4 text-white"
            style={{ background: "linear-gradient(140deg, #0E5F6B, var(--color-brand) 55%, #17879A)" }}
          >
            <AzulejoMark
              className="pointer-events-none absolute -top-[46px] -right-[38px] h-[170px] w-[170px] opacity-[0.16]"
              style={{
                maskImage: "linear-gradient(210deg, transparent, #000 55%)",
                WebkitMaskImage: "linear-gradient(210deg, transparent, #000 55%)",
              }}
            />
            <div className="relative z-[2] flex items-center gap-3">
              <span className="relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white/15">
                <AzulejoMark className="h-6 w-6 text-white" />
                <span
                  className={`absolute -right-px -bottom-px h-3 w-3 rounded-full border-2 ${
                    away ? "bg-[#E4B24F]" : "bg-[#4ADE80]"
                  }`}
                  style={{ borderColor: "#107480" }}
                />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <b className="block text-sm font-semibold tracking-[1.6px] uppercase">Coco B Concierge</b>
                <span className="mt-0.5 block text-xs text-white/85">
                  {away ? "Back at 7:00 a.m. Central" : "Typically replies in a few minutes"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/15 text-[17px] hover:bg-white/25"
              >
                ×
              </button>
            </div>
          </header>

          {away && (
            <p className="mx-4 mt-2.5 rounded-xl border border-[#E8D5A8] bg-[#FDF6E7] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#5B4310]">
              <b className="font-semibold">We&apos;re offline right now.</b> A host replies from 7:00 a.m. to 11:00
              p.m. Central. Leave your question and we&apos;ll answer first thing.
            </p>
          )}

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 pt-4 pb-2.5">
            <div className="text-center text-[10px] tracking-[1.6px] text-muted/70 uppercase">Today</div>
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={
                    m.role === "user"
                      ? "max-w-[84%] animate-[cw-msg-pop_0.3s_ease-out] rounded-2xl rounded-br-[5px] bg-primary px-[15px] py-3 text-[14.5px] leading-relaxed whitespace-pre-line text-white"
                      : "max-w-[84%] animate-[cw-msg-pop_0.3s_ease-out] rounded-2xl rounded-bl-[5px] border border-border bg-white px-[15px] py-3 text-[14.5px] leading-relaxed whitespace-pre-line text-foreground"
                  }
                >
                  {m.content}
                  <span className="mt-1.5 block text-[10.5px] opacity-60">{m.time}</span>
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-[5px] border border-border bg-white px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <AzulejoMark
                    key={i}
                    className="h-[11px] w-[11px] animate-[cw-typing-dot_1.25s_ease-in-out_infinite] text-brand"
                    style={{ animationDelay: `${i * 0.16}s` }}
                  />
                ))}
              </div>
            )}
            {error && <p className="text-center text-xs text-accent">{error}</p>}
          </div>

          {quickReplies.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendQuickReply(reply)}
                  className="min-h-[38px] rounded-full border border-primary px-3.5 py-2 text-[12.5px] text-primary transition-colors hover:bg-primary/5"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex items-end gap-2.5 border-t border-border bg-white px-3.5 py-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                growTextarea();
              }}
              placeholder="Ask me anything…"
              aria-label="Message"
              className="h-11 max-h-[110px] flex-1 resize-none rounded-[14px] border border-border bg-background px-3.5 py-2.5 text-base leading-tight text-foreground focus:outline-2 focus:outline-brand"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.closest("form")?.requestSubmit();
                }
              }}
            />
            <button
              type="submit"
              disabled={loading || input.trim().length === 0}
              aria-label="Send"
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-border"
            >
              <AzulejoMark className="h-[15px] w-[15px] text-white transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </form>
          <p className="px-4 pb-3 text-center text-[10.5px] leading-relaxed text-muted/70">
            Answers use real villa details. For a formal quote we&apos;ll follow up by email.
          </p>
        </aside>
      )}
    </>
  );
}
