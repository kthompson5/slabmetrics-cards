export function overallFromSubgrades(front: any, back: any, weights = { front: 0.8, back: 0.2 }) {
  const avgCorners = (c: any) => (c.tl + c.tr + c.bl + c.br) / 4;
  const avgEdges   = (e: any) => (e.top + e.right + e.bottom + e.left) / 4;
  const avgFace = (f: any) => (f.surface + f.centering + avgCorners(f.corners) + avgEdges(f.edges)) / 4;
  const gFront = avgFace(front);
  const gBack  = avgFace(back);
  return +(gFront * weights.front + gBack * weights.back).toFixed(1);
}
