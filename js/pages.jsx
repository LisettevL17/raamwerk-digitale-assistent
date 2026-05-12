/* global React, navigate, FrameworkDiagram, DomainGlyph, Icon */
const { useState: useS, useEffect: useE, useMemo: useM, useRef: useR } = React;

const RAAM = window.RAAMWERK;

function boldBeforeColon(text) {
  const idx = text.indexOf(':');
  if (idx === -1) return text;
  return <><strong>{text.slice(0, idx)}</strong>{text.slice(idx)}</>;
}

function ringBg(ringId) {
  const map = { kern: '#e6f0f7', waarborgen: '#e6f0f7', organisatie: '#f3f7fb', governance: '#f3f7fb' };
  return map[ringId] || '#f3f7fb';
}
function ringFg(ringId) {
  const map = { kern: '#154273', waarborgen: '#01689b', organisatie: '#0b3d68', governance: '#0b3d68' };
  return map[ringId] || '#01689b';
}
function ring(ringId) { return RAAM.RINGS.find(r => r.id === ringId); }

/* ============================== HOME ============================== */
function HomePage({ tweaks }) {
  const h = RAAM.HOME;
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">{h.eyebrow}</span>
          <h1>{h.title}</h1>
          {(Array.isArray(h.lede) ? h.lede : [h.lede]).map((p, i) => (
            <p key={i} className="lede">{p}</p>
          ))}
          <p className="lede" style={{ fontSize: 16 }}>{h.lede_sub}</p>
          <div className="hero-meta">
            <div className="stat"><span className="num">13</span><span className="lbl">Domeinen</span></div>
            <div className="stat"><span className="num">4</span><span className="lbl">Fundamenteel</span></div>
            <div className="stat"><span className="num">9</span><span className="lbl">In de assistent</span></div>
            <div className="stat"><span className="num">{RAAM.PRACTICES.length}</span><span className="lbl">Good Practices</span></div>
          </div>
          <div className="hero-cta">
            <button className="btn" onClick={() => navigate('/domeinen')}>Bekijk alle domeinen <Icon.Arrow/></button>
            <button className="btn btn-ghost" onClick={() => navigate('/practices')}>Overzicht Good Practices</button>
          </div>
        </div>
        <div>
          <FrameworkDiagram
            onSelectDomain={(id) => navigate('/domeinen/' + id)}
            onSelectAll={() => navigate('/domeinen#digitale-assistent')}
          />
          <p style={{ textAlign: 'center', color: 'var(--ink-500)', marginTop: 12, fontSize: 14 }}>
            {h.diagram_hint.split(/(segment|midden)/g).map((part, i) =>
              (part === 'segment' || part === 'midden')
                ? <span key={i} style={{ color: 'var(--ro-blue-600)', fontWeight: 600 }}>{part}</span>
                : part
            )}
          </p>
        </div>
      </section>

      <div className="divider-thin" />

      <section className="section">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">{h.rings_section.eyebrow}</span>
            <h2 style={{ marginTop: 6 }}>{h.rings_section.heading}</h2>
            <p>{h.rings_section.description}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {RAAM.RINGS.map(r => (
            <div key={r.id} className="card" style={{ '--ring-color': r.color }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: r.color, display: 'inline-block' }} />
                <span className="eyebrow" style={{ color: r.color === '#cce0ee' ? '#0b3d68' : r.color }}>{r.short}</span>
              </div>
              <h3 style={{ fontSize: 17 }}>{r.label}</h3>
              <p style={{ color: 'var(--ink-700)', fontSize: 14, margin: 0 }}>{r.description}</p>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 'auto', paddingTop: 8 }}>
                {RAAM.DOMAINS.filter(d => d.ring === r.id).length} domeinen
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================== DOMEINEN ============================== */
function DomeinenPage() {
  const FUND_IDS = ['governance','infrastructuur-data','cultuur-adoptie','kennis-capaciteit'];
  const fundamenten = RAAM.DOMAINS.filter(d => FUND_IDS.includes(d.id));
  const overige = RAAM.DOMAINS.filter(d => !FUND_IDS.includes(d.id));
  const renderCard = (d) => {
    const r = ring(d.ring);
    const count = RAAM.PRACTICES.filter(p => p.domains.includes(d.id)).length;
    return (
      <a key={d.id} className="card card-link domain-card"
         style={{ '--ring-color': r.color === '#cce0ee' ? '#0b3d68' : r.color }}
         onClick={(e) => { e.preventDefault(); navigate('/domeinen/' + d.id); }}
         href={'#/domeinen/' + d.id}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <DomainGlyph id={d.id} ring={d.ring} />
          <span className="nr">DOMEIN {String(d.nr).padStart(2, '0')}</span>
        </div>
        <h3>{d.title}</h3>
        <p>{d.short}</p>
        <div className="meta">
          <span className="ring-pill"><span className="ring-dot"/>{r.short}</span>
          <span>{count} good practice{count===1?'':'s'}</span>
        </div>
      </a>
    );
  };
  return (
    <div className="container">
      <div className="section-title-row" style={{ marginBottom: 18 }}>
        <div>
          <span className="eyebrow">Overzicht</span>
          <h1 style={{ marginTop: 6, fontSize: 38 }}>Domeinen van het raamwerk</h1>
          <p className="lede" style={{ marginTop: 10 }}>
            Het raamwerk omvat 13 domeinen: vier fundamentele randvoorwaarden en negen onderdelen van de digitale assistent. Klik op een domein voor de volledige beschrijving, good practices en bronnen.
          </p>
        </div>
      </div>

      <div className="section-header" style={{ display: 'flex', alignItems: 'baseline', gap: 16, margin: '40px 0 4px' }}>
        <span className="eyebrow" style={{ fontSize: 13, letterSpacing: 1.6 }}>{RAAM.HOME.fundamenten_section.label}</span>
        <span style={{ flex: 1, height: 2, background: '#0b3d68' }}/>
        <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{fundamenten.length} randvoorwaarden</span>
      </div>
      <p style={{ color: 'var(--ink-700)', maxWidth: 780, margin: '0 0 22px' }}>
        {RAAM.HOME.fundamenten_section.description}
      </p>
      <div className="domain-grid">{fundamenten.map(renderCard)}</div>

      <div id="digitale-assistent" className="section-header" style={{ display: 'flex', alignItems: 'baseline', gap: 16, margin: '48px 0 4px', scrollMarginTop: 24 }}>
        <span className="eyebrow" style={{ fontSize: 13, letterSpacing: 1.6 }}>{RAAM.HOME.assistent_section.label}</span>
        <span style={{ flex: 1, height: 2, background: '#01689b' }}/>
        <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{overige.length} onderdelen</span>
      </div>
      <p style={{ color: 'var(--ink-700)', maxWidth: 780, margin: '0 0 22px' }}>
        {RAAM.HOME.assistent_section.description}
      </p>
      <div className="domain-grid">{overige.map(renderCard)}</div>
    </div>
  );
}

/* ============================== DOMEIN DETAIL ============================== */
function DomeinDetail({ id }) {
  const d = RAAM.DOMAINS.find(x => x.id === id);
  if (!d) return <div className="container"><h1>Domein niet gevonden</h1></div>;
  const r = ring(d.ring);
  const practices = d.practices && d.practices.length > 0
    ? d.practices.map(id => RAAM.PRACTICES.find(p => p.id === id)).filter(Boolean)
    : RAAM.PRACTICES.filter(p => p.domains.includes(d.id));
  const relColor = r.color === '#cce0ee' ? '#0b3d68' : r.color;
  return (
    <div className="container">
      <div className="crumbs">
        <a href="#/">Home</a><span className="sep">/</span>
        <a href="#/domeinen">Domeinen</a><span className="sep">/</span>
        <span>{d.title}</span>
      </div>
      <div className="detail-header" style={{ '--ring-color': relColor }}>
        <span className="eyebrow with-ring"><span className="ring-dot" style={{ background: r.color }}/> {r.label} · Domein {String(d.nr).padStart(2, '0')}</span>
        <h1>{d.title}</h1>
        <p className="lede" style={{ fontSize: 19 }}>{d.short}</p>
      </div>

      <div className="detail-grid">
        <div className="detail-body">
          <h2>Wat is {d.title} in een Digitale Assistent?</h2>
          <div dangerouslySetInnerHTML={{ __html: d.wat }} />

          <h2>Waarom is {d.title} belangrijk in een Digitale Assistent?</h2>
          <div dangerouslySetInnerHTML={{ __html: d.waarom }} />

          {d.sources && d.sources.length > 0 && (
            <>
              <h2>Welke Basiskennis is nodig?</h2>
              <ul className="bronnen-items">
                {d.sources.map((b, i) => typeof b === 'string' ? (
                  <li key={i}>{b}</li>
                ) : (
                  <li key={i} className="bron-item">
                    {b.url
                      ? <a href={b.url} target="_blank" rel="noopener noreferrer">{b.title}</a>
                      : <span>{b.title}</span>}
                    <p>{b.omschrijving}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2>Good practices in dit domein</h2>
          {practices.length === 0 ? (
            <p style={{ color: 'var(--ink-500)' }}>Nog geen good practices in dit domein. Heb je er een? <a href="#">Dien een suggestie in</a>.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {practices.map(p => (
                <a key={p.id} className="card card-link practice-card"
                   onClick={(e) => { e.preventDefault(); navigate('/practices/' + p.id); }}
                   href={'#/practices/' + p.id}>
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="tag-row">
                    {p.phases.map(ph => <span key={ph} className={'tag tag-phase-' + ph.toLowerCase()}>{ph}</span>)}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        <aside className="detail-side">
          <div className="side-card">
            <h4>Ring</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, background: r.color, display: 'inline-block' }} />
              <strong style={{ color: 'var(--ro-blue-800)' }}>{r.label}</strong>
            </div>
            <p style={{ margin: '8px 0 0', color: 'var(--ink-700)', fontSize: 13 }}>{r.description}</p>
          </div>
          {(() => {
            const samenhangDomeinen = (d.samenhang || []).map(id => RAAM.DOMAINS.find(x => x.id === id)).filter(Boolean);
            return samenhangDomeinen.length > 0 ? (
              <div className="side-card">
                <h4>Samenhang met andere domeinen</h4>
                <ul>
                  {samenhangDomeinen.map(x => (
                    <li key={x.id}><a onClick={(e)=>{e.preventDefault();navigate('/domeinen/'+x.id);}} href={'#/domeinen/'+x.id}>{x.title}</a></li>
                  ))}
                </ul>
              </div>
            ) : null;
          })()}
          <div className="side-card">
            <h4>Vragen of aanvullingen?</h4>
            <p style={{ margin: '0 0 12px', color: 'var(--ink-700)', fontSize: 13 }}>Help het raamwerk verbeteren met jouw praktijkervaring.</p>
            <button className="btn btn-sm btn-ghost" onClick={() => alert('Suggestie indienen')}><Icon.Suggest/> Suggestie indienen</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============================== GOOD PRACTICES ============================== */
function PracticesPage() {
  const [q, setQ] = useS('');
  const [selDomains, setSelDomains] = useS(new Set());
  const [selPhases, setSelPhases] = useS(new Set());
  const [selLevels, setSelLevels] = useS(new Set());

  function toggle(set, setSet, v) {
    const n = new Set(set);
    if (n.has(v)) n.delete(v); else n.add(v);
    setSet(n);
  }
  function clearAll() {
    setQ(''); setSelDomains(new Set()); setSelPhases(new Set()); setSelLevels(new Set());
  }

  const filtered = useM(() => {
    const qq = q.trim().toLowerCase();
    return RAAM.PRACTICES.filter(p => {
      if (qq && !(p.title.toLowerCase().includes(qq) || p.summary.toLowerCase().includes(qq))) return false;
      if (selDomains.size && !p.domains.some(d => selDomains.has(d))) return false;
      if (selPhases.size && !p.phases.some(d => selPhases.has(d))) return false;
      if (selLevels.size && !p.levels.some(d => selLevels.has(d))) return false;
      return true;
    });
  }, [q, selDomains, selPhases, selLevels]);

  const active = selDomains.size + selPhases.size + selLevels.size + (q ? 1 : 0);

  return (
    <div className="container">
      <div className="section-title-row" style={{ marginBottom: 18 }}>
        <div>
          <span className="eyebrow">Praktijk</span>
          <h1 style={{ marginTop: 6, fontSize: 38 }}>Overzicht Good Practices</h1>
          <p className="lede" style={{ marginTop: 10 }}>
            {RAAM.PRACTICES.length} concrete handvatten, gefilterd uit ervaring van overheidsorganisaties.
          </p>
        </div>
      </div>

      <div className="searchbar" style={{ marginBottom: 24 }}>
        <Icon.Search/>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Zoek in titels en beschrijvingen…" aria-label="Zoeken"/>
        {q && <button onClick={() => setQ('')} className="filter-clear" style={{ display: 'flex', alignItems:'center' }}><Icon.Close/></button>}
      </div>

      <div className="gp-layout">
        <aside className="gp-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            {active > 0 && <button className="filter-clear" onClick={clearAll}>Alle wissen</button>}
          </div>
          <div className="search-meta" style={{ marginBottom: 8 }}>
            {filtered.length} van {RAAM.PRACTICES.length} good practices
          </div>

          <div className="filter-section">
            <h4>Per domein</h4>
            <div className="filter-chips">
              {RAAM.DOMAINS.map(d => {
                const cnt = RAAM.PRACTICES.filter(p => p.domains.includes(d.id)).length;
                if (cnt === 0) return null;
                return (
                  <button key={d.id} className={'filter-chip' + (selDomains.has(d.id) ? ' active' : '')}
                          onClick={() => toggle(selDomains, setSelDomains, d.id)}>
                    {d.title} <span className="count">{cnt}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="filter-section">
            <h4>Per oplossingsfase</h4>
            <div className="filter-chips">
              {RAAM.PHASES.map(p => (
                <button key={p} className={'filter-chip' + (selPhases.has(p) ? ' active' : '')}
                        onClick={() => toggle(selPhases, setSelPhases, p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <h4>Per organisatieniveau</h4>
            <div className="filter-chips">
              {RAAM.LEVELS.map(p => (
                <button key={p} className={'filter-chip' + (selLevels.has(p) ? ' active' : '')}
                        onClick={() => toggle(selLevels, setSelLevels, p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Icon.Search style={{ width: 32, height: 32, color: 'var(--ink-400)' }}/>
              <h3>Geen good practices gevonden</h3>
              <p style={{ margin: 0 }}>Verruim je zoekopdracht of wis een paar filters.</p>
              <button className="btn btn-ghost btn-sm" onClick={clearAll}>Wis alle filters</button>
            </div>
          ) : (
            <div className="gp-list">
              {filtered.map(p => {
                const firstDomain = RAAM.DOMAINS.find(d => d.id === p.domains[0]);
                const r = firstDomain ? ring(firstDomain.ring) : null;
                return (
                  <a key={p.id} className="card card-link practice-card"
                     onClick={(e) => { e.preventDefault(); navigate('/practices/' + p.id); }}
                     href={'#/practices/' + p.id}>
                    <h3 style={{ margin: '0 0 4px' }}>{p.title}</h3>
                    <p>{p.summary}</p>
                    <div className="tag-row">
                      {p.domains.slice(0,2).map(did => {
                        const dd = RAAM.DOMAINS.find(x => x.id === did);
                        const rr = ring(dd.ring);
                        return <span key={did} className="tag tag-domain" style={{ '--ring-bg': rr.id==='kern'||rr.id==='waarborgen' ? '#e6f0f7' : '#f3f7fb', '--ring-fg': rr.color === '#cce0ee' ? '#0b3d68' : rr.color }}>{dd.title}</span>;
                      })}
                      {p.phases.map(ph => <span key={ph} className={'tag tag-phase-' + ph.toLowerCase()}>{ph}</span>)}
                    </div>
                    <div className="row-meta">
                      <span style={{ color: 'var(--ink-500)', fontSize: 12 }}>{p.levels.join(' · ')}</span>
                      <span className="read-more">Lees meer <Icon.Arrow/></span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== PRACTICE DETAIL ============================== */
function PracticeDetail({ id }) {
  const p = RAAM.PRACTICES.find(x => x.id === id);
  if (!p) return <div className="container"><h1>Good practice niet gevonden</h1></div>;
  const domainObjs = p.domains.map(did => RAAM.DOMAINS.find(d => d.id === did)).filter(Boolean);
  return (
    <div className="container">
      <div className="crumbs">
        <a href="#/">Home</a><span className="sep">/</span>
        <a href="#/practices">Good Practices</a><span className="sep">/</span>
        <span>{p.title}</span>
      </div>
      <div className="detail-header">
        <span className="eyebrow">Good Practice</span>
        <h1>{p.title}</h1>
        <p className="lede" style={{ fontSize: 19 }}>{p.summary}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {p.phases.map(ph => <span key={ph} className={'tag tag-phase-' + ph.toLowerCase()}>{ph}</span>)}
          {p.levels.map(l => <span key={l} className="tag tag-level">{l}</span>)}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-body">
          <h2>Praktische tips:</h2>
          <ul>{p.body.map((b, i) => <li key={i}>{boldBeforeColon(b)}</li>)}</ul>

          {p.sources && p.sources.length > 0 && (
            <>
              <h2>Relevante bronnen</h2>
              <ul className="bronnen-items">
                {p.sources.map((b, i) => typeof b === 'string' ? (
                  <li key={i}>{b}</li>
                ) : (
                  <li key={i} className="bron-item">
                    {b.url
                      ? <a href={b.url} target="_blank" rel="noopener noreferrer">{b.title}</a>
                      : <span>{b.title}</span>}
                    <p>{b.omschrijving}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside className="detail-side">
          <div className="side-card">
            <h4>Relevante domeinen</h4>
            <ul>
              {domainObjs.map(d => {
                const r = ring(d.ring);
                return (
                  <li key={d.id}>
                    <a onClick={(e)=>{e.preventDefault();navigate('/domeinen/'+d.id);}} href={'#/domeinen/'+d.id}
                       style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="ring-dot" style={{ background: r.color, color: r.color }} /> {d.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="side-card">
            <h4>Past in fase</h4>
            <div className="tag-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.phases.map(ph => <span key={ph} className={'tag tag-phase-' + ph.toLowerCase()}>{ph}</span>)}
            </div>
          </div>
          <div className="side-card">
            <h4>Voor welk niveau?</h4>
            <div className="tag-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.levels.map(l => <span key={l} className="tag tag-level">{l}</span>)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============================== OVER ============================== */
function OverPage() {
  const o = RAAM.OVER;
  return (
    <div className="container">
      <div className="section-title-row" style={{ marginBottom: 18 }}>
        <div>
          <span className="eyebrow">{o.eyebrow}</span>
          <h1 style={{ marginTop: 6, fontSize: 38 }}>{o.title}</h1>
          <p className="lede" style={{ marginTop: 10 }}>{o.lede}</p>
        </div>
      </div>
      <div className="detail-grid">
        <div className="detail-body">
          {o.sections.map((s, i) => (
            <React.Fragment key={i}>
              <h2>{s.heading}</h2>
              {(Array.isArray(s.body) ? s.body : [s.body]).map((p, j) => (
                <p key={j} style={p.includes('\n') ? { whiteSpace: 'pre-line' } : undefined}>{p}</p>
              ))}
            </React.Fragment>
          ))}
        </div>
        <aside className="detail-side">
          {o.sidebar.map((item, i) => (
            <div key={i} className="side-card">
              <h4>{item.label}</h4>
              <p style={{ margin: 0 }}>
                {item.href ? <a href={item.href}>{item.value}</a> : item.value}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, DomeinenPage, DomeinDetail, PracticesPage, PracticeDetail, OverPage });
