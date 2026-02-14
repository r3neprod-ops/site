'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="rounded-full border border-[#d9c5a5] bg-white/80 p-2 text-[#7d6741] transition hover:bg-white"
      aria-label="Переключить тему"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
