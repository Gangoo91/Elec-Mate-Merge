# College Hub on a phone: the standard (10 Oct 2026)

Andrew, 10 Oct: "everything needs to be redesigned on mobiles and feel excellent
for both iOS and Android devices."

Every College Hub screen, tutor and learner, is checked at **360 px** (small
Android) and **390 px** (iPhone) in Google Chrome. Measure with
`PHONE_AUDIT=1 npx playwright test -c playwright.college.config.ts e2e/college/76-phone-audit.spec.ts`
(report in `/tmp/em-qa/phone-audit/report.json`, a screenshot per screen).

Build from the kit in `src/components/college/ui/CollegeUi.tsx`. Don't invent
local variants.

## Must hold on every screen

1. **No sideways scroll.** Nothing past the right edge, except a deliberate
   horizontal chip rail (`overflow-x-auto`, `-mx-4 px-4`, no visible scrollbar).
2. **Thumb targets.** Every control at least 44 px tall (`h-11`) and 32 px
   wide, with `touch-manipulation`. Icon buttons are `h-11 w-11`. No bare
   text links as actions; use `COLLEGE_LINK` (44 px tall).
3. **Readable type.** Body 14–15 px, secondary 13 px, nothing under 12 px.
   All text white.
4. **Names and titles are never cut to a stub.** Give the name its own line.
   Move chips and badges to the line below. Let detail wrap
   (`line-clamp-2`) instead of `truncate` on a phone.
5. **One column on a phone.** Grids go 1-up (or 2-up for small stat tiles).
   Tables become rows: a name line, a detail line and a status line.
   No table that needs sideways scroll.
6. **Cards are edge to edge** (`COLLEGE_CARD` / `COLLEGE_LIST`), inset from `sm:`.
7. **Sheets, not dialogs.** Anything that opens over the page is a bottom
   sheet (`Sheet side="bottom"`, or `FormSheet`) on a phone. It has a drag
   handle, a close button 44 px square, and a scrolling body with
   `overscroll-contain` and `max-h-[88dvh]`. The footer actions sit above the
   home indicator (`pb-[env(safe-area-inset-bottom)]`). Popovers and dropdown
   menus with more than a few items become sheets on a phone.
8. **Primary action within reach.** The one action that matters is full width
   at the bottom of its card or sheet on a phone, not top right.
9. **Headers stay short.** Page title 26 px, one sentence under it, actions
   wrap below on a phone (`flex-wrap`), never squeezed beside the title.
10. **Filters** are a chip rail or a "Filter" button that opens a sheet, never
    a row of selects.
11. **No translucent yellow** (`bg-elec-yellow/10` etc. renders brown). Solid
    yellow for the one action, neutral surfaces for everything else.
12. **Spaced uppercase labels** are kept only as the kit's page eyebrow. Not
    on cards, rows or sheets.

## iOS and Android

- **Inputs are 16 px** (index.css forces it) so iOS doesn't zoom in. Use
  `inputMode` / `type` (`numeric`, `email`, `tel`, `date`) to get the right
  keyboard on both platforms. Use `enterKeyHint` on single-field forms.
- **Safe areas:** fixed bottom bars and sheet footers pad with
  `env(safe-area-inset-bottom)`. Nothing sits under the home indicator or
  Android's gesture bar.
- **Use `dvh`, not `vh`,** for full-height layouts (the iOS toolbar and Android
  URL bar resize the viewport).
- **Android back** closes the top sheet first (`useNativeApp` →
  `closeTopOverlay`). Sheets must be Radix `Sheet`/`Dialog` so it can find
  them. Never a hand-rolled overlay.
- **Press feedback, not hover.** Every tappable row has `active:` feedback.
  Nothing relies on hover to reveal an action.
- **Scrolling:** one scroll container per screen where possible. Nested
  scroll areas get `overscroll-contain` so they don't drag the page.
- **Sticky headers** use the masthead only. No second sticky bar on a phone
  unless it holds the screen's main action.

## Design language (Andrew's corrections, 10 Oct)

The College Hub home (`src/components/college/sections/CollegeOverviewSection.tsx`)
is the reference. Every screen should read like it.

- **Icons look designed, not generated.** No stacked icon-over-title tiles.
  A small white lucide line icon (`strokeWidth={1.5}`, 16 to 20 px) beside
  the label, or no icon. Pick the icon that says the action exactly.
- **Controls carry information.** An action button says what is waiting
  behind it ("19 to mark", "Tue 09:30"), not a generic hint.
- **No spaced uppercase labels** (`uppercase tracking-[…]`). Sentence case.
- **No solid yellow on every row.** One solid yellow action per screen.
  Row actions are outlined. Orange text marks what is overdue; avatars stay
  neutral.
- **Choices of 2 to 4 are one joined toggle** (rounded-xl border, p-0.5,
  chosen option `bg-white text-black`), not a row of yellow chips or two
  full-width buttons. See `QuickRegisterSheet.tsx` (morning/afternoon) and
  `LearnerPicker.tsx` (My cohorts / Everyone).
- **Filters over a list are quiet text tabs** with counts and a yellow
  underline (see "Needs you" on the home page), not pills.
- **Same-size cards.** A grid of cards has every card the same height and
  fills its rows evenly. No group cards of uneven length, no empty boxes.
- **Full width on desktop.** No narrow centred column inside a wide sheet or
  page. Lists of people become a grid of cards, grouped where it helps
  (`LearnerPicker.tsx`).
- **Balanced columns.** Two columns end at about the same height; nothing
  leaves a large empty block. A first grid row hugs its content
  (`grid-rows-[auto_1fr]`) so a tall neighbour cannot open a gap.
- **Don't repeat.** If something is shown in one card, don't list it again
  underneath.
- **Status lines, not sentences of numbers.** Figures as bold numbers with
  plain words, hairline between, a 2x2 grid on a phone.
- **Readable dates.** A small day block ("Wed / 14"), times as "Tue 09:30".
- **One read of state at a glance.** A marked item takes its colour (card
  edge, initials), e.g. the register.
