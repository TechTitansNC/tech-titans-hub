<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Status & History</title>
  <style>
    :root {
      --primary: #2563eb;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #1e293b;
      --text-muted: #64748b;
      --accent: #f59e0b;
    }

    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: var(--text);
      background-color: var(--bg);
      margin: 0;
      padding: 2rem 1rem;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 3rem;
    }

    h1 { margin-bottom: 0.5rem; }
    .subtitle { color: var(--text-muted); }

    .section-title {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.5rem;
      margin-top: 3rem;
      margin-bottom: 1.5rem;
    }

    /* Grid Layout for Cards */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: var(--card-bg);
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .season-badge {
      display: inline-block;
      background: #dbeafe;
      color: var(--primary);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    /* Timeline for Journey */
    .timeline {
      position: relative;
      padding-left: 1.5rem;
      border-left: 2px solid #cbd5e1;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      left: -1.95rem;
      top: 0.3rem;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--primary);
    }

    .award-list {
      list-style: none;
      padding: 0;
    }

    .award-list li {
      margin-bottom: 0.5rem;
      padding-left: 1.2rem;
      position: relative;
    }

    .award-list li::before {
      content: '🏆';
      position: absolute;
      left: 0;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>Team Status & History</h1>
      <p class="subtitle">A look back at our last three seasons of innovation, awards, and growth.</p>
    </header>

    <!-- Innovation Projects -->
    <h2 class="section-title">💡 Innovation Projects</h2>
    <div class="grid">
      <div class="card">
        <span class="season-badge">Season 2025-2026</span>
        <h3>Smart Energy Monitor</h3>
        <p>Developed an IoT sensor system to help local small businesses track and optimize idle power usage in real time.</p>
      </div>
      <div class="card">
        <span class="season-badge">Season 2024-2025</span>
        <h3>Eco-Filter Water Basin</h3>
        <p>Designed a portable, low-cost filtration unit using natural coconut husk charcoal for outdoor recreation areas.</p>
      </div>
      <div class="card">
        <span class="season-badge">Season 2023-2024</span>
        <h3>Community Cargo Pod</h3>
        <p>Engineered an aerodynamic cargo attachment for municipal bicycles to encourage local eco-friendly deliveries.</p>
      </div>
    </div>

    <!-- Awards & Recognitions -->
    <h2 class="section-title">🏆 Season Awards</h2>
    <div class="grid">
      <div class="card">
        <span class="season-badge">2025-2026</span>
        <ul class="award-list">
          <li>1st Place - Innovation Project Award</li>
          <li>Finalist - Robot Performance</li>
        </ul>
      </div>
      <div class="card">
        <span class="season-badge">2024-2025</span>
        <ul class="award-list">
          <li>Engineering Excellence Award</li>
          <li>2nd Place - Regional Championship</li>
        </ul>
      </div>
      <div class="card">
        <span class="season-badge">2023-2024</span>
        <ul class="award-list">
          <li>Core Values Award</li>
          <li>Best Rookie Team Mentor</li>
        </ul>
      </div>
    </div>

    <!-- Team Journey Timeline -->
    <h2 class="section-title">🚀 Our Journey</h2>
    <div class="timeline">
      <div class="timeline-item">
        <h3>2025 - Expanding Impact</h3>
        <p>Grew the team from 6 to 10 members and launched outreach workshops teaching robotics and CAD modeling to 50+ middle school students.</p>
      </div>
      <div class="timeline-item">
        <h3>2024 - Rebuilding & Redesigning</h3>
        <p>Shifted focus toward custom 3D-printed components, standardizing our design process and improving prototype reliability.</p>
      </div>
      <div class="timeline-item">
        <h3>2023 - The Foundation</h3>
        <p>Established the team, built our first competition workspace, and competed in our very first regional qualifier.</p>
      </div>
    </div>
  </div>

</body>
</html>
