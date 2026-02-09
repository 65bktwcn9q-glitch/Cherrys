# CherryPlay (FunPay-lite)

Полностью рабочий маркетплейс игровых услуг на Next.js 14 + Supabase + Prisma. Без эскроу, без приема платежей — покупатель связывается напрямую с продавцом в Telegram/Discord.

## Возможности
- Объявления по играм и категориям, фильтры и поиск.
- Прямые контакты продавца (TG/Discord).
- Реклама через нативные баннеры и спонсорские блоки.
- Модерация объявлений и жалобы.
- Готовые RLS-политики для Supabase.
- Seed-данные: 30+ игр, 10+ категорий, демо объявления.

## Технологии
- Next.js 14 (App Router), TypeScript
- TailwindCSS + shadcn/ui стили
- Framer Motion анимации
- Supabase (Auth + Postgres + Storage)
- Prisma ORM + миграции
- Zod + React Hook Form
- TanStack Query (можно подключить на клиентских страницах, пока не требуется)

---

## Быстрый старт (локально)

```bash
npm install
cp .env.example .env
npm run prisma:generate
```

### Создание проекта Supabase
1. Создайте проект на https://supabase.com.
2. Скопируйте **Project URL** и **anon key** в `.env`.
3. Скопируйте **service_role** key в `.env`.
4. Создайте Storage bucket `listing-images` (публичный).

### Миграции
```bash
npm run prisma:deploy
```

### Seeds
```bash
npm run seed
```

### Запуск
```bash
npm run dev
```

Откройте `http://localhost:3000`.

---

## Деплой на Vercel
1. Импортируйте репозиторий в Vercel.
2. Добавьте переменные окружения из `.env.example`.
3. Убедитесь, что в Vercel заданы `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
4. Выполните миграции вручную в Supabase.
5. Запустите `npm run build` при деплое.

---

## Деплой на VPS (Docker)
Минимальные требования: 1 vCPU / 1 GB RAM. База данных остаётся в Supabase.

```bash
docker compose up --build -d
```

---

## Безопасность
- Валидация запросов на сервере через Zod.
- Базовый rate limiting для публичных эндпоинтов.
- RLS-политики Supabase в `supabase/rls.sql`.
- Хеширование IP для аналитики рекламы.

---

## Важные замечания
- CherryPlay не хранит средства и не выступает стороной сделки.
- Контент, нарушающий правила игр или законы, запрещён и удаляется модерацией.
