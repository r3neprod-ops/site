'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
      aria-label="Переключить тему"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
