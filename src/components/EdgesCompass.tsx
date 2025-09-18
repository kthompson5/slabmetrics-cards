import React, { useEffect, useRef } from 'react';
export default function EdgesCompass({values}:{values:{top:number;right:number;bottom:number;left:number}}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.classList.add('on'); io.disconnect(); } },{threshold:.2});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  const Bar=({v,label}:{v:number;label:string})=>(
    <div style={{display:'grid',gap:6}}>
      <div className="bar" data-v={v}><span/></div>
      <div style={{fontSize:11,color:'var(--sm-black)'}}>{label} {v}</div>
    </div>
  );
  return (
    <div ref={ref} className="edges" style={{display:'grid',gap:8}}>
      <Bar v={values.top} label="Top" />
      <Bar v={values.right} label="Right" />
      <Bar v={values.bottom} label="Bottom" />
      <Bar v={values.left} label="Left" />
      <style>{`
        .edges .bar{height:8px; background:rgba(0,0,0,.08); border-radius:8px; overflow:hidden;}
        .edges .bar span{display:block; height:100%; width:0; background:var(--sm-green);}
        .edges.on .bar[data-v] span{ width: calc((attr(data-v number) / 10) * 100%); transition: width .8s ease;}
      `}</style>
    </div>
  );
}
