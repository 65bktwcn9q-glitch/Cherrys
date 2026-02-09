import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const games = [
  {
    slug: "cs2",
    title: "Counter-Strike 2",
    coverUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
    shortDescription: "Соревновательный шутер от Valve."
  },
  { slug: "dota-2", title: "Dota 2", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420", shortDescription: "Легендарная MOBA и киберспорт." },
  { slug: "valorant", title: "Valorant", coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", shortDescription: "Тактический шутер от Riot Games." },
  { slug: "fortnite", title: "Fortnite", coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d", shortDescription: "Battle Royale и творчество." },
  { slug: "roblox", title: "Roblox", coverUrl: "https://images.unsplash.com/photo-1511882150382-421056c89033", shortDescription: "Платформа для игр и творчества." },
  { slug: "gta-v", title: "GTA V", coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", shortDescription: "Открытый мир в Лос-Сантосе." },
  { slug: "rust", title: "RUST", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420", shortDescription: "Выживание в суровом мире." },
  { slug: "lol", title: "League of Legends", coverUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20", shortDescription: "Классика MOBA." },
  { slug: "wow", title: "World of Warcraft", coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d", shortDescription: "ММОРПГ в мире Азерота." },
  { slug: "apex", title: "Apex Legends", coverUrl: "https://images.unsplash.com/photo-1511882150382-421056c89033", shortDescription: "Battle Royale от Respawn." },
  { slug: "overwatch", title: "Overwatch 2", coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", shortDescription: "Командный шутер." },
  { slug: "pubg", title: "PUBG", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420", shortDescription: "Королевская битва." },
  { slug: "genshin", title: "Genshin Impact", coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d", shortDescription: "Приключения в мире Тейвата." },
  { slug: "hsr", title: "Honkai: Star Rail", coverUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20", shortDescription: "Космическая RPG." },
  { slug: "minecraft", title: "Minecraft", coverUrl: "https://images.unsplash.com/photo-1511882150382-421056c89033", shortDescription: "Стройте и выживайте." },
  { slug: "tarkov", title: "Escape from Tarkov", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420", shortDescription: "Хардкорный шутер." },
  { slug: "rocket-league", title: "Rocket League", coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", shortDescription: "Футбол на машинах." },
  { slug: "fifa", title: "EA FC 24", coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d", shortDescription: "Футбольный симулятор." },
  { slug: "cod", title: "Call of Duty", coverUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20", shortDescription: "Шутер с огромной аудиторией." },
  { slug: "diablo-4", title: "Diablo IV", coverUrl: "https://images.unsplash.com/photo-1511882150382-421056c89033", shortDescription: "ARPG от Blizzard." },
  { slug: "destiny", title: "Destiny 2", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420", shortDescription: "Кооперативный лутер-шутер." },
  { slug: "sea-of-thieves", title: "Sea of Thieves", coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", shortDescription: "Пиратские приключения." },
  { slug: "new-world", title: "New World", coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d", shortDescription: "MMO от Amazon." },
  { slug: "path-of-exile", title: "Path of Exile", coverUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20", shortDescription: "ARPG для фанатов хардкора." },
  { slug: "lost-ark", title: "Lost Ark", coverUrl: "https://images.unsplash.com/photo-1511882150382-421056c89033", shortDescription: "MMO с рейдами." },
  { slug: "black-desert", title: "Black Desert", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420", shortDescription: "MMO с открытым миром." },
  { slug: "warzone", title: "Warzone", coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", shortDescription: "Батл-рояль в CoD." },
  { slug: "mobile-legends", title: "Mobile Legends", coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d", shortDescription: "MOBA для мобильных." },
  { slug: "pubg-mobile", title: "PUBG Mobile", coverUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20", shortDescription: "Батл-рояль на мобильных." },
  { slug: "brawl-stars", title: "Brawl Stars", coverUrl: "https://images.unsplash.com/photo-1511882150382-421056c89033", shortDescription: "Динамичные бои." }
];

const categories = [
  { slug: "boost", title: "Boost", icon: "🚀" },
  { slug: "coaching", title: "Coaching", icon: "🎯" },
  { slug: "currency", title: "Currency", icon: "💰" },
  { slug: "items", title: "Items", icon: "🎁" },
  { slug: "accounts", title: "Accounts", icon: "🛡️" },
  { slug: "skins", title: "Skins", icon: "✨" },
  { slug: "carry", title: "Carry", icon: "🧭" },
  { slug: "services", title: "Services", icon: "⚙️" },
  { slug: "trading", title: "Trading", icon: "🔁" },
  { slug: "other", title: "Other", icon: "🧩" }
];

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@cherryplay.gg" },
    update: {},
    create: {
      email: "demo@cherryplay.gg",
      username: "demo",
      displayName: "Demo Seller",
      telegram: "demo_seller",
      discord: "demo#0001"
    }
  });

  await prisma.game.createMany({ data: games, skipDuplicates: true });
  await prisma.category.createMany({ data: categories, skipDuplicates: true });

  const game = await prisma.game.findFirst();
  const category = await prisma.category.findFirst();
  if (!game || !category) return;

  await prisma.listing.create({
    data: {
      title: "Boost до высокого ранга за 24 часа",
      description: "Опытная команда бустеров. Быстрые сроки, безопасный доступ, отчёт по прогрессу.",
      snippet: "Опытная команда бустеров. Быстрые сроки, безопасный доступ, отчёт по прогрессу.",
      price: 49,
      currency: "USD",
      platform: "PC",
      language: "Русский",
      tags: ["boost", "fast", "duo"],
      contactPreference: "TELEGRAM",
      status: "ACTIVE",
      userId: user.id,
      gameId: game.id,
      categoryId: category.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1542751110-97427bbecf20", sortOrder: 0 }
        ]
      }
    }
  });

  await prisma.adPlacement.create({
    data: {
      placementKey: "HOME_TOP",
      title: "Ивент недели",
      imageUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
      linkUrl: "https://t.me/cherryplay",
      advertiserName: "CherryPlay",
      notes: "Стань спонсором недели",
      weight: 1
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
