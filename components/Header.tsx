'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TELEGRAM_URL } from './content';
import { ThemeToggle } from './ThemeToggle';

type Props = { onOpenQuiz: () => void };

const links = [
  ['Услуги', '#services'],
  ['ЖК', '#complexes'],
  ['Как работаю', '#steps'],
  ['Отзывы', '#reviews'],
  ['FAQ', '#faq'],
  ['Контакты', '#contacts'],
];

export function Header({ onOpenQuiz }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      animate={{ height: scrolled ? 66 : 82 }}
      className={`fixed top-0 z-50 w-full border-b transition ${
        scrolled ? 'border-white/15 bg-slate-950/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="section-wrap flex h-full items-center justify-between gap-5">
        <a href="#top" className="text-lg font-semibold tracking-wide text-white">
          Свой Дом
        </a>
        <nav className="hidden gap-6 text-sm text-slate-200 lg:flex">
          {links.map(([name, href]) => (
            <a key={name} href={href} className="transition hover:text-neon">
              {name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onOpenQuiz}
            className="shine rounded-full bg-neon px-4 py-2 text-sm font-semibold text-slate-950 transition active:scale-95"
          >
            Пройти квиз
          </button>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            rel="noreferrer"
          >
            Telegram
          </a>
        </div>
      </div>
    </motion.header>
  );
}
