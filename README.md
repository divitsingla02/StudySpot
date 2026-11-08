# StudySpot – Smart Campus Space Finder

> **Tagline:** Find your space. Find your focus.

StudySpot is a campus space discovery and hourly reservation platform that helps college students find suitable places to study, work, collaborate, or relax. Students can see which classrooms, library zones, and campus cafes are currently available, how crowded they are, and what noise levels they can expect.

---

## 🚀 Quick Start

From the workspace root or inside `studyspot/`:

```bash
# If running from studyspot/ directory:
cd studyspot
npm run dev

# Or from workspace root:
npm run dev
```

Then open your browser at `http://localhost:3000` (or the port indicated by Vite).

---

## 🎨 Visual Design System

- **Primary Background:** Warm off-white (`#F8F9F6`)
- **Primary Text:** Dark charcoal (`#202820`)
- **Accent Color:** Forest green (`#276749`)
- **Secondary Accent:** Soft sage green (`#EBF2EB`, `#DAE7DA`, `#537553`)
- **Cards:** White (`#FFFFFF`) with subtle borders (`#E8EDE8`)
- **Border Radius:** 14–18px (`rounded-card` = 16px, `rounded-2xl`)
- **Subtle Shadows:** `shadow-subtle`, `shadow-elevated`, `shadow-modal`
- **Typography:** Inter & Plus Jakarta Sans with crisp legibility

---

## 🌟 Key Features

### 1. Discover Dashboard
- **Campus Selector:** Allows switching between University Campus (Main), Tech & Innovation Campus, and Health Sciences Campus.
- **Dynamic Stats Bar:** Dynamically calculates:
  - Total spaces (`spaces.length`)
  - Available now (`< 60% occupancy`)
  - Filling Fast (`60% – 85% occupancy`)
  - Crowded (`> 85% occupancy`)
  - Free seats count across the campus
- **Global Search:** Fast instant filter across names, buildings, floors, categories, and amenities with `/` hotkey support.

### 2. Multi-Faceted Filters & Sorting
- **Category Filter:** All Spaces, Classrooms, Library, Cafes
- **Noise Level Filter:** Silent Zone, Low Noise, Moderate, Lively / Social
- **Availability Filter:** Available, Filling Fast, Crowded
- **Minimum Seating Capacity:** Any, 20+, 30+, 40+, 50+
- **Sorting Options:** Recommended, Availability (most open first), Capacity (high to low), Capacity (low to high), Fewest people, Alphabetical.
- **Reset Filters:** Instant 1-click restore.

### 3. Study Space Cards & Details
- 16 curated, realistic campus study locations across campus buildings.
- Live occupancy progress meter with seat countdown.
- Availability and noise badges with matching color logic.
- Rich amenities list (Wi-Fi 6, Charging Outlets, Whiteboards, Standing Desks, etc.).
- **Location Details Modal:** High-resolution view, building & exact floor info, opening hours, acoustic rating, and instant reserve trigger.

### 4. 1-Hour Focus Hold Reservation System
- Automatic calculation of end time exactly 1 hour later.
- Custom date selection (Today / Tomorrow) and time-slot picker.
- Student name and study purpose personalization.
- **Safety checks:**
  - Prevents booking when a space is full.
  - Prevents duplicate reservations for the same space and time slot.
- Confetti celebration upon reservation confirmation!
- Generates readable booking ID (e.g., `SS-84192`).
- Saves directly into browser `localStorage` and **dynamically updates space seat occupancy** across the app.

### 5. "My Bookings" Dashboard
- View upcoming reservations, past sessions, and cancelled bookings.
- Cancel upcoming reservations with 1-click confirmation (seat is immediately returned to campus availability).
- Clean empty state with quick action to explore available spaces.

---

## 📁 Project Architecture

```
studyspot/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── spaces.js          # Centralized campus spaces dataset
    ├── utils/
    │   └── bookingUtils.js    # LocalStorage persistence, occupancy & availability logic
    ├── components/
    │   ├── Navbar.jsx         # Header navigation & student avatar
    │   ├── SearchBar.jsx      # Search with campus selector & '/' shortcut
    │   ├── FilterBar.jsx      # Category pills, noise, capacity, sort controls
    │   ├── SpaceCard.jsx      # Space card with occupancy meter & badges
    │   ├── LocationDetailsModal.jsx # Detailed space overview
    │   ├── BookingModal.jsx   # 1-hour reservation flow
    │   ├── AboutModal.jsx     # Campus guide & study etiquette
    │   └── Toast.jsx          # Notification toasts
    └── pages/
        ├── Discover.jsx       # Main discover dashboard
        └── MyBookings.jsx     # Reservations manager
```

---

*StudySpot &bull; Find your space. Find your focus.*

