/* global React, navigate */
const { useState: useStateD, useRef: useRefD } = React;

/* Concentric diagram with clickable half-rings.
   - Outer ring split: top half → Governance, bottom half → Infrastructuur & Data
   - Middle ring split: top half → Cultuur & Adoptie, bottom half → Kennis & Capaciteit
   - Center disc → /domeinen overview (Digitale Assistent)
*/
function FrameworkDiagram({ onSelectDomain, onSelectAll }) {
  const wrapRef = useRefD(null);
  const [hover, setHover] = useStateD(null);

  const cx = 250, cy = 250;
  const rOuter = 220, rMid = 150, rInner = 75;

  // Build a half-annulus path: from angle start to end at given outer+inner radii
  function polar(angle, r) {
    const a = (angle - 90) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  function annulus(rOut, rIn, startA, endA) {
    const [x1,y1] = polar(startA, rOut);
    const [x2,y2] = polar(endA, rOut);
    const [x3,y3] = polar(endA, rIn);
    const [x4,y4] = polar(startA, rIn);
    return `M ${x1} ${y1} A ${rOut} ${rOut} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 0 0 ${x4} ${y4} Z`;
  }

  const segs = [
    { id: 'governance',         label: 'Governance',           y: cy - (rOuter + rMid) / 2, color: '#cce0ee', hover: '#b9d3e5', fill: '#0b3d68', start: 270, end: 90,  rOut: rOuter, rIn: rMid },
    { id: 'infrastructuur-data',label: 'Infrastructuur & Data',y: cy + (rOuter + rMid) / 2, color: '#cce0ee', hover: '#b9d3e5', fill: '#0b3d68', start: 90,  end: 270, rOut: rOuter, rIn: rMid },
    { id: 'cultuur-adoptie',    label: 'Cultuur & Adoptie',    y: cy - (rMid + rInner) / 2, color: '#8fcae7', hover: '#7bbfe4', fill: '#0b3d68', start: 270, end: 90,  rOut: rMid,   rIn: rInner },
    { id: 'kennis-capaciteit',  label: 'Kennis & Capaciteit',  y: cy + (rMid + rInner) / 2, color: '#8fcae7', hover: '#7bbfe4', fill: '#0b3d68', start: 90,  end: 270, rOut: rMid,   rIn: rInner },
  ];

  return (
    <div className="diagram-wrap" ref={wrapRef}>
      <svg className="diagram-svg" viewBox="0 0 500 500" role="img"
           aria-label="Raamwerk diagram: klik op een ring voor het bijbehorende domein">
        <defs>
          <filter id="softShadow2" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity=".10"/>
          </filter>
        </defs>

        {/* drop shadow behind everything */}
        <circle cx={cx} cy={cy} r={rOuter} fill="#cce0ee" filter="url(#softShadow2)" pointerEvents="none"/>

        {/* Clickable half-ring segments */}
        {segs.map(s => {
          const isHover = hover === s.id;
          return (
            <g key={s.id}
               onMouseEnter={() => setHover(s.id)}
               onMouseLeave={() => setHover(null)}
               onClick={() => onSelectDomain(s.id)}
               style={{ cursor: 'pointer' }}>
              <path d={annulus(s.rOut, s.rIn, s.start, s.end)}
                    fill={isHover ? s.hover : s.color}
                    style={{ transition: 'fill .15s ease' }}/>
              <text x={cx} y={s.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize="12" fontWeight="700" letterSpacing="1.4"
                    fill={s.fill} pointerEvents="none"
                    style={{ textTransform: 'uppercase', textDecoration: isHover ? 'underline' : 'none' }}>
                {s.label}
              </text>
            </g>
          );
        })}

        {/* Center disc — Digitale Assistent */}
        <g onClick={onSelectAll} style={{ cursor: 'pointer' }}
           onMouseEnter={() => setHover('center')}
           onMouseLeave={() => setHover(null)}>
          <circle cx={cx} cy={cy} r={rInner}
                  fill={hover === 'center' ? '#1d5290' : '#154273'}
                  style={{ transition: 'fill .15s ease' }}/>
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                fontSize="16" fontWeight="700" fill="#fff" pointerEvents="none"
                style={{ textDecoration: hover === 'center' ? 'underline' : 'none' }}>
            Digitale Assistent
          </text>
        </g>
      </svg>
    </div>
  );
}

window.FrameworkDiagram = FrameworkDiagram;
