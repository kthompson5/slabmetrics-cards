import React, { useEffect, useRef } from 'react';

export default function GradeGauge({ value, max = 10, label='Overall' }:{value:number; max?:number; label?:string;}) {
  const R=56; const C=2*Math.PI*R; const pct=Math.max(0, Math.min(1, value/max));
  const ref = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const c=ref.current; if(!c) return;
    const target = C*(1-pct); const t0=performance.now(); const dur=900; const start=C;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) { c.style.strokeDasharray=String(C); c.style.strokeDashoffset=String(target); return; }
    c.style.strokeDasharray=String(C); c.style.strokeDashoffset=String(C);
    const tick=(t:number)=>{ const k=Math.min(1,(t-t0)/dur); const eased=1-Math.pow(1-k,2);
      c.style.strokeDashoffset=String(start+(target-start)*eased); if(k<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [C, pct]);
  return (
    <div style={{display:'grid',placeItems:'center', color:'var(--sm-green)'}}>
      <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`${label} ${value} of ${max}`}>
        <circle cx="70" cy="70" r={R} stroke="rgba(0,0,0,.10)" strokeWidth="12" fill="none"/>
        <circle ref={ref} cx="70" cy="70" r={R} stroke="currentColor" strokeWidth="12" fill="none"
          strokeLinecap="round" transform="rotate(-90 70 70)"/>
        <text x="70" y="68" textAnchor="middle" fontSize="28" fontWeight="800" fill="var(--sm-black)">{value}</text>
        <text x="70" y="92" textAnchor="middle" fontSize="12" fill="var(--sm-black)" opacity=".8">{label}</text>
      </svg>
    </div>
  );
}
