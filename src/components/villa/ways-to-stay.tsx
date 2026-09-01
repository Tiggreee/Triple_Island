"use client";

import Image from "next/image";
import { useBookingModal } from "@/components/booking/booking-modal";

type Way = {
  key: string;
  photo: string;
  tag: string;
  title: string;
  body: string;
  who: string;
  cta: string;
};

const WAYS: Way[] = [
  {
    key: "whole-villa",
    photo: "/media/coco/villas/coco-02.webp",
    tag: "The usual way",
    title: "The whole villa",
    body: "You book an entire house — every suite, the pool, the kitchen and the staff are yours alone. Nobody else is on the property.",
    who: "families and groups of 8 to 27 · 5–7 night minimum in peak season",
    cta: "See the four houses and their rates",
  },
  {
    key: "retreats",
    photo: "/media/coco/villas/cielo-05.webp",
    tag: "Coco B Wellness",
    title: "Hosted retreats",
    body: "The same houses, run as a programme: yoga, culinary, fitness or corporate. Studio, instructors, menus and schedule are arranged for you.",
    who: "retreat leaders and teams · dates built around your programme",
    cta: "Tell us about your retreat",
  },
  {
    key: "by-the-room",
    photo: "/media/coco/villas/encantada-04.webp",
    tag: "Coco & Lola",
    title: "By the room",
    body: "When a house is not booked whole, single suites open as a small oceanfront hotel. Availability appears inside 30 days of arrival.",
    who: "couples and pairs travelling on short notice",
    cta: "Ask about last-minute suites",
  },
  {
    key: "weddings",
    photo: "/media/coco/villas/lola-06.webp",
    tag: "Celebrations",
    title: "Weddings & events",
    body: "Ceremonies on the sand and dinners under the palapa, with the villa as the venue and the guest rooms in the same place.",
    who: "weddings, anniversaries and milestone gatherings",
    cta: "Start a celebration inquiry",
  },
];

export function WaysToStay({ defaultSlug }: { defaultSlug: string }) {
  const { open: onInquire, modal } = useBookingModal(defaultSlug);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-3 min-[761px]:grid-cols-2 min-[761px]:gap-4">
        {WAYS.map((w) => (
          <div
            key={w.key}
            className="group flex flex-col gap-3 rounded-[14px] border border-border bg-surface px-5 py-[18px] transition hover:border-[#cfc7b9] hover:shadow-[0_10px_30px_rgba(11,32,40,0.06)] min-[761px]:px-6.5 min-[761px]:py-5.5"
          >
            <div className="flex items-center gap-4">
              <span className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border border-border shadow-[0_6px_18px_rgba(11,32,40,0.1)] min-[761px]:h-[74px] min-[761px]:w-[74px]">
                <Image
                  src={w.photo}
                  alt=""
                  fill
                  sizes="74px"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.08]"
                />
              </span>
              <div className="min-w-0 flex-1">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[2.24px] text-primary">{w.tag}</span>
                <h3 className="text-[19px] font-light uppercase tracking-[1.85px] text-foreground min-[761px]:text-[21px]">{w.title}</h3>
              </div>
            </div>
            <p className="text-[14.5px] leading-[1.65] text-muted">{w.body}</p>
            <p className="text-[13px] text-[#6e665b]">
              <b className="font-semibold text-[#4a4a4a]">Best for</b> {w.who}
            </p>
            <button
              type="button"
              onClick={w.key === "whole-villa" ? () => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }) : onInquire}
              className="mt-auto w-fit pt-1.5 text-left text-[12.5px] text-primary underline decoration-[#bbd3e0] decoration-1 underline-offset-[3px] transition hover:decoration-primary"
            >
              {w.cta}
            </button>
          </div>
        ))}
      </div>
      {modal}
    </>
  );
}
