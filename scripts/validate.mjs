import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync('src/data/card.schema.json','utf-8'));
const validate = ajv.compile(schema);

function listJson(dir){
  const out=[];
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) out.push(...listJson(p));
    else if(e.isFile() && e.name.endsWith('.json')) out.push(p);
  }
  return out;
}

const files = listJson('src/data/cards');
let ok=true;
for(const f of files){
  const data = JSON.parse(fs.readFileSync(f,'utf-8'));
  const valid = validate(data);
  if(!valid){ ok=false; console.error('❌', f, validate.errors); }
}
if(!ok) process.exit(1);
console.log('✅ All card JSONs valid');
