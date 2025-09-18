import React, { useEffect, useRef } from 'react';

export default function CompareBars({distribution}:{distribution:Record<string,number>}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const started = useRef(false as boolean);

  useEffect(()=> {
    const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(async ([e])=>{
      if(e.isIntersecting && !started.current){
        started.current=true;
        const { default: Chart } = await import('chart.js/auto');
        const labels = Array.from({length:10}, (_,i)=> String(i+1));
        const data = labels.map(l => distribution[l] ?? 0);
        // @ts-ignore
        new Chart(el, {
          type:'bar',
          data:{ labels, datasets:[{ data, backgroundColor: getComputedStyle(el).color }] },
          options:{ responsive:true, plugins:{ legend:{display:false} }, scales:{ x:{ grid:{ color:'rgba(0,0,0,0.06)'} }, y:{ grid:{color:'rgba(0,0,0,0.06)'} } } }
        });
        io.disconnect();
      }
    }, {threshold:.2});
    io.observe(el); return ()=>io.disconnect();
  }, [distribution]);

  return <div style={{color:'var(--sm-green)'}}><canvas ref={ref} aria-label="Grade distribution 1 to 10"/></div>;
}
