import { ProfileCard } from "@/lib/hotrank/types";

export const demoData: ProfileCard[] = [
  {
    id: "u-1",
    username: "luna.v",
    age: 24,
    city: "Almaty",
    country: "Kazakhstan",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    media: [
      {
        type: "video",
        url: "https://cdn.coverr.co/videos/coverr-hands-on-laptop-1579/1080p.mp4",
        durationSec: 10
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    rankPoints: 512,
    activityPoints: 93,
    bio: "Product designer, coffee hunter, and city explorer."
  },
  {
    id: "ad-1",
    age: 0,
    city: "Global",
    country: "Sponsored",
    avatar:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    rankPoints: 0,
    activityPoints: 0,
    isSponsored: true,
    adLink: "https://vercel.com",
    adCta: "Join Elite",
    bio: "Scale your creator profile with premium boosts and analytics."
  },
  {
    id: "u-2",
    username: "andriy.motion",
    age: 27,
    city: "Kyiv",
    country: "Ukraine",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    media: [
      {
        type: "video",
        url: "https://cdn.coverr.co/videos/coverr-man-sitting-near-lake-1572/1080p.mp4",
        durationSec: 8
      }
    ],
    rankPoints: 684,
    activityPoints: 141,
    bio: "Motion lead. Hiking, synthwave, and bold ideas."
  }
];
