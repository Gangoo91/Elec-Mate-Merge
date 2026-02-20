# Safe Isolation Page — Complete Redesign Plan

## Current State

**File:** `src/components/learning-hub/safe-isolation/SafeIsolationCard.tsx` + 3 sub-components
**Tabs:** Why Isolate? | How to Isolate | Practical Guide
**Total lines:** ~1,230 across 4 files
**Issues found:**
- 60 grey text violations (`text-foreground` instead of `text-white`)
- Centre-aligned content in places — should be left-aligned throughout
- Tab structure puts "Why" first (padding) instead of the actual procedure
- No diagrams or visual aids whatsoever
- Content is mostly accurate but needs verification against GN3/BS 7671

---

## Redesigned Tab Structure

Replace the current 3 tabs with 4 focused tabs:

### Tab 1: Procedure (default tab)
The core 6-step safe isolation procedure — this is what matters most.

**Content:**
1. **Flow Diagram** — SVG-based vertical flow showing all 6 steps with decision points
2. **Step cards** — each step with:
   - Step number + title
   - BS 7671 regulation reference
   - What to do (concise instruction)
   - Warning callout where applicable
3. **Steps (verified against GN3 Section 1.1 + BS 7671 Reg 537.2.1):**
   - **Step 1 — Identify** the circuit/equipment to be worked on
   - **Step 2 — Switch off** at the local isolator or DB (Reg 537.2.1.1)
   - **Step 3 — Isolate** using an approved isolating device (Reg 537.2.1.2)
   - **Step 4 — Secure** isolation with lock-off device and warning tag (Reg 537.2.1.3)
   - **Step 5 — Prove dead** using prove-test-prove method (Reg 537.2.1.4/5/6)
   - **Step 6 — Work safely** — issue permit-to-work if required

**Diagram: 6-Step Procedure Flow**
```
┌─────────────┐
│  1. IDENTIFY │
└──────┬──────┘
       ▼
┌──────────────┐
│ 2. SWITCH OFF │
└──────┬───────┘
       ▼
┌─────────────┐
│  3. ISOLATE  │
└──────┬──────┘
       ▼
┌──────────────┐
│  4. SECURE   │  ← Lock-off + tag
└──────┬───────┘
       ▼
┌──────────────┐
│ 5. PROVE DEAD│  ← Prove-Test-Prove
└──────┬───────┘
       ▼
┌──────────────┐
│ 6. WORK SAFE │
└──────────────┘
```
*Built as React/Tailwind — coloured step boxes connected with lines/arrows*

### Tab 2: Prove Dead
The prove-test-prove method in detail — this is where most mistakes happen.

**Content:**
1. **Prove-Test-Prove Diagram** — 3-box horizontal flow:
   - PROVE tester on known live → TEST circuit dead → REPROVE tester on known live
2. **Testing order for single-phase:**
   - L–E, N–E, L–N (earth connection first always)
3. **Testing order for 3-phase** — with diagram:
   - 10 tests total: L1–E, L2–E, L3–E, N–E, L1–L2, L1–L3, L2–L3, L1–N, L2–N, L3–N
4. **Voltage thresholds:**
   - >50V AC or >120V DC (dry) — extra precautions
   - >25V AC or >60V DC (wet/damp) — extra precautions
5. **What can go wrong** — common errors (back-fed supplies, parallel paths, induced voltages)

**Diagram: 3-Phase Isolation Test Matrix**
```
     L1    L2    L3    N     E
L1   —     ✓     ✓     ✓     ✓
L2         —     ✓     ✓     ✓
L3               —     ✓     ✓
N                      —     ✓
E                            —
```
*Built as a Tailwind grid with coloured cells — green = must test*

### Tab 3: Equipment
GS38 requirements and what kit you need — with a probe specifications diagram.

**Content:**
1. **GS38 Probe Specifications Diagram** — showing:
   - Max 4mm exposed tip (NOT 2mm — verified against actual GS38)
   - Finger guards/barriers
   - Shrouded/retractable tips
   - HBC fused leads (max 500mA)
   - Min 1000V insulation rating
   - Lead cross-section min 0.75mm²
2. **Equipment checklist:**
   - Two-pole voltage indicator (preferred over multimeter)
   - Proving unit
   - Lock-off kit (MCB, fuse carrier, plug lock-offs)
   - Warning tags and labels
   - Permit-to-work forms
3. **CAT Ratings explained:**
   - CAT II: Equipment supplied from building wiring
   - CAT III: Part of building wiring (sockets, DBs)
   - CAT IV: At/near origin
4. **Two-pole vs multimeter** — why two-pole preferred

**Diagram: GS38 Compliant Probe**
```
    ┌─ max 4mm exposed ─┐
    ▼                    │
  ╔═══╗                  │
  ║tip║  ← Shrouded      │
  ╠═══╣                  │
  ║   ║  ← Finger guard  │
  ║   ║                  │
  ║   ║  ← Insulated body (1000V+)
  ║   ║                  │
  ╚═══╝                  │
    │                    │
    └─ Fused lead (500mA HBC)
       Min 0.75mm² cross-section
```
*Built as Tailwind/CSS — labelled diagram with dimension callouts*

