import React, { useEffect, useRef } from 'react';
export default function MiniDial({value,label}:{value:number;label:string}) {
  const R=18, C=2*Math.PI*R, pct=Math.max(0,Math.min(1,value/10));
  const ref = useRef<SVGCircleElement>(null);
  useEffect(()=>{ const c=ref.current; if(!c) return; c.style.strokeDasharray=String(C); c.style.strokeDashoffset=String(C);
    const t0=performance.now(),dur=700, target=C*(1-pct);
    const mql=window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mql.matches){ c.style.strokeDashoffset=String(target); return; }
    const tick=(t:number)=>{ const k=Math.min(1,(t-t0)/dur); c.style.strokeDashoffset=String(C+(target-C)*k); if(k<1) requestAnimationFrame(tick) };
    requestAnimationFrame(tick);
  },[C,pct]);
  return (
    <div style={{display:'grid',placeItems:'center', gap:6, color:'var(--sm-green)'}}>
      <svg width="56" height="56" viewBox="0 0 56 56" role="img" aria-label={`${label} ${value} of 10`}>
        <circle cx="28" cy="28" r={R} stroke="rgba(0,0,0,.10)" strokeWidth="6" fill="none"/>
        <circle ref={ref} cx="28" cy="28" r={R} stroke="currentColor" strokeWidth="6" fill="none"
          strokeLinecap="round" transform="rotate(-90 28 28)"/>
        <text x="28" y="31" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--sm-black)">{value}</text>
      </svg>
      <div style={{fontSize:12, color:'var(--sm-black)'}}>{label}</div>
    </div>
  );
}
