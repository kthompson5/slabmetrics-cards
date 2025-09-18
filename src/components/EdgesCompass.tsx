import React, { useEffect, useRef } from 'react';

export default function EdgesCompass({values}:{values:{top:number;right:number;bottom:number;left:number}}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.classList.add('on'); io.disconnect(); } },{threshold:.2});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  const keys = ['top','right','bottom','left'] as const;
  const allZero = keys.every(k => !values[k] || values[k] <= 0);

  return (
    <div>
      <div style={{fontWeight:700, marginBottom:6}}>Edges</div>
      {allZero ? (
        <div className="muted" style={{fontSize:12}}>No data</div>
      ) : (
        <div ref={ref} className="edges" style={{display:'grid',gap:8}}>
          {keys.map(k => (
            <div key={k}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                <span style={{textTransform:'capitalize'}}>{k}</span>
                <span>{values[k]}</span>
              </div>
              <div className="bar" data-v={values[k]}><span/></div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .edges .bar{height:8px;background:rgba(0,0,0,.08);border-radius:8px;overflow:hidden}
        .edges .bar span{display:block;height:100%;width:0;background:var(--sm-green)}
        .edges.on .bar[data-v] span{ width: calc((attr(data-v number) / 10) * 100%); transition: width .8s ease }
      `}</style>
    </div>
  );
}
