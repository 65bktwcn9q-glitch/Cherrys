import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Личный кабинет</h1>
      <div className="rounded-2xl border border-border bg-card/60 p-6">
        <p className="text-sm text-muted-foreground">
          Подключите Supabase Auth, чтобы показывать реальные данные пользователя, объявления и настройки профиля.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/sell/new">
            <Button>Создать объявление</Button>
          </Link>
          <Link href="/u/demo">
            <Button variant="outline">Публичный профиль</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
