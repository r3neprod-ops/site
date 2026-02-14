'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { complexes } from './content';

export function ComplexesCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!ref.current || paused) return;
      ref.current.scrollBy({ left: 340, behavior: 'smooth' });
      if (ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 10) {
        ref.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 3500);
    return () => clearInterval(id);
  }, [paused]);

  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {['Студии', '1к', '2к', 'С ремонтом', 'Рядом парк'].map((tag) => (
          <button key={tag} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
            {tag}
          </button>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={() => scroll(-1)} className="rounded-full border border-white/20 p-2"><ChevronLeft size={18} /></button>
        <button onClick={() => scroll(1)} className="rounded-full border border-white/20 p-2"><ChevronRight size={18} /></button>
      </div>
      <div
        ref={ref}
        className="flex snap-x gap-4 overflow-x-auto pb-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {complexes.map((item) => (
          <motion.article key={item.name} drag="x" dragConstraints={{ left: -20, right: 20 }} className="card-lift min-w-[310px] snap-start rounded-3xl border border-white/15 bg-white/5 p-6">
            <p className="mb-3 text-sm text-neon">ЖК</p>
            <h3 className="text-2xl font-semibold">{item.name}</h3>
            <p className="mt-3 text-slate-300">{item.description}</p>
            <ul className="mt-4 space-y-1 text-sm text-slate-300">
              {item.perks.map((perk) => <li key={perk}>• {perk}</li>)}
            </ul>
            <a href={item.url} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-full bg-neon px-4 py-2 text-sm font-semibold text-slate-900">
              Подробнее
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
