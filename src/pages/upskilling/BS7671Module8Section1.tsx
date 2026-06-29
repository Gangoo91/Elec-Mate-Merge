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
    id: 'm8s1-app4-purpose',
    question:
      'A designer needs to size a 25 mm² SWA cable run buried in the ground for a 100 m sub-main. Which appendix of BS 7671:2018+A4:2026 contains the current-carrying capacity tables and voltage-drop millivolt values they need?',
    options: [
      'Appendix 2 — statutory regulations',
      'Appendix 3 — time-current characteristics for protective devices',
      'Appendix 4 — current-carrying capacity and voltage drop for cables and flexible cords',
      'Appendix 5 — classification of external influences',
    ],
    correctIndex: 2,
    explanation:
      'Appendix 4 is the core sizing reference: Tables 4D1A through 4J5B give tabulated current-carrying capacities (Iz) and Tables 4D1B onward give millivolt-per-amp-per-metre voltage-drop values for every common installation method (Reference Method A through G, including buried direct, in conduit and in free air). Reg 523.1 hands the designer to App 4 for the tables; Reg 525 hands them back to App 4 for voltage drop.',
  },
  {
    id: 'm8s1-app3-mcb-types',
    question:
      'You are checking the maximum permitted Zs for a 32 A Type C MCB and need to confirm the 0.4 s disconnection requirement is met. Which appendix figure shows the time-current characteristic (the 5-10 In tripping band) you reference?',
    options: [
      'Appendix 4, Table 4D1A (current-carrying capacity)',
      'Appendix 3, Figure 3A.4 (Type C MCB time-current curve)',
      'Appendix 6, Form 1 (Electrical Installation Certificate)',
      'Appendix 14, Figure 14.1 (prospective fault current)',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 3 contains the time-current characteristic curves for Type B (5×In nominal trip), Type C (5-10×In) and Type D (10-20×In) MCBs, plus BS 88 fuse curves and BS 3036 fuse curves. The Type C curve confirms the magnetic-instantaneous element trips at the upper end of 5-10 In; Reg 411.4.4 then sets the Zs maximum for the chosen device, which Appendix 3 also tabulates.',
  },
  {
    id: 'm8s1-app5-external',
    question:
      'A car park barrier control panel will be installed outdoors, splash-zone, with occasional vehicle-impact risk. Which appendix gives you the AD / AG codes (water and mechanical impact classifications) you need to specify enclosure IP and IK ratings?',
    options: [
      'Appendix 1 — British Standards',
      'Appendix 5 — classification of external influences',
      'Appendix 8 — earthing requirements for installations with high earth leakage',
      'Appendix 16 — model EICR inspection items',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 5 lists every external-influence code: AA (ambient temperature), AB (humidity), AD (water — AD1 negligible through AD8 submersion), AG (mechanical impact — AG1 low through AG3 high), BA (capability of persons), BC (contact with earth) and so on. Reg 132.5.1 requires the designer to assess external influences and select equipment accordingly; App 5 is the lookup that turns "outdoor splash zone with impact risk" into the right IP/IK rating.',
  },
  {
    id: 'm8s1-app6-a4-changes',
    question:
      'Under BS 7671:2018+A4:2026, the model EIC (Electrical Installation Certificate) form in Appendix 6 has new schedule columns. Which of the following is now an explicit column on the schedule of test results?',
    options: [
      'A column recording the maximum measured insulation resistance for the whole installation',
      'An AFDD test record (Reg 421.1.7) and an explicit TN-C-S (PNB) supply-system option',
      'A column recording the prospective energy let-through (I²t) of each device',
      'A column recording the ambient temperature at the time of testing',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 expands Appendix 6: an AFDD test column on the schedule of test results (because Reg 421.1.7 now requires AFDDs in specified locations), an explicit TN-C-S (PNB) supply-system option on the EIC, and updated wording across MEIWC and EICR forms. Issuing on the old A2/A3 form set after A4 comes into force (15 April 2026, replacing A3 from 15 October 2026) means the cert is on the wrong form version.',
  },
  {
    id: 'm8s1-app14-pscc',
    question:
      'On a domestic single-phase TN-C-S supply, you measure prospective fault current at the cut-out as 6.2 kA on L-N and 4.8 kA on L-PE. Reg 643.7 requires you to record prospective fault current. Which appendix gives the method for determining and recording PSCC and PEFC?',
    options: [
      'Appendix 3 — time-current characteristics for protective devices',
      'Appendix 8 — high protective-conductor current installations',
      'Appendix 14 — determination of prospective fault current',
      'Appendix 16 — model EICR inspection items',
    ],
    correctIndex: 2,
    explanation:
      'Appendix 14 sets out PSCC (prospective short-circuit current, L-N or L-L) and PEFC (prospective earth-fault current, L-PE) determination — measurement at origin, calculation through the installation, the Ipf entry on the cert (highest of the two values, or both, depending on cert version), and the link to breaking-capacity selection (Reg 434.5.1). Reg 643.7 cross-references App 14 directly: PSCC verification is part of initial verification.',
  },
  {
    id: 'm8s1-app7-cable-colours',
    question:
      'You are extending a single-phase circuit installed before 31 March 2004 (red phase, black neutral). The new conductors use the harmonised colours (brown line, blue neutral). What does Appendix 7 require?',
    options: [
      'Replace the entire installation, as mixing old and new colours is not permitted',
      'No marking is required, since the colours are self-explanatory at each terminal',
      'A permanent warning notice plus sleeving at every termination where the colours meet',
      'Mark only the line conductor; neutral and CPC marking are optional',
    ],
    correctIndex: 2,
    explanation:
      'Appendix 7 covers harmonised cable core colours and the transition from the pre-2004 colours. Where new harmonised conductors are connected to existing pre-harmonised conductors, a permanent warning notice must be fixed at the origin and at any consumer unit, and conductors of differing colour codes must be identified at every termination — typically by sleeving (brown sleeve on red, etc.). The notice is the audit trail; the sleeving is the physical safety control.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'You are designing a new 100 m three-phase SWA sub-main on Reference Method D (buried direct in ground). To pick the cable size and verify voltage drop, which two appendices do you live in?',
    options: [
      'Appendix 1 (British Standards) and Appendix 2 (statutory regs)',
      'Appendix 3 (device curves) and Appendix 6 (model forms)',
      'Appendix 4 (current-carrying capacity and voltage drop) and Appendix 3 (time-current characteristics — to verify ADS Zs)',
      'Appendix 14 (PSCC) and Appendix 16 (EICR wording)',
    ],
    correctAnswer: 2,
    explanation:
      'Cable sizing is an Appendix 4 exercise: Iz from the relevant Reference Method table (Method D for buried-direct), then voltage-drop check using the mV/A/m table for that cable construction. Appendix 3 is the partner reference: once you have Iz, you confirm the protective device gives ADS at the design Zs by referencing the device time-current curve and the tabulated Zs maximum for the device rating. App 1, 2, 6, 14 and 16 each have a different role.',
  },
  {
    id: 2,
    question:
      'BS 7671 itself is non-statutory. Which appendix lists the statutory regulations that DO carry force of law and against which BS 7671 compliance is the evidence of duty discharged?',
    options: [
      'Appendix 1 — British Standards referenced in BS 7671',
      'Appendix 5 — classification of external influences',
      'Appendix 16 — model EICR inspection items',
      'Appendix 2 — statutory regulations and associated memoranda',
    ],
    correctAnswer: 3,
    explanation:
      'Appendix 2 lists the relevant statutory regulations: the Electricity at Work Regulations 1989 (EAWR), the Health and Safety at Work etc. Act 1974 (HSWA), the Building Regulations Part P (England and Wales), Building (Scotland) Regulations and the Building Regulations Northern Ireland. BS 7671 compliance is the recognised method by which a designer / installer demonstrates that the duty under EAWR Reg 4 has been discharged.',
  },
  {
    id: 3,
    question:
      'A4:2026 introduces several deletions and renumberings across the appendices. Which of the following correctly states an A4 deletion?',
    options: [
      'Appendix 3 (device curves) has been deleted, leaving only manufacturer data',
      'Appendix 17 (energy efficiency) and Annex B443 (overvoltage risk assessment) have both been deleted',
      'Appendix 5 (external influences) has been deleted, with the codes moved into Part 7',
      'Appendix 14 (prospective fault current) has been deleted and PSCC is no longer recorded',
    ],
    correctAnswer: 1,
    explanation:
      'A4 deletes Appendix 17 (energy efficiency, which was informative and never widely applied) and Annex B443 (the overvoltage-protection risk assessment, which has been folded back into the body of Section 443). Apps 1, 3, 4, 5, 6, 7, 8, 14, 15, 16 all remain. Designers used to applying Annex B443 as a checklist now apply Section 443 directly — same outcomes, no separate annex.',
  },
  {
    id: 4,
    question:
      'You are authoring an EICR. Which appendix gives you the standard wording for inspection items (so two engineers writing the same observation reach the same wording)?',
    options: [
      'Appendix 6',
      'Appendix 14',
      'Appendix 16 — model EICR inspection items',
      'Appendix 5',
    ],
    correctAnswer: 2,
    explanation:
      'Appendix 16 contains the model EICR inspection items — the standard list of items to be inspected and the standard wording for observations. It pairs with Appendix 6 (the EICR model form itself). The pair makes the cert defensible: App 16 wording defines what was assessed and how it would be recorded; App 6 defines the cert layout. GN3 references App 16 throughout.',
  },
  {
    id: 5,
    question:
      'A motor circuit feeds a hospital theatre lift; the standby generator and UPS produce significant earth-leakage current under normal operation. Which appendix gives the earthing requirements where high protective-conductor current is unavoidable?',
    options: [
      'Appendix 4',
      'Appendix 7',
      'Appendix 8 — earthing requirements for installations with high protective-conductor current',
      'Appendix 14',
    ],
    correctAnswer: 2,
    explanation:
      'Appendix 8 (formerly "high earth leakage current") covers the design requirements where load earth-leakage exceeds 10 mA — duplicated CPC, larger CPC cross-section, dedicated final circuits, and labelling. The appendix references Reg 543.7. Healthcare and large IT-server installations are typical applications.',
  },
  {
    id: 6,
    question:
      'A first-fix designer cites "App 4 Method 100" for a domestic ring final on 2.5 mm² T&E. The QS rejects the design. What is the most likely reason?',
    options: [
      'There is no current Reference Method 100 in App 4 — the code was retired and replaced by Methods A to G',
      'Method 100 is reserved for armoured (SWA) cables and cannot be used for T&E',
      'Method 100 applies only to high-temperature mineral-insulated (MICC) cables',
      'The QS is mistaken — Method 100 remains the standard reference for ring finals',
    ],
    correctAnswer: 0,
    explanation:
      'Reference Methods in App 4 run A through G (A in conduit in thermally insulated wall, B in conduit on a wall, C clipped direct, D buried direct or in conduit underground, E free air spaced, F free air touching, G free air bundled), with Methods 100-103 being PRE-2008 codes that were retired. Citing "Method 100" today shows the designer is using outdated references — the correct way to describe a ring-final on T&E clipped to a wall is Reference Method C (or A if in thermally insulated walls).',
  },
  {
    id: 7,
    question:
      'A cable is to be sized for a 7 kW EV charger. The designer must apply correction factors. Where do the correction factors (Ca for ambient temperature, Cg for grouping, Ci for thermal insulation, Cs for soil thermal resistivity, Cf for fusing factor) live?',
    options: [
      'Appendix 1 — British Standards referenced in BS 7671',
      'Appendix 6 — model forms for certification and reporting',
      'Appendix 16 — model EICR inspection items',
      'Appendix 4 — alongside the current-carrying capacity tables',
    ],
    correctAnswer: 3,
    explanation:
      'Appendix 4 carries both the tabulated It (rated current in reference conditions) and the correction factors used to derive Iz (cable current-carrying capacity in actual installation conditions): Iz = It × Ca × Cg × Ci × Cs × Cf. The factors are needed every time the install conditions differ from reference (most installs do) — grouping in particular bites hard on consumer-unit busbars where 6+ circuits share a route.',
  },
  {
    id: 8,
    question:
      'A new starter is overwhelmed by the size of BS 7671 and asks you the fastest way to find which appendix has what. What is the right answer?',
    options: [
      'Use the Contents at the front, the Index at the back, and the regulation cross-references that point to each appendix',
      'Memorise the page numbers for every appendix before starting any design work',
      'Rely on an internet search each time rather than the book itself',
      'Buy a separate third-party index booklet and look every term up in that',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 is designed to be navigated. The Contents (front) gives the structural layout; the Index (back) gives the alphabetical term-to-page mapping; and every numbered Regulation that refers to an appendix uses an explicit cross-reference. Reg 525 ("voltage drop in consumers\' installations") points to App 4. Reg 643.7 ("verification of prospective fault current") points to App 14. Reg 411.3.1.1 cross-references back through Section 411 to Reg 411.4 onwards. Learn the cross-reference style and the book becomes a graph, not a haystack.',
  },
];

const faqItems = [
  {
    question:
      'Why does BS 7671 split the regulations into a numbered body (Parts 1-7) and a set of lettered appendices?',
    answer:
      'The numbered body (Parts 1-7) carries the requirements — the "shall" statements. The appendices carry the data, methods, model forms and informative material that those requirements reference. Splitting them keeps the regulation text concise (a designer reading Reg 525 sees one paragraph, not eight pages of voltage-drop tables) while letting the data tables be updated and re-referenced. Where an appendix is "informative" rather than "normative", the regulation text states this — App 1 (BS list) and App 2 (statutory regs) are informative; App 3, 4, 5, 6, 14 are normative.',
  },
  {
    question: 'How do I tell if the App 4 table I am using has been superseded by A4:2026?',
    answer:
      'Look at the cover: BS 7671:2018+A4:2026 is the current edition (in force from 15 April 2026, replacing A3 from 15 October 2026). The 18th edition published in 2018 (no amendment) was superseded by A1:2020, then A2:2022, then A3:2024, then A4:2026. Each amendment publishes a new "Brown Book" with updated appendices — App 4 itself has been refined across A1-A3, and A4 brings the model forms (App 6) and the new AFDD requirement (Reg 421.1.7) cross-references. If the spine of your book says A2 or A3, the App 4 tables are still substantively correct for cable sizing but the App 6 model forms and the A4 reg additions are missing.',
  },
  {
    question:
      'When citing an appendix in a design certificate, do I quote the table number or the appendix number?',
    answer:
      'Both — and in that order. "Sized to App 4, Table 4D1A, Reference Method C, Iz = 27 A" is precise: the appendix locates the table, the table number locates the row of data, the Reference Method confirms the install configuration, and the Iz value is the design output. Citing only "App 4" is too coarse for an audit; citing only the Iz with no source is undefendable. Use the same pattern for every cert reference.',
  },
  {
    question:
      'Where in the appendices is the prospective fault current method defined, and what does Reg 643.7 require?',
    answer:
      'Appendix 14 defines the determination method for PSCC (prospective short-circuit current, L-N or L-L) and PEFC (prospective earth-fault current, L-PE). Reg 643.7 (initial verification) requires the prospective fault current at the origin to be measured or determined and recorded on the certificate. The recorded value Ipf is the higher of PSCC and PEFC (or both, depending on cert version). The downstream check is Reg 434.5.1: the breaking capacity of every protective device must equal or exceed the PSCC at its location. App 14 walks the designer from origin Ipf, through impedance-based reduction along the installation, to the per-device check.',
  },
  {
    question:
      'I have a Type C MCB time-current curve from the manufacturer. Why also check Appendix 3?',
    answer:
      'Manufacturer data is binding for that specific product line, but App 3 is the BS 7671 generic data used for design when manufacturer data is unavailable, and is the reference cross-checked at audit. App 3 gives Type B trip in 5×In, Type C in 5-10×In, Type D in 10-20×In as the design assumption. If your manufacturer data is significantly more onerous (e.g. a Type C product that only trips at 12×In), the design Zs maximum tightens. App 3 is the "fall-back-safe" data; manufacturer data is the "actual" data. Use both: design to App 3, verify against manufacturer.',
  },
  {
    question: 'Are the model forms in Appendix 6 actually mandatory, or just templates?',
    answer:
      'The forms are normative — Reg 644.1 / 644.2 require an Electrical Installation Certificate, Minor Electrical Installation Works Certificate or EICR to be issued, and the model forms in App 6 are the prescribed form unless an equivalent form is used that includes all the same information. In practice, every certifying body and software provider implements App 6 directly. A4:2026 updates App 6 with the AFDD column, the TN-C-S (PNB) supply option, new declarations on the schedule of inspection (e.g. updated wording around Reg 411.3.4), and consequential renumbering. Issuing on a pre-A4 form after 15 April 2026 puts the cert on the wrong version.',
  },
  {
    question: 'What did A4:2026 actually delete from the appendices?',
    answer:
      'Two main deletions: (1) Appendix 17 (energy efficiency) — was informative, was rarely applied as a deliverable, and the energy-efficiency considerations relevant to design are now built into the body of the regulations and into Energy Performance of Buildings legislation. (2) Annex B443 (the overvoltage protection risk assessment) — has been folded back into Section 443 itself, so the SPD risk assessment is now done from the Section 443 text rather than a separate annex. Neither deletion changes designer obligations; both reduce duplication.',
  },
  {
    question:
      'How do the appendices interact with the Guidance Notes (GN1-GN8) and the On-Site Guide?',
    answer:
      'The appendices are part of BS 7671 itself — the Brown Book. The Guidance Notes and the On-Site Guide are companion publications by the IET that explain and apply BS 7671. GN3 (Inspection & Testing) is the deepest reference for App 6 and App 16; GN1 (Selection & Erection) sits over App 4 and App 5; GN5 (Protection against electric shock) sits over Sections 411-415 and App 3. The OSG re-tabulates much of App 3 / App 4 in a more compact field-friendly format (laminated, condensed) but does not replace the Brown Book as the legal reference. On a contested job, the Brown Book wins.',
  },
  {
    question:
      'I am inspecting an installation against BS 7671 — which appendices do I have open at the workbench?',
    answer:
      'For a typical EICR: App 6 (the EICR model form) and App 16 (the model inspection items, for observation wording) are the primary references. App 3 (device curves, Zs maxima) and App 14 (PSCC values) are open during the testing phase, used to verify ADS and breaking capacity respectively. App 5 (external influences) is referenced when assessing equipment selection in unusual environments. App 7 (cable colours) is referenced where there is mixed pre-2004 / post-2004 wiring. Carry the full Brown Book to site — every appendix gets used somewhere across a year of jobs.',
  },
];

const BS7671Module8Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Navigating Key Appendices | BS 7671:2018+A4:2026 | Module 8.1',
    description:
      'A working tour of BS 7671:2018+A4:2026 appendices — App 1 British Standards, App 2 statutory regs, App 3 device curves, App 4 cable tables, App 5 external influences, App 6 model forms, App 7 colours, App 8 high-leakage, App 14 PSCC, App 16 EICR wording, plus A4 deletions.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-8')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 1"
            title="Navigating key appendices"
            description="The appendices are where BS 7671 keeps its working data — cable tables, device curves, model forms, statutory cross-references and the wording library that makes a cert defensible. Learn the layout once and the Brown Book stops being a haystack."
            actions={
              <>
                <RegBadge>App 4</RegBadge>
                <RegBadge>App 6</RegBadge>
                <RegBadge>App 14</RegBadge>
                <AmendmentBadge regs={['App 6', 'App 17 deleted']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 is a numbered body of regulations (Parts 1-7) plus a set of lettered appendices (App 1 through App 16) that hold the data, model forms and informative cross-references the regulations need.',
              'The five appendices an electrician opens most are App 3 (device curves and Zs maxima), App 4 (cable current-carrying capacity and voltage drop), App 6 (model forms — EIC, MEIWC, EICR), App 14 (prospective fault current) and App 16 (model EICR inspection items).',
              'A4:2026 deletes App 17 (energy efficiency) and Annex B443 (overvoltage risk assessment), updates App 6 with AFDD columns and a TN-C-S (PNB) option, and refines wording across the model forms.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Locate each numbered appendix from App 1 through App 16 and state in one sentence what it contains.',
              'Use App 4 with the correct Reference Method to size a cable (Iz from It with correction factors Ca, Cg, Ci, Cs, Cf) and verify voltage drop per Reg 525.',
              'Use App 3 to read time-current characteristics for Type B / C / D MCBs, BS 88 fuses and BS 3036 fuses, and to look up the Zs maximum for ADS verification (Reg 411.4.4).',
              'Identify the A4:2026 changes to App 6 model forms (AFDD column, TN-C-S (PNB) option, new schedule columns) and know when each model form (EIC, MEIWC, EICR) is the correct cert.',
              'Use App 14 to determine and record prospective fault current per Reg 643.7, then cross-check breaking capacity per Reg 434.5.1.',
              'Use App 16 wording when authoring EICR observations so two engineers reach consistent classification (C1 / C2 / C3 / FI).',
              'Navigate from a regulation cross-reference (e.g. "see App 4") to the right table without flipping pages — using the Contents, the Index and the regulation cross-reference style.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The shape of the Brown Book</ContentEyebrow>

          <ConceptBlock
            title="Numbered body vs lettered appendices"
            plainEnglish="The numbered Parts 1-7 are the requirements — what you must do. The appendices are the data, methods and model forms — how you do it and what you record."
            onSite="When a regulation says 'in accordance with Appendix 4' it is handing you off to a table. The reg sets the rule (e.g. cable shall be sized to carry Ib continuously); the appendix gives the data (the row of It values for that cable construction)."
          >
            <p>
              BS 7671 is split deliberately. The numbered Parts 1 (Scope), 2 (Definitions), 3
              (Assessment), 4 (Protection), 5 (Selection &amp; Erection), 6 (Inspection &amp;
              Testing) and 7 (Special Locations) carry the &quot;shall&quot; statements. The
              appendices carry the supporting data and model forms. Some appendices are
              <strong> normative</strong> (you must use them — App 3, 4, 5, 6, 14, 16); others are
              <strong> informative</strong> (they help you do the job — App 1, 2, 7, 8, 15). The
              status of each appendix is stated at the head of the appendix. Knowing which is which
              changes how you cite it on a cert: a normative appendix reference is binding evidence;
              an informative appendix reference is helpful context.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>App 1 — British Standards referenced in BS 7671</ContentEyebrow>

          <ConceptBlock
            title="The product-standard library"
            plainEnglish="App 1 is the index of every British Standard or harmonised European Standard that BS 7671 cites — switchgear, cables, accessories, transformers, RCDs, MCBs, AFDDs, isolators."
            onSite="When the regulation text says 'shall comply with BS EN 61009-1' for a Type A RCBO, App 1 confirms which standard that is, what it covers, and whether it has been superseded. Using a product to a withdrawn BS is an EICR observation."
          >
            <p>
              App 1 is informative. It does not impose product requirements directly — those come
              from the relevant regulation in the body (e.g. Reg 411.4.4 references the device
              standard, App 1 looks up the standard reference). The list is essential when
              specifying equipment from a manufacturer&apos;s datasheet: the BS or BS EN number on
              the datasheet should appear in App 1 with the same meaning. Where a standard has been
              withdrawn or replaced, App 1 records the latest version. Common references: BS EN
              60898-1 (MCBs), BS EN 61009-1 (RCBOs), BS EN 62423 (Type A / B RCDs), BS EN 50550
              (PEN-fault detectors), BS EN 61851 (EV charging equipment), BS 7671 itself.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>App 2 — Statutory regulations</ContentEyebrow>

          <ConceptBlock
            title="Where the law actually sits"
            plainEnglish="BS 7671 is a standard, not a statute. App 2 lists the laws (statutory regulations) that are enforced: EAWR 1989, HSWA 1974, Building Regs Part P (England &amp; Wales), and the equivalent provisions in Scotland and Northern Ireland."
            onSite="Prosecution under EAWR Reg 4 is the actual sanction. BS 7671 compliance is the recognised means of demonstrating that the EAWR duty has been discharged. Reg 120.3 of BS 7671 permits a documented departure but transfers the burden of justification."
          >
            <p>
              EAWR 1989 (Electricity at Work Regulations) imposes duties on employers, employees and
              self-employed persons to ensure electrical systems are constructed and maintained so
              as to prevent danger. Regs 4(1)-(4), 5, 8, 12, 13, 14 and 16 are the most frequently
              cited in HSE prosecutions. HSWA 1974 (Health and Safety at Work etc. Act) is the
              over-arching statute. Building Regulations Part P (England &amp; Wales) imposes
              specific notification and self-certification regimes for domestic electrical work. The
              Building (Scotland) Regulations and the Building Regulations Northern Ireland set the
              equivalents in those jurisdictions. Reading App 2 once is the fastest way to
              understand why a designer who wires to BS 7671 is also discharging a legal duty — and
              why a departure under Reg 120.3 needs documenting.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Appendix 2 — Statutory Regulations and Associated Memoranda"
            clause="The Regulations of BS 7671 do not have, in themselves, the force of law. They provide a means of complying with relevant aspects of the Electricity Safety, Quality and Continuity Regulations 2002 (as amended), the Electricity at Work Regulations 1989, the Health and Safety at Work etc. Act 1974, and the Building Regulations 2010 (where applicable in England and Wales)."
            meaning="BS 7671 is the route to statutory compliance, not the statute itself. The legal duty exists regardless. Demonstrating BS 7671 compliance is the standard evidence — and a documented departure under Reg 120.3 is the only safe way to deviate."
            cite="BS 7671:2018+A4:2026, Appendix 2"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>App 3 — Time-current characteristics</ContentEyebrow>

          <ConceptBlock
            title="The protective-device data sheet"
            plainEnglish="App 3 contains the time-current curves for every common protective device — Type B, C, D MCBs and RCBOs (BS EN 60898 / BS EN 61009), BS 88 cartridge fuses, BS 3036 rewireable fuses, BS 1361 cut-out fuses — plus the tabulated Zs maxima for each device rating."
            onSite="The single most-used part of the appendix on site: looking up the maximum permitted Zs for the protective device on the circuit you just tested, comparing to the corrected measured Zs, and confirming ADS is in place."
          >
            <p>
              The time-current curve shows tripping/operating time on the y-axis against fault
              current (as a multiple of In) on the x-axis. Type B MCBs trip in the magnetic-
              instantaneous range at 3-5×In; Type C at 5-10×In; Type D at 10-20×In. BS 88 fuses have
              steeper, more energy-let-through-aware curves; BS 3036 rewireable fuses (still found
              in older domestic installations) have considerably worse let-through and require
              tighter Zs values, which is why GN3 typically codes them C2 / C3 on EICR for that
              reason alone. Tabulated Zs maxima in App 3 already include the temperature-correction
              factor (Cmin) — the designer reads Zs(max) directly without extra calculation. App 3
              also includes data for low-voltage HRC fuses to BS 88-2 (general purpose) and BS 88-3
              (motor-circuit applications), and the energy let-through (I²t) values needed for Reg
              434.5 cable thermal-withstand calculation.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>App 4 — Current-carrying capacity and voltage drop</ContentEyebrow>

          <ConceptBlock
            title="The cable-sizing engine"
            plainEnglish="App 4 is the largest and most data-dense appendix. Tabulated current-carrying capacities (It) for every common cable construction (T&amp;E, singles in conduit, SWA, MICC, FP200, busbar trunking, flexible cords) under Reference Methods A through G — plus voltage-drop tables in mV/A/m."
            onSite="The whole of cable design lives here. Pick the row that matches your cable construction, pick the column that matches the Reference Method, read It. Apply correction factors Ca (ambient), Cg (grouping), Ci (insulation), Cs (soil thermal resistivity), Cf (fusing factor) to get Iz. Confirm Iz ≥ Ib. Then use the mV/A/m table to confirm voltage drop is within Reg 525 limits (3% lighting, 5% other, of the nominal voltage at the origin)."
          >
            <p>
              The Reference Methods classify how a cable is installed: Method A (in conduit in
              thermally insulated wall), B (in conduit on a wall), C (clipped direct to a wall or
              ceiling), D (buried direct in ground or in conduit underground), E (free air, single
              cable), F (free air, touching), G (free air, spaced). Each method has its own
              dissipation characteristics; the same cable in Method A vs Method E has very different
              It because Method A traps heat. The appendix also includes the conductor operating
              temperature (typically 70°C for thermoplastic-insulated, 90°C for
              thermosetting-insulated) which influences the temperature-correction factor and the
              Zs(max) calculation. Cable selection in App 4 is a five-step exercise: (1) calculate
              Ib, (2) pick a cable construction, (3) pick the Reference Method that matches your
              install, (4) apply correction factors to It to derive Iz, (5) verify voltage drop per
              Reg 525.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 525.1 — Voltage drop in consumers' installations"
            clause="In the absence of any other consideration, in practice the voltage drop between the origin of an installation and any item of equipment should not exceed that stated in Appendix 4. A greater voltage drop may be accepted for a motor during starting periods and for other equipment with high inrush currents, provided that in both cases it is ensured that the voltage variations are within the limits specified in the relevant equipment standard."
            meaning="The default voltage-drop limits (3% lighting, 5% other) are recommendations from App 4. Reg 525 makes them the working number. The tabulated mV/A/m values in App 4 turn that recommendation into an arithmetic check against design current (Ib) and circuit length."
            cite="BS 7671:2018+A4:2026, Reg 525.1 + Appendix 4"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>App 5 — Classification of external influences</ContentEyebrow>

          <ConceptBlock
            title="The environmental-codes lookup"
            plainEnglish="App 5 lists every external-influence code: AA (ambient temperature), AB (humidity), AC (altitude), AD (water), AE (foreign solid bodies), AF (corrosive substances), AG (mechanical impact), AH (vibration), AK / AL (flora / fauna), AM (electromagnetic), AN (solar), AP (seismic), AQ (lightning), AR (air movement), AS (wind), and BA / BB / BC / BD / BE for capability of persons, body resistance, contact with earth, evacuation conditions, and nature of materials processed."
            onSite="When the designer assesses 'outdoor splash zone with vehicle impact risk', App 5 is what turns that description into AD3 (water — splashes) plus AG3 (mechanical impact — high), which then drives IP rating (IPX5 minimum) and IK rating (IK10 typically) on the enclosure spec."
          >
            <p>
              Reg 132.5.1 makes external-influence assessment mandatory for the designer. App 5
              gives the controlled vocabulary: rather than write &quot;wet area with some impact
              risk&quot;, the designer writes &quot;AD3 / AG3&quot;. Equipment manufacturers specify
              their products against these same codes (e.g. an outdoor weatherproof socket rated
              IP66 covers AD4 — splashes from any direction, plus dust ingress). Special Locations
              in Part 7 use App 5 codes extensively: Section 701 bathrooms specify zone codes that
              map to AD water classifications; Section 705 agricultural premises map to BA2
              (children), BD2 (escape difficult), BE2 (fire risk).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>App 6 — Model forms (EIC, MEIWC, EICR) — A4 changes</ContentEyebrow>

          <ConceptBlock
            title="The certification templates"
            plainEnglish="App 6 contains the three model certificates: Electrical Installation Certificate (EIC) for new installations or substantial alterations, Minor Electrical Installation Works Certificate (MEIWC) for additions to an existing circuit not involving a new circuit, and Electrical Installation Condition Report (EICR) for periodic inspection."
            onSite="A4:2026 updates all three forms. Headlines: an explicit AFDD test column on the EIC schedule of test results (because Reg 421.1.7 now requires AFDDs in specified locations); a TN-C-S (PNB) supply-system option (PNB = protective neutral bonding, a TN-C-S configuration with a single connection to true earth); and refreshed wording in the schedule of inspection to reflect the new Reg 411.3.4 (luminaire RCD) requirement and other A4 changes."
          >
            <p>
              The three certs cover three different scopes. EIC: a new installation, a new circuit
              added to an existing installation, or a substantial alteration. MEIWC: an addition or
              alteration that does not extend to a new circuit (e.g. adding a socket-outlet to an
              existing ring final). EICR: periodic inspection, classifying observations C1 (danger
              present, immediate remedial action required), C2 (potentially dangerous, urgent
              remedial action required), C3 (improvement recommended) or FI (further investigation
              required). Reg 644.1 and Reg 644.2 require the relevant certificate to be issued;
              equivalent forms may be used provided they include all the same information. In
              practice the Brown Book App 6 forms are the standard implemented by every
              certification scheme and software vendor. Issuing on a pre-A4 form set after 15 April
              2026 (or 15 October 2026 for those still on A3) puts the cert on the wrong version —
              see Module 2 (legal framework) for the practical consequences.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Appendix 6 (introduction)"
            clause="The forms in this appendix are models. They may be modified provided that the modified form continues to include the data items required by Regulations 644.1 to 644.4. Any modified form should be developed and used in conjunction with this appendix."
            meaning="The shape of the form is flexible; the data items are not. Software providers tweak layout (logos, branding, page order) but must include every entry the regulation demands. After A4, that includes the AFDD column on the EIC test schedule and the PNB system option on the supply details."
            cite="BS 7671:2018+A4:2026, Appendix 6 (preamble)"
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>App 7 — Harmonised cable core colours</ContentEyebrow>

          <ConceptBlock
            title="The colour transition reference"
            plainEnglish="App 7 documents the harmonised core colours (brown line, blue neutral, green/yellow CPC for single-phase; brown / black / grey lines, blue neutral, green/yellow CPC for three-phase) and the rules for where new harmonised conductors meet pre-31-March-2004 conductors (red / yellow / blue lines, black neutral)."
            onSite="When extending a 1990s installation, you will hit the boundary. App 7 requires sleeving every termination where colours change AND a permanent warning notice at the consumer unit and at any junction box where the change happens. The notice is the audit trail for every future engineer; the sleeving is the immediate physical safety control."
          >
            <p>
              The transition has been law since 31 March 2004 (per BS 7671:2001 + amendments). App 7
              records both colour codes and the marking rules at junctions. A common error is
              installing a new circuit in harmonised colours without putting the warning notice up:
              the cert is non-compliant, and a future engineer working in the consumer unit might
              mistake the existing red conductor for a brown phase. Permanent labelling closes that
              gap. App 7 also covers identification of conductors used as switched lines (e.g. a
              brown sleeve on what would otherwise read as a blue neutral when used as a switched
              line in a two-way switching arrangement) — Reg 514 ties this back to the regulation
              text.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>App 8 — High protective-conductor current</ContentEyebrow>

          <ConceptBlock
            title="When earth leakage is unavoidable"
            plainEnglish="Some equipment leaks earth current under normal operation — large IT-server installations, medical imaging equipment, some VSDs, EMC-filtered drives. Where leakage exceeds 10 mA, App 8 sets the design rules: duplicated CPC, larger CPC cross-section, dedicated final circuits, and labelling."
            onSite="Office data-centre work is the most common scenario. Twenty server power supplies sharing a CPC will collectively leak more than 10 mA — sometimes more than 30 mA — and that defeats a single 30 mA RCD. App 8 designs around this by isolating high-leakage equipment on a dedicated way (often without RCD additional protection, or with a higher-rated RCD) and ensuring the CPC is robust enough to carry the steady-state leakage indefinitely without overheating."
          >
            <p>
              App 8 references Reg 543.7 (high earth-leakage equipment) and Reg 543.7.1.103
              (specific CPC requirements where the protective-conductor current exceeds 10 mA). The
              design controls: (a) CPC of high integrity — either two CPCs each capable of carrying
              the protective-conductor current, OR a single CPC of cross-section ≥ 10 mm² copper,
              (b) dedicated final circuit with no other equipment, (c) warning label identifying
              high leakage. The label wording is itself prescribed in App 8. Where high-leakage
              equipment is on a TN-S supply, the design risk is that an open CPC would otherwise
              allow the steady leakage to drive the local exposed-conductive-parts to a hazardous
              voltage — duplicated CPC removes the single-point failure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>App 14 — Determination of prospective fault current</ContentEyebrow>

          <ConceptBlock
            title="The PSCC / PEFC method"
            plainEnglish="App 14 gives the method for measuring or calculating prospective short-circuit current (PSCC, between line conductors or line-to-neutral) and prospective earth-fault current (PEFC, line-to-PE). Both are recorded on the cert as Ipf — the higher value, or both, depending on the form version."
            onSite="On a domestic single-phase TN-C-S supply, typical Ipf at the cut-out is 6 kA — 16 kA. On a three-phase commercial, 25 kA — 50 kA at the origin. The recorded Ipf drives the breaking-capacity check: every protective device on the installation must have a breaking capacity equal or greater than the PSCC at its location (Reg 434.5.1). A 6 kA Type B MCB on a 16 kA-PSCC supply is non-compliant; the BS EN 60898 family extends to 6 kA, 10 kA, 15 kA — pick the right product."
          >
            <p>
              Reg 643.7 makes prospective fault current verification a part of initial verification
              and recording on the EIC. App 14 walks through the determination: (1) measure at the
              origin using a PSCC test instrument (most modern multifunction testers do this
              automatically), (2) record the highest of the L-N (PSCC) and L-PE (PEFC) values as
              Ipf, (3) for downstream points, calculate using the impedance-based method (Ipf at any
              point = U₀ / Zs at that point, plus appropriate corrections). The breaking-capacity
              check is then per-device: every OPD must have an Icn ≥ Ipf at its location, including
              the consumer-unit main switch and any DBs. App 14 also covers the case where PSCC at
              origin exceeds the breaking capacity of any planned protective device — typically
              resolved by adding a suitably-rated upstream HRC fuse or by switchgear with higher
              breaking capacity. The cert entry is unambiguous: Ipf is the design-input number, not
              a test result that can be conveniently &quot;rounded down&quot;.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7 — Prospective fault current"
            clause="The prospective fault current under both short-circuit and earth fault conditions shall be measured, calculated or determined by another method, at the origin and at other relevant points in the installation. The recording of the prospective fault current shall be on the certificate."
            meaning="Initial verification requires PSCC and PEFC to be determined at the origin and at other relevant points (typically at every distribution board). The value gets recorded on the EIC. App 14 is the method reference; Reg 434.5.1 is the downstream breaking-capacity check."
            cite="BS 7671:2018+A4:2026, Reg 643.7 + Appendix 14"
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>App 16 — Model EICR inspection items</ContentEyebrow>

          <ConceptBlock
            title="The EICR wording library"
            plainEnglish="App 16 is the standard list of inspection items and the standard wording for EICR observations. Two engineers writing the same defect should reach the same wording — App 16 is what makes that possible."
            onSite="A consumer unit without RCD on a domestic luminaire circuit (post-A4) is — typically — coded C2 with the App 16 wording 'Absence of RCD additional protection on AC final circuits supplying luminaires within domestic premises (Reg 411.3.4)'. The standard wording is what allows a second engineer reviewing the cert to know exactly what was observed without re-inspecting."
          >
            <p>
              GN3 references App 16 throughout the EICR sections. The model items cover every part
              of a typical periodic inspection: consumer unit / distribution board, accessible
              wiring, accessories, equipotential bonding, special locations, isolators and
              switchgear, lighting, supplies. Each item carries a recommended classification
              guidance (C1 / C2 / C3 / FI) tied to the typical risk profile, but the engineer in
              charge classifies the actual observation against the actual installation — the App 16
              wording is the language, not the verdict. GN3 also makes clear that every observation
              must be classified (C1, C2, C3 or FI) — there is no &quot;satisfactory with
              notes&quot; option, and an EICR with any C1 or C2 cannot be marked
              &quot;satisfactory&quot;.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>A4:2026 deletions — App 17 and Annex B443</ContentEyebrow>

          <ConceptBlock
            title="What A4 took out"
            plainEnglish="A4 deletes Appendix 17 (energy efficiency — was informative, was rarely applied as a deliverable) and Annex B443 (overvoltage risk assessment — folded back into the body of Section 443)."
            onSite="If your firm had a checklist or template based on Annex B443 for SPD risk assessment, the same outcomes are now reached by walking Section 443 directly. The risk-assessment outcome (whether SPDs are required, and to what level) is unchanged; the checklist source has moved."
          >
            <p>
              The deletions reduce duplication. App 17 (energy efficiency) was only ever informative
              — the design considerations for energy efficiency are now better placed in the
              regulation body and in the broader Energy Performance of Buildings legislation,
              neither of which is duplicated by an appendix. Annex B443 (overvoltage risk assessment
              for SPD selection) was a methodology annex; A4 builds the risk-assessment route into
              Section 443 itself, which means a designer reading 443.4 (Risk Assessment Method) gets
              the entire procedure inline rather than flicking to an annex. Neither deletion changes
              designer obligations or the safety outcome — both tighten the structure of the
              standard.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>How to find what you need</ContentEyebrow>

          <ConceptBlock
            title="Contents, Index and cross-references"
            plainEnglish="BS 7671 has three navigation aids built in: the Contents at the front (chapter / appendix → page), the Index at the back (alphabetical term → page), and cross-references inside every regulation that points to the relevant appendix or other regulation."
            onSite="The fastest route is almost always the cross-reference. If you are reading Reg 525 (voltage drop) and it says 'see Appendix 4', go there directly. If you are starting from a question like 'how do I record PSCC?', the Index gives you 'prospective fault current → 643.7, App 14' in two seconds."
          >
            <p>
              A new electrician opening BS 7671 often tries to memorise page numbers or read
              start-to-finish — both fail because the standard is a graph, not a linear text. The
              right mental model: (1) Contents tells you the structure; (2) Index turns a question
              into a regulation number; (3) the regulation text cross-references the appendix; (4)
              the appendix gives the data. With practice the path is automatic. For everyday
              site-work, four bookmarks make life much easier: App 3 (device curves), App 4 (cable
              tables), App 6 (model forms), App 16 (EICR wording). Carry sticky tabs on the spine of
              the Brown Book and you will find what you need in seconds.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Sizing cables against an outdated App 4 table"
            whatHappens="Designer uses an older edition of BS 7671 (pre-A1:2020 or earlier) or a third-party calculator that hasn't been updated. The Iz value used is from a superseded table — close enough to look right but wrong on the margins, especially for buried cables (Method D) where the soil thermal resistivity assumptions changed."
            doInstead="Always use the App 4 tables from the current edition (BS 7671:2018+A4:2026). When using software, confirm in the app's About / Settings that the underlying data is the current amendment. Carry a paper Brown Book to site for spot-checks. The error margin between editions is small but the cumulative effect on a 100 m run with multiple correction factors is real and compounds."
          />

          <CommonMistake
            title="Citing the wrong cable-CCC method"
            whatHappens="A T&E circuit clipped direct in a kitchen is described on the design as 'Reference Method 100' — a code that no longer exists. The retired Method 100-103 codes were replaced years ago. The QS or auditor rejects the design on a procedural error before even checking the maths."
            doInstead="Use the current Reference Methods (A through G). Method C is clipped direct, B is in conduit on a wall, A is in conduit in a thermally-insulated wall, D is buried direct or in underground conduit, E/F/G are free air variations. If you ever see a 'Method 100' citation, it is using outdated terminology — flag and update."
          />

          <CommonMistake
            title="Issuing an EIC on the pre-A4 App 6 form after 15 April 2026"
            whatHappens="Software has not been updated; engineer issues an EIC missing the AFDD column and using the old TN-C-S option (no PNB sub-option). The cert is on the wrong form version — non-compliant from the date A4 came into force. Insurance and warranty implications follow."
            doInstead="Confirm your certification software is on the A4:2026 form set before issuing any cert dated on or after 15 April 2026 (or 15 October 2026 for installs still legitimately on A3 during the overlap period). The App 6 forms are normative — issuing on an outdated version is a documented departure under Reg 120.3 and shouldn't be done by accident."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Designer using App 4 to size a 100 m three-phase sub-main"
            situation="New 100 m three-phase sub-main from the main switchgear in a workshop block to a satellite distribution board in a separate outbuilding. Design current Ib = 80 A per phase. Cable to be SWA, buried direct in ground (Reference Method D), ambient ground temperature 15°C, no grouping. The designer needs to size the cable and verify voltage drop is within Reg 525 limits (5% of 400 V three-phase = 20 V line-to-line)."
            whatToDo="Open App 4: pick the Table for SWA copper, three-core, thermosetting (XLPE) insulation. The Method D column gives It values for each cable size. For 80 A continuous, Iz must equal or exceed Ib after correction factors. Apply Ca (ambient ground temperature is below the 20°C reference, so Ca > 1 — slight uplift) and Cs (soil thermal resistivity correction if the ground is unusual; normal assumption is 1.0). 16 mm² SWA gives It around 96 A on Method D, comfortably above 80 A after corrections. Now check voltage drop: the mV/A/m table for 16 mm² three-phase XLPE SWA gives approximately 2.4 mV/A/m. Drop = (2.4 × 80 × 100) / 1000 = 19.2 V — within the 20 V limit, but only just. Bumping to 25 mm² gives a more comfortable margin (~1.5 mV/A/m, drop ~12 V) and is the design call if there is any planned future load expansion."
            whyItMatters="The exercise is purely an App 4 exercise. The designer never leaves the appendix to do the sizing — they read It, apply correction factors, derive Iz, then check voltage drop in the same appendix. The worked design log is exactly what an audit or future inspection needs to see — not 'sized to 25 mm²' but 'App 4 Table 4D4A Method D, 25 mm² 3c XLPE SWA, It = 125 A, Ca = 1.04, Cg = 1.0, Iz = 130 A ≥ Ib = 80 A; voltage drop = 12 V ≤ 20 V limit (Reg 525)'."
          />

          <Scenario
            title="Inspector verifying PSCC against App 14 on a periodic"
            situation="Periodic inspection of a 5-year-old commercial three-phase TN-S installation. Origin Ipf measured at the cut-out as 18 kA. The DB-1 sub-board (downstream of a 100 A BS 88 fuse and ~30 m of 35 mm² SWA) houses Type C 32 A MCBs rated to BS EN 60898-1, Icn = 6 kA. The inspector needs to confirm breaking capacity of every device is adequate at its location."
            whatToDo="App 14: calculate Ipf at DB-1 from origin Ipf and the upstream impedance. Origin Ipf = 18 kA at U₀ = 230 V → origin Ze ≈ 0.013 Ω. Add the 35 mm² SWA L-loop (≈ 0.0017 Ω/m × 30 m = 0.051 Ω) and the BS 88 100 A fuse loop impedance (negligible at this current). Total Zs to DB-1 ≈ 0.064 Ω → Ipf at DB-1 ≈ 230 / 0.064 ≈ 3.6 kA. The 6 kA Type C MCBs at DB-1 have Icn = 6 kA, comfortably above the 3.6 kA local PSCC — breaking capacity adequate, no observation. If the calculated Ipf at DB-1 had come back at 7 kA, the 6 kA MCBs would be undersized in breaking capacity — Reg 434.5.1 non-compliance, EICR observation typically C2 (potentially dangerous, the MCBs cannot reliably interrupt a fault at their location)."
            whyItMatters="Recording Ipf at the origin only (Reg 643.7) is the minimum. The breaking-capacity check (Reg 434.5.1) needs Ipf at every protective device location. App 14 is the methodology that turns the origin measurement into the device-level number. On a real periodic, the calculation is done at every DB and recorded — and any device whose Icn is below the local Ipf is a documented non-compliance."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick-reference — where to look</ContentEyebrow>

          <ConceptBlock
            title="The four bookmarks every electrician uses"
            plainEnglish="Sticky-tab the spine of your Brown Book at four places: App 3 (device curves and Zs maxima), App 4 (cable tables), App 6 (model forms), App 16 (EICR wording). These four cover 90% of in-day lookups."
            onSite="Add App 14 if you do a lot of new-build commercial (PSCC determination at origin and DB-level). Add App 5 if you work in unusual environments (agricultural, marine, special locations). Add App 7 if you work on lots of pre-2004 installations — every job will hit a colour-transition junction. Add App 2 if you ever need to write a Reg 120.3 documented departure justification — knowing what statutory regulation backs the rule helps."
          >
            <p>
              The Brown Book is a tool. Four sticky tabs is the difference between &quot;flick
              through 600 pages&quot; and &quot;open at App 4 in two seconds&quot;. For office /
              design-bench work, a digital copy with bookmarks (PDF or the IET app) does the same
              job. For site work, a tabbed paper copy survives spilled tea and dropped tools better
              than a phone. Choose your tool and tab it once.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'BS 7671 is split into a numbered body (Parts 1-7, the requirements) and lettered appendices (App 1 through App 16, the data and model forms). App 3, 4, 5, 6, 14 and 16 are the most-used.',
              'App 4 (cable tables) is the cable-sizing engine: It from the relevant Reference Method, Iz after correction factors (Ca, Cg, Ci, Cs, Cf), voltage drop per Reg 525. App 3 (device curves and Zs maxima) is the partner reference for ADS verification (Reg 411.4.4).',
              'App 6 (model forms) carries the EIC, MEIWC and EICR templates. A4:2026 updates: AFDD column on the schedule of test results (Reg 421.1.7), TN-C-S (PNB) supply option, refreshed wording across the schedule of inspection.',
              'App 14 (PSCC) gives the method for determining and recording prospective fault current per Reg 643.7. Cross-check breaking capacity per Reg 434.5.1 at every DB.',
              'A4:2026 deletes App 17 (energy efficiency) and Annex B443 (overvoltage risk assessment, now built into Section 443). No safety-outcome change — duplication removed.',
              'Navigate via Contents, Index and regulation cross-references. Four sticky tabs on App 3 / 4 / 6 / 16 cover 90% of in-day lookups.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-8-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.2 Schedules, checklists and reference charts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module8Section1;
