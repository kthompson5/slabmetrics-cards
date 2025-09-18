import fs from 'node:fs';
import path from 'node:path';

export type Card = any;

const DATA_DIR = path.resolve('src/data/cards');

function listJsonFiles(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listJsonFiles(p));
    else if (e.isFile() && e.name.endsWith('.json')) out.push(p);
  }
  return out;
}

export function getAllCards(): Card[] {
  const files = listJsonFiles(DATA_DIR);
  return files.map(f => JSON.parse(fs.readFileSync(f, 'utf-8')));
}

export function getCardById(id: string): Card | null {
  const direct = path.join(DATA_DIR, `${id}.json`);
  if (fs.existsSync(direct)) return JSON.parse(fs.readFileSync(direct, 'utf-8'));
  return getAllCards().find(c => c.id === id) ?? null;
}
