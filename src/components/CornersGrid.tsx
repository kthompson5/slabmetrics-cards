import React, { useEffect, useRef } from 'react';

export default function CornersGrid({values}:{values:{tl:number;tr:number;bl:number;br:number}}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{ const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.classList.add('on'); io.disconnect(); } },{threshold:.2});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  const allZero = Object.values(values).every(v => !v || v <= 0);

  return (
    <div>
      <div style={{fontWeight:700, marginBottom:6}}>Corners</div>
      {allZero ? (
        <div className="muted" style={{fontSize:12}}>No data</div>
      ) : (
        <div ref={ref} className="corners-grid" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
          {(['tl','tr','bl','br'] as const).map(key => (
            <div key={key} title={`${key.toUpperCase()} ${values[key]}/10`} style={{display:'grid',placeItems:'center',gap:6}}>
              <div className="dot" data-v={values[key]}>
                <span className="num">{values[key]}</span>
              </div>
              <div style={{fontSize:11}}>{key.toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .corners-grid .dot{width:48px;height:48px;border-radius:999px;border:2px solid rgba(0,0,0,.12);position:relative;overflow:hidden}
        .corners-grid .dot::after{content:''; position:absolute; inset:0; background:var(--sm-green); transform:scaleX(0); transform-origin:left}
        .corners-grid.on .dot[data-v]::after{ transform: scaleX(calc(attr(data-v number) / 10)); transition: transform .8s ease }
        .corners-grid .num{ position:absolute; inset:0; display:grid; place-items:center; font-size:12px; font-weight:700; color:var(--sm-black) }
      `}</style>
    </div>
  );
}
