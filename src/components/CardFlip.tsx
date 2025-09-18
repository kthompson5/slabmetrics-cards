import React, { useRef, useState } from 'react';

export default function CardFlip({ front, back, frontThumb, backThumb }:{
  front:string; back?:string; frontThumb?:string; backThumb?:string;
}) {
  const [flipped,setFlipped]=useState(false); const [zoom,setZoom]=useState(false);
  const startX=useRef<number|null>(null);
  function onTouchStart(e:React.TouchEvent){ startX.current=e.touches[0].clientX; }
  function onTouchEnd(e:React.TouchEvent){ if(startX.current==null) return;
    const dx=e.changedTouches[0].clientX - startX.current;
    if(Math.abs(dx)>40 && back) setFlipped(dx<0 ? true : false); startX.current=null; }
  const cur = flipped && back ? {src: zoom ? back : (backThumb||back), alt:'Card back'} : {src: zoom ? front : (frontThumb||front), alt:'Card front'};
  return (
    <div style={{display:'grid',gap:8, justifyItems:'center'}}>
      <img src={cur.src} alt={cur.alt}
        style={{width:'min(480px, 92vw)', borderRadius:12, cursor:'pointer'}}
        onClick={()=> setZoom(z => !z)}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} />
      <div style={{fontSize:12,opacity:.8}}>
        {back ? 'Tap/click to zoom · Swipe or click to flip' : 'Tap/click to zoom'}
      </div>
    </div>
  );
}
