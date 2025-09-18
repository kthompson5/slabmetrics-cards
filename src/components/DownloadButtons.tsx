import React from 'react';
export default function DownloadButtons({id, front, back}:{id:string; front:string; back?:string}) {
  return (
    <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
      <a className="btn" href={front} download={`${id}-front`} >Download Front</a>
      {back && <a className="btn" href={back} download={`${id}-back`}>Download Back</a>}
      <style>{`.btn{background:var(--sm-green);color:white;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:600}
               .btn:hover{background:var(--sm-green-600)}`}</style>
    </div>
  );
}
