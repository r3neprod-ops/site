'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AutoImageSlider({ images, alt, intervalMs = 3000 }) {
  const safeImages = Array.isArray(images) && images.length ? images : ['/images/placeholders/complex.svg'];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  useEffect(() => {
    if (safeImages.length <= 1 || paused) return undefined;
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % safeImages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [safeImages.length, paused, intervalMs]);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStart.current === null || safeImages.length <= 1) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) setIndex((v) => (v + 1) % safeImages.length);
      else setIndex((v) => (v - 1 + safeImages.length) % safeImages.length);
    }
    touchStart.current = null;
  };

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#e7dbca] bg-[#f2ece2]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {safeImages.map((src, i) => (
        <Image
          key={`${src}-${i}`}
          src={src}
          alt={`${alt} — фото ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className={`object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {safeImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-3 py-1.5">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Показать слайд ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/55'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
