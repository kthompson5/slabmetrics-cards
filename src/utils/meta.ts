export function makeOg(card: any, site: string) {
  const title = `${card.player} — ${card.set}${card.variant ? ` (${card.variant})` : ''} | SlabMetrics`;
  const desc = `Grade ${card.grade_overall ?? ''} · ${card.player} · ${card.set}${card.number ? ` · ${card.number}` : ''}`;
  const url = `${site}/cards/${card.id}/`;
  const img = card.images.front?.startsWith('http') ? card.images.front : `${site}${card.images.front}`;
  return { title, desc, url, img };
}

export function productJsonLd(card: any, site: string) {
  const url = `${site}/cards/${card.id}/`;
  const images = [card.images.front, card.images.back].filter(Boolean).map((u: string) => u?.startsWith('http') ? u : `${site}${u}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${card.player} — ${card.set}${card.variant ? ` (${card.variant})` : ''}`,
    "sku": card.serial,
    "image": images,
    "description": `Suggested grade ${card.grade_overall ?? ''}.`,
    "brand": { "@type": "Brand", "name": "SlabMetrics" },
    "url": url
  };
}
