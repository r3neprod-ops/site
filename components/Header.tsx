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
      animate={{ height: scrolled ? 68 : 86 }}
      className={`fixed top-0 z-50 w-full border-b transition ${
        scrolled ? 'border-[#e4d7c2] bg-[#faf7f2]/90 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="section-wrap flex h-full items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-3 text-ink">
          <span className="h-5 w-[1px] bg-[#bfa177]" />
          <span className="text-xl tracking-[0.02em]">
            <span className="font-normal">Свой</span>
            <span className="font-semibold text-[#8e7042]">Дом</span>
          </span>
        </a>
        <nav className="hidden gap-6 text-sm text-[#5c5144] lg:flex">
          {links.map(([name, href]) => (
            <a key={name} href={href} className="transition hover:text-[#8e7042]">
              {name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={onOpenQuiz} className="rounded-full bg-[#c6a46c] px-4 py-2 text-sm font-semibold text-[#2f2417] shadow-button transition hover:-translate-y-0.5">
            Пройти квиз
          </button>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            className="rounded-full border border-[#d6c5ab] bg-white/70 px-4 py-2 text-sm font-medium text-[#5c4d39] transition hover:bg-white"
            rel="noreferrer"
          >
            Telegram
          </a>
        </div>
      </div>
    </motion.header>
  );
}
