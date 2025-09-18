import React, { useEffect, useRef, useState } from 'react';
export default function RemarksReveal({children}:{children:React.ReactNode}) {
  const r=useRef<HTMLDivElement>(null); const [on,setOn]=useState(false);
  useEffect(()=>{ const el=r.current; if(!el) return;
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setOn(true); io.disconnect(); } },{threshold:.2});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  return <div ref={r} style={{opacity:on?1:0, transform:on?'none':'translateY(6px)', transition:'opacity .4s ease, transform .4s ease'}}>{children}</div>;
}
