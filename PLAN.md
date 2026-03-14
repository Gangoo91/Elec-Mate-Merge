# AdminTrials Page — Full Redesign Plan

## Current State Analysis

The trials page (2,037 lines) was built when trials were the primary acquisition channel. It's a heavy page with:
- 7 stat cards (top 2x2 grid + secondary 3-col row)
- Engagement breakdown card (Hot/Warm/Cold with score info panel)
- Filter card with 3 dropdowns + search + action buttons
- Users grouped by trial expiry date with per-group email buttons
- Deep user detail sheet (engagement score breakdown, activity timeline, time-to-first-value)

**Why it's semi-redundant now:** Users sign up with card directly (Stripe/RevenueCat). The "trial" is just the 7-day window before first charge — not a separate funnel. The urgency framing ("Ending Today!") was for a world where you'd chase free-trial users to convert. Now conversion happens at signup, so this page is really about **retention** — who's actually using the app vs who signed up and ghosted.

## What's Still Valuable (KEEP)

1. **Conversion rate tracking** — % of signups staying past day 7
2. **Engagement scoring** — who's using the app vs ghosting
3. **Email sending** — nudging inactive users back (retention)
4. **Activity timeline in detail sheet** — understanding individual behaviour
5. **Score breakdown** — the 9-component engagement calc is genuinely useful
6. **CSV export, hidden users, URL filter persistence**

## What's Outdated (REMOVE/SIMPLIFY)

1. **7 separate stat cards** — too many cards, merge into one hero
2. **"Ending Today/Tomorrow" urgency** — less critical since they've already paid
3. **Grouped-by-expiry-date layout** — confusing, flat list is clearer
4. **Per-group email buttons** — replace with a single bulk action bar
5. **Old Card-based styling** — bring up to glass-premium standard

---

## Redesign Approach: Keep All Data, New Visual Shell

NO data query changes. NO mutation changes. Just visual restructuring + glass-premium polish.

---

## Changes

### 1. New Imports
- `motion` from `framer-motion`
- `AnimatedCounter` from `@/components/dashboard/AnimatedCounter`
- Animation constants (`sectionVariants`, `containerVariants`, `listItemVariants`)

### 2. Hero Section — Consolidated Stats (replaces 7 cards)
Single glass-premium hero card replacing the 4-card + 3-card grids:

```
┌──────────────────────────────────────────────────┐
│ 2px gradient accent line (amber → orange)        │
│                                                  │
│  [icon]  Trials & Retention        [CSV] [⟳]    │
│          315 total signups (AnimatedCounter)      │
│                                                  │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌────────┐       │
│  │ ● 4   │ │ 149   │ │ 310   │ │ 32.1%  │       │
│  │Active │ │Convrtd│ │Expired│ │CVR Rate│       │
│  └───────┘ └───────┘ └───────┘ └────────┘       │
└──────────────────────────────────────────────────┘
```

- Tapping a stat still toggles the status filter (keep existing behaviour)
- All `text-muted-foreground` → `text-white`
- AnimatedCounter for all numbers
- "Ending Today" count shown as a badge inside the Active stat if > 0

### 3. Engagement Breakdown — Horizontal Pill Row (replaces full Card)
Replace the large engagement card with a quick-filter pill row matching AdminUsers style:

```
[🔥 Hot (1)]  [⚡ Warm (2)]  [❄️ Cold (1)]  [ℹ️]
```

- Same toggle behaviour as existing (tap to filter)
- Active = gradient fill pill, inactive = ghost outline
- Info icon expands the scoring explanation (keep existing collapsible)
- motion.div with stagger

### 4. Filter Bar — Unified (replaces Card wrapper)
Replace the Card-wrapped filter section with a cleaner layout:
- Search bar: same style as AdminUsers (glass bg, `text-white` placeholder)
- 3 filter dropdowns in a row below
- Action buttons (CSV, refresh, unhide) grouped with search
- glass-premium filter area when expanded

### 5. User List — Flat, No Day Grouping
**Remove grouping-by-expiry-date.** Flatten into a single staggered list like AdminUsers.

Each card:
```
┌────────────────────────────────────────────────┐
│ glass-premium, border-l colour = engagement    │
│                                                │
│  [role icon]  Name           🔥 Hot    3d left │
│               email@...            Score: 42   │
│                                                │
│  [⚡ electrician] [Active] [✉️ Sent]  Last: 2h │
└────────────────────────────────────────────────┘
```

- glass-premium rounded-2xl
- Left border: red (hot), amber (warm), blue (cold) based on engagement
- Row 1: role icon, name, engagement badge, days remaining / status text
- Row 2: email (full, break-all), score number
- Row 3: role badge + status badge + email-sent badge + last active time
- motion.div with listItemVariants for stagger
- onClick opens detail sheet (unchanged)

### 6. Bulk Email Bar (replaces per-group buttons)
Show a sticky bar when users are displayed:

```
┌──────────────────────────────────────────────────┐
│ 2px accent line                                  │
│  4 users shown  •  2 not yet emailed  [Email All]│
└──────────────────────────────────────────────────┘
```

- glass-premium rounded-2xl
- Shows count of currently filtered users
- "Email All" sends to un-emailed users in current filter (keep existing bulk email logic)

### 7. Loading Skeletons
- glass-premium rounded-2xl matching new card height

### 8. Empty State
- glass-premium rounded-2xl

### 9. Detail Sheet — Visual Polish Only
Keep ALL existing content (it's genuinely useful). Apply:
- Every `text-muted-foreground` → `text-white`
- Drag handle → `bg-white/20`
- No structural changes to the engagement breakdown, activity timeline, actions, etc.

### 10. Global: text-muted-foreground → text-white
Every occurrence in the file (~30+), including detail sheet labels.

---

## Data Flow (UNCHANGED)

- `useAdminUsersBase()` — cached base user data
- Enrichment query → user_activity, quotes, eic_schedules, study_sessions, user_activity_summary
- `todayEmailSends` query → trial_email_sends
- Stats memo, grouped/filtered memo — keep all logic, just stop grouping by date
- Detail sheet query → per-user deep activity data
- All mutations: sendReminder, bulkEmail, hideUser — unchanged

## Verification

1. `npx tsc --noEmit` — no errors
2. Navigate to `/admin/trials` — hero card, engagement pills, flat user list with stagger
3. All text is white (no grey)
4. Tap hero stat → filters by status
5. Tap engagement pill → filters by lead temperature
6. Search + dropdown filters work
7. Tap user card → detail sheet opens with full data
8. Email sending (single from sheet + bulk from bar) works
9. CSV export works
10. Pull-to-refresh works
11. Hidden user management works
