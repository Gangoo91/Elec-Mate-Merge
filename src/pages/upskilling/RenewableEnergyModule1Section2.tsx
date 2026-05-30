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
} from '@/components/study-centre/learning';
import { LctChapterMap } from '@/components/study-centre/diagrams/renewableM1';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s2-historical-fragmentation',
    question:
      'BS 7671 splits low-carbon technology across multiple sections and chapters (551, 712, 722, Chapter 57, 715, 730, 753, Appendix 17). What is the most accurate diagnosis of why?',
    options: [
      'Architectural intent — each chapter was deliberately scoped to one technology',
      'Historical accretion — sections and chapters were added as each LCT technology emerged, without a master plan',
      'European harmonisation requirements',
      'Different IET committees own different chapters',
    ],
    correctIndex: 1,
    explanation:
      'The fragmentation reflects how BS 7671 has absorbed new LCT technologies over successive editions and amendments. Section 551 (generating sets) predates serious LCT use; Section 712 (PV) was added when grid-tied solar became domestic; Section 722 (EV) followed the mass-market EV trajectory; Chapter 57 (stationary batteries) was carved out in A4:2026. The 19th Edition is expected to consolidate the LCT chapters into a coherent Part 7 framework.',
  },
  {
    id: 'm1s2-551-as-spine',
    question:
      'Which BS 7671 section is touched by almost every grid-tied LCT install — PV, BESS, EV with V2G — regardless of the technology-specific chapter that dominates the design?',
    options: [
      'Section 551 — Low voltage generating sets',
      'Section 410 — Protection against electric shock',
      'Chapter 33 — Compatibility',
      'Section 543 — Protective conductors',
    ],
    correctIndex: 0,
    explanation:
      'Section 551 covers the parallel operation of generating sets with the public supply and the bidirectional flow case (the new 551.7.1(c) requirement under A4). Every grid-tied LCT install has a generator-side interface — the PV inverter, the battery inverter, the V2G EV charger — and 551 governs that interface.',
  },
  {
    id: 'm1s2-bess-as-generator',
    question:
      'A4:2026 redrafted Reg 551.7.2.1 with a critical rule for hybrid PV+BESS systems. What does it say about a stationary battery?',
    options: [
      'A stationary battery is treated as a load',
      'A stationary battery (Chapter 57) shall be considered a generating set and not a load, for the purposes of Section 551',
      'A stationary battery is exempt from Section 551',
      'A stationary battery requires only its own RCD',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.2.1 explicitly requires the generating set to be installed on the supply side of all the protective devices, and "stationary batteries (Chapter 57) to be considered a generating set and not a load". The BESS gets the full Section 551 treatment — supply-side installation, bidirectional protective device per 551.7.1(c), automatic disconnection on loss of supply per 551.7.4 — not the simpler load-side treatment.',
  },
  {
    id: 'm1s2-chapter-57-exclusions',
    question:
      'Chapter 57 applies to stationary secondary battery installations whose designed purpose is storage and supply of electrical installations. Which is EXCLUDED from Chapter 57?',
    options: [
      'A 10 kWh domestic battery storage unit',
      'A commercial 50 kWh BESS for peak shaving',
      'A battery integrated into a plug-in UPS product conforming to product safety standards',
      'A 5 kWh hybrid-coupled BESS on a residential PV system',
    ],
    correctIndex: 2,
    explanation:
      'Chapter 57 explicitly excludes batteries incorporated into products covered by product safety standards — pluggable UPS units, fire and emergency lighting systems, central safety power supplies. Those batteries are governed by their product standards (BS EN 62040 for UPS, BS EN 50171 for central safety power supplies).',
  },
  {
    id: 'm1s2-722-prosumer',
    question:
      'A4:2026 updated Section 722 to make reference to "prosumer\'s electrical installations". Why?',
    options: [
      'Marketing language — no design impact',
      'Recognition that a customer with PV + BESS + EV is simultaneously a producer and consumer of electricity, and Section 722 must now consider that interaction',
      'It applies only to commercial sites',
      'It restricts EV chargers to off-peak hours',
    ],
    correctIndex: 1,
    explanation:
      'The "prosumer" addition is the regulatory acknowledgement that the EV chargepoint is no longer a one-way load. A customer with rooftop PV, a battery, and a V2G-capable EV is simultaneously generating, storing, importing and exporting. A4\'s reference changes how 722 interlocks with Section 551 (the generator interface) and Chapter 57 (the BESS).',
  },
  {
    id: 'm1s2-appendix-17-trajectory',
    question:
      'A4:2026 introduced Appendix 17 on energy efficiency recommendations. What is the intended trajectory?',
    options: [
      'It will remain an appendix indefinitely',
      'It is informational only and will be deleted in the 19th Edition',
      'It is intended to be developed into a new Part 8 of BS 7671 in a future amendment',
      'It will be replaced by an IET Code of Practice',
    ],
    correctIndex: 2,
    explanation:
      'Appendix 17 is explicitly framed in A4:2026 as the precursor to a Part 8 of BS 7671 in a future amendment — energy efficiency promoted from "recommendations in an appendix" to a full Part. The pattern matches how earlier LCT content evolved.',
  },
  {
    id: 'm1s2-iet-cops-slot',
    question:
      'On a domestic hybrid PV + BESS + EV install, which combination of BS 7671 chapters and IET Codes of Practice form the actual working reference set?',
    options: [
      'BS 7671 Section 712 alone — PV chapter covers everything',
      'BS 7671 Sections 551, 712, 722 and Chapter 57, plus the IET Codes of Practice for Grid-Connected Solar PV, Electrical Energy Storage Systems, and Electric Vehicle Charging Equipment Installation',
      'Only the manufacturer instructions',
      'BS EN 60364 — the international parent standard',
    ],
    correctIndex: 1,
    explanation:
      'A domestic hybrid install touches at least four BS 7671 chapters — Section 712 (PV), Chapter 57 (BESS), Section 722 (EV), Section 551 (the generator-side interface that interlocks all three). For each LCT technology, BS 7671 sets the regulatory framework but stays general on commissioning, inspection and test procedure; the corresponding IET Code of Practice fills the gap.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A homeowner asks for a 6 kWp PV array, a 10 kWh battery, and a 7.4 kW EV chargepoint installed as one project. Which set of BS 7671 chapters / sections must the designer engage with?',
    options: [
      'Section 712 only',
      'Sections 712, 722, 551 and Chapter 57 — plus Appendix 17 considerations and the three relevant IET Codes of Practice',
      'Section 826 alone (it covers the whole thing)',
      'Chapter 57 only — BESS dominates the design',
    ],
    correctAnswer: 1,
    explanation:
      'PV is governed by Section 712. EV charging is governed by Section 722. The BESS is governed by Chapter 57. All three are sources of supply or bidirectional energy flow, which engages Section 551 — particularly 551.7.1(c) and 551.7.2.1 (BESS treated as a generating set). Appendix 17 may apply to cable sizing and inverter efficiency choices. The IET Codes of Practice are the operational references.',
  },
  {
    id: 2,
    question:
      'Reg 551.7.2.1 (redrafted in A4:2026) sets a rule that reshapes how Chapter 57 interlocks with the rest of the standard. What is the rule?',
    options: [
      'Stationary batteries are exempt from Section 551',
      'Stationary batteries (per Chapter 57) shall be considered a generating set and not a load, and the generating set shall be installed on the supply side of all the protective devices',
      'Stationary batteries may share an RCD with the PV inverter',
      'Stationary batteries do not require automatic disconnection',
    ],
    correctAnswer: 1,
    explanation:
      'The rule has two parts. First, the generating set must be installed on the supply side of all protective devices — meaning the BESS / PV inverter interface must sit upstream of the consumer\'s downstream protection. Second, the rule explicitly classifies stationary batteries (Chapter 57) as generating sets, not loads, for the purposes of Section 551.',
  },
  {
    id: 3,
    question:
      'Reg 551.8 was deleted by A4:2026. Where did its content go?',
    options: [
      'Into Section 712 (PV)',
      'Into the new Chapter 57 (stationary secondary batteries)',
      'Into Appendix 17 (energy efficiency)',
      'Removed from BS 7671 entirely',
    ],
    correctAnswer: 1,
    explanation:
      'The deletion of 551.8 reads "Deleted by BS 7671:2018+A4:2026. See Chapter 57" — confirming that the battery-related content previously embedded in Section 551 was extracted into the new dedicated Chapter 57.',
  },
  {
    id: 4,
    question:
      'On a domestic install where the customer has an existing certified plug-in UPS for a home office, does Chapter 57 apply to that UPS?',
    options: [
      'Yes — all batteries fall under Chapter 57',
      'No — Chapter 57 explicitly excludes batteries incorporated into products covered by product safety standards (e.g. pluggable UPS conforming to BS EN 62040)',
      'Yes, but only if rated above 1 kVA',
      'Yes, but only if the UPS supplies emergency lighting',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 57 applies to stationary secondary battery installations whose designed purpose is storage and supply of electrical installations. The chapter explicitly excludes batteries within products covered by product safety standards — pluggable UPS units, fire and emergency lighting systems, central safety power supplies.',
  },
  {
    id: 5,
    question:
      'Section 753 was extended in A4:2026. What does its extended scope now cover?',
    options: [
      'Industrial induction heating only',
      'Embedded electric heating systems for surface heating, de-icing and frost prevention — including both indoor and outdoor systems',
      'Heat pumps only',
      'Underfloor heating in commercial premises only',
    ],
    correctAnswer: 1,
    explanation:
      'Section 753 was retitled and its scope extended in A4. It now covers embedded electric heating systems for surface heating, de-icing and frost prevention, indoor and outdoor. A heat pump installation with electric underfloor heating engages Section 753.',
  },
  {
    id: 6,
    question:
      'A4:2026 introduced Appendix 17 as a new appendix. Which framing is most accurate?',
    options: [
      'Appendix 17 is a deletion notice for old content',
      'Appendix 17 is energy efficiency design recommendations including for installations with local production and storage of energy — intended to be developed into a Part 8 of BS 7671 in a future amendment',
      'Appendix 17 covers earth electrode design only',
      'Appendix 17 replaces Section 826',
    ],
    correctAnswer: 1,
    explanation:
      'Appendix 17 is the new energy efficiency appendix in A4:2026, providing recommendations for the design and erection of installations to optimise efficient use of electricity — including those with local production and storage. The stated intention is that Appendix 17 will be developed into Part 8 in a future amendment.',
  },
  {
    id: 7,
    question:
      'Section 730 in A4:2026 has what scope?',
    options: [
      'Marina pontoon supplies for sea-going vessels',
      'Onshore installations dedicated to the supply of inland navigation vessels for commercial and administrative purposes, berthed in ports and berths — an entirely new section in this amendment',
      'Aircraft ground power',
      'Railway traction signalling',
    ],
    correctAnswer: 1,
    explanation:
      'Section 730 was added in A4:2026 specifically for onshore installations supplying inland navigation vessels (i.e. canal and river commercial vessels) berthed in ports. It sits alongside the existing Section 729 (marinas) but addresses a distinct case.',
  },
  {
    id: 8,
    question:
      'A designer is reviewing the 18th Edition LCT chapter map and asks "is this the final structure?" The most accurate answer in 2026 is:',
    options: [
      'Yes — the structure is settled',
      'No — the 19th Edition (currently in IET/BSI committee, expected 2028–2030) is widely expected to consolidate the scattered LCT chapters into a clearer Part 7 LCT framework and promote Appendix 17 into a new Part 8 on energy efficiency',
      'It will all be replaced by BS EN 60364',
      'IET has indicated it will hand the standard to HSE',
    ],
    correctAnswer: 1,
    explanation:
      'The 18th Edition with A4 amendments has the LCT content spread across Sections 551, 712, 715, 722, 730, 753, Chapter 57 and Appendix 17. That fragmentation is being addressed in the 19th Edition. The 18th Edition + A4 remains in force during the transition.',
  },
];

const faqs = [
  {
    question:
      'Why is the LCT content not in a single chapter, given how dominant LCT is in modern installation work?',
    answer:
      'Historical accretion. BS 7671 has absorbed LCT in pieces over multiple editions and amendments — Section 712 was added when PV became domestic, Section 722 when EV became mainstream, Chapter 57 when BESS could no longer fit inside Section 826. The fragmentation is a feature of the development pattern, not architectural intent. The 19th Edition is expected to consolidate.',
  },
  {
    question:
      'If Chapter 57 excludes batteries in pluggable UPS and emergency lighting, what governs those installations?',
    answer:
      'Product safety standards. Pluggable UPS units fall under BS EN 62040. Central safety power supplies for emergency lighting fall under BS EN 50171. Self-contained emergency luminaires fall under BS EN 60598-2-22 plus the BS EN 50172 system standard. The exclusion in Chapter 57 makes the boundary explicit.',
  },
  {
    question:
      'On a hybrid PV+BESS install, do I apply Section 712 protection rules, Chapter 57 protection rules, or both?',
    answer:
      'Both, applied at the appropriate point in the installation. Section 712 governs the PV-side electrical installation — DC strings, PV-specific protective measures, the inverter input. Chapter 57 governs the BESS-side — battery chemistry-aware ventilation, isolation, fault-current arrangements. Section 551 governs the supply-boundary interface for both sources. The interfaces interlock.',
  },
  {
    question:
      'How do the IET Codes of Practice relate to the BS 7671 LCT chapters in practice?',
    answer:
      'BS 7671 sets the regulatory framework; the IET Codes of Practice fill the operational gap. For PV the IET CoP for Grid-Connected Solar Photovoltaic Installations is the operational reference for inspection, testing, commissioning evidence (linking to BS EN 62446). For BESS the IET CoP for Electrical Energy Storage Systems covers chemistry-aware siting, fire detection, ventilation. For EV the IET CoP for Electric Vehicle Charging Equipment Installation covers the practical PEN-fault decision tree.',
  },
  {
    question:
      'Section 715 (extra-low voltage lighting) — is this LCT-relevant?',
    answer:
      'Selectively. Section 715 applies to ELV lighting supplied from a source with a maximum rated voltage of 50 V AC or 120 V DC. For mainstream LCT work it is not the primary reference. It becomes relevant where the LCT install is paired with ELV DC lighting — e.g. off-grid dwellings with 12 V or 24 V DC lighting circuits drawn directly from the battery bank.',
  },
  {
    question:
      'Is the bidirectional protective device required under Reg 551.7.1(c) the same as the PEN-fault protective measure required under Reg 722.411.4.1?',
    answer:
      'No — they address different failure modes. 551.7.1(c) is about the protection arrangement where current can flow in both directions through a protective device. 722.411.4.1 is about PEN-fault detection on PME-supplied EV chargepoints. A grid-tied EV chargepoint paired with PV and BESS engages both requirements. They are complementary, not duplicative.',
  },
  {
    question:
      'Will the 19th Edition consolidate the LCT chapters into a single Part?',
    answer:
      'The expectation in the joint committee work to date is consolidation rather than wholesale rewrite. The 19th Edition is widely expected to gather the scattered LCT chapters into a clearer Part 7 LCT framework, with cross-referencing rather than duplication. Appendix 17 is expected to be promoted into a new Part 8 on energy efficiency. The 18th Edition with A4 amendments remains in force across the transition.',
  },
  {
    question:
      'Section 753 covers embedded electric heating systems. Does that apply to electric underfloor heating fitted alongside a heat pump installation?',
    answer:
      'Yes, where the underfloor heating is electric. Section 753 was retitled and extended in A4:2026 to cover embedded electric heating systems for surface heating, de-icing and frost prevention. An ASHP install paired with electric UFH engages Section 753 for the UFH and Section 826 / Chapter 57 considerations for any battery storage.',
  },
  {
    question:
      'What is the practical difference between Section 551.7.4, 551.7.5 and 551.7.6 — and why does it matter for LCT?',
    answer:
      'They are the trio of disconnection / isolation requirements for parallel generation. 551.7.4 requires automatic disconnection on loss of supply (anti-islanding). 551.7.5 prevents reconnection while the public supply remains absent. 551.7.6 requires means of isolation. All three apply to grid-tied PV, BESS and V2G. The practical implication is that the inverter\'s G98 / G99 certification is the audit evidence that 551.7.4–551.7.6 are satisfied.',
  },
];

export default function RenewableEnergyModule1Section2() {
  const navigate = useNavigate();

  useSEO({
    title:
      'The LCT chapter map in BS 7671:2018+A4:2026 | Renewable Energy 1.2 | Elec-Mate',
    description:
      'Sections 551, 712, 722, 730, 753, 715, Chapter 57 and Appendix 17 — how BS 7671:2018+A4:2026 splits low-carbon technology across chapters, how they interlock on hybrid installs, and where the IET Codes of Practice fill the gaps.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · BS 7671:2018+A4:2026"
            title="The LCT chapter map in BS 7671:2018+A4:2026"
            description="How BS 7671 splits low-carbon technology across Sections 551, 712, 715, 722, 730, 753, Chapter 57 and Appendix 17 — how the chapters interlock on hybrid installs, and where the IET Codes of Practice slot in."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671\'s LCT content is fragmented by historical accretion across multiple sections, the new Chapter 57 (stationary batteries), the new Chapter 82 (Prosumer\'s Electrical Installations / PEIs), and Appendix 17 (energy efficiency). The 19th Edition is expected to consolidate.',
              'Section 551 (low voltage generating sets) is the spine every grid-tied LCT install touches — bidirectional flow protection, supply-side installation of the source, and the anti-islanding / isolation triad.',
              'A4:2026 introduced Reg 551.7.2.1 — stationary batteries (Chapter 57) are classified as a generating set, not a load. BESS gets the full Section 551 treatment.',
              'Chapter 57 (new in A4) is the dedicated stationary secondary battery chapter; Reg 551.8 was deleted and its content moved into Chapter 57. Pluggable UPS and emergency lighting batteries are explicitly excluded.',
              'Chapter 82 (new in A4) is the Prosumer\'s Electrical Installations chapter — treating hybrid installs (PV + BESS + EV + heat pump) as coherent systems rather than collections of independent installs. The system-level design discipline above the per-technology chapters.',
              'Appendix 17 (new in A4) sets energy-efficiency design recommendations and is explicitly intended to be promoted into a Part 8 of BS 7671 in a future amendment.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Map each LCT technology — solar PV, BESS, EV charging, heat pumps, ELV lighting — to its primary BS 7671 chapter.',
              'Explain how Section 551 functions as the spine of grid-tied LCT design, particularly the A4 changes.',
              'Identify the scope of the new Chapter 57 and the explicit exclusions (pluggable UPS, fire and emergency lighting systems, central safety power supplies).',
              'Read Chapter 82 (Prosumer\'s Electrical Installations) as the new system-level chapter for hybrid installs — sitting alongside the per-technology chapters and adding the design discipline for the prosumer case.',
              'Locate the A4:2026 updates to Section 722 (prosumer reference), Section 753 (extended embedded-heating scope) and Section 730 (new onshore inland-navigation section).',
              'Read Appendix 17 as the precursor to a future Part 8 on energy efficiency.',
              'Anticipate the 19th Edition\'s likely consolidation of the LCT chapters into a coherent Part 7 framework.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The chapter map is the artefact of historical accretion, not architectural intent.</Pullquote>

          <ContentEyebrow>Why the LCT chapters are fragmented — the accretion story</ContentEyebrow>

          <ConceptBlock
            title="Historical accretion, not architectural intent"
            plainEnglish="There is no single LCT chapter in BS 7671. The technologies were added piecemeal, in different editions, by different routes."
            onSite="Read the LCT chapter map as the artefact of how the standard absorbs new technology. The technology-focused designer who reads only their primary chapter misses the cross-chapter interactions."
          >
            <p>
              BS 7671 has absorbed low-carbon technology over the last fifteen years in
              distinct waves:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Section 551</strong> was already in the
                standard, originally written with diesel standby and small CHP in mind.
              </li>
              <li>
                <strong className="text-white">Section 712</strong> (solar PV) was added
                when grid-tied domestic PV became a mainstream technology.
              </li>
              <li>
                <strong className="text-white">Section 722</strong> (EV charging) was added
                when EV adoption began to scale.
              </li>
              <li>
                <strong className="text-white">Chapter 57</strong> (stationary batteries)
                was carved out in A4:2026 — content moved out of Section 826 and Section
                551.8, which were both deleted.
              </li>
              <li>
                <strong className="text-white">Chapter 82</strong> (Prosumer\'s Electrical
                Installations) was added in A4:2026 — the new system-level chapter for
                installations with local production and / or storage of energy, treating
                hybrid LCT installs as coherent systems rather than collections of
                separate per-technology installs.
              </li>
              <li>
                <strong className="text-white">Appendix 17</strong> (energy efficiency) is
                the latest addition, planned to become Part 8 in the 19th Edition.
              </li>
            </ul>
            <p>
              The 19th Edition (currently in IET / BSI joint committee, expected publication
              2028–2029) is widely expected to consolidate the LCT chapters into a clearer
              Part 7 framework. The 18th Edition + A4 remains in force across the transition.
            </p>
          </ConceptBlock>

          <LctChapterMap caption="Which BS 7671 chapters apply to each low-carbon technology — and the two cross-cutting anchors (Section 551 and Chapter 82)." />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Section 551 — the spine of grid-tied LCT</ContentEyebrow>

          <ConceptBlock
            title="Section 551 is the chapter every grid-tied LCT install touches"
            plainEnglish="Read Section 551 first, not last. Whatever LCT technology dominates your install — PV, BESS, EV with V2G — the supply-boundary interface is governed by Section 551."
            onSite="On any grid-tied LCT install, the Section 551 checklist runs through: bidirectional protective device (551.7.1(c)), source on supply side (551.7.2.1), automatic disconnection (551.7.4), prevention of reconnection (551.7.5), isolation (551.7.6)."
          >
            <p>
              Section 551 is titled "Low voltage generating sets". In 2008 that meant diesel
              gensets and small CHP. In 2026 it means every grid-tied PV inverter, every
              grid-tied BESS, every V2G EV chargepoint.
            </p>
            <p>The A4:2026 changes to Section 551 are concentrated in two places:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">551.7.1 redrafted</strong> — indent (c)
                added: protective device where energy flow is bidirectional. Indent (d)
                added: source not to be connected to the load side of an RCD under certain
                conditions.
              </li>
              <li>
                <strong className="text-white">551.7.2 split into two regulations</strong>
                {' '}— 551.7.2.1 requires the generating set on the supply side of all
                protective devices and explicitly treats stationary batteries (Chapter 57)
                as a generating set. 551.7.2.2 covers LV switchgear requirements when the
                generating set is connected via switchgear.
              </li>
              <li>
                <strong className="text-white">Reg 551.8 deleted</strong> — content moved
                into the new Chapter 57. "See Chapter 57" replaces the old battery
                provisions.
              </li>
            </ul>
            <p>The trio 551.7.4 / 551.7.5 / 551.7.6 sets the DNO operational interface:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">551.7.4</strong> — automatic disconnection
                from the public supply on loss of supply or deviation of voltage / frequency
                (anti-islanding).
              </li>
              <li>
                <strong className="text-white">551.7.5</strong> — prevention of reconnection
                while the public supply remains absent.
              </li>
              <li>
                <strong className="text-white">551.7.6</strong> — means of isolation per
                national rules and DNO requirements.
              </li>
            </ul>
            <p>
              All three are typically discharged via the inverter\'s EREC G98 / G99
              certification — the equipment evidence is the audit trail.
            </p>
          </ConceptBlock>

          <Pullquote>BESS is a generating set, not a load.</Pullquote>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.2.1"
            clause="Regulation 551.7.2.1 requires the generating set to be installed on the supply side of all the protective devices and requires stationary batteries (Chapter 57) to be considered a generating set and not a load."
            meaning="The key chapter-interplay rule for hybrid LCT design. A BESS is not just a battery — under Section 551 it is treated identically to a generating set. Every Section 551 requirement applies to BESS as it applies to PV inverter and to V2G charger. The designer who reads Chapter 57 in isolation and applies load-side rules to a BESS has misread the standard."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Section 712 — Solar PV</ContentEyebrow>

          <ConceptBlock
            title="Section 712 — the particular requirements for PV"
            plainEnglish="Section 712 is the PV-specific chapter. It modifies the general Part 4 protection rules and the Part 5 selection rules for the PV case."
            onSite="Read the 712 protective-measures rules carefully — some general Part 4 measures are explicitly disallowed for PV; reinforced insulation is explicitly permitted."
          >
            <p>
              Section 712 (712.1 scope) covers the electrical installation of PV generators
              intended to supply all or part of an installation and to feed electricity into
              the public grid or local distribution. The chapter starts at the PV module or
              set of modules and extends through the DC string, the DC isolation, the
              inverter and the AC interface.
            </p>
            <p>Section 712 modifies the general Part 4 protective-measures toolkit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">712.410.3.5 — Prohibited:</strong> obstacles
                and placing out of reach
              </li>
              <li>
                <strong className="text-white">712.410.3.6 — Prohibited:</strong>
                non-conducting location; earth-free local equipotential bonding; electrical
                separation for the supply of more than one item of current-using equipment
              </li>
              <li>
                <strong className="text-white">712.412 — Permitted:</strong> double or
                reinforced insulation (maps to Class II module construction)
              </li>
              <li>
                <strong className="text-white">712.431.102 — PV string protection</strong>
                {' '}— the specific protective device requirements for PV strings
              </li>
            </ul>
            <p>
              Commissioning evidence is typically BS EN 62446 IV-curve, insulation
              resistance and string-current testing. The IET Code of Practice for
              Grid-Connected Solar PV Installations builds on top of the BS 7671 framework.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.1 — Scope"
            clause="This section applies to the electrical installation of PV generators intended to supply all or part of an installation and to feed electricity into the public grid or local distribution. The electrical installation of a PV generator starts from a PV module or a set of PV modules connected together."
            meaning="Section 712 is the PV-specific chapter, not a complete treatment of PV equipment. The chapter starts at the module-to-module interconnection and follows the DC string through the inverter to the AC boundary. Selection rules modify the general Part 4 / Part 5 framework for the PV case."
          />

          <SectionRule />

          <ContentEyebrow>Section 722 — EV charging</ContentEyebrow>

          <ConceptBlock
            title="Section 722 — and the A4 prosumer addition"
            plainEnglish="Section 722 is the EV chapter. A4 added a reference to prosumer installations — recognition that the chargepoint is no longer a one-way load when the customer also has PV and a battery."
            onSite="Two A4 changes worth knowing in 722: the deletion of the 'reasonably practicable' PME exception in Reg 722.411.4.1 (covered in 1.1), and the prosumer reference that makes the chargepoint design conversation cross-chapter."
          >
            <p>
              Section 722 sets the particular requirements for electric vehicle charging
              installations. The international parent is the BS EN 61851 family, which
              governs the EV supply equipment hardware, communication protocol and mode
              classifications.
            </p>
            <p>A4:2026 changes to Section 722 sit in two areas:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">722.411.4.1 — Reasonably practicable
                exception deleted.</strong> PEN-fault protective measures on PME-supplied
                chargepoints are now unconditional. (Covered in detail in Section 1.1.)
              </li>
              <li>
                <strong className="text-white">Prosumer reference added.</strong>
                Recognition that the chargepoint is no longer a one-way load when the
                customer has PV, a battery, and a V2G-capable vehicle.
              </li>
            </ul>
            <p>
              The prosumer addition does not radically restructure Section 722 itself. It
              changes how 722 interlocks with the other LCT chapters. A chargepoint
              connected to a property with grid-tied PV (Section 712) and a BESS (Chapter
              57) engages Section 551 for the bidirectional interface, and the V2G
              capability makes the chargepoint itself a generating set under 551.7.2.1.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Chapter 57 — Stationary secondary batteries (new in A4)</ContentEyebrow>

          <ConceptBlock
            title="Chapter 57 — the dedicated BESS chapter, and what moved into it"
            plainEnglish="Chapter 57 is the new architectural unit for batteries in A4:2026. The content from Section 551.8 was moved here. The chapter excludes batteries inside products covered by product safety standards."
            onSite="The Chapter 57 design conversation: chemistry, DC vs AC coupling, BMS interface, chemistry-aware ventilation, isolation philosophy, fault current arrangements, and the interface with Section 551 via 551.7.2.1."
          >
            <p>
              Chapter 57 is the new chapter A4:2026 added to Part 5 (Selection and Erection
              of Equipment). The stated purpose is to provide requirements where the
              designed purpose of the battery installation is for storage and supply of
              electrical installations.
            </p>
            <p>Chapter 57 exclusions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Pluggable UPS</strong> — governed by BS EN
                62040
              </li>
              <li>
                <strong className="text-white">Fire and emergency lighting systems</strong>
                {' '}— governed by BS EN 50171, BS EN 60598-2-22, BS EN 50172
              </li>
              <li>
                <strong className="text-white">Central safety power supply systems</strong>
                {' '}— governed by BS EN 50171
              </li>
              <li>
                <strong className="text-white">Any battery in a product covered by a
                product safety standard</strong>
              </li>
            </ul>
            <p>
              The interplay with Section 551 is set by Reg 551.7.2.1 — a stationary battery
              under Chapter 57 is treated as a generating set under 551, not as a load. The
              bidirectional protective device, the supply-side installation, the automatic
              disconnection and the isolation requirements all apply to the BESS exactly as
              they apply to a PV inverter or a V2G charger.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 57 — Stationary secondary battery installations (new in A4)"
            clause="A new Chapter 57 has been introduced in Part 5 of BS 7671:2018+A4:2026 to deal with requirements for stationary secondary battery installations where the designed purpose of the battery installation is for storage and supply of electrical installations. Chapter 57 does not apply where the battery is incorporated into a product covered by product safety standards."
            meaning="The new chapter is the regulatory acknowledgement that BESS has outgrown the section-level treatment it received in earlier editions. The product-safety exclusion makes the boundary with adjacent standards explicit."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Sections 715, 730, 753 — the adjacent LCT-relevant chapters</ContentEyebrow>

          <ConceptBlock
            title="Section 715 (ELV lighting), Section 730 (inland-vessel onshore supplies), Section 753 (embedded heating)"
            plainEnglish="Three smaller chapters touch LCT work in specific cases. 715 for ELV DC lighting on off-grid. 730 (new in A4) for inland-vessel shore connections. 753 (extended in A4) for embedded electric heating including UFH paired with heat pumps."
            onSite="On a standard domestic LCT install these chapters are usually not engaged. On off-grid / RV / marine LCT work, 715 sits alongside Chapter 57. On heat pump installs paired with electric UFH, 753 adds a chapter to the reference set."
          >
            <p>
              <strong className="text-white">Section 715</strong> — Extra-low voltage
              lighting installations. Scope: ELV lighting supplied from a source with a
              maximum rated voltage of 50 V AC or 120 V DC (Reg 715.1). A4 made only minor
              changes. Becomes relevant on:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Off-grid dwellings with 12 V or 24 V DC lighting drawn directly from the battery bank</li>
              <li>RV and marine LCT systems with DC distribution</li>
              <li>Certain garden / outbuilding installations running from a small dedicated battery</li>
            </ul>
            <p>
              <strong className="text-white">Section 730</strong> — Onshore units of
              electrical shore connections for inland navigation vessels. An entirely new
              section in A4. Scope: onshore installations dedicated to the supply of inland
              navigation vessels for commercial and administrative purposes, berthed in
              ports and berths. Sits alongside Section 729 (marinas) but addresses a
              distinct case — commercial inland vessels rather than recreational marina
              berths. Niche but real for canal-and-river commercial LCT.
            </p>
            <p>
              <strong className="text-white">Section 753</strong> — Heating cables and
              embedded heating systems. Retitled and scope extended in A4. Now covers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Embedded electric heating systems for surface heating</li>
              <li>De-icing and frost prevention systems (indoor and outdoor)</li>
              <li>New regulations on heating-cable impact relocated from Chapter 53</li>
            </ul>
            <p>
              Out of scope: industrial / commercial heating systems complying with BS EN
              60519, BS EN 62395 or BS EN 60079. For the LCT installer the practical
              implication is that a heat pump install paired with electric UFH engages
              Section 753.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Appendix 17 — energy efficiency, the future Part 8</ContentEyebrow>

          <ConceptBlock
            title="Appendix 17 is the trail to Part 8 — read it as the trajectory"
            plainEnglish="A4 added Appendix 17 on energy efficiency recommendations. The intention is that Appendix 17 will be promoted into a Part 8 of BS 7671 in a future amendment. For now: recommendations. Later: requirements."
            onSite="On commercial and industrial designs Appendix 17 considerations already affect cable sizing for loss minimisation, transformer efficiency class selection, motor efficiency class, and VSD specification. On domestic installs the appendix mostly does not apply."
          >
            <p>
              Appendix 17 is the new energy efficiency appendix introduced in A4:2026. The
              scope is recommendations for the design and erection of installations,
              including those with local production and storage of energy, to optimise
              overall efficient use of electricity.
            </p>
            <p>The trajectory matches earlier LCT content development:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Section 712 started as guidance, became a section, evolved through amendments</li>
              <li>Chapter 57 took the same trajectory and ended up as a chapter in A4</li>
              <li>Appendix 17 is expected to become Part 8 — promoted from appendix to a full Part</li>
            </ul>
            <p>
              The implication for the LCT designer is that the cert workflow built today
              should accommodate the energy-efficiency design decisions that will become
              recordable on Part 6 certs as the trajectory plays out. A4\'s Reg 133.1.3
              equipment-usage recording change and Appendix 17 are part of the same
              direction.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Appendix 17 (new in A4) — Energy efficiency"
            clause="Appendix 17 is a new appendix providing recommendations for the design and erection of electrical installations, including those with local production and storage of energy, to optimise overall efficient use of electricity. It is intended that this appendix will be developed into Part 8 in a future amendment."
            meaning="The appendix is explicitly transitional — recommendations now, requirements in the future. The trajectory toward a full Part 8 places energy-efficiency design in the same architectural tier as the existing Parts."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Chapter 82 — Prosumer\'s Electrical Installations (new in A4)</ContentEyebrow>

          <Pullquote>The prosumer install is a system. Chapter 82 is its chapter.</Pullquote>

          <ConceptBlock
            title="Chapter 82 — the system-level chapter that ties hybrid installs together"
            plainEnglish="A4:2026 introduced Chapter 82 covering Prosumer\'s Electrical Installations (PEIs) — installations with local production and / or storage of energy. The chapter sits above the per-technology chapters, framing the hybrid install as one coherent system."
            onSite="On a hybrid install, after the per-technology requirements are mapped (712 for PV, 722 for EV, Chapter 57 for BESS), Chapter 82 is the system-level chapter that catches the interactions. Load management. Export coordination. Multi-source fault current contribution. Multi-source protection coordination."
          >
            <p>
              Chapter 82 is the new PEI chapter. Scope: all types of low-voltage electrical
              installations designated as Prosumer\'s Electrical Installations, where local
              production and / or storage of energy is present. Compliance required where
              applicable.
            </p>
            <p>The stated objective of Chapter 82:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                Compatibility with current and future ways to deliver electrical energy
                to current-using equipment
              </li>
              <li>
                Supply from the public network OR from local sources (or both, in
                parallel)
              </li>
              <li>
                Coherent design, erection and verification of the install as a single
                system rather than separate per-technology installations
              </li>
            </ul>
            <p>How Chapter 82 interlocks with the per-technology chapters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-technology chapters still apply</strong>
                {' '}— Section 712 governs PV-side design, Section 722 governs EV-side
                design, Chapter 57 governs BESS-side design, Section 551 governs the
                generator-side interface
              </li>
              <li>
                <strong className="text-white">Chapter 82 adds the system layer</strong>
                {' '}— load management, export coordination, multi-source fault current
                contribution, multi-source protection coordination
              </li>
              <li>
                <strong className="text-white">Section 722 was updated in A4</strong> with
                an explicit reference to prosumer installations — making the EV-chargepoint
                design conversation cross-chapter on any property with local generation
              </li>
              <li>
                <strong className="text-white">Reg 826.1.4 addresses PEI overvoltages</strong>
                {' '}— transient overvoltages in PEIs may be more frequent / greater than
                in non-PEI installs; SPD installation should be considered
              </li>
            </ul>
            <p>
              The 19th Edition is expected to deepen Chapter 82\'s treatment. A4 introduced
              the framework; the consolidation in the next edition is expected to extend
              the PEI requirements alongside the broader Part 7 LCT consolidation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 82 (new in A4) — Prosumer\'s Electrical Installations"
            clause="Chapter 82 is a new chapter providing requirements, measures and recommendations for design, erection and verification of all types of low-voltage electrical installations designated as Prosumer\'s Electrical Installations (PEIs). It applies where local production and/or storage of energy is present in a low-voltage installation. The objective is compatibility with current and future ways to deliver electrical energy from the public network or local sources."
            meaning="Chapter 82 is the regulatory acknowledgement that the hybrid LCT install is a coherent system. Per-technology chapters (712, 722, Chapter 57) still apply at their layer; Chapter 82 adds the system-level discipline above them."
          />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild — the hybrid case</ContentEyebrow>

          <Pullquote>On a hybrid install, the chapter you read first is wrong.</Pullquote>

          <Scenario
            title="Hybrid PV + BESS + EV with V2G capability on a TN-C-S domestic property"
            situation="A homeowner wants a 6 kWp grid-tied PV array, a 10 kWh AC-coupled battery, and a 7.4 kW EV chargepoint with V2G. Existing supply TN-C-S (PME), single-phase 100 A, CU with three spare ways, EPC C with planned heat pump retrofit in the following 12 months."
            whatToDo="Map the chapter set first. Section 712 governs the PV-side. Chapter 57 governs the BESS — chemistry, BMS interface, ventilation, isolation. Section 722 governs the EV chargepoint, including the A4 deletion of the 'reasonably practicable' PME exception. Section 551 governs the supply-boundary interface for all three sources — bidirectional protective device (551.7.1(c)), supply-side installation (551.7.2.1, with the BESS treated as a generating set), automatic disconnection (551.7.4), prevention of reconnection (551.7.5), isolation (551.7.6). The forthcoming heat pump retrofit may engage Section 753 if electric UFH is paired with it. Appendix 17 design considerations may apply to cable sizing. The IET Codes of Practice (PV, EESS, EV) are the operational references. G99 notification applies because the aggregate inverter capacity is likely above the G98 16 A per-phase threshold."
            whyItMatters="The single most expensive design failure on hybrid installs is reading only the 'dominant' chapter. A designer who reads Section 712 and treats the BESS as a load downstream of the PV inverter has missed Reg 551.7.2.1 — the BESS is a generating set under Section 551 rules, and the bidirectional protective device under 551.7.1(c) is required at the BESS interface as well as at the PV interface. The corrected design typically requires additional protective devices and additional commissioning evidence — much cheaper to design in than to retrofit after the EICR observation."
          />

          <CommonMistake
            title="Treating the BESS as a load and missing Reg 551.7.2.1"
            whatHappens="A designer with strong PV background takes on a hybrid PV+BESS install. They apply Section 712 rigorously for the PV side. They read Chapter 57 for the battery technical requirements. They treat the BESS as a load downstream of the inverter — missing Reg 551.7.2.1 entirely. The bidirectional protective device required under 551.7.1(c) is omitted from the BESS interface. The EICR at periodic inspection in 2031 codes the omission against the current standard."
            doInstead="Read Section 551 alongside Chapter 57 on any BESS install — particularly the redrafted 551.7.2.1 which explicitly classifies stationary batteries (Chapter 57) as generating sets, not loads. The full Section 551 toolkit applies to the BESS. Document the chapter interplay on the cert — the next inspector reads the design intent rather than infers it."
          />

          <CommonMistake
            title="Applying general protective measures forbidden by Section 712 to a PV install"
            whatHappens="An installer with general 18th Edition competence designs a PV install using one of the general Part 4 protective measures — non-conducting location, earth-free local equipotential bonding, electrical separation for multiple items, or obstacles / placing out of reach. The general standard permits the measure; Section 712 explicitly disallows it for PV (712.410.3.5 and 712.410.3.6). The first MCS audit on the install flags the design."
            doInstead="Section 712 modifies the general Part 4 protective-measures toolkit for the PV case. Read 712.410.3.5 and 712.410.3.6 alongside the general Part 4 chapters. The most common compliant measure for PV is double or reinforced insulation (Reg 712.412), which maps to Class II module construction."
          />

          <CommonMistake
            title="Reading Section 715 ELV lighting requirements as applying to mainstream PV / BESS"
            whatHappens="A designer working on an off-grid LCT install reads Section 715 (extra-low voltage lighting installations) and assumes it applies to the whole DC side of the battery bank — including the inverter input and the high-voltage DC string. The over-application of 715 introduces unnecessary design constraints and gets the inspection / test methodology wrong."
            doInstead="Section 715 applies only to ELV lighting supplied from a source with a maximum rated voltage of 50 V AC or 120 V DC (Reg 715.1). The DC string of a typical grid-tied PV system operates well above 120 V DC and is outside 715\'s scope. Section 715 becomes relevant only on ELV DC lighting circuits drawn directly from a low-voltage battery bank."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The IET Codes of Practice — where they slot in</ContentEyebrow>

          <ConceptBlock
            title="BS 7671 sets the regulatory framework; the IET CoPs fill the operational gap"
            plainEnglish="Each LCT chapter is paired with a corresponding IET Code of Practice. BS 7671 says what must be achieved; the IET Code says how to achieve it in practice — inspection, testing, commissioning, maintenance."
            onSite="On the workbench for every LCT install: the BS 7671 chapter, the corresponding IET Code of Practice, the manufacturer\'s installation instructions. Three documents, one reference set."
          >
            <p>The three LCT-relevant IET Codes of Practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">IET CoP for Grid-Connected Solar
                Photovoltaic Installations</strong> — complement to Section 712. Covers PV
                inspection, testing (linking to BS EN 62446), routine maintenance,
                periodic inspection. Currently in 5th edition.
              </li>
              <li>
                <strong className="text-white">IET CoP for Electrical Energy Storage
                Systems</strong> — complement to Chapter 57. Covers chemistry-aware design,
                siting and fire-detection arrangements, ventilation requirements, isolation
                philosophy, emergency response procedures. Currently in 5th edition.
              </li>
              <li>
                <strong className="text-white">IET CoP for Electric Vehicle Charging
                Equipment Installation</strong> — complement to Section 722. Covers the
                PEN-fault decision tree, load management approaches, commissioning steps.
                Currently in 5th edition.
              </li>
            </ul>
            <p>
              GN3 explicitly cross-references all three Codes. The faster revision cadence
              (compared to BS 7671\'s four-year amendment cycle) reflects how quickly LCT
              practice evolves.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 (BS 7671 Guidance Note 3) — cross-references to IET Codes of Practice"
            clause="GN3 identifies solar photovoltaic (PV) power supply systems as installations that require additional guidance, experience or training for inspection, testing and certification. The equivalent cross-references apply for electrical energy storage systems and electric vehicle charging."
            meaning="For the LCT installer the three Codes are non-optional reference material — not statutory, but the accepted reference for competent practice. PI insurers, MCS auditors, courts and EICR inspectors all treat consultation of the relevant Code as evidence of competent practice."
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The 19th Edition — consolidation direction</ContentEyebrow>

          <ConceptBlock
            title="The 19th Edition is expected to consolidate the LCT chapters"
            plainEnglish="The current chapter map is the artefact of historical accretion. The 19th Edition is in committee. The expected direction is consolidation — a coherent Part 7 LCT framework, and Appendix 17 promoted into a full Part 8."
            onSite="Build today\'s LCT cert workflow on the current chapter map but design it to accommodate consolidation. The 19th Edition preserves technical content; it changes architecture."
          >
            <p>The 19th Edition timeline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Currently in IET / BSI joint committee</li>
              <li>Public consultation expected during 2027–2028</li>
              <li>Publication targeted for 2028–2029</li>
              <li>Implementation transition typically through 2029–2030</li>
            </ul>
            <p>Expected direction of the 19th Edition:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Consolidation of LCT chapters (551, 712, 715, 722, 730, 753, Chapter 57, Appendix 17) into a clearer Part 7 framework</li>
              <li>Appendix 17 promoted into a new Part 8 on energy efficiency</li>
              <li>Deeper integration with the international BS EN 60364 series</li>
              <li>A4 recordkeeping trajectory (Reg 133.1.3, 551.7.1(c)) extended</li>
            </ul>
            <p>
              For the installer working today, the practical advice is to learn the current
              chapter map well — the consolidation preserves technical content rather than
              invents new requirements. The cert workflow built for A4 is the same workflow
              the 19th Edition will expect.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'BS 7671\'s LCT content is fragmented across Sections 551, 712, 715, 722, 730, 753, Chapter 57, Chapter 82 and Appendix 17. Historical accretion, not architectural intent.',
              'Section 551 is the spine of grid-tied LCT design — touched by every grid-tied LCT install.',
              'Reg 551.7.2.1 explicitly classifies stationary batteries (Chapter 57) as generating sets, not loads — reshaping how Chapter 57 interlocks with Section 551 on hybrid designs.',
              'Chapter 57 (new in A4) is the dedicated stationary secondary battery chapter; Reg 551.8 was deleted, content moved into Chapter 57. Pluggable UPS, fire and emergency lighting batteries are explicitly excluded.',
              'Chapter 82 (new in A4) is the Prosumer\'s Electrical Installations chapter — the system-level chapter that ties hybrid PV + BESS + EV + heat pump installs together as a coherent system rather than separate per-technology installs.',
              'Section 712 (PV) modifies the general Part 4 protective measures — disallows some, permits double / reinforced insulation (Class II construction).',
              'Section 722 (EV) gained a prosumer reference in A4 (cross-referencing Chapter 82) and the deletion of the "reasonably practicable" exception in 722.411.4.1.',
              'Appendix 17 (new in A4) is the energy efficiency precursor to a future Part 8. The 19th Edition is expected to consolidate the LCT chapters into a coherent Part 7 framework, deepening Chapter 82 and promoting Appendix 17 to Part 8.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1.1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Why renewables now
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 OSG &amp; GN3 for LCT
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
