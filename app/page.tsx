'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Banknote, Building2, CheckCircle2, FileCheck2, Handshake, PhoneCall, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { ComplexesCarousel } from '@/components/ComplexesCarousel';
import { Header } from '@/components/Header';
import { PHONE, TELEGRAM_URL } from '@/components/content';
import { QuizModal } from '@/components/QuizModal';
import { QuizWizard } from '@/components/QuizWizard';

const services = [
  ['Подбор ЖК или участка/застройщика', 'Находим реальные варианты под бюджет, срок и желаемую локацию без витринного шума.', Building2],
  ['Ипотека под ключ', 'От первой анкеты до подписания: единый процесс и один ответственный за результат.', Handshake],
  ['Сравнение условий банков', 'Сводим ставки, требования и шансы одобрения в понятный сценарий решения.', Banknote],
  ['Подготовка документов', 'Формируем персональный список документов и проверяем комплект перед подачей.', FileCheck2],
  ['Сопровождение одобрения', 'Коммуницируем с банком, уточняем статусы, ускоряем прохождение этапов.', ShieldCheck],
  ['Сопровождение сделки', 'Контролируем финальные проверки и договор, чтобы вы подписали спокойно.', CheckCircle2],
] as const;

const faq = [
  ['Почему бесплатно для клиента?', 'Работа оплачивается по партнёрской модели, поэтому для клиента сопровождение без комиссии.'],
  ['Какие документы нужны?', 'Базово: паспорт, подтверждение дохода/занятости и анкета. Точный список даю после консультации.'],
  ['Сколько занимает одобрение?', 'Обычно 2–5 рабочих дней после подачи полного комплекта в банки.'],
  ['Если нет первоначального взноса?', 'Подберу варианты с минимальным входом или альтернативной стратегией при подходящих вводных.'],
  ['Можно ли выбрать ЖК до одобрения?', 'Да, фиксируем shortlist ЖК заранее, чтобы одобрение получать уже под целевой объект.'],
  ['Как быстро вы отвечаете?', 'В течение рабочего дня, по срочным кейсам — быстрее через Telegram.'],
  ['Работаете только по Луганску?', 'Основной фокус — Луганск/ЛНР, но по ряду программ можно рассмотреть и соседние локации.'],
  ['Можно ли всё пройти дистанционно?', 'Да, большую часть этапов: консультацию, проверку и согласование делаем онлайн.'],
] as const;

