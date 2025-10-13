# Cable Sizing RAG Knowledge - Implementation Guide

## Migration SQL (To be run manually via Supabase Dashboard)

Run this SQL in the Supabase SQL Editor to add comprehensive cable sizing knowledge:

```sql
-- Add comprehensive cable sizing knowledge to RAG system
-- Phase: Cable Sizing Methodology Enhancement

INSERT INTO design_knowledge (content, topic, source, created_at) VALUES
(
  'COMPLETE CABLE SIZING PROCEDURE (BS 7671:2018+A3:2024)

Step 1: Design Current (Ib)
- Calculate from load: Ib = Power / (Voltage × √3 for 3-phase)
- For single-phase: Ib = Power / 230V
- Apply diversity if multiple loads

Step 2: Protective Device Rating (In)
- Select MCB/RCBO where In ≥ Ib
- Standard ratings: 6A, 10A, 16A, 20A, 25A, 32A, 40A, 45A, 50A, 63A

Step 3: Tabulated Current Capacity (It)
- From BS 7671 Table 4D5 (PVC) or 4E5 (XLPE)
- Consider installation method (clipped direct, in conduit, buried, etc.)

Step 4: Apply Correction Factors
- Iz (required) = In / (Ca × Cg × Ci)
- Ca = ambient temperature correction (Table 4B1)
- Cg = grouping factor (Table 4C1)
- Ci = thermal insulation factor (Table 4C2)

Step 5: Select Initial Cable Size
- Choose smallest cable where It ≥ Iz
- From standard sizes: 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120mm²

Step 6: Voltage Drop Check (Regulation 525)
- Max 3% for lighting (6.9V at 230V)
- Max 5% for other uses (11.5V at 230V)
- Formula: VD = (mV/A/m × Ib × L) / 1000
- If VD exceeds limit, upsize cable and recalculate

Step 7: Cable Type Selection
- If final CSA ≤ 10mm²:
  → Twin & Earth (6242Y) suitable for domestic indoor
  → Check location: outdoor/underground requires SWA
- If final CSA > 10mm²:
  → Twin & Earth NOT available (domestic standard)
  → Use SWA 3-core OR singles in conduit
- If final CSA > 16mm²:
  → Twin & Earth NOT available (even commercial)
  → MUST use SWA or singles

Step 8: Earth Fault Loop Impedance
- Verify Zs ≤ max for protective device
- Check disconnection time compliance (Regulation 411)

CRITICAL: Voltage drop often drives cable size UP from initial It selection.
Always complete VD check before finalising cable type.',
  'Cable Sizing Methodology - BS 7671 Appendix 4',
  'BS 7671:2018+A3:2024 - Official Standards',
  NOW()
),
(
  'TWIN & EARTH (6242Y) CABLE SIZE LIMITS

Standard Domestic Sizes (BS 6004):
✅ 1.0mm² - Lighting circuits only
✅ 1.5mm² - Lighting circuits (standard)
✅ 2.5mm² - Socket circuits, small heaters
✅ 4mm² - Radial circuits, medium loads
✅ 6mm² - Showers up to 7.5kW, cookers
✅ 10mm² - Maximum standard domestic size

Rare Commercial Sizes:
⚠️ 16mm² - Available but uncommon, mainly commercial
⚠️ Large T&E above 16mm² is NOT manufactured

REGULATORY GUIDANCE (Regulation 521.10.1):
- Twin & Earth suitable for fixed wiring in domestic/commercial
- Requires mechanical protection if surface-mounted
- NOT suitable for outdoor/underground (no armour)
- Maximum 10mm² for standard domestic work

WHEN TO USE SWA INSTEAD:
1. Calculated cable size > 10mm² (>16mm² absolutely)
2. Outdoor installation (weather protection)
3. Underground installation (mechanical protection)
4. Long cable runs where VD drives size up
5. High-power circuits (>10kW typically need >10mm²)

COMMON MISTAKES:
❌ "Use 25mm² Twin & Earth" - Does NOT exist
❌ "16mm² T&E for shower" - Rare, SWA better choice
❌ Selecting T&E before calculating final cable size

CORRECT APPROACH:
1. Calculate final CSA including VD
2. Check if CSA ≤ 10mm²
3. If yes + indoor → Twin & Earth OK
4. If no OR outdoor → SWA required',
  'Twin & Earth Cable Size Limits - 6242Y Availability',
  'BS 6004 Cable Standards + Industry Practice',
  NOW()
),
(
  'VOLTAGE DROP - 70°C PVC COPPER CABLES (mV/A/m)
BS 7671:2018+A3:2024 Table 4D5

Single-Phase AC (230V):
| Cable Size | mV/A/m | Example: 20A × 25m |
|------------|--------|-------------------|
| 1.5mm²     | 29     | 14.5V (6.3%)     |
| 2.5mm²     | 18     | 9.0V (3.9%)      |
| 4mm²       | 11     | 5.5V (2.4%)      |
| 6mm²       | 7.3    | 3.65V (1.6%)     |
| 10mm²      | 4.4    | 2.2V (0.96%)     |
| 16mm²      | 2.8    | 1.4V (0.61%)     |
| 25mm²      | 1.75   | 0.88V (0.38%)    |
| 35mm²      | 1.25   | 0.63V (0.27%)    |

VOLTAGE DROP LIMITS (Regulation 525):
- Lighting circuits: 3% max (6.9V at 230V)
- Other uses: 5% max (11.5V at 230V)

CALCULATION FORMULA:
VD (volts) = (mV/A/m × Design Current × Cable Length) / 1000
VD (%) = (VD volts / 230V) × 100

WORKED EXAMPLE:
9.5kW shower, 25m cable run
- Design current: 41A (9500W / 230V)
- Try 10mm²: (4.4 × 41 × 25) / 1000 = 4.51V = 1.96% ✅
- Try 6mm²: (7.3 × 41 × 25) / 1000 = 7.48V = 3.25% ❌ (>3% if lighting)

UPSIZING FOR VOLTAGE DROP:
Long cable runs often require larger cable than current capacity alone:
- 32A circuit, 5m → 6mm² OK
- 32A circuit, 50m → May need 16mm² for VD compliance

This is why cable type (T&E vs SWA) must be decided AFTER VD calculations.',
  'Voltage Drop Tables - BS 7671 Appendix 4 Table 4D5',
  'BS 7671:2018+A3:2024 Table 4D5',
  NOW()
),
(
  'CABLE TYPE SELECTION DECISION TREE

START: You have calculated the FINAL cable size (including VD check)

QUESTION 1: Is final cable size ≤ 10mm²?
├─ NO (>10mm²) → Go to QUESTION 4
└─ YES (≤10mm²) → Go to QUESTION 2

QUESTION 2: Is installation indoor with mechanical protection?
├─ NO (outdoor/underground/exposed) → Use SWA (Reg 522.6)
└─ YES (indoor protected) → Go to QUESTION 3

QUESTION 3: Is it a special installation?
├─ EV charger → SWA (outdoor sections, Section 722)
├─ Heat pump → SWA (outdoor unit connection)
├─ Swimming pool → SWA or conduit (Section 702)
├─ Agricultural → SWA (Section 705)
└─ Standard domestic → Twin & Earth 6242Y ✅

QUESTION 4: Cable size > 10mm² - T&E not available
├─ Is it outdoor/underground?
│  └─ YES → SWA 3-core (L+N+E) ✅
└─ Is it indoor commercial/industrial?
   ├─ Flexible routing → Singles in steel conduit
   └─ Fixed routing → Singles in trunking

CABLE TYPE SUMMARY:
Twin & Earth (6242Y):
- Sizes: 1.5mm² to 10mm² (domestic standard)
- Use: Indoor domestic fixed wiring
- Protection: Surface-mounted needs oval conduit
- Standards: BS 6004, Regulation 521.10.1

SWA (Steel Wire Armoured):
- Sizes: All sizes (especially >10mm²)
- Use: Outdoor, underground, long runs, high power
- Protection: Built-in mechanical protection (armour)
- Standards: BS 5467, Regulation 521.10.202

Singles in Conduit:
- Sizes: All sizes
- Use: Commercial/industrial, flexible routing
- Protection: Steel conduit provides protection
- Standards: BS 6004, Regulation 521.6

EXAMPLE SCENARIOS:
1. 6kW shower, 15m indoor → 6mm² T&E ✅
2. 9.5kW shower, 20m indoor → 10mm² T&E ✅
3. 12kW shower, 20m indoor → 16mm² SWA ✅ (>10mm²)
4. 7kW outdoor socket, 30m → 10mm² SWA ✅ (outdoor)
5. 10kW heat pump, 25m → 16mm² SWA ✅ (outdoor + >10mm²)',
  'Cable Type Selection - Twin & Earth vs SWA vs Singles',
  'BS 7671 Regulation 521 + Industry Best Practice',
  NOW()
),
(
  'COMMON CABLE SIZING ERRORS (BS 7671 Compliance)

ERROR #1: Selecting cable type BEFORE calculating final size
❌ Wrong: "It is a shower, use Twin & Earth" → Calculate size → "25mm² T&E"
✅ Right: Calculate size first → 16mm² needed → "T&E not available, use SWA"

Root cause: Cable type depends on final CSA, not load type
Fix: Always complete VD calculation before selecting cable type

---

ERROR #2: Using MCB rating for cable size without VD check
❌ Wrong: "32A MCB = 6mm² cable" (ignores cable length)
✅ Right: "32A MCB = 6mm² initial, but 50m run needs 16mm² for VD"

Root cause: Voltage drop drives cable size up on long runs
Fix: Always calculate VD and upsize if >5% (or >3% for lighting)

Example that fails:
- 7.4kW EV charger (32A), 40m cable run
- MCB: 32A → suggests 6mm²
- VD check: (7.3 × 32 × 40) / 1000 = 9.34V = 4.06% ✅ (just within 5%)
- But outdoor location → SWA required anyway

---

ERROR #3: Recommending Twin & Earth >10mm² for domestic
❌ Wrong: "16mm² Twin & Earth for 10kW shower"
✅ Right: "10kW shower needs 16mm², use SWA 3-core"

Root cause: Assuming T&E available in all sizes
Fix: Check cable size ≤ 10mm² before recommending T&E

Standard sizes:
- T&E: 1.5, 2.5, 4, 6, 10mm² (domestic standard)
- SWA: All sizes (1.5 to 240mm²)

---

ERROR #4: Ignoring location in cable type selection
❌ Wrong: "6mm² Twin & Earth to outdoor garage socket"
✅ Right: "6mm² SWA to outdoor garage" (Reg 522.6)

Root cause: T&E has no mechanical protection for outdoor use
Fix: Check location before finalising cable type

Outdoor/underground requirements:
- SWA armoured cable (preferred)
- OR conduit/duct burial with T&E inside
- Burial depth: 600mm general, 450mm under paths

---

ERROR #5: Not upsizing for long runs on high-power circuits
❌ Wrong: "9.5kW shower, 30m run = 10mm² T&E" (VD = 5.12%, >5%)
✅ Right: "9.5kW shower, 30m = 16mm² SWA" (VD = 2.87%)

Root cause: Not calculating VD or accepting >5%
Fix: Iterate cable sizes until VD ≤ 5% (or ≤ 3% for lighting)

Formula check:
VD% = (mV/A/m × Ib × L × 100) / (230 × 1000)

---

DEBUGGING CHECKLIST:
Before finalising cable selection:
□ Design current (Ib) calculated correctly?
□ MCB rating (In) ≥ Ib?
□ Correction factors (Ca, Cg, Ci) applied?
□ Cable current capacity (It) ≥ Iz?
□ Voltage drop calculated and ≤ 5% (or ≤ 3%)?
□ Cable size ≤ 10mm² if Twin & Earth selected?
□ Location checked (indoor/outdoor)?
□ Special installation requirements (EV, heat pump, etc.)?
□ Earth fault loop impedance (Zs) compliant?

If any □ fails → review cable size/type selection',
  'Cable Sizing Common Errors - Troubleshooting Guide',
  'BS 7671 Compliance Analysis + Field Experience',
  NOW()
);
```

