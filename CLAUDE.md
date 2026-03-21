# Tech Titans Hub - Website Plan

## Overview
Website for the FLL (FIRST LEGO League) team **Tech Titans**. Built with the existing Vite + React + TypeScript + Tailwind + shadcn/ui stack.

## Color Scheme
- **Primary:** Solid black (`#000000`) - backgrounds, text, navbar
- **Accent:** Solid blue (`#1E40AF` / `#2563EB`) - buttons, highlights, links, headings
- **White** (`#FFFFFF`) - text on dark backgrounds, card backgrounds
- No gradients. Solid colors only.

## Pages & Routing

### 1. Home (`/`)
- Rework the existing `Index.tsx` page
- Hero banner with team name "Tech Titans" and FLL branding
- Quick navigation cards linking to each subpage
- Brief team tagline / mission statement

### 2. About Us (`/about`)
- Who the team is, when it was founded, team mission
- What FLL is and why the team competes
- Team photo placeholder

### 3. Team Members (`/team`)
- Grid of team member cards
- Each card: photo placeholder, name, role/specialty
- Placeholder data (user will fill in real names/photos later)

### 4. Innovation Project (`/innovation`)
- Description of the team's FLL Innovation Project
- Problem statement section
- Solution section
- Research & process section
- Placeholder content for the user to fill in
- The innovation project is Archepal: https://github.com/Ak-dude/myarchepal-techtitans-prod

### 5. Robot Games (`/robot`)
- Overview of the robot design
- Robot missions / game strategy section
- Robot photo/diagram placeholder
- Score/achievement highlights section

### 6. Core Values (`/corevalues`)
- Display FLL Core Values: Discovery, Innovation, Impact, Inclusion, Teamwork, Fun
- Each value gets its own card with an icon and description
- Section showing how the team embodies each value

## Shared Layout & Components

### Navbar (`Navbar.tsx` - modify existing)
- Black background, blue accent on active/hover links
- Logo/team name on the left
- Links: Home, About Us, Team Members, Innovation Project, Robot Games, Core Values
- Mobile hamburger menu

### Footer (`FooterSection.tsx` - modify existing)
- Black background, white text
- Team name, FLL season info
- Social links placeholders

### Page Layout Wrapper (new: `PageLayout.tsx`)
- Wraps all pages with Navbar + Footer
- Consistent padding and max-width

## File Structure (new/modified files)
```
src/
  components/
    Navbar.tsx          (modify)
    FooterSection.tsx   (modify)
    PageLayout.tsx      (new)
  pages/
    Index.tsx           (modify)
    AboutPage.tsx       (new)
    TeamPage.tsx        (new)
    InnovationPage.tsx  (new)
    RobotPage.tsx       (new)
    CoreValuesPage.tsx  (new)
  App.tsx               (modify - add routes)
```

## Implementation Notes
- Use `react-router-dom` (already installed) for routing
- Use `lucide-react` (already installed) for icons
- Use `framer-motion` (already installed) for page transitions
- Use shadcn `Card` components for team member and core values cards
- All pages are static content (no backend needed)
- Responsive: mobile-first design with Tailwind breakpoints
- Tailwind config should be updated to use the black/blue color scheme as theme colors

- Team Members:

Arjun Katta

Yogi Desai

Shreyan Sharma

Aarush Mene

Atharv Pardeshi

Anish Rudras

Prakhar Purohit

Sachin Senthil Kumar






Add a cookie Policy as well

## Admin Area (`/admin`)

### Overview
Password-protected admin panel for editing site content. Uses `localStorage` to persist changes and a simple client-side password gate. **Note:** password is client-side only (visible in JS source) — sufficient for casual access control, not for sensitive data.

### Password: `TechTitans2025`
- Login page at `/admin` with a password input
- On correct password, store auth flag in `sessionStorage` (clears on tab close)
- Redirect back to login if not authenticated

### Admin Dashboard
Once logged in, the admin sees a dashboard with sections to edit:

#### 1. Team Members Manager
- View list of current team members
- Add new member (name, role)
- Edit existing member name/role
- Remove a member
- Changes saved to `localStorage`

#### 2. Page Text Editor
- Editable fields for key text on each page:
  - **Home:** tagline, slogan
  - **About Us:** description paragraphs
  - **Innovation Project:** challenge description, step descriptions
  - **Robot Games:** feature descriptions, scores
  - **Core Values:** "How We Live This" descriptions
- Simple textarea/input fields, save button per section

#### 3. Stats Editor
- Edit the About page stats (Team Members count, Seasons, Robots Built, Competitions)
- Edit Robot Games score highlights (Best Score, Avg Score, Missions)

### Data Flow
- All editable content stored in `localStorage` under a single key (e.g., `techTitans_siteData`)
- Pages read from `localStorage` first; fall back to hardcoded defaults if no saved data
- Admin edits update `localStorage` immediately on save
- A "Reset to Defaults" button clears `localStorage` overrides

### File Structure (new files)
```
src/
  pages/
    AdminLogin.tsx        (new - password gate)
    AdminDashboard.tsx    (new - main admin panel)
  components/
    AdminRoute.tsx        (new - auth guard wrapper)
  lib/
    siteData.ts           (new - localStorage read/write helpers + default data)
  App.tsx                 (modify - add /admin routes)
```

### Implementation Notes
- Use React state + `localStorage` for persistence (no backend)
- Use shadcn `Input`, `Textarea`, `Button`, `Card`, `Tabs` components
- Admin panel uses same dark theme as rest of site
- Tabs layout: Team Members | Page Content | Stats

