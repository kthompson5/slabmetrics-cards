import React, { useState } from 'react';

export default function WeightNote({front=0.8, back=0.2}:{front?:number; back?:number}) {
  const [open,setOpen]=useState(false);
  const frontPct=(front*100).toFixed(0), backPct=(back*100).toFixed(0);
  return (
    <div className="weight-wrap">
      <button className="weight-btn" onClick={()=>setOpen(o=>!o)}>
        Front {frontPct}% / Back {backPct}%
      </button>
      {open && (
        <div className="weight-pop" role="dialog" aria-label="Weighting explanation">
          Overall = (Front avg × {front}) + (Back avg × {back})<br/>
          Example: 9.6×{front} + 9.0×{back} = <strong>9.4</strong>
        </div>
      )}
      <style>{`
        .weight-wrap{ position:relative; display:inline-block }
        .weight-btn{ font-size:12px; padding:6px 10px; border-radius:999px; border:1px solid rgba(0,0,0,.12); background:#fff; cursor:pointer }
        .weight-pop{
          position:absolute; top:calc(100% + 6px); left:50%; transform:translateX(-50%);
          background:#fff; border:1px solid rgba(0,0,0,.12); border-radius:10px; padding:10px; width:min(260px, 90vw);
          box-shadow:0 8px 30px rgba(0,0,0,.08); z-index:100;
        }
        @media (min-width: 720px){ .weight-pop{ left:0; transform:none } }
      `}</style>
    </div>
  );
}
