# HotRank — Telegram Mini App

HotRank is a production-oriented Telegram Mini App built with Next.js App Router + TypeScript + Tailwind + Framer Motion + Supabase APIs.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (DB + storage + realtime-ready APIs)
- Vercel-ready deployment

## Core product modules
- Swipe feed with video/image cards and ad card injection
- Onboarding overlay (`Swipe to Rate`)
- Score economy with live feedback (+10 on right swipe)
- Moderation reports + threshold-based user visibility/ban workflow
- Match creation on mutual likes
- Chat API for matched users
- Leaderboards for city/country/global scopes
- City search endpoint for regional feed filtering

## API Routes
- `POST/GET /api/user`
- `POST /api/swipe`
- `GET /api/match`
- `POST /api/report`
- `GET /api/leaderboard`
- `GET /api/ads`
- `GET /api/cities`
- `POST/GET /api/messages`

## Database bootstrap
Run SQL from:
- `supabase/hotrank.sql`

This script creates required tables:
- users, swipes, matches, reports, moderation_queue, ads, referrals, messages, cities

## Environment variables
Set in `.env.local` and Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Local run
```bash
npm install
npm run dev
```

## Deploy on Vercel
1. Import repo into Vercel.
2. Add all env variables.
3. Execute `supabase/hotrank.sql` in Supabase SQL editor.
4. Deploy.
