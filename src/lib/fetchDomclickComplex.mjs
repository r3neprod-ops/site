const FALLBACK_IMAGE = '/images/placeholders/complex.svg';

function decodeHtml(value = '') {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickName(html, url) {
  const h1Pattern = html.match(/#\s*ЖК\s*"(.*?)"/i);
  if (h1Pattern?.[1]) return decodeHtml(h1Pattern[1]);

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) {
    return decodeHtml(title.replace(/[-–—]\s*Домклик.*/i, '').replace(/\|\s*Домклик.*/i, ''));
  }

  const slug = url.split('/complexes/')[1]?.split('__')[0] || 'zhk';
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function extractFacts(html) {
  const labels = ['Срок сдачи', 'Класс жилья', 'Варианты отделки', 'Этажность', 'Площади квартир'];
  const cleaned = html.replace(/\n/g, ' ').replace(/\s+/g, ' ');

  return labels
    .map((label) => {
      const pattern = new RegExp(`${label}[^A-Za-zА-Яа-я0-9]{0,40}([^<>{}"\\]{2,80})`, 'i');
      const value = cleaned.match(pattern)?.[1];
      if (!value) return null;
      return `${label}: ${decodeHtml(value)}`;
    })
    .filter(Boolean)
    .slice(0, 4);
}

function buildSummary(facts) {
  if (!facts.length) return 'Актуальные планировки, условия покупки и параметры ЖК уточняются по запросу.';
  return facts
    .map((fact) => fact.replace(/^Срок сдачи:\s*/i, 'сдача ').replace(/^Класс жилья:\s*/i, '').replace(/^Варианты отделки:\s*/i, '').replace(/^Этажность:\s*/i, '').replace(/^Площади квартир:\s*/i, 'площади '))
    .slice(0, 4)
    .join(' • ');
}

function getImages(html) {
  const matches = html.match(/https:\/\/img\.dmclk\.ru\/[^\s"'<>]+/g) || [];
  const unique = [...new Set(matches.map((item) => item.replace(/\\u002F/g, '/').replace(/&amp;/g, '&')))];
  return unique.slice(0, 8);
}

export async function fetchDomclickComplex(url) {
  const response = await fetch(url, {
    next: { revalidate: 86400 },
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; svoydom-bot/1.0)',
      accept: 'text/html',
    },
  });

  if (!response.ok) {
    const slug = url.split('/complexes/')[1]?.split('__')[0] || 'complex';
    return {
      url,
      id: slug,
      name: slug.replace(/[-_]+/g, ' '),
      summary: 'Данные временно недоступны. Откройте карточку на Домклик по кнопке «Подробнее».',
      facts: [],
      images: [FALLBACK_IMAGE],
    };
  }

  const html = await response.text();
  const id = (url.split('/complexes/')[1]?.split('__')[0] || 'complex').trim();
  const name = pickName(html, url);
  const facts = extractFacts(html);
  const summary = buildSummary(facts);
  const images = getImages(html);

  return {
    url,
    id,
    name,
    summary,
    facts,
    images: images.length ? images : [FALLBACK_IMAGE],
  };
}
