'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PHONE, TELEGRAM_URL } from './content.mjs';

const optionSteps = [
  ['type', ['Студия', '1к', '2к', '3к+']],
  ['budget', ['4–6 млн', '6–8 млн', '8–10 млн', '10+ млн', 'Свой бюджет']],
  ['finish', ['Без отделки', 'Чистовая', 'Ремонт']],
  ['downPayment', ['Нет', 'До 10%', '10–20%', '20%+']],
  ['timing', ['1–2 мес', '3–6 мес', '6+ мес', 'Просто смотрю']],
];

const toLabel = {
  type: 'Тип квартиры',
  budget: 'Бюджет',
  finish: 'Отделка',
  downPayment: 'Первоначальный взнос',
  timing: 'Срок покупки',
};

const maskPhone = (value) => {
  const d = value.replace(/\D/g, '').slice(0, 11);
  const z = d.startsWith('7') ? d : `7${d.slice(1)}`;
  const p = z.match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  if (!p) return '+7';
  return `+${p[1]}${p[2] ? ` (${p[2]}` : ''}${p[2]?.length === 3 ? ')' : ''}${p[3] ? ` ${p[3]}` : ''}${p[4] ? `-${p[4]}` : ''}${p[5] ? `-${p[5]}` : ''}`;
};

export function QuizWizard({ scenario, compact }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [answers, setAnswers] = useState({ scenario, name: '', phone: '', telegram: '', consent: false });

  const progress = ((step + 1) / 6) * 100;
  const current = optionSteps[step];

  const telegramMessage = useMemo(() => {
    const lines = [
      'Новая заявка с квиза:',
      answers.scenario ? `Сценарий: ${answers.scenario}` : null,
      ...optionSteps.map(([key]) => `${toLabel[key]}: ${answers[key] || '-'}`),
      `Имя: ${answers.name || '-'}`,
      `Телефон: ${answers.phone || '-'}`,
      `Telegram: ${answers.telegram || '-'}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  }, [answers]);

  const submitLead = async (e) => {
    e.preventDefault();
    if (!answers.consent || answers.phone.replace(/\D/g, '').length < 11) return;
    setSaving(true);
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    setSaving(false);
    if (res.ok) setDone(true);
  };

  return (
    <div className={`rounded-3xl border border-[#e3d8c6] bg-[#fcfaf6] p-5 shadow-soft ${compact ? '' : 'lg:p-8'}`}>
      <div className="mb-5 h-2 rounded-full bg-[#ece4d8]"><motion.div className="h-full rounded-full bg-[#c6a46c]" animate={{ width: `${progress}%` }} /></div>
      {!done && current && (
        <div className="space-y-4">
          <p className="text-sm text-[#7b6f5e]">Шаг {step + 1} из 6</p>
          <h3 className="text-xl font-medium">{toLabel[current[0]]}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {current[1].map((option) => {
              const active = answers[current[0]] === option;
              return <button type="button" key={option} onClick={() => setAnswers((v) => ({ ...v, [current[0]]: option }))} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-[#c6a46c] bg-[#f5efe3]' : 'border-[#e7ddcf] bg-white hover:bg-[#faf6f1]'}`}>{option}</button>;
            })}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-xl border border-[#ddd2c3] px-4 py-2 disabled:opacity-40"><ChevronLeft className="inline" size={16} /> Назад</button>
            <button type="button" onClick={() => setStep((s) => Math.min(5, s + 1))} disabled={!answers[current[0]]} className="rounded-xl bg-[#c6a46c] px-4 py-2 font-semibold text-[#2f2417] disabled:opacity-40">Далее <ChevronRight className="inline" size={16} /></button>
          </div>
        </div>
      )}
      {!done && step === 5 && (
        <form onSubmit={submitLead} className="space-y-3">
          <p className="text-sm text-[#7b6f5e]">Шаг 6 из 6</p>
          <h3 className="text-xl font-medium">Контакты</h3>
          <input className="w-full rounded-xl border border-[#e6dccf] bg-white p-3" placeholder="Имя" value={answers.name} onChange={(e) => setAnswers((v) => ({ ...v, name: e.target.value }))} />
          <input className="w-full rounded-xl border border-[#e6dccf] bg-white p-3" placeholder="Телефон*" value={answers.phone} onChange={(e) => setAnswers((v) => ({ ...v, phone: maskPhone(e.target.value) }))} required />
          <input className="w-full rounded-xl border border-[#e6dccf] bg-white p-3" placeholder="Telegram (опционально)" value={answers.telegram} onChange={(e) => setAnswers((v) => ({ ...v, telegram: e.target.value }))} />
          <label className="flex items-center gap-2 text-sm text-[#6a604f]"><input type="checkbox" checked={answers.consent} onChange={(e) => setAnswers((v) => ({ ...v, consent: e.target.checked }))} required /> Даю согласие на обработку персональных данных</label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setStep(4)} className="rounded-xl border border-[#ddd2c3] px-4 py-2"><ChevronLeft className="inline" size={16} /> Назад</button>
            <a href={`${TELEGRAM_URL}?text=${telegramMessage}`} className="rounded-xl border border-[#d3bc96] px-4 py-2 text-[#86663a]" target="_blank" rel="noreferrer">Отправить ответы в Telegram</a>
            <button className="rounded-xl bg-[#c6a46c] px-4 py-2 font-semibold text-[#2f2417]" disabled={saving}>{saving ? 'Отправка...' : 'Оставить заявку'}</button>
          </div>
        </form>
      )}
      {done && <div className="space-y-3"><p className="text-sm text-[#947246]">Готово</p><h3 className="text-2xl font-medium">Спасибо! Заявка принята.</h3><p className="text-[#5e5344]">Свяжусь с вами и отправлю персональный подбор под ипотеку 2%.</p><p className="text-sm text-[#7d6f5e]">Либо сразу напишите: {PHONE}</p></div>}
    </div>
  );
}
