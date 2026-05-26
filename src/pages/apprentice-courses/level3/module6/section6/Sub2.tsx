/**
 * Module 6 · Section 6 · Subsection 2 — Schedules of accessories, cables, lighting and circuit charts
 * Maps to C&G 2365-03 / Unit 305 / LO5 / AC 5.3, 5.4
 *   AC 5.3 — "Produce schedules and charts to support the design documentation"
 *   AC 5.4 — "Reference each schedule item back to the single-line diagram and the calculations"
 *
 * Layered depth: 2366-03 Unit 304 / AC 5.3
 *
 * The four core schedules of any UK design pack:
 *   1) Schedule of Accessories  — every socket, switch, FCU, isolator, point of utilisation
 *   2) Schedule of Cables       — every cable run with type, size, length, Reference Method
 *   3) Schedule of Luminaires   — every fitting, lamp type, lumen output, control gear, IP rating
 *   4) Circuit Chart            — per-DB list of circuits, devices, RCD grouping, design Zs
 *
 * Reg 514.9.1 (A4:2026) is the regulatory hook — diagram, chart, table or equivalent
 * indicating type and composition of circuits, with the A4:2026 domestic exception.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  "Schedules of accessories, cables, lighting and circuit charts (5.3) | Level 3 Module 6.6.2 | Elec-Mate";
const DESCRIPTION =
  "The four core schedules of a UK design pack — accessories, cables, luminaires and per-DB circuit charts — and how each links back to the SLD and to BS 7671 Reg 514.9.1.";

const checks = [
  {
    id: "m6-s6-sub2-schedule-purpose",
    question:
      "Why are schedules a separate document rather than annotations on the layout drawing?",
    options: [
      "Because schedules give a sortable, filterable, totalisable list that drives procurement, install QC and as-installed verification — annotations on a layout cannot be totalised, sorted or counted at a glance. The SLD and the layouts show position and topology; the schedules give the bill.",
      "As a systematic exercise covering all assets, and reviewed periodically or when operating conditions change, new equipment is added, or following significant failures that reveal previously underestimated consequences",
      "Disconnect the electronic loads before the 500 V DC test, since they will be damaged or give a false low reading; reconnect them and apply the 250 V DC test per Reg 643.3.3, which must read at least 1.0 MΩ between live conductors and the protective conductor.",
      "To ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees — including safe systems of work, safe plant, training, supervision and a written safety policy where five or more employees are employed.",
    ],
    correctIndex: 0,
    explanation:
      "Schedules and layouts answer different questions. The layout answers where; the schedule answers how many, what spec, what cost. A 200-luminaire fit-out with annotations only on the layout cannot be priced, ordered, installed-against or signed off without somebody first transcribing the annotations into a list. The schedule IS that list, produced once by the designer and reused by procurement, install and commissioning.",
  },
  {
    id: "m6-s6-sub2-cable-schedule",
    question:
      "Your cable schedule lists Circuit 7 as 'XLPE/SWA 4c x 25 mm sq, 65 m, Ref Meth E'. The SLD shows the same circuit as 65 m. The installer measures the as-installed run at 78 m (cable route changed to avoid HVAC). What MUST happen before the EIC issues?",
    options: [
      "Because someone touching exposed metalwork on a distribution circuit (sub-main supplying a downstream board) is far less likely than someone touching the casing of a kettle on a final circuit — the touch-current risk profile is lower.",
      "Recognise the physical stress response (jaw clenching) and racing thoughts as signals that his amygdala has been triggered, then pause to allow the prefrontal cortex to re-engage before deciding on a course of action",
      "Marked-up as-built drawings, materials register (what was actually fitted), test record sheet with the dead-test results recorded as installation progressed (continuity, IR), confirmation of safe-isolation status for live testing.",
      "The designer re-runs the voltage drop and Zs calc using the as-installed length, updates the cable schedule and the SLD to read 78 m, marks the change in the revision history, and confirms the calc still passes. Only then can the EIC issue under Reg 644.1.1.",
    ],
    correctIndex: 3,
    explanation:
      "Reg 644.1.1 makes the EIC conditional on the documentation matching the install. A 13 m length difference can swing voltage drop and Zs by enough to fail Table 41.3 maxima or the 5 percent Vd ceiling. The designer re-runs the calc, updates the schedule and SLD to as-installed values, logs the revision, and only then does the EIC issue. This is the schedule discharging its role as the source of truth.",
  },
  {
    id: "m6-s6-sub2-circuit-chart",
    question:
      "Reg 514.9.1 of BS 7671:2018+A4:2026 requires the per-DB diagram, chart or table to indicate which of the following?",
    options: [
      "The type and composition of each circuit (points of utilisation served, number and size of conductors, type of wiring) and the means necessary for the identification of devices performing the functions of protection, isolation and switching. A4:2026 introduced a domestic exception — read the amended text for scope.",
      "The scheme flags a missed notification (audit risk + potential scheme penalty); the Building Control Compliance Certificate to the customer is delayed; in some cases late notification fees apply; persistent missed notifications can put scheme membership at risk.",
      "Has its stator connected directly to the grid and its rotor connected via a partial-rated power converter (typically 30% of full power), allowing variable-speed operation with a smaller, cheaper converter than a full-power conversion system",
      "BS 7671 Regulation 712.522 requires that DC cables within a building that cannot be isolated from the PV array in a fire are either fire-resistant (to BS 8434/BS 8519) or enclosed in fire-resistant conduit, because they will remain energised as long as daylight is present",
    ],
    correctIndex: 0,
    explanation:
      "Reg 514.9.1 is the per-DB chart requirement. It is satisfied by a circuit chart inside or beside the DB that names every circuit, its points of utilisation, its conductors, its protective device, isolator and switch. A4:2026 added a specific domestic exception — for non-domestic premises the requirement is full force. The circuit chart on the inside of the DB door is the on-site discharge of this regulation; the design pack version is the master copy.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which four core schedules sit in a typical UK commercial design pack?",
    options: [
      "Schedule of meetings, schedule of payments, schedule of testing, schedule of inspections.",
      "Schedule of Accessories, Schedule of Cables, Schedule of Luminaires, Circuit Chart (per-DB).",
      "Schedule of Accessories only — the others are optional.",
      "Bill of Materials only — schedules are obsolete in modern CAD packages.",
    ],
    correctAnswer: 1,
    explanation:
      "These four schedules are the workhorse documents of a commercial design pack. The Schedule of Accessories lists every socket, switch, FCU and isolator. The Schedule of Cables lists every cable run with type, size, length and Reference Method. The Schedule of Luminaires lists every fitting with lamp, lumen output and control gear. The Circuit Chart is per-DB and lists every circuit with its protective device, RCD grouping, cable spec and design Zs. Each schedule references the SLD topology and the calc sheet.",
  },
  {
    id: 2,
    question: "BS 7671 Reg 514.9.1 requires a per-DB diagram or chart that shows what?",
    options: [
      "They evaluated at Level 1 (Reaction) but not at Levels 3 (Behaviour) or 4 (Results), so they never checked if training changed actual practice",
      "Conduit fill depends on the run length and number of bends — OSG tabulates different factors for straight short runs vs longer runs with bends",
      "The type and composition of each circuit, the points of utilisation served, the number and size of conductors, the type of wiring, and the protective, isolation and switching devices.",
      "Repeat the test to verify, identify and rectify the fault, then re-test ALL preceding affected tests in sequence to confirm the rectification has not introduced new issues",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 514.9.1 is specific about what the chart must indicate so a tester or future designer can identify every circuit on the board. The on-site discharge is usually a printed chart inside the DB door; the design-pack discharge is the master Circuit Chart. A4:2026 added a domestic exception which narrows the scope for household installs.",
  },
  {
    id: 3,
    question: "Why should the cable schedule include Reference Method per BS 7671 Appendix 4?",
    options: [
      "Is a phenomenon where high voltage difference between the PV cells and the earthed frame causes leakage currents through the encapsulant, degrading cell performance over time — particularly in high-humidity environments",
      "1000 V DC, minimum IR per Table 64 (typically 1 MΩ at 1000 V). Used for circuits rated above 500 V up to 1000 V — the higher test voltage stresses the insulation appropriately for its in-service voltage and reveals defects that would not show at 500 V.",
      "A controlled sequence: life-safety loads first, then critical loads, then essential loads, with time delays between groups to prevent simultaneous inrush current from overloading the supply or generator",
      "Because the Reference Method (A through G) sets the tabulated current-carrying capacity (CCC) that the cable size depends on. Without Ref Method on the schedule, a tester cannot verify the cable size matches the install conditions, and a future designer cannot extend the circuit safely.",
    ],
    correctAnswer: 3,
    explanation:
      "Cable size depends on installation conditions. The same 25 mm sq XLPE/SWA cable carries different currents in Ref Meth A (enclosed in conduit in insulated wall), Ref Meth E (free air, perforated tray, single layer) and Ref Meth F (touching, multiple layers). Without Ref Method on the schedule, the tabulated CCC cannot be verified. Cables that look right on paper may carry too much current in their actual installation condition.",
  },
  {
    id: 4,
    question: "The Schedule of Luminaires must include lumen output and lamp type because:",
    options: [
      "Lumen output and lamp type drive lighting design compliance (BS EN 12464-1 illuminance levels), control gear matching, emergency lighting duration calc (BS 5266), thermal load on the wiring system and the maintenance regime — replacement lamps must match the original spec.",
      "Reviewing the job scope, checking availability of parts and materials, ensuring test equipment is calibrated and charged, obtaining necessary permits, informing production of the work window, and briefing any team members involved",
      "Model inclusive language; identify and accommodate reasonable adjustments where colleagues need them; ensure PEEPs are in place where required; intervene against discriminatory behaviour; document; escalate persistent issues.",
      "The pattern reveals power-based conflict behaviour — they accommodate those with more power, compete with those with less, revealing that their style is driven by power dynamics rather than situational appropriateness, risking apprentice wellbeing and development",
    ],
    correctAnswer: 0,
    explanation:
      "The Schedule of Luminaires has multiple downstream uses. The lumen and lamp data fix the illuminance compliance per BS EN 12464-1; the control gear data fix the harmonic and inrush behaviour for breaker selection; the IP rating fixes the suitability for the location; the maintenance regime needs the spec to order replacements 5 to 10 years later. A schedule that only lists 'LED panel x 40' fails every one of those downstream uses.",
  },
  {
    id: 5,
    question:
      "Your circuit chart for DB-G2 shows Circuit 5 as RCBO 16 A Type B Curve, 6 kA Icn, Type A 30 mA. The SLD shows the same circuit as RCBO 20 A Type B Curve. Which document is right?",
    options: [
      "The actual cable routes, fitting positions, junction-box locations, cable sizes used (where they differ from design), any deviations from the design and the reasons for them. As-installed drawings record what's actually in the wall, ceiling and floor void — so the next electrician (or the customer's plumber drilling for a new radiator) knows what they're dealing with.",
      "Neither — they conflict. The conflict must be resolved before any document issues. Trace back to the calc sheet (cable CCC and design Ib) to see which rating the calc supports, fix the wrong document, log the change in the revision history, and re-issue. A pack with internal conflict cannot be issued for construction.",
      "C&I is a specialised electrical-technician discipline covering process control systems, instrumentation, PLCs, SCADA and DCS. Typical route: Approved Electrician + HNC/HND in Electrical/Electronic or Process Control + employer-specific training (Siemens, Rockwell, Schneider PLC training). Common employers: process industries (food, pharma, water utilities), petrochemical, large manufacturing.",
      "Carry out a more extensive visual survey to establish the installation arrangement (reverse engineering from observation), document the limitation on the report front sheet under Section D, agree the scope of inspection with the duty holder, and note \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"no documentation available\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" as a limitation against affected items on the schedule.",
    ],
    correctAnswer: 1,
    explanation:
      "Internal conflict in a design pack is the most dangerous failure mode because it forces the installer to guess which document to follow. The resolution is always: trace to the underlying calc, fix the wrong document, log the revision, re-issue. Never let a pack with internal conflict reach site. A 30-second QC cross-check between SLD and Circuit Chart catches these errors before issue.",
  },
  {
    id: 6,
    question: "On a domestic CU upgrade, the A4:2026 Reg 514.9.1 exception means:",
    options: [
      "A tethered charger has the charging cable permanently attached to the EVSE unit (convenient for home use — just plug into the vehicle), while a socketed charger has a Type 2 socket on the unit and the user provides their own cable (more flexible for workplace/public use where different cable lengths and vehicle connectors may be needed)",
      "~17 A continuous, but sized to the inverter’s manufacturer spec (typically 16 A or 20 A, often a 16 A MCB feeding 2.5 mm² T&E for short runs). Allow for the inverter’s actual continuous AC output rating, not the panel DC rating.",
      "The full per-DB chart requirement is relaxed for domestic premises — but Reg 132.13 design documentation still applies, and a circuit list (numbered circuits with description and protective device) is still expected on or near the CU. Read the amended A4:2026 text for the precise wording and scope.",
      "An event that could have caused injury but didn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t — a slip without a fall, a near-contact, a tool drop without injury, a small fire that self-extinguished. Near-misses are the leading indicator of where the next incident will happen. Internal reporting and review of near-misses is one of the highest-impact preventive activities.",
    ],
    correctAnswer: 2,
    explanation:
      "A4:2026 introduced a specific domestic exception within Reg 514.9.1 that narrows the on-site chart requirement for household premises. The wider Reg 132.13 documentation duty still applies, and a circuit list naming each way and its protective device is still expected. For all non-domestic work the full Reg 514.9.1 requirement remains in force. Always cite the amended A4:2026 text rather than relying on memory of the older edition.",
  },
  {
    id: 7,
    question: "What is the practical difference between a Schedule of Accessories and a Bill of Materials (BOM)?",
    options: [
      "A RAMS that uses the same generic wording for every job ('standard electrical install — usual precautions') without reflecting the specific hazards and conditions of THIS site. The inspector spots it instantly because the wording doesn't match what's actually present on the job. It's evidence that the assessment wasn't 'suitable and sufficient' under MHSWR 1999 Reg 3 even though the document exists.",
      "If you process personal data for business purposes — almost every business does (customer names, addresses, phone numbers, photos). Small businesses (turnover < £632k AND fewer than 11 staff) pay the Tier 1 annual fee of £40 under the Data Protection (Charges and Information) Regulations 2018.",
      "CPS-registered firms can self-certify notifiable Part P work and issue compliance certificates direct to the Local Authority on the homeowner's behalf. The LABC route requires a Building Notice or Building Regulations application before work starts, plus an LABC inspection during/after work — typically £150-300 per job and several weeks of LABC scheduling delay. Self-certification removes the cost and the delay.",
      "The Schedule of Accessories is a design document — every accessory by location, type, IP rating and circuit reference, used for install QC and as-installed verification. The BOM is a procurement document — totals by part number for ordering. The schedule drives the BOM, but the schedule survives long after the BOM is closed.",
    ],
    correctAnswer: 3,
    explanation:
      "Schedule and BOM serve different audiences. The schedule is per-location and survives as part of the operations and maintenance pack — testers and future designers use it. The BOM is a totalled purchase list used by procurement and disposed of once the order is delivered. A pack that has a BOM but no Schedule of Accessories has nothing to verify install against.",
  },
  {
    id: 8,
    question: "When does the cable schedule get updated to as-installed values?",
    options: [
      "At handover — the installer red-lines any deviations (route change, length change, cable type substitution), the designer reviews and re-runs affected calcs, the schedule is updated to as-installed values, and the as-installed schedule becomes the master operational document held by the building owner.",
      "Independent verification. The dead-test calculation depends on Ze (one measurement) plus R1+R2 (one or many readings, depending on circuit). The live Zs measurement is one direct reading. Comparing the two catches errors in either method, gives confidence in the result, and provides a single value to compare against Table 41.3 with the 0.8 multiplier applied.",
      "Written confirmation from both employer and training provider, a record of the gateway readiness review, evidence that all pre-requisites are met (qualifications, portfolio, off-the-job training hours), and formal agreement to proceed",
      "Key technical areas that underpin the assessment: safety legislation, relevant regulations, fundamental electrical principles, maintenance procedures, and the specific technical knowledge related to your workplace activities and portfolio evidence",
    ],
    correctAnswer: 0,
    explanation:
      "The as-installed update is part of the designer's handover responsibility (covered in Sub 5). Reg 644.1.1 makes the EIC conditional on the documentation matching the install. The cable schedule, the SLD, the layouts and the circuit charts are all updated at handover so the building owner inherits a pack that matches the building. Skipping this step strands the building with documentation that drifts further from reality every year.",
  },
];

const faqs = [
  {
    question: "Do I need all four schedules on every job, or only on commercial work?",
    answer:
      "Scope to the job. A small domestic CU upgrade can be served by a one-page Circuit Chart plus a brief schedule of any added accessories (the EV charger isolator, the new shower spur). A commercial fit-out needs all four schedules in full. The principle is proportionality — the schedule set should be sufficient that any future competent person can operate, maintain, alter and extend the install without guessing. Reg 132.13 and Reg 514.9.1 set the floor; the work type sets the ceiling. If you are not sure, err on the side of more documentation, never less.",
  },
  {
    question: "Should the Schedule of Accessories include circuit references or just locations?",
    answer:
      "Both. Each row should carry: room or zone, accessory type (single socket, double socket, switched FCU, fused spur, isolator, dimmer), IP rating, mounting height, circuit reference (e.g. DB-G1/Circuit 4) and any special notes (clean earth, RCD-protected, time-clock-controlled). The circuit reference is what links the accessory back to the SLD and the Circuit Chart, and it is what a tester uses to know which RCD they are testing when they push the button.",
  },
  {
    question: "How do I handle cable schedule entries for ring final circuits?",
    answer:
      "A ring final is one circuit with a continuous loop conductor. The schedule entry shows: circuit ref, cable type and size (e.g. 'T+E 2.5 mm sq with 1.5 mm sq CPC'), total ring length (from DB out, around the ring, back to DB), Reference Method, and a note 'RING — both ends terminated at MCB/RCBO'. Some designers split the schedule into 'leg A' and 'leg B' lengths for diagnostic purposes (the difference between leg A and leg B end-to-end resistance is the ring continuity test). Either format works, but consistency across the pack matters.",
  },
  {
    question: "What goes on the Schedule of Luminaires that is not obvious?",
    answer:
      "Beyond lamp type, lumen output and IP rating, the schedule should record: control gear type (driver brand and rating, dimming protocol DALI or 0-10V or phase-cut), CCT (correlated colour temperature) and CRI (colour rendering index) for non-utility spaces, mounting type (recessed, surface, suspended, track), emergency function (maintained, non-maintained, NM3 for emergency-only), test switch location for the emergency lighting circuit, and any specific compliance reference (BS EN 12464-1 task lighting class, BS 5266 emergency duration). Maintenance staff working a 5-year refresh need every one of these fields.",
  },
  {
    question: "How does the circuit chart relate to the chart printed inside the DB door?",
    answer:
      "The circuit chart in the design pack is the master copy. The chart inside the DB door is a printed extract of the master, simplified for on-site reading. Both must say the same things — circuit number, description, points of utilisation, protective device type and rating, RCD or RCBO grouping, cable size and reference method, design Zs. The DB-door copy is laminated or behind a clear cover. Reg 514.9.1 is satisfied by the DB-door copy on site; Reg 132.13 is satisfied by the master copy in the design pack. Both are needed.",
  },
  {
    question: "What software do most L3 designers use to produce schedules?",
    answer:
      "Most small-firm designers run schedules in a spreadsheet (Excel or Google Sheets) linked to the calc sheet so cable sizes and Zs values flow through automatically. Larger firms use proprietary design suites — ProDesign, Amtech, Hevacomp, Trimble Stabicad — which generate the SLD, the schedules and the calc sheet from one shared model. CAD-only workflows produce schedules as separate sheets in the AutoCAD or Revit drawing set. The tooling matters less than the discipline; what matters is that the schedule, the SLD and the calc agree at every cross-reference and that the version control system catches any drift.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 2"
            title="Schedules of accessories, cables, lighting and circuit charts"
            description="The four core schedules of a UK design pack. Each schedule has a job, an audience and a regulatory hook back to BS 7671 Reg 132.13 and 514.9.1. Get the schedule discipline right and the SLD, the layouts and the EIC all line up at handover."
            tone="amber"
          />

          <TLDR
            points={[
              "The four core schedules of a UK design pack are the Schedule of Accessories, the Schedule of Cables, the Schedule of Luminaires and the Circuit Chart (per-DB). Each is a sortable, totalisable list that the SLD and the layouts cannot be.",
              "BS 7671 Reg 514.9.1 requires a per-DB diagram, chart or table indicating circuit composition, points of utilisation, conductors and protective, isolation and switching devices. A4:2026 added a domestic exception — read the amended text.",
              "Schedules survive long after the BOM is closed. They drive procurement, install QC, commissioning, EIC verification and 5 to 25 years of operations and maintenance.",
              "Internal conflict between schedule and SLD is the most dangerous failure mode in a pack. A 30-second QC cross-check before issue catches it; missing it sends installers to site with two contradictory specs and forces them to guess.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the four core schedules of a UK design pack and explain the audience and the downstream use of each.",
              "Draft a Schedule of Accessories that supports install QC and as-installed verification, with circuit references back to the SLD.",
              "Draft a Schedule of Cables that includes type, size, length, Reference Method and any non-typical derating factors so a tester can verify cable sizing.",
              "Draft a Schedule of Luminaires that supports BS EN 12464-1 illuminance compliance, BS 5266 emergency lighting duration, control gear matching and 5 to 10 year maintenance.",
              "Draft a per-DB Circuit Chart that satisfies BS 7671 Reg 514.9.1 — circuit composition, points of utilisation, conductor sizing, protective device, RCD grouping and design Zs.",
              "Cite BS 7671 Reg 132.13 and Reg 514.9.1 (with the A4:2026 domestic exception) as the regulatory basis for the schedule set.",
              "Apply the as-installed update process at handover — red-line review, calc re-run on length or route changes, schedule revision and re-issue.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Why schedules exist as separate documents"
            plainEnglish="The SLD shows topology. The layouts show position. The schedules give the totalisable, sortable list. Three views, three audiences, one installation."
            onSite="Schedules are what procurement, install QC, commissioning and the future maintainer all reach for. Annotations on a layout cannot be sorted or counted; a schedule can."
          >
            <p>
              A design pack answers different questions for different readers. The SLD answers the
              topology question — what is connected to what. The layout drawings answer the
              geometry question — where things are. The schedules answer the inventory question —
              how many, what spec, in what location, on which circuit. The same socket appears in
              all three documents but each shows a different property of it.
            </p>
            <p>
              Schedules are the document set that actually drives the construction process. The
              procurement team prices the BOM directly off the schedules. The install team takes
              the Schedule of Accessories to site and ticks off every item as it goes in. The
              commissioning team uses the Circuit Chart to walk through every breaker and verify
              the RCD test. The future maintainer in 2031 cracks open the Schedule of Luminaires
              to order a replacement driver for a failed LED panel. Every one of those reuses
              would be slow and error-prone if the data lived only as annotations on a drawing.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.6 (Cross-sectional area of conductors)"
            clause="The cross-sectional area (csa) of conductors shall be determined for both normal operating conditions and, where appropriate, for fault conditions according to: (a) the admissible maximum temperature; (b) the admissible voltage drop; (c) the electromechanical stresses likely to occur due to short-circuit and earth fault currents; (d) other mechanical stresses to which the conductors are likely to be exposed; (e) the maximum impedance for correct operation of short-circuit and earth fault protection; (f) the method of installation; (g) harmonics; (h) thermal insulation."
            meaning={
              <>
                Schedules are how the eight csa-determining inputs in Reg 132.6 land on
                a buildable record. The Schedule of Cables captures csa, install method,
                voltage drop and ADS impedance per circuit; the Circuit Chart ties device
                rating to that csa; the Schedule of Accessories pins the cable to its
                physical termination point. Without the four-schedule spine (Accessories,
                Cables, Luminaires, Circuit Chart) the 132.6 design rationale cannot be
                evidenced — and a future periodic inspector cannot verify the install was
                designed to the cable rather than improvised in the trench.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.6."
          />

          <SectionRule />

          <ContentEyebrow>Schedule of Accessories</ContentEyebrow>

          <ConceptBlock
            title="Schedule of Accessories — what it lists and why"
            plainEnglish="Every socket, switch, FCU, isolator, dimmer, data outlet — by location, type, IP rating and circuit reference. The install QC checklist and the as-installed verification record."
          >
            <p>
              A typical row on a commercial Schedule of Accessories carries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Item reference</strong> — unique row ID (e.g. ACC-G-001) so the layout drawing can be cross-referenced.</li>
              <li><strong>Building / level / room or zone</strong> — physical location for install routing and post-install verification.</li>
              <li><strong>Accessory type</strong> — single socket, double socket, switched FCU, fused spur, RCD socket, isolator, dimmer, data outlet, USB-C charger socket.</li>
              <li><strong>Mounting</strong> — flush, surface, in floor box, in cable trunking. Mounting height (e.g. 450 mm to centre of accessory or 1100 mm for switches per Approved Document M).</li>
              <li><strong>Manufacturer and finish</strong> — brand and plate finish (white moulded, brushed steel, polished brass, anti-microbial). Finish drives the BOM totals.</li>
              <li><strong>IP rating</strong> — IP20 indoor, IP44 splash zone, IP65 wet area (kitchens, washrooms, plant rooms, external).</li>
              <li><strong>Circuit reference</strong> — DB and circuit number (e.g. DB-G1/Circuit 4) so the accessory is traceable to its protective device.</li>
              <li><strong>Notes</strong> — special features (clean earth, RCD-protected via the circuit, time-clock-controlled, dimmer-compatible LED driver required, wiring through cable trunking).</li>
            </ul>
            <p>
              On a 3,000 sq m commercial fit-out the Schedule of Accessories often runs to 600 to
              1,200 rows. In a spreadsheet it sorts by location for the install team, by circuit
              for the commissioning team, by manufacturer for the procurement team. As one
              document it serves three audiences without re-keying.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Schedule of Accessories with no circuit references"
            whatHappens={
              <>
                A junior designer drafts a Schedule of Accessories with location, type and IP rating
                but no circuit reference column. The install team uses it for QC and the install
                completes. At commissioning the tester needs to know which RCD each socket is on so
                they can prove the residual-current trip. They are forced to physically trace every
                socket back to a DB by switching breakers off one at a time. A two-day commissioning
                visit becomes a five-day visit.
              </>
            }
            doInstead={
              <>
                Always include the circuit reference column. The reference comes from the SLD and
                the Circuit Chart and links the accessory to its protective device. The
                commissioning tester then cross-references row by row and tests in circuit order
                rather than chasing breakers. The schedule discipline costs the designer five
                minutes; missing it costs the project days.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Schedule of Cables</ContentEyebrow>

          <ConceptBlock
            title="Schedule of Cables — type, size, length, Reference Method"
            plainEnglish="Every cable run from origin to final accessory, with the data a tester needs to verify cable sizing and a future designer needs to extend safely."
            onSite="The cable schedule is the document that drives the calc sheet. Get the cable spec wrong here and the voltage drop, the Zs and the discrimination check are all wrong downstream."
          >
            <p>
              A typical row on a commercial Schedule of Cables carries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable reference</strong> — unique row ID, often the circuit number (e.g. CBL-DB-G1-04 for the cable serving Circuit 4 from DB-G1).</li>
              <li><strong>From / To</strong> — origin device and destination device (e.g. From: DB-G1 MCB Way 4, To: Ring final boxes ACC-G-007 to ACC-G-022).</li>
              <li><strong>Cable type</strong> — full description (e.g. T+E to BS 6004, FP200 Gold to BS EN 50200 PH30, XLPE/SWA to BS 5467, FP400 to BS 8434, MICC to BS EN 60702).</li>
              <li><strong>Conductor size</strong> — phase conductor cross-section in mm sq, with CPC size if different (e.g. 2.5 mm sq with 1.5 mm sq CPC).</li>
              <li><strong>Number of cores</strong> — 2-core, 3-core, 4-core, multi-core, single-core grouped.</li>
              <li><strong>Length</strong> — design length in metres. Updated to as-installed at handover.</li>
              <li><strong>Reference Method</strong> — BS 7671 Appendix 4 reference (A through G) for the installation method. Drives the tabulated CCC.</li>
              <li><strong>Derating factors</strong> — Ca (ambient temperature), Cg (grouping), Ci (thermal insulation), Cs (soil resistivity for buried cables). Listed if non-typical.</li>
              <li><strong>Tabulated CCC (It)</strong> — from the Appendix 4 table for the chosen Reference Method.</li>
              <li><strong>Required Iz</strong> — derated CCC after applying Ca x Cg x Ci factors. Must exceed the protective device rating per Reg 433.1.1.</li>
              <li><strong>Vd at design Ib</strong> — voltage drop in volts (and as percentage of nominal) at the design load current. Verified against Reg 525.202 (typically 3 percent for lighting, 5 percent for power and other use, end-to-end from origin).</li>
              <li><strong>Notes</strong> — fire-stop type at penetrations, segregation requirements (Band I from Band II per Reg 528), special routing constraints.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.9.1 (Diagrams, charts, tables and similar information) — amended in A4:2026"
            clause="Regulation 514.9.1 requires that a diagram, chart, table or equivalent form of information be provided at every distribution board sufficient to identify the circuits — typically covering the type and composition of each circuit (points of utilisation served, number and size of conductors, type of wiring) and the devices performing protection, isolation and switching. A4:2026 amended 514.9.1 to include an exception for domestic (household) premises; consult the published A4:2026 wording for the precise scope of that exception."
            meaning={
              <>
                Reg 514.9.1 is the per-DB chart requirement that the Schedule of Cables and the
                Circuit Chart between them discharge. The schedule gives the cable detail; the
                Circuit Chart gives the per-DB summary. A4:2026 introduced a specific exception for
                domestic premises that narrows the on-site chart requirement for household
                installs; for non-domestic work the requirement is full force. Cite Reg 514.9.1
                in the schedule title block as the regulatory basis.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.9.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Schedule of Luminaires</ContentEyebrow>

          <ConceptBlock
            title="Schedule of Luminaires — lighting design discharged on a list"
            plainEnglish="Every fitting with lamp type, lumen output, control gear, IP rating, mounting and emergency function. The single document that connects lighting design to wiring design."
            onSite="The Schedule of Luminaires is also the input to the lighting designer's compliance check. Sort by zone, total the lumens per zone, divide by area, get the average illuminance and check it against BS EN 12464-1."
          >
            <p>
              A typical row on a Schedule of Luminaires carries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Luminaire reference</strong> — unique row ID (e.g. LUM-G-001) cross-referenced from the lighting layout drawing.</li>
              <li><strong>Building / level / room or zone</strong> — physical location.</li>
              <li><strong>Manufacturer and model</strong> — brand and product code (e.g. Thorn Eco SmartScan recessed 600 x 600 panel).</li>
              <li><strong>Lamp / source type</strong> — LED panel, LED downlight, LED batten, LED tape, fluorescent T5 (legacy), discharge (high-bay).</li>
              <li><strong>Wattage</strong> — total fitting wattage including control gear losses.</li>
              <li><strong>Lumen output</strong> — luminaire-out lumens (not lamp-out lumens) as published by manufacturer.</li>
              <li><strong>CCT</strong> — correlated colour temperature (3000 K warm white, 4000 K neutral, 5000 K daylight). Drives space ambience.</li>
              <li><strong>CRI</strong> — colour rendering index (CRI greater than 80 for general use, greater than 90 for retail or healthcare).</li>
              <li><strong>IP rating</strong> — IP20 indoor, IP44 splash zone, IP65 wet area, IP66 outdoor.</li>
              <li><strong>Mounting</strong> — recessed grid, recessed plasterboard, surface, suspended, track, wall sconce, bulkhead.</li>
              <li><strong>Control gear</strong> — driver brand and model, dimming protocol (DALI, DALI-2, 0-10V, phase-cut, switched), inrush rating.</li>
              <li><strong>Emergency function</strong> — non-emergency, maintained 3 hour, non-maintained 3 hour, with self-test (BS EN 62034 / EN 50172).</li>
              <li><strong>Circuit reference</strong> — DB and circuit number.</li>
              <li><strong>Notes</strong> — special compliance (BS EN 12464-1 task class, BS 5266 emergency category, IK rating for impact, anti-glare UGR).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Lighting calc compliance — what the schedule supports"
            plainEnglish="Total lumens per zone, divide by area, compare to BS EN 12464-1 task illuminance. Total emergency lumens per escape route, check duration and uniformity per BS 5266. Schedule data is the input."
          >
            <p>
              The Schedule of Luminaires feeds three downstream compliance checks:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BS EN 12464-1 task illuminance</strong> — minimum maintained lux per task type. Office writing 500 lux, retail 300 lux, warehouse aisle 100 to 200 lux, kitchen prep 500 lux. The schedule lumen totals divided by zone area give the design average.</li>
              <li><strong>BS 5266 emergency lighting</strong> — escape route minimum 1 lux on the centre line, anti-panic open area 0.5 lux average, high-risk task area 10 percent of normal lighting. Duration 3 hours minimum for most premises. The schedule emergency function and lumen entries are the input to the BS 5266 calc.</li>
              <li><strong>BREEAM and Part L energy efficiency</strong> — luminous efficacy in lumens per circuit watt. The schedule wattage and lumen totals feed the Part L 2 calculation that fits non-domestic energy compliance.</li>
            </ul>
            <p>
              A Schedule of Luminaires with missing lumen, wattage or CCT data fails every one of
              these checks. Lighting design is a separable discipline — many L3 designers
              subcontract the lighting calc — but the Schedule of Luminaires that documents the
              design sits firmly with the L3 electrical designer.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Schedule of Luminaires that does not record control gear or driver detail"
            whatHappens={
              <>
                The schedule lists 'LED panel x 80, recessed 600 x 600' with the lumen and wattage
                but no control gear data. At commissioning the dimmable circuits do not dim
                smoothly — the wall dimmer is phase-cut but the drivers fitted are switched-only.
                The install team rips out 80 drivers and refits compatible ones. The cost is
                charged back through the chain of responsibility and lands somewhere unpleasant.
              </>
            }
            doInstead={
              <>
                Record the driver brand, model and dimming protocol on every dimmable luminaire
                row. If the room dimmer is DALI, the driver must be DALI-compatible; if the dimmer
                is 0-10V the driver needs a 0-10V input. Phase-cut dimming needs a phase-cut
                compatible driver and a leading-edge or trailing-edge dimmer matched to the
                driver. Capture this on the schedule, cross-check at design QC, and the install
                works first time.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Circuit Chart (per-DB)</ContentEyebrow>

          <ConceptBlock
            title="Circuit Chart — the per-DB summary that satisfies Reg 514.9.1"
            plainEnglish="One chart per DB. Lists every way, every circuit, every device, every RCD grouping, every cable spec, every design Zs. The on-site copy lives inside the DB door."
            onSite="Reg 514.9.1 is satisfied on site by the printed chart inside the DB; in the design pack it is satisfied by the master Circuit Chart. Both must say the same things."
          >
            <p>
              A typical Circuit Chart for one DB carries one row per way. Each row shows:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Way number</strong> — physical position in the DB (Way 1, Way 2, ... typically left to right and top to bottom on a TP+N board).</li>
              <li><strong>Circuit number</strong> — designer reference (often matches Way but not always; some designers reserve circuit numbers for grouping or for future expansion).</li>
              <li><strong>Circuit description</strong> — plain English (e.g. 'Open-plan office east — lighting Zone A', 'Kitchen ring final final', 'EV charger driveway').</li>
              <li><strong>Points of utilisation</strong> — count of accessories or area served (e.g. '12 luminaires', '8 sockets', '1 EV charger 7 kW').</li>
              <li><strong>Conductor type and size</strong> — cable spec from the Schedule of Cables (e.g. 'T+E 2.5 mm sq with 1.5 mm sq CPC').</li>
              <li><strong>Cable length</strong> — from the Schedule of Cables.</li>
              <li><strong>Reference Method</strong> — Appendix 4 reference.</li>
              <li><strong>Protective device</strong> — type, rating, curve, breaking capacity (e.g. 'RCBO 16 A Type B Curve, 6 kA Icn, Type A 30 mA').</li>
              <li><strong>RCD grouping</strong> — which RCD or RCBO covers the circuit (or 'RCBO direct' for individual protection).</li>
              <li><strong>Design Ib</strong> — design load current after diversity.</li>
              <li><strong>Iz</strong> — derated cable CCC.</li>
              <li><strong>Vd</strong> — design voltage drop at Ib.</li>
              <li><strong>Design Zs</strong> — calculated Zs at end of circuit at operating temperature with Cmin factor.</li>
              <li><strong>Regs maximum Zs</strong> — from BS 7671 Table 41.3 / 41.4 / 41.5 for the device.</li>
              <li><strong>Notes</strong> — emergency function, time-clock control, contactor relay, special circumstances.</li>
            </ul>
            <p>
              The Circuit Chart sits between the SLD and the Schedule of Cables in the design pack
              and effectively summarises both for quick on-site reading. The DB-door printed copy
              is a simplified extract — circuit number, description, protective device and RCD
              grouping — the rest stays in the master Circuit Chart and the design pack.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Cross-checking the Circuit Chart against the SLD"
            plainEnglish="A 30-second QC sweep before issue. Way numbers match, ratings match, RCD groupings match, design Zs values match. Internal conflict caught here cannot reach site."
          >
            <p>
              The cross-check sweep before issuing the pack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Way count</strong> — Circuit Chart row count for the DB equals the SLD breaker count for the DB.</li>
              <li><strong>Device matching</strong> — every protective device on the Circuit Chart matches the SLD entry by type, rating, curve and breaking capacity.</li>
              <li><strong>RCD grouping</strong> — the RCD groups shown on the SLD (Group A, Group B, RCBO direct) match the Circuit Chart RCD column.</li>
              <li><strong>Cable spec</strong> — cable type, size and length on the Circuit Chart matches the SLD cable annotations and the Schedule of Cables entries.</li>
              <li><strong>Design Zs</strong> — the design Zs on the Circuit Chart matches the SLD Zs annotation, and is below the regs maximum Zs.</li>
              <li><strong>Cross-reference clean</strong> — every Circuit Chart description corresponds to a real zone on the layouts and to real accessory rows on the Schedule of Accessories.</li>
            </ul>
            <p>
              Catching a single conflict at QC saves an entire fit-out from rework. Most experienced
              firms have a written QC checklist they run on every pack before issue; some run a
              second engineer check on every pack so the cross-check is independent.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Specialist schedules — when to add more</ContentEyebrow>

          <ConceptBlock
            title="Specialist schedules for special-system installs"
            plainEnglish="Fire alarm, BMS, EV chargers, PV strings, battery storage, structured cabling — each system carries its own schedule on top of the four core ones."
          >
            <p>
              A larger or more specialist install adds further schedules to the four-core spine.
              Each follows the same pattern (sortable list, audience-driven content, regulatory
              hook) but covers a discipline-specific kit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Schedule of Fire Alarm Devices</strong> — every detector, sounder, beacon, manual call point and panel. Cross-references BS 5839 category, zone plan, response time class.</li>
              <li><strong>Schedule of BMS Points</strong> — every input and output point on the building management system, type (digital, analogue), location, controller channel.</li>
              <li><strong>Schedule of EV Chargers</strong> — every charger, rating, supply circuit, RCD type (Type A with DC monitor or Type B), O-PEN protection method, OCPP back-end.</li>
              <li><strong>Schedule of PV Strings</strong> — every string, panel count, string voltage at MPP, string current, MPPT input, isolator location, DC and AC cable specs.</li>
              <li><strong>Schedule of Battery Storage</strong> — battery banks, AC and DC cabling, BMS interfaces, fire-suppression provisions.</li>
              <li><strong>Schedule of Structured Cabling</strong> — every Cat6 / Cat6A / fibre run with patch panel reference, cabinet, cable length, performance class.</li>
            </ul>
            <p>
              Each specialist schedule references back to the four-core spine — the EV charger
              circuit on the EV schedule is also a row on the Schedule of Cables and a row on the
              Circuit Chart. The specialist schedule is supplementary; it does not replace the
              core schedules.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <Scenario
            title="Commercial fit-out — schedule discipline at week 8 of a 12-week install"
            situation={
              <>
                A 1,800 sq m office fit-out is in week 8 of a 12-week install. The L3 designer has
                issued the design pack at Rev C three weeks ago. The install team asks for a route
                change on a sub-main cable to avoid a structural beam they did not expect. The
                length will go from 42 m to 51 m. The Schedule of Cables and the SLD both show
                42 m. The voltage drop calc was 3.8 percent at 42 m — uncomfortably close to the
                5 percent ceiling for power circuits.
              </>
            }
            whatToDo={
              <>
                Treat it as a formal RFI (Request for Information — the workflow Sub 3 covers).
                Re-run the voltage drop calc at 51 m: it goes to 4.6 percent, still under the
                5 percent ceiling but close enough to flag. Re-run the design Zs calc at the new
                length: it nudges up but stays well below the Table 41.3 maximum for the
                downstream device. Update the cable schedule entry to read 51 m. Update the SLD
                cable annotation to read 51 m. Add a revision cloud on the SLD around the changed
                annotation. Update the revision history table on both documents (Rev C to Rev D,
                with reason 'sub-main cable length increased to 51 m to avoid structural beam,
                Vd re-checked at 4.6 percent within Reg 525.202 ceiling'). Re-issue the SLD and
                the cable schedule at Rev D. Mark Rev C as VOID. Confirm receipt with the install
                team. Authorise the install team to proceed.
              </>
            }
            whyItMatters={
              <>
                Schedule discipline is what separates a calm pack from a chaotic one. The route
                change is normal — installs always meet reality the SLD did not anticipate. What
                matters is the workflow: RFI captures the change, calc re-run proves the design
                still works, schedule and SLD update together, revision history captures the
                reason, supersedes are voided, install proceeds. Each step is fast individually;
                the discipline is in doing them all every time. Reg 644.1.1 will not let the EIC
                issue if the documentation does not match the install — the fit-out fails to
                handover unless the schedule chases reality at every change.
              </>
            }
          />

          <SectionRule />

          <CommonMistake
            title="Letting the cable schedule drift from the SLD across multiple revisions"
            whatHappens={
              <>
                The L3 designer issues Rev A. The install team requests a circuit change. The
                designer updates the SLD to Rev B but forgets to update the cable schedule. The
                install team requests a second change. The SLD goes to Rev C; the cable schedule
                goes to Rev B (still missing the first change). At handover the install matches
                the SLD Rev C; the cable schedule Rev B disagrees with both the install and the
                SLD. The EIC tester refuses to sign until the schedule is brought into line.
              </>
            }
            doInstead={
              <>
                Treat the SLD, the schedules and the calc sheet as a single revision unit. When
                one changes, all change. Assign the same revision letter to the whole pack at
                each issue. A revision is not finished until every document has been touched and
                the cross-references re-checked. The five-minute discipline at issue prevents the
                five-day fix at handover.
              </>
            }
          />

          <ConceptBlock
            title="As-installed updates — closing the loop at handover"
            plainEnglish="The installer red-lines deviations on a working copy. The designer reviews, re-runs affected calcs, updates the schedules and the SLD to as-installed, marks the revision and re-issues. The as-installed pack is what the building owner inherits."
            onSite="Sub 5 covers the full handover process. The schedule discipline at handover is what closes the documentation loop and gives Reg 644.1.1 its evidence."
          >
            <p>
              At handover the installer presents a red-lined working copy of the design pack
              showing every deviation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable route changes</strong> — actual route taken if different from design route. Often documented on the layout, with affected cable lengths updated on the schedule.</li>
              <li><strong>Cable length changes</strong> — measured length if different from design length. Triggers re-run of voltage drop and Zs calc.</li>
              <li><strong>Cable substitutions</strong> — equivalent cable type fitted instead of designed type (e.g. specified XLPE/SWA, fitted FP200 to satisfy fire engineer concern). Triggers re-check that the substituted cable meets the calc.</li>
              <li><strong>Accessory substitutions</strong> — equivalent accessory fitted (e.g. brand B socket instead of brand A). Updated on the Schedule of Accessories.</li>
              <li><strong>Luminaire substitutions</strong> — equivalent luminaire fitted (e.g. brand B LED panel instead of brand A). Updated on the Schedule of Luminaires; lumen and wattage re-checked against the lighting calc.</li>
              <li><strong>Circuit additions</strong> — circuits added on site (e.g. extra socket cluster for IT). Added to Schedule of Cables, Schedule of Accessories and Circuit Chart; way assignment confirmed on SLD.</li>
            </ul>
            <p>
              The designer reviews each red-line, re-runs any affected calc, updates each affected
              schedule and the SLD, marks the changes, and re-issues the whole pack at the next
              revision letter. The re-issued pack is the as-installed pack — the master that the
              building owner files in the operations and maintenance pack and that the next
              tester or designer picks up in five years. Reg 644.1.1 will only allow the EIC to
              issue once this pack matches the install.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (New installation — defects to be corrected before Certificate issued)"
            clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
            meaning={
              <>
                Reg 644.1.1 is the regulatory hook that closes the schedule loop at handover. Any
                disagreement between the design pack and the install is a defect or omission for
                the purposes of this regulation. Either the install is brought back to match the
                schedule, or the schedule is updated to as-installed, but the EIC cannot issue
                until they match. The schedule discipline at handover is what gives Reg 644.1.1
                its evidence.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "The four core schedules of a UK design pack are the Schedule of Accessories, the Schedule of Cables, the Schedule of Luminaires and the per-DB Circuit Chart. Each is a sortable, totalisable list that drives procurement, install QC, commissioning and 5 to 25 years of maintenance.",
              "BS 7671 Reg 514.9.1 requires the per-DB diagram or chart indicating circuit composition, points of utilisation, conductors and protective, isolation and switching devices. A4:2026 added a domestic exception — read the amended text for the precise wording and scope.",
              "BS 7671 Reg 132.13 names schedules explicitly as part of design documentation. The format is not specified; the sufficiency is — schedules must let the install be operated, maintained, altered and extended throughout its life.",
              "The Schedule of Accessories is for install QC and commissioning audit. Always include circuit references — without them, the commissioning tester has to chase breakers manually.",
              "The Schedule of Cables drives the calc sheet. Type, size, length, Reference Method and derating factors are mandatory columns — without them the cable size cannot be verified.",
              "The Schedule of Luminaires connects lighting design to wiring design. Lumen output, control gear detail, IP rating and emergency function are mandatory columns — they support BS EN 12464-1, BS 5266 and Part L compliance.",
              "The Circuit Chart is the per-DB summary that satisfies Reg 514.9.1 on site. The DB-door printed copy is a simplified extract; the master copy lives in the design pack with full design Zs and Vd values.",
              "Internal conflict between schedule, SLD and Circuit Chart is the most dangerous failure mode in any design pack. A 30-second cross-check before issue catches it. Reg 644.1.1 will not let the EIC issue if the pack disagrees with the install at handover.",
            ]}
          />

          <Quiz
            title="Schedules and circuit charts — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module6-section6-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.1 SLD production
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module6-section6-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 RFI workflow + chain of accountability
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