### Tab 4: Reference
Legal framework, regulations, and real-world scenarios.

**Content:**
1. **Legal framework:**
   - Health and Safety at Work Act 1974
   - Electricity at Work Regulations 1989 (Regs 12, 13, 14)
   - HSE Guidance Note GS38
   - BS 7671 Regulation 537.2.1
2. **Isolation device requirements:**
   - Must physically disconnect all live conductors
   - Must be lockable in OFF position
   - NOT acceptable: semiconductor switches, emergency stops, control circuits
   - Acceptable: switch-disconnectors, circuit breakers, isolators, plug withdrawal
3. **Common failure scenarios:**
   - Scenario 1: Multiple supply sources (solar PV, battery storage, generator)
   - Scenario 2: Parallel paths providing unexpected voltage
   - Scenario 3: Back-fed from another circuit via shared neutral
   - Scenario 4: Induced voltage from adjacent cables
   - Scenario 5: Capacitive charge retention
4. **Statistics callout:** Electrical contact accounts for ~30 fatalities/year in UK

---

## Diagrams — What's Possible

Yes, I can build diagrams as pure React/Tailwind components. Three approaches:

| Approach | Pros | Cons |
|----------|------|------|
| **Tailwind/CSS boxes + borders** | Fast, consistent with app, accessible | Limited complexity |
| **Inline SVG in JSX** | Full control, any shape, responsive | More code |
| **CSS Grid diagrams** | Great for matrices/tables, responsive | Limited to grid shapes |

**Recommended:** Tailwind/CSS for flow diagrams and checklists, CSS Grid for the 3-phase test matrix, inline SVG only if needed for the probe illustration.

All diagrams will be:
- Mobile responsive (stack vertically on small screens)
- `text-white` throughout
- Coloured with the existing palette (red for safety, amber for caution, green for go)
- Not images — fully accessible screen-reader text

---

## Files to Edit

| File | Action |
|------|--------|
| `safe-isolation/SafeIsolationCard.tsx` | Rewrite — new tab structure, new header |
| `safe-isolation/WhyIsolateSection.tsx` | **Delete** — content redistributed to other tabs |
| `safe-isolation/HowToIsolateSection.tsx` | **Delete** — replaced by Procedure + Prove Dead tabs |
| `safe-isolation/PracticalGuidanceSection.tsx` | **Delete** — content moved to Reference tab |
| `safe-isolation/ProcedureTab.tsx` | **New** — 6-step procedure with flow diagram |
| `safe-isolation/ProveDeadTab.tsx` | **New** — Prove-test-prove with 3-phase diagram |
| `safe-isolation/EquipmentTab.tsx` | **New** — GS38 specs with probe diagram |
| `safe-isolation/ReferenceTab.tsx` | **New** — Legal, regs, scenarios |

---

## Accuracy Verification Checklist

All values cross-referenced against:
- `src/data/gn3-verification-checklist.ts` (last verified 2026-01-06)
- `supabase/functions/shared/testingLimits.ts`
- `supabase/functions/_shared/bs7671ProtectionData.ts`

| Claim | Verified | Source |
|-------|----------|--------|
| 6-step procedure (Reg 537.2.1) | ✅ | GN3 Section 1.1 |
| GS38 probe tip max 4mm | ✅ | GS38 actual (NOT 2mm from GN3 checklist — that's stricter than GS38) |
| Fused leads max 500mA HBC | ✅ | GS38 / SafeIsolationProcedurePage.tsx |
| 10 tests for 3-phase | ✅ | SafeIsolationProcedurePage.tsx |
| >50V AC / >120V DC dry threshold | ✅ | gn3-verification-checklist.ts |
| >25V AC / >60V DC wet threshold | ✅ | gn3-verification-checklist.ts |
| Earth connection first always | ✅ | HowToIsolateSection.tsx line 164 |
| EAW Regs 12, 13, 14 | ✅ | subsection6_1/SafeIsolationProcedures.tsx |
| No semiconductor switches | ✅ | HowToIsolateSection.tsx |
| CAT II/III/IV definitions | ✅ | gn3-verification-checklist.ts |
| Two-pole preferred over multimeter | ✅ | SafeIsolationProcedurePage.tsx |
| Lead min 0.75mm² | ✅ | GS38InfoCard.tsx |
| Insulated body min 1000V | ✅ | GS38InfoCard.tsx |

### Discrepancy to Fix
- `gn3-verification-checklist.ts` says "max 2mm exposed tip" — actual GS38 says **max 4mm**. Will flag this but NOT change the GN3 data file without your explicit approval.

---

## Design Rules Applied

- ✅ All text `text-white` — zero grey variants
- ✅ 44px min touch targets (`h-11`)
- ✅ `touch-manipulation` on everything interactive
- ✅ UK English (organisation, centre, colour)
- ✅ Left-aligned throughout — no centred body text
- ✅ Mobile-first, native app feel
- ✅ Diagrams responsive (stack on mobile)
- ✅ No new dependencies
