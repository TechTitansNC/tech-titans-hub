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

## Admin Panel Revamp — PenPot-Integrated Visual Editor

### Context
PenPot's core editor (workspace, viewport, sidebar, toolbars) is written in **ClojureScript** and cannot be imported into React/TypeScript. However, PenPot's repo contains a standalone **`@penpot/text-editor`** written in plain JavaScript — a rich text editor with selection control, inline styling, clipboard support, and paragraph management. This is the one usable component from PenPot's codebase.

The revamp replaces the current form-based admin panel with a **visual page editor** that:
1. Uses PenPot's `TextEditor` for rich inline text editing
2. Mirrors PenPot's UI layout (left sidebar for page/section nav, center canvas preview, right sidebar for properties)
3. Embeds a PenPot instance via iframe for full design work

### Phase A — Foundation

#### A.1: Copy PenPot TextEditor into project
- Copy `/tmp/penpot/frontend/text-editor/src/editor/` into `src/lib/penpot-editor/`
- Only the JS editor code (no playground, no tests, no WASM)
- Create a React wrapper component `PenPotTextEditor.tsx` that mounts the `TextEditor` class onto a DOM ref
- Wrapper accepts `value` (HTML string) and `onChange` callback

#### A.2: Create visual editor shell layout
- New component: `src/components/admin/EditorLayout.tsx`
- PenPot-inspired layout:
  - **Left sidebar** (240px): page list + section tree for selected page
  - **Center panel**: live preview canvas showing the selected page section
  - **Right sidebar** (300px): property editor panel for the selected element
  - **Top toolbar**: save, reset, preview, logout buttons
- Dark theme matching PenPot's UI (gray-900 bg, subtle borders)

#### A.3: Build page/section navigation (left sidebar)
- List all site pages: Home, About, Team, Innovation, Robot, Core Values
- Each page expands to show its editable sections (e.g., About → "Paragraph 1", "Paragraph 2", "Stats")
- Clicking a section loads it into the center canvas and right sidebar
- Active page/section highlighted in blue

### Phase B — Center Canvas & Live Preview

#### B.1: Build canvas preview component
- `src/components/admin/CanvasPreview.tsx`
- Renders a scaled-down live preview of the selected page section
- Uses the actual page component markup (not a screenshot) wrapped in a scaled container
- Shows a bounding box around the currently selected editable element
- Click-to-select: clicking text in the preview selects it for editing in the right sidebar

#### B.2: Integrate PenPot TextEditor into canvas
- When an editable text element is clicked in the canvas, activate PenPot's `TextEditor` inline on that element
- Support inline formatting (bold, italic) via the TextEditor's built-in commands
- On blur/deselect, save the edited content back to `siteData`

#### B.3: Add zoom and pan controls
- Zoom slider (50%–200%) in the top toolbar
- Fit-to-width button
- Scroll to pan within the canvas area

### Phase C — Right Sidebar Property Editor

#### C.1: Text properties panel
- When a text section is selected:
  - PenPot TextEditor for the content itself
  - Font size, weight, color pickers (mapped to Tailwind classes)
  - Alignment controls (left, center, right)
- Changes reflected live in the canvas preview

#### C.2: Team members panel
- When "Team Members" section is selected:
  - List of members with inline name/role editing
  - Add/remove member buttons
  - Drag-to-reorder (optional)

#### C.3: Stats & scores panel
- When stats/scores section is selected:
  - Input fields for each stat value
  - Live preview updates as values change

### Phase D — PenPot Instance Integration

#### D.1: PenPot embed tab
- Tab in left sidebar: "Design Studio"
- Embeds PenPot cloud (design.penpot.app) or self-hosted instance via iframe
- Admin pastes their PenPot project share URL
- URL persisted in `localStorage`

#### D.2: PenPot design reference panel
- Split view: PenPot design on one side, site preview on the other
- Allows admins to reference designs while editing content

### Phase E — Polish & Wiring

#### E.1: Wire all pages to read from visual editor data
- Ensure all public pages use `getSiteData()` (already done)
- Validate that visual editor changes propagate correctly to all pages
- Add undo support (store last 10 states in memory)

#### E.2: Add page management
- "Add Custom Page" feature: admin can create a new page with a title and sections
- Custom pages rendered with a generic template
- New pages automatically added to navbar and router

#### E.3: Import/Export
- Export site data as JSON file (download)
- Import site data from JSON file (upload)
- Useful for backup/restore and moving between browsers

### File Structure (new/modified files)
```
src/
  lib/
    penpot-editor/          (copied from PenPot repo — JS text editor)
      TextEditor.js
      Event.js
      commands/
      controllers/
      content/
      clipboard/
      layout/
  components/
    admin/
      EditorLayout.tsx      (main editor shell)
      CanvasPreview.tsx      (live preview panel)
      LeftSidebar.tsx        (page/section navigation)
      RightSidebar.tsx       (property editor)
      TopToolbar.tsx         (save, reset, preview, logout)
      PenPotTextEditor.tsx   (React wrapper for PenPot TextEditor)
      TeamMembersPanel.tsx   (team member editing)
      StatsPanel.tsx         (stats/scores editing)
  pages/
    AdminDashboard.tsx       (rewrite — visual editor)
```

