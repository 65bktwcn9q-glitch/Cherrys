"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { demoData } from "@/lib/hotrank/demo-data";
import type { ProfileCard } from "@/lib/hotrank/types";
import { hotRankActions, useHotRankStore } from "@/lib/hotrank/store";
import { initTelegramApp } from "@/lib/hotrank/telegram";

const SWIPE_THRESHOLD = 110;

export function HotRankApp() {
  const points = useHotRankStore((s) => s.points);
  const onboardingSeen = useHotRankStore((s) => s.onboardingSeen);
  const scope = useHotRankStore((s) => s.scope);
  const [deck, setDeck] = useState<ProfileCard[]>([]);
  const [scorePulse, setScorePulse] = useState(false);

  useEffect(() => {
    initTelegramApp();
    hotRankActions.setCards(demoData);
    setDeck(demoData);
  }, []);

  const active = deck[0];
  const queued = useMemo(() => deck.slice(1, 3), [deck]);

  const onSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      hotRankActions.swipeRight();
      setScorePulse(true);
      setTimeout(() => setScorePulse(false), 280);
    } else {
      hotRankActions.swipeLeft();
    }

    setDeck((prev) => {
      const rest = prev.slice(1);
      const rotated = prev[0] ? [...rest, prev[0]] : rest;
      return rotated;
    });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#050505] text-white">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#050505]/70 px-4 py-4 backdrop-blur-lg">
        <div>
          <p className="text-xl font-extrabold tracking-tighter">NIM</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">HotRank Edition</p>
        </div>

        <div
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
            scorePulse ? "scale-105 border-green-400" : "border-white/20"
          }`}
        >
          {points} pts
        </div>
      </header>

      <section className="relative flex-1 overflow-hidden px-3 pb-24 pt-3">
        <div className="mb-3 flex gap-2 text-xs">
          {(["city", "country", "global"] as const).map((item) => (
            <button
              key={item}
              onClick={() => hotRankActions.setScope(item)}
              className={`rounded-full border px-3 py-1 uppercase tracking-wide active:scale-95 ${
                scope === item ? "border-white bg-white text-black" : "border-white/20 bg-[#111111]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative h-[72vh]">
          {queued.reverse().map((card, i) => (
            <CardShell key={`${card.id}-${i}`} card={card} stacked index={i} />
          ))}
          {active ? <SwipeCard card={active} onSwipe={onSwipe} /> : null}
        </div>
      </section>

      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 justify-around border-t border-white/10 bg-[#050505]/85 p-3 backdrop-blur-lg">
        {[HomeIcon, SearchIcon, MessageIcon, UserIcon].map((Icon, i) => (
          <button key={i} className="rounded-xl p-2 text-zinc-300 transition hover:text-white active:scale-95">
            <Icon />
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {!onboardingSeen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          >
            <div className="w-full rounded-2xl border border-white/20 bg-[#111111] p-6 text-center">
              <div className="mb-3 flex justify-center gap-6 text-3xl">
                <motion.span animate={{ x: [-5, 0, -5] }} transition={{ duration: 1.1, repeat: Infinity }}>
                  👈
                </motion.span>
                <motion.span animate={{ x: [5, 0, 5] }} transition={{ duration: 1.1, repeat: Infinity }}>
                  👉
                </motion.span>
              </div>
              <h2 className="text-xl font-bold">Swipe to Rate</h2>
              <p className="mt-1 text-sm text-zinc-500">Swipe right to like (+10). Swipe left to skip profile.</p>
              <button
                onClick={hotRankActions.dismissOnboarding}
                className="mt-5 w-full rounded-xl border border-white bg-white py-3 text-sm font-semibold text-black active:scale-95"
              >
                Got it
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CardShell({ card, stacked = false, index = 0 }: { card: ProfileCard; stacked?: boolean; index?: number }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl border border-white/10 bg-[#111111]"
      style={{ transform: stacked ? `translateY(${(index + 1) * 8}px) scale(${1 - (index + 1) * 0.03})` : undefined }}
    >
      <CardContent card={card} />
    </div>
  );
}

function SwipeCard({ card, onSwipe }: { card: ProfileCard; onSwipe: (direction: "left" | "right") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-12, 12]);

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl border border-white/20 bg-[#111111] shadow-2xl"
      style={{ x, rotate }}
      drag="x"
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_THRESHOLD) {
          onSwipe("right");
          x.set(0);
        } else if (info.offset.x < -SWIPE_THRESHOLD) {
          onSwipe("left");
          x.set(0);
        }
      }}
      transition={{ type: "tween", ease: [0.23, 1, 0.32, 1], duration: 0.35 }}
    >
      <CardContent card={card} />
    </motion.div>
  );
}

function CardContent({ card }: { card: ProfileCard }) {
  const media = card.media[0];

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl">
      {card.isSponsored ? (
        <span className="absolute left-3 top-3 z-20 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
          Sponsored
        </span>
      ) : null}

      {media.type === "video" ? (
        <video
          src={media.url}
          className="h-[78%] w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onClick={(e) => (e.currentTarget.controls = true)}
        />
      ) : (
        <img src={media.url} alt={card.username ?? "Sponsored"} className="h-[78%] w-full object-cover" />
      )}

      <div className="flex flex-1 flex-col justify-between bg-gradient-to-b from-transparent to-black/60 p-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {!card.isSponsored ? <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" /> : null}
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {card.city}, {card.country}
            </p>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tighter">{card.isSponsored ? "Elite Boost" : card.username}</h3>
          <p className="mt-1 text-sm text-zinc-400">{card.bio}</p>
        </div>

        {card.isSponsored ? (
          <a
            href={card.adLink}
            target="_blank"
            className="mt-4 rounded-xl bg-white py-3 text-center text-sm font-bold text-black active:scale-95"
          >
            {card.adCta ?? "Learn More"}
          </a>
        ) : (
          <p className="mt-3 text-xs uppercase tracking-wide text-zinc-500">Rank {card.rankPoints} · {card.age} y.o.</p>
        )}
      </div>
    </article>
  );
}

function HomeIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" strokeWidth="1.5"/></svg>;
}
function SearchIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7" strokeWidth="1.5"/><path d="m20 20-3.5-3.5" strokeWidth="1.5"/></svg>;
}
function MessageIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16v11H7l-3 3V5Z" strokeWidth="1.5"/></svg>;
}
function UserIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4" strokeWidth="1.5"/><path d="M5 20c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" strokeWidth="1.5"/></svg>;
}
