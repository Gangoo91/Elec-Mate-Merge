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
    id: 'm5s7-siting-dwelling-vs-other',
    question:
      'Chapter 57 + PAS 63100:2024 handle BESS siting differently in dwellings vs other premises. Which statement is correct?',
    options: [
      'PAS 63100 only applies to non-dwellings',
      'Dwellings — install per manufacturer instructions and PAS 63100:2024. Non-dwellings — location and fire protection selected per the premises’ fire strategy',
      'Both routes ignore the manufacturer instructions',
      'Both routes require a dedicated battery room',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 57 references PAS 63100:2024 specifically for dwellings — that PAS sets the UK domestic BESS install standard (siting in garage / external / loft restrictions, ventilation, fire-rated locations). For premises other than dwellings, Chapter 57 instead requires that battery location and fire protection are selected taking account of the premises’ fire strategy. Cert evidence bundle records which route applies and the rationale.',
  },
  {
    id: 'm5s7-warning-notice-text',
    question:
      'Reg 570.6.8.202 requires a permanent warning notice at every point of access to a battery room or battery enclosure. What must the notice indicate?',
    options: [
      'Only the chemistry of the cells',
      'That live parts may still be energized after isolation — the regulation gives "BATTERY - Live parts can remain energized after isolation" as the example wording',
      'Only the maximum DC voltage',
      'The customer’s contact details',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.8.202 — permanent warning at each point of access indicating that live parts may still be energized after isolation. The regulation supplies "BATTERY - Live parts can remain energized after isolation" as example wording; equivalent text is accepted. Applies to both battery rooms AND battery enclosures, so both a dedicated battery room and a wall-mounted BESS cabinet on a garage wall need the notice. Reg 570.6.8.201 additionally requires a separate notice at the consumer unit / DB indicating the presence and location of the BESS.',
  },
  {
    id: 'm5s7-rcd-type',
    question:
      'A customer install uses a transformerless hybrid inverter. The PV/battery side and the AC side do NOT have simple separation. Which RCD type is required on the AC side for fault protection?',
    options: [
      'Type AC — standard for all installs',
      'Type A — fine because hybrids only produce sinusoidal current',
      'Type B to BS EN 62423 — because a transformerless inverter can feed DC fault current into the AC installation, and Type AC / A cannot detect smooth DC faults',
      'No RCD required',
    ],
    correctIndex: 2,
    explanation:
      'Reg 712.411.3.2.1.2 — where a PV power supply system (or hybrid PCE) does not provide at least simple separation between AC and DC sides, the RCD used for fault protection shall be Type B (BS EN 62423). The exception: a written manufacturer declaration that the inverter cannot feed DC fault currents into the AC installation. Skipping this is a common defect on transformerless hybrid installs; a Type AC / A RCD blinds the installation to the DC fault current that the topology can produce. Cert evidence bundle records the RCD type, the inverter model and (if applicable) the manufacturer’s declaration.',
  },
  {
    id: 'm5s7-commissioning-IR',
    question:
      'Reg 643.3.2 (Table 64) sets minimum insulation resistance values for the AC side of the install. On a 230 V single-phase circuit to the BESS, what test voltage and acceptance minimum apply?',
    options: [
      '250 V DC, 0.5 MΩ minimum',
      '500 V DC, 1.0 MΩ minimum',
      '1000 V DC, 1.0 MΩ minimum',
      'No IR test required on BESS circuits',
    ],
    correctIndex: 1,
    explanation:
      'Table 64 minima: circuits up to and including 500 V (excluding SELV / PELV) — 1.0 MΩ at 500 V DC test. SELV / PELV would be 0.5 MΩ at 250 V DC; circuits above 500 V would be 1.0 MΩ at 1000 V DC. Reg 643.3.1 sets the two measurements (between live conductors, and between live conductors and the protective conductor). On a BESS install the AC final circuit to the inverter is tested per the same rules as any other 230 V circuit; the DC side has its own manufacturer-defined commissioning procedure that is separate from Part 6 IR testing.',
  },
];

