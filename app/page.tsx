"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const serverPoints = [
  { name: "USA", x: "18%", y: "38%" },
  { name: "Germany", x: "50%", y: "30%" },
  { name: "Netherlands", x: "47%", y: "28%" },
  { name: "Singapore", x: "74%", y: "52%" },
  { name: "Japan", x: "84%", y: "36%" }
];

const plans = [
  { label: "1 месяц", price: "$8" },
  { label: "6 месяцев", price: "$39.8" },
  { label: "1 год", price: "$70.1", popular: true },
  { label: "3 года", price: "$148.9" }
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [created, setCreated] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, idx) => ({
        id: idx,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${4 + Math.random() * 5}s`
      })),
    []
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreated(true);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-20 pb-16">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0F1A] px-6 py-16 shadow-[0_0_80px_rgba(59,167,255,0.15)] md:px-12">
        <div className="pointer-events-none absolute inset-0">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="particle"
              style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration }}
            />
          ))}
          <div className="portal-ring" />
          <div className="portal-ring portal-ring-alt" />
        </div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#3BA7FF]">HyperGate Security Network</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              HyperGate VPN — Открой интернет без ограничений
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Быстрый, безопасный и современный VPN нового поколения.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => setIsModalOpen(true)} className="neon-btn">
                Начать бесплатный пробный период
              </button>
              <a href="#apps" className="ghost-btn">
                Скачать приложение
              </a>
            </div>
          </div>
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#3BA7FF]/20 via-transparent to-[#7B5CFF]/20 p-8 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.16em] text-white/60">Hyper Tunnel</div>
            <div className="mt-4 text-3xl font-semibold">99.99% Uptime</div>
            <p className="mt-3 text-white/70">Стабильный доступ к стримингу, играм и рабочим сервисам по всему миру.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold">Преимущества</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["⚡ Сверхбыстрая сеть", "🔒 Военное шифрование", "🌍 Серверы по всему миру"].map((item) => (
            <article key={item} className="card-glow hover:-translate-y-2">
              <h3 className="text-xl font-medium">{item}</h3>
              <p className="mt-3 text-sm text-white/70">Минимальная задержка, максимальная скорость и безопасное соединение 24/7.</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold">Карта серверов</h2>
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#10172A] p-6">
          <div className="world-grid h-[320px] w-full rounded-2xl" />
          {serverPoints.map((point) => (
            <div key={point.name} className="server-point" style={{ left: point.x, top: point.y }}>
              <span>{point.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="apps">
        <h2 className="text-3xl font-semibold">Приложения</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "iPhone", href: "https://apps.apple.com/", label: "Скачать iOS" },
            { name: "Android", href: "https://play.google.com/store", label: "Скачать Android" },
            { name: "Windows", href: "/downloads/HyperGateVPN.exe", label: "Скачать Windows", download: true },
            { name: "Mac", href: "/downloads/HyperGateVPN.dmg", label: "Скачать macOS", download: true }
          ].map((device) => (
            <article key={device.name} className="card-glow floating-card">
              <h3 className="text-xl font-medium">{device.name}</h3>
              <a className="mt-4 inline-block text-[#3BA7FF]" href={device.href} download={device.download} target="_blank" rel="noreferrer">
                {device.label}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="plans">
        <h2 className="text-3xl font-semibold">Тарифы</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.label} className={`card-glow ${plan.popular ? "border-[#3BA7FF] shadow-[0_0_40px_rgba(59,167,255,0.35)]" : ""}`}>
              {plan.popular && <span className="rounded-full bg-[#3BA7FF]/20 px-3 py-1 text-xs text-[#3BA7FF]">Популярный</span>}
              <h3 className="mt-4 text-xl font-medium">{plan.label}</h3>
              <p className="mt-2 text-3xl font-semibold">{plan.price}</p>
              <a href="https://buy.stripe.com/test_6oE8wQ7FJ6w89AA000" target="_blank" rel="noreferrer" className="neon-btn mt-6 inline-flex">
                Купить подписку
              </a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold">Безопасность</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["AES-256 encryption", "No logs policy", "Privacy protection"].map((item) => (
            <article key={item} className="card-glow">
              <div className="text-lg font-medium text-[#7B5CFF]">●</div>
              <h3 className="mt-3 text-xl">{item}</h3>
            </article>
          ))}
        </div>
        <a className="ghost-btn mt-8 inline-flex" href="https://t.me/hypergate_support" target="_blank" rel="noreferrer">
          Связаться с поддержкой
        </a>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <p>
          Продолжая использование HyperGate, вы подтверждаете согласие с{" "}
          <Link className="text-[#3BA7FF]" href="/rules">
            правилами использования
          </Link>{" "}
          и{" "}
          <Link className="text-[#3BA7FF]" href="/terms">
            условиями пользования
          </Link>
          .
        </p>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0F1424] p-6">
            <h3 className="text-2xl font-semibold">Регистрация</h3>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3" />
              <input
                required
                minLength={8}
                type="password"
                name="password"
                placeholder="Пароль"
                className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3"
              />
              <button className="neon-btn w-full" type="submit">
                Создать аккаунт
              </button>
            </form>
            {created && <p className="mt-4 text-sm text-[#3BA7FF]">Аккаунт успешно создан</p>}
            <button className="mt-4 text-sm text-white/60" onClick={() => setIsModalOpen(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
