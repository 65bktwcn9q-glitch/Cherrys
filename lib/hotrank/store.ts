"use client";

import { useSyncExternalStore } from "react";
import type { FeedScope, ProfileCard } from "@/lib/hotrank/types";

type HotRankState = {
  cards: ProfileCard[];
  points: number;
  onboardingSeen: boolean;
  scope: FeedScope;
  swipes: number;
};

type Listener = () => void;

const state: HotRankState = {
  cards: [],
  points: 0,
  onboardingSeen: false,
  scope: "city",
  swipes: 0
};

const listeners = new Set<Listener>();

function setState(patch: Partial<HotRankState>) {
  Object.assign(state, patch);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHotRankStore<T>(selector: (state: HotRankState) => T) {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state));
}

export const hotRankActions = {
  setCards(cards: ProfileCard[]) {
    setState({ cards });
  },
  swipeRight() {
    setState({ points: state.points + 10, swipes: state.swipes + 1 });
  },
  swipeLeft() {
    setState({ swipes: state.swipes + 1 });
  },
  dismissOnboarding() {
    setState({ onboardingSeen: true });
  },
  setScope(scope: FeedScope) {
    setState({ scope });
  }
};
