'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Banknote, Building2, CheckCircle2, FileCheck2, Handshake, PhoneCall, ShieldCheck, Timer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ComplexesCarousel } from '../components/ComplexesCarousel.mjs';
import { Header } from '../components/Header.mjs';
import { PHONE, TELEGRAM_URL } from '../components/content.mjs';
import { QuizModal } from '../components/QuizModal.mjs';
import { QuizWizard } from '../components/QuizWizard.mjs';
import { IntroWrap } from '../src/components/IntroWrap.mjs';

const services = [
  ['Подбор ЖК или участка/застройщика', 'Подбираю релевантные проекты по бюджету, району и задаче семьи.', Building2],
  ['Ипотека под ключ', 'Веду все этапы: от анкеты до договора без разрыва ответственности.', Handshake],
  ['Сравнение условий банков', 'Формирую спокойную стратегию с учётом шансов одобрения и итоговой переплаты.', Banknote],
  ['Подготовка документов', 'Даю персональный список и проверяю пакет до отправки в банк.', FileCheck2],
  ['Сопровождение одобрения', 'Контролирую коммуникацию с банками и статус каждого шага.', ShieldCheck],
  ['Сопровождение сделки', 'Проверяю финальный этап и довожу до подписания без лишней суеты.', CheckCircle2],
];

const faq = [
  ['Почему бесплатно для клиента?', 'Работа оплачивается по партнёрской модели, поэтому для клиента сопровождение без комиссии.'],
  ['Какие документы нужны?', 'Базово: паспорт, подтверждение дохода/занятости и анкета. Точный список даю после консультации.'],
  ['Сколько занимает одобрение?', 'Обычно 2–5 рабочих дней после подачи полного комплекта в банки.'],
  ['Если нет первоначального взноса?', 'Подберу варианты с минимальным входом или альтернативной стратегией при подходящих вводных.'],
  ['Можно ли выбрать ЖК до одобрения?', 'Да, фиксируем shortlist ЖК заранее, чтобы одобрение получать уже под целевой объект.'],
  ['Как быстро вы отвечаете?', 'В течение рабочего дня, по срочным кейсам — быстрее через Telegram.'],
  ['Работаете только по Луганску?', 'Основной фокус — Луганск/ЛНР, но по ряду программ можно рассмотреть и соседние локации.'],
  ['Можно ли всё пройти дистанционно?', 'Да, большую часть этапов: консультацию, проверку и согласование делаем онлайн.'],
];