## Changes Implemented

### 1. RAG Query Builder (`ragQueryBuilder.ts`)
✅ Added cable size-based selection prompts
✅ Added VD-driven upsizing prompts for long + high-power runs
✅ Enhanced methodology prompts for >10mm² scenarios

### 2. Designer Agent (`designer-agent/index.ts`)
✅ Fixed cable sizing to check voltage drop before finalizing size
✅ Added Twin & Earth maximum size validation (10mm² domestic, 16mm² commercial)
✅ Implemented cable type selection AFTER VD-aware sizing
✅ Added detailed logging for cable type reasoning
✅ Updated AI prompt with cable sizing methodology requirements

### 3. Test Cases

**Test 1: High Power Short Run**
- Input: "9.5kW shower, 18m indoor"
- Expected: 10mm² Twin & Earth (VD = 1.96%)

**Test 2: High Power Medium Run (Size Limit)**
- Input: "12kW shower, 20m indoor"
- Expected: 16mm² SWA (exceeds 10mm² T&E limit)

**Test 3: Medium Power Long Run (VD Upsize)**
- Input: "7kW heater, 50m indoor"
- Expected: 16mm² SWA (VD drives upsize beyond T&E)

**Test 4: Low Power Outdoor**
- Input: "3kW outdoor socket, 20m"
- Expected: 2.5mm² SWA (outdoor requirement)

**Test 5: EV Charger**
- Input: "7.4kW EV charger, 25m garage"
- Expected: 10mm² SWA (Section 722 + outdoor)

## Next Steps

1. **Run the SQL migration** in Supabase Dashboard → SQL Editor
2. **Generate embeddings** for the new knowledge entries via `process-pdf-embeddings` function
3. **Test** the designer agent with high-power scenarios
4. **Verify** SWA is selected for >10mm² calculations
