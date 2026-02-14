'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AutoImageSlider } from '../src/components/AutoImageSlider.mjs';

export function ComplexesCarousel() {
  const ref = useRef(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/complexes');
        const data = await res.json();
        if (active) setCards(Array.isArray(data.cards) ? data.cards : []);
      } catch {
        if (active) setCards([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  if (!loading && cards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {['Студии', '1к', '2к', 'С ремонтом', 'Рядом парк'].map((tag) => <button key={tag} className="rounded-full border border-[#dfd4c4] bg-[#f8f3eb] px-4 py-2 text-sm text-[#6c5c47] hover:bg-[#f2ebe1]">{tag}</button>)}
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={() => scroll(-1)} className="rounded-full border border-[#dfd4c4] bg-white p-2 text-[#6e5a3d]" aria-label="Прокрутить влево"><ChevronLeft size={18} /></button>
        <button onClick={() => scroll(1)} className="rounded-full border border-[#dfd4c4] bg-white p-2 text-[#6e5a3d]" aria-label="Прокрутить вправо"><ChevronRight size={18} /></button>
      </div>
      <div ref={ref} className="flex snap-x gap-4 overflow-x-auto pb-2">
        {cards.map((item) => (
          <article key={item.id} className="card-lift min-w-[320px] snap-start rounded-3xl border border-[#e4d8c8] bg-[#fcfaf6] p-5">
            <AutoImageSlider images={item.images} alt={item.name} intervalMs={3000} />
            <h3 className="mt-4 text-2xl font-medium">{item.name}</h3>
            <p className="mt-2 text-sm text-[#655949]">{item.summary}</p>
            {item.facts?.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-[#7b6b56]">
                {item.facts.slice(0, 3).map((fact) => <li key={fact}>• {fact}</li>)}
              </ul>
            )}
            <a href={item.url} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-full bg-[#c6a46c] px-4 py-2 text-sm font-semibold text-[#2f2417]">
              Подробнее
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
