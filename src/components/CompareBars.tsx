import React, { useEffect, useRef } from 'react';

function makeBins(grades:number[], step=0.5){
  if (!grades?.length) return { labels:[], counts:[] };
  const min = 1.0, max = 10.0;
  const bins: Record<string, number> = {};
  for (let start=min; start<max; start+=step){
    const end = +(start + step - 0.0001).toFixed(1);
    bins[`${start.toFixed(1)}–${end.toFixed(1)}`] = 0;
  }
  bins['10.0'] = 0;
  for (const g of grades){
    if (g >= 10) { bins['10.0']++; continue; }
    const idx = Math.max(0, Math.floor((g - min) / step));
    const start = (min + idx*step).toFixed(1);
    const end = (min + (idx+1)*step - 0.1).toFixed(1);
    const key = `${start}–${end}`;
    if (bins[key] != null) bins[key]++; else bins[key]=1;
  }
  const labels = Object.keys(bins);
  const counts = labels.map(l => bins[l]);
  return { labels, counts };
}

export default function CompareBars({
  distribution,
  grades
}:{distribution?:Record<string,number>, grades?:number[]}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const started = useRef(false as boolean);

  useEffect(()=> {
    const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(async ([e])=>{
      if(e.isIntersecting && !started.current){
        started.current=true;
        const { default: Chart } = await import('chart.js/auto');

        let labels:string[] = [];
        let data:number[] = [];
        if (grades?.length) {
          const b = makeBins(grades, 0.5);
          labels = b.labels; data = b.counts;
        } else if (distribution) {
          labels = Object.keys(distribution);
          data = labels.map(l => distribution[l]);
        }

        // @ts-ignore
        new Chart(el, {
          type:'bar',
          data:{ labels, datasets:[{ data, backgroundColor: getComputedStyle(el).color }] },
          options:{ responsive:true, plugins:{ legend:{display:false}, title:{ display:true, text: grades ? 'Grade Distribution (0.5 increments)' : 'Grade Distribution' } },
            scales:{ x:{ grid:{ color:'rgba(0,0,0,0.06)'} }, y:{ grid:{color:'rgba(0,0,0,0.06)'} } } }
        });
        io.disconnect();
      }
    }, {threshold:.2});
    io.observe(el); return ()=>io.disconnect();
  }, [distribution, grades]);

  return <div style={{color:'var(--sm-green)'}}><canvas ref={ref} aria-label="Grade distribution"/></div>;
}
