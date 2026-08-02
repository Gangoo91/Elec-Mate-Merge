# Agent brief: specialist certificate audit, polish & mapping pass

You are working in `/Users/andrewmoore/elec-mate-merge` (React 18 / Vite / TypeScript / Tailwind /
Supabase project `jtwygbeceundfgnkirof`). Your mission: take each specialist certificate to
**excellent** — audit it end-to-end, verify it works, confirm the shared reading keypad is wired
where it should be, bring every surface onto the one design language, find improvements, and
verify every field is **mapped** all the way to the PDF. Work ONE cert at a time; do the pilot
cert first, report your findings + fixes to Andrew, and WAIT for his go before the next cert.

**Pilot cert: Emergency Lighting** (`src/components/inspection/emergency-lighting/`). Then, on
approval, in this order: PAT → Solar PV → BESS → Lightning Protection → Fire Alarm suite
(G1/G2/G3/G6/G7 — five certs sharing `src/components/inspection/fire-alarm/`) → Smoke/CO →
G98 → G99 → Disconnection → Testing-Only → EV charging LAST (it is the reference implementation —
audit it for drift, expect little).

## Hard rules (non-negotiable)

1. **Never commit or push.** Everything stays uncommitted in the working tree. The tree is shared
   with other sessions and carries their uncommitted work — `git add -A`, `git stash`, `git
   checkout -- .` are all FORBIDDEN. Only ever edit files; never stage or revert.
2. **Never run a local build** (`vite build`, `npm run build`). Verification is: per-file
   `npx eslint <files>` (gate = no NEW errors vs that file's current state — the repo carries
   pre-existing `no-explicit-any` debt; count errors before and after), plus the running dev
   server: `curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/<file-path>` must be 200.
   ⚠️ `$?` after a pipe reports the LAST command in the pipe — check exit codes unpiped.
3. **Zero data regressions.** Field names, option values, stored formats, save/autosave logic,
   handlers and validation logic are untouchable unless you are fixing a verified mapping bug —
   and then the WRITE path moves to the canonical form while the READ path stays tolerant of the
   legacy form, so saved certs still load and render.
4. **Verify before reporting.** Grep locates, it never proves. Open every call site. Label
   anything unverified as suspected. Findings need file:line + evidence.
5. Audit READ-ONLY first, produce findings (broken / friction / polish), THEN fix. Fix every
   broken + friction item; polish where cheap; skip only with a stated reason.
6. Do not raise Linear tickets. Do not deploy edge functions (report which ones need deploying).
7. UK English everywhere. Sentence case everywhere.

## The design language (ground truth files — READ THESE FIRST)

Reference implementations, in order of authority: `src/components/minor-works/MWTestingTab.tsx`,
`src/components/minor-works/MWDetailsTab.tsx`, `src/components/inspection/ev-charging/*`,
CLAUDE.md → Design System. The shared cert shells are `src/components/inspection/shared/
CertShellHeader.tsx` + `CertShellFooter.tsx` — certs WIRE these, never clone them.

- **Section card**: `-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl
  sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4`.
  The `-mx-4` full-bleed REQUIRES the parent content column to carry `px-4` — check the
  arithmetic before adding it. Inside bottom sheets use the plain (non-full-bleed) variant.
