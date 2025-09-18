import React from 'react';

export default function Header() {
  return (
    <header style={{
      position:'sticky', top:0, zIndex:50, background:'var(--sm-white)',
      borderBottom:'1px solid rgba(0,0,0,.08)', padding:'10px 16px'
    }}>
      <div style={{display:'flex', alignItems:'center', gap:12, maxWidth:1060, margin:'0 auto'}}>
        <img src="/logo.png" alt="SlabMetrics" height={28} />
        <div style={{fontWeight:800, letterSpacing:.2}}>SlabMetrics</div>
      </div>
    </header>
  );
}
