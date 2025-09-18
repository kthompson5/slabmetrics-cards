import React, { useEffect, useRef } from 'react';

export default function MiniDial({
  value,
  label,
  size = 72  // bigger default
}:{value:number; label:string; size?:number}) {
  const R = Math.round(size * 0.36);  // dial thickness ratio
  const C = 2 * Math.PI * R;
  const pct = Math.max(0, Math.min(1, value / 10));
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    c.style.strokeDasharray = String(C);
    const target = C * (1 - pct);
    const start = C, t0 = performance.now(), dur = 700;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { c.style.strokeDashoffset = String(target); return; }
    const tick = (t:number) => {
      const k = Math.min(1, (t - t0) / dur);
      c.style.strokeDashoffset = String(start + (target - start) * k);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [C, pct]);

  const svg = size;
  const cx = svg/2, cy = svg/2;

  return (
    <div style={{display:'grid', placeItems:'center', gap:6, color:'var(--sm-green)'}}>
      <svg width={svg} height={svg} viewBox={`0 0 ${svg} ${svg}`} role="img" aria-label={`${label} ${value} of 10`}>
        <circle cx={cx} cy={cy} r={R} stroke="rgba(0,0,0,.10)" strokeWidth={Math.max(6, Math.round(size*0.1))} fill="none"/>
        <circle ref={ref} cx={cx} cy={cy} r={R} stroke="currentColor" strokeWidth={Math.max(6, Math.round(size*0.1))} fill="none"
          strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
        <text x={cx} y={cy+3} textAnchor="middle" fontSize={Math.round(size*0.22)} fontWeight="700" fill="var(--sm-black)">{value}</text>
      </svg>
      <div style={{fontSize:12, color:'var(--sm-black)'}}>{label}</div>
    </div>
  );
}
