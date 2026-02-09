import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/90">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <div className="text-lg font-semibold">CherryPlay</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Маркетплейс игровых услуг. Мы не участвуем в оплате и не выступаем стороной сделки.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">Документы</div>
          <Link href="/rules">Правила</Link>
          <Link href="/terms">Пользовательское соглашение</Link>
          <Link href="/privacy">Политика приватности</Link>
        </div>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">Платформа</div>
          <Link href="/listings">Каталог</Link>
          <Link href="/advertise">Реклама</Link>
          <Link href="/account">Личный кабинет</Link>
        </div>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">Контакты</div>
          <p>support@cherryplay.gg</p>
          <p>Telegram: @cherryplay</p>
          <p>Discord: cherryplay.gg</p>
        </div>
      </div>
    </footer>
  );
}
