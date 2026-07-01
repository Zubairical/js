(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     FIFA WORLD CUP 2026 WIDGET
     Drop-in via:
       <div id="wc2026-widget"></div>
       <script src="...widgetwc.js"></script>

     If no #wc2026-widget div exists the script
     appends one automatically at the bottom of
     <body>.
  ───────────────────────────────────────────── */

  const API = 'https://wcup2026.org/api/data.php?action=today';

  /* ── Plus UI theme palette (resolved from CSS) ── */
  const CSS = `
    :host {
      display: block;
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;

      /* light surface */
      --bg:           #fdfcff;
      --card:         #fffdfc;
      --card2:        #f1f1f0;
      --card3:        #f6f6f6;
      --border:       #e6e6e6;
      --border2:      #f1f1f0;
      --tx:           #08102b;
      --tx2:          #989b9f;
      --tx3:          #656e77;

      /* dark surface (hero) */
      --dk:           #1e1e1e;
      --dk2:          #2d2d30;
      --dk3:          #252526;
      --dkBorder:     #444444;
      --dkTx:         #fffdfc;
      --dkTx2:        #989b9f;
      --dkLink:       #8775f5;

      /* accents */
      --primary:      #482dff;
      --primaryLt:    #8775f5;
      --primaryDk:    #2d1ab3;
      --orange:       #ff990a;
      --orangeLt:     #fff3e0;

      /* status */
      --red:          #be2e3c;
      --redLt:        #fbe4ea;
      --blue:         #1976d2;
      --blueLt:       #e8f0fe;
      --gray:         #989b9f;

      /* shadows — from --bs-1 */
      --sh:           0 5px 35px rgb(0 0 0 / 7%);
      --shLg:         0 20px 40px rgb(0 0 0 / 12%);
      --shPr:         0 10px 30px -5px rgba(72,45,255,.25);
    }

    /* ── Reset ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    a { text-decoration: none; }
    img { display: block; max-width: 100%; }

    /* ── Google Font via @import (works inside shadow) ── */
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');

    /* ── Wrapper ── */
    .wc-wrap {
      background: var(--bg);
      color: var(--tx);
      border-radius: 5px;
      overflow: hidden;
    }

    /* ── Hero ── */
    .wc-hero {
      position: relative;
      background: var(--dk);
      padding: 36px 24px 44px;
      text-align: center;
      overflow: hidden;
      border-bottom: 1px solid var(--dkBorder);
    }
    .wc-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 50% 50%, rgba(135,117,245,.08) 0%, transparent 70%),
        repeating-linear-gradient(rgba(135,117,245,.03) 0 1px, transparent 1px 40px),
        repeating-linear-gradient(90deg, rgba(135,117,245,.03) 0 1px, transparent 1px 40px);
      pointer-events: none;
    }
    .wc-hero-inner {
      position: relative;
      z-index: 1;
    }
    .wc-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(135,117,245,.12);
      border: 1px solid rgba(135,117,245,.3);
      padding: 6px 16px;
      border-radius: 50px;
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: var(--dkLink);
      margin-bottom: 14px;
    }
    .wc-dot {
      width: 7px; height: 7px;
      background: var(--red);
      border-radius: 50%;
      box-shadow: 0 0 7px rgba(190,46,60,.6);
      animation: wc-blink 1.5s infinite;
    }
    @keyframes wc-blink {
      0%,100% { opacity: 1; }
      50%      { opacity: .25; }
    }
    .wc-title {
      font-family: 'Oswald', sans-serif;
      font-size: clamp(1.6rem, 4vw, 2.8rem);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .05em;
      line-height: 1.1;
      color: var(--dkTx);
      margin-bottom: 6px;
    }
    .wc-title span { color: var(--dkLink); }
    .wc-sub {
      font-size: .9rem;
      color: var(--dkTx2);
      margin-bottom: 14px;
    }
    .wc-date {
      display: inline-block;
      background: var(--dk2);
      border: 1px solid var(--dkBorder);
      border-radius: 5px;
      padding: 7px 18px;
      font-family: 'Oswald', sans-serif;
      font-size: .95rem;
      letter-spacing: .04em;
      color: var(--dkTx2);
    }

    /* ── Toolbar ── */
    .wc-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px 14px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .wc-section-title {
      font-family: 'Oswald', sans-serif;
      font-size: 1.3rem;
      text-transform: uppercase;
      letter-spacing: .04em;
      color: var(--tx);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .wc-section-title::before {
      content: '';
      width: 3px; height: 22px;
      background: linear-gradient(to bottom, var(--primary), var(--primaryLt));
      border-radius: 2px;
    }
    .wc-refresh {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: .8rem;
      font-weight: 500;
      color: var(--tx2);
      cursor: pointer;
      box-shadow: var(--sh);
      transition: all .25s;
      font-family: inherit;
    }
    .wc-refresh:hover {
      background: var(--primary);
      color: var(--dkTx);
      border-color: var(--primary);
      box-shadow: var(--shPr);
    }
    .wc-refresh svg { width: 13px; height: 13px; flex-shrink: 0; }
    .wc-refresh.spinning svg { animation: wc-spin 1s linear infinite; }
    @keyframes wc-spin { to { transform: rotate(360deg); } }

    /* ── Grid ── */
    .wc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 18px;
      padding: 0 20px 24px;
    }

    /* ── Card ── */
    .wc-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 5px;
      overflow: hidden;
      box-shadow: var(--sh);
      position: relative;
      transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
    }
    .wc-card:hover {
      transform: translateY(-4px);
      border-color: rgba(72,45,255,.25);
      box-shadow: var(--shLg), var(--shPr);
    }

    /* live stripe */
    .wc-card.live {
      border-color: rgba(190,46,60,.3);
      box-shadow: 0 0 0 1px rgba(190,46,60,.1), var(--sh);
    }
    .wc-card.live::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--red), #e06c73, var(--red));
      background-size: 200% 100%;
      animation: wc-stripe 2s ease infinite;
    }
    .wc-card.live:hover {
      box-shadow: 0 0 0 1px rgba(190,46,60,.2), var(--shLg), 0 8px 24px -5px rgba(190,46,60,.15);
    }
    @keyframes wc-stripe {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* card header */
    .wc-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 11px 16px;
      background: var(--card2);
      border-bottom: 1px solid var(--border2);
    }
    .wc-round {
      font-size: .7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: var(--tx2);
    }
    .wc-status {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .wc-status.live     { background: var(--redLt);  color: var(--red);  border: 1px solid rgba(190,46,60,.2); }
    .wc-status.upcoming { background: var(--blueLt); color: var(--blue); border: 1px solid rgba(25,118,210,.2); }
    .wc-status.finished { background: var(--card2);  color: var(--gray); border: 1px solid var(--border); }

    /* card body */
    .wc-card-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 22px 18px;
    }
    .wc-team {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex: 1;
      text-align: center;
      min-width: 0;
    }
    .wc-flag {
      width: 62px; height: 44px;
      object-fit: cover;
      border-radius: 5px;
      border: 1px solid var(--border2);
      box-shadow: 0 3px 10px rgba(0,0,0,.07);
      transition: transform .25s, box-shadow .25s;
    }
    .wc-card:hover .wc-flag {
      transform: scale(1.07) translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,.1);
    }
    .wc-team-name {
      font-family: 'Oswald', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .03em;
      color: var(--tx);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .wc-team-ar {
      font-size: .78rem;
      color: var(--tx2);
      direction: rtl;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    /* vs / score */
    .wc-vs {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 7px;
      min-width: 84px;
    }
    .wc-score {
      font-family: 'Oswald', sans-serif;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1;
      letter-spacing: .1em;
      color: var(--tx);
    }
    .wc-score.live     { color: var(--red); text-shadow: 0 2px 8px rgba(190,46,60,.15); }
    .wc-score.upcoming { font-size: 1.3rem; font-weight: 500; color: var(--tx3); }
    .wc-ft   { font-size: .68rem; color: var(--tx3); font-weight: 700; letter-spacing: .15em; }
    .wc-min  {
      font-family: 'Oswald', sans-serif;
      font-size: .95rem;
      font-weight: 600;
      color: var(--red);
      background: var(--redLt);
      padding: 3px 11px;
      border-radius: 5px;
      border: 1px solid rgba(190,46,60,.15);
    }
    .wc-time {
      font-size: .82rem;
      font-weight: 700;
      color: var(--orange);
      background: var(--orangeLt);
      padding: 3px 11px;
      border-radius: 5px;
      border: 1px solid rgba(255,153,10,.2);
    }

    /* card footer */
    .wc-card-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      background: var(--card2);
      border-top: 1px solid var(--border2);
      font-size: .76rem;
      color: var(--tx2);
    }
    .wc-venue {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 500;
    }
    .wc-venue svg { width: 13px; height: 13px; color: var(--tx3); flex-shrink: 0; }
    .wc-id {
      font-family: 'Oswald', sans-serif;
      font-size: .7rem;
      color: var(--tx3);
    }

    /* ── Loading ── */
    .wc-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 14px;
    }
    .wc-spinner {
      width: 40px; height: 40px;
      border: 3px solid var(--border);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: wc-spin 1s linear infinite;
    }
    .wc-loading-txt { font-size: .9rem; color: var(--tx2); font-weight: 500; }

    /* ── Error ── */
    .wc-error {
      text-align: center;
      padding: 60px 20px;
    }
    .wc-error-icon { font-size: 2.6rem; margin-bottom: 12px; }
    .wc-error-txt  { font-size: 1rem; color: var(--tx2); margin-bottom: 18px; }
    .wc-retry {
      background: var(--primary);
      color: var(--dkTx);
      border: none;
      padding: 10px 28px;
      border-radius: 6px;
      font-size: .9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .25s;
      font-family: inherit;
      box-shadow: var(--shPr);
    }
    .wc-retry:hover {
      background: var(--primaryDk);
      transform: translateY(-2px);
    }

    /* ── Branding ── */
    .wc-brand {
      text-align: center;
      padding: 10px 20px 16px;
      font-size: .7rem;
      color: var(--tx3);
    }
    .wc-brand a { color: var(--primary); font-weight: 600; }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .wc-grid { grid-template-columns: 1fr; }
      .wc-title { font-size: 1.5rem; }
      .wc-score { font-size: 1.9rem; }
      .wc-flag { width: 50px; height: 36px; }
      .wc-team-name { font-size: .88rem; }
    }
  `;

  /* ── HTML template ── */
  const HTML = `
    <div class="wc-wrap">

      <div class="wc-hero">
        <div class="wc-hero-inner">
          <div class="wc-badge">
            <span class="wc-dot"></span>
            Live Updates
          </div>
          <div class="wc-title">FIFA <span>World Cup</span> 2026</div>
          <div class="wc-sub">Real-time scores &amp; match updates</div>
          <div class="wc-date" id="wc-date">Loading…</div>
        </div>
      </div>

      <div class="wc-toolbar">
        <div class="wc-section-title">Today's Matches</div>
        <button class="wc-refresh" id="wc-refresh" aria-label="Refresh matches">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Refresh
        </button>
      </div>

      <div id="wc-body">
        <div class="wc-loading">
          <div class="wc-spinner"></div>
          <div class="wc-loading-txt">Loading today's matches…</div>
        </div>
      </div>

      <div class="wc-brand">
        Data · <a href="https://wcup2026.org" target="_blank" rel="noopener">wcup2026.org</a>
      </div>

    </div>
  `;

  /* ── Helpers ── */
  function formatDate(ts) {
    return new Date(ts * 1000).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function statusClass(s) {
    return s === 'live' ? 'live' : s === 'upcoming' ? 'upcoming' : 'finished';
  }

  function statusLabel(s) {
    return s === 'live' ? 'Live' : s === 'upcoming' ? 'Upcoming' : 'Finished';
  }

  function pinSVG() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`;
  }

  function renderCard(m) {
    const sc  = statusClass(m.status);
    const isL = m.status === 'live';
    const isU = m.status === 'upcoming';

    let middle;
    if (isL) {
      middle = `<div class="wc-score live">${m.score[0]} - ${m.score[1]}</div>
                <div class="wc-min">${m.live_minute}'</div>`;
    } else if (isU) {
      middle = `<div class="wc-score upcoming">VS</div>
                <div class="wc-time">${m.time}</div>`;
    } else {
      middle = `<div class="wc-score">${m.score[0]} - ${m.score[1]}</div>
                <div class="wc-ft">FT</div>`;
    }

    const ph = (t) => `https://via.placeholder.com/80x60/f1f1f0/989b9f?text=${encodeURIComponent(t.charAt(0))}`;

    return `
      <div class="wc-card ${sc}">
        <div class="wc-card-head">
          <span class="wc-round">${m.round}</span>
          <span class="wc-status ${sc}">
            ${isL ? '<span class="wc-dot"></span>' : ''}
            ${statusLabel(m.status)}
          </span>
        </div>
        <div class="wc-card-body">
          <div class="wc-team">
            <img class="wc-flag" src="${m.flag1}" alt="${m.team1}"
                 onerror="this.src='${ph(m.team1)}'">
            <div class="wc-team-name">${m.team1}</div>
            <div class="wc-team-ar">${m.team1_ar || ''}</div>
          </div>
          <div class="wc-vs">${middle}</div>
          <div class="wc-team">
            <img class="wc-flag" src="${m.flag2}" alt="${m.team2}"
                 onerror="this.src='${ph(m.team2)}'">
            <div class="wc-team-name">${m.team2}</div>
            <div class="wc-team-ar">${m.team2_ar || ''}</div>
          </div>
        </div>
        <div class="wc-card-foot">
          <div class="wc-venue">${pinSVG()} ${m.ground}</div>
          <div class="wc-id">#${m.id}</div>
        </div>
      </div>`;
  }

  /* ── Widget class ── */
  class WC2026Widget {
    constructor(host) {
      /* Shadow DOM — fully isolated from the host page */
      this.root   = host.attachShadow({ mode: 'open' });
      this._timer = null;

      /* Inject styles + markup */
      const style  = document.createElement('style');
      style.textContent = CSS;
      this.root.appendChild(style);

      const wrap = document.createElement('div');
      wrap.innerHTML = HTML;
      this.root.appendChild(wrap);

      /* Wire up refresh button */
      this.root.getElementById('wc-refresh')
               .addEventListener('click', () => this.fetch());

      /* First load + auto-refresh every 60 s */
      this.fetch();
      this._timer = setInterval(() => this.fetch(), 60000);
    }

    async fetch() {
      const btn  = this.root.getElementById('wc-refresh');
      const body = this.root.getElementById('wc-body');
      const dateEl = this.root.getElementById('wc-date');

      btn.classList.add('spinning');
      btn.disabled = true;

      try {
        const res  = await fetch(API);
        const data = await res.json();

        if (!data.ok || !data.matches) throw new Error('bad response');

        if (data.matches.length) {
          dateEl.textContent = formatDate(data.matches[0].datetime);
        } else {
          dateEl.textContent = new Date().toLocaleDateString('en-US', {
            weekday:'long', year:'numeric', month:'long', day:'numeric'
          });
        }

        if (data.matches.length === 0) {
          body.innerHTML = `
            <div class="wc-error">
              <div class="wc-error-icon">📅</div>
              <div class="wc-error-txt">No matches scheduled for today</div>
            </div>`;
        } else {
          body.innerHTML =
            `<div class="wc-grid">${data.matches.map(renderCard).join('')}</div>`;
        }

      } catch (e) {
        body.innerHTML = `
          <div class="wc-error">
            <div class="wc-error-icon">⚠️</div>
            <div class="wc-error-txt">Unable to load matches. Please try again.</div>
            <button class="wc-retry">Retry</button>
          </div>`;
        this.root.querySelector('.wc-retry')
                 ?.addEventListener('click', () => this.fetch());
      } finally {
        btn.classList.remove('spinning');
        btn.disabled = false;
      }
    }

    destroy() {
      clearInterval(this._timer);
    }
  }

  /* ── Mount ── */
  function mount() {
    /* Use existing #wc2026-widget or append a new one */
    let host = document.getElementById('wc2026-widget');
    if (!host) {
      host = document.createElement('div');
      host.id = 'wc2026-widget';
      document.body.appendChild(host);
    }
    /* Avoid double-mounting */
    if (host._wc2026) return;
    host._wc2026 = new WC2026Widget(host);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();