export default function HomePage() {
  const [openQuiz, setOpenQuiz] = useState(false);
  const [scenario, setScenario] = useState();
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpenQuiz(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const metrics = useMemo(() => [['Одобрения', '200+'], ['Средний срок решения', '2–5 дней'], ['Сопровождение', 'До договора']], []);

  return (
    <main id="top" className="bg-cream text-graphite">
      <Header onOpenQuiz={() => setOpenQuiz(true)} />
      <QuizModal open={openQuiz} onClose={() => setOpenQuiz(false)} scenario={scenario} />

      <IntroWrap>
        <section className="min-h-[110vh]">
          <div className="section-wrap relative z-10 flex h-full min-h-[760px] items-center pt-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }} className="max-w-[560px] space-y-6 text-[#f8f3eb]">
              <span className="inline-flex rounded-full border border-white/45 bg-white/10 px-4 py-2 text-xs tracking-[0.18em]">ИПОТЕЧНЫЙ БРОКЕР • ЛУГАНСК (ЛНР)</span>
              <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">Квартира в ипотеку под 2% — подберу ЖК и проведу сделку</h1>
              <p className="text-lg text-[#efe7db]">Банки, застройщики, документы и контроль процесса — на мне. Для вас — бесплатно.</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setOpenQuiz(true)} className="btn-primary">Получить подбор ЖК</button>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-ghost">Написать в Telegram</a>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {metrics.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm"><p className="text-sm text-[#e9dfd0]">{label}</p><p className="text-xl font-semibold">{value}</p></div>)}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[#ece2d5]">{['Прозрачные условия', 'Без лишних походов', 'Пошаговое сопровождение'].map((text) => <span key={text} className="inline-flex items-center gap-1.5"><BadgeCheck size={16} className="text-[#d6b98c]" /> {text}</span>)}</div>
            </motion.div>
          </div>
        </section>

        <section className="pb-12">
          <div className="section-wrap grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/35 bg-white/70 p-8 shadow-soft backdrop-blur-sm">
              <h2 className="text-3xl font-medium leading-tight text-[#2f261d]">Понять, подойдёте ли вы под ипотеку — можно за 1 минуту</h2>
              <p className="mt-3 text-[#605647]">Ответьте на несколько вопросов — вернусь с подбором ЖК и сценарием одобрения.</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">{['Подбор ЖК под бюджет', 'Сравнение банков', 'Сопровождение до подписания'].map((v) => <div key={v} className="rounded-2xl border border-[#e7ddd0] bg-white p-4 text-sm">{v}</div>)}</div>
            </div>

            <div className="rounded-3xl border border-white/35 bg-white/70 p-8 shadow-soft backdrop-blur-sm">
              <h2 className="text-3xl font-medium text-[#2f261d]">С чего начнём?</h2>
              <div className="mt-5 grid gap-3">{['Подбор ЖК', 'Ипотека под ключ', 'Консультация и план действий'].map((item) => <button key={item} onClick={() => { setScenario(item); setOpenQuiz(true); }} className="card-lift rounded-2xl border border-[#e2d7c7] bg-white p-5 text-left"><p className="text-lg font-medium">{item}</p><p className="mt-1 text-sm text-[#6b5f4f]">Запустить квиз по сценарию <ArrowRight className="inline" size={15} /></p></button>)}</div>
            </div>
          </div>
        </section>
      </IntroWrap>

      <section id="services" className="bg-section-warm py-24">
        <div className="section-wrap"><h2 className="text-4xl font-medium">Услуги</h2><p className="mt-2 max-w-2xl text-[#675c4d]">Полный цикл сопровождения, чтобы ипотека стала управляемым процессом, а не стрессом.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map(([title, text, Icon]) => <article key={title} className="card-lift rounded-3xl border border-[#e4d9c8] bg-[#fcfaf6] p-6"><Icon className="text-[#b48e58]" /><h3 className="mt-4 text-xl font-medium">{title}</h3><p className="mt-2 text-[#685d4f]">{text}</p><a href="#contacts" className="mt-4 inline-block text-[#9b7748]">Уточнить</a></article>)}</div>
        </div>
      </section>

      <section id="complexes" className="py-24"><div className="section-wrap"><h2 className="text-4xl font-medium">ЖК в городе</h2><p className="mt-2 text-[#6c6152]">Выбирайте формат квартиры и сравнивайте проекты в удобной карусели.</p><div className="mt-8"><ComplexesCarousel /></div></div></section>

      <section id="steps" className="bg-section-warm py-24"><div className="section-wrap"><h2 className="text-4xl font-medium">Как я работаю</h2><ol className="mt-10 space-y-4 border-l border-[#ccb289] pl-6">{['Первичная консультация', 'Проверка вводных/документов', 'Подбор ЖК + стратегия одобрения', 'Подача заявок/коммуникация', 'Сопровождение сделки', 'Подписание договора'].map((step, i) => <motion.li key={step} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.32 }} className="relative rounded-2xl border border-[#e4d8c8] bg-[#fcfaf6] p-4"><span className="absolute -left-[31px] top-5 inline-flex h-4 w-4 rounded-full bg-[#c6a46c]" /><p className="font-medium">{step}</p></motion.li>)}</ol></div></section>

      <section id="reviews" className="py-24"><div className="section-wrap grid gap-8 lg:grid-cols-3"><div className="lg:col-span-2"><h2 className="text-4xl font-medium">Отзывы</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{['Сделали одобрение за 3 дня, подобрали ЖК и банк без лишних поездок.', 'Было спокойно по документам: чёткий список, проверка и понятные сроки.', 'Получили план действий и сразу увидели реальный бюджет покупки.', 'Сопровождение до подписи: на каждом этапе был понятный контроль.'].map((text) => <article key={text} className="rounded-3xl border border-[#e4d8c8] bg-[#fcfaf6] p-5 text-[#514637]">“{text}”</article>)}</div></div><aside className="space-y-4 rounded-3xl border border-[#e4d8c8] bg-[#fcfaf6] p-6"><p className="text-sm text-[#8b7b66]">Плейсхолдер</p><div className="h-40 rounded-2xl border border-[#e8dece] bg-[#efe7dc]" /><h3 className="text-xl font-medium">Почему мне доверяют</h3><ul className="space-y-2 text-[#5f5445]"><li>• Прозрачный сценарий от первого шага</li><li>• Честно оцениваю шансы и риски</li><li>• Всегда на связи в Telegram</li></ul></aside></div></section>

      <section id="quiz" className="bg-section-warm py-24"><div className="section-wrap grid gap-8 lg:grid-cols-2 lg:items-center"><div><h2 className="text-4xl font-medium">Квиз</h2><p className="mt-3 text-[#65594b]">Встроенная версия квиза доступна прямо на странице. Заполните ответы и отправьте удобным способом.</p></div><QuizWizard compact /></div></section>

      <section id="faq" className="py-24"><div className="section-wrap max-w-4xl"><h2 className="text-4xl font-medium">FAQ</h2><div className="mt-8 space-y-3">{faq.map(([q, a], i) => <div key={q} className="rounded-2xl border border-[#e4d8c8] bg-[#fcfaf6] p-4"><button className="flex w-full items-center justify-between text-left font-medium" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{q} <ArrowRight className={`transition ${openFaq === i ? 'rotate-90' : ''}`} size={16} /></button>{openFaq === i && <p className="mt-3 text-[#665b4d]">{a}</p>}</div>)}</div></div></section>

      <section id="contacts" className="bg-section-warm py-24"><div className="section-wrap grid gap-10 lg:grid-cols-2"><div className="space-y-3"><h2 className="text-4xl font-medium">Контакты</h2><p className="inline-flex items-center gap-2 text-lg"><PhoneCall size={18} className="text-[#a67f4a]" /> {PHONE}</p><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-[#c6a46c] px-5 py-3 font-semibold text-[#2f2417] shadow-button">Telegram</a><div className="rounded-2xl border border-[#e4d8c8] bg-[#fcfaf6] p-4 text-sm text-[#635848]"><p className="font-semibold text-[#423729]">Реквизиты ИП (пример)</p><p>ИП Иванов Иван Иванович, ИНН 000000000000, ОГРНИП 000000000000000</p><p>Юр. адрес: Луганск, ЛНР.</p></div></div><form className="space-y-3 rounded-3xl border border-[#e4d8c8] bg-[#fcfaf6] p-6"><input className="w-full rounded-xl border border-[#e5dccf] bg-white p-3" placeholder="Имя" /><input className="w-full rounded-xl border border-[#e5dccf] bg-white p-3" placeholder="Телефон" /><input className="w-full rounded-xl border border-[#e5dccf] bg-white p-3" placeholder="Удобное время для связи" /><label className="flex items-start gap-2 text-sm text-[#635849]"><input type="checkbox" /> Согласен(на) на обработку персональных данных</label><button className="rounded-xl bg-[#c6a46c] px-5 py-3 font-semibold text-[#2f2417]"><Timer size={16} className="mr-1 inline" /> Отправить заявку</button></form></div></section>
    </main>
  );
}
