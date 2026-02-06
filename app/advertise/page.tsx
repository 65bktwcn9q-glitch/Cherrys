import { Button } from "@/components/ui/button";

export default function AdvertisePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Реклама на CherryPlay</h1>
      <p className="text-sm text-muted-foreground">
        Рекламные места расположены в каталоге, на главной и страницах объявлений. Никаких сторонних скриптов — только
        нативные баннеры и спонсорские блоки.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {["home_top", "home_mid", "catalog_sidebar", "listing_bottom", "game_top"].map((placement) => (
          <div key={placement} className="rounded-2xl border border-border bg-card/60 p-4">
            <div className="text-sm font-semibold">{placement}</div>
            <p className="mt-2 text-xs text-muted-foreground">Показы зависят от трафика.</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card/60 p-6">
        <div className="text-lg font-semibold">Прайс-лист</div>
        <ul className="mt-3 text-sm text-muted-foreground">
          <li>• Месяц размещения от 30$.</li>
          <li>• Индивидуальные пакеты и брендинг.</li>
        </ul>
        <Button className="mt-4">Купить размещение (Telegram)</Button>
      </div>
    </div>
  );
}
