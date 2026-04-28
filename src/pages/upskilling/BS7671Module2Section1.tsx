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
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s1-why-part-2-matters',
    question:
      'A junior designer argues that Part 2 of BS 7671 is "just a glossary" and can be skipped. Which statement best captures why that view is wrong?',
    options: [
      'Part 2 is the largest part of BS 7671 and contains most of the technical rules',
      'Part 2 is load-bearing — every "shall" in Parts 3 to 7 only has meaning because Part 2 fixes the precise scope of each defined term',
      'Part 2 is non-binding guidance and exists for context only',
      'Part 2 only applies to special locations covered in Part 7',
    ],
    correctIndex: 1,
    explanation:
      'Part 2 is not narrative — it is the legal scaffolding. When Reg 411.3.1.2 says "extraneous-conductive-parts shall be connected to the main earthing terminal", the duty is fixed by what Part 2 means by an extraneous-conductive-part. Use a different definition (or a layperson reading) and you have applied a different regulation. The IET\'s own structure makes this explicit: Reg 110.1.1 places Part 2 inside the binding scope of the standard, not alongside it as commentary.',
  },
  {
    id: 'm2s1-110-1-3-part-7-modifies',
    question:
      'You are designing a circuit inside a bathroom (Section 701). A term used in your design has both a Part 2 definition and a different definition given in Section 701. Which prevails inside the location?',
    options: [
      'Part 2 always overrides Part 7',
      'Reg 110.1.3 — within a special location, the Part 7 definition modifies or supplements the Part 2 definition for that location',
      'Whichever is more recent in the published amendment cycle',
      'The IET Code of Practice glossary takes precedence',
    ],
    correctIndex: 1,
    explanation:
      'Reg 110.1.3 is explicit: the special-location sections of Part 7 modify or supplement the general regulations and definitions for the location they cover. Inside Section 701, 702, 705, 722 etc the local definition controls; outside the location boundary the Part 2 definition resumes. This is how a "zone" can mean one thing in 701 and something different in 702 without the standard contradicting itself.',
  },
  {
    id: 'm2s1-extraneous-vs-exposed',
    question:
      'On a domestic EICR you find a metallic boiler flue passing through the kitchen. The flue is connected back to the boiler casing (which is Class I and earthed via its supply CPC). Is the flue an extraneous-conductive-part requiring main bonding back to the MET?',
    options: [
      'Yes — every metal item in the property is an extraneous-conductive-part',
      'No — the flue is an exposed-conductive-part of the boiler (it is part of the appliance), not an extraneous-conductive-part introducing an earth potential from outside the installation',
      'Yes — Reg 411.3.1.2 requires bonding of all flues',
      'Only if the flue is over 6 mm in cross-section',
    ],
    correctIndex: 1,
    explanation:
      'Part 2 defines an extraneous-conductive-part as a conductive part liable to introduce a potential, generally Earth potential, and not forming part of the electrical installation. A flue bolted to a Class I appliance is part of the appliance — therefore an exposed-conductive-part, already covered by the appliance CPC. Calling it extraneous and adding a 10 mm² main bond is over-application of Reg 411.3.1.2 and an EICR-paper trail of misunderstanding the definition.',
  },
  {
    id: 'm2s1-isolation-vs-switching',
    question:
      'A maintenance electrician needs to replace a faulty contactor inside a control panel. They throw the local rotary switch labelled "switching for mechanical maintenance". Are they entitled to start work?',
    options: [
      'Yes — switching for mechanical maintenance is the same as isolation',
      'No — Part 2 defines isolation, switching, and switching for mechanical maintenance as three different functions; only isolation (with secure means of preventing reclosure) permits live electrical work',
      'Yes, provided they wear gloves',
      'Only if the switch carries a yellow label',
    ],
    correctIndex: 1,
    explanation:
      'Part 2 separates the three functions deliberately. Isolation cuts the supply AND provides a secure means of preventing it being reclosed (lock-off, removed fuse, captive key). Switching for mechanical maintenance interrupts current to allow non-electrical work on the machine — there is no requirement for lock-off-grade security against reclosure. Functional switching is operational on/off, no security claim at all. Reg 537.2 / 537.3 build directly on the Part 2 distinction; misreading it is the single most common cause of electrical-near-miss reports on plant.',
  },
  {
    id: 'm2s1-afdd-new-term',
    question:
      'BS 7671:2018+A4:2026 introduces several new defined terms in Part 2. Which of these is NOT a Part 2 addition?',
    options: [
      'Arc Fault Detection Device (AFDD)',
      "Prosumer's Electrical Installation (PEI)",
      'Bidirectional energy transfer',
      'Domestic premises',
    ],
    correctIndex: 3,
    explanation:
      '"Domestic (household) premises" is a long-standing term used since the 17th edition. AFDD, PEI and bidirectional energy transfer are A4-era additions reflecting modern installations: arc-fault detection devices (AFDDs) in Reg 421.1.7, prosumer\'s electrical installation (PEI) in Reg 826 / Section 712 (PV) and the wider energy-transfer terminology to match EV charging, battery storage and grid export.',
  },
  {
    id: 'm2s1-iet-cop-vs-bs7671',
    question:
      'A designer cites the IET Code of Practice for Electrical Energy Storage Systems for a definition that conflicts with BS 7671 Part 2. Which definition prevails for a BS 7671 EIC?',
    options: [
      'The IET CoP — it is more specialist',
      "BS 7671 Part 2 — the certificate is issued against BS 7671, and the CoP glossary is non-binding for the standard's own terminology",
      'Whichever the customer prefers',
      'The Building Regulations definition overrides both',
    ],
    correctIndex: 1,
    explanation:
      "IET Codes of Practice are excellent supporting documents but they are NOT BS 7671. When you sign an EIC you certify compliance with BS 7671:2018+A4:2026 — the standard's own Part 2 definitions fix the meaning of the terms you certify against. CoP glossaries can sit alongside in design but cannot rewrite Part 2 for the purpose of certification.",
  },
  {
    id: 'm2s1-symbols-abbreviations',
    question:
      'Where in BS 7671 will you find the binding list of abbreviations such as "CPC", "ADS", "RCBO", "PEN" and "MET"?',
    options: [
      'Appendix 4',
      'A separate sub-section within Part 2 (Symbols and Abbreviations)',
      'The IET Wiring Matters magazine',
      "Each chapter's own opening pages",
    ],
    correctIndex: 1,
    explanation:
      'Part 2 carries two parallel sub-sections: the alphabetical list of defined terms, and the dedicated Symbols and Abbreviations list. Both are part of the same load-bearing definitional layer. Citing "CPC" or "PEN" in a design or certificate without the Part 2 meaning is the same problem as citing an undefined regulation number — there is no authoritative reference behind the shorthand.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Reg 110.1.1 places Part 2 within which category of BS 7671's structure?",
    options: [
      'Informative annex — guidance only',
      'Binding scope of the standard — the definitions are part of the regulations they support',
      'Optional supplementary material',
      'Reproduced from the IET Code of Practice',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 110.1.1 sets the scope of BS 7671 across all seven Parts. Part 2 is not separated out as informative — it is part of the standard. That is why a regulation referencing a Part 2 term inherits the Part 2 meaning automatically: courts, insurers and inspectors read the duty in Part 3-7 through the lens of Part 2.',
  },
  {
    id: 2,
    question:
      'Within a special location in Part 7, a term has both a Part 2 definition and a Section 7 definition. Which controls within the location?',
    options: [
      'Part 2 always',
      'Whichever is broader',
      'The Section 7 definition — Reg 110.1.3 makes Part 7 a modifier of Part 2 within the location',
      'Both apply equally and the designer chooses',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 110.1.3 gives Part 7 the power to modify the general regulations and definitions inside the special location it covers. The Part 2 meaning resumes at the location boundary. Get the boundary wrong and you misapply both definitions.',
  },
  {
    id: 3,
    question: 'Which of the following best describes the structural pattern of Part 2?',
    options: [
      'Numbered regulations 200.1, 200.2, 200.3 ...',
      'An alphabetical list of defined terms, plus a separate Symbols and Abbreviations sub-section',
      'A flowchart of installation procedures',
      'A reprint of EAWR 1989 schedules',
    ],
    correctAnswer: 1,
    explanation:
      'Part 2 is alphabetical by term. There are no "Reg 200.x" reference numbers — citations are written as "Part 2" and the term, e.g. "Part 2 — extraneous-conductive-part". The Symbols and Abbreviations sub-section sits with it and follows the same logic.',
  },
  {
    id: 4,
    question:
      'You are looking up "extraneous-conductive-part" to apply Reg 411.3.1.2. The disciplined order is to read:',
    options: [
      'The regulation first, then guess the term meaning from context',
      'The Part 2 definition, then the regulation, then any Part 7 modification for the location you are working in',
      'The IET Wiring Matters article that quotes it',
      'Only the regulation; the term is self-explanatory',
    ],
    correctAnswer: 1,
    explanation:
      'Definition first, regulation second, special-location override third. Skipping the Part 2 read is the most common source of "we always did it that way" errors on EICRs — bonding what does not need bonding, or omitting bonding where it is required because the part has been mislabelled.',
  },
  {
    id: 5,
    question:
      'Which of these triplets are NOT interchangeable under Part 2 — they describe three distinct functional concepts?',
    options: [
      'Isolation, switching, switching for mechanical maintenance',
      'CPC, PEN, earth electrode',
      'TN-S, TN-C-S, TT',
      'All of the above are distinct',
    ],
    correctAnswer: 3,
    explanation:
      'Each triplet is three separate Part 2 terms with three separate technical meanings. The most common confusion in the field is the first triplet — operatives treating "switched off" as "isolated". Part 2 deliberately keeps them apart so Reg 537.2 / 537.3 / 462 can build different duties on each.',
  },
  {
    id: 6,
    question:
      'A4:2026 added new defined terms to Part 2. Which group correctly captures three of those new terms?',
    options: [
      'Ring final circuit, radial circuit, lighting circuit',
      "AFDD (Arc Fault Detection Device), PEI (Prosumer's Electrical Installation), bidirectional energy transfer",
      'Live part, exposed-conductive-part, extraneous-conductive-part',
      'Class I, Class II, Class III',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 expands Part 2 to support modern energy installations. AFDD enters alongside Reg 421.1.7 (arc-fault detection in domestic and similar premises), PEI supports the prosumer model in Section 712 / 826, and bidirectional energy transfer underpins V2G EV and battery export language used through Sections 712, 722 and 826.',
  },
  {
    id: 7,
    question:
      'An installer signs an EIC certifying compliance with BS 7671. They have used a definition taken from the IET Code of Practice for EV Charging because it differs slightly from the BS 7671 Part 2 wording. What is the certifying risk?',
    options: [
      'No risk — IET CoPs are part of BS 7671',
      'Material risk — the certificate is issued against BS 7671, so its Part 2 definitions are the only ones that demonstrate compliance; using a different glossary creates a documented departure under Reg 120.3',
      'No risk if the customer agrees',
      'No risk if the CoP is more recent',
    ],
    correctAnswer: 1,
    explanation:
      'The IET CoPs are sector best-practice guides — extremely useful, but separate documents. Where their glossary differs from Part 2, applying the CoP wording on a BS 7671 certificate creates a departure that the designer must justify under Reg 120.3 in writing. Most disputes start exactly here: two technically literate parties using two different definitions for the same word.',
  },
  {
    id: 8,
    question:
      'During an EICR an inspector codes a metal radiator pipe as a missing main bond, citing "extraneous-conductive-part — every metal pipe is one." The pipe enters the property in plastic, then transitions to copper internally. Which Part 2-driven correction applies?',
    options: [
      'The inspector is correct — every metal pipe is extraneous',
      'The inspector is wrong — Part 2 requires the part to be liable to introduce a potential (typically Earth potential) from outside the installation; a pipe entering in plastic is electrically isolated from the external earth and is not extraneous-conductive',
      'The inspector should code C1 regardless',
      'Bonding is required if the pipe is more than 1 m long',
    ],
    correctAnswer: 1,
    explanation:
      'The Part 2 definition does the work. "Extraneous-conductive-part = liable to introduce a potential, generally Earth potential, and not part of the electrical installation." A copper pipe section that is electrically isolated from the outside world (plastic incoming main, no electrical contact with earthed services) does not introduce an external potential. Bonding it adds connections that can themselves become fault paths. The fix is to verify continuity to true earth (insulation-resistance / earth-loop test from the metal pipe to the MET) and only bond where the test confirms a path under 23 kΩ (per IET guidance on the test).',
  },
];

const faqItems = [
  {
    question: 'Why is Part 2 placed so early in BS 7671 instead of as an appendix?',
    answer:
      'Because the standard is only intelligible if you read every "shall" in Parts 3 to 7 with Part 2 already loaded. Reg 110.1.1 places Part 2 inside the binding scope of the standard; the IET\'s structural choice is to put the load-bearing definitions in front of the duties they support, not behind them. An appendix is, by convention, informative — Part 2 is not.',
  },
  {
    question: 'How do I cite a Part 2 term in a design document or report?',
    answer:
      'Use the form "Part 2 — extraneous-conductive-part (BS 7671:2018+A4:2026)". There is no regulation number to cite because Part 2 is alphabetical by term, not numbered. Where you are quoting the Symbols and Abbreviations sub-section, write "Part 2 — Symbols and Abbreviations". Avoid invented numbers like "Reg 200.x" — they are not in the standard.',
  },
  {
    question: 'When does a Part 7 definition override a Part 2 definition?',
    answer:
      'Inside the boundary of the special location and only there. Reg 110.1.3 explicitly empowers Part 7 sections to modify or supplement the general regulations and definitions for the location they cover. At the location boundary the Part 2 meaning resumes. Where a circuit crosses the boundary, the rule that applies depends on which side of the boundary the part being assessed is on.',
  },
  {
    question: 'Has the meaning of "extra-low voltage" changed across editions?',
    answer:
      'The numerical band is stable (≤50 V AC RMS / 120 V DC ripple-free) but Part 2 has refined the surrounding terminology — particularly around SELV, PELV and FELV — across editions. The right discipline is to read the current Part 2 entry at the start of every project and not rely on remembered text from a previous amendment. The headline change is rarely the band itself; it is the source-and-isolation requirements that sit alongside it.',
  },
  {
    question: 'What is the relationship between Part 2 and the IET Code of Practice glossaries?',
    answer:
      "BS 7671 is the standard you certify against. The IET Codes of Practice are sector best-practice guidance — for EV charging, energy storage, in-service inspection of equipment, electrical installation condition reporting and others. Their glossaries are written for that specialist scope and may be broader or differently worded than Part 2. For a BS 7671 EIC / EICR, Part 2 is the authoritative reference; the CoP glossary supports good practice but does not redefine the standard's terms.",
  },
  {
    question: 'Why does Part 2 separate "isolation" from "switching" so deliberately?',
    answer:
      'Because the duties built on top are different. Isolation requires secure means of preventing reclosure — lock-off, removed fuse, captive key — and supports live-work safety under EAWR Reg 13. Switching for mechanical maintenance interrupts current for non-electrical work but does not require the same lock-off-grade security. Functional switching is operational. The Part 2 distinction is what allows Reg 537.2 / 537.3 / 462 to build the right duty on each. Treat them as synonyms and you collapse three different safety regimes into one.',
  },
  {
    question: 'What new Part 2 terms did A4:2026 introduce?',
    answer:
      "A4:2026 added several terms reflecting modern installations: AFDD (Arc Fault Detection Device, supporting Reg 421.1.7), PEI (Prosumer's Electrical Installation, supporting Section 712 / 826), bidirectional energy transfer (supporting V2G, battery export and the wider energy-flow language) and refinements to the prosumer / energy-management terminology. Read the A4 list in full at project kick-off — the new terms quietly change which duties apply to which equipment.",
  },
  {
    question: 'Where do I find the binding meaning of "CPC", "PEN", "MET", "RCBO" and "ADS"?',
    answer:
      'In the Symbols and Abbreviations sub-section of Part 2, alongside the alphabetical defined-term list. Both sub-sections are equally part of Part 2. An EIC that uses "CPC" without the Part 2 meaning is not less binding than one that spells it out — the certificate is read against the standard, and the standard fixes the abbreviation\'s meaning in Part 2.',
  },
  {
    question: 'How do I handle a term that appears in BS 7671 but not in Part 2?',
    answer:
      'Three steps. First, search the Symbols and Abbreviations sub-section — Part 2 has both halves and people sometimes only check one. Second, check whether the term is defined inside the regulation that uses it (a few terms are scoped locally inside their chapter). Third, check the related British Standard cited in the regulation — BS 7671 imports definitions from referenced BS / EN documents (e.g. BS EN 60309-2 for industrial connectors). If still undefined, apply ordinary technical English and document the assumption under Reg 120.3.',
  },
];

const BS7671Module2Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Navigating Part 2 — Definitions in BS 7671:2018+A4:2026 | Module 2.1',
    description:
      'How to read Part 2 of BS 7671:2018+A4:2026 — alphabetical structure, the role of Reg 110.1.3, special-location overrides, and the new A4 additions (AFDD, PEI, bidirectional energy transfer).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1"
            title="Navigating Part 2 — how definitions shape application"
            description="Part 2 is the load-bearing layer of BS 7671. Every duty in Parts 3 to 7 is read through it. Learn the structure, the lookup discipline, the Reg 110.1.3 override, the A4:2026 additions, and the points where IET Codes of Practice diverge."
            actions={
              <>
                <RegBadge>Part 2</RegBadge>
                <RegBadge>110.1.1</RegBadge>
                <RegBadge>110.1.3</RegBadge>
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Part 2 is not a glossary in the casual sense — it is the binding definitional layer. Reg 110.1.1 places it inside the scope of the standard; every "shall" in Parts 3 to 7 inherits its meaning from Part 2.',
              'Part 2 is alphabetical by term, with a parallel Symbols and Abbreviations sub-section. There are no "Reg 200.x" numbers — cite as "Part 2 — term".',
              'Reg 110.1.3 lets the special-location sections of Part 7 modify or supplement Part 2 for the location they cover. Inside the boundary the local definition controls; outside it the Part 2 meaning resumes.',
              "A4:2026 adds new Part 2 terms — AFDD, PEI (Prosumer's Electrical Installation), bidirectional energy transfer — to support arc-fault detection, prosumer installations and modern energy flow.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why Part 2 is load-bearing and how Reg 110.1.1 makes it binding rather than informative.',
              'Describe the alphabetical structure of Part 2 and the parallel Symbols and Abbreviations sub-section, and cite a Part 2 entry correctly in a design document or report.',
              'Apply the lookup discipline — definition first, regulation second, Part 7 modification third — to any term a duty turns on.',
              'Identify when Reg 110.1.3 transfers definitional control to a Part 7 special location, and what reverts at the boundary.',
              'Distinguish Part 2 terms that are commonly confused (extraneous-conductive-part vs exposed-conductive-part; isolation vs switching vs switching for mechanical maintenance).',
              'Recognise the A4:2026 additions to Part 2 (AFDD, PEI, bidirectional energy transfer) and the regulations they support.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why Part 2 is load-bearing</ContentEyebrow>

          <ConceptBlock
            title="Definitions are not commentary"
            plainEnglish="Part 2 is not the explanatory pages at the front of the book. It is the part that fixes what every other regulation actually means. Without it, the duties in Parts 3 to 7 are unenforceable — a court or insurer cannot tell whether a thing has been done unless the words are defined."
            onSite="Read every regulation through its Part 2 terms before applying it. The fastest route to misapplied BS 7671 is taking a regulation in isolation and assuming the words mean what they would in everyday English."
          >
            <p>
              Reg 110.1.1 sets the scope of the standard as a whole, and Part 2 sits inside that
              scope. There is no clause anywhere in BS 7671 separating Part 2 out as informative
              annex. That structural choice is the difference between a duty that can be enforced
              ("the exposed-conductive-parts shall be connected to a protective conductor" — Reg
              411.3.1.1) and a duty that cannot ("certain metal items must be linked to earth
              somehow"). The standard's power to fix safety outcomes is delivered by its
              definitions.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.1.1 — Scope"
            clause="The Regulations apply to the design, erection and verification of electrical installations, also additions and alterations to existing installations. The Regulations comprise the body of text and Appendices. Parts 1 to 7, with their associated Appendices, are the Regulations."
            meaning="Parts 1 to 7 — including Part 2 — together comprise BS 7671. There is no carve-out for definitions; they sit inside the binding text. A regulation that uses a defined term inherits the Part 2 meaning automatically."
            cite="BS 7671:2018+A4:2026, Reg 110.1.1 (p.21)"
          />

          <SectionRule />

          <ContentEyebrow>The structure of Part 2</ContentEyebrow>

          <ConceptBlock
            title="Alphabetical, with a parallel Symbols and Abbreviations sub-section"
            plainEnglish="Part 2 lists terms alphabetically, not numerically. There is also a separate sub-section for symbols and abbreviations (CPC, PEN, MET, RCBO, ADS, etc.). Both sub-sections are equally part of Part 2."
            onSite='Stop looking for "Reg 200.x" — the standard does not number Part 2 entries. Cite as "Part 2 — extraneous-conductive-part" in design documents and reports. When you cannot find a term in the alphabetical list, check the Symbols and Abbreviations sub-section before assuming the term is undefined.'
          >
            <p>
              The alphabetical layout exists because most regulations turn on a single term — find
              the term, find its boundary, and the regulation immediately becomes operable. The
              Symbols and Abbreviations sub-section exists because BS 7671 is full of acronyms that
              would otherwise have no fixed meaning: CPC (Circuit Protective Conductor), PEN
              (Combined Protective and Neutral Conductor), MET (Main Earthing Terminal), RCBO
              (Residual Current Operated Circuit Breaker with Integral Overcurrent Protection), ADS
              (Automatic Disconnection of Supply). Both sub-sections do the same job — the
              difference is only how the term is written.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cross-references back into the regulations"
            plainEnglish="Many Part 2 entries name the regulation that primarily uses the term, so the term sends you forward into the binding duty rather than leaving you to guess where it applies."
            onSite="When you read a Part 2 entry, follow the cross-reference to the regulation it supports — that is the duty the definition exists to underwrite. Going one direction without the other is half the work."
          >
            <p>
              A typical entry such as "extraneous-conductive-part" in Part 2 sits alongside Reg
              411.3.1.2 (protective equipotential bonding), Reg 415.2.1 (supplementary equipotential
              bonding), Section 701 (locations containing a bath or shower) and several others. The
              defined-term list is small; the regulations that lean on each term are many. The
              discipline is to read both halves of the loop — definition AND regulation — every
              time.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The lookup discipline</ContentEyebrow>

          <ConceptBlock
            title="Definition first, regulation second, Part 7 third"
            plainEnglish="Three steps in the same order, every time. (1) Read the Part 2 definition. (2) Read the regulation that imposes the duty. (3) If you are inside a special location, check whether Part 7 modifies the definition for that location."
            onSite="The discipline is muscle memory. Skipping (1) is the most common cause of EICR misapplication; skipping (3) is the most common cause of Section 701 / 702 / 705 / 722 errors. The cost of doing all three is seconds; the cost of skipping is a coded observation that does not hold up under scrutiny."
          >
            <p>
              A worked example: you are applying Reg 411.3.1.2 ("protective equipotential bonding")
              to a domestic kitchen with a metallic incoming gas service.{' '}
              <strong>(1) Part 2:</strong> "extraneous-conductive-part — a conductive part liable to
              introduce a potential, generally Earth potential, and not forming part of the
              electrical installation." <strong>(2) Reg 411.3.1.2:</strong> requires connection of
              every extraneous-conductive-part to the MET. <strong>(3) Special location?</strong> No
              — kitchen is not a Part 7 location, so the Part 2 definition controls. The gas
              service, if continuous metal back to the gas main, is liable to introduce Earth
              potential and must be bonded with a 10 mm² conductor (Reg 544.1.1) within 600 mm of
              the gas meter outlet (per IGEM/G/5).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Reg 110.1.3 — when Part 7 modifies Part 2</ContentEyebrow>

          <ConceptBlock
            title="The override clause that makes special locations work"
            plainEnglish="Reg 110.1.3 says: the regulations and definitions in Parts 1 to 6 apply generally; the sections of Part 7 modify or supplement them for the special location they cover. Inside the location boundary, Part 7 controls. Outside, Part 2 resumes."
            onSite="The boundary matters more than the term. A bathroom's boundary is defined geometrically (zones 0, 1, 2 and outside-zone within the location). A construction site's boundary is the perimeter of the works. An EV charging area's boundary is the curtilage of the charging point. Get the boundary wrong and you apply the wrong definitional regime to the same physical equipment."
          >
            <p>
              Reg 110.1.3 is the structural mechanism by which BS 7671 covers everything from a
              caravan park to a medical examination room without contradicting itself. The general
              rules in Parts 1 to 6 set the baseline; Part 7 (Sections 701 to 753) carries the
              special-location modifications. The special-location section is read as a delta on top
              of Parts 1 to 6, not a replacement for them — anything Part 7 does not modify
              continues to apply unmodified.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 110.1.3 — Special installations or locations"
            clause="The particular requirements for special installations or locations contained in Part 7 supplement or modify the general requirements contained in other Parts of the Regulations."
            meaning="Part 7 is a modifier of the general regulations and definitions, not a parallel standalone. Inside a Part 7 location, where a definition or duty differs, Part 7 controls; outside, the general regulations and Part 2 definitions resume."
            cite="BS 7671:2018+A4:2026, Reg 110.1.3 (p.21)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Worked example — extraneous-conductive-part</ContentEyebrow>

          <ConceptBlock
            title="Looking up 'extraneous-conductive-part' end-to-end"
            plainEnglish="Take the term, read its Part 2 definition, find every regulation it underwrites, then check whether you are inside a Part 7 location that modifies it. Five minutes of discipline saves hours of re-work."
            onSite="The shape of the lookup is the shape of every Part 2 lookup — repeat it for every term a regulation turns on."
          >
            <p>
              <strong>Step 1 — Part 2.</strong> "Extraneous-conductive-part: a conductive part
              liable to introduce a potential, generally Earth potential, and not forming part of
              the electrical installation." Two boundary conditions: it must be liable to introduce
              a potential (typically by being electrically continuous to true Earth via metallic
              plumbing, structural steelwork, or an external service), AND it must not be part of
              the electrical installation (so a flue bolted to a Class I appliance is not an
              extraneous-conductive-part — it is an exposed-conductive-part of the appliance).
            </p>
            <p>
              <strong>Step 2 — the regulations that turn on it.</strong> Reg 411.3.1.2 (protective
              equipotential bonding to the MET) requires connection of every
              extraneous-conductive-part. Section 415 (supplementary equipotential bonding) extends
              the duty within particular locations. Section 701 (bathroom) further modifies the
              bonding requirements depending on whether the location meets the omission conditions
              of Reg 701.415.2.
            </p>
            <p>
              <strong>Step 3 — Part 7 modification.</strong> Inside Section 701 the term is applied
              through Reg 701.415.2 — supplementary bonding may be omitted if all circuits in the
              location have 30 mA RCD additional protection AND meet their disconnection times AND
              every extraneous-conductive-part is reliably bonded back to the MET. The Part 2
              definition still tells you what counts as extraneous; Reg 701.415.2 tells you what the
              bonding regime then has to deliver.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            Common confusion — isolation, switching, switching for mechanical maintenance
          </ContentEyebrow>

          <ConceptBlock
            title="Three terms, three duties — never interchangeable"
            plainEnglish="Part 2 keeps these apart deliberately. Isolation cuts the supply AND provides secure means of preventing reclosure. Switching for mechanical maintenance interrupts current for non-electrical work without the same secure-against-reclosure requirement. Functional switching is operational on/off."
            onSite="The single most common live-work near miss is a fitter throwing a maintenance switch and starting electrical work. The switch did its job — interrupted current for the mechanical task. It was never claiming to be an isolator. The mistake is in the operative's reading of the label, not in the device."
          >
            <p>
              Reg 537.2 (isolation) is built on Part 2's definition: the device must positively cut
              all live conductors AND have a secure means of preventing inadvertent reclosure.
              Lock-off, removed fuse, captive key — these exist because Part 2 demands them. Reg
              537.3 (switching for mechanical maintenance) is built on a different Part 2 term: the
              device interrupts current for non-electrical maintenance, but BS 7671 does not require
              the same lock-off-grade security — because the work being protected is mechanical, not
              electrical, and the operative is not exposed to live conductors.
            </p>
            <p>
              Functional switching (Reg 537.5) is operational on/off — a luminaire wall switch, a
              kettle switch on a fused connection unit. No safety claim about isolation, no
              maintenance claim. Three Part 2 terms, three Reg 537 sub-sections, three different
              device requirements. Read them as one and you create the conditions for an EAWR Reg 13
              / Reg 14 incident.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>
            Common confusion — extra-low voltage, live part, protective conductor
          </ContentEyebrow>

          <ConceptBlock
            title="Terms that have shifted across editions"
            plainEnglish="Several Part 2 terms have moved subtly between editions. Re-read them at the start of every project rather than relying on what they meant in the last edition you trained on."
            onSite="The trap is the muscle-memory definition from a 17th- or 18th-edition course five years ago. The numbers (≤50 V AC / 120 V DC ripple-free) are stable for extra-low voltage; the surrounding terminology (SELV, PELV, FELV, sources, isolation) has been refined. Read Part 2 fresh."
          >
            <p>
              <strong>Extra-low voltage</strong> remains "voltage normally not exceeding 50 V AC or
              120 V DC ripple-free between conductors or between conductors and Earth." The band is
              stable. What changes across editions is the source-and-isolation framework around
              SELV, PELV and FELV (Section 414 and Reg 411.7) and the conditions under which each
              can be used as a protective measure.
            </p>
            <p>
              <strong>Live part</strong> is "a conductor or conductive part intended to be energised
              in normal use, including a neutral conductor but, by convention, not a PEN conductor."
              The "by convention" exclusion of the PEN matters operationally — Reg 461.2 forbids
              switching the PEN, which would not make sense if the PEN were a "live part" in the
              simple sense.
            </p>
            <p>
              <strong>Protective conductor</strong> is "a conductor required by a measure for
              protection against electric shock, intended for the purpose of electrically connecting
              any of the following parts: exposed-conductive-parts; extraneous-conductive-parts; the
              main earthing terminal; earth electrode(s); the earthed point of the source or an
              artificial neutral." The class includes CPC, bonding conductors, the earthing
              conductor and equipotential bonding conductors — one Part 2 term, multiple Part 5
              sub-types (Reg 543).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symbols and abbreviations</ContentEyebrow>

          <ConceptBlock
            title="The other half of Part 2"
            plainEnglish="The Symbols and Abbreviations sub-section sits inside Part 2 and is equally binding. Acronyms used through the rest of the standard — CPC, PEN, MET, RCBO, RCD, ADS, OPD, AFDD, EV, PEI — get their precise meaning here, not in everyday usage."
            onSite='When a regulation says "an RCBO shall be provided" the device required is the one defined in Part 2 — Residual Current Operated Circuit Breaker with Integral Overcurrent Protection — not just a residual-current device with a marketing badge. Same for AFDD: a device complying with BS EN 62606, not any arc-detection feature.'
          >
            <p>
              The structural twin of the alphabetical defined-term list, the Symbols and
              Abbreviations sub-section is read with the same lookup discipline. Cite as "Part 2 —
              Symbols and Abbreviations" when you reference an acronym formally. Do NOT substitute
              Wikipedia or trade-magazine definitions when a Part 2 entry exists; the certificate is
              read against BS 7671, and BS 7671's acronyms are the ones in Part 2.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>A4:2026 — new defined terms</ContentEyebrow>

          <ConceptBlock
            title="What A4 added to Part 2"
            plainEnglish="A4:2026 adds defined terms to support arc-fault detection, prosumer (generation + consumption) installations, bidirectional energy flow and the wider modern-installation language."
            onSite="Read the A4 list at the start of every new project. The new definitions quietly change which duty applies to which equipment — particularly around AFDDs (Reg 421.1.7) and prosumer installations (Section 712 / 826)."
          >
            <p>
              <strong>AFDD (Arc Fault Detection Device).</strong> A device complying with BS EN
              62606. Underwrites Reg 421.1.7 — recommendations and (in some scenarios) requirements
              for AFDD use in single-phase final circuits, particularly in higher-fire-risk premises
              (HMOs, care homes, specified locations).
            </p>
            <p>
              <strong>PEI (Prosumer's Electrical Installation).</strong> An installation that both
              consumes and generates / stores electrical energy — a domestic dwelling with PV plus
              battery plus EV charging is the canonical example. Underwrites Section 712 (PV) and
              the wider prosumer regulations introduced through A4.
            </p>
            <p>
              <strong>Bidirectional energy transfer.</strong> The technical language for energy
              moving in both directions across a connection — V2G EV charging, battery export,
              microgrid interconnection. Underwrites the EV (Section 722), PV (Section 712) and
              wider energy-management regulations and is the structural basis for treating a
              prosumer installation as a single coherent system rather than two parallel ones.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Part 2 vs the IET Codes of Practice</ContentEyebrow>

          <ConceptBlock
            title="When the glossaries diverge"
            plainEnglish="The IET publishes Codes of Practice for specialist domains — EV charging, electrical energy storage, in-service inspection, EICR. Each has its own glossary. Where a CoP glossary differs from BS 7671 Part 2, the standard's definition controls for certification under BS 7671."
            onSite="CoPs are excellent design references and routinely go further than BS 7671 in their guidance. They are not, however, BS 7671. The certificate names the standard you have complied with; the standard's Part 2 is the only definitional layer that matters for that compliance claim."
          >
            <p>
              Treat the CoPs as best-practice scaffolding. They will often help you exceed BS 7671's
              baseline — installing AFDDs in domestic premises before they were mandatory, going
              beyond the minimum bonding regime in older buildings, applying tighter test intervals
              on industrial plant. Where the CoP glossary uses a term in a way that differs from
              Part 2, the right discipline is: design to the CoP, certify to BS 7671, and document
              any departure from BS 7671 (in either direction) under Reg 120.3.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Bonding pipework that isn't extraneous"
            whatHappens="Inspector codes a copper hot-water pipe section as 'missing main bond — extraneous-conductive-part'. The incoming water main enters in plastic; the metal section is electrically isolated from the external earth. The Part 2 definition requires the part to be liable to introduce a potential from outside the installation. An electrically isolated metal pipe section does not meet the boundary condition."
            doInstead="Apply the Part 2 definition. Extraneous = liable to introduce a potential AND not part of the installation. Verify with an insulation-resistance / loop test from the metal pipe to the MET (IET guidance: bonding required where the resistance to true Earth is less than approximately 23 kΩ). Above that threshold the part is not extraneous and bonding adds an unnecessary fault path."
          />

          <CommonMistake
            title="Treating 'switching for mechanical maintenance' as isolation"
            whatHappens="A maintenance fitter throws the local control-panel rotary switch labelled 'switching for mechanical maintenance' and starts replacing a contactor live. The switch interrupted current for the original mechanical task; it was never claiming to be an isolator. Part 2 keeps the two terms apart precisely so this confusion has a documented origin."
            doInstead="For any electrical work, use a device meeting the Part 2 definition of an isolator (Reg 537.2) — locked-off main switch, removed fuse, captive-key local isolator. Document the lock-off in the safe-system-of-work record. Switching for mechanical maintenance is for replacing a guard, clearing a jam, lubricating a bearing — not for working on energised parts."
          />

          <CommonMistake
            title="Citing an IET CoP definition on a BS 7671 certificate"
            whatHappens="Designer pulls a definition from the IET CoP for EV Charging that is broader than the BS 7671 Part 2 wording and uses it to justify omitting an open-PEN protection device. On audit, the auditor reads the EIC against BS 7671 — finds the Part 2 / Section 722 definition does not support the omission — codes a documented departure under Reg 120.3."
            doInstead="Certify against BS 7671 using BS 7671 definitions. Where the CoP suggests a more onerous design, follow it as best practice and document why. Where the CoP is broader than BS 7671 in a way that would weaken compliance, the standard wins: design to the CoP for guidance, certify to the standard."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="EICR — inspector misapplying a Part 2 term"
            situation="A four-year periodic EICR on a 1990s domestic property. The inspector codes C2 against a metal kitchen sink waste pipe — 'not bonded back to the MET, extraneous-conductive-part'. The waste pipe runs to a plastic external drain stack; the entire pipe run from sink to outside is metal but is electrically isolated from any external Earth path."
            whatToDo="Step 1 — Part 2: extraneous = liable to introduce a potential AND not part of the electrical installation. Step 2 — verify with a continuity / loop test from the pipe to the MET. If the resistance to true Earth exceeds approximately 23 kΩ (IET guidance), the part does not introduce a meaningful Earth potential and is not extraneous-conductive. Step 3 — appeal the code. Add the test result to the EICR observation record; downgrade or remove the C2."
            whyItMatters="Mis-coded extraneous-conductive-parts are one of the highest-volume EICR appeals in the UK. They originate from inspectors applying 'every metal pipe is extraneous' instead of the Part 2 boundary test. The customer pays for unnecessary 10 mm² bonds and the inspector's next audit picks up the systematic pattern. The Part 2 read is the audit-proof answer."
          />

          <Scenario
            title="Designer using IET CoP definition where BS 7671 differs"
            situation="A designer specifying a small commercial battery storage system uses a definition of 'PEI' from the IET CoP for Electrical Energy Storage Systems that is broader than BS 7671 A4 Part 2. They use the broader definition to argue the installation is a PEI and apply Section 712 / 826 controls accordingly. The customer's insurer asks the question on certification."
            whatToDo="On the EIC, certify against BS 7671 Part 2's PEI definition. If the installation falls within the BS 7671 definition, apply Section 712 / 826 and document that decision. If it falls inside the CoP definition but outside the BS 7671 definition, follow the CoP for design rigour but certify against the BS 7671 baseline and document the choice under Reg 120.3 — 'applied IET CoP for EESS as best-practice supplement; baseline compliance per BS 7671:2018+A4:2026 Section 712 / 826 as defined in Part 2'."
            whyItMatters="Insurers and auditors read the EIC against the standard named on it. Mixing definitions across documents creates ambiguity; documenting the choice under Reg 120.3 removes it. The discipline is: design to the higher of the two; certify against the standard whose name is on the certificate."
          />

          <SectionRule />

          <ContentEyebrow>Designer&apos;s quick reference</ContentEyebrow>

          <ConceptBlock
            title="Reading any BS 7671 regulation through Part 2"
            plainEnglish="Walk three steps. (1) Identify every defined term in the regulation. (2) Read the Part 2 entry for each. (3) Check whether you are inside a Part 7 location that modifies any of them."
            onSite="(1) Underline the nouns in the regulation. (2) For each underlined noun, look up Part 2 — alphabetical first, Symbols and Abbreviations second. (3) Check the location: is it Section 701 / 702 / 705 / 706 / 708 / 709 / 710 / 711 / 712 / 715 / 717 / 721 / 722 / 729 / 730 / 740 / 753? If yes, read the Part 7 section for any definitional modifier. Fifteen seconds per term, every regulation."
          >
            <p>
              The discipline is small but compounding. Every regulation read this way is a
              regulation defensible at audit, in court, against an insurer dispute, against an EICR
              appeal. Every regulation read without it is a regulation read on hope. The standard's
              authors built Part 2 to be load-bearing precisely so the rest of the standard could be
              operable — the corresponding duty on the user is to read it.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Part 2 is binding, not informative. Reg 110.1.1 places it inside the scope of BS 7671; every "shall" in Parts 3 to 7 inherits its meaning from Part 2.',
              'Part 2 is alphabetical by term, with a parallel Symbols and Abbreviations sub-section. Cite as "Part 2 — term" — there is no "Reg 200.x".',
              'Lookup discipline: definition first, regulation second, Part 7 modification third (Reg 110.1.3). Skip step three inside a special location and you apply the wrong definitional regime.',
              'Common confusions: extraneous-conductive-part vs exposed-conductive-part (different boundary conditions); isolation vs switching vs switching for mechanical maintenance (three Part 2 terms, three Reg 537 duties).',
              "A4:2026 added AFDD, PEI (Prosumer's Electrical Installation) and bidirectional energy transfer to Part 2 — supporting Reg 421.1.7, Section 712 / 826 and the modern energy-flow language.",
              'IET Codes of Practice are best-practice scaffolding, not BS 7671. Where their glossaries differ, certify against BS 7671 Part 2 and document any departure under Reg 120.3.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Key terms
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module2Section1;
