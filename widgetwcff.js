/* ============================================================
   FIFA World Cup 2026 Live Widget
   Plus UI Theme Compatible - Uses Template CSS Variables
   Host: https://cdn.jsdelivr.net/gh/Zubairical/js@main/widgetwcf.js
   Usage: <script src="https://cdn.jsdelivr.net/gh/Zubairical/js@main/widgetwcf.js"></script>
   ============================================================ */

(function () {
    'use strict';

    const WC_API_URL = 'https://wcup2026.org/api/data.php?action=today';

    // ── Scoped Styles ──────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        .wc-widget {
            font-family: var(--fontB, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif);
            color: var(--bodyC, #08102b);
            background: var(--bodyB, #fdfcff);
            min-height: 100vh;
            overflow-x: hidden;
        }
        .wc-widget * { margin: 0; padding: 0; box-sizing: border-box; }

        .wc-hero {
            position: relative;
            background: linear-gradient(135deg, var(--contentB, #fffdfc) 0%, var(--bodyB, #fdfcff) 50%, var(--contentBa, #f6f6f6) 100%);
            padding: 60px 20px 80px;
            text-align: center;
            overflow: hidden;
            border-bottom: 1px solid var(--contentL, #e6e6e6);
        }
        .wc-hero::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, color-mix(in srgb, var(--linkB, #1976d2) 8%, transparent) 0%, transparent 70%);
            animation: wc-pulse 4s ease-in-out infinite;
        }
        @keyframes wc-pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        .wc-hero-content { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; }

        .wc-badge {
            display: inline-flex; align-items: center; gap: 10px;
            background: var(--contentBs, #f1f1f0);
            border: 1px solid var(--contentL, #e6e6e6);
            padding: 8px 20px; border-radius: 50px;
            font-size: 0.85rem; font-weight: 600;
            letter-spacing: 2px; text-transform: uppercase;
            color: var(--linkC, #1976d2); margin-bottom: 20px;
        }
        .wc-live-dot {
            width: 8px; height: 8px; background: #dc2626;
            border-radius: 50%; animation: wc-blink 1.5s infinite;
            box-shadow: 0 0 8px rgba(220, 38, 38, 0.5);
        }
        @keyframes wc-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .wc-widget h1 {
            font-family: var(--fontH, var(--fontB, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif));
            font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700;
            text-transform: uppercase; letter-spacing: 2px; line-height: 1.1;
            margin-bottom: 10px;
            background: linear-gradient(135deg, var(--headC, #08102b), var(--linkC, #1976d2));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .wc-subtitle {
            font-size: 1.1rem; color: var(--bodyCa, #989b9f);
            max-width: 600px; margin: 0 auto;
        }
        .wc-date-badge {
            display: inline-block; margin-top: 20px;
            background: var(--contentB, #fffdfc); padding: 10px 25px;
            border-radius: var(--linkR, 6px);
            font-family: var(--fontH, var(--fontB));
            font-size: 1.1rem; letter-spacing: 1px;
            border: 1px solid var(--contentL, #e6e6e6);
            color: var(--bodyCa, #989b9f);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .wc-container { max-width: 1400px; margin: 0 auto; padding: 20px 5px; }
        .wc-section-header {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 35px; flex-wrap: wrap; gap: 15px;
        }
        .wc-section-title {
            font-family: var(--fontH, var(--fontB)); font-size: 1.8rem;
            text-transform: uppercase; letter-spacing: 1px;
            display: flex; align-items: center; gap: 12px;
            color: var(--headC, #08102b);
        }
        .wc-section-title::before {
            content: ''; width: 4px; height: 30px;
            background: linear-gradient(to bottom, var(--linkB, #1976d2), var(--linkC, #1976d2));
            border-radius: 2px;
        }
        .wc-refresh-btn {
            background: var(--contentB, #fffdfc);
            border: 1px solid var(--contentL, #e6e6e6);
            color: var(--bodyCa, #989b9f); padding: 10px 20px;
            border-radius: var(--linkR, 6px); cursor: pointer;
            font-family: var(--fontB, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif);
            font-size: 0.9rem; display: flex; align-items: center; gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-weight: 500;
        }
        .wc-refresh-btn:hover {
            background: var(--linkB, #1976d2); color: var(--white, #fffdfc);
            border-color: var(--linkB, #1976d2);
            box-shadow: 0 10px 30px -5px color-mix(in srgb, var(--linkB, #1976d2) 20%, transparent);
            transform: translateY(-1px);
        }
        .wc-refresh-btn:active { transform: translateY(0); }
        .wc-refresh-btn.wc-spinning svg { animation: wc-spin 1s linear infinite; }
        @keyframes wc-spin { to { transform: rotate(360deg); } }

        .wc-matches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit,1fr);
            gap: 25px;
        }
        @media (max-width: 480px) {
            .wc-matches-grid { grid-template-columns: 1fr; }
        }

        .wc-match-card {
            background: var(--contentB, #fffdfc); border-radius: var(--linkR, 6px);
            overflow: hidden; border: 1px solid var(--contentL, #e6e6e6);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
        .wc-match-card:hover {
            transform: translateY(-6px);
            border-color: color-mix(in srgb, var(--linkB, #1976d2) 20%, var(--contentL, #e6e6e6));
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04), 0 10px 30px -5px color-mix(in srgb, var(--linkB, #1976d2) 20%, transparent);
        }
        .wc-match-card.wc-live {
            border-color: rgba(220, 38, 38, 0.3);
            box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.1), 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
        .wc-match-card.wc-live:hover {
            box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.2), 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04), 0 10px 30px -5px rgba(220, 38, 38, 0.15);
        }
        .wc-match-card.wc-live::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
            background: linear-gradient(90deg, #dc2626, #f87171, #dc2626);
            background-size: 200% 100%; animation: wc-liveBorder 2s ease infinite;
        }
        @keyframes wc-liveBorder {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .wc-match-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 16px 24px;
            background: linear-gradient(to right, var(--contentBs, #f1f1f0), transparent);
            border-bottom: 1px solid var(--contentL, #e6e6e6);
        }
        .wc-round-info {
            font-size: 0.8rem; color: var(--bodyCa, #989b9f);
            font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;
        }
        .wc-status-badge {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 16px; border-radius: 50px;
            font-size: 0.75rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.5px;
        }
        .wc-status-badge.wc-live {
            background: rgba(220, 38, 38, 0.1); color: #dc2626;
            border: 1px solid rgba(220, 38, 38, 0.2);
        }
        .wc-status-badge.wc-upcoming {
            background: rgba(25, 118, 210, 0.1); color: var(--linkC, #1976d2);
            border: 1px solid rgba(25, 118, 210, 0.2);
        }
        .wc-status-badge.wc-finished {
            background: var(--contentBs, #f1f1f0); color: var(--bodyCa, #989b9f);
            border: 1px solid var(--contentL, #e6e6e6);
        }

        .wc-match-body {
            padding: 35px 28px; display: flex;
            align-items: center; justify-content: space-between; gap: 15px;
        }
        .wc-team {
            display: flex; flex-direction: column; align-items: center;
            gap: 14px; flex: 1; text-align: center;
        }
        .wc-team-flag {
            width: 72px; height: 52px; object-fit: cover;
            border-radius: var(--linkR, 6px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid var(--contentL, #e6e6e6);
        }
        .wc-match-card:hover .wc-team-flag {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .wc-team-name {
            font-family: var(--fontH, var(--fontB)); font-size: 1.15rem;
            font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
            color: var(--headC, #08102b);
        }
        .wc-team-name.wc-ar {
            font-family: var(--fontB, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif);
            font-size: 0.9rem; color: var(--bodyCa, #989b9f);
            direction: rtl; font-weight: 500;
        }
        .wc-vs-section {
            display: flex; flex-direction: column; align-items: center;
            gap: 10px; min-width: 100px;
        }
        .wc-score-display {
            font-family: var(--fontH, var(--fontB)); font-size: 3.2rem;
            font-weight: 700; line-height: 1; letter-spacing: 3px;
            color: var(--headC, #08102b);
        }
        .wc-score-display.wc-live {
            color: #dc2626;
            text-shadow: 0 2px 10px rgba(220, 38, 38, 0.15);
        }
        .wc-score-display.wc-upcoming {
            color: var(--bodyCa, #989b9f); font-size: 1.6rem; font-weight: 500;
        }
        .wc-vs-text {
            font-size: 0.75rem; color: var(--bodyCa, #989b9f);
            font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
        }
        .wc-live-minute {
            font-family: var(--fontH, var(--fontB)); font-size: 1.1rem;
            color: #dc2626; font-weight: 600;
            background: rgba(220, 38, 38, 0.1); padding: 4px 14px;
            border-radius: var(--linkR, 6px);
            border: 1px solid rgba(220, 38, 38, 0.15);
        }
        .wc-match-time {
            font-size: 0.95rem; color: var(--linkC, #1976d2); font-weight: 700;
            background: linear-gradient(135deg, var(--contentBa, #f6f6f6), var(--contentBs, #f1f1f0));
            padding: 4px 14px; border-radius: var(--linkR, 6px);
            border: 1px solid var(--contentL, #e6e6e6);
        }

        .wc-match-footer {
            padding: 16px 24px;
            background: linear-gradient(to right, transparent, var(--contentBs, #f1f1f0));
            border-top: 1px solid var(--contentL, #e6e6e6);
            display: flex; justify-content: space-between; align-items: center;
            font-size: 0.85rem; color: var(--bodyCa, #989b9f);
        }
        .wc-venue { display: flex; align-items: center; gap: 8px; font-weight: 500; }
        .wc-venue svg { width: 16px; height: 16px; color: var(--bodyCa, #989b9f); }
        .wc-match-id {
            font-family: var(--fontH, var(--fontB)); color: var(--bodyCa, #989b9f);
            font-size: 0.8rem; font-weight: 500;
        }

        .wc-loading-container {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 100px 20px; gap: 20px;
        }
        .wc-loader {
            width: 56px; height: 56px;
            border: 4px solid var(--contentL, #e6e6e6);
            border-top-color: var(--linkB, #1976d2);
            border-radius: 50%; animation: wc-spin 1s linear infinite;
        }
        .wc-loading-text { color: var(--bodyCa, #989b9f); font-size: 1.1rem; font-weight: 500; }

        .wc-error-container { text-align: center; padding: 100px 20px; }
        .wc-error-icon { font-size: 4rem; margin-bottom: 20px; }
        .wc-error-text {
            color: var(--bodyCa, #989b9f); font-size: 1.2rem;
            margin-bottom: 24px; font-weight: 500;
        }
        .wc-retry-btn {
            background: var(--linkB, #1976d2); color: var(--white, #fffdfc);
            border: none; padding: 14px 36px; border-radius: var(--linkR, 6px);
            font-family: var(--fontB, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif);
            font-size: 1rem; cursor: pointer; font-weight: 600; transition: all 0.3s;
            box-shadow: 0 10px 30px -5px color-mix(in srgb, var(--linkB, #1976d2) 20%, transparent);
        }
        .wc-retry-btn:hover {
            background: var(--linkC, #1976d2); transform: translateY(-2px);
            box-shadow: 0 15px 35px -5px color-mix(in srgb, var(--linkB, #1976d2) 30%, transparent);
        }

        .wc-footer {
            display: none; text-align: center; padding: 40px 20px;
            border-top: 1px solid var(--contentL, #e6e6e6);
            color: var(--bodyCa, #989b9f); font-size: 0.85rem;
            background: var(--contentB, #fffdfc);
        }
        .wc-footer a { color: var(--linkC, #1976d2); text-decoration: none; font-weight: 600; }
        .wc-footer a:hover { text-decoration: underline; }

        @media (max-width: 640px) {
            .wc-hero { padding: 40px 20px 60px; }
            .wc-container { padding: 35px 15px; }
            .wc-match-body { padding: 25px 18px; }
            .wc-team-flag { width: 58px; height: 42px; }
            .wc-score-display { font-size: 2.4rem; }
            .wc-team-name { font-size: 0.95rem; }
            .wc-match-header, .wc-match-footer { padding: 14px 18px; }
        }
    `;
    document.head.appendChild(style);

    // ── HTML Template ────────────────────────────────────────
    const template = `
        <div class="wc-widget">
            <div class="wc-hero">
                <div class="wc-hero-content">
                    <div class="wc-badge">
                        <span class="wc-live-dot"></span>
                        Live Updates
                    </div>
                    <h1>FIFA World Cup 2026</h1>
                    <p class="wc-subtitle">Real-time match updates, scores, and standings from the biggest tournament on Earth</p>
                    <div class="wc-date-badge" id="wcCurrentDate">Loading...</div>
                </div>
            </div>
            <div class="wc-container">
                <div class="wc-section-header">
                    <h2 class="wc-section-title">Today's Matches</h2>
                    <button class="wc-refresh-btn" id="wcRefreshBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                        </svg>
                        Refresh
                    </button>
                </div>
                <div id="wcMatchesContainer">
                    <div class="wc-loading-container">
                        <div class="wc-loader"></div>
                        <div class="wc-loading-text">Loading today's matches...</div>
                    </div>
                </div>
            </div>
            <div class="wc-footer">
                <p>Data provided by <a href="https://wcup2026.org" target="_blank">wcup2026.org</a> &bull; FIFA World Cup 2026 Live Updates</p>
            </div>
        </div>
    `;

    // ── Helpers ────────────────────────────────────────────────
    function wcFormatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    function wcGetStatusClass(status) {
        if (status === 'live') return 'wc-live';
        if (status === 'upcoming') return 'wc-upcoming';
        return 'wc-finished';
    }

    function wcGetStatusText(status) {
        if (status === 'live') return 'Live';
        if (status === 'upcoming') return 'Upcoming';
        return 'Finished';
    }

    function wcRenderMatchCard(match) {
        const isLive = match.status === 'live';
        const isUpcoming = match.status === 'upcoming';
        const statusClass = wcGetStatusClass(match.status);

        let scoreHtml;
        if (isLive) {
            scoreHtml = `
                <div class="wc-score-display wc-live">${match.score[0]} - ${match.score[1]}</div>
                <div class="wc-live-minute">${match.live_minute}'</div>
            `;
        } else if (isUpcoming) {
            scoreHtml = `
                <div class="wc-score-display wc-upcoming">VS</div>
                <div class="wc-match-time">${match.time}</div>
            `;
        } else {
            scoreHtml = `
                <div class="wc-score-display">${match.score[0]} - ${match.score[1]}</div>
                <div class="wc-vs-text">FT</div>
            `;
        }

        return `
            <div class="wc-match-card ${statusClass}">
                <div class="wc-match-header">
                    <span class="wc-round-info">${match.round}</span>
                    <span class="wc-status-badge ${statusClass}">
                        ${isLive ? '<span class="wc-live-dot"></span>' : ''}
                        ${wcGetStatusText(match.status)}
                    </span>
                </div>
                <div class="wc-match-body">
                    <div class="wc-team">
                        <img src="${match.flag1}" alt="${match.team1}" class="wc-team-flag" onerror="this.src='https://via.placeholder.com/80x60/f1f5f9/64748b?text=${match.team1.charAt(0)}'">
                        <div class="wc-team-name">${match.team1}</div>
                        <div class="wc-team-name wc-ar">${match.team1_ar}</div>
                    </div>
                    <div class="wc-vs-section">${scoreHtml}</div>
                    <div class="wc-team">
                        <img src="${match.flag2}" alt="${match.team2}" class="wc-team-flag" onerror="this.src='https://via.placeholder.com/80x60/f1f5f9/64748b?text=${match.team2.charAt(0)}'">
                        <div class="wc-team-name">${match.team2}</div>
                        <div class="wc-team-name wc-ar">${match.team2_ar}</div>
                    </div>
                </div>
                <div class="wc-match-footer">
                    <div class="wc-venue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${match.ground}
                    </div>
                    <div class="wc-match-id">#${match.id}</div>
                </div>
            </div>
        `;
    }

    // ── Core Logic ─────────────────────────────────────────────
    async function wcFetchMatches() {
        const btn = document.getElementById('wcRefreshBtn');
        const container = document.getElementById('wcMatchesContainer');

        if (btn) { btn.classList.add('wc-spinning'); btn.disabled = true; }

        try {
            const response = await fetch(WC_API_URL);
            const data = await response.json();

            if (data.ok && data.matches) {
                if (data.matches.length > 0) {
                    document.getElementById('wcCurrentDate').textContent = wcFormatDate(data.matches[0].datetime);
                }
                if (data.matches.length === 0) {
                    container.innerHTML = `
                        <div class="wc-error-container">
                            <div class="wc-error-icon">&#128197;</div>
                            <div class="wc-error-text">No matches scheduled for today</div>
                        </div>
                    `;
                } else {
                    container.innerHTML = `<div class="wc-matches-grid">${data.matches.map(wcRenderMatchCard).join('')}</div>`;
                }
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            container.innerHTML = `
                <div class="wc-error-container">
                    <div class="wc-error-icon">&#9888;&#65039;</div>
                    <div class="wc-error-text">Unable to load matches. Please try again.</div>
                    <button class="wc-retry-btn" onclick="window.wcFetchMatches()">Retry</button>
                </div>
            `;
            console.error('Error fetching matches:', error);
        } finally {
            if (btn) { btn.classList.remove('wc-spinning'); btn.disabled = false; }
        }
    }

    // ── Auto-Init ──────────────────────────────────────────────
    function wcInit() {
        // Find or create container
        let container = document.getElementById('wc-widget-root');
        if (!container) {
            container = document.createElement('div');
            container.id = 'wc-widget-root';
            // Append to body if no specific container found
            document.body.appendChild(container);
        }
        container.innerHTML = template;

        // Bind refresh button
        const refreshBtn = document.getElementById('wcRefreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', wcFetchMatches);
        }

        // Expose fetch function globally for retry buttons
        window.wcFetchMatches = wcFetchMatches;

        // Initial load
        wcFetchMatches();

        // Auto-refresh every 60 seconds
        setInterval(wcFetchMatches, 60000);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wcInit);
    } else {
        wcInit();
    }
})();
