export default function RulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Правила</h1>
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>CherryPlay — площадка для объявлений. Мы не участвуем в оплате и не являемся стороной сделки.</p>
        <ul className="list-disc space-y-2 pl-4">
          <li>Запрещён контент, нарушающий правила игр или законы.</li>
          <li>Запрещены читы, взлом, фишинг и продажа краденых аккаунтов.</li>
          <li>Все объявления проходят модерацию.</li>
          <li>Пожаловаться можно через форму на странице объявления.</li>
        </ul>
      </div>
    </div>
  );
}
