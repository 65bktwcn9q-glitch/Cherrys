export type FeedScope = "city" | "country" | "global";

export type MediaItem = {
  type: "image" | "video";
  url: string;
  durationSec?: number;
};

export type ProfileCard = {
  id: string;
  username?: string;
  age: number;
  city: string;
  country: string;
  avatar: string;
  media: MediaItem[];
  rankPoints: number;
  activityPoints: number;
  isSponsored?: boolean;
  adLink?: string;
  adCta?: string;
  bio?: string;
};
