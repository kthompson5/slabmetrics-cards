import React, { useState } from 'react';
export default function WeightNote({front=0.8, back=0.2}:{front?:number; back?:number}) {
  const [open,setOpen]=useState(false);
  return (
    <div style={{position:'relative', display:'inline-block'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{fontSize:12, padding:'6px 10px', borderRadius:999, border:'1px solid rgba(0,0,0,.12)', background:'white', cursor:'pointer'}}>
        Front {(front*100)|0}% / Back {(back*100)|0}%
      </button>
      {open && (
        <div role="dialog" style={{position:'absolute', top:'calc(100% + 6px)', left:0, background:'white', border:'1px solid rgba(0,0,0,.12)', borderRadius:10, padding:10, width:240, boxShadow:'0 6px 20px rgba(0,0,0,.08)'}}>
          Overall grade = (Front avg × {front}) + (Back avg × {back})
        </div>
      )}
    </div>
  );
}
