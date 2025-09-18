import React, { useEffect, useRef } from 'react';
export default function CornersGrid({values}:{values:{tl:number;tr:number;bl:number;br:number}}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{ const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.classList.add('on'); io.disconnect(); } },{threshold:.2});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  const Dot=({v,label}:{v:number;label:string})=>(
    <div title={`${label} ${v}/10`} style={{display:'grid',placeItems:'center', gap:6}}>
      <div className="dot" data-v={v} />
      <div style={{fontSize:11, color:'var(--sm-black)'}}>{label}</div>
    </div>
  );
  return (
    <div ref={ref} className="corners-grid" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
      <Dot v={values.tl} label="TL" />
      <Dot v={values.tr} label="TR" />
      <Dot v={values.bl} label="BL" />
      <Dot v={values.br} label="BR" />
      <style>{`
        .corners-grid .dot{width:38px;height:38px;border-radius:999px;border:2px solid rgba(0,0,0,.12); position:relative; overflow:hidden;}
        .corners-grid.on .dot::after{
          content:''; position:absolute; inset:0; background:var(--sm-green);
          transform-origin:left; transform:scaleX(var(--p,0)); transition:transform .8s ease;
        }
        .corners-grid.on .dot[data-v]::after{ --p: calc(attr(data-v number) / 10); }
      `}</style>
    </div>
  );
}
