(function() {
    'use strict';

    // ── Configuration ──
    const CONFIG = {
        apiUrl: 'https://wcup2026.org/api/data.php?action=today',
        refreshInterval: 60000, // 60 seconds
        targetId: 'wc2026-widget',
        fonts: [
            'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
        ]
    };

    // ── CSS ──
    const WIDGET_CSS = `
        .wc2026-widget * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .wc2026-widget {
            font-family: 'Inter', sans-serif;
            background: var(--wc-bg, #fdfcff);
            color: var(--wc-text-primary, #08102b);
            min-height: 100px;
            overflow-x: hidden;
            --wc-primary: #482dff;
            --wc-primary-light: #8775f5;
            --wc-primary-dark: #2d1ab3;
            --wc-accent: #ff990a;
            --wc-accent-light: #fff3e0;
            --wc-bg: #fdfcff;
            --wc-bg-hero: #fffdfc;
            --wc-bg-card: #fffdfc;
            --wc-bg-card-hover: #f1f1f0;
            --wc-text-primary: #08102b;
            --wc-text-secondary: #989b9f;
            --wc-text-muted: #b5b5b4;
            --wc-border: #e6e6e6;
            --wc-border-light: #ececec;
            --wc-live-red: #be2e3c;
            --wc-live-red-light: #fbe4ea;
            --wc-upcoming-blue: #1976d2;
            --wc-upcoming-blue-light: #e8f0fe;
            --wc-finished-gray: #989b9f;
            --wc-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --wc-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --wc-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            --wc-shadow-primary: 0 10px 30px -5px rgba(72, 45, 255, 0.22);
        }

        .wc2026-widget .hero {
            position: relative;
            background: linear-gradient(135deg, #fffdfc 0%, #f5f3ff 50%, #ede9fe 100%);
            padding: 40px 20px 50px;
            text-align: center;
            overflow: hidden;
            border-bottom: 1px solid var(--wc-border);
            border-radius: 20px 20px 0 0;
        }
        .wc2026-widget .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(135, 117, 245, 0.1) 0%, transparent 70%);
            animation: wc2026-pulse 4s ease-in-out infinite;
        }
        @keyframes wc2026-pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        .wc2026-widget .hero-content {
            position: relative;
            z-index: 2;
            max-width: 1200px;
            margin: 0 auto;
        }
        .wc2026-widget .wc-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: var(--wc-primary-light);
            border: 1px solid rgba(72, 45, 255, 0.2);
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--wc-primary-dark);
            margin-bottom: 20px;
        }
        .wc2026-widget .live-dot {
            width: 8px;
            height: 8px;
            background: var(--wc-live-red);
            border-radius: 50%;
            animation: wc2026-blink 1.5s infinite;
            box-shadow: 0 0 8px rgba(190, 46, 60, 0.5);
        }
        @keyframes wc2026-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        .wc2026-widget h1 {
            font-family: 'Oswald', sans-serif;
            font-size: clamp(2rem, 5vw, 3.5rem);
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
        .wc2026-widget .subtitle {
            font-size: 1rem;
            color: var(--wc-text-secondary);
            max-width: 600px;
            margin: 0 auto;
        }
        .wc2026-widget .date-badge {
            display: inline-block;
            margin-top: 16px;
            background: var(--wc-bg-card);
            padding: 10px 25px;
            border-radius: 12px;
            font-family: 'Oswald', sans-serif;
            font-size: 1rem;
            letter-spacing: 1px;
            border: 1px solid var(--wc-border);
            color: var(--wc-text-secondary);
            box-shadow: var(--wc-shadow-sm);
        }

        .wc2026-widget .stats-bar {
            display: flex;
            justify-content: center;
            gap: 40px;
            padding: 20px;
            background: var(--wc-bg-card);
            border-bottom: 1px solid var(--wc-border);
            box-shadow: var(--wc-shadow-sm);
            flex-wrap: wrap;
        }
        .wc2026-widget .stat-item {
            text-align: center;
            padding: 0 20px;
        }
        .wc2026-widget .stat-value {
            font-family: 'Oswald', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--wc-primary);
            line-height: 1;
        }
        .wc2026-widget .stat-label {
            font-size: 0.7rem;
            color: var(--wc-text-secondary);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-top: 6px;
            font-weight: 600;
        }

        .wc2026-widget .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0;
        }
        .wc2026-widget .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 25px 20px 15px;
            flex-wrap: wrap;
            gap: 15px;
        }
        .wc2026-widget .section-title {
            font-family: 'Oswald', sans-serif;
            font-size: 1.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--wc-text-primary);
        }
        .wc2026-widget .section-title::before {
            content: '';
            width: 4px;
            height: 24px;
            background: linear-gradient(to bottom, var(--wc-primary), var(--wc-primary-light));
            border-radius: 2px;
        }
        .wc2026-widget .refresh-btn {
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
        .wc2026-widget .refresh-btn:hover {
            background: var(--wc-primary);
            color: white;
            border-color: var(--wc-primary);
            box-shadow: var(--wc-shadow-primary);
            transform: translateY(-1px);
        }
        .wc2026-widget .refresh-btn:active {
            transform: translateY(0);
        }
        .wc2026-widget .refresh-btn.spinning svg {
            animation: wc2026-spin 1s linear infinite;
        }
        @keyframes wc2026-spin {
            to { transform: rotate(360deg); }
        }

        .wc2026-widget .matches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 20px;
            padding: 0 20px 30px;
        }
        @media (max-width: 480px) {
            .wc2026-widget .matches-grid {
                grid-template-columns: 1fr;
            }
        }

        .wc2026-widget .match-card {
            background: var(--wc-bg-card);
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid var(--wc-border);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            box-shadow: var(--wc-shadow);
        }
        .wc2026-widget .match-card:hover {
            transform: translateY(-6px);
            border-color: rgba(72, 45, 255, 0.2);
            box-shadow: var(--wc-shadow-lg), var(--wc-shadow-primary);
        }
        .wc2026-widget .match-card.live {
            border-color: rgba(190, 46, 60, 0.3);
            box-shadow: 0 0 0 1px rgba(190, 46, 60, 0.1), var(--wc-shadow);
        }
        .wc2026-widget .match-card.live:hover {
            box-shadow: 0 0 0 1px rgba(190, 46, 60, 0.2), var(--wc-shadow-lg), 0 10px 30px -5px rgba(190, 46, 60, 0.15);
        }
        .wc2026-widget .match-card.live::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--wc-live-red), #e06c73, var(--wc-live-red));
            background-size: 200% 100%;
            animation: wc2026-liveBorder 2s ease infinite;
        }
        @keyframes wc2026-liveBorder {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .wc2026-widget .match-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 20px;
            background: linear-gradient(to right, rgba(241, 241, 240, 0.5), transparent);
            border-bottom: 1px solid var(--wc-border-light);
        }
        .wc2026-widget .round-info {
            font-size: 0.75rem;
            color: var(--wc-text-secondary);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }
        .wc2026-widget .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 14px;
            border-radius: 50px;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .wc2026-widget .status-badge.live {
            background: var(--wc-live-red-light);
            color: var(--wc-live-red);
            border: 1px solid rgba(190, 46, 60, 0.2);
        }
        .wc2026-widget .status-badge.upcoming {
            background: var(--wc-upcoming-blue-light);
            color: var(--wc-upcoming-blue);
            border: 1px solid rgba(25, 118, 210, 0.2);
        }
        .wc2026-widget .status-badge.finished {
            background: #f1f1f0;
            color: var(--wc-finished-gray);
            border: 1px solid var(--wc-border);
        }

        .wc2026-widget .match-body {
            padding: 28px 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        .wc2026-widget .team {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            flex: 1;
            text-align: center;
        }
        .wc2026-widget .team-flag {
            width: 64px;
            height: 46px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid var(--wc-border-light);
        }
        .wc2026-widget .match-card:hover .team-flag {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }
        .wc2026-widget .team-name {
            font-family: 'Oswald', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--wc-text-primary);
        }
        .wc2026-widget .team-name.ar {
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            color: var(--wc-text-secondary);
            direction: rtl;
            font-weight: 500;
        }

        .wc2026-widget .vs-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            min-width: 80px;
        }
        .wc2026-widget .score-display {
            font-family: 'Oswald', sans-serif;
            font-size: 2.6rem;
            font-weight: 700;
            line-height: 1;
            letter-spacing: 2px;
            color: var(--wc-text-primary);
        }
        .wc2026-widget .score-display.live {
            color: var(--wc-live-red);
            text-shadow: 0 2px 10px rgba(190, 46, 60, 0.15);
        }
        .wc2026-widget .score-display.upcoming {
            color: var(--wc-text-muted);
            font-size: 1.4rem;
            font-weight: 500;
        }
        .wc2026-widget .vs-text {
            font-size: 0.7rem;
            color: var(--wc-text-muted);
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
        .wc2026-widget .live-minute {
            font-family: 'Oswald', sans-serif;
            font-size: 0.95rem;
            color: var(--wc-live-red);
            font-weight: 600;
            background: var(--wc-live-red-light);
            padding: 3px 12px;
            border-radius: 8px;
            border: 1px solid rgba(190, 46, 60, 0.15);
        }
        .wc2026-widget .match-time {
            font-size: 0.85rem;
            color: var(--wc-accent);
            font-weight: 700;
            background: var(--wc-accent-light);
            padding: 3px 12px;
            border-radius: 8px;
            border: 1px solid rgba(255, 153, 10, 0.2);
        }

        .wc2026-widget .match-footer {
            padding: 14px 20px;
            background: linear-gradient(to right, transparent, rgba(241, 241, 240, 0.5));
            border-top: 1px solid var(--wc-border-light);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
            color: var(--wc-text-secondary);
        }
        .wc2026-widget .venue {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
        }
        .wc2026-widget .venue svg {
            width: 14px;
            height: 14px;
            color: var(--wc-text-muted);
            flex-shrink: 0;
        }
        .wc2026-widget .match-id {
            font-family: 'Oswald', sans-serif;
            color: var(--wc-text-muted);
            font-size: 0.75rem;
            font-weight: 500;
        }

        .wc2026-widget .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 20px;
            gap: 20px;
        }
        .wc2026-widget .loader {
            width: 48px;
            height: 48px;
            border: 4px solid var(--wc-border);
            border-top-color: var(--wc-primary);
            border-radius: 50%;
            animation: wc2026-spin 1s linear infinite;
        }
        .wc2026-widget .loading-text {
            color: var(--wc-text-secondary);
            font-size: 1rem;
            font-weight: 500;
        }

        .wc2026-widget .error-container {
            text-align: center;
            padding: 80px 20px;
        }
        .wc2026-widget .error-icon {
            font-size: 3.5rem;
            margin-bottom: 16px;
        }
        .wc2026-widget .error-text {
            color: var(--wc-text-secondary);
            font-size: 1.1rem;
            margin-bottom: 20px;
            font-weight: 500;
        }
        .wc2026-widget .retry-btn {
            background: var(--wc-primary);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 12px;
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: var(--wc-shadow-primary);
        }
        .wc2026-widget .retry-btn:hover {
            background: var(--wc-primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 15px 35px -5px rgba(72, 45, 255, 0.3);
        }

        .wc2026-widget .footer {
            text-align: center;
            padding: 25px 20px;
            border-top: 1px solid var(--wc-border);
            color: var(--wc-text-secondary);
            font-size: 0.8rem;
            background: var(--wc-bg-card);
            border-radius: 0 0 20px 20px;
        }
        .wc2026-widget .footer a {
            color: var(--wc-primary);
            text-decoration: none;
            font-weight: 600;
        }
        .wc2026-widget .footer a:hover {
            text-decoration: underline;
        }

        @media (max-width: 640px) {
            .wc2026-widget .hero {
                padding: 30px 16px 40px;
            }
            .wc2026-widget .stats-bar {
                gap: 20px;
                padding: 15px;
            }
            .wc2026-widget .stat-item {
                padding: 0 10px;
            }
            .wc2026-widget .stat-value {
                font-size: 1.4rem;
            }
            .wc2026-widget .match-body {
                padding: 20px 14px;
            }
            .wc2026-widget .team-flag {
                width: 50px;
                height: 36px;
            }
            .wc2026-widget .score-display {
                font-size: 2rem;
            }
            .wc2026-widget .team-name {
                font-size: 0.85rem;
            }
            .wc2026-widget .match-header,
            .wc2026-widget .match-footer {
                padding: 12px 16px;
            }
            .wc2026-widget .section-header {
                padding: 20px 16px 10px;
            }
            .wc2026-widget .matches-grid {
                padding: 0 16px 25px;
                gap: 16px;
            }
        }
    `;

    // ── Helpers ──
    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function getStatusClass(status) {
        if (status === 'live') return 'live';
        if (status === 'upcoming') return 'upcoming';
        return 'finished';
    }

    function getStatusText(status) {
        if (status === 'live') return 'Live';
        if (status === 'upcoming') return 'Upcoming';
        return 'Finished';
    }

    function renderMatchCard(match) {
        const isLive = match.status === 'live';
        const isUpcoming = match.status === 'upcoming';
        const statusClass = getStatusClass(match.status);

        let scoreHtml;
        if (isLive) {
            scoreHtml = `
                <div class="score-display live">${match.score[0]} - ${match.score[1]}</div>
                <div class="live-minute">${match.live_minute}'</div>
            `;
        } else if (isUpcoming) {
            scoreHtml = `
                <div class="score-display upcoming">VS</div>
                <div class="match-time">${match.time}</div>
            `;
        } else {
            scoreHtml = `
                <div class="score-display">${match.score[0]} - ${match.score[1]}</div>
                <div class="vs-text">FT</div>
            `;
        }

        return `
            <div class="match-card ${statusClass}">
                <div class="match-header">
                    <span class="round-info">${match.round}</span>
                    <span class="status-badge ${statusClass}">
                        ${isLive ? '<span class="live-dot"></span>' : ''}
                        ${getStatusText(match.status)}
                    </span>
                </div>
                <div class="match-body">
                    <div class="team">
                        <img src="${match.flag1}" alt="${match.team1}" class="team-flag" onerror="this.src='https://via.placeholder.com/80x60/f1f5f9/64748b?text=${encodeURIComponent(match.team1.charAt(0))}'">
                        <div class="team-name">${match.team1}</div>
                        <div class="team-name ar">${match.team1_ar}</div>
                    </div>
                    <div class="vs-section">${scoreHtml}</div>
                    <div class="team">
                        <img src="${match.flag2}" alt="${match.team2}" class="team-flag" onerror="this.src='https://via.placeholder.com/80x60/f1f5f9/64748b?text=${encodeURIComponent(match.team2.charAt(0))}'">
                        <div class="team-name">${match.team2}</div>
                        <div class="team-name ar">${match.team2_ar}</div>
                    </div>
                </div>
                <div class="match-footer">
                    <div class="venue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${match.ground}
                    </div>
                    <div class="match-id">#${match.id}</div>
                </div>
            </div>
        `;
    }

    function updateStats(matches, container) {
        const total = matches.length;
        const live = matches.filter(m => m.status === 'live').length;
        const upcoming = matches.filter(m => m.status === 'upcoming').length;

        const totalEl = container.querySelector('#wc2026-totalMatches');
        const liveEl = container.querySelector('#wc2026-liveMatches');
        const upcomingEl = container.querySelector('#wc2026-upcomingMatches');

        if (totalEl) totalEl.textContent = total;
        if (liveEl) liveEl.textContent = live;
        if (upcomingEl) upcomingEl.textContent = upcoming;
    }

    // ── Main Render ──
    function createWidgetHTML() {
        return `
            <div class="wc2026-widget">
                <div class="hero">
                    <div class="hero-content">
                        <div class="wc-badge">
                            <span class="live-dot"></span>
                            Live Updates
                        </div>
                        <h1>FIFA World Cup 2026</h1>
                        <p class="subtitle">Real-time match updates, scores, and standings from the biggest tournament on Earth</p>
                        <div class="date-badge" id="wc2026-currentDate">Loading...</div>
                    </div>
                </div>

                <div class="stats-bar" id="wc2026-statsBar">
                    <div class="stat-item">
                        <div class="stat-value" id="wc2026-totalMatches">-</div>
                        <div class="stat-label">Matches Today</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="wc2026-liveMatches">-</div>
                        <div class="stat-label">Live Now</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="wc2026-upcomingMatches">-</div>
                        <div class="stat-label">Upcoming</div>
                    </div>
                </div>

                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Today's Matches</h2>
                        <button class="refresh-btn" id="wc2026-refreshBtn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                            </svg>
                            Refresh
                        </button>
                    </div>

                    <div id="wc2026-matchesContainer">
                        <div class="loading-container">
                            <div class="loader"></div>
                            <div class="loading-text">Loading today's matches...</div>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <p>Data provided by <a href="https://wcup2026.org" target="_blank">wcup2026.org</a> &bull; FIFA World Cup 2026 Live Updates</p>
                </div>
            </div>
        `;
    }

    // ── Data Fetching ──
    async function fetchMatches(container) {
        const btn = container.querySelector('#wc2026-refreshBtn');
        const matchesContainer = container.querySelector('#wc2026-matchesContainer');

        if (btn) {
            btn.classList.add('spinning');
            btn.disabled = true;
        }

        try {
            const response = await fetch(CONFIG.apiUrl);
            const data = await response.json();

            if (data.ok && data.matches) {
                if (data.matches.length > 0) {
                    const dateEl = container.querySelector('#wc2026-currentDate');
                    if (dateEl) dateEl.textContent = formatDate(data.matches[0].datetime);
                }

                updateStats(data.matches, container);

                if (data.matches.length === 0) {
                    matchesContainer.innerHTML = `
                        <div class="error-container">
                            <div class="error-icon">&#128197;</div>
                            <div class="error-text">No matches scheduled for today</div>
                        </div>
                    `;
                } else {
                    const matchesHtml = data.matches.map(renderMatchCard).join('');
                    matchesContainer.innerHTML = `<div class="matches-grid">${matchesHtml}</div>`;
                }
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            matchesContainer.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">&#9888;&#65039;</div>
                    <div class="error-text">Unable to load matches. Please try again.</div>
                    <button class="retry-btn" id="wc2026-retryBtn">Retry</button>
                </div>
            `;
            const retryBtn = container.querySelector('#wc2026-retryBtn');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => fetchMatches(container));
            }
            console.error('[WC2026 Widget] Error fetching matches:', error);
        } finally {
            if (btn) {
                btn.classList.remove('spinning');
                btn.disabled = false;
            }
        }
    }

    // ── Initialization ──
    function init() {
        // Find target container
        let target = document.getElementById(CONFIG.targetId);

        // If no target found, create one and append to body
        if (!target) {
            target = document.createElement('div');
            target.id = CONFIG.targetId;
            document.body.appendChild(target);
        }

        // Inject fonts
        CONFIG.fonts.forEach(fontUrl => {
            if (!document.querySelector(`link[href="${fontUrl}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = fontUrl;
                document.head.appendChild(link);
            }
        });

        // Inject scoped CSS
        if (!document.getElementById('wc2026-widget-styles')) {
            const style = document.createElement('style');
            style.id = 'wc2026-widget-styles';
            style.textContent = WIDGET_CSS;
            document.head.appendChild(style);
        }

        // Render HTML
        target.innerHTML = createWidgetHTML();

        // Bind refresh button
        const refreshBtn = target.querySelector('#wc2026-refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => fetchMatches(target));
        }

        // Initial fetch
        fetchMatches(target);

        // Auto-refresh
        const intervalId = setInterval(() => fetchMatches(target), CONFIG.refreshInterval);

        // Store interval ID for cleanup
        target.dataset.wc2026Interval = intervalId;
    }

    // ── Auto-init ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API for manual control
    window.WC2026Widget = {
        refresh: function() {
            const target = document.getElementById(CONFIG.targetId);
            if (target) fetchMatches(target);
        },
        destroy: function() {
            const target = document.getElementById(CONFIG.targetId);
            if (target) {
                if (target.dataset.wc2026Interval) {
                    clearInterval(parseInt(target.dataset.wc2026Interval));
                }
                target.remove();
            }
            const style = document.getElementById('wc2026-widget-styles');
            if (style) style.remove();
        }
    };

})();