const quizQuestions = [
  {
    question:
      'You are siting a new 9.5 kWh LFP BESS for a UK domestic customer. Which of these locations is correctly precluded by PAS 63100:2024 and Chapter 57 siting guidance?',
    options: [
      'Wall-mounted in the integral garage on a non-combustible backboard with manufacturer clearances respected',
      'Floor-stack in a utility room adjacent to the consumer unit, with means of isolation reachable from the kitchen door',
      'Wall-mounted in a loft conversion bedroom directly behind the bed-head, behind plasterboard — no clearance to nearby furnishings, no fire-rated separation',
      'External wall of a brick outbuilding under a fire-rated weatherproof enclosure with manufacturer-approved temperature range',
    ],
    correctAnswer: 2,
    explanation:
      'PAS 63100:2024 + Chapter 57 + Reg 570.6.3 (thermal effects) preclude BESS siting in habitable rooms without proper fire-rated separation and clearance, particularly behind plasterboard with no clearance to combustibles. The other three locations are all standard UK 2025-26 install patterns — garage, utility room (where local building control accepts), and external enclosure. Cert evidence bundle records the location AND the rationale against Reg 570.5.1(j) external influences and Reg 570.6.3.',
  },
  {
    question:
      'Reg 570.6.5.201 demands isolation on every power port of the PCE. On a typical UK domestic hybrid inverter install with separate floor-stack battery, how many EXTERNAL isolators does the installer need to provide?',
    options: [
      '1 — just the AC',
      '2 — AC grid + DC battery',
      '4 — PV DC + battery DC + AC grid + AC EPS',
      '6 — every cable in the install',
    ],
    correctAnswer: 2,
    explanation:
      'Standard hybrid topology with battery as separate floor-stack: PV DC (MPPT inputs) + battery DC + AC grid + AC EPS = 4 external power ports on the hybrid PCE. Each needs its own means of isolation per Reg 570.6.5.201. Where the battery is INTEGRATED into the same sealed cabinet as the inverter (some all-in-one SKUs), the manufacturer’s internal isolation is taken as compliant for the internal battery-PCE port; the installer’s duty drops to the 3 external ports.',
  },
  {
    question:
      'On a transformerless hybrid inverter PV+BESS install, the installer fits a standard Type AC RCD on the AC final circuit. The customer’s next EICR flags this. Why?',
    options: [
      'Type AC is correct — the EICR finding is mistaken',
      'Reg 712.411.3.2.1.2 requires Type B (BS EN 62423) where the inverter does not provide at least simple separation between AC and DC sides, because a transformerless inverter can feed smooth DC fault currents that Type AC cannot detect',
      'Type AC is undersized for the inverter’s nameplate current',
      'No RCD is needed; the EICR should remove the device',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 712.411.3.2.1.2 — transformerless inverter without simple separation between AC and DC = Type B RCD (BS EN 62423) on the AC side. The exception: a manufacturer’s written declaration that the inverter cannot feed DC fault currents into the installation. Without that declaration, Type AC / A is blind to DC components and is a Code C2 (potential danger) finding. Cert evidence bundle records the RCD type and the inverter’s separation status (with declaration where the exception is claimed).',
  },
  {
    question:
      'A customer’s LFP BESS is wall-mounted in an integral garage. Reg 570.6.8.201 and 570.6.8.202 require warning notices. Where do they go?',
    options: [
      'Only at the BESS cabinet itself',
      'Only at the consumer unit',
      '570.6.8.201 — at the consumer unit / DB supplied by the battery, indicating presence and location of the BESS. 570.6.8.202 — at every point of access to the BESS enclosure, indicating that live parts may remain energized after isolation. Both notices, not either / or',
      'Anywhere the customer chooses to put them',
    ],
    correctAnswer: 2,
    explanation:
      'Two distinct notices. 570.6.8.201 — at the consumer unit (or each DB) supplied by the battery, indicating BESS presence and location. 570.6.8.202 — at each point of access to the BESS room or enclosure, indicating that live parts may remain energized after isolation; example text "BATTERY - Live parts can remain energized after isolation". The notices serve different audiences: 570.6.8.201 alerts the next electrician opening the CU; 570.6.8.202 alerts anyone opening the cabinet itself.',
  },
  {
    question:
      'You are commissioning a new 9.5 kWh LFP BESS. Reg 643.3.1 requires insulation resistance measurements between (i) live conductors and (ii) live conductors and the protective conductor connected to the earthing arrangement. Where in the BESS install does this Part 6 IR test apply?',
    options: [
      'The whole install end-to-end, including the manufacturer’s internal cell-to-cell wiring',
      'The AC final circuit from the consumer unit to the inverter AC terminals, per the standard Part 6 procedure; the manufacturer’s DC commissioning procedure is separate and follows BS EN IEC 62485 / manufacturer steps',
      'Only the manufacturer’s DC side',
      'No IR test applies to BESS installs',
    ],
    correctAnswer: 1,
    explanation:
      'Part 6 / Reg 643 applies to the AC-side wiring of the install — final circuit from CU to inverter AC terminals, tested at 500 V DC with 1 MΩ minimum per Table 64. The DC side has its own commissioning procedure defined by the manufacturer following BS EN IEC 62485 series (insulation resistance limits and procedures differ on DC; manufacturer typically specifies test conditions). After connecting equipment back, Reg 643.3.3 requires a 250 V DC follow-up test between live and CPC with 1 MΩ minimum. Cert evidence bundle records both AC IR (Part 6) and DC commissioning results (manufacturer pack).',
  },
  {
    question:
      'A customer handover pack for a new BESS install should record specific items so the next EICR / service has the information it needs. Which of these is essential?',
    options: [
      'Just the install date',
      'Manufacturer model, chemistry, nameplate kWh, usable kWh, commissioning baseline capacity test, RCD type, Reg 570.5.1 selection rationale, Reg 570.6.5.201 isolator schedule, warning-notice locations, BMS app credentials / pairing, EPS scope (if EPS) — and the cert evidence bundle indices into Section 712 / Chapter 57 / Chapter 82 packs',
      'Only the customer’s name',
      'A photograph of the BESS',
    ],
    correctAnswer: 1,
    explanation:
      'A defensible handover pack records: identity (manufacturer / model / chemistry), nameplate vs usable, baseline commissioning capacity test (against which future EICR capacity tests compare), the protection picture (RCD type, isolator schedule, notice positions), Reg 570.5.1 rationale, BMS pairing credentials, EPS scope. Cert evidence bundle indices into Section 712 PV pack + Chapter 57 BESS pack + Chapter 82 PEI pack. The customer keeps a copy; the installer keeps a copy. The next electrician opening the CU at year 5 can pick up the install without having to reconstruct what was done.',
  },
];

const faqs = [
  {
    question: 'Can a BESS be mounted directly on a stud wall?',
    answer:
      'Not directly. PAS 63100:2024 and Reg 570.6.3 (thermal effects) require a non-combustible backboard with the manufacturer’s specified clearance. Typical UK 2025-26 install: a fire-rated cement-board or steel-faced backboard, with the BESS bolted through it into the stud frame. Manufacturer instructions usually specify the backboard material AND the clearance to combustible surfaces above / below / either side. The cert evidence bundle records the backboard and clearances.',
  },
  {
    question: 'What about lofts and habitable rooms?',
    answer:
      'PAS 63100:2024 generally precludes BESS in habitable rooms and limits loft installations to specific conditions (manufacturer permission, ventilation, accessibility for service, fire-rated separation). Local building control sometimes adds further constraints. Default UK 2025-26 sites: garage, utility room, plant room, external enclosure. When the customer pushes for an interior room, the conversation goes: PAS 63100 limits, fire strategy implications, customer insurance position. Cert evidence bundle records the location decision and the rationale.',
  },
  {
    question: 'Does Reg 570.6.1.2.1 require the DC side to be earthed?',
    answer:
      'No — it PERMITS earthing of one DC live conductor, provided there is at least simple separation between the AC side and the DC side. Most modern UK 2025-26 hybrid inverters are transformerless (no simple separation), so DC earthing is NOT carried out and DC functional bonding follows the manufacturer’s design (Section 712 patterns where PV is involved). The Type B RCD on the AC side (Reg 712.411.3.2.1.2) covers DC fault current detection in that topology. Cert evidence bundle records the DC earthing arrangement.',
  },
  {
    question: 'Which standards govern DC cables on a BESS install?',
    answer:
      'Reg 570.6.4.202 covers DC single-core cable arrangements; a NOTE indicates that cables to BS EN 50618 are considered appropriate. BS EN 50618 is the DC cable standard widely used for PV string cables and increasingly for BESS DC interconnects in the UK 2025-26 market. The PV array DC also follows Section 712 (Reg 712.433.103 protection of array cable). Cert evidence bundle records the DC cable spec and manufacturer.',
  },
  {
    question: 'What goes in the BMS commissioning step?',
    answer:
      'Manufacturer-specific but typically: deep-discharge cut-off voltage configured, charge / discharge profiles set (LFP 80% DoD default), comms link verified (typically Modbus over RS485 or CAN to the inverter, plus Wi-Fi to the manufacturer cloud), customer account paired to the installer’s portal (warranty registration), baseline capacity test recorded as the reference point for future EICR capacity comparison. The BMS log is the diagnostic spine of the install for the next 15-20 years; commissioning gets it started.',
  },
];

export default function RenewableEnergyModule5Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'Installation, commissioning & ventilation | Renewable Energy 5.7 | Elec-Mate',
    description:
      'BESS install, commissioning and ventilation — PAS 63100:2024 siting, Reg 570.6.3 thermal effects, Reg 570.6.5.201 port isolation, Reg 570.6.8.201/.202 warning notices, Reg 712.411.3.2.1.2 Type B RCD, BS EN 50618 DC cables, BS EN IEC 62485 commissioning, Reg 643 IR testing, handover pack.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 7 · BS 7671:2018+A4:2026 · Chapter 57 + PAS 63100:2024 + BS EN IEC 62485"
            title="Installation, commissioning & ventilation"
            description="Siting (PAS 63100:2024 + Chapter 57), thermal effects (Reg 570.6.3), DC cabling (BS EN 50618), Type B RCD (Reg 712.411.3.2.1.2), warning notices (Reg 570.6.8.201 / .202), commissioning per BS EN IEC 62485 + Part 6 IR testing, and the customer handover pack."
            tone="yellow"
          />

          <TLDR
            points={[
              'Siting splits two ways: dwellings → PAS 63100:2024 + manufacturer instructions; non-dwellings → location and fire protection per the premises’ fire strategy. Both routes have to satisfy Reg 570.6.3 (thermal effects) and Reg 570.5.1(j) (external influences).',
              'Default UK 2025-26 install locations: garage, utility room, plant room, external enclosure. Habitable rooms and unmodified lofts are generally precluded by PAS 63100 + manufacturer instructions.',
              'Non-combustible backboard, manufacturer clearance to combustibles above / below / either side, ventilation as the manufacturer specifies. The pack ships with these numbers — don’t guess them.',
              'DC cables — BS EN 50618 is the standard normally relied on (NOTE to Reg 570.6.4.202). PV DC cables already follow this on the array side per Section 712.',
              'Reg 570.6.5.201 — every external power port of the PCE gets a means of isolation. Hybrid with separate battery = 4 external isolators (PV DC + battery DC + AC grid + AC EPS).',
              'Reg 712.411.3.2.1.2 — transformerless inverter without simple separation between AC and DC = Type B RCD (BS EN 62423) on the AC side. Standard Type AC / A is blind to smooth DC fault current.',
              'Warning notices — TWO are required. Reg 570.6.8.201 at the CU / DB indicating BESS presence and location. Reg 570.6.8.202 at each point of access to the BESS enclosure: "BATTERY - Live parts can remain energized after isolation".',
              'Commissioning = Part 6 AC IR test (Reg 643.3 — 500 V test, 1 MΩ minimum on 230 V circuits) + manufacturer-defined DC commissioning per BS EN IEC 62485 + BMS commissioning + baseline capacity test for the handover pack.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply PAS 63100:2024 + Chapter 57 siting requirements to a UK domestic BESS install — distinguish dwelling vs non-dwelling routes and the fire-strategy obligation in the latter.',
              'Specify non-combustible backboard, manufacturer clearance and ventilation per Reg 570.6.3 (thermal effects) and Reg 570.5.1(j) (external influences).',
              'Select DC cables to BS EN 50618 per Reg 570.6.4.202; pair with Section 712 patterns on the PV DC side where applicable.',
              'Count required external isolators per Reg 570.6.5.201 against the topology (Section 5.5) and label each at install.',
              'Specify RCD type on the AC side: Type B (BS EN 62423) for transformerless inverter without simple separation per Reg 712.411.3.2.1.2; document the manufacturer declaration if invoking the exception.',
              'Place warning notices to Reg 570.6.8.201 (CU / DB level) and Reg 570.6.8.202 (each point of access to the enclosure), using the regulation-supplied example wording.',
              'Run a commissioning sequence — Part 6 AC IR test (Reg 643) + manufacturer DC commissioning (BS EN IEC 62485) + BMS configuration + baseline capacity test — and produce a defensible handover pack indexing Section 712 / Chapter 57 / Chapter 82 packs.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Install is where the topology drawing meets a brick wall, a manufacturer pack and a customer doorbell. Get the boring steps right and the cert evidence bundle writes itself.
          </Pullquote>

          <ContentEyebrow>Siting — PAS 63100:2024 + Chapter 57</ContentEyebrow>

          <ConceptBlock
            title="Dwelling siting follows PAS 63100:2024 + manufacturer instructions"
            plainEnglish="Chapter 57 hands UK domestic BESS install practice to PAS 63100:2024 (the publicly available specification for domestic energy storage). PAS 63100 sets siting rules (room types allowed, clearance to combustibles, ventilation, accessibility), thermal management, fire-rated separation, and the install-evidence pack. Manufacturer instructions sit on top of (or sometimes override) PAS 63100 — the cert evidence bundle records both."
            onSite="Default sites: garage, utility room (where building control accepts), plant room, external weatherproof enclosure. Habitable rooms generally not allowed. Lofts limited to specific conditions (accessibility, ventilation, manufacturer permission). When in doubt: check the manufacturer pack first, PAS 63100 second, local building control third."
          >
            <p>Typical UK 2025-26 siting decisions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Integral garage, wall-mounted</strong> — the
                most common UK 2025-26 location. Non-combustible backboard, manufacturer
                clearance, ventilation per the spec sheet. Customer keeps full vehicle
                access; BESS is out of the way
              </li>
              <li>
                <strong className="text-white">Utility room / plant room</strong> — common
                where there is no garage. Manufacturer clearance to washing machine /
                dryer / boiler often the constraining factor. Local building control may
                add comments
              </li>
              <li>
                <strong className="text-white">External enclosure</strong> — required where
                no internal space is available; manufacturer must explicitly support
                external siting (most LFP packs are IP rated for it but check). Add
                temperature management for UK winter (LFP loses ~10-15% capacity at 0 °C)
              </li>
              <li>
                <strong className="text-white">Loft</strong> — PAS 63100:2024 generally
                restrictive. Manufacturer permission usually required. Accessibility for
                service is a key constraint. Avoid where alternative sites exist
              </li>
              <li>
                <strong className="text-white">Habitable rooms</strong> — generally
                precluded. Customer who pushes for a bedroom / living-room BESS gets the
                PAS 63100 conversation early
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Non-dwelling siting follows the premises’ fire strategy"
            plainEnglish="Chapter 57 takes a different route for non-dwellings: location of stationary secondary batteries and the fire protection requirements shall be selected taking account of the fire strategy for the premises. The fire strategy (a document held by the building’s responsible person under the Regulatory Reform (Fire Safety) Order) drives BESS siting, suppression, separation and signage."
            onSite="Read the fire strategy before quoting. Where there is no fire strategy in place (small commercial), liaise with the fire and rescue service or a competent fire engineer to define one. Mounting a 50 kWh commercial BESS without engagement with the building’s fire strategy is a cert evidence bundle gap waiting to bite at the next EICR."
          >
            <p>Typical non-dwelling factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Workshop / industrial unit</strong> —
                BESS often sized 20-100 kWh; fire strategy usually allows external siting
                with appropriate separation, or internal in dedicated battery / plant
                room with active suppression
              </li>
              <li>
                <strong className="text-white">Office / retail</strong> — fire strategy
                typically restrictive on interior siting; external IP-rated enclosure on
                customer curtilage is the common answer
              </li>
              <li>
                <strong className="text-white">Multi-occupancy (flats with shared
                  services)</strong> — fire strategy frequently involves shared escape
                routes; BESS siting in any space affecting escape requires explicit
                fire-engineering sign-off
              </li>
              <li>
                <strong className="text-white">Agricultural</strong> — often externally
                sited; the fire strategy must account for stored fuels / chemicals
                nearby, with separation distances per BS EN IEC 62485 series
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — index into
                the fire strategy document, the suppression / separation arrangement, and
                any third-party fire engineer sign-off
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.3 — Protection against thermal effects (Chapter 57)"
            clause="Chapter 57 of BS 7671:2018+A4:2026 contains specific provisions for protection against the thermal effects of stationary secondary battery installations. Manufacturers’ instructions, PAS 63100:2024 (for dwellings) and the BS EN IEC 62485 series provide detailed compliance routes."
            meaning="Reg 570.6.3 is the regulatory home for siting-related thermal effects. The detailed numbers come from PAS 63100:2024 (dwellings), the fire strategy (non-dwellings) and the BS EN IEC 62485 series (general). Cert evidence bundle records: non-combustible backboard / mounting medium, manufacturer clearance distances, ventilation provision (per spec sheet OR per fire strategy), nearby combustibles and the management of them. Skipping this on a quote is a Code C1 / C2 finding at the next EICR."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Ventilation, thermal management and warning notices</ContentEyebrow>

          <Pullquote>
            Ventilation is set by the chemistry, the cabinet and the location. Not by guesswork.
          </Pullquote>

          <ConceptBlock
            title="Ventilation — chemistry-dependent, manufacturer-driven"
            plainEnglish="LFP cells are largely sealed and do not gas under normal operation — ventilation needs are modest, set by thermal management rather than gas dispersion. Lead-acid (legacy off-grid) flooded cells DO gas hydrogen during charge — ventilation needs are substantial and set by BS EN IEC 62485-2. The chemistry chosen back in Section 5.1 dictates the ventilation regime here."
            onSite="Read the manufacturer pack first. Most UK 2025-26 LFP units specify natural ventilation with X mm clearance above / below / either side; some larger commercial units specify forced ventilation. Lead-acid (rare in 2025-26 new install but live in legacy retrofit) needs forced ventilation per BS EN IEC 62485-2 and zone classification under DSEAR."
          >
            <p>Chemistry-by-chemistry ventilation profile:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">LFP (UK 2025-26 default)</strong> — natural
                ventilation per manufacturer clearance; thermal management is the binding
                constraint; no gassing hazard under normal operation
              </li>
              <li>
                <strong className="text-white">NMC</strong> — similar ventilation pattern
                to LFP under normal operation; higher thermal-runaway energy density
                means the spacing and fire-rated separation requirements tighten
              </li>
              <li>
                <strong className="text-white">Flooded lead-acid (legacy off-grid)</strong>
                — hydrogen gassing during charge requires forced ventilation per BS EN
                IEC 62485-2; DSEAR zone classification applies; spark-free
                lighting / switchgear in the zone
              </li>
              <li>
                <strong className="text-white">Sealed VRLA / gel</strong> — limited gassing
                under normal operation; natural ventilation usually adequate; manufacturer
                spec sheet drives the numbers
              </li>
              <li>
                <strong className="text-white">Reg 570.5.1(j) external influences</strong>
                — ambient temperature, humidity, corrosive atmospheres all factor in; UK
                garage installs in winter and rural agricultural sites in summer are the
                two common edges
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Warning notices — two distinct duties under Reg 570.6.8.201 and Reg 570.6.8.202"
            plainEnglish="The Chapter 57 regs require two notices on every BESS install. Reg 570.6.8.201 puts a notice at the consumer unit (or each DB) indicating the BESS presence and location — so the next electrician opening the CU knows there is a backfed source on site. Reg 570.6.8.202 puts a notice at every point of access to the BESS room or enclosure indicating that live parts may remain energized after isolation — so anyone opening the cabinet itself understands isolation doesn’t mean safe."
            onSite="Order the notices with the kit. They are cheap, regulatorily required, and an absent notice is a Code C2 finding at the next EICR. Reg 570.6.8.202 gives an example wording: ‘BATTERY - Live parts can remain energized after isolation’. Equivalent wording is accepted; use whatever the manufacturer pack ships unless it is materially different from the regulation example."
          >
            <p>Where each notice goes, exactly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 570.6.8.201</strong> — at the consumer
                unit / DB that the battery supplies. Where multiple DBs are involved,
                each gets its own notice. The notice indicates BESS presence AND location
                (so the next electrician knows where to find the kit and where to isolate)
              </li>
              <li>
                <strong className="text-white">Reg 570.6.8.202</strong> — at EVERY point
                of access to the battery room or enclosure. A garage wall BESS with
                front cover access: one notice. A battery room with two doors: two
                notices. Example wording from the regulation: "BATTERY - Live parts can
                remain energized after isolation"
              </li>
              <li>
                <strong className="text-white">Exception — fire strategy plans</strong>
                provide BESS locations to fire and rescue services and operational
                personnel: the location detail can be omitted from the warning notice
                under Reg 570.6.8.201 (the plans fulfil that requirement); the presence
                detail still required
              </li>
              <li>
                <strong className="text-white">Format</strong> — durable, weather-
                resistant if external; lettering legible under normal lighting at
                expected reading distance; manufacturer-supplied labels usually meet
                this
              </li>
              <li>
                <strong className="text-white">Documentation</strong> — cert evidence
                bundle records the notice positions with photographs at handover. A
                missing notice three years later is then traceable to a customer-removed
                event, not an install omission
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.8.202 — Permanent warning at points of access"
            clause="Each point of access to a battery room or each battery enclosure shall have a permanent warning notice indicating that live parts may still be energized after isolation. Example text: ‘BATTERY - Live parts can remain energized after isolation’."
            meaning="The Chapter 57 notice rule covers both battery ROOMS (dedicated rooms in commercial / industrial) and battery ENCLOSURES (the wall-mounted cabinet in a domestic garage). A single notice on the cabinet front covers a domestic wall-mounted BESS; a multi-door battery room needs a notice at each door. The notice text must communicate the hazard: isolation does not necessarily mean safe — internal cells stay live until manufacturer-defined safe-state procedures are run. Cert evidence bundle records notice positions with photographs."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Cabling, isolation and AC-side protection</ContentEyebrow>

          <ConceptBlock
            title="DC cabling — BS EN 50618 is the standard normally relied on"
            plainEnglish="Reg 570.6.4.202 covers DC single-core cable arrangements on a BESS install. A NOTE to the regulation indicates that cables to BS EN 50618 are considered appropriate. BS EN 50618 is the dedicated DC cable standard widely used for PV string cables and increasingly for BESS DC interconnects in the UK 2025-26 market — UV-resistant, double-insulated, designed for the DC fault profile."
            onSite="Pull manufacturer-supplied DC interconnects where available (most major brands include them in the pack). Where bespoke runs are needed, BS EN 50618 cable in conduit / trunking, segregated from AC routes (Section 5.5 segregation discipline), short and direct, with manufacturer torque on every termination."
          >
            <p>DC cable selection on a BESS install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Battery → PCE interconnect</strong> —
                manufacturer-supplied where possible; BS EN 50618 cable + manufacturer
                lugs + manufacturer torque where bespoke. Cross-section sized for
                worst-case DC current per the C-rate from Section 5.6
              </li>
              <li>
                <strong className="text-white">PV array → PCE DC</strong> — already
                covered by Section 712; BS EN 50618 is the typical choice. Reg 712.433.103
                covers the protection of PV array cable; the PV side of the DC bus
                follows Section 712 even on a BESS install
              </li>
              <li>
                <strong className="text-white">Routing</strong> — short, direct, in
                conduit / trunking, segregated from AC compartments (Section 5.5). Label
                every DC cable at both ends — function, polarity, voltage, isolator
                reference
              </li>
              <li>
                <strong className="text-white">Reg 570.6.1.2.1 — DC earthing</strong>
                permitted (not required) provided at least simple separation between AC
                and DC sides. Most modern hybrids are transformerless → no simple
                separation → DC NOT earthed; DC functional bonding per manufacturer
              </li>
              <li>
                <strong className="text-white">BS EN 13636 / BS EN 15112</strong>
                referenced (NOTE to Reg 570.6.1.2.2) for DC earth corrosion guidance
                where earthing IS done — typically lead-acid legacy systems with explicit
                separation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="AC-side RCD — Type B for transformerless inverters"
            plainEnglish="Reg 712.411.3.2.1.2 — where a PV / BESS power supply system does not provide at least simple separation between AC and DC sides (transformerless inverter, which is the UK 2025-26 default), the RCD used for fault protection shall be Type B to BS EN 62423. Type AC and Type A RCDs are blind to smooth DC fault current; only Type B detects the full fault profile a transformerless hybrid can produce."
            onSite="Read the inverter spec sheet for the separation status. Transformerless: Type B mandatory unless the manufacturer’s WRITTEN DECLARATION states the inverter cannot feed DC fault currents into the AC installation (the exception in 712.411.3.2.1.2). If invoking the exception, keep the declaration in the cert evidence bundle. Without it: Type B."
          >
            <p>The Type B reality:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cost</strong> — Type B is 3-5× more
                expensive than Type AC / A. This is a real budget line on the quote
              </li>
              <li>
                <strong className="text-white">Position</strong> — usually as a Type B
                RCBO on the dedicated CU way feeding the inverter’s AC port. Some
                installers fit a Type B main-incomer RCD; this is overkill for the
                BESS and creates cross-tripping risks for the rest of the install
              </li>
              <li>
                <strong className="text-white">Exception — manufacturer
                  declaration</strong> — some isolated-topology hybrids ship with a
                declaration that they cannot feed DC fault current; Type AC / A then
                allowed. Read the declaration carefully; KEEP it
              </li>
              <li>
                <strong className="text-white">EICR consequence</strong> — wrong RCD type
                on a transformerless hybrid without manufacturer declaration is a
                Code C2 (potential danger) finding. Common defect on retrofit installs
                where the original PV inverter was a small transformer-isolated unit
                and the new BESS hybrid is transformerless
              </li>
              <li>
                <strong className="text-white">Three-phase</strong> — same principle, 4-pole
                Type B RCD on three-phase hybrid inverters. Cost penalty larger;
                worth confirming manufacturer position on declaration at quote stage
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.411.3.2.1.2 — Type B RCD for transformerless inverters"
            clause="Where a solar PV power supply system does not provide at least simple separation between the AC and DC sides (such as where the inverter is transformerless), any RCD used to provide fault protection should be of Type B to BS EN 62423. The only exception is where it has been established, such as from a written declaration from the inverter manufacturer, that the inverter is so designed that it is not able to feed DC fault currents into the electrical installation."
            meaning="Most UK 2025-26 hybrid inverters are transformerless. Without simple separation, smooth DC fault currents can pass from the DC side to the AC side; only Type B RCDs (BS EN 62423) detect smooth DC. Type AC / A are blind to it. The exception requires the manufacturer’s written declaration that the inverter cannot feed DC faults — keep the declaration. Without it, Type B is mandatory; standard Type AC / A is a Code C2 EICR finding. Cert evidence bundle records the RCD type, the inverter model, and the manufacturer declaration if applicable."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Commissioning — Part 6 + BS EN IEC 62485 + BMS + baseline capacity</ContentEyebrow>

          <ConceptBlock
            title="Commissioning sequence on a UK 2025-26 BESS install"
            plainEnglish="Commissioning runs the install through the verification regime of BS 7671 Part 6, layered with the manufacturer’s DC commissioning per BS EN IEC 62485, plus BMS configuration, plus a baseline capacity test. The whole sequence takes 2-4 hours on a typical UK domestic install — separate from physical install time."
            onSite="Run the sequence in order. Skipping or reshuffling steps loses the diagnostic value of each. Document each step in the cert evidence bundle as you go — Part 6 schedule of test results, manufacturer commissioning checklist, BMS log first entries, baseline capacity test result."
          >
            <p>The canonical sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. Visual + dead-test</strong> — Part 6
                schedule of inspections walk-through; AC continuity (ring final
                continuity if applicable); IR test at 500 V DC on the AC final
                circuit (Reg 643.3.1 / .2 — 1 MΩ minimum per Table 64 for circuits up
                to 500 V)
              </li>
              <li>
                <strong className="text-white">2. Reg 643.3.3 follow-up</strong> — after
                connecting the inverter at the AC final-circuit termination, IR test
                at 250 V DC between live conductors and CPC, 1 MΩ minimum
              </li>
              <li>
                <strong className="text-white">3. Manufacturer DC commissioning</strong>
                — per the BESS / inverter pack. Typically: DC polarity check, DC
                voltage check at each port, manufacturer-defined DC IR procedure (NOT
                the same as Part 6 IR procedure on AC), torque verification with
                calibrated tool
              </li>
              <li>
                <strong className="text-white">4. BMS configuration</strong> — deep-
                discharge cut-off voltage, charge profile, discharge profile, comms
                link to inverter (Modbus / CAN), Wi-Fi to manufacturer cloud, time
                zone, tariff window (if applicable)
              </li>
              <li>
                <strong className="text-white">5. Baseline capacity test</strong> —
                full charge from grid (or AC supply if hybrid), then controlled
                discharge to manufacturer-defined end-state, with cell-level voltage
                logging via BMS. The Ah / kWh result is the BASELINE that future
                EICR capacity tests compare against
              </li>
              <li>
                <strong className="text-white">6. RCD tests</strong> — operate /
                trip-time test on the Type B RCD per Part 6 (Reg 643.7.1) — but use
                a Type B-capable RCD tester; some older test instruments only
                handle Type AC / A
              </li>
              <li>
                <strong className="text-white">7. Final SoR + customer
                  walkthrough</strong> — sign Schedule of Inspections + Schedule
                of Test Results; complete EIC; walk customer through the
                handover pack (next ConceptBlock)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The handover pack — what the customer keeps, what the installer keeps"
            plainEnglish="The handover pack is the install’s memory. Customer keeps a copy. Installer keeps a copy (cert evidence bundle). Next electrician opening the CU at year 5 reads the pack to understand what was done, what was tested and what the baseline numbers were — without that, the EICR is reconstruction from scratch."
            onSite="Treat the pack as a deliverable on the same level as the kit itself. A £15,000 PV+BESS install with no pack is a £15,000 install with no service spine — the customer suffers at the first fault, the installer suffers at the first EICR call-back."
          >
            <p>What goes into the pack:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Identity</strong> — manufacturer / model
                / chemistry / serial numbers of inverter and battery; nameplate kWh /
                usable kWh / delivered-to-loads kWh figures (Section 5.6)
              </li>
              <li>
                <strong className="text-white">Reg 570.5.1 rationale</strong> — the
                ten-factor walk-through with the customer’s actual figures,
                especially (d) generation profile, (e) coupling mode, (g) C-rate / DoD,
                (h) load profile + cycling target
              </li>
              <li>
                <strong className="text-white">Topology drawing</strong> — SLD showing
                the four families (Section 5.5) chosen here, with Reg 570.6.5.201
                isolator schedule and locations labelled
              </li>
              <li>
                <strong className="text-white">Protection picture</strong> — RCD type
                (Type B with reference to BS EN 62423, or Type AC / A with manufacturer
                declaration attached), CU way assignments, schedule of test results
                for Part 6
              </li>
              <li>
                <strong className="text-white">Commissioning results</strong> —
                manufacturer DC commissioning checklist signed; BMS configuration
                parameters (deep-discharge cut-off, charge / discharge profile);
                baseline capacity test result (the future-EICR-reference number)
              </li>
              <li>
                <strong className="text-white">Notices</strong> — Reg 570.6.8.201 (CU
                level) and Reg 570.6.8.202 (each point of access) positions, with
                handover-day photographs
              </li>
              <li>
                <strong className="text-white">Customer-facing</strong> — BMS app
                login credentials, manufacturer cloud account, warranty registration
                confirmation, EPS scope walkthrough (if EPS — which circuits work in
                island mode, which don’t), tariff (if applicable) and the
                charge / discharge schedule programmed
              </li>
              <li>
                <strong className="text-white">Index into bundle</strong> — Section
                712 PV pack (where PV present), Chapter 57 BESS pack, Chapter 82 PEI
                pack, fire strategy reference (non-dwellings)
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3 + Table 64 — IR tests on the AC final circuit"
            clause="Insulation resistance shall be measured (a) between live conductors and (b) between live conductors and the protective conductor connected to the earthing arrangement (Reg 643.3.1). Acceptance criteria per Table 64: SELV/PELV — 0.5 MΩ at 250 V DC; circuits up to and including 500 V (excluding SELV/PELV) — 1.0 MΩ at 500 V DC. After connection of equipment, a follow-up test at 250 V DC between live conductors and the protective conductor connected to the earthing arrangement shall reach at least 1 MΩ (Reg 643.3.3)."
            meaning="The Part 6 IR tests apply to the AC final circuit on a BESS install — the run from the consumer unit to the inverter AC terminals. 500 V DC test, 1 MΩ minimum. Follow-up at 250 V after connecting the inverter, 1 MΩ minimum. The DC SIDE of the BESS install has its own commissioning procedure per the manufacturer (referenced to BS EN IEC 62485) — Part 6 does not directly cover the manufacturer-controlled DC interconnects. Cert evidence bundle records both AC IR (Part 6 SoR) and manufacturer DC commissioning results separately."
          />

          <InlineCheck {...inlineChecks[3]} />

          <DiagramPlaceholder
            caption="BESS commissioning sequence flowchart — 7 ordered steps from left to right. Step 1: Visual + dead-test + AC IR (Reg 643.3 — 500 V DC, 1 MΩ). Step 2: Post-connection 250 V IR (Reg 643.3.3 — 1 MΩ). Step 3: Manufacturer DC commissioning (polarity, voltage, DC IR per BS EN IEC 62485). Step 4: BMS config (DoD cut-off, charge/discharge profile, comms). Step 5: Baseline capacity test (the EICR-reference number). Step 6: Type B RCD operate/trip-time test (Reg 643.7.1). Step 7: SoR + EIC + customer walkthrough. Annotation: each step has a cert evidence bundle deliverable."
            filename="renewable/m5s7-commissioning-flow.png"
          />

          <SectionRule />

          <Scenario
            title="Full commissioning day — new-build hybrid + EPS install"
            situation="New 5 kWp PV + 9.5 kWh GivEnergy hybrid + 10 kWh LFP install on a midlands new-build. Topology: hybrid + EPS variant (Section 5.5 scenario). All kit on site, installed by 11:00. Customer is at home for handover at 16:00. Type B RCD already fitted in the CU as part of the install."
            whatToDo="Run the canonical sequence. (1) Visual inspection per Part 6, schedule of inspections walk-through, AC continuity, IR test at 500 V on the new CU way feeding the hybrid AC port — measure 1.6 MΩ live-to-CPC, well above the 1 MΩ Table 64 minimum. (2) Connect the hybrid AC at the terminal, Reg 643.3.3 follow-up at 250 V — measure 1.8 MΩ, pass. (3) Manufacturer DC commissioning per GivEnergy pack: DC polarity check on PV strings (one string reversed — re-strap with manufacturer cable + lugs), DC IR procedure per GivEnergy manual (not Part 6 — manufacturer-defined), torque check on every DC termination with calibrated wrench. (4) BMS config via app: 80% DoD cut-off, Octopus Flux profile (charge 02:00-05:00, discharge 16:00-19:00), comms paired. (5) Baseline capacity test: full charge from PV + grid, controlled discharge to manufacturer cut-off, log 7.4 kWh delivered — record as baseline for future EICR comparison. (6) Type B RCD test with Megger MFT1731 (Type B capable) — 24 ms trip time at IΔn, pass. (7) Schedule of test results signed, EIC issued, customer walkthrough at 16:00 — app credentials handed over, EPS scope demonstrated (which circuits work during outage), warning notices photographed for cert evidence bundle. Total commissioning time: ~3 hours."
            whyItMatters="The canonical sequence is reproducible and defensible. Each step has its own cert evidence bundle deliverable, so the next EICR can pick up the install at year 5 without reconstruction. The baseline capacity test (7.4 kWh delivered) is the reference number for the next 5 years of EICR capacity checks — without it, the next inspector measures 6.8 kWh and has no idea whether that is acceptable degradation or a fault. The Type B RCD test demands a Type B-capable instrument; older Megger MFT1502 / MFT1721 do NOT support Type B trip-time tests and would silently miss the requirement."
          />

          <Scenario
            title="Retrofit commissioning — AC-coupled battery added to a 2018 PV site"
            situation="Customer site has a 2018 4 kWp PV + Solis 4G string inverter, working fine. Now adding a 9.5 kWh GivEnergy AC3 + LFP battery on the AC side (Section 5.5 AC-coupled scenario). PV side stays untouched; the install is the new battery inverter + battery + new CU way."
            whatToDo="Commissioning scoped to the NEW install only. (1) Visual + IR at 500 V on the new CU way to the AC3 battery inverter — measure 2.1 MΩ live-to-CPC, pass. (2) Connect AC3, Reg 643.3.3 follow-up — measure 1.9 MΩ, pass. (3) Manufacturer DC commissioning on the battery-to-inverter interconnect: polarity, voltage, torque. (4) BMS config: 80% DoD, Octopus Flux profile, paired to GivEnergy cloud. (5) Baseline capacity test: 7.4 kWh delivered. (6) RCD test: AC3 is transformerless → confirm Type B RCD on the new CU way (already fitted), trip-time test. (7) SoR + EIC for the NEW work; the existing PV install’s EIC remains valid (it was issued in 2018). Cert evidence bundle indexes BOTH the new install pack AND points to the location of the original 2018 PV pack."
            whyItMatters="Retrofit commissioning has a narrower scope — only the new work needs its own EIC. The existing PV install’s certification stays valid. The cert evidence bundle becomes a layered structure: 2018 PV pack at the bottom, 2025 BESS pack on top, indexed so the next electrician can see both. Future EICR (Section 5.8) checks the whole site — the layered packs give them a clean entry point."
          />

          <CommonMistake
            title="Mounting the BESS on a combustible backboard or directly on plasterboard"
            whatHappens="Installer mounts a 9.5 kWh LFP wall-unit directly on the customer’s plasterboard wall in the utility room, with no non-combustible backboard and no clearance to combustibles. PAS 63100:2024 violated; Reg 570.6.3 (thermal effects) violated; first EICR at year 5 flags Code C2 (potential danger). Customer pays for remedial work — backboard fitted retrospectively means the BESS is taken offline for a day, re-commissioned, baseline capacity re-tested."
            doInstead="Read the manufacturer pack BEFORE quoting. Specify the non-combustible backboard (cement-board, steel-faced, or manufacturer-supplied bracket plate), the manufacturer clearance (typically 100-300 mm above, 100-300 mm below, 50-150 mm either side), and the route for the manufacturer-supplied cables. Cert evidence bundle records the backboard material and clearance measurements with photographs at handover. PAS 63100 / Reg 570.6.3 satisfied; no future EICR remediation."
          />

          <CommonMistake
            title="Standard Type AC RCD on a transformerless hybrid install"
            whatHappens="Installer fits a 9.5 kWh hybrid (transformerless) on a budget retrofit and uses the existing Type AC RCBO on the spare CU way to save the £200 cost of a Type B unit. Reg 712.411.3.2.1.2 violated; first EICR flags Code C2; customer pays for the Type B RCD AND the time to swap it. Installer reputation takes the hit."
            doInstead="Confirm the inverter’s separation status at quote stage. Transformerless without manufacturer declaration: budget for Type B. Transformer-isolated OR transformerless with manufacturer declaration: Type AC / A acceptable, declaration attached to cert evidence bundle. The £200 RCD difference at quote stage is far cheaper than the £500 remediation cost three years later, plus the customer trust loss."
          />

          <CommonMistake
            title="Skipping the baseline capacity test on the handover day"
            whatHappens="Installer commissions the BESS, signs the EIC, and leaves without running the baseline capacity test &mdash; &lsquo;the manufacturer will record it from the BMS log automatically&rsquo;. Year-5 EICR measures 7.1 kWh delivered. No baseline. Customer asks &lsquo;is that good or bad?&rsquo;. Inspector says &lsquo;don’t know &mdash; depends on what it started at&rsquo;. Customer disappointed; cert evidence bundle gap visible."
            doInstead="Run the baseline test. 30-60 minutes of charge time, 30-60 minutes of controlled discharge, BMS-logged. Record the delivered kWh as the BASELINE. Five years later, the year-5 number is meaningful (e.g. 7.4 → 7.1 = 4% fade over 5 years, well within LFP norms — pass with note). Without the baseline, the year-5 reading is unmoored. Cert evidence bundle records the baseline as a numeric value with the test conditions (ambient temperature, BMS firmware version, manufacturer-defined test procedure reference)."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Dwelling siting → PAS 63100:2024 + manufacturer instructions. Non-dwelling siting → premises’ fire strategy. Both routes satisfy Reg 570.6.3 (thermal effects) and Reg 570.5.1(j) (external influences).',
              'Default UK 2025-26 install locations: garage, utility room, plant room, external enclosure. Habitable rooms generally precluded; lofts limited.',
              'Non-combustible backboard + manufacturer clearance to combustibles + ventilation per the spec sheet. The pack ships with the numbers — use them, don’t guess.',
              'Ventilation profile depends on chemistry. LFP — natural ventilation, thermal management binding. Flooded lead-acid — forced ventilation per BS EN IEC 62485-2 + DSEAR zoning. Sealed VRLA / gel — natural usually adequate.',
              'DC cables to BS EN 50618 (NOTE to Reg 570.6.4.202). Manufacturer-supplied interconnects where available. Segregation from AC (Section 5.5 discipline). Manufacturer torque on every termination.',
              'Reg 570.6.5.201 — isolation on every external power port of the PCE. Hybrid with separate battery = 4 external isolators (PV DC + battery DC + AC grid + AC EPS).',
              'Reg 712.411.3.2.1.2 — Type B RCD (BS EN 62423) on AC side for transformerless inverter without simple separation. Exception requires manufacturer written declaration; keep it in the cert evidence bundle.',
              'Two warning notices required. Reg 570.6.8.201 at the CU / DB. Reg 570.6.8.202 at each point of access to the BESS enclosure: example wording "BATTERY - Live parts can remain energized after isolation".',
              'Commissioning sequence: (1) Visual + AC IR (Reg 643.3 — 500 V, 1 MΩ); (2) Post-connection 250 V follow-up (1 MΩ); (3) Manufacturer DC commissioning per BS EN IEC 62485; (4) BMS config; (5) Baseline capacity test; (6) Type B RCD trip-time test; (7) SoR + EIC + customer walkthrough.',
              'Baseline capacity test is the future-EICR-reference number. Without it, the year-5 EICR capacity measurement is unmoored. Run it on handover day. Cert evidence bundle records the value AND the test conditions.',
              'Handover pack = identity + selection rationale + topology drawing + protection picture + commissioning results + notice positions + customer-facing credentials + index into Section 712 / Chapter 57 / Chapter 82 packs. Customer keeps a copy; installer keeps a copy.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-5-section-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Sizing & energy modelling
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.8 Periodic inspection, faults & end-of-life
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