export default function HomePage() {
  const [openQuiz, setOpenQuiz] = useState(false);
  const [scenario, setScenario] = useState<string | undefined>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpenQuiz(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const metrics = useMemo(
    () => [
      ['Одобрения', '200+'],
      ['Средний срок решения', '2–5 дней'],
      ['Сопровождение', 'До договора'],
    ],
    [],
  );

  return (
    <main id="top">
      <Header onOpenQuiz={() => setOpenQuiz(true)} />
      <QuizModal open={openQuiz} onClose={() => setOpenQuiz(false)} scenario={scenario} />

      <section className="relative h-[300vh]">
        <div className="grain sticky top-0 h-screen overflow-hidden">
          <Image src="/intro-bg.svg" alt="ЖК" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950/75" />

          <div className="absolute inset-0">
            <div className="section-wrap grid h-full items-center">
              <div className="max-w-3xl space-y-6 pt-24">
                <span className="inline-flex items-center gap-2 rounded-full border border-neon/50 bg-neon/10 px-4 py-2 text-xs tracking-[0.18em] text-neon">
                  <Sparkles size={14} /> ИПОТЕЧНЫЙ БРОКЕР • ЛУГАНСК (ЛНР)
                </span>
                <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                  Квартира в ипотеку под 2% — подберу ЖК и проведу сделку
                </h1>
                <p className="max-w-2xl text-lg text-slate-200">
                  Банки, застройщики, документы и контроль процесса — на мне. Для вас — бесплатно.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setOpenQuiz(true)} className="shine rounded-full bg-neon px-6 py-3 font-semibold text-slate-950 active:scale-95">
                    Получить подбор ЖК
                  </button>
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/35 px-6 py-3">
                    Написать в Telegram
                  </a>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {metrics.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/20 bg-white/5 p-4 backdrop-blur">
                      <p className="text-sm text-slate-300">{label}</p>
                      <p className="text-xl font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                  {['Прозрачные условия', 'Без лишних походов', 'Пошаговое сопровождение'].map((text) => (
                    <span key={text} className="inline-flex items-center gap-1"><BadgeCheck size={16} className="text-neon" /> {text}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(8,15,30,0.7) 60%, rgba(7,11,20,0.95))' }} />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="section-wrap grid h-full grid-rows-3 py-24">
            <div />
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} className="pointer-events-auto self-center rounded-3xl border border-white/15 bg-slate-900/45 p-6 backdrop-blur">
              <h2 className="text-3xl font-semibold">Понять, подойдёте ли вы под ипотеку — можно за 1 минуту</h2>
              <p className="mt-2 text-slate-200">Ответьте на несколько вопросов — я вернусь с подбором ЖК и сценарием одобрения.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {['Подбор ЖК под ваш бюджет', 'Сравнение банков и программ', 'Сопровождение до подписания'].map((v) => (
                  <div key={v} className="rounded-2xl border border-white/20 bg-white/5 p-4">{v}</div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm">Самостоятельно: риск ошибок, потеря времени, непонятные требования.</div>
                <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4 text-sm">Со мной: понятный план, контроль этапов, один контакт.</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="pointer-events-auto self-end rounded-3xl border border-white/15 bg-slate-900/50 p-6 backdrop-blur">
              <h2 className="text-3xl font-semibold">С чего начнём?</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {['Подбор ЖК', 'Ипотека под ключ', 'Консультация и план действий'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setScenario(item);
                      setOpenQuiz(true);
                    }}
                    className="card-lift rounded-2xl border border-white/20 bg-white/5 p-5 text-left"
                  >
                    <p className="text-lg font-semibold">{item}</p>
                    <p className="mt-2 text-sm text-slate-300">Запустить квиз по выбранному сценарию <ArrowRight className="inline" size={16} /></p>
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-slate-200">
                <p>После квиза получите:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Подбор 3–5 вариантов ЖК</li>
                  <li>• Рекомендованные банки/условия</li>
                  <li>• Пошаговый чеклист документов</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-premium-gradient py-24">
        <div className="section-wrap">
          <h2 className="text-4xl font-semibold">Услуги</h2>
          <p className="mt-2 max-w-2xl text-slate-300">Полный цикл сопровождения, чтобы ипотека стала управляемым процессом, а не стрессом.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, text, Icon]) => (
              <article key={title} className="card-lift shine rounded-3xl border border-white/15 bg-white/[0.04] p-6">
                <Icon className="text-neon" />
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-slate-300">{text}</p>
                <a href="#contacts" className="mt-4 inline-block text-neon">Уточнить</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="complexes" className="py-24">
        <div className="section-wrap">
          <h2 className="text-4xl font-semibold">ЖК в городе</h2>
          <p className="mt-2 text-slate-300">Выбирайте формат квартиры и сравнивайте проекты в удобной карусели.</p>
          <div className="mt-8"><ComplexesCarousel /></div>
        </div>
      </section>

      <section id="steps" className="bg-premium-gradient py-24">
        <div className="section-wrap">
          <h2 className="text-4xl font-semibold">Как я работаю</h2>
          <ol className="mt-10 space-y-4 border-l border-neon/35 pl-6">
            {['Первичная консультация', 'Проверка вводных/документов', 'Подбор ЖК + стратегия одобрения', 'Подача заявок/коммуникация', 'Сопровождение сделки', 'Подписание договора'].map((step, i) => (
              <motion.li key={step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="absolute -left-[31px] top-5 inline-flex h-4 w-4 rounded-full bg-neon" />
                <p className="font-semibold">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="reviews" className="py-24">
        <div className="section-wrap grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-semibold">Отзывы</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                'Сделали одобрение за 3 дня, подобрали ЖК и банк без лишних поездок.',
                'Было страшно из-за документов, но всё собрали по чеклисту и прошли без ошибок.',
                'Получили понятный план действий и понимание бюджета уже после первой консультации.',
                'Сопровождение реально до подписи — ни одного этапа не остались одни.',
              ].map((text) => (
                <article key={text} className="rounded-3xl border border-white/15 bg-white/5 p-5 text-slate-200">“{text}”</article>
              ))}
            </div>
          </div>
          <aside className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Плейсхолдер</p>
            <div className="h-40 rounded-2xl bg-slate-300/10 backdrop-blur-xl" />
            <h3 className="text-xl font-semibold">Почему мне доверяют</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Прозрачный сценарий от первого шага</li>
              <li>• Честно оцениваю шансы и риски</li>
              <li>• Всегда на связи в Telegram</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="quiz" className="bg-premium-gradient py-24">
        <div className="section-wrap grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl font-semibold">Квиз</h2>
            <p className="mt-3 text-slate-300">Встроенная версия квиза доступна прямо на странице. Заполните ответы и отправьте удобным способом.</p>
          </div>
          <QuizWizard compact />
        </div>
      </section>

      <section id="faq" className="py-24">
        <div className="section-wrap max-w-4xl">
          <h2 className="text-4xl font-semibold">FAQ</h2>
          <div className="mt-8 space-y-3">
            {faq.map(([q, a], i) => (
              <div key={q} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <button className="flex w-full items-center justify-between text-left font-semibold" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q} <ArrowRight className={`transition ${openFaq === i ? 'rotate-90' : ''}`} size={16} />
                </button>
                {openFaq === i && <p className="mt-3 text-slate-300">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="bg-premium-gradient py-24">
        <div className="section-wrap grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold">Контакты</h2>
            <p className="inline-flex items-center gap-2 text-lg"><PhoneCall size={18} className="text-neon" /> {PHONE}</p>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-neon px-5 py-3 font-semibold text-slate-900">Telegram</a>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Реквизиты ИП (пример)</p>
              <p>ИП Иванов Иван Иванович, ИНН 000000000000, ОГРНИП 000000000000000</p>
              <p>Юр. адрес: Луганск, ЛНР.</p>
            </div>
          </div>
          <form className="space-y-3 rounded-3xl border border-white/15 bg-white/5 p-6">
            <input className="w-full rounded-xl bg-slate-950/60 p-3" placeholder="Имя" />
            <input className="w-full rounded-xl bg-slate-950/60 p-3" placeholder="Телефон" />
            <input className="w-full rounded-xl bg-slate-950/60 p-3" placeholder="Удобное время для связи" />
            <label className="flex items-start gap-2 text-sm text-slate-300"><input type="checkbox" /> Согласен(на) на обработку персональных данных</label>
            <button className="rounded-xl bg-neon px-5 py-3 font-semibold text-slate-900"><Timer size={16} className="mr-1 inline" /> Отправить заявку</button>
          </form>
        </div>
      </section>
    </main>
  );
}
