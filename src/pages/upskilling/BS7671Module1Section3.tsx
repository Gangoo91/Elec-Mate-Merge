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
  AppendixTable,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'bs7671-numbering',
    question: 'A regulation cited as "Reg 411.3.4" — what does each part of the number tell you?',
    options: [
      'Part 4 / Chapter 41 / Section 411 / Regulation 411.3.4',
      'Section 4 / Chapter 11 / Item 3.4',
      'Part 4 / Page 11.3.4',
      'Edition 4.11.3.4',
    ],
    correctIndex: 0,
    explanation:
      'The numbering is hierarchical and the first digit always tells you the Part. 411.3.4 lives in Part 4 (Protection for safety), Chapter 41 (Protection against electric shock), Section 411 (Protective measure: ADS), and is the fourth nested item — a new requirement under A4 for luminaire RCD protection in dwellings.',
  },
  {
    id: 'bs7671-part6-vs-part7',
    question:
      'You are doing the periodic inspection on a hospital theatre. Which Parts are in play?',
    options: [
      'Part 6 only — periodic inspection is Part 6',
      'Parts 1–6 generally, plus Section 710 (Medical locations) under Part 7',
      'Part 7 only — special locations override everything',
      'Part 4 only — protection for safety',
    ],
    correctAnswer: 1,
    explanation:
      'Periodic inspection methodology comes from Part 6 (Chapter 65). The technical requirements being assessed come from Parts 1–5 modified by Part 7 Section 710 (Medical locations). A4:2026 made a major revision to 710 — independent supplies in group 2 medical locations and a new Schedule of Test Results for supplementary protective equipotential bonding resistance.',
  },
  {
    id: 'bs7671-appendix-1-vs-app-2',
    question: 'When is Appendix 1 (Normative) different from Appendix 2 (Informative)?',
    options: [
      'Appendix 1 is mandatory referenced standards; Appendix 2 is statutory regulations and associated memoranda — for context, not normative',
      'They are interchangeable',
      'Appendix 1 covers cables; Appendix 2 covers earthing',
      'Only Appendix 2 has legal force',
    ],
    correctIndex: 0,
    explanation:
      'Appendices are tagged Normative or Informative. Normative (Appendix 1, the standards reference list) is binding — equipment / methods cited there must comply with the standards listed. Informative (Appendix 2 onwards in most cases) is supporting material — useful, often essential in practice, but not a requirement.',
  },
  {
    id: 'bs7671-part8-prosumer',
    question:
      'A customer fits a battery storage unit, a 4 kW PV array and a tethered EV charger to a domestic property. Which Part of BS 7671 sets the high-level functional framework for managing the local generation, storage and consumption together?',
    options: [
      'Part 4 — protection for safety covers everything',
      'Part 7 — Section 712 (Solar PV) is the only relevant requirement',
      'Part 8 — Functional requirements (the prosumer Part), supplemented by Section 712, Chapter 57 (stationary batteries) and Section 722 (EV charging)',
      'Part 5 only — equipment selection',
    ],
    correctIndex: 2,
    explanation:
      'Part 8 (Functional requirements) is the high-level framework — Chapter 82 covers prosumer installations (local generation + storage + load) and Chapter 81 (new under A4) covers energy efficiency. The detailed technical requirements still come from Part 7 (Section 712 for PV, Section 722 for EV charging), Part 5 Chapter 57 (stationary batteries — also new under A4) and Part 4 (protection). Part 8 sets the framework; Parts 4–7 deliver the detail.',
  },
  {
    id: 'bs7671-app3-vs-app4',
    question:
      'You need to find the maximum permitted Zs for a Type B 32 A MCB to give 0.4 s disconnection on TN. Which Appendix has the data?',
    options: [
      'Appendix 4 — current-carrying capacity tables',
      'Appendix 3 — time/current characteristics of overcurrent protective devices',
      'Appendix 14 — prospective fault current',
      'Appendix 6 — model forms',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 3 contains the time/current curves and the published Zs(max) values for every standard MCB / RCBO type and rating. App 4 covers cable rating and voltage drop (Iz, mV/A/m). App 14 is for prospective fault current calculation. App 6 is model forms. A4:2026 did not change App 3 device-curve data; it did revise the Appendix 4 cable tables (4A2 / 4D4A / 4E4A / 4H4A / 4J4A) for buried-cable methods.',
  },
  {
    id: 'bs7671-section716-poe',
    question:
      'A networking contractor is running PoE++ (Type 4, up to 90 W per port) on Cat 6A through a building. Which BS 7671 section now applies?',
    options: [
      'Section 729 — Operating or maintenance gangways',
      'Section 716 — Power over Ethernet (NEW under A4:2026)',
      'No BS 7671 section applies — data cabling is BS 6701 territory',
      'Section 710 — Medical locations',
    ],
    correctIndex: 1,
    explanation:
      'Section 716 (Power over Ethernet) is new under A4:2026. It applies where Ethernet cabling supplies power as well as data — IEEE 802.3bt PoE++ (90 W) being the headline case, but lower-power PoE classes also captured. Section 716 covers conductor temperature management in cable bundles, segregation from other circuits, and labelling. BS 6701 (telecoms cabling) and BS 7671 now overlap on PoE — both apply, with Section 716 the BS 7671 entry point.',
  },
  {
    id: 'bs7671-app16-eicr',
    question:
      'The customer asks you which Appendix lists the items an inspector should consider in a periodic inspection — the source the EICR Schedule of Inspections is built from?',
    options: [
      'Appendix 6 — Model forms',
      'Appendix 16 — Schedule of items requiring inspection during a periodic inspection',
      'Appendix 11 — Warning labels',
      'Appendix 5 — External influences',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 16 lists the items that should be considered during a periodic inspection — it is the technical source for the EICR Schedule of Inspections in Appendix 6. App 6 is the model forms (the cert templates themselves). App 11 is warning / instruction labels. App 5 is the BA / AD / AE external-influence classification matrix used at the design stage.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671:2018+A4:2026 includes a NEW chapter that did not exist pre-A4. Which one?',
    options: [
      'Chapter 41 — Protection against electric shock',
      'Chapter 57 — Stationary secondary batteries',
      'Chapter 64 — Initial verification',
      'Chapter 36 — Continuity of service',
    ],
    correctAnswer: 1,
    explanation:
      'A4 introduced Chapter 57 — Stationary secondary batteries. It covers requirements for stationary battery installations whose designed purpose is storage and supply of electrical installations (BESS, PV+battery, off-grid hybrid). Excludes batteries inside product-safety-standard equipment such as UPSs and central emergency-lighting power supplies. A4 also introduced Chapter 81 (Energy efficiency) and Section 716 (PoE).',
  },
  {
    id: 2,
    question:
      'Which Appendix contains the cable current-carrying capacity tables (4D / 4E / 4H / 4J series)?',
    options: [
      'Appendix 3 — Time/current characteristics',
      'Appendix 4 — Current-carrying capacity and voltage drop for cables',
      'Appendix 8 — Busbar trunking and powertrack',
      'Appendix 14 — Prospective fault current',
    ],
    correctAnswer: 1,
    explanation:
      'Appendix 4 holds the cable rating tables. A4:2026 revised Tables 4A2, 4D4A, 4E4A, 4H4A and 4J4A to introduce distinct buried-cable methods for cables in direct soil contact vs cables in a conduit or duct — a substantive correction of long-standing thermal modelling. Appendix 3 has the device time-current curves; Appendix 8 covers busbar trunking; Appendix 14 covers PSCC.',
  },
  {
    id: 3,
    question:
      'A regulation under Section 722 (EV charging) conflicts with a regulation in Chapter 41. Which applies?',
    options: [
      'Chapter 41 — it is the general regulation, always wins',
      'Section 722 — Part 7 supplements or modifies Parts 1–6 (Reg 110.1.3); the special-location requirement applies',
      'Whichever the certifying body chooses',
      'They never conflict — Part 7 always extends Part 4',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 110.1.3 explicitly says Part 7 supplements or modifies Parts 1–6. Where a Part 7 section gives a more stringent or different requirement (e.g. 722 requires specific PME Open-PEN protection for EV chargers — a modification of standard ADS thinking), the Part 7 requirement applies on the special location. Chapter 41 still applies everywhere it is not modified.',
  },
  {
    id: 4,
    question:
      'Which Part of BS 7671:2018+A4:2026 is the home of "Functional requirements" — the framework for prosumer installations and (under A4) energy efficiency?',
    options: [
      'Part 5 — Selection and erection of equipment',
      'Part 6 — Inspection and testing',
      'Part 7 — Special installations or locations',
      'Part 8 — Functional requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Part 8 — Functional requirements — was added in BS 7671:2018 itself with Chapter 82 (Prosumer\u2019s low-voltage electrical installations) covering local generation + storage + load. A4:2026 added Chapter 81 (Energy efficiency) into Part 8 and removed the old Appendix 17 (whose energy-efficiency content was promoted into the new Chapter 81). Part 8 is the high-level framework Part — detailed technical requirements still live in Parts 4–7.',
  },
  {
    id: 5,
    question:
      'Reg 110.1.1 sets the scope of BS 7671. Which best summarises what 110.1.1 actually says?',
    options: [
      'BS 7671 applies to every electrical installation in the UK without exception',
      'BS 7671 applies to the design, erection and verification of electrical installations operating at low voltage and below — listed installation types are explicitly within scope',
      'BS 7671 applies only to domestic premises',
      'BS 7671 applies only to new installations — it has no role in periodic inspection',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 110.1.1 lists the installations BS 7671 covers — domestic, commercial, industrial, agricultural, prefabricated, caravans, marinas, generation/storage, EV charging, etc. Reg 110.2 lists the limited cases excluded (e.g. National Grid transmission systems, traction systems, deep-well systems, equipment inside aircraft / ships covered by other standards). Periodic inspection IS within scope — Part 6 (Chapter 65) lives inside the same standard.',
  },
  {
    id: 6,
    question:
      'In BS 7671:2018+A4:2026, where would you find the model EIC, EICR, Minor Works Certificate and Schedule of Test Results templates?',
    options: [
      'Appendix 1 — referenced standards',
      'Appendix 2 — statutory regulations and memoranda',
      'Appendix 6 — Model forms for certification and reporting',
      'Appendix 16 — items to consider during periodic inspection',
    ],
    correctAnswer: 2,
    explanation:
      'Appendix 6 is the model-forms appendix. A4:2026 redrafted the App 6 condition-report notes, updated signature wording (those of the persons executing the work and authorising the report), changed the FI code so it no longer needs to be marked unsatisfactory, and added new Schedule of Test Results columns to support AFDD recording, TN-C-S (PNB) selection and stationary battery installations.',
  },
  {
    id: 7,
    question:
      'Under A4:2026 the standard introduces a new section on functional earthing for ICT equipment. Which section?',
    options: [
      'Section 444 — Measures against electromagnetic disturbances',
      'Section 545 — Functional earthing for ICT equipment (new under A4)',
      'Section 716 — Power over Ethernet',
      'Section 559 — Luminaires and lighting installations',
    ],
    correctAnswer: 1,
    explanation:
      'Section 545 (Functional earthing for ICT equipment) was added under A4:2026 inside Chapter 54 (Earthing arrangements and protective conductors). It distinguishes functional earthing (used for the proper operation of ICT equipment, e.g. low-noise reference) from protective earthing (for safety), and sets requirements for the conductors and connection arrangements where both functions are present. Sits alongside the existing 543 / 544 protective-conductor requirements.',
  },
  {
    id: 8,
    question: 'Which item did A4:2026 delete when it withdrew the CRL surge-protection route?',
    options: [
      'Appendix 17 (Energy Efficiency)',
      'Annex A443 (the CRL worked examples), together with Reg 443.5',
      'Appendix 4 (cable tables)',
      'Annex A444 (bonding network structures)',
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 withdrew the CRL (calculated risk level) route for surge protection: Regulation 443.5 and its supporting Annex A443 were deleted, and SPD selection now follows Reg 443.4 directly. Appendix 17 (Energy Efficiency) and Annex A444 were retained. The headline structural change in A4 was the new Chapter 82 for Prosumer's Electrical Installations (PEIs).",
  },
];

const faqs = [
  {
    question: 'How is the numbering organised again?',
    answer:
      'Hierarchical, four levels deep. Part (1 digit, 1–8) → Chapter (2 digits, first digit = Part) → Section (3 digits, first two = Chapter) → Regulation (varies, first three = Section). So Reg 411.3.4 = Part 4 / Chapter 41 / Section 411 / fourth-level item .3.4. Some sections in Part 7 use 700-series numbering (e.g. 701, 710, 722) and behave the same way.',
  },
  {
    question: 'Why does A4:2026 mark some chapters "NOT USED"?',
    answer:
      'BS 7671 retains the IEC 60364 numbering scheme even when a chapter has been deleted or never adopted. Chapters 45 and 61–63 are marked NOT USED — that lets the BS 7671 numbering stay aligned with the parent IEC standard so cross-references remain stable across editions and across European jurisdictions.',
  },
  {
    question: 'Which Appendix is the model forms appendix?',
    answer:
      'Appendix 6 — Model forms for certification and reporting. EICs, EICRs, Schedules of Test Results, Schedules of Inspections, Minor Works Certificates. A4:2026 redrafted the App 6 condition-report notes (rearranged for clarity), updated signature wording (those of the persons executing the work and authorising the report), and changed the FI code so it no longer needs to be marked as unsatisfactory.',
  },
  {
    question: 'And what got deleted under A4?',
    answer:
      'Under A4:2026 the main deletions were the CRL (calculated risk level) surge-protection route — Regulation 443.5 and its supporting Annex A443 — along with Appendix 3 Table 3A (RCD time/current performance criteria) and Regulation 514.14 (non-standard colours). Appendix 17 (Energy Efficiency) was retained, and A4 added the new Chapter 82 for Prosumer\'s Electrical Installations (PEIs). BS 7671 keeps the IEC 60364 numbering scheme, so deleted regulation numbers are marked "NOT USED" to keep cross-references stable.',
  },
  {
    question: 'What does Reg 110.1.1 actually do for me on the cert?',
    answer:
      'Reg 110.1.1 sets the scope — it tells you whether BS 7671 applies at all to the work in front of you. Domestic premises, commercial, industrial, agricultural, prefabricated buildings, caravans, marinas, low-voltage generation and storage, EV charging — all listed in scope. Reg 110.2 lists the narrow exclusions (National Grid transmission, traction systems, deep-well rigs, aircraft / ships internals). Cite 110.1.1 on a contested job to remind a customer that BS 7671 is the right standard for the work; cite 110.2 if you are turning down a National Grid or rail-traction enquiry that needs a different code of practice.',
  },
  {
    question:
      'Where do I find the regulations that govern initial verification and periodic inspection?',
    answer:
      'Part 6 — Inspection and testing — runs Chapters 64 (Initial verification) and 65 (Periodic inspection and testing). Chapters 61, 62 and 63 are marked NOT USED to preserve IEC numbering. Chapter 64 covers the initial-verification process behind the EIC; Chapter 65 covers the periodic-inspection process behind the EICR. The cert templates themselves live in Appendix 6.',
  },
  {
    question:
      'Why does Part 2 (Definitions) have a Chapter 21 with no number prefix on the entries?',
    answer:
      'Part 2 is the dictionary. Each defined term is listed alphabetically rather than under sub-numbered regulations, because definitions do not impose requirements — they fix the meaning of terms used elsewhere. When a regulation says "exposed-conductive-part", the binding meaning of that hyphenated term is the entry in Part 2. A4:2026 added definitions for prosumer-related terms, energy-efficiency terms (matched to the new Chapter 81) and stationary battery terms (matched to the new Chapter 57).',
  },
  {
    question: 'Is Part 3 (Assessment of general characteristics) the same as a load survey?',
    answer:
      'No — Part 3 is broader. It runs Chapters 30 to 36 and tells the designer to assess: maximum demand and diversity (Ch 31), supply characteristics (Ch 31), conductor arrangement and earthing (Ch 31), external influences (Ch 32 — keyed to App 5), compatibility (Ch 33), maintainability (Ch 34), safety services (Ch 35) and continuity of service (Ch 36). A load survey is one input to Chapter 31 — Part 3 sits over the top of it as the design-assessment framework.',
  },
  {
    question:
      'When I read a regulation that says "see Section X", how do I know the cross-reference is current?',
    answer:
      'Look at the running header of the page you land on. BS 7671:2018+A4:2026 carries the dated edition in the header. If the cross-reference points to a deleted regulation (Appendix 7, deleted by A2:2022; Appendix 17, deleted by A4:2026; Annex B443, deleted by A4:2026), the current standard will state it explicitly — the deleted entry is replaced with a "Deleted" or "NOT USED" line so the numbering still resolves. Always check the dated edition; old red-book / blue-book references can survive in trade documentation that has not been updated.',
  },
];

const partsRows: React.ReactNode[][] = [
  ['Part 1', 'Scope, object and fundamental principles', 'Ch 11 · 12 · 13'],
  ['Part 2', 'Definitions', 'Definitions, symbols, abbreviations'],
  ['Part 3', 'Assessment of general characteristics', 'Ch 30–36'],
  ['Part 4', 'Protection for safety', 'Ch 41–46 (45 NOT USED)'],
  ['Part 5', 'Selection and erection of equipment', 'Ch 51–57 (Ch 57 NEW under A4)'],
  ['Part 6', 'Inspection and testing', 'Ch 64–65 (Ch 61–63 NOT USED)'],
  ['Part 7', 'Special installations or locations', 'Sec 700-series'],
  ['Part 8', 'Functional requirements', 'Ch 81 NEW under A4 · Ch 82'],
];

const appendicesRows: React.ReactNode[][] = [
  ['App 1', 'Normative — referenced British and other standards', '—'],
  ['App 2', 'Informative — statutory regulations and memoranda', '—'],
  ['App 3', 'Informative — time/current characteristics of OPDs', '—'],
  [
    'App 4',
    'Informative — cable CCC and voltage drop',
    'Tables 4A2 / 4D4A / 4E4A / 4H4A / 4J4A revised under A4',
  ],
  ['App 5', 'Informative — classification of external influences', '—'],
  ['App 6', 'Informative — model forms', 'Notes redrafted; FI code change under A4'],
  ['App 7', 'Deleted', 'Deleted by A2:2022'],
  ['App 8', 'Informative — busbar trunking and powertrack', '—'],
  ['App 9', 'Informative — IT, multiple source, DC and other systems', '—'],
  ['App 10', 'Informative — protection of conductors in parallel', '—'],
  ['App 11', 'Informative — warning and user instruction labels', '—'],
  ['App 12', 'NOT USED', '—'],
  [
    'App 13',
    'Informative — escape routes and fire protection',
    'First part redrafted under A4 (BS 9991 / 9999)',
  ],
  ['App 14', 'Informative — determination of prospective fault current', '—'],
  ['App 15', 'Informative — ring and radial final circuit arrangements', '—'],
  ['App 16', 'Informative — devices for protection against overvoltage', '—'],
  ['App 17', 'Deleted', 'Deleted by A4:2026 — content promoted to new Chapter 81'],
];

const a4StructuralChangesRows: React.ReactNode[][] = [
  [
    'NEW Chapter 57',
    'Stationary secondary batteries',
    'Storage purpose-installations (BESS, PV+battery, off-grid)',
  ],
  [
    'NEW Chapter 81',
    'Energy efficiency',
    'Replaces deleted Appendix 17; design-stage efficiency requirements',
  ],
  ['NEW Section 716', 'Power over Ethernet', 'PoE / PoE+ / PoE++ — power delivery on data cabling'],
  [
    'NEW Section 545',
    'Functional earthing for ICT equipment',
    'Distinguishes functional from protective earthing',
  ],
  [
    'Major revision Section 710',
    'Medical locations',
    'Independent supplies in group 2; new SoTR for supplementary bonding',
  ],
  [
    'Major revision Section 722',
    'EV charging installations',
    'PME Open-PEN protection; PEN prohibition (722.312.2.1)',
  ],
  [
    'Revised Table 51',
    'Conductor identification',
    'Updated colour / letter coding for new system arrangements',
  ],
  ['Revised Table 52.1', 'Cables in walls or partitions', 'Refined depth / armour / RCD criteria'],
  [
    'Revised Appendix 4',
    'Cable CCC and voltage drop',
    'Buried-cable methods split: direct vs in conduit / duct',
  ],
  ['Deleted Appendix 17', 'Energy efficiency (old)', 'Content promoted to new Chapter 81'],
  [
    'Deleted Annex B443',
    'Within Section 444 (EM disturbances)',
    'Content reorganised in Section 444 main text',
  ],
];

export default function BS7671Module1Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'Structure of BS 7671:2018+A4:2026 | Module 1.3',
    description:
      'How BS 7671:2018+A4:2026 is organised — Parts, Chapters, Sections, Regulations, Appendices — and the structural changes A4 introduced (Chapter 57, Chapter 81, Section 716, deleted App 17 and Annex B443).',
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
            eyebrow="Module 1 · Section 3 · Updated for A4:2026"
            title="Structure of BS 7671 (parts, chapters, appendices)"
            description="Eight Parts, ~30 Chapters, ~20 Section-700 special locations, 17 Appendices (two deleted, one NOT USED). Reading the regs faster starts with knowing the shape of the book."
            actions={
              <>
                <RegBadge>110.1.1</RegBadge>
                <RegBadge>110.1.3</RegBadge>
                <AmendmentBadge regs={['110.1.3']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Hierarchical numbering. Reg 411.3.4 = Part 4 / Chapter 41 / Section 411 / item .3.4. The first digit always names the Part.',
              'Parts 1–6 are the general regulations; Part 7 is special locations and supplements/modifies Parts 1–6 (Reg 110.1.3); Part 8 is the high-level functional framework (prosumer + energy efficiency).',
              'A4:2026 added Chapter 57 (stationary batteries), Chapter 81 (energy efficiency, replacing deleted App 17), Section 716 (Power over Ethernet) and Section 545 (functional earthing for ICT). Deleted App 17 and Annex B443.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Decompose any regulation reference (e.g. 411.3.4) into Part, Chapter, Section and item — and predict the topic from the number alone.',
              'Identify what each of the eight Parts covers and which Chapters / Sections sit within each.',
              'Apply Reg 110.1.3 to read a Part 7 special-location section as either supplementing or modifying the general regulations.',
              'Locate frequently-used appendix data — App 4 (cable CCC and voltage drop), App 6 (model forms), App 3 (device curves), App 14 (PSCC), App 16 (EICR inspection items).',
              'Identify A4:2026 structural changes — new Chapter 57, Chapter 81, Section 716, Section 545; deleted App 17 and Annex B443.',
              'Use the side-bar margin markings in the printed standard to spot every technical A4 change in any Part you actively work in.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The eight Parts</ContentEyebrow>

          <ConceptBlock
            title="The eight Parts"
            plainEnglish="BS 7671 is built as eight Parts. Parts 1 and 2 are reference. Part 3 is design assessment. Parts 4 to 6 are the technical core (protection, equipment, inspection). Part 7 modifies the core for special locations. Part 8 is the high-level functional framework."
            onSite="Most day-to-day work hits Parts 4, 5 and 7 — protection, equipment selection, and special locations. Periodic inspection lives in Part 6. Part 1 and Part 2 are reference: cite them when a designer or solicitor asks why."
          >
            <p>
              The structure mirrors the IEC 60364 international framework. Numbering is preserved
              even where a chapter has been removed (e.g. Chapter 45, Chapters 61–63 are marked NOT
              USED) so cross-references remain stable across editions. The deliberate alignment with
              IEC 60364 means a UK electrician reading a European specification can map the
              regulation references one-for-one — Part numbers, Chapter numbers and Section numbers
              line up with their continental equivalents wherever a Part is shared.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="BS 7671:2018+A4:2026 — Parts and their constituent Chapters"
            source="Pages 1–8, Contents"
            headers={['Part', 'Title', 'Chapters / Sections']}
            rows={partsRows}
          />

          <ConceptBlock
            title="What each Part actually contains"
            plainEnglish="A one-line summary of each Part — what is in it, why it exists, when you reach for it on the day."
            onSite="Tab the contents page. The single most common mistake on a first reading of a Part 7 section is starting in Chapter 41 instead. Open the section first; it tells you which general regulations are modified before you go and read them."
          >
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">
                  Part 1 — Scope, object and fundamental principles.
                </strong>{' '}
                Chapter 11 sets the scope (Reg <RegBadge>110.1.1</RegBadge> lists what installations
                are covered; Reg 110.2 lists the narrow exclusions). Chapter 12 sets the object —
                safety from injury and damage. Chapter 13 sets the fundamental principles every
                later Part is built on (good workmanship, suitable materials, accessibility,
                identification).
              </li>
              <li>
                <strong className="text-white">Part 2 — Definitions.</strong> Alphabetical, no
                regulation numbers because definitions do not impose requirements — they fix
                meaning. A4:2026 added definitions for prosumer terms, energy-efficiency terms
                (matched to new Chapter 81) and stationary-battery terms (matched to new Chapter
                57).
              </li>
              <li>
                <strong className="text-white">
                  Part 3 — Assessment of general characteristics.
                </strong>{' '}
                Chapters 30–36. Maximum demand / diversity, supply characteristics, conductor
                arrangement, external influences (keyed to Appendix 5), compatibility,
                maintainability, safety services, continuity of service.
              </li>
              <li>
                <strong className="text-white">Part 4 — Protection for safety.</strong> Chapters
                41–46. Protection against electric shock (41), thermal effects (42), overcurrent
                (43), voltage disturbances and EM disturbances (44), undervoltage (45 — NOT USED),
                isolation and switching (46). The dense technical core for everyday safety design.
              </li>
              <li>
                <strong className="text-white">
                  Part 5 — Selection and erection of equipment.
                </strong>{' '}
                Chapters 51–57. Common rules (51), wiring systems (52), isolation, switching,
                control (53), earthing arrangements (54 — including new Section 545 for ICT
                functional earthing), other equipment (55), safety services (56), and the new{' '}
                <AmendmentBadge regs={['Chapter 57']} /> stationary secondary batteries.
              </li>
              <li>
                <strong className="text-white">Part 6 — Inspection and testing.</strong> Chapters 64
                (initial verification) and 65 (periodic inspection). The EIC and EICR processes live
                here; the templates themselves are Appendix 6.
              </li>
              <li>
                <strong className="text-white">Part 7 — Special installations or locations.</strong>{' '}
                The 700-series sections (701 bath/shower, 705 agriculture, 710 medical, 712 PV, 716
                PoE NEW, 722 EV, 740 fairgrounds, 753 heating, 760 fire safety, etc). Reg{' '}
                <RegBadge>110.1.3</RegBadge> says Part 7 supplements or modifies Parts 1–6.
              </li>
              <li>
                <strong className="text-white">Part 8 — Functional requirements.</strong> Chapter 82
                (Prosumer — local generation + storage + load) and the new{' '}
                <AmendmentBadge regs={['Chapter 81']} /> energy efficiency. Part 8 is the framework
                Part — detailed technical requirements still live in Parts 4–7.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="How a regulation number reads"
            plainEnglish={
              <>
                Take Reg <RegBadge>411.3.4</RegBadge>. First digit (4) names the Part — Protection
                for safety. First two digits (41) name the Chapter — Protection against electric
                shock. First three digits (411) name the Section — Protective measure: automatic
                disconnection of supply (ADS). The remaining digits (.3.4) point to a specific
                requirement within that Section. Reg 411.3.4 is a NEW under A4: 30 mA RCD on AC
                final circuits supplying luminaires in dwellings.
              </>
            }
            onSite="When you cite, cite the dated edition and the full numeric reference: 'BS 7671:2018+A4:2026 Reg 411.3.4'. Don't shorten to '411' on the cert — it lands in court ambiguous."
          >
            <p>
              <RegBadge>Reg 411.3.4</RegBadge> sits inside <RegBadge>Section 411</RegBadge> (ADS).
              Section 411 sits inside Chapter 41 (Protection against electric shock). Chapter 41
              sits inside Part 4 (Protection for safety). <AmendmentBadge regs={['411.3.4']} /> is
              one of the most frequently-tested A4 additions. The same decoding works in reverse:
              see a citation like 543.1.1 and you know instantly it sits in Part 5 / Chapter 54
              (Earthing arrangements and protective conductors) / Section 543 (Protective
              conductors) — without looking it up.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Reg 110 — scope and the override mechanic</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.1.1 — Scope"
            clause="The Regulations apply to the design, erection and verification of electrical installations including additions and alterations to existing installations. Existing installations that have been installed in accordance with earlier editions of the Regulations may not comply with this edition in every respect. This does not necessarily mean that they are unsafe for continued use or require upgrading."
            meaning="Defines what BS 7671 covers — design, erection, verification — and confirms the standard is forward-looking. An installation legally compliant when built does not become unsafe automatically when a new edition is published; it becomes a deviation from the current edition, which is what the EICR coding system is designed to record."
            cite="BS 7671:2018+A4:2026, Reg 110.1.1"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.1.3 — Part 7 override"
            clause="The requirements of Part 7 supplement or modify the general requirements contained in other Parts of the Regulations."
            meaning="The single most important sentence for navigating special locations. When a Part 7 section gives a different requirement from a Part 4 / 5 chapter, the Part 7 requirement applies on that location. Section 722 modifies ADS for EV charging. Section 701 supplements Chapter 41 inside the bathroom zone. Open the section before you open the chapter."
            cite="BS 7671:2018+A4:2026, Reg 110.1.3"
          />

          <ConceptBlock
            title="Part 7 — Special installations or locations"
            plainEnglish="Part 7 is the location-specific override layer. Sections in the 700 series each cover a specific environment and may add to or change the general regulations for that environment only."
            onSite="Open the section before you open Chapter 41. The section either modifies the general regs (e.g. 722 EV charging modifies the ADS approach for PME) or supplements them (e.g. 701 adds zone bonding requirements for bathrooms). Get the order wrong and you can spend an hour solving a problem the section solves in a single regulation."
          >
            <p>
              The 700-series is where most modern install pain lives. The sections most likely to
              come up in CPD recalibration:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">701</strong> — Locations containing a bath or shower.
              </li>
              <li>
                <strong className="text-white">705</strong> — Agricultural and horticultural
                premises.
              </li>
              <li>
                <strong className="text-white">710</strong> — Medical locations (major revision
                under A4: independent supplies in group 2; new Schedule of Test Results for
                supplementary bonding resistance).
              </li>
              <li>
                <strong className="text-white">711</strong> — Exhibitions, shows and stands.
              </li>
              <li>
                <strong className="text-white">712</strong> — Solar PV.
              </li>
              <li>
                <strong className="text-white">716</strong> —{' '}
                <AmendmentBadge regs={['Section 716']} /> Power over Ethernet (NEW under A4).
              </li>
              <li>
                <strong className="text-white">722</strong> — EV charging installations.
              </li>
              <li>
                <strong className="text-white">740</strong> — Fairgrounds, amusement parks,
                circuses.
              </li>
              <li>
                <strong className="text-white">753</strong> — Heating cables and embedded heating
                systems.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Confusing Section 708 (caravan parks) with Section 709 (marinas) on the cert"
            whatHappens="An installer working at a marina caravan park ticks 708 on the cert. The section reference is for caravan / camping parks; the marina shore-supply pedestals are governed by 709. The cert points the next inspector at the wrong special-location requirements."
            doInstead="708 is electrical installations in caravan / camping parks. 709 is marinas and similar locations. Where a site is both (a marina with on-site caravan pitches), cite both — the pedestals serving floating berths are 709; the caravan pitches are 708. Section 740 (fairgrounds) is similarly easy to confuse with 711 (exhibitions, shows and stands) — they cover different temporary-installation profiles."
          />

          <CommonMistake
            title="Reading Chapter 41 first and ignoring the Part 7 override"
            whatHappens="Designer specs ADS by 30 mA RCD on a domestic EV install, satisfies Chapter 41, ticks the cert. Job is later flagged on a periodic — Section 722 (Reg 722.312.2.1) prohibits a PEN conductor in the EV circuit on TN supplies. The general Chapter 41 design did not include the 722 modification. Open-PEN risk is now baked into the install."
            doInstead="Reg 110.1.3 means Part 7 supplements OR modifies Parts 1–6. Always identify the Part 7 section that applies to the location BEFORE doing the Chapter 41 protective-measure design. Read the Part 7 section in full; tab the modifications it makes; then apply Chapter 41 with those modifications baked in. The order is location-first, general-rule-second."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The Appendices</ContentEyebrow>

          <ConceptBlock
            title="The Appendices: normative vs informative"
            plainEnglish="Appendices either carry the same legal weight as the regulations (Normative) or sit alongside them as design reference (Informative). Knowing which is which avoids citing the wrong type."
          >
            <p>
              Appendix 1 (referenced standards) is the only Normative appendix — its contents carry
              the same weight as the regulations. Appendices 2 onwards are Informative — guidance,
              design tools and reference data. Informative does not mean optional in practice (you
              cannot avoid Appendix 4 if you size cables) but it does mean the detailed methodology
              is not itself the requirement. The legal hook is always the regulation in Parts 1–8
              that points to the appendix; the appendix supplies the numerical method or reference
              data.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Appendices 1–17 — what each contains and what A4 changed"
            source="Pages 410–591, BS 7671:2018+A4:2026"
            headers={['#', 'Title / type', 'A4:2026 changes']}
            rows={appendicesRows}
            notes="App 7 deleted by A2:2022; App 12 NOT USED; App 17 deleted by A4 — content moved into new Chapter 81. Side-bar margins indicate technical A4 changes; non-technical re-indenting is not marked."
          />

          <ConceptBlock
            title="The appendices you actually use weekly"
            plainEnglish="A handful of appendices come out daily. Tab them. The rest are reference for specific scenarios."
            onSite="Tab the appendices you use weekly: App 3 (device curves), App 4 (cable rating), App 6 (model forms), App 14 (PSCC), App 16 (EICR inspection items). Tab the special-location sections you work in. The index is your fastest route for a topic search; the contents page is your fastest route once you know which Part you need."
          >
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">Appendix 1 (Normative).</strong> Referenced standards
                — every BS, BS EN and IEC standard the regulations call up. If a regulation says "to
                BS EN 61009-1", App 1 confirms the title and currency.
              </li>
              <li>
                <strong className="text-white">Appendix 3.</strong> Time/current characteristics of
                overcurrent protective devices. Type B / C / D MCB curves, gG / gM fuses, published
                Zs(max) for every standard rating. The disconnection-time evidence on every cert
                traces back here.
              </li>
              <li>
                <strong className="text-white">Appendix 4.</strong> Cable current-carrying capacity
                and voltage drop. Tables 4D / 4E / 4H / 4J for different insulation and installation
                methods. A4 split the buried-cable methods into direct-soil-contact and
                in-conduit-or-duct — re-check any buried-cable design done under A3.
              </li>
              <li>
                <strong className="text-white">Appendix 6.</strong> Model forms — EIC, EICR,
                Schedule of Test Results, Schedule of Inspections, Minor Works Certificate. A4
                redrafted notes, updated signature wording, changed the FI code so it no longer
                needs to be marked unsatisfactory, and added new SoTR columns for AFDD recording,
                TN-C-S (PNB) selection, and stationary battery installations.
              </li>
              <li>
                <strong className="text-white">Appendix 14.</strong> Determination of prospective
                fault current — PSCC at the origin and along the run, used to confirm the OPD
                breaking capacity is adequate.
              </li>
              <li>
                <strong className="text-white">Appendix 16.</strong> Schedule of items requiring
                inspection during a periodic inspection — the technical source for the EICR Schedule
                of Inspections in Appendix 6. When a customer queries why an inspection line is on
                the cert, the answer is App 16.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>A4:2026 structural changes</ContentEyebrow>

          <ConceptBlock
            title="What A4:2026 actually re-shaped"
            plainEnglish="A4 is bigger structurally than most amendments — it adds whole chapters and a new section, deletes one appendix and one annex, and rewrites the cable-rating tables. Read this list before you read the regulations themselves."
            onSite="If you are looking for the reason a regulation reference you remember has moved, the table below is the first place to look. The 'NEW' rows below are entirely new content; the 'Deleted' rows mean cross-references in older guidance now point at nothing."
          >
            <p>
              A4 is dated 15 April 2026 and replaces A3 from 15 October 2026 (transition period). In
              that window, work designed and certified to A3 remains compliant; new design and new
              certification from 15 October 2026 onwards must be against A4. Changes are indicated
              in the printed standard by side-bar margin marks against every technical alteration.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="A4:2026 — structural changes at a glance"
            source="BS 7671:2018+A4:2026 Introduction (pp. 17–25)"
            headers={['Change', 'Title / scope', 'Why it matters']}
            rows={a4StructuralChangesRows}
            notes="The A4 introduction (pp. 17–25) is the change log — read it first to map old references to new locations."
          />

          <ConceptBlock
            title="The new chapters in detail"
            plainEnglish="Two completely new chapters and two new sections under A4. Each has a clear functional reason that explains where it sits in the structure."
          >
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">Chapter 57 — Stationary secondary batteries.</strong>{' '}
                Lives in Part 5 (Selection and erection of equipment) because the regulations cover
                the equipment itself — the battery installation. Excludes batteries inside
                product-safety-standard equipment (UPS, central battery emergency lighting). Covers
                BESS, PV-plus-battery hybrids, off-grid hybrids — anything where the battery is the
                purpose of the installation.
              </li>
              <li>
                <strong className="text-white">Chapter 81 — Energy efficiency.</strong> Lives in
                Part 8 (Functional requirements) because it sets a design-stage functional goal, not
                a safety requirement. Replaces the deleted Appendix 17. Covers efficient circuit
                design, monitoring, demand-response readiness — design-stage, not periodic.
              </li>
              <li>
                <strong className="text-white">Section 716 — Power over Ethernet.</strong> Lives in
                Part 7 (Special installations or locations) because PoE creates a specific
                environment — power and data on the same low-cross-section conductors, with
                conductor temperature management, segregation and labelling implications. Captures
                IEEE 802.3af / at / bt up to 90 W per port (PoE++).
              </li>
              <li>
                <strong className="text-white">
                  Section 545 — Functional earthing for ICT equipment.
                </strong>{' '}
                Lives in Part 5 / Chapter 54 (Earthing arrangements and protective conductors).
                Distinguishes functional earthing (used for the proper operation of ICT equipment,
                e.g. low-noise reference) from protective earthing (for safety). Sets requirements
                for the conductors and connection arrangements where both functions are present.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The deletions and the "NOT USED" markers</ContentEyebrow>

          <ConceptBlock
            title="Why deleted entries are kept in the numbering"
            plainEnglish="Deleted entries are not rolled up — they are kept as 'Deleted' or 'NOT USED' lines so that every later cross-reference still resolves. The price of clean numbering is some empty slots."
            onSite="If you are reading old guidance that cites Appendix 17 or Annex B443, the current standard tells you explicitly that they are gone (App 17 to Chapter 81; B443 reorganised inside Section 444). Always check the dated edition on the standard you are reading from."
          >
            <p>
              Three categories of empty entry exist. <strong>Deleted</strong> means an entry was
              present in an earlier edition and has been removed (App 7 deleted by A2:2022, App 17
              deleted by A4:2026, Annex B443 deleted by A4:2026). <strong>NOT USED</strong> means
              the IEC 60364 numbering reserves that slot for content that BS 7671 has not adopted
              (Chapters 45 / 61 / 62 / 63, App 12). Both keep the cross-references stable so a
              reference written in 2018 still resolves correctly in 2026 — to either the current
              content or to the explicit "Deleted" / "NOT USED" line.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Reading the book efficiently</ContentEyebrow>

          <ConceptBlock
            title="Reading the book efficiently"
            plainEnglish="A few habits dramatically reduce time-to-answer when you are looking up a regulation under pressure on site or in a design office."
            onSite="Tab the appendices you use weekly: App 4 (cable rating), App 6 (model forms), App 3 (device curves), App 14 (PSCC), App 16 (EICR items). Tab the special-location sections you work in. The index is your fastest route for a topic search; the contents page is your fastest route once you know which Part you need."
          >
            <p>A few habits worth forming for A4:2026 specifically:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-white">Read the introduction to A4:2026</strong> (pages
                17–25 of the printed copy). It is the change log and the fastest way to know what
                you used to do that you can no longer do.
              </li>
              <li>
                <strong className="text-white">Side-bar markings</strong> in the right margin
                indicate technical changes from A3:2024. Where you see one in a section you work in,
                read it carefully — the existing wording you remember from A3 has been altered.
              </li>
              <li>
                <strong className="text-white">Cross-refs</strong> within the regs are dense (one
                reg often pulls in three or four others). The first time you read a Part 4 chapter
                under A4, follow every cross-ref — that is where the new luminaire RCD requirement
                (411.3.4) and the new ADS-not-feasible group (419) first surface.
              </li>
              <li>
                <strong className="text-white">Numeric prediction.</strong> Train yourself to
                predict the topic from a regulation number alone. 543.x is protective-conductor
                sizing. 612.x would be in Chapter 61 (NOT USED — so any reference to 612.x in old
                guidance has been re-homed). 644.x is initial verification. The numeric pattern is
                consistent across the standard.
              </li>
              <li>
                <strong className="text-white">Open the special location first.</strong> Reg 110.1.3
                means the Part 7 section either modifies or supplements the general regs. Reading
                the special location first tells you which general regs are altered; reading the
                general regs first risks missing the modification entirely.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Periodic inspection on a 1990s commercial unit converted to a yoga studio with steam room"
            situation="Three-phase TN-C-S supply at the cut-out, 200 A main switch, six distribution circuits, no significant rework since 2009. The conversion has added a steam room (location containing a bath or shower under Section 701) with extract fan, lighting and a 230 V steam generator."
            whatToDo="Drive the inspection from Part 6 (Chapter 65 — periodic inspection methodology). Apply Parts 1–5 modified by Part 7 Section 701 inside the steam room. Use Appendix 16 to drive the Schedule of Inspections; use Appendix 6 model EICR for the form itself. Critical numeric checks: Reg 411.3.3 (30 mA RCD on socket circuits), Reg 411.3.4 — A4 — (30 mA RCD on AC final circuits supplying luminaires inside domestic premises; this site is commercial so 411.3.4 does NOT apply, but Section 701 supplementary protection inside the steam room may capture the lighting on a similar route)."
            whyItMatters="Driving the inspection from the wrong Part produces the wrong cert. Part 6 is the methodology; Part 7 is the special-location overlay; Parts 1–5 are the underlying technical requirements. Mixing them up — for example, applying domestic Reg 411.3.4 to a commercial property — is an audit-trail failure even if the underlying decision (RCD on the lighting) is the same."
          />

          <Scenario
            title="New-build domestic with battery storage, PV array and EV charger — A4 in force"
            situation="Two-bed semi-detached new-build. 100 A TN-C-S supply. Customer wants a 4 kWp PV array, a 5 kWh battery storage unit (BESS) and a tethered 7 kW EV charger. The build certifies under BS 7671:2018+A4:2026."
            whatToDo="This is a Part 8 prosumer installation (Chapter 82) with Part 7 special-location overlays for each load. PV array → Section 712. EV charger → Section 722 (including Reg 722.312.2.1 PEN prohibition). Stationary battery → Part 5 Chapter 57 (NEW under A4). Energy efficiency design considerations → Part 8 Chapter 81 (NEW under A4). Domestic luminaire RCDs → Reg 411.3.4 (NEW under A4) on every AC final circuit feeding lighting. Cert: EIC per Appendix 6 with the new SoTR columns; supporting documentation per Reg 514.9 (diagrams, charts, schedules)."
            whyItMatters="The structural changes A4 introduces all hit one job. Reading the regulations as if A3 were still in force misses Chapter 57 (battery), Chapter 81 (efficiency framework), Section 716 if PoE is used for the home automation, Section 545 if functional earthing is wired for the inverter / BMS, and Reg 411.3.4 on the lighting circuits. Each miss is a documented departure under Reg 120.3 — and on a new-build, departures are difficult to justify."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              '8 Parts. Hierarchical numbering, first digit = Part. NOT USED markers preserve IEC numbering for cross-edition stability.',
              'Reg 110.1.1 sets the scope; Reg 110.1.3 is the override mechanic — Part 7 supplements or modifies Parts 1–6.',
              'A4:2026 added Chapter 57 (stationary batteries), Chapter 81 (energy efficiency), Section 716 (Power over Ethernet) and Section 545 (functional earthing for ICT).',
              'A4 deleted Appendix 17 (content promoted to Ch 81) and Annex B443 inside Section 444. App 4 cable tables revised for buried-cable methods.',
              'Appendix 1 is Normative — referenced standards are mandatory. Appendices 2 onwards are Informative — guidance and design data; the legal hook is the regulation that points to the appendix.',
              'Tab the weekly appendices: App 3 (device curves), App 4 (cable CCC + Vd), App 6 (model forms), App 14 (PSCC), App 16 (EICR inspection items).',
              'Side-bar margins in the printed standard mark every technical A4 change. Read them in any Part you actively work in.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-1-section-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 The legal framework
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-1-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Definitions and key terminology
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
