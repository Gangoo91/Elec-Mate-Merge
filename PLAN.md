# Business AI Dashboard Redesign Plan

## Current Problems

1. **Feels static** — "WhatsApp Connected" card is just a badge, doesn't show the full number properly
2. **No live business stats** — no visibility into what Mate is actually doing for your business
3. **Capability cards are just labels** — they describe what Mate _could_ do, not what it _is_ doing
4. **Activity feed is bare** — shows raw action_type strings, no summary or counts
5. **Grey text violations** — `text-white/50`, `text-white/30`, `text-white/25`, `text-white/20` throughout

## File to Modify

`src/components/business-ai/BusinessAIDashboardView.tsx`

## New Page Structure (6 sections)

### 1. Hero — Agent Status Card (Refined)

- Keep "Hey {firstName}" greeting
- Show full masked number more prominently: `+44 7507 ••• •41` (last 2 visible so user recognises it)
- Replace the wrench icon with the Zap/Mate icon
- Add a "Message Mate" button directly in the hero (WhatsApp deep link: `https://wa.me/{number}`)
- Status pill: green "Online" when healthy

### 2. Live Stats Strip (NEW — the key addition)

- Pull from `useDashboardData()` hook (already exists, aggregates quotes/invoices/jobs)
- Pull from `useSparkTasks()` for task counts
- 4 KPI cards in a horizontal row:
  - **Outstanding** — `business.unpaidInvoices` count + `overdueValue` formatted (amber)
  - **Overdue** — `business.overdueInvoices` count (red if >0, green if 0)
  - **Open Quotes** — `business.activeQuotes` count + `formattedQuoteValue` pipeline value (blue)
  - **Tasks Today** — from `useSparkTasks()` → `counts.today` (amber)
- Each card: icon, value, label, coloured left border
- These are the user's REAL numbers, updating live

### 3. Activity Feed (Improved)

- Keep existing `useAgentActivity()` hook
- Add summary header: "{N} actions this week" (count actions where created_at > 7 days ago)
- Show activity type badge (colour-coded pill) next to each action
- Fix all grey text → `text-white`
- Empty state: friendlier message + WhatsApp deep link button

### 4. WhatsApp Card (Simplified)

- Merge the old "WhatsApp Connected" + "Message Mate Anytime" into ONE card
- Left: green WhatsApp icon + masked number
- Right: "Open WhatsApp" button (deep link)
- Remove the verbose paragraph — the button says it all

### 5. What Mate Can Do (Keep, polish)

- Keep the 3 grouped capability sections (Running Your Business, On Site, Your Clients)
- Fix grey text

### 6. Manage Subscription (NEW — small footer link)

- Simple text link: "Manage subscription" → `/electrician/subscriptions`

---

## Data Hooks to Add

- `useDashboardData()` — business.unpaidInvoices, overdueInvoices, overdueValue, activeQuotes, formattedQuoteValue
- `useSparkTasks()` — counts.today, counts.overdue

## Grey Text Fixes

All `text-white/XX` instances → `text-white`

## Phone Masking Improvement

Current: `+44 7507 *** ***` — hides last 6 digits
New: `+44 7507 ••• •41` — shows prefix + last 2 digits (user can confirm it's theirs)

## New Imports

- `useDashboardData` from `@/hooks/useDashboardData`
- `useSparkTasks` from `@/hooks/useSparkTasks`
- `ExternalLink` from lucide-react (for WhatsApp link)
- `Settings` from lucide-react (for manage subscription)

## Imports to Remove

- `Wrench` (replaced by Zap)
- `Send` (merged into WhatsApp card)
