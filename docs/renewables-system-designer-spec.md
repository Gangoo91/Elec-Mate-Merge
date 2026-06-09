# Renewables — Solar PV System Designer (calc spec, v1)

> Draft for review **before** any build. Grounded in: MCS **MIS 3002:2025**, IET **Code of Practice for Grid-Connected Solar PV (2nd Ed)**, **BS 7671:2018+A4:2026**, **BS EN 62446-1**, **EREC G98/G99 Issue 2**, **EREC G100**. Where a value isn't fixed by standard (e.g. design temperatures) it's flagged as a **DECISION**.

## Goal

Enter panel + inverter (+ optional battery) + supply details → the engine sizes the system, flags the protection + grid-connection route, estimates yield, and **pre-fills ~80% of the existing Solar PV Installation Certificate** and a quote. No roof map in v1 (manual panel count).

---

## 1. Inputs

**Panel (per datasheet):** make, model, Wp, Voc(STC), Isc(STC), Vmp, Imp, temp coefficient of Voc `β_Voc` (%/°C, negative), temp coefficient of Pmax, dimensions, weight.
**Inverter:** make, model, type (string / micro / hybrid), MPPT count, max DC input voltage `V_dc_max`, MPPT voltage window `V_mppt_min…max`, max input current per MPPT `I_mppt_max`, rated AC output `P_ac` (kW), phases.
**Battery (optional):** chemistry, usable kWh, max charge/discharge kW.
**Supply:** DNO, MPAN, main fuse rating, earthing arrangement (TN-C-S/TT…), phases, existing load.
**Site:** postcode (→ lat/lon for yield + min-temp lookup), roof orientation (°) and tilt (°) per face, panel count per face (manual in v1).

---

## 2. Calculations

### 2.1 String sizing (IET CoP §7, panel + inverter datasheets)

Worst cases are **cold for over-voltage**, **hot for MPPT drop-out**.

- **Cold Voc** (coldest cell ≈ site min ambient):
  `Voc(Tmin) = Voc_STC × [1 + (β_Voc/100) × (Tmin − 25)]`
- **Max panels per string** (must not exceed inverter abs max DC voltage):
  `n_max = floor( V_dc_max / Voc(Tmin) )`
- **Hot Vmp** (hottest cell):
  `Vmp(Tmax) = Vmp_STC × [1 + (β_Vmp/100) × (Tcell_max − 25)]`
- **Min panels per string** (stay above MPPT min):
  `n_min = ceil( V_mppt_min / Vmp(Tmax) )`
- **Valid string length** = any n where `n_min ≤ n ≤ n_max`. Engine recommends the n that best fills the panel count and keeps the operating window mid-range.
- **Strings in parallel per MPPT** (current limit):
  `strings ≤ floor( I_mppt_max / I_design )`, where **`I_design = 1.25 × Isc`** (BS 7671 712.433.101 / IEC 62548).
- **Flags:** under-voltage (string too short → MPPT clipping), over-voltage (string too long → inverter damage/abort), current overload (too many parallel strings).

> **DECISION — design temperatures.** UK convention / IET CoP uses site-specific extremes. Proposed defaults: `Tmin = −10 °C`, `Tcell_max = +70 °C` (ambient +25 °C rise), editable per job, with a postcode min-temp lookup later. Confirm the defaults you want.

### 2.2 DC cabling (BS 7671 Part 7 §712, IET CoP)

- String/array cable design current `= 1.25 × Isc`.
- Size for current-carrying capacity **and** voltage drop. **Target ≤ 1 % on the DC side** (string + array runs); user enters run lengths.

### 2.3 AC cabling (MCS MIS 3002 §3.6.8)

- Inverter rated AC current: single-phase `I_ac = P_ac / V`; three-phase `I_ac = P_ac / (√3 · V_LL)`.
- VD reference points = **supplier's cut-out (service head) → inverter AC terminals**.
- **Target ≤ 1 %** for domestic small-scale; **up to 3 %** acceptable for larger / long runs (minimise nuisance over-voltage trips).

### 2.4 Grid-connection route (EREC G98 / G99)

