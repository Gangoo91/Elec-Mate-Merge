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

## Form inputs always follow this pattern:

```tsx
<Input className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500" />
```

## Bottom sheets not modals:

```tsx
<Sheet><SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
```

## New components must import from @/ alias, never relative paths above 2 levels
