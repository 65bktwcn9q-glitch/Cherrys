"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { supabaseBrowser } from "@/lib/supabase";
import { resizeImage } from "@/lib/image-resize";

const schema = z.object({
  title: z.string().min(6),
  description: z.string().min(20),
  price: z.number().min(1),
  currency: z.string().min(1),
  platform: z.string().min(1),
  language: z.string().min(1),
  country: z.string().optional(),
  gameId: z.string().min(1),
  categoryId: z.string().min(1),
  telegram: z.string().optional(),
  discord: z.string().optional(),
  tags: z.string().optional(),
  isOnline: z.boolean().optional()
});

export type ListingFormValues = z.infer<typeof schema>;

export function ListingForm({ games, categories }: { games: { id: string; title: string }[]; categories: { id: string; title: string }[] }) {
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currency: "USD",
      platform: "PC",
      language: "Русский"
    }
  });

  async function onSubmit(values: ListingFormValues) {
    setStatus("Загрузка изображений...");
    const uploaded: string[] = [];
    for (const file of images) {
      const resized = await resizeImage(file);
      const fileName = `${crypto.randomUUID()}-${resized.name}`;
      const { data, error } = await supabaseBrowser.storage.from("listing-images").upload(fileName, resized);
      if (error) {
        setStatus(`Ошибка загрузки: ${error.message}`);
        return;
      }
      const { data: publicUrl } = supabaseBrowser.storage.from("listing-images").getPublicUrl(data.path);
      uploaded.push(publicUrl.publicUrl);
    }

    setStatus("Сохранение объявления...");
    const response = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, images: uploaded })
    });

    if (!response.ok) {
      setStatus("Ошибка сохранения. Проверьте данные.");
      return;
    }

    setStatus("Объявление отправлено на модерацию!");
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          Игра
          <Select {...form.register("gameId")}>
            <option value="">Выберите игру</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </Select>
        </label>
        <label className="text-sm">
          Категория
          <Select {...form.register("categoryId")}>
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </Select>
        </label>
      </div>
      <label className="text-sm">
        Заголовок
        <Input {...form.register("title")} placeholder="Например, Boost до Global Elite" />
      </label>
      <label className="text-sm">
        Описание
        <Textarea {...form.register("description")} placeholder="Опишите условия, сроки, требования..." />
      </label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          Цена
          <Input type="number" {...form.register("price", { valueAsNumber: true })} />
        </label>
        <label className="text-sm">
          Валюта
          <Select {...form.register("currency")}>
            <option>USD</option>
            <option>EUR</option>
            <option>RUB</option>
          </Select>
        </label>
        <label className="text-sm">
          Платформа
          <Select {...form.register("platform")}>
            <option>PC</option>
            <option>PS</option>
            <option>Xbox</option>
            <option>Mobile</option>
          </Select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Язык
          <Input {...form.register("language")} />
        </label>
        <label className="text-sm">
          Страна
          <Input {...form.register("country")} placeholder="Например, Казахстан" />
        </label>
        <label className="text-sm">
          Теги (через запятую)
          <Input {...form.register("tags")} placeholder="boost, fast, duo" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Telegram
          <Input {...form.register("telegram")} placeholder="@nickname" />
        </label>
        <label className="text-sm">
          Discord
          <Input {...form.register("discord")} placeholder="nickname#0000" />
        </label>
      </div>
      <label className="text-sm">
        Изображения (до 6 файлов, 2-3MB)
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []).slice(0, 6);
            setImages(files);
          }}
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...form.register("isOnline")} />
        Я онлайн сейчас и готов отвечать быстро
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" required />
        Я согласен с правилами публикации и подтверждаю, что контент не нарушает правила игр и законы.
      </label>
      <Button type="submit">Отправить на модерацию</Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </form>
  );
}