- **Inputs are underlines, not boxes**: `input-underline h-11 w-full rounded-none border-0
  border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white
  placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors
  duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0
  focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark]
  touch-manipulation`. The `input-underline` marker class is REQUIRED (a global
  `input::placeholder { color: white !important }` rule in index.css otherwise makes
  placeholders identical to values; the marker scopes a 0.35-opacity exception).
  `md:text-base` is required (the shadcn base's `md:text-sm` survives tailwind-merge otherwise).
  `focus:shadow-none` is required (the base injects a volt glow that reads muddy brown).
- **Textareas**: `textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base
  md:text-base text-white placeholder:text-white/25 caret-elec-yellow focus:bg-white/[0.07]
  focus:ring-1 focus:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px]
  touch-manipulation`.
- **Labels**: `text-[12px] font-medium text-white mb-1 block` — FULL white, sentence case.
  Low-opacity white on a LABEL is a violation; white/60 is allowed only on secondary metadata
  lines. Helper/reg text minimum `text-white/85`.
- **Chips/toggles** (2–3 options beat a select): selected = SOLID `bg-elec-yellow
  border-elec-yellow text-black font-semibold` (pass/fail = solid green-500 black text /
  red-500 white text; caution = solid amber-500 black text); unselected = `bg-white/[0.06]
  border border-white/[0.12] text-white`. h-11 minimum, `touch-manipulation
  active:scale-[0.97]`. **Translucent colour washes (`elec-yellow/10|15|20`, green/amber
  washes) are BANNED on selected states — they read brown on the dark surface.** Status strips
  are neutral `bg-white/[0.05]` surfaces with COLOURED TEXT, not coloured washes.
- **Section headings**: `text-[15px] font-semibold tracking-tight text-white` — no icons, no
  dots, no gradient hairlines, no uppercase tracking, no numbered markers. Sub-headings inside
  a card: `border-t border-white/[0.1] pt-4` + `text-sm font-semibold text-white`.
- **Buttons**: text-first, NO lucide icons in chrome (Loader2 spinners and functional glyphs —
  select chevrons, collapse arrows — are allowed). Primary = solid volt h-12 black text.
  Secondary = `h-12 rounded-xl border border-white/[0.12] bg-white/[0.06] text-white`.
  Busy volt buttons hold their colour: `disabled:bg-elec-yellow disabled:text-black
  disabled:opacity-100` with a BLACK Loader2 — never let volt dim to brown. No `→` glyphs.
- **Dropdown panels** (ui/select is already correct — don't regress it): opaque
  `bg-[hsl(0_0%_16%)]`, selected row solid volt black text, keyboard highlight via
  `data-[highlighted]`.
- **Sheets**: bottom sheets, never centred dialogs, for forms/tools/AI —
  `<SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">`.
  85vh exactly; 90/92/95 are violations. Small confirms may stay as restyled Dialogs.
  ⚠️ DialogFooter's base carries `sm:space-x-2` — stacked buttons need a plain flex div.
- **Desktop layout**: content column `lg:max-w-[1600px] lg:px-8`; tab interiors pair sections
  with `lg:grid lg:grid-cols-2 lg:gap-4` (NO lg:items-start; wide sections span
  `lg:col-span-2`; no orphan half-rows — the grid must pair CARDS, not whole multi-card
  stacks). No hover tints that shift row/field colours.
- **Haptics**: every chip/button press buzzes. Cheap pattern — delegated on the section root:
  `onPointerDown={(e) => { if ((e.target as HTMLElement).closest('button')) haptic.light(); }}`
  with `useHaptic()`.

## The shared reading keypad (numeric fields on mobile)

`src/hooks/useReadingKeypad.tsx` + `src/components/inspection/shared/ReadingKeypad.tsx` — read
both. Reference consumers: `src/components/testing/BoardSection.tsx` (multi-instance,
per-record `${field}-${id}` names, getStatus reuse) and
`src/components/inspection/ev-charging/EVChargingTestSchedule.tsx`.

- Wire it on free-text numeric MEASUREMENT/READING inputs only (Ω, MΩ, kA, A, V, ms, s, lux,
  dB, °C, kW, kWh, m). NOT on: nameplate/design specs, counts, intervals, pickers, selects,
  dates, dense-table cells, disabled/LIM-marked inputs.
- `{...keypad.field('name')}` spread ADDS props only — original value/onChange stay. Render
  `{keypad.element}` once near the root and `{keypad.spacer}` at the end of the content.
  Repeated cards use `${field}-${recordId}` names. `inf: true` on MΩ readings. `getStatus`
  only reuses verdicts the file ALREADY computes — never invent limits. `sequence` = the
  natural test order when one exists.
- Most specialist certs were wired on 2026-08-02 — your audit VERIFIES the wiring (unique
  names, element+spacer present, no forbidden targets wired) and adds any missed readings.

## Mapping verification (the part nobody else has checked end-to-end)

For each cert, walk the chain: **UI field → formatter → edge function payload → PDF template
keys → email path**.

1. Find the cert's formatter (`src/utils/*JsonFormatter.ts` / `*-formatter.ts`) and its edge
   function (`supabase/functions/generate-<cert>-pdf/index.ts`). Some certs build payloads in
   the edge fn directly from formData.
2. Every UI field the user can fill must land in the payload under the right key. Every payload
   key must have a UI source (or a documented default). Bidirectional diff — list orphans both
   ways with file:line.
3. Photos: if the cert captures photos, they live in the `inspection_photos` table — check the
   formatter/edge fn actually fetches and injects them (the historic bug class: formatters read
   `formData.photos` which nothing writes).
4. Email: the cert's email surface must send `formattedData` to `send-certificate-resend` so a
   never-generated cert still gets a real PDF attached, and must pass the user's custom
   `templateId` where the generate path does.
5. Conditional sections (three-phase, TT-only, variant tabs) — verify the payload carries the
   flags the template branches on.
6. Do NOT edit remote PDFMonkey templates — payload-side fixes only; report template-side
   mismatches (keys the template expects that the payload can't supply) in your findings for
   the separate ELE-1454 template pass.

## Known traps (each one has bitten this codebase — check for them)

- `useState` initialisers computed from formData DON'T re-sync when formData hydrates
  asynchronously from the cloud — any derived local state needs a re-sync effect.
- Side effects (parent onUpdate, toasts, other setState) INSIDE a `setX((prev) => ...)` updater
  run during the render phase → "Cannot update a component while rendering" — defer with
  `queueMicrotask`. Naive grep over-flags: brace-match to confirm it's genuinely inside.
- `supabase.rpc`/`.from` are thenables, not Promises — `.catch()` breaks them, and extracting
  `supabase.rpc` into a bare variable strips `this` and throws "reading 'rest'". Never do either.
- "Exists but unwired" is the house failure signature: helpers/props/panels defined and never
  consumed. Check both directions (definition AND consumer).
- JSX `{/* */}` comments between `return (` and a single root element are a syntax error — put
  `//` comments above the return.
- Watch for duplicate/dead sibling trees (`inspection/eic` vs `eic`, `mobile/mobile/`) — verify
  which copy is routed/live before editing; zero-importer-verify before deleting anything.
- `useParams` goes stale after `history.replaceState` — photo-upload flows that depend on the
  URL id must use the state value, not the param.
- Icon-well + accent-dot card headers, numbered `01/02` section markers, uppercase gold
  eyebrows, gradient hairlines = the superseded "deck" style. Kill on sight.

## Per-cert process

1. **Audit (read-only)**: walk every tab file + its shell wiring + formatter + edge fn. Score
   against every section of this brief. Output findings JSON:
   `{cert, broken:[{file,line,finding,evidence}], friction:[...], polish:[...],
   mapping:{orphanUiFields:[], orphanPayloadKeys:[], photoInjection:'ok|missing',
   emailFormattedData:'ok|missing', templateId:'ok|missing'}, keypad:{wiredOk:[], missing:[],
   wrongTargets:[]}, cleanChecks:[...]}`.
2. **Fix**: everything broken + friction, mapping orphans (write-canonical/read-tolerant),
   missed keypad fields, design violations. Respect shared-component blast radius — changes to
   shared files must be safe for every cert using them.
3. **Verify**: re-read each fixed site, per-file eslint (no new errors), vite 200 per file.
4. **Report to Andrew**: findings table (fixed/skipped+why), mapping verdict, what needs a
   deploy or a PDFMonkey template change, anything you'd improve but didn't. STOP and wait for
   his go before the next cert.

Everything stays uncommitted. If the dev server on :8080 isn't running, ask Andrew to start it
(`npm run dev`) rather than starting builds yourself.
