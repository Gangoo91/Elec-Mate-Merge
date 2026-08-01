---
paths:
  - 'src/components/**/*.tsx'
  - 'src/pages/**/*.tsx'
---

# Frontend Component Rules

## Every component MUST:

- Use `touch-manipulation` on all interactive elements
- Have minimum `h-11` (44px) touch targets
- Work mobile-first — desktop is the afterthought
- Use UK English: colour, centre, organisation, licence
- Use the elec-mate design tokens (elec-yellow, elec-gray, etc.)

## Form inputs are UNDERLINES, not boxes:

Copy from `src/components/inspection/ev-charging/` — the reference
implementation. Full pattern in CLAUDE.md → Design System.

```tsx
// bottom border only, transparent bg, yellow caret, NO focus ring
className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15]
           bg-transparent px-1 text-base text-white caret-elec-yellow
           focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation"
```

- Labels are sentence case and **full `text-white`** — never `white/65` (grey).
- Section headings are plain type: no icons, no dots, no gradient bars.
- Cards go edge-to-edge on mobile: `-mx-4 ... sm:mx-0 sm:rounded-2xl`.
- 2–3 options: use chips, not a select. Otherwise `MobileSelectPicker`.

⚠️ `eic/`, `eicr/`, `minor-works/` and most of the Employer Hub are still on the
old boxed style pending migration. Don't copy from them.

## Bottom sheets not modals:

```tsx
<Sheet><SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
```

`h-[85vh]` is the standard height — don't invent 90/92/95vh.

## New components must import from @/ alias, never relative paths above 2 levels
