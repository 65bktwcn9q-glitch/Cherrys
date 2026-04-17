-- HotRank core schema for Supabase / Vercel deployment
create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  telegram_id text unique not null,
  username text not null,
  age int not null check (age >= 18 and age <= 99),
  city text not null,
  country text not null,
  avatar text not null,
  media jsonb not null default '[]'::jsonb,
  rank_points int not null default 0,
  activity_points int not null default 0,
  flagged boolean not null default false,
  hidden boolean not null default false,
  banned boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists swipes (
  id uuid primary key default gen_random_uuid(),
  from_user uuid not null references users(id) on delete cascade,
  to_user uuid not null references users(id) on delete cascade,
  action text not null check (action in ('like', 'skip')),
  created_at timestamptz not null default now()
);

create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  user1 uuid not null references users(id) on delete cascade,
  user2 uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user1, user2)
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  from_user uuid not null references users(id) on delete cascade,
  target_user uuid not null references users(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists moderation_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  source text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists ads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image text not null,
  link text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  referred_user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, referred_user_id)
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  sender_id uuid not null references users(id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  country text not null,
  unique(city, country)
);

create or replace function increment_rank_points(user_id_input uuid, by_value int)
returns void as $$
begin
  update users set rank_points = rank_points + by_value where id = user_id_input;
end;
$$ language plpgsql security definer;

insert into cities (city, country)
values ('Moscow', 'Russia'), ('Saint Petersburg', 'Russia'), ('Kyiv', 'Ukraine'), ('Almaty', 'Kazakhstan'), ('Minsk', 'Belarus')
on conflict do nothing;
