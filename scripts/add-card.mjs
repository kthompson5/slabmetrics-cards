import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res => rl.question(q, res));
const ROOT = process.cwd();

function safeId(s){ return s.trim().toUpperCase().replace(/[^A-Z0-9\-]/g,''); }

(async ()=>{
  const id = safeId(await ask('Card ID (e.g., ABC123): '));
  const player = await ask('Player: ');
  const set = await ask('Set: ');
  const number = await ask('Number (optional): ');
  const variant = await ask('Variant (optional): ');
  const serial = await ask('Serial (e.g., SM-2025-000123): ');
  const ebay = await ask('eBay comps URL (optional): ');
  const frontPath = await ask('Local path to FRONT image: ');
  const backPath = await ask('Local path to BACK image (optional): ');

  const dataDir = path.join(ROOT, 'src/data/cards');
  const imgDir = path.join(ROOT, 'public/cards');
  fs.mkdirSync(dataDir, { recursive:true });
  fs.mkdirSync(imgDir, { recursive:true });

  fs.copyFileSync(path.resolve(frontPath), path.join(imgDir, `${id}-front.jpg`));
  if (backPath) fs.copyFileSync(path.resolve(backPath), path.join(imgDir, `${id}-back.jpg`));

  const json = {
    id, serial, player, set,
    number: number || undefined,
    variant: variant || undefined,
    images: {
      front: `/cards/${id}-front.jpg`,
      back: backPath ? `/cards/${id}-back.jpg` : undefined
    },
    graded_at: new Date().toISOString().slice(0,10),
    weights: { front: 0.8, back: 0.2 },
    subgrades: {
      front: { surface: 0, centering: 0, corners:{tl:0,tr:0,bl:0,br:0}, edges:{top:0,right:0,bottom:0,left:0}, remarks:{surface:"",centering:"",corners:"",edges:""} },
      back:  { surface: 0, centering: 0, corners:{tl:0,tr:0,bl:0,br:0}, edges:{top:0,right:0,bottom:0,left:0}, remarks:{surface:"",centering:"",corners:"",edges:""} }
    },
    links: { ebay_comps: ebay || undefined },
    compare: { distribution: {} }
  };
  const out = path.join(dataDir, `${id}.json`);
  fs.writeFileSync(out, JSON.stringify(json, null, 2));
  console.log(`✅ Wrote ${out}`);
  console.log(`✅ Copied images to public/cards/${id}-*.jpg`);
  console.log('Next: git add . && git commit -m "Add card ' + id + '" && git push');
  rl.close();
})();
