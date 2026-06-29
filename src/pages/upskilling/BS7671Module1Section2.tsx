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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'bs7671-voltage-range',
    question: 'What voltage range does BS 7671:2018+A4:2026 apply to (per Reg 110.1.1)?',
    options: [
      'Up to 1000 V AC and 1500 V DC nominal',
      'Up to 400 V AC only',
      'Up to 230 V AC for dwellings, 400 V for industrial',
      'Anything below grid supply voltage',
    ],
    correctIndex: 0,
    explanation:
      'Reg 110.1.1 sets the upper bound at 1000 V AC and 1500 V DC. Above that you are in HV territory and BS 7671 does not apply directly — different competency, different standards (e.g. BS EN 61936-1, ENA G81). LV installations supplied from HV systems are within scope.',
  },
  {
    id: 'bs7671-out-of-scope',
    question:
      'A client asks you to certify the LV control wiring inside a CNC machine on a factory floor. What applies?',
    options: [
      'BS 7671 throughout — the whole machine is a fixed installation',
      "BS 7671 to the machine's isolator; BS EN 60204-1 for the wiring inside the machine",
      "Only the manufacturer's instructions and supplied wiring diagrams",
      'BS 7671 plus PUWER 1998 for the complete machine assembly',
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 covers the fixed installation up to the machine's isolator (the supply-end demarcation). Inside the machine — control panel, sensors, motors — the applicable standard is BS EN 60204-1 (Safety of machinery — electrical equipment of machines). Treating the machine internals as a BS 7671 install is a common confusion that produces the wrong test regime.",
  },
  {
    id: 'bs7671-special-locations',
    question:
      'Where Part 7 (Special installations or locations) gives a more stringent requirement than the general regulations, which applies?',
    options: [
      'The general regulations — they always form the governing baseline',
      'The Part 7 requirement — it supplements or modifies the general regulations',
      'Both apply equally — you pick whichever is cheaper to install',
      'Neither — Part 7 is informative guidance only, not normative',
    ],
    correctIndex: 1,
    explanation:
      'Reg 110.1.3 makes the relationship explicit: Part 7 supplements or modifies the general regulations. Where a Part 7 requirement is more stringent (e.g. zone-based bonding in 701, RCD requirements in 722 EV charging) it overrides. Where Part 7 is silent, the general regulations apply.',
  },
  {
    id: 'bs7671-lightning-boundary',
    question:
      'A new commercial unit has a structural lightning protection system (LPS) on the roof. Where does BS 7671 stop and BS EN 62305 take over?',
    options: [
      'BS 7671 covers the LPS in full — air terminations, down conductors and earth electrodes',
      'BS EN 62305 covers the LPS; BS 7671 covers the bonding interface to the installation MET',
      'BS 7671 covers only the air terminations; BS EN 62305 covers everything below roof level',
      'Neither standard applies to the LPS — it sits under Part L of the Building Regulations',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62305 governs the lightning protection system itself: risk assessment, air terminations, down conductors, earth termination network. BS 7671 (Reg 541.1 cross-reference) only covers the equipotential bonding between the LPS earth termination and the installation main earthing terminal. Mistaking the boundary leads to either uncertified LPS work or a BS 7671 EIC that overstates scope.',
  },
  {
    id: 'bs7671-poe-section-716',
    question:
      "A4:2026 introduced Section 716 to bring Power over Ethernet inside BS 7671's framework. What is the practical effect on certification?",
    options: [
      'Nothing — PoE remains data cabling and outside the scope of certification',
      'PoE distribution is now a BS 7671 install requiring design, erection, verification and a cert',
      'Only PoE++ (Type 4) installations are in scope — Type 1 and Type 2 remain exempt',
      'Section 716 applies to PoE lighting only; cameras and access points stay out of scope',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 closed the long-standing PoE grey zone. Section 716 sits in Part 7 alongside the other special-locations sections. The BS 7671 design / erection / verification framework wraps the install; BS EN 50173-1 covers the structured cabling and BS EN IEC 62368-3 covers the power-feeding sourcing equipment. From 15 April 2026, a PoE distribution without a BS 7671 cert is a documented non-compliance.',
  },
  {
    id: 'bs7671-pv-mcs-boundary',
    question:
      'On a domestic solar PV install, where does BS 7671 Section 712 end and the MCS scheme rules begin?',
    options: [
      'BS 7671 covers everything; MCS is purely commercial handover paperwork',
      'Section 712 covers the fixed install to the inverter AC isolator; MCS and BS EN 62446 do commissioning',
      'MCS scheme rules cover the entire install; BS 7671 Section 712 is informative only',
      'Section 712 applies to the DC side only; the AC side is governed by Section 826',
    ],
    correctIndex: 1,
    explanation:
      'Section 712 is the BS 7671 home for solar PV — both AC and DC fixed installation up to and including the inverter AC isolator. MCS scheme rules (and BS EN 62446 for grid-connected PV verification) govern panel-string commissioning, performance documentation and the MCS certificate the customer needs for FIT/SEG payments. Both apply on the same job; neither replaces the other.',
  },
  {
    id: 'bs7671-chapter-81-energy',
    question:
      'A4:2026 promoted the energy-efficiency content from the deleted informative Appendix 17 to a new normative chapter. Which chapter is it, and what does it reference?',
    options: [
      'Chapter 14 — references the Building Regulations Part L only',
      'Chapter 57 — references BS EN 50171 for central power supplies',
      'Chapter 81 (Part 8) — references the Building Regulations and BS HD 60364-8-1:2019',
      'Chapter 41 — references the IET On-Site Guide for energy efficiency',
    ],
    correctIndex: 2,
    explanation:
      'A4:2026 deleted the informative Appendix 17 and promoted the energy-efficiency content to Chapter 81 in Part 8 (functional aspects). The chapter is normative — part of BS 7671 — but refers the reader out to the Building Regulations and BS HD 60364-8-1:2019 for the detailed efficiency requirements. Chapter 57 (also new in A4) covers stationary secondary batteries.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of these installations is OUTSIDE the scope of BS 7671:2018+A4:2026?',
    options: [
      'The 11 kV switchgear at a factory main intake',
      'A 400 V three-phase commercial bakery oven supply',
      'A 230 V kitchen ring final circuit in a dwelling',
      'A marina shore supply pedestal under Section 709',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 110.1.1 caps the scope at 1000 V AC / 1500 V DC nominal. The 11 kV switchgear is HV — outside BS 7671. The bakery oven supply (LV), domestic ring (LV), and marina shore supply (covered explicitly by Section 709) are all in scope.',
  },
  {
    id: 2,
    question:
      'You are designing power feeds to a passenger lift in a commercial building. Where does BS 7671 stop and the lift standard take over?',
    options: [
      'BS 7671 covers the entire lift system end-to-end including the drive',
      'BS EN 81 covers everything from the LV switchboard in the building onwards',
      'PUWER 1998 supersedes both standards for the complete lift installation',
      'BS 7671 covers the supply to the lift isolator; BS EN 81-20/-50 covers the lift',
    ],
    correctAnswer: 3,
    explanation:
      "The fixed installation (sub-main, isolator, distribution to the machine room) is BS 7671. Inside the lift — drive, controller, traction motor, car wiring — the standard is BS EN 81-20 / -50. The handover point is the lift's dedicated isolator. Section 729 (operating and maintenance gangways) may also apply to access routes around the machinery.",
  },
  {
    id: 3,
    question:
      'A4:2026 introduced a new Section 716 — Power over Ethernet. Where does this sit in the BS 7671 scope hierarchy?',
    options: [
      'It supersedes BS 7671 for any data installation',
      'It only applies to gigabit-rated cabling',
      'It is a Part 7 special location section that supplements the general regulations for ELV DC distribution over balanced data cabling',
      'It defers entirely to BS EN 50173-1',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 introduced Section 716 to bring PoE within the BS 7671 framework. It supplements the general regulations (Reg 110.1.3 mechanism) and references BS EN 50173-1 for cabling and BS EN IEC 62368-3 for the power-feeding sourcing equipment, but the BS 7671 design / erection / verification framework still wraps the install. PoE installations now have a normative home.',
  },
  {
    id: 4,
    question:
      'You are commissioning a 7 kW domestic EV charge point. The BS 7671 Section 722 install is complete; what does Section 722 NOT cover, and which standard fills the gap?',
    options: [
      'Section 722 covers everything on an EV install — no other standard applies',
      "It excludes the charger's internal electronics and the vehicle coupler; BS EN 61851 covers those",
      'It excludes the supply cable from the consumer unit; BS EN 50620 fills that gap',
      'It excludes the protective bonding of the charger; Section 411 fills that gap',
    ],
    correctAnswer: 1,
    explanation:
      "Section 722 governs the BS 7671 fixed-side install — supply cable, OPDs, RCD additional protection (Reg 411.3.3 and the EV-specific 722.531.3.101 / 722.411 rules), and the open-PEN protection where applicable on TN-C-S. The charger's own electronics and the vehicle coupler are governed by BS EN 61851 / BS EN IEC 61851. Both apply on the same job; the EIC names the BS 7671 boundary explicitly.",
  },
  {
    id: 5,
    question:
      'A factory has a small Zone 2 hazardous area around a solvent dispense bay. Inside the zone, what governs the electrical installation, and where does BS 7671 still apply?',
    options: [
      'BS EN 60079 governs the in-zone install; BS 7671 applies on the safe-area side of the boundary',
      'BS 7671 governs the Zone 2 install in full, including in-zone equipment selection',
      'BS EN 60204-1 governs the Zone 2 install as if it were machinery wiring',
      'Neither BS 7671 nor BS EN 60079 applies — only the duties under DSEAR 2002',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 110.2 excludes hazardous-area installations from the general scope of BS 7671. Inside Zone 0/1/2 (gas) or Zone 20/21/22 (dust), the BS EN 60079 series governs equipment selection (Ex-rating, certification, marking) and installation method (60079-14). BS 7671 still applies on the safe-area side of any boundary panel; equipment that crosses the boundary must satisfy both standards.',
  },
  {
    id: 6,
    question:
      'Reg 110.1.3 sets out how Part 7 (Special installations or locations) interacts with Parts 1–6. Which statement is correct?',
    options: [
      'Part 7 entirely replaces Parts 1–6 within any special location',
      'Part 7 is informative only and can never override Parts 1–6',
      'Part 7 applies only if the designer chooses to invoke it on the job',
      'Part 7 supplements or modifies Parts 1–6, with the more stringent requirement winning',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 110.1.3 is explicit: Part 7 supplements or modifies the general regulations of Parts 1–6. On a special location (bathroom, EV charging point, marina, medical, PoE under A4), check Part 7 first. Where Part 7 is more stringent (e.g. zone-based bonding in 701, EV PEN prohibition in 722.312.2.1) it overrides. Where Part 7 is silent, the general regulations apply.',
  },
  {
    id: 7,
    question:
      'A4:2026 introduced new Chapter 57 — Stationary secondary batteries. Which type of battery installation is EXCLUDED from Chapter 57?',
    options: [
      'A residential PV-plus-battery hybrid storage system',
      'A grid-tied BESS installed at a commercial site',
      'Batteries inside a UPS or central emergency supply covered by its own product standard',
      'An off-grid hybrid storage system installed on a farm',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 57 covers stationary battery installations as electrical installations in their own right — BESS, PV+battery, off-grid hybrid. It explicitly excludes batteries that sit inside equipment covered by its own product safety standard, such as UPSs (BS EN 62040) and central emergency-lighting power supplies (BS EN 50171). Those continue to be covered by their product standards rather than Chapter 57.',
  },
  {
    id: 8,
    question:
      'Your client wants a written summary on the EIC of "where BS 7671 applies and where it stops" for a packaged industrial drive. What is the cleanest way to phrase it?',
    options: [
      '"Inspected and tested under BS 7671 throughout, including the drive; manufacturer warranty applies to the unit."',
      '"Inspected under BS 7671:2018+A4:2026 to the dedicated isolator; equipment beyond declared to BS EN 60204-1."',
      '"BS 7671 does not apply to this packaged drive — refer entirely to the manufacturer\'s installation manual."',
      '"All wiring inspected and tested to BS 7671 and found satisfactory; no boundary applies."',
    ],
    correctAnswer: 1,
    explanation:
      'Naming the boundary protects the contractor and informs the duty-holder. The cleanest pattern: state the BS 7671 edition, name the handover point (the dedicated isolator), and reference the equipment standard that governs internals (BS EN 60204-1 for machinery, BS EN 81-20 for lifts, BS EN 61851 for EV chargers, BS EN 60079 for hazardous-area equipment). The same template scales across packaged-equipment scenarios.',
  },
];

const faqs = [
  {
    question: 'Does BS 7671 cover lightning protection?',
    answer:
      "Only the bonding interface. Reg 541.1 cross-references BS EN 62305 for the design of the lightning protection system itself; BS 7671 covers the protective bonding to the lightning protection system's earth termination. The LPS design, air terminations, down conductors and earth electrodes are BS EN 62305 territory, requiring a competent person under that standard.",
  },
  {
    question: 'Can BS 7671 work alongside other standards?',
    answer:
      "Yes — and frequently has to. Machinery installations sit BS 7671 + BS EN 60204-1 (machine internals). EV chargers sit BS 7671 Section 722 + manufacturer's installation manual + BS EN 61851. Solar PV sits Section 712 + MCS scheme rules + BS EN 62446. The general principle: BS 7671 governs the fixed installation up to the equipment terminal; the equipment standard governs internals. Where both apply, the more restrictive requirement wins.",
  },
  {
    question:
      'A4:2026 introduced new Chapter 81 (Energy efficiency). Is that within scope or merely a reference?',
    answer:
      "Chapter 81 is normative — it sits inside the standard. It refers the reader out to the Building Regulations and to BS HD 60364-8-1:2019 for detailed requirements, but the chapter itself is part of BS 7671's functional-aspects scope. A4 deleted the previous Appendix 17 (which was informative) and promoted the energy-efficiency content to a chapter.",
  },
  {
    question:
      'What about explosive atmospheres — does BS 7671 still apply on ATEX-classified sites?',
    answer:
      'BS 7671 explicitly excludes installations in hazardous zones from its general scope (Reg 110.2). For Zone 0/1/2 gas atmospheres or Zone 20/21/22 dust atmospheres, the BS EN 60079 series applies. BS 7671 still covers the safe-area side of any boundary panel and, where the installation passes through a hazardous zone, the equipment must be selected under the BS EN 60079 framework.',
  },
  {
    question: 'Is Section 716 (PoE) only for PoE lighting, or all PoE distribution?',
    answer:
      "All PoE distribution. Section 716 sits across the family — cameras, access points, lighting, displays, sensors, building-management endpoints. The trigger isn't the load type, it's the distribution method: ELV DC carried over balanced data cabling. Once the install relies on that distribution model, Section 716 applies, and design / erection / verification flow through BS 7671 with BS EN 50173-1 and BS EN IEC 62368-3 referenced for cabling and source equipment.",
  },
  {
    question:
      'A customer points to their old Appendix 17 (energy efficiency) on a 2018 cert. Is that still valid post-A4?',
    answer:
      "Appendix 17 was deleted by A4:2026 — the energy-efficiency content was promoted to the normative Chapter 81. A pre-A4 cert that referenced Appendix 17 isn't invalidated retroactively (it was issued under the in-force edition at the time), but new design / new certification under BS 7671:2018+A4:2026 references Chapter 81 in Part 8 instead. On an EICR of a property with pre-A4 work, it's reported as a deviation from the current edition rather than a defect.",
  },
  {
    question:
      'Does BS 7671 apply to a portable building, mobile cabin or shipping-container office?',
    answer:
      'Yes — Reg 110.1.2 lists "mobile or transportable units" in the categories of installation covered. The fixed installation inside the unit is BS 7671. The supply to the unit (caravan-style hook-up or hard-wired distribution) is also BS 7671, with Section 717 covering mobile or transportable units specifically. Equipment internals (HVAC unit, packaged drives) still hand over to their respective equipment standards in the usual way.',
  },
  {
    question:
      'How do I cite the BS 7671 / equipment-standard boundary on the EIC schedule of inspection?',
    answer:
      "Name the edition, the handover point and the equipment standard. A defensible cert entry reads: 'Inspected and tested under BS 7671:2018+A4:2026 up to the dedicated isolator at [location]. Equipment beyond the isolator was supplied as a packaged unit declared to [BS EN 60204-1 / BS EN 81-20 / BS EN 61851 / BS EN 60079-14], manufacturer's declaration of conformity referenced.' Generic phrasing like 'inspected throughout' overstates scope and creates liability risk.",
  },
  {
    question:
      'I am asked to certify the wiring inside a packaged container BESS to Chapter 57. What scope of work am I taking on?',
    answer:
      "Read carefully. Chapter 57 covers stationary battery installations as installations — site-side cabling, AC/DC switchgear, protection, ventilation, signage, the BESS-to-installation interface. Inside a packaged container BESS that has its own product safety standard (e.g. BS EN IEC 62619 cells, BS EN IEC 62933 system) the internal cabinetry is the manufacturer's responsibility. Treat the BESS like a packaged machine: BS 7671 / Chapter 57 to the BESS isolators; manufacturer's product-standard documentation for internals.",
  },
  {
    question:
      "I'm working on a defence / military site. Does BS 7671 apply, or is there a separate standard?",
    answer:
      'Defence sites are a mixed picture. The general BS 7671 framework applies to fixed LV installations on the estate (offices, accommodation, workshops, technical buildings) just like any other commercial site. Specialised systems (weapons, communications, simulators, hazardous-process facilities) often sit under Defence Standards (DEFSTANs) or NATO STANAGs that take precedence. The pattern matches the rest of this section: BS 7671 covers the fixed installation up to the equipment isolator; the relevant DEFSTAN or sector standard governs the equipment. Where MOD client requirements override BS 7671 (e.g. EMP-hardened bonding rules, classified-area screening), document the override on the cert with a reference to the controlling document.',
  },
  {
    question:
      'Where do I find the authoritative list of Reg 110.1.2 categories so I can confirm whether my install is covered?',
    answer:
      'Reg 110.1.2 in BS 7671:2018+A4:2026 itself — published by the IET / BSI. The list is non-exhaustive but covers: residential, commercial, public, industrial, agricultural and horticultural, prefabricated, caravans and caravan parks, marinas and similar locations, construction and demolition sites, exhibitions / shows / stands, fairgrounds / amusement parks / circuses, medical locations, mobile or transportable units, photovoltaic systems, low-voltage generating sets and (new under A4) PoE systems via Section 716. The Guidance Note 1 (Selection and Erection) expands each category with practical examples. If your install fits the spirit of one of these categories, BS 7671 applies; if it sits outside (HV switchgear, machinery internals, lifts, vehicles, hazardous areas, ships, aircraft) the corresponding equipment / sector standard applies.',
  },
];

export default function BS7671Module1Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'Scope and Application of BS 7671:2018+A4:2026 | Module 1.2',
    description:
      'Where BS 7671:2018+A4:2026 applies (Reg 110), where it stops, how it interacts with BS EN 60204-1, BS EN 81, BS EN 60079 and BS EN 62305 — plus the scope implications of A4 Section 716 (PoE) and Chapter 81.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · Updated for A4:2026"
            title="Scope and application of BS 7671"
            description="Where BS 7671:2018+A4:2026 applies, where it stops, and how it interacts with the equipment / machinery / hazardous-area standards that bracket it."
            actions={
              <>
                <RegBadge>110.1.1</RegBadge>
                <RegBadge>110.1.3</RegBadge>
                <RegBadge>110.2</RegBadge>
                <AmendmentBadge regs={['Section 716', 'Chapter 57', 'Chapter 81']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 applies to LV electrical installations: up to 1000 V AC / 1500 V DC nominal (Reg 110.1.1). Above that is HV — different standards.',
              'It covers the fixed installation. Equipment internals, machinery wiring, lift drives, vehicles and explosive atmospheres are scoped out and handled by their own standards.',
              'Part 7 (Special installations or locations) supplements or modifies the general regulations — the more stringent requirement applies on a special location.',
              'A4:2026 expanded scope: new Section 716 (Power over Ethernet) and new Chapter 81 (Energy efficiency, replacing the deleted informative Appendix 17).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS 7671 voltage ceiling (Reg 110.1.1) and identify whether a given installation is in or out of scope on voltage alone.',
              'Identify the equipment-internals handover boundaries — machinery (BS EN 60204-1), lifts (BS EN 81-20/-50), EV charge points (BS EN 61851), PV inverters (Section 712 + MCS), explosive atmospheres (BS EN 60079), lightning protection (BS EN 62305).',
              'Apply Reg 110.1.3 to a Part 7 / Parts 1–6 conflict and select the more stringent requirement on a special location.',
              'Recognise the new A4:2026 special-location coverage — Section 716 (PoE), Chapter 57 (stationary batteries), Chapter 81 (energy efficiency) — and place each in the BS 7671 framework.',
              'Write a cert that names the boundary correctly: inspected under BS 7671 up to the dedicated isolator, with equipment beyond covered by the relevant BS EN.',
              'Walk a four-step decision tree on every new install: voltage in scope? installation type in Reg 110.1.2 categories? special-location section applies? equipment-internals standard handover named on the cert?',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What is in scope</ContentEyebrow>

          <ConceptBlock
            title="What is in scope"
            plainEnglish="The fixed wiring of buildings and outdoor structures, plus the supply circuits to fixed and portable equipment, up to LV."
            onSite="If you can isolate it at a fuse, RCBO or local isolator on a building's distribution board, it is almost certainly in scope. Once you cross into the equipment behind that isolator, the equipment standard takes over."
          >
            <p>
              <RegBadge>Reg 110.1.1</RegBadge> sets the voltage ceiling at 1000 V AC or 1500 V DC
              nominal. <RegBadge>Reg 110.1.2</RegBadge> lists the categories of installation
              covered: residential, commercial, public, industrial, agricultural, prefabricated,
              caravan parks, marinas, construction sites, exhibitions, fairgrounds, medical
              locations, mobile or transportable units, photovoltaic, low-voltage generating sets.
            </p>
            <p>
              The list is not exhaustive but it shows the intent — fixed installations forming part
              of the built environment, including outdoor and temporary structures with defined
              supply infrastructure. Most things an electrician installs day-to-day fall inside this
              list.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What is out of scope</ContentEyebrow>

          <ConceptBlock
            title="What is out of scope"
            onSite="The handover boundaries below are the ones tested in court — get them wrong and you have either over-certified work that wasn't yours or under-certified work that was."
          >
            <p>
              <RegBadge>Reg 110.2</RegBadge> exclusions and the practical handover points:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">Distribution-network operator equipment</strong> —
                anything supply-side of the consumer&apos;s cut-out (the DNO&apos;s service head and
                meter tails up to the meter) is the DNO&apos;s responsibility, not yours.
              </li>
              <li>
                <strong className="text-white">Railway traction systems and rolling stock</strong> —
                governed by railway-specific standards.
              </li>
              <li>
                <strong className="text-white">Aircraft and ships at sea</strong> — separate
                aerospace and marine standards.
              </li>
              <li>
                <strong className="text-white">Vehicle electrical systems</strong> — automotive
                standards apply. Note: vehicle <em>charging infrastructure</em> on the building side
                is in scope under Section 722.
              </li>
              <li>
                <strong className="text-white">Hazardous-area installations</strong> — BS EN 60079
                series for ATEX zones. BS 7671 covers the safe-area side of any boundary.
              </li>
              <li>
                <strong className="text-white">Lightning protection systems</strong> — BS EN 62305.
                BS 7671 covers the bonding interface only.
              </li>
              <li>
                <strong className="text-white">Lifts</strong> — BS EN 81-20 / -50 for the lift
                itself. BS 7671 covers the supply up to the lift&apos;s isolator.
              </li>
              <li>
                <strong className="text-white">Machine internals</strong> — BS EN 60204-1. BS 7671
                covers the supply up to the machine&apos;s isolator.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.1.3"
            clause="Part 7 of the regulations supplements or modifies the general regulations contained in Parts 1 to 6 inclusive. The provisions of Part 7 apply in addition to, or in modification of, the requirements of the other Parts."
            meaning="On a special location, do not apply Parts 1–6 alone. Read Part 7 first; the section either adds requirements (zone bonding in a bathroom) or modifies them (RCD currents in 722 EV charging). The more stringent provision wins."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Where BS 7671 hands over</ContentEyebrow>

          <ConceptBlock
            title="Boundary patterns: where BS 7671 hands over"
            onSite="When you write the EIC, the schedule of items inspected stops at the handover point. Going further produces a cert that overstates your responsibility."
          >
            <p>
              <strong className="text-white">Machinery</strong> — supply terminates at the
              machine&apos;s dedicated isolator. The isolator, supply cable, OPD and any
              EAWR-required local switching are BS 7671. The control panel, drives, motors, sensors
              and field wiring inside the machine are BS EN 60204-1.
            </p>
            <p>
              <strong className="text-white">Lifts</strong> — supply to the lift motor room and the
              lift&apos;s dedicated isolator is BS 7671 (with Section 729 considerations for
              maintenance gangways). Everything beyond the isolator — controller, drive, traction
              motor, car wiring, landing-call wiring — is BS EN 81-20 / -50.
            </p>
            <p>
              <strong className="text-white">EV chargers</strong> — Section 722 governs the
              charger&apos;s fixed-side install. The charger&apos;s internal electronics and the
              vehicle coupler standard sit under BS EN 61851 / BS EN IEC 61851 plus the
              manufacturer&apos;s instructions. PME-fed chargers carry the additional Open-PEN
              protection requirements of 722.411.
            </p>
            <p>
              <strong className="text-white">Solar PV</strong> — Section 712 covers the AC and DC
              fixed-side install up to and including the inverter&apos;s AC isolator. MCS and BS EN
              62446 govern the panel-string commissioning.
            </p>
            <p>
              <strong className="text-white">Hazardous zones</strong> — BS 7671 stops at the zone
              boundary. Equipment within the zone must be Ex-rated under BS EN 60079; the
              installation method is also defined by the BS EN 60079 series. BS 7671 still applies
              to the safe-area side, but the boundary equipment must satisfy both.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating BS 7671 as a one-stop shop on machinery and EV jobs"
            whatHappens="An installer certifies the entire CNC machine — including internal control wiring — under BS 7671 because it sits on a factory floor and the customer assumed BS 7671 was 'the electrical standard'. Six months later a fault is traced to internal control wiring; the EIC overstates the install boundary; HSE asks why machine internals were tested under a fixed-installation regime."
            doInstead="State the boundary on the cert. Inspected under BS 7671 up to the dedicated isolator; equipment beyond the isolator was supplied by the manufacturer, declared to BS EN 60204-1, with declaration of conformity available on request. The same pattern applies to lifts, EV chargers, PV inverters and any packaged equipment — name the BS EN that governs the equipment side."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>What A4:2026 changed in scope</ContentEyebrow>

          <ConceptBlock title="What A4:2026 changed in scope">
            <p>
              <strong className="text-white">New Section 716 — Power over Ethernet.</strong> A4
              brought PoE inside the BS 7671 special-locations framework. ELV DC power distributed
              over balanced data cabling — used for cameras, access points, lighting controls,
              displays, building management — now has a normative home. References BS EN 50173-1 for
              cabling and BS EN IEC 62368-3 for the power-feeding sourcing equipment, but design /
              erection / verification flows through BS 7671.
            </p>
            <p>
              <strong className="text-white">New Chapter 81 — Energy efficiency.</strong> Promoted
              from the deleted informative Appendix 17 to a normative chapter in Part 8. Refers out
              to the Building Regulations and BS HD 60364-8-1:2019 for the detailed requirements.
            </p>
            <p>
              <strong className="text-white">
                New Chapter 57 — Stationary secondary batteries.
              </strong>{' '}
              Brings stationary battery installations (BESS, PV+battery, off-grid hybrid) under a
              dedicated chapter rather than treating them as ad-hoc generating sets. Excludes
              batteries inside product-safety-standard equipment such as UPSs and central
              emergency-lighting power supplies.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.1.1 — Voltage ceiling"
            clause="The Regulations apply to the design, erection and verification of electrical installations operating at a nominal voltage not exceeding 1000 V AC or 1500 V DC, including circuits supplied at such voltages from a higher voltage source."
            meaning="The ceiling is nominal voltage. LV installations supplied from an HV source (e.g. a private substation feeding a factory at 400 V) are still in scope from the LV switchgear onwards. The HV side is out of scope and falls under BS EN 61936-1 / ENA G81 with separate competency."
            cite="BS 7671:2018+A4:2026, Reg 110.1.1"
          />

          <Scenario
            title="The PoE camera install that wasn't certified"
            situation="A commercial fit-out includes 80 PoE security cameras fed from a managed network switch in the comms cupboard. The first-fix electrician runs Cat6A; the IT integrator commissions the cameras. Neither party issues an EIC for the PoE distribution. The asset register shows no electrical certification."
            whatToDo="Under A4:2026 Section 716, the PoE distribution is a BS 7671 install. Whoever designs / erects the ELV DC distribution issues the EIC; the network switch that supplies PoE is the equivalent of a small DB. Treat it as a Section 716 installation: design, erection, verification, certification — same lifecycle as any LV install, with the section's specific requirements on cable type and power-feeding equipment."
            whyItMatters="Pre-A4, PoE sat in a grey zone — covered by data-cabling standards and product safety, but with no normative BS 7671 hook. A4 closes the gap. From 15 April 2026, a building owner can reasonably expect a certificate; absence of one is non-compliance."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The scope-decision walk-through</ContentEyebrow>

          <ConceptBlock
            title="Designer's quick reference — is this job in scope?"
            plainEnglish="A four-step decision tree. (1) Is the nominal voltage ≤1000 V AC / 1500 V DC? (2) Does the installation fit one of the Reg 110.1.2 categories? (3) Is there a Part 7 special-location section that applies? (4) Where does BS 7671 hand over to an equipment / machinery / hazardous-area standard?"
            onSite="Walk it on every quote, not just the awkward ones. (1) Voltage check first — HV intake plant disqualifies the whole job from BS 7671 cert; you scope only the LV side. (2) Category check confirms the install template (residential / commercial / agricultural / marina / construction site / EV / PV / medical / mobile unit / PoE / battery). (3) Part 7 confirms whether a special-location section overrides the general regs (Reg 110.1.3 mechanism). (4) Boundary check confirms what equipment standards the EIC must reference for handover."
          >
            <p>
              The decision tree gets you from &lsquo;is this a BS 7671 job?&rsquo; to
              &lsquo;here&apos;s the cert template and here are the BS EN handover references&rsquo;
              in under a minute. Most UK domestic and commercial work flows straight through: LV ✓,
              residential or commercial ✓, no Part 7 override (or just Section 701 in a bathroom),
              handover at equipment isolators. The cases where the tree pays off are the awkward
              ones — a PoE network in a leisure-centre changing room, an EV charger on an old TN-C-S
              with a small PV, a Zone 2 area in a workshop. Walking the tree forces the correct
              boundaries onto the cert before the install starts, not after a complaint.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Certifying an HV intake under BS 7671"
            whatHappens="A factory has a private 11 kV/400 V substation on site. The contractor includes the HV switchgear, transformer and HV cabling on the BS 7671 EIC because 'it's all on the same site'. The cert is technically out of scope — Reg 110.1.1 caps BS 7671 at 1000 V AC nominal. HV equipment falls under BS EN 61936-1 / ENA G81 and requires HV-authorised competency."
            doInstead="Scope the BS 7671 EIC to the LV side only — from the LV terminals of the transformer (or LV switchboard) onwards. The HV side is reported on a separate HV inspection record by an authorised HV person. On the BS 7671 cert, name the LV demarcation explicitly: 'Inspected and tested under BS 7671:2018+A4:2026 from the LV terminals of TX1 onwards. HV plant upstream is outside the scope of this certificate (BS EN 61936-1 applies).'"
          />

          <CommonMistake
            title="Forgetting the MCS handover on a domestic PV install"
            whatHappens="An MCS-registered installer fits a 4 kWp domestic PV system, issues a BS 7671 EIC for the AC and DC fixed install (Section 712), and assumes that's the end of the paperwork. The customer applies for SEG payments and is told the MCS certificate is missing. The installer has to retrofit the MCS handover documentation weeks later, with the customer chasing for missed export payments."
            doInstead="Section 712 and MCS scheme rules are parallel obligations on a domestic PV install. The BS 7671 EIC covers the fixed install up to the inverter AC isolator; BS EN 62446 documentation covers the panel-string commissioning; the MCS certificate covers the scheme-level performance documentation the customer needs for SEG / FIT. Issue all three at handover; cross-reference them on the EIC schedule of inspection so the boundary is explicit."
          />

          <SectionRule />

          <ContentEyebrow>Industry direction — where scope is heading</ContentEyebrow>

          <ConceptBlock
            title="Future-proofing your scope thinking"
            plainEnglish="The trend across A2, A3 and now A4 is toward bringing previously-grey-zone installations inside the BS 7671 framework — EV charging (Section 722, A2 / A3), PoE (Section 716, A4), stationary batteries (Chapter 57, A4), energy efficiency (Chapter 81, A4). Expect the next amendment to continue the pattern."
            onSite="Treat every new technology you encounter — DC microgrids, V2G bi-directional EV chargers, hydrogen-cell standby supplies, smart-grid interfaces — with the same scope-decision tree. The specific section may not exist yet, but the four boundary questions still apply: voltage in scope? Reg 110.1.2 category? Part 7 override? equipment-standard handover? When the section catches up, your cert pattern is already correct."
          >
            <p>
              The scope of BS 7671 is not static — A4:2026 is a clear demonstration that the
              committee responds to technologies that have outgrown the pre-existing
              special-location framework. PoE was a data-cabling concern in 2018; by 2026 it is a
              Section 716 special location with a normative home. The same pressure is building
              around DC microgrids in commercial buildings, V2G bi-directional EV charging, and
              battery-storage-as-a-service models. Designers who walk the scope-decision tree
              consistently — voltage, category, Part 7, equipment handover — are positioned to
              absorb the next amendment with minimal friction. The ones who defaulted to &lsquo;BS
              7671 covers everything electrical&rsquo; or &lsquo;BS 7671 doesn&apos;t cover
              data&rsquo; will keep getting caught out.
            </p>
            <p>
              For CPD purposes, watch the IET&apos;s &lsquo;Wiring Matters&rsquo; bulletins, the BSI
              Standards Update feed for IEC 60364-x amendments (which feed through to BS 7671 via
              the JPEL/64 committee), and the MCS scheme-rule revisions — those three sources are
              the leading indicators of what the next amendment is going to formalise. Your cert
              templates should be referenceable enough to update with a search-and-replace when a
              new section drops, not rewritten from scratch.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 1990s machine shop with a tacked-on EV charger and a Zone 2 paint booth"
            situation="A long-standing client runs a 1990s engineering shop on a TN-C-S supply. They ask you to (a) certify a new 22 kW three-phase EV charger for the manager's car, (b) quote on extending the 230 V general-purpose lighting into a recently-built solvent paint booth currently classified Zone 2, and (c) confirm that the existing 11 kV substation feeding the building is 'compliant'. They want a single EIC covering all three works."
            whatToDo="Refuse the single-EIC framing — the three works span three different scope boundaries. (a) The EV charger: Section 722 BS 7671 install, with Reg 722.312.2.1 forbidding a PEN in the EV circuit on TN, plus open-PEN protection per 722.411 — issue a Section 722 EIC. (b) The Zone 2 paint booth: hazardous-area equipment selection and installation method governed by BS EN 60079-14; BS 7671 only applies on the safe-area side of the boundary panel — issue a separate ATEX inspection record under BS EN 60079-17 for the in-zone work, with the BS 7671 EIC covering the safe-area supply only. (c) The 11 kV substation: outside BS 7671 scope per Reg 110.1.1 — refer the client to an authorised HV person for an HV inspection under BS EN 61936-1 / ENA G81; the BS 7671 EIC starts at the LV terminals of the transformer."
            whyItMatters="A single EIC covering all three works is a documented liability waterfall: it overstates BS 7671 scope into HV, into a hazardous area, and conflates the EV-specific PEN prohibition with general fixed-wiring rules. The clean separation is more paperwork — three documents instead of one — but each document accurately reflects the scope of the standard that governs it. When the insurer or HSE asks five years from now, the audit trail holds up."
          />

          <SectionRule />

          <ContentEyebrow>Cert-form implications of A4 scope changes</ContentEyebrow>

          <ConceptBlock
            title="What the new scope means for the EIC, EICR and Minor Works form"
            plainEnglish="Section 716 (PoE), Chapter 57 (batteries) and Chapter 81 (energy efficiency) all need to be visible on the cert — schedule of inspection ticks, schedule of test results entries, and explicit reference to the in-force edition."
            onSite="The model forms in Appendix 6 of BS 7671:2018+A4:2026 carry new entries that didn't exist pre-A4. If your cert template still says 'BS 7671:2018+A2:2022' or 'A3:2024' on a job whose works completed after 15 April 2026, you are issuing the wrong-edition cert — that's a documented departure under Reg 120.3 with the burden of justification on you."
          >
            <p>
              <strong className="text-white">EIC schedule of inspection.</strong> A4 added entries
              for Section 716 (PoE) installations and the energy-efficiency considerations of
              Chapter 81. On a project that includes PoE distribution, the inspection schedule must
              show the Section 716 entries explicitly inspected — not just the data-cabling
              standard. On a project where Chapter 81 design considerations applied (e.g. a
              commercial fit-out with Building Regulations Part L overlap), the energy-efficiency
              entries should be referenced.
            </p>
            <p>
              <strong className="text-white">EIC schedule of test results.</strong> The header now
              records BS 7671:2018+A4:2026 as the edition. Test-result rows for PoE distribution
              circuits use the Section 716 frame for ELV DC verification. Stationary battery
              installations under Chapter 57 carry their own test-result entries (insulation,
              polarity, AC-side and DC-side fault loop, BESS-to-installation interface
              verification).
            </p>
            <p>
              <strong className="text-white">Minor Works form.</strong> Reg 110.1.2 categories still
              drive whether a Minor Works certificate is appropriate (single-circuit additions or
              alterations not requiring a new circuit). PoE additions to an existing Section 716
              distribution may be Minor-Works eligible; new Section 716 distributions from scratch
              require a full EIC. The same logic applies to Chapter 57 — adding a battery module to
              an existing BESS may be Minor Works; a new BESS install needs a full EIC.
            </p>
            <p>
              <strong className="text-white">EICR observations.</strong> On periodic inspection of a
              property whose installations pre-date A4, a missing PoE cert or missing Chapter 57
              entries are reported as deviations from the current edition rather than defects. Per
              GN3 (Section K), each observation gets a single classification (C1 / C2 / C3 / FI). A
              pre-A4 PoE distribution with no documentation typically attracts a C3 (improvement
              recommended) where there is no other risk factor; a Chapter 57 BESS without
              manufacturer documentation may attract a C2 if safety information is missing entirely.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.2 — Exclusions"
            clause="The Regulations do not apply to the following: (a) systems for the distribution of energy to the public (b) railway traction equipment, rolling stock and signalling equipment (c) equipment of motor vehicles, except those to which the requirements of the Regulations concerning caravans or mobile units are applicable (d) equipment on board ships and offshore installations covered by IEC 60092 (e) equipment of mobile and fixed offshore installations (f) equipment of aircraft (g) those aspects of mines and quarries which are specifically covered by statutory regulations (h) radio interference suppression equipment, except in so far as it affects safety of the installation (i) lightning protection systems for buildings and structures covered by BS EN 62305 (j) those aspects of lift installations covered by BS EN 81-20 and BS EN 81-50 (k) equipment for electric fences covered by BS EN 60335-2-76."
            meaning="The full exclusion list. Read it before quoting — anything in this list is not your scope to certify under BS 7671. The handover is to the equipment standard or sector-specific statutory framework (ATEX/DSEAR for hazardous areas, the Mines and Quarries Act for mining, the Railway Group Standards for traction). On site, the practical filter is: can you isolate it at a fixed-installation breaker? If yes, BS 7671 applies up to that point. If the equipment standard takes over inside, name it on the cert."
            cite="BS 7671:2018+A4:2026, Reg 110.2"
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Voltage ceiling: 1000 V AC / 1500 V DC nominal (Reg 110.1.1). Above that is HV — different standards.',
              'BS 7671 covers the fixed installation up to equipment isolators; equipment internals are governed by their own product / machinery standards.',
              'Part 7 supplements or modifies Parts 1–6. On a special location, the more stringent requirement wins.',
              'Section 722 (EV charging), Section 712 (PV), Section 710 (medical, major revision under A4), Section 716 (PoE — new under A4) are the special locations whose interaction with general regs trips most designers.',
              'Hazardous zones: BS EN 60079 — BS 7671 applies on the safe-area side only.',
              'A4:2026 expanded scope: Section 716 (PoE), Chapter 57 (stationary batteries), Chapter 81 (energy efficiency replacing deleted App 17).',
              'On every job: walk the four-step scope-decision tree — voltage, Reg 110.1.2 category, Part 7 override, equipment-standard handover — and name each boundary on the cert.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-1-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Statutory framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
