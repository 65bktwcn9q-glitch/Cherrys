"use client";

import { useEffect } from "react";

export function AdImpressionTracker({
  adId,
  placementKey
}: {
  adId: string;
  placementKey: string;
}) {
  useEffect(() => {
    const element = document.getElementById(`ad-${adId}`);
    if (!element) return;

    const sessionKey = `ad-session-${adId}`;
    const lastSeen = localStorage.getItem(sessionKey);
    if (lastSeen && Date.now() - Number(lastSeen) < 1000 * 60 * 30) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetch("/api/ad/impression", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ adId, placementKey, pagePath: window.location.pathname })
            }).catch(() => undefined);
            localStorage.setItem(sessionKey, String(Date.now()));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [adId, placementKey]);

  return <div id={`ad-${adId}`} className="sr-only" aria-hidden />;
}
