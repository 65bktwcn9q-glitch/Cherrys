export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Политика конфиденциальности</h1>
      <p className="text-sm text-muted-foreground">
        Мы храним только данные, необходимые для работы сервиса. IP-адреса не сохраняются в сыром виде, используется
        хеширование для анти-накрутки рекламы.
      </p>
    </div>
  );
}
