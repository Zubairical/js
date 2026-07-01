(function() {
    'use strict';

    // ── CONFIG ──────────────────────────────────────────
    const API_URL = 'https://wcup2026.org/api/data.php?action=today';
    const CONTAINER_ID = 'wc2026-widget';

    // ── CSS ─────────────────────────────────────────────
    const CSS = `
:root {
    --wc-primary: #047857;
    --wc-primary-light: #10b981;
    --wc-primary-dark: #065f46;
    --wc-accent: #d97706;
    --wc-accent-light: #fbbf24;
    --wc-bg: #f8fafc;
    --wc-bg-hero: #ffffff;
    --wc-bg-card: #ffffff;
    --wc-bg-card-hover: #f1f5f9;
    --wc-text-primary: #0f172a;
    --wc-text-secondary: #64748b;
    --wc-text-muted: #94a3b8;
    --wc-border: #e2e8f0;
    --wc-border-light: #f1f5f9;
    --wc-live-red: #dc2626;
    --wc-live-red-light: #fee2e2;
    --wc-upcoming-blue: #2563eb;
    --wc-upcoming-blue-light: #dbeafe;
    --wc-finished-gray: #6b7280;
    --wc-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --wc-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --wc-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --wc-shadow-primary: 0 10px 30px -5px rgba(4, 120, 87, 0.2);
}
#wc2026-widget {
    font-family: 'Inter', sans-serif;
    background: var(--wc-bg);
    color: var(--wc-text-primary);
    min-height: 100vh;
    overflow-x: hidden;
    line-height: 1.5;
}
#wc2026-widget * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#wc2026-widget .wc-hero {
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%);
    padding: 60px 20px 80px;
    text-align: center;
    overflow: hidden;
    border-bottom: 1px solid var(--wc-border);
}
#wc2026-widget .wc-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
    animation: wc-pulse 4s ease-in-out infinite;
}
@keyframes wc-pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
}
#wc2026-widget .wc-hero-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
}
#wc2026-widget .wc-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--wc-primary-light);
    border: 1px solid rgba(4, 120, 87, 0.2);
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--wc-primary-dark);
    margin-bottom: 20px;
}
#wc2026-widget .wc-live-dot {
    width: 8px;
    height: 8px;
    background: var(--wc-live-red);
    border-radius: 50%;
    animation: wc-blink 1.5s infinite;
    box-shadow: 0 0 8px rgba(220, 38, 38, 0.5);
}
@keyframes wc-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}
#wc2026-widget .wc-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.1;
    margin-bottom: 10px;
    background: linear-gradient(135deg, var(--wc-primary-dark), var(--wc-primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
#wc2026-widget .wc-subtitle {
    font-size: 1.1rem;
    color: var(--wc-text-secondary);
    max-width: 600px;
    margin: 0 auto;
}
#wc2026-widget .wc-date-badge {
    display: inline-block;
    margin-top: 20px;
    background: var(--wc-bg-card);
    padding: 10px 25px;
    border-radius: 12px;
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 1px;
    border: 1px solid var(--wc-border);
    color: var(--wc-text-secondary);
    box-shadow: var(--wc-shadow-sm);
}
#wc2026-widget .wc-stats-bar {
    display: none;
    justify-content: center;
    gap: 40px;
    padding: 25px 20px;
    background: var(--wc-bg-card);
    border-bottom: 1px solid var(--wc-border);
    box-shadow: var(--wc-shadow-sm);
    flex-wrap: wrap;
}
#wc2026-widget .wc-stat-item {
    text-align: center;
    padding: 0 20px;
}
#wc2026-widget .wc-stat-value {
    font-family: 'Oswald', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--wc-primary);
    line-height: 1;
}
#wc2026-widget .wc-stat-label {
    font-size: 0.75rem;
    color: var(--wc-text-secondary);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-top: 6px;
    font-weight: 600;
}
#wc2026-widget .wc-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0;
    margin-top: 10px;
}
#wc2026-widget .wc-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 15px;
}
#wc2026-widget .wc-section-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--wc-text-primary);
}
#wc2026-widget .wc-section-title::before {
    content: '';
    width: 4px;
    height: 30px;
    background: linear-gradient(to bottom, var(--wc-primary), var(--wc-primary-light));
    border-radius: 2px;
}
#wc2026-widget .wc-refresh-btn {
    background: var(--wc-bg-card);
    border: 1px solid var(--wc-border);
    color: var(--wc-text-secondary);
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    box-shadow: var(--wc-shadow-sm);
    font-weight: 500;
}
#wc2026-widget .wc-refresh-btn:hover {
    background: var(--wc-primary);
    color: white;
    border-color: var(--wc-primary);
    box-shadow: var(--wc-shadow-primary);
    transform: translateY(-1px);
}
#wc2026-widget .wc-refresh-btn:active {
    transform: translateY(0);
}
#wc2026-widget .wc-refresh-btn.wc-spinning svg {
    animation: wc-spin 1s linear infinite;
}
@keyframes wc-spin {
    to { transform: rotate(360deg); }
}
#wc2026-widget .wc-matches-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 25px;
}
@media (max-width: 480px) {
    #wc2026-widget .wc-matches-grid {
        grid-template-columns: 1fr;
    }
}
#wc2026-widget .wc-match-card {
    background: var(--wc-bg-card);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--wc-border);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    box-shadow: var(--wc-shadow);
}
#wc2026-widget .wc-match-card:hover {
    transform: translateY(-6px);
    border-color: rgba(4, 120, 87, 0.2);
    box-shadow: var(--wc-shadow-lg), var(--wc-shadow-primary);
}
#wc2026-widget .wc-match-card.wc-live {
    border-color: rgba(220, 38, 38, 0.3);
    box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.1), var(--wc-shadow);
}
#wc2026-widget .wc-match-card.wc-live:hover {
    box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.2), var(--wc-shadow-lg), 0 10px 30px -5px rgba(220, 38, 38, 0.15);
}
#wc2026-widget .wc-match-card.wc-live::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--wc-live-red), #f87171, var(--wc-live-red));
    background-size: 200% 100%;
    animation: wc-liveBorder 2s ease infinite;
}
@keyframes wc-liveBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
#wc2026-widget .wc-match-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: linear-gradient(to right, rgba(241, 245, 249, 0.5), transparent);
    border-bottom: 1px solid var(--wc-border-light);
}
#wc2026-widget .wc-round-info {
    font-size: 0.8rem;
    color: var(--wc-text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}
#wc2026-widget .wc-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
#wc2026-widget .wc-status-badge.wc-live {
    background: var(--wc-live-red-light);
    color: var(--wc-live-red);
    border: 1px solid rgba(220, 38, 38, 0.2);
}
#wc2026-widget .wc-status-badge.wc-upcoming {
    background: var(--wc-upcoming-blue-light);
    color: var(--wc-upcoming-blue);
    border: 1px solid rgba(37, 99, 235, 0.2);
}
#wc2026-widget .wc-status-badge.wc-finished {
    background: #f3f4f6;
    color: var(--wc-finished-gray);
    border: 1px solid #e5e7eb;
}
#wc2026-widget .wc-match-body {
    padding: 35px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}
#wc2026-widget .wc-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    flex: 1;
    text-align: center;
}
#wc2026-widget .wc-team-flag {
    width: 72px;
    height: 52px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid var(--wc-border-light);
}
#wc2026-widget .wc-match-card:hover .wc-team-flag {
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
#wc2026-widget .wc-team-name {
    font-family: 'Oswald', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--wc-text-primary);
}
#wc2026-widget .wc-team-name-ar {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: var(--wc-text-secondary);
    direction: rtl;
    font-weight: 500;
}
#wc2026-widget .wc-vs-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    min-width: 100px;
}
#wc2026-widget .wc-score-display {
    font-family: 'Oswald', sans-serif;
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 3px;
    color: var(--wc-text-primary);
}
#wc2026-widget .wc-score-display.wc-live {
    color: var(--wc-live-red);
    text-shadow: 0 2px 10px rgba(220, 38, 38, 0.15);
}
#wc2026-widget .wc-score-display.wc-upcoming {
    color: var(--wc-text-muted);
    font-size: 1.6rem;
    font-weight: 500;
}
#wc2026-widget .wc-vs-text {
    font-size: 0.75rem;
    color: var(--wc-text-muted);
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
}
#wc2026-widget .wc-live-minute {
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    color: var(--wc-live-red);
    font-weight: 600;
    background: var(--wc-live-red-light);
    padding: 4px 14px;
    border-radius: 8px;
    border: 1px solid rgba(220, 38, 38, 0.15);
}
#wc2026-widget .wc-match-time {
    font-size: 0.95rem;
    color: var(--wc-accent);
    font-weight: 700;
    background: linear-gradient(135deg, #fffbeb, #fef3c7);
    padding: 4px 14px;
    border-radius: 8px;
    border: 1px solid rgba(217, 119, 6, 0.15);
}
#wc2026-widget .wc-match-footer {
    padding: 16px 24px;
    background: linear-gradient(to right, transparent, rgba(241, 245, 249, 0.5));
    border-top: 1px solid var(--wc-border-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--wc-text-secondary);
}
#wc2026-widget .wc-venue {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}
#wc2026-widget .wc-venue svg {
    width: 16px;
    height: 16px;
    color: var(--wc-text-muted);
}
#wc2026-widget .wc-match-id {
    font-family: 'Oswald', sans-serif;
    color: var(--wc-text-muted);
    font-size: 0.8rem;
    font-weight: 500;
}
#wc2026-widget .wc-loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 20px;
    gap: 20px;
}
#wc2026-widget .wc-loader {
    width: 56px;
    height: 56px;
    border: 4px solid var(--wc-border);
    border-top-color: var(--wc-primary);
    border-radius: 50%;
    animation: wc-spin 1s linear infinite;
}
#wc2026-widget .wc-loading-text {
    color: var(--wc-text-secondary);
    font-size: 1.1rem;
    font-weight: 500;
}
#wc2026-widget .wc-error-container {
    text-align: center;
    padding: 100px 20px;
}
#wc2026-widget .wc-error-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}
#wc2026-widget .wc-error-text {
    color: var(--wc-text-secondary);
    font-size: 1.2rem;
    margin-bottom: 24px;
    font-weight: 500;
}
#wc2026-widget .wc-retry-btn {
    background: var(--wc-primary);
    color: white;
    border: none;
    padding: 14px 36px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
    box-shadow: var(--wc-shadow-primary);
}
#wc2026-widget .wc-retry-btn:hover {
    background: var(--wc-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 15px 35px -5px rgba(4, 120, 87, 0.3);
}
#wc2026-widget .wc-footer {
    display: none;
    text-align: center;
    padding: 40px 20px;
    border-top: 1px solid var(--wc-border);
    color: var(--wc-text-secondary);
    font-size: 0.85rem;
    background: var(--wc-bg-card);
}
#wc2026-widget .wc-footer a {
    color: var(--wc-primary);
    text-decoration: none;
    font-weight: 600;
}
#wc2026-widget .wc-footer a:hover {
    text-decoration: underline;
}
@media (max-width: 640px) {
    #wc2026-widget .wc-hero {
        padding: 40px 20px 60px;
    }
    #wc2026-widget .wc-stats-bar {
        gap: 25px;
        padding: 20px 15px;
    }
    #wc2026-widget .wc-stat-item {
        padding: 0 10px;
    }
    #wc2026-widget .wc-stat-value {
        font-size: 1.6rem;
    }
    #wc2026-widget .wc-match-body {
        padding: 25px 18px;
    }
    #wc2026-widget .wc-team-flag {
        width: 58px;
        height: 42px;
    }
    #wc2026-widget .wc-score-display {
        font-size: 2.4rem;
    }
    #wc2026-widget .wc-team-name {
        font-size: 0.95rem;
    }
    #wc2026-widget .wc-match-header,
    #wc2026-widget .wc-match-footer {
        padding: 14px 18px;
    }
}
`;

    // ── HTML TEMPLATE ───────────────────────────────────
    const HTML_TEMPLATE = `
<div class="wc-hero">
    <div class="wc-hero-content">
        <div class="wc-badge">
            <span class="wc-live-dot"></span>
            Live Updates
        </div>
        <div class="wc-title">FIFA World Cup 2026</div>
        <div class="wc-subtitle">Real-time match updates, scores, and standings from the biggest tournament on Earth</div>
        <div class="wc-date-badge" id="wc-currentDate">Loading...</div>
    </div>
</div>

<div class="wc-stats-bar" id="wc-statsBar">
    <div class="wc-stat-item">
        <div class="wc-stat-value" id="wc-totalMatches">-</div>
        <div class="wc-stat-label">Matches Today</div>
    </div>
    <div class="wc-stat-item">
        <div class="wc-stat-value" id="wc-liveMatches">-</div>
        <div class="wc-stat-label">Live Now</div>
    </div>
    <div class="wc-stat-item">
        <div class="wc-stat-value" id="wc-upcomingMatches">-</div>
        <div class="wc-stat-label">Upcoming</div>
    </div>
</div>

<div class="wc-container">
    <div class="wc-section-header">
        <div class="wc-section-title">Today's Matches</div>
        <button class="wc-refresh-btn" id="wc-refreshBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            Refresh
        </button>
    </div>
    <div id="wc-matchesContainer">
        <div class="wc-loading-container">
            <div class="wc-loader"></div>
            <div class="wc-loading-text">Loading today's matches...</div>
        </div>
    </div>
</div>

<div class="wc-footer">
    <p>Data provided by <a href="https://wcup2026.org" target="_blank">wcup2026.org</a> &bull; FIFA World Cup 2026 Live Updates</p>
</div>
`;

    // ── HELPERS ─────────────────────────────────────────
    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function getStatusClass(status) {
        if (status === 'live') return 'wc-live';
        if (status === 'upcoming') return 'wc-upcoming';
        return 'wc-finished';
    }

    function getStatusText(status) {
        if (status === 'live') return 'Live';
        if (status === 'upcoming') return 'Upcoming';
        return 'Finished';
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderMatchCard(match) {
        const isLive = match.status === 'live';
        const isUpcoming = match.status === 'upcoming';
        const statusClass = getStatusClass(match.status);
        const team1Safe = escapeHtml(match.team1);
        const team2Safe = escapeHtml(match.team2);
        const team1ArSafe = escapeHtml(match.team1_ar);
        const team2ArSafe = escapeHtml(match.team2_ar);
        const roundSafe = escapeHtml(match.round);
        const groundSafe = escapeHtml(match.ground);
        const flag1Safe = escapeHtml(match.flag1);
        const flag2Safe = escapeHtml(match.flag2);
        const idSafe = escapeHtml(String(match.id));

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
                    <span class="wc-round-info">${roundSafe}</span>
                    <span class="wc-status-badge ${statusClass}">
                        ${isLive ? '<span class="wc-live-dot"></span>' : ''}
                        ${getStatusText(match.status)}
                    </span>
                </div>
                <div class="wc-match-body">
                    <div class="wc-team">
                        <img src="${flag1Safe}" alt="${team1Safe}" class="wc-team-flag" onerror="this.src='https://via.placeholder.com/80x60/f1f5f9/64748b?text=${team1Safe.charAt(0)}'">
                        <div class="wc-team-name">${team1Safe}</div>
                        <div class="wc-team-name-ar">${team1ArSafe}</div>
                    </div>
                    <div class="wc-vs-section">
                        ${scoreHtml}
                    </div>
                    <div class="wc-team">
                        <img src="${flag2Safe}" alt="${team2Safe}" class="wc-team-flag" onerror="this.src='https://via.placeholder.com/80x60/f1f5f9/64748b?text=${team2Safe.charAt(0)}'">
                        <div class="wc-team-name">${team2Safe}</div>
                        <div class="wc-team-name-ar">${team2ArSafe}</div>
                    </div>
                </div>
                <div class="wc-match-footer">
                    <div class="wc-venue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${groundSafe}
                    </div>
                    <div class="wc-match-id">#${idSafe}</div>
                </div>
            </div>
        `;
    }

    function updateStats(matches) {
        const total = matches.length;
        const live = matches.filter(function(m) { return m.status === 'live'; }).length;
        const upcoming = matches.filter(function(m) { return m.status === 'upcoming'; }).length;

        var elTotal = document.getElementById('wc-totalMatches');
        var elLive = document.getElementById('wc-liveMatches');
        var elUpcoming = document.getElementById('wc-upcomingMatches');
        if (elTotal) elTotal.textContent = total;
        if (elLive) elLive.textContent = live;
        if (elUpcoming) elUpcoming.textContent = upcoming;
    }

    // ── MAIN FETCH ──────────────────────────────────────
    function fetchMatches() {
        var btn = document.getElementById('wc-refreshBtn');
        var container = document.getElementById('wc-matchesContainer');

        if (btn) {
            btn.classList.add('wc-spinning');
            btn.disabled = true;
        }

        fetch(API_URL)
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.ok && data.matches) {
                    if (data.matches.length > 0) {
                        var dateEl = document.getElementById('wc-currentDate');
                        if (dateEl) dateEl.textContent = formatDate(data.matches[0].datetime);
                    }

                    updateStats(data.matches);

                    if (data.matches.length === 0) {
                        container.innerHTML = `
                            <div class="wc-error-container">
                                <div class="wc-error-icon">&#128197;</div>
                                <div class="wc-error-text">No matches scheduled for today</div>
                            </div>
                        `;
                    } else {
                        var matchesHtml = data.matches.map(renderMatchCard).join('');
                        container.innerHTML = '<div class="wc-matches-grid">' + matchesHtml + '</div>';
                    }
                } else {
                    throw new Error('Invalid data format');
                }
            })
            .catch(function(error) {
                if (container) {
                    container.innerHTML = `
                        <div class="wc-error-container">
                            <div class="wc-error-icon">&#9888;&#65039;</div>
                            <div class="wc-error-text">Unable to load matches. Please try again.</div>
                            <button class="wc-retry-btn" id="wc-retryBtn">Retry</button>
                        </div>
                    `;
                    var retryBtn = document.getElementById('wc-retryBtn');
                    if (retryBtn) retryBtn.addEventListener('click', fetchMatches);
                }
                console.error('WC2026 Widget Error:', error);
            })
            .finally(function() {
                if (btn) {
                    btn.classList.remove('wc-spinning');
                    btn.disabled = false;
                }
            });
    }

    // ── INIT ────────────────────────────────────────────
    function init() {
        // Inject Google Fonts
        var fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Inject CSS
        var styleEl = document.createElement('style');
        styleEl.textContent = CSS;
        document.head.appendChild(styleEl);

        // Find or create container
        var container = document.getElementById(CONTAINER_ID);
        if (!container) {
            container = document.createElement('div');
            container.id = CONTAINER_ID;
            document.body.appendChild(container);
        }

        // Inject HTML
        container.innerHTML = HTML_TEMPLATE;

        // Bind refresh button
        var refreshBtn = document.getElementById('wc-refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', fetchMatches);
        }

        // Initial load
        fetchMatches();

        // Auto-refresh every 60 seconds
        setInterval(fetchMatches, 60000);
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
