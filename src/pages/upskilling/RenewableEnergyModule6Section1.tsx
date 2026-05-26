import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s1-section-722-scope',
    question:
      'Section 722 of BS 7671 covers which circuits?',
    options: [
      'All electrical installations in dwellings',
      'Circuits intended to supply electric vehicles for charging purposes — and any associated protective arrangements',
      'Only public-charging infrastructure',
      'Only DC fast chargers',
    ],
    correctIndex: 1,
    explanation:
      'Section 722 of BS 7671:2018+A4:2026 sets particular requirements for circuits intended to supply electric vehicles for charging purposes. Includes domestic Mode 3 wallboxes, workplace chargers, public AC points and (with cross-reference) DC fast. Explicit exclusions: charging points for mobility scooters and similar vehicles ≤ 10 A; inductive (wireless) charging — these fall outside Section 722 scope. The term "electric vehicle (EV)" is defined in Part 2 of BS 7671.',
  },
  {
    id: 'm6s1-61851-conformity',
    question:
      'Reg 722.511.101 — what does it require of EV charging equipment?',
    options: [
      'Anything the manufacturer wants',
      'EV charging equipment shall comply with the appropriate parts of the BS EN 61851 series — the international standard covering conductive charging, charging modes, communication, functional safety and protection',
      'Only UKCA marking is needed',
      'Compliance with BS 7671 alone is sufficient',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.511.101 mandates conformance to the appropriate parts of BS EN 61851 series. BS EN 61851-1 is the general requirement, including the Mode 1/2/3/4 definitions and the Control Pilot (CP) signalling protocol. Manufacturer declares which parts applied (typically -1 + -22 for AC charging stations). The installer verifies via the Declaration of Conformity in the cert evidence bundle — cell-level / mode-level testing is the manufacturer’s job; the installer verifies via paperwork.',
  },
  {
    id: 'm6s1-mode-3-vs-mode-2',
    question:
      'What is the key difference between Mode 2 and Mode 3 EV charging?',
    options: [
      'Mode 2 is DC, Mode 3 is AC',
      'Mode 2 = in-cable control & protection device (ICCPD / "granny cable") plugged into a domestic socket-outlet, charging at typically 8–13 A. Mode 3 = dedicated charging station with the CP/PP signalling and protection built into the wallbox; the cable just connects vehicle to wallbox. Mode 3 is the UK 2025–26 domestic default',
      'They are the same thing',
      'Mode 3 is only for commercial sites',
    ],
    correctIndex: 1,
    explanation:
      'Mode 2 = the "granny lead" — a 3-pin or commando plug with an in-cable control & protection device (ICCPD) housing the CP signalling and protective devices. Plugs into a normal domestic socket. Slow (8–13 A). Mode 3 = a dedicated wallbox installed on a dedicated final circuit, with CP/PP signalling and protection integrated into the wallbox itself; the customer’s cable is "dumb" (just conductors and Type 2 connectors). UK 2025–26 domestic install = Mode 3 dominant. Mode 1 (no signalling, direct socket) is essentially obsolete and not used in UK domestic. Mode 4 = DC fast charging (covered in M7).',
  },
  {
    id: 'm6s1-single-ev-unearthed',
    question:
      'Reg 722.413.1.2 permits a separated-source protective measure for EV charging. What is the explicit limitation?',
    options: [
      'No limitation',
      'The protective measure shall be limited to the supply of one electric vehicle supplied from one unearthed source. The separated source cannot feed multiple EVs or any other loads — single EV per unearthed source',
      'Up to 5 EVs per source',
      'Only commercial sites',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.413.1.2 — "the protective measure shall be limited to the supply of one electric vehicle supplied from one unearthed source". A separated (isolated transformer) source can serve exactly ONE EV charging point. Multiple EVs on one isolated source is explicitly prohibited; the source cannot also feed any other loads on the same circuit. Cert evidence bundle records the topology if this protective measure is used. In practice, separated-source is rare in UK domestic (PME + earthing alternatives per 722.411.4 are the dominant approach); it appears more often in commercial / fleet contexts with dedicated transformer per bay.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer asks for a "Mode 1" charging point at home. What is the correct response?',
    options: [
      'Quote a Mode 1 install — it’s the cheapest',
      'Educate the customer: Mode 1 has no CP signalling, no protection logic between vehicle and supply, and is essentially obsolete for UK domestic EV charging. Reg 722.x and BS EN 61851 expect Mode 3 for dedicated charge points; Mode 2 (granny lead) covers the occasional unplanned event. Recommend a Mode 3 dedicated wallbox install',
      'Mode 1 is the same as Mode 3 — quote it',
      'Refer them to public charging',
    ],
    correctAnswer: 1,
    explanation:
      'Mode 1 (no signalling, direct socket connection) is essentially obsolete and not used in UK domestic EV charging — the safety case requires CP signalling between vehicle and charging station (Mode 2 ICCPD or Mode 3 wallbox). Customer education is the right move. Mode 3 dedicated wallbox is the UK 2025–26 default for daily home charging; Mode 2 (granny lead) is fine for occasional / emergency use only. Cert evidence bundle records the Mode 3 install rationale per Reg 722 and BS EN 61851.',
  },
  {
    question:
      'Reg 722.511.101 requires BS EN 61851 conformity. How does the installer verify this on a quote-stage product check?',
    options: [
      'Trust the brand name',
      'Read the manufacturer’s Declaration of Conformity (DoC). Reputable UK wallbox brands (Ohme, Wallbox, Hypervolt, Andersen, PodPoint, Easee, EO Charging, MyEnergi Zappi) publish a DoC citing the BS EN 61851 parts applied (typically -1 + -22 for AC stations) + UKCA / CE marking + accredited test reports. Installer attaches DoC + datasheet to the cert evidence bundle',
      'Buy whichever model is cheapest',
      'No verification needed',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 722.511.101 conformity is verified via the manufacturer’s Declaration of Conformity (DoC) + accredited test reports + UKCA / CE marking + datasheet. Reputable UK 2025-26 brands publish all of this on the product page or download portal. Installer responsibility: collect these documents and include in cert evidence bundle. Cell-level / mode-level testing is the manufacturer’s job; installer verifies via paperwork at quote stage and at handover.',
  },
  {
    question:
      'A customer wants a charge point for their disability-mobility-scooter that draws 8 A from a domestic socket. Does Section 722 apply?',
    options: [
      'Yes — full Section 722 applies',
      'No — Section 722 explicitly excludes "electric vehicle charging points that charge mobility scooters and similar vehicles of 10 A and less". The 8 A mobility scooter charger falls outside Section 722; install per the rest of BS 7671 as a standard domestic appliance circuit',
      'Only Reg 722.411.4 applies',
      'Customer’s choice',
    ],
    correctAnswer: 1,
    explanation:
      'Section 722 includes an explicit exception for mobility scooters and similar vehicles of 10 A and less — these are not "EV charging" within Section 722 scope. Install treats it as a standard domestic socket-outlet circuit (subject to the rest of BS 7671 — Section 411 ADS, Section 415 30 mA RCD on socket-outlets ≤ 32 A etc.). No Section 722 obligations for PME-on-EV, Type B + RDC-DD, dedicated final circuit (though these may still be sensible). Cert evidence bundle records the exclusion rationale.',
  },
  {
    question:
      'Section 722 includes Annex A722 (Informative) showing example arrangements. What weight do these examples carry?',
    options: [
      'Mandatory — must follow exactly',
      'Annex A722 is labelled (Informative) — guidance only, not mandatory. The binding text of Section 722 imposes the requirements; Annex A722 illustrates compliant arrangements but isn’t exclusive. Other arrangements that satisfy the binding regs are equally valid',
      'Mandatory only on Tuesdays',
      'Annex A722 is the only acceptable layout',
    ],
    correctAnswer: 1,
    explanation:
      'Annex A722 is explicitly labelled (Informative) — illustrative examples of compliant arrangements, not the exclusive route. Mandatory obligations come from the binding text of Section 722 (the numbered regulations 722.x). The competent designer can satisfy 722.x via Annex A722 patterns OR via other arrangements that meet the binding regs. Useful for unusual sites (e.g. shared block charging, isolated commercial bays) where the standard Annex A722 patterns don’t fit cleanly.',
  },
  {
    question:
      'An installer is asked to provide a Mode 4 (DC fast) charge point at a UK domestic home. What is the typical position in 2025-26?',
    options: [
      'Standard install — same as Mode 3',
      'Mode 4 DC fast (typically 50–350 kW) is essentially never installed at UK domestic homes — DNO supply capacity, three-phase availability, kit cost (£20-50k+), space and customer charging-time-need all push toward Mode 3 (7 kW single-phase) instead. Mode 4 belongs in M7 (commercial / workplace / public / DC fast). Customer education: Mode 3 7 kW overnight covers all typical UK driving patterns',
      'Always required for new builds',
      'Cheaper than Mode 3',
    ],
    correctAnswer: 1,
    explanation:
      'Mode 4 DC fast charging is commercial / public / workplace territory — not UK domestic. Typical domestic DNO single-phase supply is 100 A = 23 kW maximum; Mode 4 needs 50 kW+ continuous, requiring three-phase + dedicated DNO upgrade + £20-50k of kit. Customer education: Mode 3 at 7 kW single-phase delivers ~50 km of range per hour, which covers typical UK overnight driving needs (~30-50 km/day average). Module 7 covers Mode 4 in depth.',
  },
  {
    question:
      'Why does Section 722 specifically EXCLUDE inductive (wireless) charging from its scope?',
    options: [
      'Inductive isn’t covered by any standard',
      'Inductive charging operates with different electrical principles (magnetic coupling between primary in ground/pad and secondary in vehicle) — different fault, separation and earthing implications than conductive (cable-connected) charging. Section 722 was written for conductive charging; inductive is addressed in other standards (IEC 61980 series) and falls outside Section 722 scope',
      'Inductive doesn’t exist yet',
      'It’s prohibited entirely',
    ],
    correctAnswer: 1,
    explanation:
      'Inductive (wireless) EV charging — primary coil in ground pad, secondary coil in vehicle, magnetic coupling for power transfer — has electrical fault and protection characteristics that differ materially from conductive (cable-connected) charging. IEC 61980 covers inductive specifically. Section 722 explicitly scopes itself to conductive arrangements and excludes inductive. The 2025-26 UK domestic install market is overwhelmingly conductive (Type 2 cable into wallbox); public inductive pads at taxi ranks etc. are emerging but rare.',
  },
];

const faqs = [
  {
    question: 'BS EN 61851 has many parts. Which apply to a UK domestic AC wallbox?',
    answer:
      'BS EN 61851-1 (general requirements) is the foundation — Mode definitions, CP signalling protocol, safety. BS EN 61851-22 covers AC EV charging stations specifically. Manufacturer DoC declares the parts applied. UK domestic 7 kW single-phase wallbox: -1 + -22 typical. Some wallboxes also reference BS EN 61851-21-2 (EMC for EVSE). Cert evidence bundle records which parts the DoC cites.',
  },
  {
    question: 'How does Section 722 relate to Chapter 82 (PEI)?',
    answer:
      'Chapter 82 frames the whole site (DNO supply + PV + BESS + loads + EV) as a Prosumer’s Electrical Installation. Section 722 governs the EV-specific circuit. Where the EV is bidirectional (V2H / V2G), the EV becomes a SOURCE within the PEI — Chapter 82 then applies on top of Section 722. The NOTE in Chapter 57 explicitly says "for the supply of the fixed installation by electric vehicles, refer to Section 722 and Chapter 82". V2G is covered in M10; M6 keeps focus on the charging direction (EV as load).',
  },
  {
    question: 'Is BS 7671’s Section 722 the only regulation for UK EV install?',
    answer:
      'No — Section 722 is the wiring-regulation layer. Other layers: UK Electric Vehicles (Smart Charge Points) Regulations 2021 (smart-charging mandates, randomised delay, cyber requirements — covered in M6.7); OZEV / EVCS scheme rules (grant funding, installer accreditation — M6.8); local planning permission for some installs; lease / freeholder consent for flats and shared sites. Section 722 + the Smart Charge Points Regulations 2021 form the regulatory minimum stack for UK 2025-26 domestic install.',
  },
  {
    question: 'What about Mode 2 "granny leads" — are they still acceptable?',
    answer:
      'Yes, for occasional use. Mode 2 ICCPDs (in-cable control & protection devices) — typical 8-13 A draw from a 3-pin or commando socket — are designed for the customer’s emergency / occasional charging away from the dedicated wallbox. Not a permanent solution: the 13 A socket-outlet wasn’t designed for sustained 10+ A draw over hours, leading to thermal stress, terminal corrosion, EICR findings. Manufacturer instructions on Mode 2 leads typically say "for occasional use only". Customer education: a Mode 3 wallbox is the right answer for daily charging.',
  },
  {
    question: 'How does Section 722 interact with Section 412 (double or reinforced insulation)?',
    answer:
      'Section 412 ADS doesn’t feature heavily on a standard Mode 3 install — the wallbox provides Class I equipment with PE connection. Where Reg 722.413 (electrical separation) is invoked (single-EV unearthed source), Section 413 separated-source rules apply and PE is not connected. The dominant UK 2025-26 install uses ADS via the dedicated final circuit with appropriate disconnection time per Reg 411 — the topology is conventional, but with Section 722-specific layered requirements for PME-on-EV (M6.2), RCD type (M6.3) and cable arrangement (M6.4).',
  },
];

export default function RenewableEnergyModule6Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'Section 722 & the Mode 1–4 landscape | Renewable Energy 6.1 | Elec-Mate',
    description:
      'Scope of Section 722 in BS 7671:2018+A4:2026, the four IEC 61851 charging modes (1, 2, 3, 4), why UK domestic = Mode 3 dominant, Reg 722.511.101 conformance to BS EN 61851 series, exclusions for mobility scooters and inductive charging.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1 · BS 7671:2018+A4:2026 · Section 722 + BS EN 61851"
            title="Section 722 & the Mode 1–4 landscape"
            description="What makes EV charging regulatorily distinct in BS 7671 — Section 722 scope, exclusions, and the four IEC 61851 charging modes. Why UK domestic = Mode 3 dominant. The product-conformance gate via Reg 722.511.101 + BS EN 61851 series."
            tone="yellow"
          />

          <TLDR
            points={[
              'Section 722 of BS 7671:2018+A4:2026 covers "circuits intended to supply electric vehicles for charging purposes" — domestic Mode 3 wallboxes, workplace and public AC chargers, and (via cross-reference) DC fast charging.',
              'Two explicit Section 722 exclusions: charging points for mobility scooters and similar vehicles ≤ 10 A; inductive (wireless) charging. Both fall outside Section 722 scope — install per the rest of BS 7671 as standard circuits.',
              'BS EN 61851 series defines the four charging Modes. Mode 1 = direct socket connection, no signalling (essentially obsolete). Mode 2 = "granny lead" ICCPD into a domestic socket (occasional / emergency use). Mode 3 = dedicated wallbox with CP/PP signalling — UK 2025-26 domestic default. Mode 4 = DC fast charging (commercial / public — M7).',
              'Reg 722.511.101 — EV charging equipment shall comply with the appropriate parts of the BS EN 61851 series. Manufacturer Declaration of Conformity is the verification route; cert evidence bundle records the DoC.',
              'Reg 722.413.1.2 — separated-source protective measure is permitted but explicitly limited to ONE EV from ONE unearthed source. Cannot serve multiple EVs or any other loads.',
              'Definition of "electric vehicle (EV)" lives in Part 2 of BS 7671 — installer references Part 2 for the authoritative term. Annex A722 is Informative — examples not mandatory.',
              'Section 722 interacts with Chapter 82 (PEI) where the EV is bidirectional (V2H / V2G). For V2G the EV becomes a SOURCE in the PEI; Section 722 + Chapter 82 both apply. Standard UK 2025-26 install = EV as load = Section 722 only.',
              'Section 722 is the wiring-regulation layer. UK EV install also navigates the Electric Vehicles (Smart Charge Points) Regulations 2021 (M6.7), OZEV / EVCS grant rules (M6.8) and local planning / freeholder consent.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 722.x scope to identify which circuits fall within Section 722 — and which are explicitly excluded (mobility scooters ≤ 10 A, inductive charging).',
              'Distinguish the four BS EN 61851 charging Modes (1, 2, 3, 4) — recognise UK 2025-26 domestic = Mode 3 dominant; explain Mode 2 (granny leads) and Mode 4 (DC fast, commercial).',
              'Apply Reg 722.511.101 to verify BS EN 61851 conformance via the manufacturer Declaration of Conformity at quote stage.',
              'Apply Reg 722.413.1.2 to specify a separated-source protective measure where chosen — limited to ONE EV from ONE unearthed source.',
              'Cross-reference Section 722 to Part 2 (definitions) and to Chapter 82 (PEI) where the EV is bidirectional (V2H / V2G).',
              'Locate Annex A722 (Informative) and use the example arrangements as guidance — not mandatory routes.',
              'Map Section 722 against the wider UK EV regulatory stack — Smart Charge Points Regulations 2021, OZEV / EVCS, planning, freeholder consent.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Section 722 is the EV chapter. The four Modes are the kit families. Mode 3 is the UK domestic default.
          </Pullquote>

          <ContentEyebrow>Section 722 scope and exclusions</ContentEyebrow>

          <ConceptBlock
            title="What Section 722 covers — and what it doesn’t"
            plainEnglish="Section 722 of BS 7671:2018+A4:2026 sets particular requirements for circuits intended to supply electric vehicles for charging purposes. Domestic wallboxes, workplace AC charge points, public AC and (via cross-reference) DC fast — all in scope. Two explicit exclusions: mobility scooters ≤ 10 A; inductive (wireless) charging."
            onSite="Scope check is the first quote-stage question: is this a Section 722 circuit? If yes, the entire layered set of 722.x regs (PME-on-EV, Type B RCD, dedicated final circuit, 61851 conformity) applies. If no (mobility scooter ≤ 10 A, inductive pad), install per the rest of BS 7671 as a standard circuit. The term “electric vehicle (EV)” is defined in Part 2 of BS 7671 — consult Part 2 for the authoritative meaning."
          >
            <p>The scope decision tree:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">In scope</strong> — circuits intended to
                supply electric vehicles for charging purposes. Includes the domestic 7 kW
                Mode 3 wallbox install on a dedicated final circuit, commercial AC
                charging stations, workplace chargers, public AC bays
              </li>
              <li>
                <strong className="text-white">Excluded — mobility scooters ≤ 10 A</strong>
                — Section 722 explicitly excludes "electric vehicle charging points that
                charge mobility scooters and similar vehicles of 10 A and less". The
                domestic 3-pin socket-outlet used to charge a disability-mobility scooter
                is NOT a Section 722 circuit — treat as standard socket per Section 411
                + 415
              </li>
              <li>
                <strong className="text-white">Excluded — inductive (wireless)
                  charging</strong> — different electrical principles (magnetic coupling)
                handled by IEC 61980 series; Section 722 scope is conductive
                (cable-connected) only
              </li>
              <li>
                <strong className="text-white">Annex A722 (Informative)</strong> — example
                arrangements illustrating compliant install patterns. Informative means
                guidance not mandate; other arrangements that satisfy the binding 722.x
                regs are equally valid
              </li>
              <li>
                <strong className="text-white">Definition "electric vehicle (EV)"</strong>
                — defined in Part 2 of BS 7671. Section 722 cross-references Part 2 for
                the authoritative term. Includes passenger cars, commercial vans, light
                LCVs — anything the Part 2 definition covers
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 722 — Scope + Reg 722.511.101"
            clause="The particular requirements of Section 722 apply to circuits intended to supply electric vehicles for charging purposes. Reg 722.511.101: EV charging equipment shall comply with the appropriate parts of the BS EN 61851 series. Excluded: charging points that charge mobility scooters and similar vehicles of 10 A and less; charging points that employ inductive charging."
            meaning="Section 722 is the EV-specific chapter within Part 7 (Special Installations or Locations) of BS 7671. The scope catches all dedicated EV charging circuits; the exclusions catch low-current mobility devices and inductive wireless charging. Reg 722.511.101 is the product-conformance gate — the wallbox / charging station itself must conform to BS EN 61851. Manufacturer Declaration of Conformity is the installer’s verification route. Cert evidence bundle records the scope determination and the BS EN 61851 conformance evidence."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The four BS EN 61851 charging Modes</ContentEyebrow>

          <Pullquote>
            UK domestic 2025-26 = Mode 3 dominant. Mode 2 covers the granny-lead edge. Mode 1 is essentially obsolete. Mode 4 belongs in M7.
          </Pullquote>

          <ConceptBlock
            title="Mode 1 — direct socket, no signalling"
            plainEnglish="Mode 1 = the simplest possible arrangement: a cable from a normal mains socket to the vehicle, with no Control Pilot (CP) signalling and no in-cable protection. Predates the modern signalling standards. Essentially obsolete for UK domestic charging — the safety case requires CP signalling to coordinate vehicle-side and supply-side protection."
            onSite="Don’t quote Mode 1 for UK domestic install. Customer asks: educate that Mode 1 doesn’t use the CP signalling expected by every EV sold in the UK 2020+. Recommend Mode 3 wallbox for daily charging, Mode 2 granny lead as the occasional / emergency fallback."
          >
            <p>Where Mode 1 still appears (rare):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Light EVs without CP signalling</strong>
                — some older / low-spec light electric vehicles (early e-bikes,
                low-end scooters) — but these often fall under the mobility-scooter
                Section 722 exception anyway
              </li>
              <li>
                <strong className="text-white">Legacy installations</strong> — rare
                pre-2014 retrofits encountered at EICR. Recommend upgrade to Mode 3
                in remedial work
              </li>
              <li>
                <strong className="text-white">Not Section 722 best
                  practice</strong> — installers do not specify Mode 1 for new UK
                domestic EV charging in 2025-26. The Mode 1 → Mode 2 / Mode 3
                migration is essentially complete
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mode 2 — ICCPD granny lead"
            plainEnglish="Mode 2 = a cable from a normal mains socket (3-pin or commando) to the vehicle, with an In-Cable Control & Protection Device (ICCPD) midway. The ICCPD provides the CP signalling and some in-line protection. Charges at 8-13 A typical. Designed for occasional / emergency use, NOT daily charging."
            onSite="UK 2025-26 reality: every new EV ships with a Mode 2 lead — typically 8 A from a 3-pin BS 1363 socket, 16-32 A from a Type 2 commando. Customers use them in emergency or at second homes / holidays. For DAILY charging at home, the dedicated Mode 3 wallbox is the right answer — Mode 2 sustained draw on a 13 A socket-outlet creates thermal stress that the BS 1363 socket was never specified for."
          >
            <p>Where Mode 2 fits in UK 2025-26 practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Emergency / occasional</strong> —
                customer at a holiday cottage with no dedicated wallbox; occasional
                home use before the wallbox install is complete
              </li>
              <li>
                <strong className="text-white">Manufacturer-supplied</strong> —
                most UK 2025-26 EVs include a Mode 2 lead in the boot as
                emergency fallback. Typical specs: 3-pin BS 1363 at 8 A; Type 2
                commando at 16 A
              </li>
              <li>
                <strong className="text-white">Customer education</strong> — set
                expectations: Mode 2 from a 13 A socket = ~10 km of range per
                hour vs Mode 3 7 kW wallbox = ~50 km/hr. Mode 2 sustained on a
                domestic socket is a real thermal stress on the socket and
                cabling
              </li>
              <li>
                <strong className="text-white">EICR finding</strong> — sustained
                Mode 2 charging on a 13 A socket leaves visible terminal
                discolouration / signs of thermal stress; periodic inspectors
                spot it; suggests a Mode 3 wallbox upgrade is overdue
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mode 3 — dedicated wallbox (UK 2025-26 default)"
            plainEnglish="Mode 3 = a dedicated charging station (wallbox) installed on its own dedicated final circuit. The wallbox houses the CP/PP signalling, the contactor, the protective devices and the Type 2 socket or tethered Type 2 connector. The customer’s cable is "dumb" — just conductors and Type 2 plugs at each end. Charges at 7 kW single-phase (32 A) up to 22 kW three-phase (32 A × 3)."
            onSite="Mode 3 is the entire body of work for §6.4 (cable, RCBO, dedicated final circuit) through §6.7 (smart charging). Every UK domestic wallbox install in 2025-26 is Mode 3. Brand examples (alphabetical, no endorsement): Andersen, Easee, EO Charging, Hypervolt, MyEnergi Zappi, Ohme, PodPoint, Wallbox."
          >
            <p>What makes a Mode 3 install distinct:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Dedicated final circuit</strong> —
                Reg 722.55; the wallbox does not share a circuit with other loads.
                Cable, RCBO, isolator sized for the wallbox’s rated current
                (typically 32 A on a 7 kW single-phase install)
              </li>
              <li>
                <strong className="text-white">CP/PP signalling integrated in
                  wallbox</strong> — the wallbox communicates with the vehicle
                via the Control Pilot pilot wire; signal coordinates contactor
                closure, current limit announcement, error states. Customer
                cable just carries L / N / PE / CP / PP
              </li>
              <li>
                <strong className="text-white">Type 2 socket or tethered Type
                  2</strong> — UK / EU connector standard per BS EN IEC
                62196-2:2022. Tethered = cable permanently attached to wallbox;
                untethered = socket on wallbox, customer brings their own cable
              </li>
              <li>
                <strong className="text-white">RCD architecture</strong> — Type B
                (BS EN 62423) RCD on the AC side OR Type A + integrated 6 mA
                RDC-DD per the manufacturer-declared profile. Covered in M6.3
              </li>
              <li>
                <strong className="text-white">PME-on-EV earthing</strong> — Reg
                722.411.4 outdoor charging point cannot use PME directly; one of
                alternatives (b)-(e) applies. Covered in M6.2
              </li>
              <li>
                <strong className="text-white">Smart-charging compliant</strong> —
                UK Electric Vehicles (Smart Charge Points) Regulations 2021
                require default off-peak charging + randomised delay + security
                requirements for ALL new domestic wallboxes from June 2022 onward
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mode 4 — DC fast charging (commercial, M7)"
            plainEnglish="Mode 4 = DC fast charging. The charging station includes the AC-to-DC conversion inside (saving the vehicle’s on-board charger), allowing power delivery far beyond AC limits. Typical Mode 4 = 50 kW (early), 150 kW (mid), 350 kW (current peak). UK 2025-26 connectors: CCS Combo 2 (the standard); CHAdeMO (legacy, now declining); Tesla NACS (USA-origin, expanding into UK)."
            onSite="Mode 4 belongs in M7 (commercial, workplace, public, DC fast). Not relevant to UK domestic install. Customer ask: educate that domestic DNO supply (100 A single-phase = 23 kW maximum) cannot deliver 50+ kW; three-phase DNO upgrade would be needed, plus £20-50k of Mode 4 kit, for a charging speed that domestic users almost never need."
          >
            <p>Where Mode 4 lives (M7 preview):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Public charging</strong> — motorway
                services, supermarket car parks, urban kerbside hubs. The bulk of
                UK Mode 4 deployment
              </li>
              <li>
                <strong className="text-white">Workplace fleet</strong> — taxi
                fleets, delivery vans, commercial-vehicle depots needing
                mid-shift top-up
              </li>
              <li>
                <strong className="text-white">CCS Combo 2 connector</strong> —
                BS EN IEC 62196-3 (DC). Combines AC pins from Mode 3 with two DC
                pins below; one connector socket on the vehicle covers both AC
                Mode 3 and DC Mode 4
              </li>
              <li>
                <strong className="text-white">DNO involvement</strong> —
                three-phase supply typically required, sometimes upgraded
                connection. EREC G99 application standard. Section 722
                + Section 712 (where battery storage is involved) + Chapter 82
              </li>
              <li>
                <strong className="text-white">Cross-reference</strong> — see M7
                for the full Mode 4 treatment
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="Four-Mode comparison diagram. Left column: Mode 1 (direct socket, no signalling, OBSOLETE marker). Mode 2 (granny lead with ICCPD midway, 8-13 A, OCCASIONAL marker). Mode 3 (dedicated wallbox with CP/PP, 7-22 kW AC, UK DOMESTIC DEFAULT marker). Mode 4 (DC fast charging, 50-350 kW DC, COMMERCIAL marker). Each row shows: power range, signalling, where the protection lives, typical UK 2025-26 use case. Annotations: BS EN 61851-1 (general) + BS EN 61851-22 (AC stations) + BS EN 61851-23 (DC stations)."
            filename="renewable/m6s1-four-modes.png"
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Special protective measure — Reg 722.413.1.2</ContentEyebrow>

          <ConceptBlock
            title="Separated source (single EV, single unearthed source)"
            plainEnglish="Reg 722.413.1.2 permits the use of electrical separation (Section 413 protective measure) for an EV charging circuit — but with a hard limitation: the protective measure shall be limited to the supply of ONE electric vehicle supplied from ONE unearthed source. The separated source cannot serve multiple EVs or any other loads on the same circuit."
            onSite="Rare in UK domestic — the standard Reg 722.411.4 PME-alternative approaches (M6.2) cover most outdoor wallbox installs. Separated-source appears more often in commercial / fleet contexts where each bay has a dedicated isolating transformer, eliminating the PME hazard entirely at the cost of an additional transformer per bay."
          >
            <p>What separated-source actually buys:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Eliminates the PME hazard at
                  source</strong> — if the supply to the wallbox comes from an
                isolating transformer, the PME / "lost PEN" fault hazard cannot
                propagate to the vehicle. No need for OPDD or dedicated TT
                electrode at the wallbox
              </li>
              <li>
                <strong className="text-white">Capital cost is the trade-off</strong>
                — an isolating transformer (typical sizing 10-20 kVA for a 7-22 kW
                wallbox) adds ~£600-£1,500 to the install cost; rarely justified
                for single-bay domestic
              </li>
              <li>
                <strong className="text-white">Single-EV limitation</strong> —
                Reg 722.413.1.2 explicitly limits the protective measure to ONE
                EV from ONE unearthed source. Cannot serve two EVs from a shared
                transformer; cannot also feed garage lighting from the same
                circuit. The "limited" word is binding
              </li>
              <li>
                <strong className="text-white">Where it shines</strong> —
                multi-bay fleet sites where each bay has its own isolating
                transformer; sensitive earth-electrode sites where dedicated TT
                isn’t practical; specific commercial deployments where the
                customer’s safety case prefers the transformer route
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> —
                records the separated-source topology choice, the transformer
                rating + isolation class, and the single-EV limitation
                documentation. Reg 722.413.1.2 + Section 413 references
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.413.1.2 — Separated-source single-EV limitation"
            clause="The protective measure shall be limited to the supply of one electric vehicle supplied from one unearthed source."
            meaning="Reg 722.413.1.2 lets the installer use electrical separation (Section 413) as the protective measure for an EV charging circuit — but the separated source can supply ONLY one EV. Multiple EVs from one unearthed source: prohibited. Other loads on the same isolated circuit: prohibited. The “limited” wording is mandatory (per the regulatory note that ‘shall be limited’ is a binding restriction). Cert evidence bundle records the topology, the transformer rating, and the single-EV documentation. Rare in UK domestic; more common in commercial single-bay fleet deployments."
          />

          <InlineCheck {...inlineChecks[3]} />

          <Scenario
            title="UK suburban customer — new wallbox install"
            situation="Midlands semi-detached, 2024 build, customer just bought an electric vehicle. Wants a wallbox installed on the driveway by the front door. Customer drives ~50 km/day average; works from home some days. Standard DNO single-phase 100 A supply; CU has spare ways. Customer has googled ‘Mode 3’ because they read it on the manufacturer’s charging guide."
            whatToDo="Section 722 scope check: yes, in scope (dedicated EV charging circuit). Mode 3 dedicated wallbox is the right answer — covers daily commuting easily, meets BS EN 61851 conformity, allows smart-charging integration with the customer’s tariff. Recommend a 7 kW (32 A) single-phase wallbox from a reputable UK brand (the wallbox model decision goes into the quote; example brand families: Ohme, Wallbox, Hypervolt, MyEnergi Zappi). The Mode 3 install lands the customer in §6.2 (earthing), §6.3 (RCD architecture), §6.4 (cable + RCBO + dedicated final circuit), §6.5 (outdoor IP install), §6.6 (connector + signalling) and §6.7 (smart charging). Cert evidence bundle starts here with the BS EN 61851 DoC + UKCA marking + Reg 722.511.101 conformance documentation."
            whyItMatters="This is the bread-and-butter UK 2025-26 install — Mode 3 wallbox, 7 kW single-phase, dedicated final circuit. Sections 6.2 through 6.8 walk through every regulatory layer that lands on this install. Customer’s correct intuition (Mode 3) is the right answer; the installer’s job is to translate that into the compliant install pack."
          />

          <Scenario
            title="Customer asks for a 22 kW three-phase domestic install"
            situation="Customer in a rural detached property with three-phase 100 A DNO supply already on site (originally for a now-decommissioned commercial workshop). Customer has a high-mileage car (electric vehicle they use for daily long commute, ~150 km/day). Wants the fastest practical home charging."
            whatToDo="Three-phase Mode 3 22 kW (32 A per phase) wallbox is feasible on this site. Section 722 scope check: yes, in scope. Confirm DNO’s position on the export side (anti-islanding under EREC G98 / G99 if PV/BESS coexist; standard G98 for the EV is below DNO notification thresholds). Three-phase wallbox brands: Easee, EO Charging, MyEnergi Zappi 22 kW variants, Tesla Wall Connector Gen 3. RCD architecture: Type B 4-pole on the three-phase circuit. Cable sizing per Reg 311.1 max demand on the three-phase final circuit; consider Reg 722.311.201 load curtailment if the rest of the household three-phase load is tight. Cert evidence bundle includes the three-phase install pack — same Section 722 layers but with phase-balance considerations. Note: three-phase domestic Mode 3 is rare in UK; most domestic supplies are single-phase. M7 covers commercial three-phase install in depth — this domestic edge case borrows from M7’s treatment."
            whyItMatters="Three-phase domestic install is a real edge case in UK 2025-26 — rural sites with legacy commercial three-phase, large new-builds opting for three-phase supply, and the occasional fleet-charger-at-home scenario. The Section 722 regs apply identically; the install pattern shifts (4-pole devices, phase-balancing, DNO notification thresholds). Cert evidence bundle records the three-phase rationale."
          />

          <CommonMistake
            title="Quoting ‘Mode 1’ for a UK domestic install because the customer asked for the cheapest option"
            whatHappens="Installer takes a customer at their word that they want the cheapest EV charging — quotes a 3-pin commando socket as a Mode 1 charging point. Customer plugs in their EV via the manufacturer’s Mode 2 lead. The Mode 1 commando lacks the CP signalling expected by every modern EV; the EV refuses to draw at full rate; the customer complains; the installer returns to reconfigure. Mode 1 quote becomes a more expensive Mode 3 install at the second visit, plus reputation damage."
            doInstead="Quote Mode 3 from the start for ANY UK 2025-26 domestic EV charging install. The cost difference between a commando-socket Mode 1 quote and a Mode 3 wallbox quote is small (~£200-400 wallbox vs ~£50 commando socket) compared to the cost of returning to redo the install. Customer education at quote stage: explain why Mode 3 is the right answer and what the smart-charging-regs benefits are. Cert evidence bundle for Mode 3 install records the rationale."
          />

          <CommonMistake
            title="Treating a mobility-scooter 3-pin socket as a full Section 722 install"
            whatHappens="Installer treats a customer’s ground-floor 3-pin socket for charging their disability-mobility scooter (drawing ~8 A from a BS 1363 socket) as a full Section 722 EV charging circuit — quoting Type B RCD + dedicated final circuit + OPDD + PME-on-EV alternatives. Customer faces a £1,500+ install cost for what should be a £100 socket installation."
            doInstead="Check the Section 722 exclusion: mobility scooters and similar vehicles ≤ 10 A are explicitly OUT of scope. The 8 A mobility scooter falls under the exclusion. Install as a standard domestic socket-outlet per Section 411 + 415 (30 mA RCD on socket-outlets ≤ 32 A per Reg 411.3.3) — no Section 722 layered obligations. Cert evidence bundle records the exclusion rationale + the cleaner install scope. Common defect on the other direction (treating a real EV as the exception) is more dangerous; this direction is just over-engineering, but still wastes customer money."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Section 722 of BS 7671:2018+A4:2026 covers circuits intended to supply electric vehicles for charging purposes. Domestic Mode 3 wallboxes, workplace AC, public AC, and (via cross-reference) Mode 4 DC fast.',
              'Two explicit Section 722 exclusions: mobility scooters and similar vehicles ≤ 10 A; inductive (wireless) charging. Install per the rest of BS 7671 in both cases — no Section 722 layered obligations.',
              'BS EN 61851 series defines the four charging Modes. Mode 1 = direct socket no signalling (obsolete). Mode 2 = ICCPD granny lead (occasional / emergency). Mode 3 = dedicated wallbox with CP/PP (UK 2025-26 default). Mode 4 = DC fast charging (M7 scope).',
              'Reg 722.511.101 — EV charging equipment shall comply with the appropriate parts of BS EN 61851 series. Verification via manufacturer Declaration of Conformity + UKCA / CE marking + datasheets.',
              'Reg 722.413.1.2 — separated-source protective measure permitted, but explicitly limited to ONE EV from ONE unearthed source. Cannot serve multiple EVs or other loads.',
              'Definition of "electric vehicle (EV)" lives in Part 2 of BS 7671. Annex A722 is Informative (examples not mandatory).',
              'Section 722 interacts with Chapter 82 (PEI) where the EV is bidirectional (V2H / V2G — the EV becomes a SOURCE). V2G is covered in M10; M6 keeps focus on the charging direction.',
              'Wider UK EV regulatory stack: Section 722 (wiring regs) + UK Electric Vehicles (Smart Charge Points) Regulations 2021 (M6.7) + OZEV / EVCS grant scheme (M6.8) + local planning / freeholder consent.',
              'UK 2025-26 install reality: Mode 3 wallbox at 7 kW single-phase (32 A) is the standard. 22 kW three-phase domestic is rare edge case (rural / large new-build). Mode 2 granny leads for emergency use only.',
              'Cert evidence bundle starts at Section 722 scope determination + BS EN 61851 DoC + UKCA / CE marking. Sections 6.2 through 6.8 layer on the install-specific regulatory pieces.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Earthing tree — PME-on-EV, TN-S, TT, OPDD
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
