# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Elec-Mate 2.0

UK electrical certification & apprentice training platform. React/Vite/TypeScript/Tailwind/Supabase.

## CRITICAL: Always Ask Before Acting

**NEVER make changes without explaining what you plan to do and getting approval first.** This applies to:

- Editing or creating files
- Installing or removing packages
- Changing configuration
- Running destructive commands
- Refactoring or restructuring code
- Deleting anything

**The workflow is ALWAYS: explain → get approval → then do it.** No exceptions. Even if the change seems obvious or small, say what you're about to do first. The user must confirm before you proceed.

## Build & Development Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Supabase Edge Functions

```bash
npx supabase functions deploy <function-name> --project-ref jtwygbeceundfgnkirof
```

## Critical Design Principle

**EVERY FILE MUST HAVE A NATIVE MOBILE APP FEEL.** This is a mobile-first application used by electricians on job sites. All UI must feel like a native iOS/Android app, not a desktop website viewed on mobile.

## Language

**UK English only**: analyse, colour, centre, organisation, licence, programme, metre

## Design System

**Reference implementation: `src/components/inspection/ev-charging/`.**
The specialist certificates (EV charging, emergency lighting, BESS, lightning
protection, PAT, fire alarm, solar PV) carry the current form language. Copy
from those, not from older screens.

⚠️ **Two languages exist in the codebase.** `eic/`, `eicr/`, `minor-works/` and
most of the Employer Hub are still on the superseded boxed style and are being
migrated. Seeing the old pattern in those files is not licence to write more of
it — new work uses the language below.

### Form Controls — underline, not boxed

Fields are underlines on a transparent background. No filled boxes, no focus
rings; the caret and the bottom border carry focus.

```tsx
// Input — h-11, bottom border only, yellow caret + focus border, NO ring
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

// Label — sentence case, FULL white. Never white/60-70 (reads grey).
<Label className="text-[12px] font-medium text-white mb-1 block">

// Select — MobileSelectPicker, not a raw <Select>
<MobileSelectPicker ... />

// Single-choice — chips beat a select for 2-3 options
const chipOn  = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
```

### Cards — edge-to-edge on mobile

Full-bleed on phones, inset and rounded from `sm:` up.

```tsx
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';
```

### Section Headings — typography only

No icons, no coloured dots, no gradient bars. Hierarchy comes from type and
spacing (see `EVSectionHeader.tsx`).

```tsx
<h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>

// Sub-heading inside a card — separated by a rule, not decoration
<div className="border-t border-white/[0.1] pt-4">
  <h3 className="text-sm font-semibold text-white">{children}</h3>
</div>
```

### Multi-step forms

Long forms are tabbed steps with per-tab completion and prev/next navigation,
not one long scroll. Direction-aware slide: `animate-mw-step-in` forward,
`animate-mw-step-back` on the way back.

### Sheets (forms, tools, AI features, scanners)

Bottom sheet, never a centred `Dialog` — a centred modal cannot be reached
one-handed on a phone. **`h-[85vh]` is the standard**; don't invent 90/92/95.

```tsx
<Sheet open={true} onOpenChange={...}>
  <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
    <div className="flex flex-col h-full bg-background">
```

### Colors

| Element         | Classes                                                         |
| --------------- | --------------------------------------------------------------- |
| Primary accent  | `elec-yellow`, `bg-elec-yellow`                                 |
| Input focus     | `focus:border-elec-yellow` + `caret-elec-yellow`, **no ring**   |
| Field underline | `border-b border-white/[0.15]`, hover `white/[0.3]`             |
| Card background | `bg-gradient-to-b from-white/[0.08] to-white/[0.04]`            |
| Alerts          | `border-orange-500/30 bg-orange-500/10 text-orange-300`         |

⚠️ **All text is `text-white`.** Low-opacity white (`text-white/65`) renders as
grey and is not allowed — including field labels and helper text.

## Study Centre Structure

```
src/pages/study-centre/
├── apprentice/           # Apprentice hub (Level 2/3 courses)
├── upskilling/          # CPD courses for qualified electricians
└── college/             # College tutor dashboard
```

### Course Module Pattern

```tsx
// Each module: ModuleX.tsx with sections as child routes
// Sections: ModuleXSectionY.tsx
// Subsections: subsectionZ.tsx (numbered content pages)
```

## Key Directories

- `src/components/inspection-app/` - EICR/EIC forms
- `src/components/testing/` - Board scanner, schedule of tests
- `src/components/electrician-tools/` - Calculators, site safety
- `src/pages/study-centre/` - All learning content
- `supabase/functions/` - Edge functions

## Mobile-First / Native App Feel

**Every component must feel like a native mobile app.** Electricians use this on job sites - it must be thumb-friendly, fast, and intuitive.

### Required Touch Patterns

- Touch targets: `h-11` minimum (44px)
- Always add `touch-manipulation` to interactive elements
- Use `hidden sm:block` to hide non-essential elements on mobile
- Bottom padding for fixed footers: `pb-20 sm:pb-4`

### Native App Behaviours

- Use bottom sheets (`Sheet` with `side="bottom"`) instead of modals for tools/pickers
- Swipeable interactions where appropriate (`react-swipeable`)
- Smooth transitions with `framer-motion`
- Haptic-style feedback on actions (visual confirmation, toasts)
- Sticky headers/footers for navigation within forms
- Pull-to-refresh patterns where data can be refreshed

### What NOT to Do

- No hover-dependent interactions (tooltips must have tap alternatives)
- No tiny clickable text links - use buttons
- No horizontal scrolling tables - use cards or collapsible rows on mobile

## Git Repository

- **Repository:** `Gangoo91/Elec-Mate-Merge`
- **Branch:** `main`
- **All commits push to:** `origin main` (elec-mate-merge)
- Always push changes to this repo when asked

## Supabase Architecture

**Single Supabase Backend (elec-mate):**

- **Project:** `jtwygbeceundfgnkirof`
- **URL:** `https://jtwygbeceundfgnkirof.supabase.co`
- **Contains:** Auth, user profiles, all tables (677 + 37 views), all edge functions (499 deployed), RAG data
- **Users:** 1,777 registered accounts (339 in the last 30 days)
- ⚠️ **558 function directories on disk vs 499 deployed** — roughly sixty exist only locally. Never
  assume a directory in `supabase/functions/` is live; check with `functions list` before relying on it.
- _Counts verified against the live project 2026-09-02. They drift fast — re-query before quoting them._
- **client.ts points here**

### Edge Function Deployment

```bash
npx supabase functions deploy <function-name> --project-ref jtwygbeceundfgnkirof
```

### Key Edge Functions

- `create-cost-engineer-job` / `process-cost-engineer-job` - AI Cost Engineer
- `health-safety-v3` / `create-health-safety-job` - AI RAMS
- `designer-agent-v3` / `create-circuit-design-job` - Circuit Designer
- `installer-v3` - Installation guidance
- `commissioning-v3` - Commissioning specialist

### RAG Tables

- `pricing_embeddings` - Trade pricing data
- `practical_work_intelligence` - Labour timing data
- `design_knowledge` - Circuit design patterns
