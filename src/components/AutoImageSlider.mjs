'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AutoImageSlider({ images, alt }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  useEffect(() => {
    if (images.length <= 1 || paused) return undefined;
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length, paused]);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) setIndex((v) => (v + 1) % images.length);
      else setIndex((v) => (v - 1 + images.length) % images.length);
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
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} — фото ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className={`object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-3 py-1.5">
          {images.map((_, i) => (
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
