/**
 * Module 6 · Section 3 · Subsection 5 — Synthesis worked example
 * Maps to C&G 2365-03 / Unit 305 / LO3 / AC 3.5
 *   AC 3.5 — "Apply the protective device selection process end to end on a
 *             realistic mixed installation, demonstrating coordination of Ib,
 *             In, Iz, type, breaking capacity, RCD class, AFDD provision,
 *             SPD provision and design Zs"
 *
 * Layered depth: 2366-03 Unit 304 / AC 3.5; 5393-03 Unit 104 / AC 3.5
 *
 * The section landing — every Sub from 3.1 to 3.4 collides on one design.
 * Anchor scenario: domestic CU upgrade with EV charger, solar PV inverter
 * AC output and 8 kW air-source heat pump on a 1990s three-bedroom property.
 * Walk every circuit row from Ib through device, RCD, AFDD, SPD and design
 * Zs to a final consolidated schedule the L3 designer signs.
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

const TITLE = 'Protective device synthesis (3.5) | Level 3 Module 6.3.5 | Elec-Mate';
const DESCRIPTION =
  "Synthesis worked example — domestic CU upgrade with EV charger, solar PV and 8 kW air-source heat pump. Every circuit walked from Ib through device, RCD, AFDD, SPD and design Zs to a final consolidated schedule the L3 designer signs. The section landing for Section 3.";

const checks = [
  {
    id: 'syn-headline',
    question:
      "On the worked example, the headline consolidated MD on the heaviest phase after diversity is 78 A. The intake fuse offered by the DNO is 100 A BS 88-3. The L3 designer's next step is:",
    options: [
      "Submit the connection enquiry as-is — within standard.",
      "Confirm the design ultimate column (committed plus foreseeable future loads) does not exceed the 100 A intake. If ultimate is below 100 A with reasonable headroom, proceed; if approaching or exceeding, raise with the DNO for upgrade or load-management connection now while the CU is open.",
      "Reduce the load to fit.",
      "Pick a different DNO.",
    ],
    correctIndex: 1,
    explanation:
      "78 A current MD on a 100 A intake leaves modest headroom (22 percent). The discipline is to confirm the design ultimate column (current MD plus committed and foreseeable loads — second EV charger, attic conversion sockets, future workshop circuit) is also within 100 A with sensible margin (rule-of-thumb: under 85 percent of intake at design ultimate). If yes, proceed. If approaching 100 A, raise with the DNO for an upgrade now while the CU is being changed, rather than re-applying in two years when the trench is closed and the work is more disruptive.",
  },
  {
    id: 'syn-evrcd',
    question:
      "On the same worked example, the 7 kW EV charger circuit is on a TN-C-S supply. The RCD provision on the EV charger circuit must include:",
    options: [
      "Only a 30 mA Type AC RCD.",
      "30 mA Type B RCD or Type A RCD plus DC fault current monitoring as required by Reg 722.531.3.101 — either by the charger having internal Type B equivalent monitoring, or by an external Type B RCD on the dedicated circuit. EV chargers can produce smooth DC residual current that Type AC and Type A RCDs do not see correctly.",
      "Only a 100 mA Type AC RCD.",
      "No RCD required because the charger has its own internal protection.",
    ],
    correctIndex: 1,
    explanation:
      "Reg 722.531.3.101 requires that EV chargers be provided with RCD protection that responds correctly to all residual currents including smooth DC. This is achieved either by an external 30 mA Type B RCD on the dedicated circuit, or by the charger having internal Type B equivalent monitoring (RDC-DD = Residual Direct Current Detection Device per IEC 62752). Plain Type A or Type AC RCDs upstream do not see smooth DC residual currents and can be blinded by them. On TN-C-S supply the additional Reg 722.411.4.1 O-PEN protection requirement applies: either a charger with built-in O-PEN protection, or an earth-electrode arrangement to convert the circuit to TT-equivalent for the charger's protective conductor.",
  },
  {
    id: 'syn-zs',
    question:
      "On the worked example, the heat pump is on a 40 A Type C RCBO with 30 mA Type A RCD, 35 m run of 6 mm² T&E (2.5 mm² CPC) on TN-C-S Ze 0.35 ohms. Design Zs at the heat pump compressor terminals is approximately:",
    options: [
      "0.35 ohms.",
      "Zs = Ze + (R1 + R2 at 70 deg C) — R1 = 3.08 milliohm/m x 1.20 x 35 = 0.13 ohms; R2 = 7.41 milliohm/m x 1.20 x 35 = 0.31 ohms; Zs = 0.35 + 0.13 + 0.31 = 0.79 ohms. BS 7671:2018+A4:2026 Table 41.3 max Zs for Type C 40 A = 0.55 ohms — design Zs exceeds maximum, ADS via OPD does not work; rely on the 30 mA RCD for ADS, which is acceptable per Reg 411.4.205 / 411.4.4.",
      "0.43 ohms.",
      "1.37 ohms.",
    ],
    correctIndex: 1,
    explanation:
      "Worked Zs: Ze 0.35 + R1+R2 at 70 deg C 0.44 = 0.79 ohms. Table 41.3 max for Type C 40 A is approximately 0.43 ohms. Design Zs exceeds the OPD-based max — so ADS via the OPD's magnetic trip alone does not satisfy the disconnection time. The 30 mA RCD provides ADS within 40 ms at residual fault currents above its threshold, which satisfies Reg 411.3.2.2 disconnection times for socket-outlet circuits up to 63 A on a 230 V system. Document on the schedule that ADS is provided by the RCD function (not the OPD's magnetic trip) and confirm the RCD's operating characteristics meet Table 41.1 / Reg 411.3.2.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "The synthesis worked example demonstrates that good L3 design starts with:",
    options: [
      "Picking devices from a manufacturer catalogue.",
      "Reading the supply (TN type, declared Ze, PSCC, intake fuse), reading the brief (current loads, foreseeable future loads, customer constraints), then working circuit by circuit from Ib through device through Zs to a consolidated schedule.",
      "Drawing the cable schedule.",
      "Calculating voltage drop.",
    ],
    correctAnswer: 1,
    explanation:
      "The L3 design discipline is supply-first, brief-second, then per-circuit. Read the TN type because it propagates through every Zs calc and EV protection method downstream; read the PSCC because it sets the breaking capacity floor; read the intake fuse because it sets the consolidated MD ceiling. Read the brief — current loads, committed future loads, foreseeable future loads — so the schedule shows current MD plus design ultimate. Then work each circuit: Ib first, device second, RCD third, AFDD provision fourth, SPD provision at the board level, design Zs verified, voltage drop verified. Synthesis is the order of operations as much as the calc itself.",
  },
  {
    id: 2,
    question: "On the worked CU upgrade with EV charger, the protective device specification for the 7 kW EV circuit is:",
    options: [
      "Standard 32 A MCB.",
      "BS EN 61009-1 RCBO 32 A Type B 6 kA Icn 30 mA Type B (or Type A plus charger internal RDC-DD per IEC 62752 to comply with Reg 722.531.3.101); plus Reg 722.411.4.1 O-PEN protection (charger with built-in O-PEN protection or earth-electrode arrangement); plus Reg 421.1.7 AFDD discussion with customer (typically declined on dedicated EV with fixed flex).",
      "13 A FCU.",
      "BS 88 fuse.",
    ],
    correctAnswer: 1,
    explanation:
      "The full EV charger specification on a TN-C-S supply: 32 A RCBO Type B 6 kA Icn (matched to circuit), 30 mA Type B RCD or Type A plus charger RDC-DD per Reg 722.531.3.101 (smooth DC residual handling), plus O-PEN protection per Reg 722.411.4.1 (either built-in to the charger or via earth electrode arrangement). The AFDD discussion per Reg 421.1.7 typically lands at 'declined for dedicated EV with fixed flex' because the engineering benefit is modest on a single fixed appliance. Document each decision on the schedule.",
  },
  {
    id: 3,
    question: "On the worked example, the SPD specification for the new consumer unit is:",
    options: [
      "Type 1 SPD.",
      "Type 2 SPD at the consumer unit, supply-side of the main switch where possible, with 6 mm² copper PE to MET (Reg 534.4.10(a)), 2.5 mm² live connections (Reg 534.4.10(c)), conductor lengths under 0.5 m total (Reg 534.4.8), dedicated 25 A or 32 A MCB for SPD overcurrent protection, BS EN 61643 product standard.",
      "No SPD required.",
      "Type 3 plug-in only.",
    ],
    correctAnswer: 1,
    explanation:
      "Standard answer for a domestic CU upgrade without LPS: Type 2 SPD at the consumer unit. Reg 443 risk assessment outcome 'recommended' for most informed customer installations with sensitive electronics (router, NAS, AV). Type 1 only if the building has external LPS (BS EN 62305-3) or direct-strike supply risk. Specification follows Section 534 installation rules: short conductors, correct CSA, dedicated overcurrent protection, BS EN 61643 device.",
  },
  {
    id: 4,
    question: "On the worked example, the AFDD discussion with the customer concludes:",
    options: [
      "AFDDs mandatory on every circuit.",
      "AFDDs offered per Reg 421.1.7 advisory wording. Customer accepted on bedroom socket ring, lounge socket ring and kitchen socket ring (engineering benefit strongest on socket circuits with mixed appliance use and aged flex). Customer declined on dedicated single-load circuits (shower, EV, heat pump) and lighting (LED on fixed wiring, no flex). Documented in the design pack.",
      "AFDDs declined entirely.",
      "AFDDs not mentioned.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 421.1.7 is advisory — 'recommending' AFDDs in AC final circuits to mitigate fire risk. The L3 designer informs the customer, presents the engineering benefit (strongest on sleeping-area socket circuits and circuits with mixed flex / appliance use), presents the cost (3-5 x equivalent RCBO per AFDD-RCBO module), and lets the customer decide. The middle-ground specification — AFDD on socket circuits, conventional RCBO on dedicated single-load circuits — is the most common informed outcome. Documentation of the conversation is the L3 designer's protection.",
  },
  {
    id: 5,
    question: "Reg 433.1.1 (overcurrent coordination) on the worked heat pump circuit means:",
    options: [
      "The protective device rating must equal the design current exactly.",
      "The protective device rating In must be greater than or equal to the design current Ib (8 kW heat pump on 230 V at cos φ 0.95 = 36.6 A so In greater than or equal to 40 A) AND less than or equal to the cable Iz (6 mm² T&E in Reference Method C clipped direct = 47 A typically, derated by Cg / Ca / Ci to a lower Iz that must still be greater than or equal to In). So In = 40 A; Iz must be greater than or equal to 40 A; cable selected accordingly.",
      "The cable size determines the device rating.",
      "Diversity must be applied.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 433.1.1 sets Ib less than or equal to In less than or equal to Iz. For the heat pump worked example: Ib = 8000 / (230 x 0.95) = 36.6 A; In = 40 A (next standard rating above Ib); Iz must be greater than or equal to 40 A after derating. 6 mm² T&E Reference Method C tabulated It is around 47 A; with Cg = 1.0 (single circuit on the run), Ca = 1.0 (ambient 30 deg C), Ci = 1.0 (no insulation contact assumed), Iz = 47 A. 47 A greater than 40 A, so 6 mm² T&E is suitable. The chain Ib less than or equal to In less than or equal to Iz is the foundation of the design.",
  },
  {
    id: 6,
    question: "For the worked example shower circuit (9.5 kW at 230 V resistive), the L3 designer chooses:",
    options: [
      "32 A MCB and 4 mm² cable.",
      "RCBO 50 A Type B 6 kA Icn 30 mA Type A; 10 mm² T&E cable; Ib = 9500 / 230 = 41.3 A so In = 50 A (next standard rating); 10 mm² T&E Reference Method C tabulated It approximately 64 A so Iz greater than or equal to In comfortably; design max Zs Type B 50 A approximately 0.87 ohms per Table 41.3 A4:2026.",
      "63 A fuse and 16 mm² cable.",
      "16 A MCB and 1.5 mm² cable.",
    ],
    correctAnswer: 1,
    explanation:
      "Worked: Ib = 9500 / 230 = 41.3 A (resistive shower, no power factor term, no diversity on a dedicated single-load circuit). Next standard rating: 50 A. Cable selected for Iz greater than or equal to 50 A: 10 mm² T&E Reference Method C tabulated It around 64 A — comfortably suitable. Type B characteristic is fine for a resistive shower (no in-rush). 30 mA Type A RCD for additional protection. Design max Zs per Table 41.3 A4:2026 for Type B 50 A: approximately 0.87 ohms — comfortable on a typical Ze 0.35 ohms TN-C-S with a short cable run.",
  },
  {
    id: 7,
    question: "The design ultimate column on the worked example schedule includes:",
    options: [
      "Today's loads only.",
      "Today's loads (committed and installed) plus foreseeable future loads (planned EV second charger, possible attic conversion sockets and lighting, possible workshop circuit) — sized so the supply, intake, main switchgear and consumer unit busbars are sized for the ultimate while only today's circuits are commissioned.",
      "Worst-case load on every circuit.",
      "Average load over the year.",
    ],
    correctAnswer: 1,
    explanation:
      "Design ultimate is the L3 discipline that prevents 'rip-out two years later'. Today's loads sit in the current MD column; foreseeable future loads (committed and reasonably anticipated) sit in the design ultimate column. The supply, intake, main switchgear and consumer unit busbars are sized for the ultimate; today's circuits are commissioned and the schedule lists the spare ways for future addition. The DNO connection enquiry quotes the ultimate; the meter draws today's current. Saves the customer money over the life of the installation.",
  },
  {
    id: 8,
    question: "The L3 designer's signature on the design declaration for the worked example certifies:",
    options: [
      "That the install is complete.",
      "That the design — every Ib, every In, every Iz, every Zs, every RCD class, every AFDD decision, every SPD specification, the consolidated MD, the cable schedule, the device specification, the test schedule and the design pack documentation — complies with BS 7671 to the best of the designer's knowledge and belief, having exercised reasonable skill and care.",
      "That the customer is happy.",
      "That the cost is correct.",
    ],
    correctAnswer: 1,
    explanation:
      "The design declaration on the EIC is the moment the L3 designer accepts responsibility for the design. It is signed only when every calc is verified, every choice cited, every documentation gap closed. Signing without the calc is fraud; signing with the calc complete is the design product. The design declaration is independent of the construction declaration (signed by the installer for workmanship) and the inspection and testing declaration (signed by the inspector for verification). On a small CU upgrade the L3 designer may sign all three, but the signatures are still independent — three responsibilities, three certifications, on the face of one EIC.",
  },
];

const faqs = [
  {
    question: "How long does a synthesis design like this take in real practice?",
    answer:
      "For a typical domestic CU upgrade with EV charger, PV inverter and heat pump, a competent L3 designer takes typically 4-8 hours to produce the full design pack: site survey and supply assessment (1-2 hours), per-circuit calc and device selection (2-3 hours), consolidated schedule and supply enquiry (1 hour), AFDD and SPD discussion documentation and design risk register (1-2 hours), clean-up and pack production (1 hour). On a commercial fit-out with fifty circuits the pack scales to 2-5 days. The initial pack is typically iterated 2-3 times during the project as the brief evolves and the install raises practical questions. Design time is the L3 designer's billable activity — typically charged at design-rate (higher than install-rate) and quoted up front so the customer knows what they are paying for.",
  },
  {
    question: "What software tools support synthesis design at this level?",
    answer:
      "Tysoft Easycert and Cadmium Pro are the dominant UK packages for residential and small commercial design and certification. Both produce cable schedules, EICs, EICRs and minor works certificates with built-in cable calc engines, device libraries and Table 41.3 / 41.4 verification. ETAP and Amtech are used on larger commercial / industrial design where load flow and short-circuit analysis matter. Spreadsheet-based design (Excel templates from the IET, NICEIC member resources) remains common on smaller jobs. Whatever the tool, the synthesis is the same: read supply, calculate Ib per circuit, select device, verify Zs, document. The software automates the table look-ups; it does not substitute for the designer's engineering judgement on type / characteristic / cascade decisions.",
  },
  {
    question: "What if my customer wants to change the brief mid-design?",
    answer:
      "Versioned design pack. Issue Rev A as the original design; if the brief changes (customer wants a second EV charger, drops the heat pump, adds an outdoor cabin) re-run the affected calcs and issue Rev B with a clear change note on the cover. Older revisions stay in the pack archive but are clearly superseded. The current revision is what the installer builds to and the inspector verifies against. Design fees should reflect the revision count — most contracts allow one or two revisions in the base fee; further changes are billed as variations. The discipline of versioning prevents the most common install-stage problem: 'which version of the schedule are we working from?'",
  },
  {
    question: "How do I price this kind of design work?",
    answer:
      "Charge for design as a separate line item from install. Design rates vary regionally and by experience but typical UK domestic L3 design rates as of 2026 are £80-£150 per hour plus per-pack setup. A typical domestic CU + EV + PV + heat pump synthesis design pack lands in the £400-£900 range as a stand-alone deliverable. Some L3 designers absorb the design fee into the install package on small jobs (avoiding the customer-facing line item) and charge it separately on larger or design-only jobs. The discipline matters: design takes hours, requires PI insurance, and produces a deliverable the customer can take to another installer if they choose. Pricing it transparently makes that visible.",
  },
  {
    question: "What is the most common synthesis-design error you see in periodic inspection?",
    answer:
      "Two consistent issues. First, missing or vague design pack — schedule rows that say 'MCB 32 A' rather than the full specification, no consolidated MD calc, no Section 443 SPD assessment, no AFDD discussion record. The install may work but the documentation will not stand up to a future inspector. Second, supply assumption errors — TN type guessed rather than confirmed, declared Ze used for design but not verified at install, EV charger O-PEN protection assumed rather than specified. These compound: a design without a clear supply assumption is a design where Zs cannot be verified at handover and ADS may be marginal at the end of long radial runs. The cure for both is the synthesis discipline: supply-first, per-circuit, documented, signed.",
  },
  {
    question: "How does the synthesis design connect to the AM2 / AM2E end-point assessment?",
    answer:
      "The AM2 end-point assessment asks the apprentice to perform an installation and a periodic inspection of an existing installation, both on a constructed test rig. The synthesis design from this Sub maps onto: the EIC produced as part of the AM2 installation portion (the apprentice signs the design declaration on the rig they installed); the EICR coding of an existing installation that may have non-current AFDD / SPD / Type-A RCD provision (the apprentice codes the findings consistent with current BS 7671 wording); the practical 'design defence' conversation where the assessor probes the apprentice's reasoning behind device selection, RCD class, Zs verification and so on. The AM2E (electrotechnical end-point assessment) for L3 apprentices runs along similar lines with greater design depth. Practising the synthesis on real briefs (or training-rig briefs) is the most useful AM2 / AM2E preparation.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 5"
            title="Protective device synthesis — domestic CU upgrade worked example"
            description="The Section 3 landing. Every Sub from 3.1 to 3.4 collides on one design. Anchor scenario: domestic CU upgrade with EV charger, solar PV inverter AC output and 8 kW air-source heat pump on a 1990s three-bedroom property. Walk every circuit row from Ib through device, RCD, AFDD, SPD and design Zs to a consolidated schedule the L3 designer signs."
            tone="amber"
          />

          <TLDR
            points={[
              "L3 design is supply-first, brief-second, per-circuit third. Read the TN type, declared Ze, PSCC and intake fuse before touching any per-circuit calc — they propagate through every later decision.",
              "Each final circuit walks the chain: Ib (from load + power factor + diversity); In (next standard rating above Ib); Iz (cable selected so Iz greater than or equal to In after derate); device type / characteristic / Icn; RCD class; AFDD decision; design Zs verified against Table 41.3 A4:2026.",
              "Section / installation level: SPD assessment per Section 443; consolidated MD per phase; design ultimate column for foreseeable future loads; signed design declaration on the EIC. Design without documentation is not finished.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Synthesise a complete protective device specification end-to-end on a realistic mixed-load installation, demonstrating coordination of Ib, In, Iz, device type, RCD class, AFDD provision, SPD provision and design Zs.",
              "Apply BS 7671 A4:2026 Table 41.3 max Zs values (including B32 = 1.37 ohms) at design stage and identify when ADS via OPD must be supplemented or replaced by ADS via RCD operation.",
              "Apply Section 443 SPD risk assessment to an installation with no mandatory triggers and document the recommendation outcome in the design pack.",
              "Apply Reg 421.1.7 AFDD recommendation as a customer conversation and a design decision, documenting the outcome on the schedule.",
              "Specify EV charger protection per Reg 722.531.3.101 (Type B RCD or Type A + RDC-DD) and Reg 722.411.4.1 (O-PEN protection on TN-C-S supply).",
              "Produce the consolidated schedule, design ultimate column and signed design declaration that satisfy Reg 311.1, Reg 132.13 and the L3 designer's professional duty.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The brief — the anchor scenario"
            plainEnglish="Same brief used in Subs 3.1 to 3.4. 1990s three-bedroom property, owner-occupier. New consumer unit; new EV charger; new PV; new heat pump replacing the gas boiler."
            onSite="This is the most common L3 synthesis brief in 2026 UK domestic — and the one most likely to land on your desk this month."
          >
            <p>
              Site survey output:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Property: 1990s three-bedroom semi-detached house, suburban location, no external lightning protection system.</li>
              <li>Supply: 100 A TN-C-S (PME) single-phase, declared Ze 0.35 ohms, declared PSCC 16 kA at intake. Intake cut-out: BS 88-3 100 A.</li>
              <li>Existing CU: 17th edition split-load board, 6-way + 8-way RCD-protected, mix of MCBs and one RCBO. Five circuits in service.</li>
              <li>New circuits required: 9.5 kW electric shower (replacing 7.5 kW unit), 7 kW EV charger on dedicated dedicated radial, 4 kWp solar PV inverter AC output, 8 kW air-source heat pump replacing gas boiler, plus rewiring of two existing circuits to RCBO standard.</li>
              <li>Customer: owner-occupier, no Building Safety Act 2022 applicability, no insurer requirement above standard. Has connected sensitive electronics (NAS / server, multi-room AV, smart-home controllers).</li>
              <li>Foreseeable future: second EV charger if a household member changes to EV in 2-3 years; loft conversion sockets and lighting in 5 years.</li>
            </ul>
            <p>
              Brief deliverable: full design pack including consolidated load schedule with current
              MD and design ultimate, single-line diagram, cable schedule with full per-circuit
              specification (Ib through Zs), AFDD and SPD discussion record, signed design
              declaration ready for inclusion on the EIC at handover.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                Reg 132.16 is why this synthesis has to land as a permanent design product. The
                consolidated schedule, the per-circuit specification, the AFDD discussion record,
                the SPD assessment record and the signed design declaration are how the next
                designer discharges their Reg 132.16 duty when an addition or alteration is
                proposed — they need the rating and condition data the original designer
                recorded. A future periodic inspector verifies the install against the design
                pack. Without it, every modification is a guess and every periodic inspection is
                incomplete.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 — full text from published amendment."
          />

          <SectionRule />

          <ContentEyebrow>The supply-first read</ContentEyebrow>

          <ConceptBlock
            title="Reading the supply before any per-circuit calc"
            plainEnglish="TN type, declared Ze, PSCC, intake fuse. Four parameters that propagate through every later decision."
          >
            <p>
              On the worked brief:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S (PME)</strong> — drives main earthing conductor minimum 16 mm²
                copper for a 100 A supply (Table 54.7), main bonding minimum 10 mm² copper to gas
                / water (Table 54.8), EV charger O-PEN protection requirement per Reg 722.411.4.1,
                A4:2026 PNB (Protective Neutral Bonding) considerations and metal water service
                interaction.
              </li>
              <li>
                <strong>Ze = 0.35 ohms (declared)</strong> — the starting point for every Zs calc
                downstream. Verified at install by measurement at the origin (typical measured Ze
                on a healthy TN-C-S supply is 0.20-0.30 ohms — the declared 0.35 is conservative).
              </li>
              <li>
                <strong>PSCC = 16 kA at intake</strong> — drives the breaking capacity floor for
                downstream protective devices. With cascade through the BS 88-3 100 A intake fuse,
                PSCC at the consumer unit busbar will be substantially lower (typically 1-3 kA on a
                domestic CU) — 6 kA Icn BS EN 60898 / 61009-1 devices are sufficient. Document the
                cascade assumption on the schedule.
              </li>
              <li>
                <strong>Intake fuse 100 A BS 88-3</strong> — sets the consolidated MD ceiling (the
                installation cannot draw more than 100 A continuously without blowing the intake).
                Headroom check: current MD plus design ultimate must remain below 100 A with
                margin (rule-of-thumb: under 85 percent of intake at design ultimate = 85 A
                headroom).
              </li>
            </ul>
            <p>
              These four parameters go on the cover sheet of the design pack, prominently. Every
              per-circuit calc downstream assumes them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Per-circuit synthesis — the new circuits</ContentEyebrow>

          <ConceptBlock
            title="Circuit 1 — Electric shower 9.5 kW"
            plainEnglish="Resistive single-load. Standard CU upgrade circuit. Walks the chain in 30 seconds once you know the brief."
          >
            <p>
              Step-by-step:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ib</strong>: 9500 / 230 = 41.3 A (resistive, no power factor term, no diversity on a dedicated single-load circuit).</li>
              <li><strong>In</strong>: next standard rating above Ib = 50 A.</li>
              <li><strong>Cable</strong>: 10 mm² T&E, Reference Method C (clipped direct in airing cupboard / loft route), tabulated It approximately 64 A. Cg = 1.0 (single circuit), Ca = 1.0 (typical 30 deg C ambient), Ci = 1.0 (no insulation contact). Iz = 64 A. 64 greater than 50 = OK. Reg 433.1.1 satisfied.</li>
              <li><strong>Device</strong>: BS EN 61009-1 RCBO 50 A Type B 6 kA Icn 30 mA Type A. Type B fine for resistive shower (no in-rush). Type A RCD covers AC plus pulsating DC (modern minimum).</li>
              <li><strong>Zs design</strong>: 18 m run (loft route to bathroom). R1 (10 mm²) at 70 deg C = 1.83 milliohm/m x 1.20 x 18 = 0.040 ohms. R2 (4 mm² CPC in 10 mm² T&E) at 70 deg C = 4.61 milliohm/m x 1.20 x 18 = 0.100 ohms. Zs = 0.35 + 0.040 + 0.100 = 0.49 ohms. Table 41.3 max for Type B 50 A = approx 0.87 ohms. Zs design = 0.49 ohms, well under max. ADS via OPD verified.</li>
              <li><strong>AFDD</strong>: declined per customer choice (dedicated fixed-flex appliance, modest engineering benefit). Documented.</li>
              <li><strong>Voltage drop</strong>: 9500 W at 41.3 A through 18 m of 10 mm² T&E. Vd = 41.3 x 18 x 4.4 milliohm/m / 1000 = 3.27 V = 1.42 percent. Reg 525 limit for fixed equipment 5 percent. Comfortably within.</li>
            </ul>
            <p>
              Schedule row: <code>RCBO 50 A Type B 6 kA Icn 30 mA Type A | BS EN 61009-1 |
              10 mm² T&E 18 m Reference Method C | Zs design 0.49 ohms | Vd 1.4 percent |
              AFDD declined per customer</code>.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Circuit 2 — EV charger 7 kW (TN-C-S)"
            plainEnglish="Dedicated single-load with specific protection requirements per Reg 722. The most regulated circuit on the board."
          >
            <p>
              Step-by-step:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ib</strong>: 7000 / 230 = 30.4 A (charger near-unity power factor at full charge, dedicated continuous load, no diversity).</li>
              <li><strong>In</strong>: 32 A.</li>
              <li><strong>Cable</strong>: 6 mm² T&E or 4 mm² 6242Y SWA (route-dependent — outdoor SWA preferred for the driveway run), Reference Method C / D. 6 mm² T&E tabulated It approximately 47 A; 4 mm² 6242Y SWA buried direct approximately 42 A. Either OK for Iz greater than or equal to In = 32 A. Continuous-rated load — use full Iz value, not derated for cyclic.</li>
              <li><strong>Device</strong>: BS EN 61009-1 RCBO 32 A Type B 6 kA Icn 30 mA Type B (Type B RCD per Reg 722.531.3.101 for smooth DC residual handling, OR Type A RCBO if the charger has internal RDC-DD per IEC 62752). Most modern compliant chargers have RDC-DD built in, allowing Type A upstream — confirm with charger datasheet on the schedule.</li>
              <li><strong>O-PEN protection per Reg 722.411.4.1</strong>: confirmed on charger datasheet (built-in O-PEN protection module) OR provided by external earth-electrode arrangement converting the charger PE to TT-equivalent. Specify the chosen method on the schedule.</li>
              <li><strong>Zs design</strong>: 22 m run (route from CU through wall to driveway). R1 (6 mm²) at 70 deg C = 3.08 milliohm/m x 1.20 x 22 = 0.081 ohms. R2 (2.5 mm² CPC in 6 mm² T&E) at 70 deg C = 7.41 milliohm/m x 1.20 x 22 = 0.196 ohms. Zs = 0.35 + 0.081 + 0.196 = 0.63 ohms. Table 41.3 max for Type B 32 A on A4:2026 = 1.37 ohms. Zs design = 0.63 ohms, well under max. ADS via OPD verified.</li>
              <li><strong>AFDD</strong>: declined per customer choice (dedicated fixed-flex EV, modest engineering benefit). Documented.</li>
              <li><strong>Voltage drop</strong>: 30.4 A through 22 m of 6 mm² T&E. Vd = 30.4 x 22 x 7.3 milliohm/m / 1000 = 4.88 V = 2.12 percent. Reg 525 limit for socket-outlet circuit 3 percent (or fixed equipment 5 percent — argue EV charger is fixed equipment for Vd category). Within limit.</li>
            </ul>
            <p>
              Schedule row: <code>RCBO 32 A Type B 6 kA Icn 30 mA Type A (charger has RDC-DD per
              IEC 62752 datasheet ref X) | BS EN 61009-1 + Reg 722.531.3.101 | 6 mm² T&E 22 m
              Reference Method C | Zs design 0.63 ohms | Vd 2.1 percent | O-PEN protection
              built into charger per Reg 722.411.4.1 (datasheet) | AFDD declined per customer</code>.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Circuit 3 — PV inverter AC output 4 kWp"
            plainEnglish="PV is generation, not load. The circuit feeds into the consumer unit busbar; the protective device protects against fault back-feed."
          >
            <p>
              Step-by-step:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ib</strong>: peak inverter AC output current at full PV generation. 4 kWp inverter rated approximately 4 kW AC output (1:1 sizing typical for residential), single-phase 230 V. Ib = 4000 / 230 = 17.4 A. Many inverters rate at slightly higher peak (4.6 kVA briefly during edge-of-cloud events) — design to the manufacturer's stated continuous AC current, typically 18-20 A on a 4 kWp inverter.</li>
              <li><strong>In</strong>: 25 A or 32 A. Rounding up beyond Ib gives the inverter overcurrent margin without nuisance trip during peak generation.</li>
              <li><strong>Cable</strong>: 4 mm² T&E (route from inverter location in loft to CU), Reference Method C, tabulated It approx 35 A. Iz = 35 A greater than In = 25 A. OK.</li>
              <li><strong>Device</strong>: BS EN 61009-1 RCBO 25 A Type B 6 kA Icn 30 mA Type A (Type A RCD covers AC plus pulsating DC; PV inverters are tested for residual current characteristic compatible with Type A on the AC side). G99 / G100 grid-connection requirements apply at the inverter side, not the protective device side.</li>
              <li><strong>Zs design</strong>: 8 m run (loft to CU). R1 (4 mm²) at 70 deg C = 4.61 milliohm/m x 1.20 x 8 = 0.044 ohms. R2 (1.5 mm² CPC in 4 mm² T&E) at 70 deg C = 12.10 milliohm/m x 1.20 x 8 = 0.116 ohms. Zs = 0.35 + 0.044 + 0.116 = 0.51 ohms. Table 41.3 max for Type B 25 A = approx 1.74 ohms. Zs design = 0.51 ohms, well under max.</li>
              <li><strong>AFDD</strong>: declined per customer choice (dedicated fixed-flex inverter circuit). Documented.</li>
              <li><strong>Labelling</strong>: PV warning labels per BS 7671 Section 712 / Reg 712.514 — at the consumer unit, at the inverter, at the meter, at the AC isolator. Two-source warning ('isolate both supply and inverter before working').</li>
            </ul>
            <p>
              Schedule row: <code>RCBO 25 A Type B 6 kA Icn 30 mA Type A | BS EN 61009-1 |
              4 mm² T&E 8 m Reference Method C | Zs design 0.51 ohms | Section 712 PV labelling
              required at CU + inverter + meter + AC isolator | G99 / G100 grid notification
              by inverter installer</code>.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Circuit 4 — Air-source heat pump 8 kW"
            plainEnglish="Inductive load with compressor in-rush. Power factor and starting transient enter the calc."
          >
            <p>
              Step-by-step:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ib</strong>: 8 kW air-source heat pump, single-phase 230 V, manufacturer datasheet cos φ = 0.95 at full load. Ib = 8000 / (230 x 0.95) = 36.6 A.</li>
              <li><strong>In</strong>: 40 A.</li>
              <li><strong>Cable</strong>: 6 mm² T&E, Reference Method C, tabulated It approximately 47 A. Iz = 47 A greater than In = 40 A. OK.</li>
              <li><strong>Device</strong>: BS EN 61009-1 RCBO 40 A Type C 6 kA Icn 30 mA Type A. Type C handles compressor inrush (typically 4-6 x FLC for several cycles on DOL start; modern heat pumps with soft-start or VSD reduce this). Type A RCD acceptable for compressor circuits without inverter drives; if heat pump uses an inverter compressor (most modern units), check whether Type F is needed for mixed-frequency residual.</li>
              <li><strong>Zs design</strong>: 35 m run (route from CU through ground floor to outdoor unit). R1 (6 mm²) at 70 deg C = 3.08 milliohm/m x 1.20 x 35 = 0.129 ohms. R2 (2.5 mm² CPC in 6 mm² T&E) at 70 deg C = 7.41 milliohm/m x 1.20 x 35 = 0.311 ohms. Zs = 0.35 + 0.129 + 0.311 = 0.79 ohms. Table 41.3 max for Type C 40 A = approx 0.43 ohms. Zs design = 0.79 ohms — EXCEEDS Table 41.3 max for Type C 40 A. ADS via OPD does not satisfy disconnection time. Rely on 30 mA RCD for ADS — RCD operates within 40 ms at 5 x I delta n, satisfies Reg 411.3.2.2 disconnection time. Document on schedule that ADS is via RCD function not OPD magnetic trip.</li>
              <li><strong>AFDD</strong>: declined per customer choice (dedicated fixed-flex heat pump). Documented.</li>
              <li><strong>Voltage drop</strong>: 36.6 A through 35 m of 6 mm² T&E. Vd = 36.6 x 35 x 7.3 milliohm/m / 1000 = 9.35 V = 4.07 percent. Reg 525 limit for fixed equipment 5 percent. Within limit.</li>
            </ul>
            <p>
              Schedule row: <code>RCBO 40 A Type C 6 kA Icn 30 mA Type A | BS EN 61009-1 |
              6 mm² T&E 35 m Reference Method C | Zs design 0.79 ohms (exceeds Table 41.3
              max for OPD; ADS via RCD function per Reg 411.4.205) | Vd 4.1 percent | AFDD
              declined per customer</code>.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.2 (Final circuits in scope of Table 41.1)"
            clause="The maximum disconnection times in Table 41.1 shall apply to: (i) final circuits rated up to and including 63 A where the circuit includes one or more socket-outlets; (ii) final circuits rated up to and including 32 A where the circuit supplies only fixed connected current-using equipment."
            meaning={
              <>
                Reg 411.3.1.2 sets the scope for the strict 0.4 s disconnection time on a 230 V
                system. For socket-outlet final circuits up to 63 A, the disconnection time is
                0.4 s; for fixed-equipment circuits up to 32 A, the same 0.4 s applies. For
                circuits above these ratings (40 A heat pump in our worked example, 50 A shower)
                the 5 s disconnection time of Reg 411.3.2.3 applies (distribution and fixed
                equipment circuits at higher ratings). Either way, ADS is required — by OPD where
                Zs is low enough, or by 30 mA RCD where Zs exceeds the OPD's max Zs but RCD
                additional protection achieves the disconnection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.2 and Table 41.1."
          />

          <SectionRule />

          <ContentEyebrow>Existing circuits — re-protect to RCBO standard</ContentEyebrow>

          <ConceptBlock
            title="Re-protecting the existing circuits"
            plainEnglish="When changing the consumer unit, all final circuits get re-protected. Existing 17th edition split-load board upgrade to all-RCBO is the modern standard."
          >
            <p>
              The five existing circuits brought onto the new CU:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting downstairs — 6 A RCBO Type B 30 mA Type A (existing 1.5 mm² T&E loop, design Zs verified at 1.95 ohms vs Table 41.3 Type B 6 A max 7.28 ohms — comfortable).</li>
              <li>Lighting upstairs — 6 A RCBO Type B 30 mA Type A (existing 1.5 mm² T&E loop).</li>
              <li>Sockets ring (downstairs) — 32 A RCBO Type B 30 mA Type A (existing 2.5 mm² T&E ring, Zs design 0.79 ohms vs Type B 32 A max 1.37 ohms — comfortable).</li>
              <li>Sockets ring (upstairs / bedrooms) — 32 A RCBO Type B 30 mA Type A (same).</li>
              <li>Cooker — 32 A RCBO Type B 30 mA Type A (existing 6 mm² T&E radial to cooker connection unit).</li>
            </ul>
            <p>
              On the AFDD discussion: customer accepted AFDD-RCBO upgrade on the bedroom socket
              ring (sleeping accommodation, mixed-age flex, occasional charger / lamp use) and on
              the downstairs socket ring (lounge / kitchen mixed appliance use, regular plug
              cycles). Customer declined on lighting (LED on fixed wiring) and on cooker
              (dedicated fixed-flex single-load). Schedule shows 'AFDD-RCBO 32 A' on the two
              accepted circuits, plain 'RCBO 32 A' on the rest, with a customer-decision note
              against each.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Board-level — SPD and consolidated MD</ContentEyebrow>

          <ConceptBlock
            title="SPD specification per Section 443"
            plainEnglish="Apply the risk assessment. No mandatory triggers; risk assessment outcome 'recommended' for owner with sensitive electronics. Type 2 SPD at the consumer unit."
          >
            <p>
              Section 443 assessment for the worked brief:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reg 443.4(a) risk to life — N/A (no life-safety circuits or vulnerable occupants documented).</li>
              <li>Reg 443.4(b) public services / cultural heritage — N/A.</li>
              <li>Reg 443.4(c) commercial / industrial activity — N/A (residential).</li>
              <li>Reg 443.4(d) large numbers of co-located individuals — N/A.</li>
              <li>Risk assessment for residual case — owner has connected sensitive electronics (NAS, AV, smart home); cost of replacement equipment in event of strike-near-miss substantial; supply-network induced surges plausible in the suburban location. Outcome: protection recommended.</li>
            </ul>
            <p>
              SPD specification:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Type 2 SPD at the consumer unit, supply-side of the main switch.</li>
              <li>Manufacturer's CU-integrated SPD module (DIN-rail mounted, dedicated location).</li>
              <li>BS EN 61643 product standard.</li>
              <li>Uc per pole 275 V (TN-C-S 230 V supply).</li>
              <li>In 20 kA, Imax 40 kA, Up 1.4 kV (Category II equipment protection).</li>
              <li>Dedicated 32 A MCB for SPD overcurrent protection (per SPD manufacturer's specification).</li>
              <li>6 mm² copper protective conductor SPD-to-MET (Reg 534.4.10(a)).</li>
              <li>2.5 mm² copper live connection (Reg 534.4.10(c)) rated for prospective short-circuit at the consumer unit busbar.</li>
              <li>Conductor lengths kept under 0.5 m total combined (Reg 534.4.8).</li>
            </ul>
            <p>
              Customer accepted the Type 2 SPD specification (modest cost of around £150-£200
              installed, real protection benefit for connected sensitive electronics). For the
              AV cluster downstream a Type 3 plug-in surge strip is recommended at install — not
              part of the fixed installation but supplied to the customer with the handover pack.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Consolidated MD and design ultimate"
            plainEnglish="Sum the per-circuit Ib values with installation-level diversity to derive the headline MD; add the design ultimate column for foreseeable future loads."
          >
            <p>
              Current MD (after diversity, single-phase 100 A intake):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Shower 41 A x 100 percent (largest single load) = 41 A.</li>
              <li>Cooker — 30 percent of remainder of cooking allowance = approximately 5 A contribution.</li>
              <li>EV charger 30 A x 100 percent (continuous evening charge) = 30 A. (Concurrent with shower? Statistically unlikely — but design conservatively for off-peak EV plus morning shower scenario, both run.)</li>
              <li>Heat pump 37 A x 60 percent diversity (compressor cycling) = 22 A.</li>
              <li>PV inverter — generation, not load. -18 A peak generation during sunny hours, but design supply for zero PV (worst case grid-supplied).</li>
              <li>Lighting + sockets + small power — 2 kW assessed = 9 A.</li>
              <li>Total current MD: approximately 41 + 5 + 30 + 22 + 9 = 107 A worst case all-on. With diversity between major loads (shower not concurrent with EV and heat pump compressor in practice): heading MD assessed at 78 A.</li>
            </ul>
            <p>
              Design ultimate (current plus foreseeable):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Current MD: 78 A.</li>
              <li>Plus foreseeable second EV charger (3-year horizon): +30 A peak; with EV-EV diversity (one charging at a time on a residential): +15 A average.</li>
              <li>Plus foreseeable loft conversion sockets and lighting (5-year horizon): +5 A.</li>
              <li>Design ultimate: approximately 98 A.</li>
            </ul>
            <p>
              Design ultimate at 98 A is uncomfortably close to the 100 A intake fuse. The L3
              designer has two options to surface to the customer:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Accept the design as-is and note that adding the second EV charger in 2-3 years may require a DNO supply upgrade at that time. Disruption cost when the time comes.</li>
              <li>Pre-emptively engage with the DNO now to confirm the supply can be upgraded to a 100 A or load-management connection later, or to upgrade now while the work is open. Decision is the customer's, informed by the L3 designer's assessment.</li>
            </ul>
            <p>
              Document the conversation. Whichever the customer decides, the schedule shows
              current MD 78 A, design ultimate 98 A, and the supply-upgrade decision noted on the
              cover.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Designing each circuit in isolation without checking the consolidated MD against the intake"
            whatHappens={
              <>
                You design the shower at 50 A, the EV at 32 A, the heat pump at 40 A, the
                rest standard. Each circuit verifies as compliant in isolation. You go to handover.
                On a winter Saturday morning the customer runs shower, heat pump and EV charger
                concurrently and the 100 A intake fuse blows. The customer phones at 8 a.m.
                bewildered. The diagnosis takes you a day; the cure (load management or DNO
                upgrade) takes weeks. The whole project sits under question.
              </>
            }
            doInstead={
              <>
                Always sum per-circuit Ib values with installation-level diversity to derive the
                consolidated MD, and check it against the intake fuse with sensible margin.
                Surface the result to the customer at design stage so the supply-upgrade
                conversation happens before commissioning, not after a Saturday morning blackout.
                The consolidated schedule is not optional decoration — it is the artefact that
                prevents the most common synthesis-design failure.
              </>
            }
          />

          <CommonMistake
            title="Forgetting to apply Reg 722.531.3.101 Type B RCD on the EV charger circuit"
            whatHappens={
              <>
                You spec a standard Type A 30 mA RCBO on the EV charger circuit, on the
                assumption that 'an EV is just another appliance'. The charger does not have
                internal RDC-DD per IEC 62752 (some lower-cost units do not). On a fault that
                produces smooth DC residual current the Type A RCD does not see it correctly and
                may be blinded — the protection is not what the regulations require. The
                installation does not pass periodic inspection at next assessment; the customer
                is unhappy.
              </>
            }
            doInstead={
              <>
                On every EV charger circuit, apply Reg 722.531.3.101: either a 30 mA Type B RCD
                in the dedicated circuit, OR confirmed RDC-DD per IEC 62752 built into the
                charger (with manufacturer datasheet evidence on the schedule). On TN-C-S supply,
                also apply Reg 722.411.4.1 O-PEN protection — confirmed by charger datasheet or
                by an external earth-electrode arrangement. Document both decisions on the
                schedule and check both at install. EV protection is a regulated speciality, not
                a generic socket circuit.
              </>
            }
          />

          <Scenario
            title="The synthesis design pack as the L3 designer's professional product"
            situation={
              <>
                You finish the synthesis design pack for the worked brief. It contains: cover
                sheet with supply parameters, headline MD and design ultimate, signed and dated;
                consolidated load schedule with per-circuit Ib, In, Iz, device specification,
                Zs design, RCD class, AFDD decision and customer notes; single-line diagram of
                the new consumer unit and all final circuits; cable schedule with route lengths,
                Reference Methods, derate factors and final selected sizes; Section 443 SPD risk
                assessment with outcome and SPD specification; AFDD discussion record per
                circuit; design risk register per CDM 2015; full device specifications with
                manufacturer / part numbers; pre-handover test schedule with expected values.
              </>
            }
            whatToDo={
              <>
                Review the pack against your design checklist. Sign the design declaration at
                the end. Issue Rev A to the installer (who will build to it) and to yourself
                (master copy retained for the design life of the installation). Walk the
                installer through any non-obvious decisions in person or on a phone call.
                Brief the customer on what they have bought — the AFDD circuits, the SPD, the
                EV protection scheme, the design ultimate headroom — and leave them with a
                customer-facing summary as part of the handover pack. Keep the master copy in
                the project file and in your professional indemnity records.
              </>
            }
            whyItMatters={
              <>
                The synthesis design pack is the L3 designer's professional product. It is the
                evidence of competent design under BS 7671 Reg 132 and Reg 132.13; it is the
                spec the installer builds to under Reg 134.1.1; it is the verification reference
                for the inspector under Part 6; it is the document a future periodic inspector
                or extension designer reads when they take on the installation; it is the record
                that supports a professional indemnity claim if anything goes wrong. The pack
                is not the design done; the pack is the design product. A design without the
                pack is not finished.
              </>
            }
          />

          <ConceptBlock
            title="Checklist before signing the design declaration"
            plainEnglish="Final review before the signature. If any answer is 'no' or 'unsure', do not sign — fix and re-review."
          >
            <p>
              Pre-sign checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply parameters (TN type, Ze, PSCC, intake fuse) on the cover sheet, sourced from declaration or measurement.</li>
              <li>Per-circuit Ib calculated and visible against each row.</li>
              <li>Reg 433.1.1 Ib less than or equal to In less than or equal to Iz verified per circuit.</li>
              <li>Cable Reference Method, derate stack and Iz visible per row.</li>
              <li>Device type / characteristic / rating / breaking capacity / RCD class specified per row, with manufacturer / part number where required.</li>
              <li>Design Zs calculated per row and compared to Table 41.3 A4:2026 max for the chosen device. Where exceeded, ADS via RCD documented.</li>
              <li>Voltage drop verified per circuit against Reg 525 limit (3 percent socket-outlet, 5 percent fixed equipment).</li>
              <li>Reg 421.1.7 AFDD discussion documented per circuit (or as a board-level note).</li>
              <li>Section 443 SPD risk assessment documented; SPD specified or omission justified.</li>
              <li>EV charger circuit (where present) Reg 722.531.3.101 RCD class and Reg 722.411.4.1 O-PEN protection specified.</li>
              <li>Consolidated MD and design ultimate calculated and visible on cover sheet; consistent with intake fuse.</li>
              <li>Design risk register per CDM 2015 in pack.</li>
              <li>Single-line diagram, cable schedule, test schedule complete.</li>
              <li>Customer-facing summary written.</li>
              <li>Designer name, qualifications, position and date complete on declaration block.</li>
            </ul>
            <p>
              Once every box is ticked, sign. Issue Rev A. Move to construction.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (design objectives)"
            clause={
              <>
                The electrical installation shall be designed by one or more skilled persons to
                provide for: (a) the protection of persons, livestock and property in
                accordance with Section 131; and (b) the proper functioning of the electrical
                installation for the intended use.
              </>
            }
            meaning={
              <>
                The design closure decision — sign-off — rests with the &quot;skilled
                persons&quot; named in Reg 132.1 as the designer of record. The closure is not
                administrative; it is a regulatory commitment that the design satisfies the
                two converging objectives (safety per Section 131, function per the brief).
                Apprentices support the closure but the designer signs.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "L3 design is supply-first, brief-second, per-circuit third. Read the TN type, declared Ze, PSCC and intake fuse before touching any per-circuit calc; they propagate through every later decision.",
              "Each final circuit walks the chain: Ib → In → Iz → device type / characteristic / breaking capacity → RCD class → AFDD decision → design Zs verified against Table 41.3 A4:2026 max for the chosen device.",
              "On the worked CU upgrade: shower 50 A Type B (Zs 0.49 ohms vs max 0.87 ohms = OK); EV 32 A Type B with Type B RCD or Type A + RDC-DD per Reg 722.531.3.101 plus O-PEN protection per Reg 722.411.4.1; PV 25 A Type B; heat pump 40 A Type C with ADS via RCD where Zs exceeds OPD max.",
              "Section 443 SPD risk assessment for the residual case (no Reg 443.4(a)-(d) trigger) — outcome 'recommended' for owner with sensitive electronics. Type 2 SPD at the CU per BS EN 61643, supply-side of main switch, conductors per Reg 534.4.10 and Reg 534.4.8.",
              "Reg 421.1.7 AFDD per-circuit conversation with customer — documented decision per circuit. Engineering benefit strongest on socket circuits in sleeping accommodation; modest on dedicated fixed-flex single-load circuits.",
              "Consolidated MD and design ultimate on the cover sheet. If design ultimate approaches the intake fuse rating, raise DNO supply upgrade at design stage rather than at handover plus 2 years.",
              "Reg 132.13 documentation is part of the design product. Cover sheet, schedule, single-line, cable schedule, SPD assessment, AFDD record, risk register, device specs, test schedule, customer summary — all required.",
              "The signed design declaration is the moment the L3 designer accepts responsibility. Pre-sign checklist before the signature; never sign a design declaration on a design that is not your own complete work.",
            ]}
          />

          <Quiz title="Synthesis worked example — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 SPD selection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section landing <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Protective devices
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
