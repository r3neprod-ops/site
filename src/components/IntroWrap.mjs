import Image from 'next/image';
import { SITE } from '../data/site.mjs';

export function IntroWrap({ children }) {
  const bg = SITE.hero.background;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={bg.src} alt={bg.alt} fill priority className="object-cover" />
        {bg.overlay?.enabled && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.45),rgba(20,20,20,0.25))]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(234,227,217,0.24),transparent_45%)]" />
          </>
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
