import { COMPLEX_URLS } from '../data/complexUrls.mjs';
import { fetchDomclickComplex } from './fetchDomclickComplex.mjs';

function trimSummary(summary, max = 140) {
  if (!summary || summary.length <= max) return summary;
  const slice = summary.slice(0, max);
  const safe = slice.slice(0, slice.lastIndexOf(' '));
  return `${safe || slice}…`;
}

function fallbackCard(url) {
  const slug = url.split('/complexes/')[1]?.split('__')[0] || 'complex';
  return {
    url,
    id: slug,
    name: slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()),
    summary: 'Данные Домклик временно недоступны. Откройте карточку ЖК по кнопке «Подробнее».',
    facts: [],
    images: ['/images/placeholders/complex.svg'],
  };
}

export async function getComplexCards() {
  const raw = await Promise.allSettled(COMPLEX_URLS.map((url) => fetchDomclickComplex(url)));

  return raw.map((item, index) => {
    const card = item.status === 'fulfilled' ? item.value : fallbackCard(COMPLEX_URLS[index]);
    return {
      ...card,
      summary: trimSummary(card.summary, 140),
      images: Array.isArray(card.images) && card.images.length ? card.images : ['/images/placeholders/complex.svg'],
      facts: Array.isArray(card.facts) ? card.facts.slice(0, 4) : [],
    };
  });
}