- **Total AC output per phase ≤ 16 A → G98** (Fully Type Tested → DNO _notification_, no prior approval). ~3.68 kW single-phase, ~11.04 kW three-phase.
- **> 16 A per phase → G99** (DNO _application_, approval before connect).
- Engine outputs the route + the per-phase current that drove it.

### 2.5 Export & limiting (EREC G100)

- If site export (≈ inverter AC output, less any battery self-consumption) **exceeds the DNO-permitted export**, flag a **G100 Customer Export Limiting Scheme (CLS)** at the agreed limit (fail-safe required), instead of curtailing generation.

### 2.6 Protection (BS 7671 A4:2026)

- **DC isolator** sized ≥ `1.25 × Isc` array and ≥ array Voc(Tmin).
- **AC isolator** at inverter, rated ≥ `I_ac`.
- **Bidirectional protective device** — A4:2026 **Reg 530.3.201**: protective devices in prosumer installations must be declared suitable for **bidirectional** current. Flag if the chosen RCBO/MCB isn't bidirectional-rated.
- **AFDD** — MIS 3002 §3.6.7 (enable the inverter's arc-fault function); note BS 7671 A4:2026 421.1.7 AFDD scope.
- **SPD** — Reg 443 (A4:2026): required unless a risk assessment shows otherwise; PV DC-side Type 2 SPD per IEC 61643 / CoP, AC side per 443/534.

### 2.7 Yield + carbon (PVGIS, free, no key)

- `GET https://re.jrc.ec.europa.eu/api/v5_2/PVcalc` — `lat, lon, peakpower (kWp), loss=14, angle (tilt), aspect (orientation)`.
- Returns `E_y` (kWh/yr) + monthly. **CO₂ saved** = kWh × UK grid factor (default 0.207 kgCO₂/kWh, configurable). Self-consumption / export split + SEG estimate later.

### 2.8 Commissioning + docs (MIS 3002 §4)

- Inspection & test per **IET CoP §16** (except 16.4); record on **BS EN 62446-1** report (reproduced in MIS 3002 Appendix E). Metering: a means of recording/displaying total AC generation (MID meter if billed) — MIS 3002 §3.7.

---

## 3. Output → Solar PV Certificate field mapping

The designer pre-fills the existing `SolarPVFormData`:

| Design output                                                              | Cert section           |
| -------------------------------------------------------------------------- | ---------------------- |
| Panel make/model/Wp/Voc/Isc/Vmp/Imp, count, kWp, per-face orientation/tilt | Array details          |
| String config (n per string × strings per MPPT)                            | Array / string details |
| Inverter make/model, AC kW, MPPT count, type                               | Inverter details       |
| DC cable schedule (type, size, length, VD%)                                | DC installation        |
| AC cable schedule                                                          | AC installation        |
| DC isolator, AC isolator, bidirectional RCBO, SPD, AFDD                    | Protection             |
| G98/G99 route, DNO, MPAN, per-phase current                                | DNO notification       |
| Metering means                                                             | Generation meter       |
| PVGIS yield (kWh/yr), CO₂                                                  | Performance estimate   |

Also feeds the **Quote Builder**: panels × unit price, inverter, calculated cable lengths, isolators/SPD/RCBO, rails/fixings, scaffolding; labour from Rate Card; **0 % VAT** (domestic ESM relief).

---

## 4. Build phasing (each its own reviewable slice)

1. **Designer engine + form** (this spec) → string sizing, cabling, protection flags, G98/G99 route → pre-fill cert. _No yield/quote yet._
2. **PVGIS yield + CO₂**, then **Generate quote from design**.
3. **Single-line diagram** (client-side SVG → PDFMonkey), MCS/DNO doc pack, handover pack.
4. **Mapbox roof planner** (panel placement → auto panel count + orientation).

---

## 5. Open decisions for Andrew

1. **Design temperatures** — confirm defaults (−10 °C / +70 °C cell) or different.
2. **MCS product database** — scrape/cache the MCS certified list, or manual datasheet entry with a saved "my products" list first? (Recommend manual + saved list for v1; scrape later.)
3. **Default DC/AC VD targets** — 1 % DC, 1 % AC domestic (per MIS 3002). OK?
4. **Battery in v1?** — include battery inputs (affects self-consumption/export) or solar-only first?
