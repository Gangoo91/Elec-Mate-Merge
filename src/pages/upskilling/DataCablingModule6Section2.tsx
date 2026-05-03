import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m6s2-class-vs-cat',
    question:
      'A site engineer says "we tested every link as a Cat 6A pass". The performance auditor says "I need it tested as Class EA". Are they asking for the same thing or different things?',
    options: [
      'Different things — Cat 6A and Class EA are unrelated.',
      'The same target, expressed in two terminologies. Cat 6A is the COMPONENT category (the cable, the connectors, the patch panels) per ANSI/TIA-568.2-E. Class EA is the CHANNEL performance class per ISO/IEC 11801-1 / BS EN 50173-1. Cat 6A components installed correctly and tested as a channel produce a Class EA pass. The terminologies map: Cat 6A → Class EA, Cat 7 → Class F, Cat 7A → Class FA, Cat 8.1 → Class I, Cat 8.2 → Class II.',
      'Class EA is a stricter test that Cat 6A cannot meet.',
      'Class EA is for fibre, Cat 6A is for copper.',
    ],
    correctIndex: 1,
    explanation:
      'Category = parts you bought. Class = performance the channel measures to once installed. Cat 6A is the TIA component category; Class EA is the ISO/EN channel-performance class. They map directly. A "Cat 6A pass" tested as a permanent link / channel IS a Class EA pass. A Cat 6A install built badly (tight bundles, parallel to LV power, rough terminations) can fail Class EA testing — and that is the central diagnostic. Class is what the building has; Category is what the building bought.',
  },
  {
    id: 'datacabling-m6s2-channel-link-rule',
    question:
      'A horizontal run for a Cat 6A / Class EA channel: outlet to floor distributor is 87 m of installed cable, plus a 3 m work-area cord, plus a 4 m equipment cord. Is this a compliant channel under BS EN 50173-1?',
    options: [
      'No — total exceeds 90 m.',
      'Yes — the permanent link is 87 m (≤ 90 m max) and the channel is 94 m (≤ 100 m max), with cord allowance of 7 m used out of the 10 m budget. This satisfies both the 90 m permanent-link rule and the 100 m channel rule.',
      'No — the patch cord at the FD is missing from the calculation.',
      'Yes, but only because Cat 6A uniquely allows 100 m permanent link.',
    ],
    correctIndex: 1,
    explanation:
      '90 m permanent link is the hard limit on the installed cable; 100 m total channel is the hard limit including all cords. 87 + 3 + 4 = 94 m channel, with 87 m permanent link. Both within budget. The 10 m cord allowance is COMBINED across patch, equipment and work-area cords — using only 7 m leaves 3 m headroom. Cat 6A and Class EA share the same 90 m / 100 m model as Cat 5e / Class D and Cat 6 / Class E — it does not change with Class.',
  },
  {
    id: 'datacabling-m6s2-cat8-distance',
    question:
      'A data-centre RFP specifies "Cat 8.1 / Class I top-of-rack cabling". What is the practical channel-length limit for Cat 8.1, and why?',
    options: [
      '100 m, the same as Cat 6A.',
      'Approximately 30 m — Cat 8 (both .1 and .2) is specified up to 2000 MHz and supports 25/40GBASE-T, but the channel model is shorter (typically 30 m, 2 connectors max) to keep insertion loss within budget at those frequencies. Used almost exclusively for top-of-rack server-to-switch cabling in data centres, where the short reach matches the rack environment.',
      '90 m, the same as the permanent-link limit.',
      '10 m only.',
    ],
    correctIndex: 1,
    explanation:
      'Cat 8 channels are short. The 2000 MHz frequency response and 25/40 Gbps target push insertion loss budgets that cannot be met at 100 m, so the standard channel is 30 m with 2 connectors. This is fine in a data centre rack environment (top-of-rack server links are typically 1-3 m) but useless for a generic horizontal run. Cat 8.1 uses RJ45 connectors; Cat 8.2 uses non-RJ45 (TERA, GG45) connectors. BS 7671 §716.521.101 lists both Cat 8.1 and Cat 8.2 as acceptable for ICT cables carrying DC power.',
  },
  {
    id: 'datacabling-m6s2-716-521',
    question:
      'BS 7671:2018+A4:2026 §716.521.101 lists the cable Categories acceptable for ICT cables used to distribute DC power (PoE). Which of the following lists is verbatim from the regulation?',
    options: [
      'Cat 5, Cat 5e, Cat 6, Cat 6A only.',
      'Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 (or other cables defined in BS EN 50173-1).',
      'Cat 6A only — earlier categories are no longer acceptable.',
      'Class D through Class FA — Cat 8 is excluded.',
    ],
    correctIndex: 1,
    explanation:
      '§716.521.101 verbatim lists: Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 (or other cables defined in BS EN 50173-1 by reference to BS EN 50288 series). Cat 5 (note: not 5e in the verbatim text) through Cat 8.2 are all accepted as PoE-capable carriers under §716. The regulation is permissive on Category but capped on current — §716.523.2.101 imposes the 750 mA per-conductor hard ceiling regardless of which Category is used.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the difference between "Category" (TIA terminology) and "Class" (ISO/IEC and BS EN terminology) in structured cabling?',
    options: [
      'They are unrelated specifications.',
      'Category describes the COMPONENTS — the cable, the connectors, the patch panels — purchased to a specified TIA grade (Cat 5e, 6, 6A, 7, 7A, 8.1, 8.2). Class describes the resulting CHANNEL performance — what the installed cabling actually measures to when tested (Class D, E, EA, F, FA, I, II per BS EN 50173-1 / ISO/IEC 11801-1). They map directly: Cat 6A → Class EA, Cat 7 → Class F, Cat 8.1 → Class I, Cat 8.2 → Class II. A Cat 6A install built badly will fail Class EA testing.',
      'Category is for copper, Class is for fibre.',
      'Class is the marketing name; Category is the engineering name.',
    ],
    correctAnswer: 1,
    explanation:
      'Category = parts; Class = installed performance. The mapping is Cat 5e → Class D, Cat 6 → Class E, Cat 6A → Class EA, Cat 7 → Class F, Cat 7A → Class FA, Cat 8.1 → Class I, Cat 8.2 → Class II. The diagnostic is straightforward: if you bought Cat 6A and the channel test fails Class EA, the COMPONENTS were Cat 6A but the INSTALL was sub-EA. The Class is the truth of the building; the Category is the truth of the bill of materials.',
  },
  {
    id: 2,
    question:
      'Which Class is specified at 500 MHz frequency response and is the "current default" for new commercial UK installs supporting 10GBASE-T to 100 m?',
    options: [
      'Class D (Cat 5e).',
      'Class E (Cat 6).',
      'Class EA (Cat 6A) — 500 MHz, 10 Gbps to 100 m channel.',
      'Class FA (Cat 7A).',
    ],
    correctAnswer: 2,
    explanation:
      'Class EA / Cat 6A is the modern UK office default. 500 MHz frequency response, 10GBASE-T at 100 m channel, sufficient headroom for foreseeable PoE++ services. Class D / Cat 5e (100 MHz, 1 Gbps) is the legacy minimum but cannot support 10 Gbps at any useful distance. Class E / Cat 6 supports 10 Gbps only to 55 m and is now an upgrade path rather than a new-build choice.',
  },
  {
    id: 3,
    question:
      'A horizontal cabling channel is being designed under ISO/IEC 11801-1 / BS EN 50173-1. What is the maximum permanent-link length?',
    options: [
      '100 m.',
      '90 m — the contractor-installed solid-conductor cable from the work-area outlet (TO) to the floor-distributor patch panel cannot exceed 90 m. The remaining 10 m is the combined cord allowance (work-area + patch + equipment cord) that brings the channel total to 100 m maximum.',
      '70 m.',
      '50 m.',
    ],
    correctAnswer: 1,
    explanation:
      'Permanent link ≤ 90 m. Channel ≤ 100 m (= ≤ 90 m permanent link + ≤ 10 m combined cord allowance). The 90 m and 100 m budgets are fixed across Class D / E / EA / F / FA. Class I / II (Cat 8) is the exception — its channel is approximately 30 m due to the higher frequency target.',
  },
  {
    id: 4,
    question:
      'BS 7671:2018+A4:2026 §716.521.101 states which cable Categories are acceptable for ICT cables used to distribute DC power?',
    options: [
      'Only Cat 6A and above.',
      'Verbatim: "Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by reference to the specifications given in BS EN 50288 series."',
      'Only Cat 8.1 and Cat 8.2.',
      'All copper cables — no Class restriction.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.521.101 lists Cat 5, 6, 6A, 7, 7A, 8.1, 8.2 (or other BS EN 50173-1 cables). The Category list is permissive — what binds is §716.523.2.101 (750 mA per conductor max) and §716.526.101 (750 mA per contact at the connector). Note: the verbatim text says "Category 5", not "5e" — this is a quirk of the text reproduced from the database; in practice every modern install uses 5e at minimum.',
  },
  {
    id: 5,
    question:
      'You are deciding between Cat 6A / Class EA and Cat 7A / Class FA for a new-build UK office. Which is the better default and why?',
    options: [
      'Cat 7A — more headroom is always better.',
      'Cat 6A / Class EA — it is the established default for new commercial UK installs (10GBASE-T at 100 m, 500 MHz) with mature components, predictable supply chain, and a clear PoE++ thermal profile. Cat 7 / 7A and Class F / FA exist (1000 MHz / 600 MHz, screened TP) but are niche and have no TIA equivalent in commercial premises — they suit specialised industrial / EMC-critical use cases. Cat 8 is data-centre-specific.',
      'Class FA — it is the only ISO standard.',
      'It does not matter — they are identical.',
    ],
    correctAnswer: 1,
    explanation:
      'Cat 6A / Class EA is the modern UK office default because the components, the install practice, and the test certification are all mature, the 10 Gbps reach is full 100 m, and the PoE++ thermal envelope is well understood. Cat 7 / 7A are niche — they exist in ISO/EN but TIA never adopted them for commercial premises because the marginal performance over Cat 6A did not justify the cost. Cat 8 is data-centre top-of-rack only.',
  },
  {
    id: 6,
    question:
      'What is the practical CHANNEL length limit for Cat 8.1 / Class I or Cat 8.2 / Class II cabling, and where is it used?',
    options: [
      '100 m, the same as Cat 6A — for general office use.',
      'Approximately 30 m channel (with 2 connectors maximum), used almost exclusively for top-of-rack server-to-switch cabling in data centres. The 2000 MHz frequency response and 25/40 Gbps target preclude longer reaches.',
      '500 m — for backbone use.',
      'No length limit — Class I/II is fibre.',
    ],
    correctAnswer: 1,
    explanation:
      'Cat 8 is short-reach high-frequency. ~30 m channel, 2 connectors. Suits data-centre top-of-rack: 1-3 m server-to-switch jumpers in a rack environment. Useless for generic horizontal runs (you cannot reach the desk in 30 m). Cat 8.1 uses RJ45 (compatible with existing test instruments and connector ecosystems). Cat 8.2 uses non-RJ45 (TERA / GG45) — higher performance but specialist.',
  },
  {
    id: 7,
    question:
      'A "Class EA" certificate is issued for a Cat 6A install. Which test instrument level is required to defensibly back that certification?',
    options: [
      'Any LAN tester is acceptable.',
      'A field test instrument meeting ANSI/TIA-1152-A Level III at minimum, with Level IV or V preferred for Class EA accuracy. Without a TIA-1152-A Level III/IV/V instrument (or BS EN 50346 equivalent), the certificate has no defensible accuracy basis.',
      'Only a Time Domain Reflectometer.',
      'Only an OTDR.',
    ],
    correctAnswer: 1,
    explanation:
      'TIA-1152-A defines field-test instrument accuracy levels — Level III, IIIe, IV, V (V is the current top accuracy). For a Class EA / Cat 6A certification to be defensible, the instrument must meet the accuracy level appropriate to the Class. Most modern test instruments certify to Level IV or V. BS EN 50346 is the European equivalent. An OTDR is for fibre. A general LAN tester (continuity-only) is NOT a Class-tester.',
  },
  {
    id: 8,
    question:
      'Which Class is the LEGACY MINIMUM (frequency response 100 MHz, max 1 Gbps to 100 m) — sometimes still seen on existing 2002-2010 era buildings but not specified for new UK installs?',
    options: [
      'Class D (Cat 5e) — 100 MHz, 1 Gbps to 100 m.',
      'Class E (Cat 6).',
      'Class EA (Cat 6A).',
      'Class F (Cat 7).',
    ],
    correctAnswer: 0,
    explanation:
      'Class D / Cat 5e is the legacy minimum. 100 MHz, 1 Gbps (1000BASE-T) to 100 m. Adequate for the era but cannot deliver 10GBASE-T at any useful distance, and PoE++ Type 4 thermal limits push it out of comfortable scope. New UK commercial installs default to Cat 6A / Class EA.',
  },
  {
    id: 9,
    question: 'In which standard family does "Class F" exist as a defined performance class?',
    options: [
      'ANSI/TIA-568 only.',
      'ISO/IEC 11801-1 and BS EN 50173-1 — Class F (and FA) are EN/ISO concepts. They were never adopted in ANSI/TIA-568 because the Telecommunications Industry Association judged the marginal performance over Cat 6A did not justify the cost in commercial premises. Cat 7 (≈ Class F) and Cat 7A (≈ Class FA) cabling exists from EN/ISO-aligned manufacturers but is rare in TIA-568 specifications.',
      'BS 7671 only.',
      'Both TIA and EN/ISO.',
    ],
    correctAnswer: 1,
    explanation:
      'Class F / FA is an EN/ISO concept; Cat 7 / 7A is the matching component naming. ANSI/TIA-568 never adopted Class F or Cat 7 — TIA jumped from Cat 6A directly to Cat 8 (Class I/II) for data-centre top-of-rack. EN/ISO-jurisdiction projects sometimes still see Cat 7 / Class F specified for specialised EMC-critical or industrial applications, but on standard commercial UK installs Class EA / Cat 6A is the modern default.',
  },
  {
    id: 10,
    question:
      'You inherit a 2010-era building cabled to "Class D" (Cat 5e). The new tenant needs 10GBASE-T to every desk. What is the engineering reality?',
    options: [
      'Class D supports 10GBASE-T — proceed.',
      'Class D / Cat 5e is specified to 100 MHz and 1 Gbps. 10GBASE-T requires a Class E (Cat 6) channel for 55 m reach or Class EA (Cat 6A) channel for full 100 m reach. The Cat 5e cabling cannot deliver 10GBASE-T at 100 m — the frequency response is fundamentally insufficient. The fix is selective re-cabling of affected runs to Cat 6A, not a software setting. This is one of the few legitimate triggers for re-cabling a building inside its design life.',
      'Class D supports 10 Gbps if you turn on auto-negotiation.',
      'Class D supports 10 Gbps but only for 30 m runs.',
    ],
    correctAnswer: 1,
    explanation:
      'Class D / Cat 5e cannot deliver 10GBASE-T at 100 m — its frequency response (100 MHz) and insertion-loss budget were specified for 1000BASE-T (1 Gbps). 10GBASE-T needs Class E (Cat 6) for 55 m or Class EA (Cat 6A) for full 100 m. This is a hardware-limit problem; no auto-negotiation tweak fixes it. Service-independence has limits — a Class specified for 1 Gbps cannot absorb a 10 Gbps requirement. Re-cable to Cat 6A in the affected areas.',
  },
];

const faqs = [
  {
    question:
      'Why does Class EA exist as a separate Class from Class E? Why not just have "more E"?',
    answer: (
      <>
        Class EA was the augmented Class E that gave 10GBASE-T at full 100 m channel reach. Class E
        (Cat 6) was specified to 250 MHz and supported 10 Gbps only to 55 m. When 10GBASE-T
        deployment exposed that limit, Class EA / Cat 6A was specified to 500 MHz with much tighter
        alien crosstalk control to deliver full 100 m reach. The {`"`}A{`"`} suffix means
        {`"`}augmented{`"`} — same Class lineage, expanded performance. The same pattern produced
        Class FA from Class F when 10G-over-Cat 7 needed augmentation.
      </>
    ),
  },
  {
    question: 'Cat 7 / Class F has been around for years. Why is it niche in UK commercial work?',
    answer: (
      <>
        Cat 7 / Class F was specified by ISO/IEC and CENELEC but never adopted in ANSI/TIA-568 for
        commercial premises — TIA judged that for office work Cat 6A / Class EA delivered the useful
        performance and Cat 7 added cost without proportionate benefit. The EN/ISO world retained
        Cat 7 / Class F as a higher-performance option for screened-TP applications and EMC-critical
        environments (industrial, broadcast, some healthcare). On a typical UK office fit-out you
        will see Cat 6A / Class EA. On an industrial or specialised job, Cat 7 / Class F may be
        specified — it remains valid in EN/ISO and remains acceptable under BS 7671 §716.521.101.
      </>
    ),
  },
  {
    question: 'How does the 90 m / 100 m channel rule change for Cat 8?',
    answer: (
      <>
        It does not, but the practical limit for Cat 8 is much shorter. The base 90 m / 100 m
        channel model in BS EN 50173-1 / ISO/IEC 11801-1 / TIA-568.0-E remains the architectural
        reference, but Cat 8 (both .1 and .2) is specified to 2000 MHz and targets 25/40 Gbps. At
        those frequencies the insertion-loss and return-loss budgets cannot survive 100 m, so the
        standard Cat 8 channel is approximately 30 m with 2 connectors maximum. This matches its
        actual deployment use case — top-of-rack server-to-switch jumpers in data centres, which are
        1-3 m runs.
      </>
    ),
  },
  {
    question: 'A test report shows "Class D pass" on Cat 6A components. What is happening?',
    answer: (
      <>
        The test instrument is reporting the highest Class the channel measures to. {`"`}Class D
        pass{`"`} on Cat 6A components means the install only achieves Class D performance — the 100
        MHz / 1 Gbps tier — despite being built from Cat 6A parts. This is the classic diagnostic
        for poor install practice: tight bundles trapping heat, parallel runs to LV power inducing
        crosstalk, rough strip-and-twist terminations introducing return loss, bend radii violated
        at the patch panel. The components were correct; the workmanship delivered a Class-D channel
        from Cat 6A. The fix is rework of the offending links, not new components.
      </>
    ),
  },
  {
    question: 'Why does BS 7671:2018+A4:2026 §716.521.101 say "Category 5" and not "Category 5e"?',
    answer: (
      <>
        That is the verbatim wording in the regulation. The list is: Category 5, Category 6,
        Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 (or other cables as
        defined in BS EN 50173-1). In practice, every modern UK install uses Cat 5e at minimum —
        true Cat 5 (without the {`"`}e{`"`}) was specified for 100BASE-TX and is essentially
        obsolete. The regulation{`'`}s wording is permissive — it sets a floor at the older Cat 5
        components, but does not require them; it is the BS EN 50173-1 cable ecosystem that
        specifies Cat 5e and above as the practical floor. What binds tightly is §716.523.2.101 —
        750 mA per conductor — regardless of which Category is used.
      </>
    ),
  },
  {
    question: 'How do "Class I" and "Class II" relate to Category 8.1 and 8.2?',
    answer: (
      <>
        Class I corresponds to Cat 8.1 (RJ45-compatible connector ecosystem). Class II corresponds
        to Cat 8.2 (non-RJ45 connectors — TERA, GG45). Both are 2000 MHz / 25-40 Gbps / ≈ 30 m
        channel. Both are listed in BS 7671:2018+A4:2026 §716.521.101 as acceptable carriers for ICT
        cables distributing DC power. The choice between .1 and .2 is connector-ecosystem driven —
        Cat 8.1 plays well with existing RJ45 infrastructure and test instruments; Cat 8.2 is a
        clean-sheet design with marginally better high- frequency performance but a smaller
        component ecosystem. Both are data-centre top-of-rack only in mainstream use.
      </>
    ),
  },
];

const DataCablingModule6Section2 = () => {
  const navigate = useNavigate();

  useSEO(
    'Class D, E, EA, F, FA, I, II Standards | Data Cabling Module 6.2 | Elec-Mate',
    'The performance Classes — Class D (Cat 5e, 100 MHz), Class E (Cat 6, 250 MHz), Class EA (Cat 6A, 500 MHz, 10 GbE to 100 m), Class F / FA (Cat 7 / 7A), Class I / II (Cat 8.1 / 8.2, data-centre TOR). Channel and permanent-link models. The 100 m channel rule across Classes. BS 7671:2018+A4:2026 §716.521.101 verbatim cable Category list for PoE.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2"
            title="Class D, E, EA, F (and FA, I, II) Standards"
            description="The performance Classes — frequency response, channel and permanent-link models, and Class-to-Category mapping. Class D (Cat 5e, 100 MHz, 1 Gbps), Class E (Cat 6, 250 MHz), Class EA (Cat 6A, 500 MHz, 10 GbE to 100 m — the modern default), Class F (Cat 7, 600 MHz) and FA (Cat 7A, 1000 MHz), Class I (Cat 8.1) and Class II (Cat 8.2, both 2000 MHz, ~30 m data-centre top-of-rack). The 100 m channel + 90 m permanent-link rule across Classes — and the verbatim BS 7671:2018+A4:2026 §716.521.101 list of acceptable PoE cable Categories."
            tone="yellow"
          />

          <TLDR
            points={[
              'Class is what the installed channel measures to; Category is what the components were bought as. They map directly: Cat 5e → Class D, Cat 6 → Class E, Cat 6A → Class EA, Cat 7 → Class F, Cat 7A → Class FA, Cat 8.1 → Class I, Cat 8.2 → Class II. A Cat 6A install built badly fails Class EA testing.',
              'Class EA / Cat 6A is the modern UK commercial default: 500 MHz, 10GBASE-T at full 100 m channel, mature components and predictable PoE++ thermal profile. Class D / Cat 5e is legacy minimum (100 MHz, 1 Gbps); Class E / Cat 6 supports 10 Gbps only to 55 m.',
              'The 90 m permanent link + 10 m cord = 100 m channel rule is fixed across Class D / E / EA / F / FA. Class I / II (Cat 8) is the exception — its channel is approximately 30 m with 2 connectors, dictated by 2000 MHz frequency response. Cat 8 is data-centre top-of-rack only.',
              'BS 7671:2018+A4:2026 §716.521.101 verbatim: ICT cables for DC power distribution shall comply with Category 5, 6, 6A, 7, 7A, 8.1 or 8.2 (or other BS EN 50173-1 cables). The Category list is permissive; what binds is §716.523.2.101 (750 mA per conductor) and §716.526.101 (750 mA per contact).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish Category (TIA component grade) from Class (EN/ISO channel performance) and explain the diagnostic value of the Class test on a Cat 6A install',
              'Map every Category (Cat 5e to Cat 8.2) to its Class (Class D to Class II) and recall the frequency response and 10/25/40 Gbps reach of each',
              'State the 100 m channel + 90 m permanent-link + 10 m cord rule and confirm it applies across Class D / E / EA / F / FA',
              'Explain why Cat 8 (Class I and II) channels are limited to approximately 30 m with 2 connectors — and why this matches its data-centre top-of-rack deployment',
              'Quote BS 7671:2018+A4:2026 §716.521.101 verbatim and explain how it lists the acceptable cable Categories for PoE / ELV DC over balanced cabling',
              'Explain how §716.523.2.101 (750 mA per conductor) caps the regulatory PoE current independent of which Category is used',
              'Identify why Class EA / Cat 6A is the modern UK commercial default and why Class F / FA / Class I / II are niche or specialist',
              'Recognise the test instrument levels (TIA-1152-A Level III / IIIe / IV / V) required to defensibly certify a channel against its Class',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Class versus Category — the key distinction</ContentEyebrow>

          <ConceptBlock
            title="Category is what you bought; Class is what you have"
            plainEnglish={`The two terminologies sit either side of the install. Category — Cat 5e, 6, 6A, 7, 7A, 8.1, 8.2 — describes the COMPONENTS purchased: cable, jacks, patch panels, connectors all certified to a TIA grade per ANSI/TIA-568.2-E. Class — Class D, E, EA, F, FA, I, II — describes the CHANNEL performance the installed cabling measures to per ISO/IEC 11801-1 / BS EN 50173-1. The two map directly, but they are not the same number. A Cat 6A install built badly will fail Class EA testing — same components, weaker channel.`}
            onSite="When you read a test report, look at the Class line, not the Category. Category was set at the bill-of-materials stage and never changes. Class is the truth of the installed channel — and it is the number the active equipment cares about. A 'Class D pass on Cat 6A components' is the textbook signature of poor workmanship: tight bundles, parallel power runs, rough terminations, bend-radius violations. Components fine; install poor."
          >
            <p>The Category-to-Class mapping table:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cat 5e → Class D.</strong> 100 MHz, 1 Gbps (1000BASE-T) to 100 m. Legacy
                minimum.
              </li>
              <li>
                <strong>Cat 6 → Class E.</strong> 250 MHz, 1 Gbps to 100 m or 10 Gbps only to 55 m.
                Upgrade path territory.
              </li>
              <li>
                <strong>Cat 6A → Class EA.</strong> 500 MHz, 10 Gbps to full 100 m. The modern UK
                commercial default.
              </li>
              <li>
                <strong>Cat 7 → Class F.</strong> 600 MHz, screened TP. ISO/EN only — never adopted
                in ANSI/TIA-568. Niche.
              </li>
              <li>
                <strong>Cat 7A → Class FA.</strong> 1000 MHz, screened TP with augmented headroom.
                Niche.
              </li>
              <li>
                <strong>Cat 8.1 → Class I.</strong> 2000 MHz, 25/40 Gbps to ~30 m with RJ45.
                Data-centre top-of-rack.
              </li>
              <li>
                <strong>Cat 8.2 → Class II.</strong> 2000 MHz, 25/40 Gbps to ~30 m with non-RJ45
                (TERA / GG45) connectors. Data-centre top-of-rack with specialist ecosystem.
              </li>
            </ul>
            <p>
              The relationship runs in one direction: a Cat 6A install COULD certify to Class EA
              (and that is the design intent), but the install practice determines whether it
              actually does. A Class EA channel REQUIRES Cat 6A components — you cannot {`"`}upgrade
              {`"`} a Cat 6 channel to Class EA without replacing the cable. So Category is the
              upper bound; Class is the actual measurement.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.521.101 (Cable category — verbatim)"
            clause={
              <>
                Information and communication technology (ICT) cables used for the distribution of
                DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category
                7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by
                reference to the specifications given in BS EN 50288 series.
              </>
            }
            meaning="§716.521.101 verbatim names the Categories from Cat 5 through Cat 8.2 as acceptable for PoE / ELV DC distribution. The list is permissive — every modern Category in the BS EN 50173-1 ecosystem is in scope. What constrains is the current ceiling (§716.523.2.101 — 750 mA per conductor) and the connector rating (§716.526.101 — 750 mA per contact). On a UK install, picking a Category is a service-headroom decision; picking the right install practice is a regulatory-compliance decision."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <AmendmentBadge regs={['716']} edition="A4:2026" />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Class-to-Category mapping table</ContentEyebrow>

          <AppendixTable
            caption="Class to Category — frequency response, reach and use case"
            source="BS EN 50173-1 / ISO/IEC 11801-1 / ANSI/TIA-568.2-E (2024)"
            headers={[
              'Category (TIA)',
              'Class (EN/ISO)',
              'Frequency response',
              'Max channel speed / reach',
              'Typical use case',
            ]}
            rows={[
              [
                'Cat 5e',
                'Class D',
                '100 MHz',
                '1 Gbps (1000BASE-T) to 100 m',
                'Legacy; minimum for new install',
              ],
              [
                'Cat 6',
                'Class E',
                '250 MHz',
                '1 Gbps to 100 m / 10 Gbps to 55 m',
                'Legacy upgrade path',
              ],
              ['Cat 6A', 'Class EA', '500 MHz', '10 Gbps to 100 m', 'Modern UK commercial default'],
              [
                'Cat 7',
                'Class F',
                '600 MHz',
                '10 Gbps to 100 m (screened TP)',
                'Niche · ISO/EN only · no TIA equivalent',
              ],
              [
                'Cat 7A',
                'Class FA',
                '1000 MHz',
                '10 Gbps with headroom (screened TP)',
                'Niche · specialist EMC / industrial',
              ],
              [
                'Cat 8.1',
                'Class I',
                '2000 MHz',
                '25/40 Gbps to ~30 m (RJ45)',
                'Data-centre top-of-rack',
              ],
              [
                'Cat 8.2',
                'Class II',
                '2000 MHz',
                '25/40 Gbps to ~30 m (TERA / GG45)',
                'Data-centre top-of-rack · specialist',
              ],
            ]}
            notes="The 100 m channel + 90 m permanent-link + 10 m cord rule is fixed across Class D / E / EA / F / FA. Class I / II (Cat 8) breaks this pattern — its channel is approximately 30 m due to the 2000 MHz frequency target. Class EA / Cat 6A delivers full 10GBASE-T at 100 m and is the modern UK commercial default. Class D / Cat 5e cannot deliver 10GBASE-T at any useful distance."
          />

          {/* Class / Category cross-reference map */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Class / Category cross-reference — TIA Category ↔ ISO/EN Class with frequency and
              reach
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="A side-by-side mapping table of TIA Categories on the left and the equivalent ISO/EN Class on the right, with the channel frequency and maximum data rate shown below each row. Rows from top to bottom: Cat 5e maps to Class D, 100 megahertz, 1 Gbps to 100 metres, legacy minimum. Cat 6 maps to Class E, 250 megahertz, 1 Gbps to 100 metres or 10 Gbps to 55 metres. Cat 6A maps to Class EA, 500 megahertz, 10 Gbps to 100 metres, the modern UK default. Cat 7 maps to Class F, 600 megahertz, ISO and EN only, no TIA equivalent. Cat 7A maps to Class FA, 1000 megahertz. Cat 8.1 maps to Class I, 2000 megahertz, around 30 metre data centre channel. Cat 8.2 maps to Class II, 2000 megahertz, around 30 metre data centre channel. A bottom legend panel explains the colour coding."
            >
              {/* ===== Column header band ===== */}
              <rect
                x="30"
                y="20"
                width="840"
                height="44"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <rect
                x="50"
                y="30"
                width="220"
                height="24"
                rx="5"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="47"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                TIA CATEGORY
              </text>

              <rect
                x="290"
                y="30"
                width="220"
                height="24"
                rx="5"
                fill="rgba(234,179,8,0.20)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="400"
                y="47"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                ISO / EN CLASS
              </text>

              <rect
                x="530"
                y="30"
                width="160"
                height="24"
                rx="5"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="610"
                y="47"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                FREQUENCY
              </text>

              <rect
                x="710"
                y="30"
                width="160"
                height="24"
                rx="5"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="790"
                y="47"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                MAX REACH
              </text>

              {/* ============== ROW 1 — Cat 5e / Class D ============== y top = 80 */}
              <rect
                x="50"
                y="80"
                width="820"
                height="46"
                rx="6"
                fill="rgba(156,163,175,0.06)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="86"
                width="200"
                height="34"
                rx="5"
                fill="rgba(156,163,175,0.20)"
                stroke="#9CA3AF"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="108"
                textAnchor="middle"
                fill="#F3F4F6"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 5e
              </text>

              <line
                x1="260"
                y1="103"
                x2="300"
                y2="103"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              <rect
                x="300"
                y="86"
                width="200"
                height="34"
                rx="5"
                fill="rgba(156,163,175,0.20)"
                stroke="#9CA3AF"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="108"
                textAnchor="middle"
                fill="#F3F4F6"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class D
              </text>

              <text
                x="610"
                y="108"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontFamily="system-ui"
              >
                100 MHz
              </text>
              <text
                x="790"
                y="108"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontFamily="system-ui"
              >
                1 Gbps · 100 m
              </text>

              {/* Subtitle row 1 (description, BELOW row band — clear of the row 2 band start at y=140) */}
              {/* — keep as part of row band: no — row band ends at 126, row 2 starts at y=140. So description sits in safe zone 128-138 */}
              <text
                x="60"
                y="138"
                fill="#9CA3AF"
                fontSize="9.5"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Legacy minimum · cannot deliver 10GBASE-T at useful distance
              </text>

              {/* ============== ROW 2 — Cat 6 / Class E ============== y top = 150 */}
              <rect
                x="50"
                y="150"
                width="820"
                height="46"
                rx="6"
                fill="rgba(34,197,94,0.05)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="156"
                width="200"
                height="34"
                rx="5"
                fill="rgba(34,197,94,0.20)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="178"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 6
              </text>

              <line
                x1="260"
                y1="173"
                x2="300"
                y2="173"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              <rect
                x="300"
                y="156"
                width="200"
                height="34"
                rx="5"
                fill="rgba(34,197,94,0.20)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="178"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class E
              </text>

              <text
                x="610"
                y="178"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontFamily="system-ui"
              >
                250 MHz
              </text>
              <text
                x="790"
                y="178"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontFamily="system-ui"
              >
                1 G · 100 m / 10 G · 55 m
              </text>

              <text
                x="60"
                y="208"
                fill="#9CA3AF"
                fontSize="9.5"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Legacy upgrade path · 10G reach insufficient at full 100 m
              </text>

              {/* ============== ROW 3 — Cat 6A / Class EA ============== y top = 220 — HIGHLIGHTED */}
              <rect
                x="50"
                y="220"
                width="820"
                height="56"
                rx="6"
                fill="rgba(234,179,8,0.14)"
                stroke="#EAB308"
                strokeWidth="2"
              />
              <rect
                x="60"
                y="228"
                width="200"
                height="40"
                rx="5"
                fill="rgba(234,179,8,0.30)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="253"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 6A ★
              </text>

              <line
                x1="260"
                y1="248"
                x2="300"
                y2="248"
                stroke="#FDE68A"
                strokeWidth="1.6"
                strokeDasharray="4 3"
              />

              <rect
                x="300"
                y="228"
                width="200"
                height="40"
                rx="5"
                fill="rgba(234,179,8,0.30)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="400"
                y="253"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class EA ★
              </text>

              <text
                x="610"
                y="253"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                500 MHz
              </text>
              <text
                x="790"
                y="253"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                10 Gbps · 100 m
              </text>

              <text
                x="60"
                y="290"
                fill="#FDE68A"
                fontSize="9.5"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                ★ Modern UK commercial default · mature components · predictable PoE++ profile
              </text>

              {/* ============== ROW 4 — Cat 7 / Class F ============== y top = 302 */}
              <rect
                x="50"
                y="302"
                width="820"
                height="46"
                rx="6"
                fill="rgba(34,211,238,0.05)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="308"
                width="200"
                height="34"
                rx="5"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="330"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 7
              </text>

              <text
                x="280"
                y="330"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                ↛ no TIA
              </text>

              <rect
                x="300"
                y="308"
                width="200"
                height="34"
                rx="5"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="330"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class F
              </text>

              <text
                x="610"
                y="330"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontFamily="system-ui"
              >
                600 MHz
              </text>
              <text
                x="790"
                y="330"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontFamily="system-ui"
              >
                10 Gbps · 100 m
              </text>

              <text
                x="60"
                y="360"
                fill="#9CA3AF"
                fontSize="9.5"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Niche · ISO / EN only · screened TP · TIA never adopted Class F
              </text>

              {/* ============== ROW 5 — Cat 7A / Class FA ============== y top = 372 */}
              <rect
                x="50"
                y="372"
                width="820"
                height="46"
                rx="6"
                fill="rgba(34,211,238,0.05)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="378"
                width="200"
                height="34"
                rx="5"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="400"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 7A
              </text>

              <text
                x="280"
                y="400"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                ↛ no TIA
              </text>

              <rect
                x="300"
                y="378"
                width="200"
                height="34"
                rx="5"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="400"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class FA
              </text>

              <text
                x="610"
                y="400"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontFamily="system-ui"
              >
                1000 MHz
              </text>
              <text
                x="790"
                y="400"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontFamily="system-ui"
              >
                10 Gbps · 100 m
              </text>

              <text
                x="60"
                y="430"
                fill="#9CA3AF"
                fontSize="9.5"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Niche · specialist EMC / industrial · screened TP with EMC headroom
              </text>

              {/* ============== Tier divider ============== */}
              <line
                x1="50"
                y1="450"
                x2="870"
                y2="450"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
                strokeDasharray="6 3"
              />
              <text
                x="450"
                y="466"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                — 100 m channel above · ~30 m data-centre channel below —
              </text>

              {/* ============== ROW 6 — Cat 8.1 / Class I ============== y top = 478 */}
              <rect
                x="50"
                y="478"
                width="820"
                height="46"
                rx="6"
                fill="rgba(168,85,247,0.05)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="484"
                width="200"
                height="34"
                rx="5"
                fill="rgba(168,85,247,0.20)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="506"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 8.1
              </text>

              <line
                x1="260"
                y1="501"
                x2="300"
                y2="501"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              <rect
                x="300"
                y="484"
                width="200"
                height="34"
                rx="5"
                fill="rgba(168,85,247,0.20)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="506"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class I
              </text>

              <text
                x="610"
                y="506"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontFamily="system-ui"
              >
                2000 MHz
              </text>
              <text
                x="790"
                y="506"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontFamily="system-ui"
              >
                25 / 40 G · ~30 m
              </text>

              <text
                x="60"
                y="536"
                fill="#9CA3AF"
                fontSize="9.5"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Data-centre top-of-rack · RJ45 connectors · 2 connectors max
              </text>

              {/* ============== ROW 7 — Cat 8.2 / Class II ============== y top = 548 */}
              <rect
                x="50"
                y="548"
                width="820"
                height="46"
                rx="6"
                fill="rgba(168,85,247,0.05)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <rect
                x="60"
                y="554"
                width="200"
                height="34"
                rx="5"
                fill="rgba(168,85,247,0.24)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="576"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Cat 8.2
              </text>

              <line
                x1="260"
                y1="571"
                x2="300"
                y2="571"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              <rect
                x="300"
                y="554"
                width="200"
                height="34"
                rx="5"
                fill="rgba(168,85,247,0.24)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="576"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Class II
              </text>

              <text
                x="610"
                y="576"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontFamily="system-ui"
              >
                2000 MHz
              </text>
              <text
                x="790"
                y="576"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontFamily="system-ui"
              >
                25 / 40 G · ~30 m
              </text>

              <text
                x="60"
                y="606"
                fill="#9CA3AF"
                fontSize="9.5"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Data-centre top-of-rack · TERA / GG45 connectors · specialist
              </text>

              {/* ===== Legend panel ===== */}
              <rect
                x="30"
                y="624"
                width="840"
                height="84"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="50"
                y="648"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              <rect
                x="50"
                y="660"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.30)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text x="74" y="672" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                ★ Modern UK commercial default (Cat 6A / Class EA)
              </text>

              <line
                x1="460"
                y1="667"
                x2="486"
                y2="667"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <text x="494" y="672" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                TIA Category equivalent to ISO/EN Class
              </text>

              <text x="50" y="694" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                All Classes D-FA accepted under BS 7671 §716.521.101 · 750 mA / conductor cap
                (§716.523.2.101)
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 100 m channel rule across Classes</ContentEyebrow>

          <ConceptBlock
            title="The 90 m permanent link + 10 m cord = 100 m channel — fixed across Class D / E / EA / F / FA"
            plainEnglish="The base channel model — 90 m permanent link + 10 m combined cord allowance = 100 m total channel — applies identically across Class D, E, EA, F and FA. What changes between Classes is the FREQUENCY response (and therefore the data rate), not the geometry. Cat 5e at 100 MHz delivers 1 Gbps; Cat 6A at 500 MHz delivers 10 Gbps; both do so within the same 100 m channel envelope. Class I and II (Cat 8) break this pattern because their 2000 MHz / 25-40 Gbps target collapses the insertion-loss budget at 100 m."
            onSite="On a UK office fit-out, the 90 m permanent link is the first measurement of the survey — independent of whether you are specifying Cat 5e (rare, legacy) or Cat 6A (modern default). The number 90 m is the 'shall' regardless of Class. The cord allowance is the same 10 m. The channel total is the same 100 m. What the Class purchase decides is whether 10 Gbps will run on it — not how long it is."
          >
            <p>How the channel rule plays out per Class:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Class D (Cat 5e).</strong> 90 m permanent link, 10 m cords, 100 m channel.
                Carries 1 Gbps over the full 100 m. Cannot carry 10 Gbps at any useful distance.
              </li>
              <li>
                <strong>Class E (Cat 6).</strong> 90 m permanent link, 10 m cords, 100 m channel.
                Carries 1 Gbps to 100 m, 10 Gbps to 55 m only.
              </li>
              <li>
                <strong>Class EA (Cat 6A).</strong> 90 m permanent link, 10 m cords, 100 m channel.
                Carries 10 Gbps to the full 100 m. The modern UK default.
              </li>
              <li>
                <strong>Class F (Cat 7) / Class FA (Cat 7A).</strong> Same 90 m / 100 m geometry.
                Higher frequency response and screened-TP construction give EMC headroom but the
                channel envelope is unchanged.
              </li>
              <li>
                <strong>Class I (Cat 8.1) / Class II (Cat 8.2).</strong> Channel approximately 30 m,
                2 connectors max. Top-of-rack data-centre only. Outside the 100 m model.
              </li>
            </ul>
            <p>
              The corollary: a contractor cannot deliver a {`"`}Class EA install{`"`} on Cat 5e
              cable. The Class is bounded above by the Category. Buying Cat 5e and installing it
              perfectly produces Class D. Buying Cat 6A and installing it badly produces Class D (or
              worse) on Class-EA-capable components. Both ends matter.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.523.2.101 (Conductor current cap — verbatim)"
            clause={
              <>The load current (design current) in any conductor shall not exceed 750 mA.</>
            }
            meaning="This is the hard regulatory ceiling for PoE / ELV DC over balanced cabling, regardless of which Class or Category is installed. 750 mA per conductor — full stop. It is the §716 number you cite if anyone proposes a higher current loading on any Cat 5/6/6A/7/7A/8.1/8.2 cable. IEEE 802.3bt Type 4 PoE++ delivers 90 W at the PSE (71.3 W at the PD) using 4 pairs (8 conductors); the per-conductor current sits well within 750 mA at 50 V. But the regulation is the regulation — 750 mA per conductor is the line."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.526.101 (Connecting hardware — verbatim)"
            clause={
              <>
                The connecting hardware used for data cables used to distribute DC power shall
                comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA
                per contact. Where connected equipment may be separated under load the connecting
                hardware shall meet the requirements of the endurance test specified in BS EN
                60512-9-3 at the appropriate disconnection load. Also the anticipated number of
                separations in operation shall not exceed the value specified in the endurance test
                for the disconnection load.
              </>
            }
            meaning="The 750 mA cap applies at the connector as well as in the cable. RJ45 jacks rated for PoE++ Type 4 are designed for this — but legacy or non-PoE-rated connectors may not be, and in-service make-and-break under load (live-disconnect) is endurance-tested to BS EN 60512-9-3. On a PoE deployment the connecting hardware must be PoE-rated through and through; quietly cheaping out on the patch panel produces arcing, premature wear, and ultimately conductor damage."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Channel testing — pass/fail and the test instrument</ContentEyebrow>

          <ConceptBlock
            title="A Class certification is the test report — every link, every parameter, every Class margin"
            plainEnglish="A 'Class EA pass' is not a marketing claim — it is the output of a TIA-1152-A (or BS EN 50346) field test instrument certifying every parameter at every required frequency on every link. The contractor produces a test report — typically a multi-page printout per link — showing insertion loss, NEXT, PSNEXT, ACR-F, return loss, propagation delay, delay skew, DC resistance and resistance unbalance, all measured against the Class limits and showing pass margins."
            onSite="Before signing off an install, the contractor 100% tests every permanent link (and increasingly every channel) and hands the client a test report bundle. Modern tools (Fluke DSX, Viavi MTS, etc.) save in proprietary formats and export to PDF / CSV. The certification only stands if the instrument is at the right TIA-1152-A accuracy level, calibrated within date, and using current adapters for the Class being tested. A Class EA test on a Level III instrument is permissible; a Class FA test usually wants Level IV+; Class I/II often demands Level V."
          >
            <p>The parameters that go into a Class certification:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Insertion loss.</strong> How much the signal attenuates from one end to the
                other. Tightest at the highest frequency in the Class.
              </li>
              <li>
                <strong>NEXT (Near-End Crosstalk) and PSNEXT (Power Sum NEXT).</strong> How much
                signal leaks between pairs at the near end. PSNEXT sums the leakage from the other
                three pairs onto one — particularly important for 10GBASE-T.
              </li>
              <li>
                <strong>ACR-F (Attenuation-to-Crosstalk Ratio Far-end).</strong> Far-end equivalent
                of NEXT, normalised by attenuation.
              </li>
              <li>
                <strong>Return loss.</strong> How much signal reflects back due to impedance
                mismatches at terminations.
              </li>
              <li>
                <strong>Propagation delay and delay skew.</strong> Time taken for signal across the
                channel; difference in arrival time between pairs (skew matters for parallel 10G
                transmission).
              </li>
              <li>
                <strong>DC resistance and DC resistance unbalance.</strong> Unbalance specifically
                matters for PoE — uneven resistance between conductors of a pair concentrates
                current asymmetrically and overheats one conductor. TIA TSB-184-A and BS 7671 §716
                bracket this concern.
              </li>
            </ul>
            <p>
              The test instrument level required (TIA-1152-A) scales with the Class: Class D (Cat
              5e) — Level III at minimum; Class E (Cat 6) — Level III, IIIe preferred; Class EA (Cat
              6A) — Level III is permissible but Level IV / V gives more reliable certification at
              500 MHz; Class F / FA — Level IV / V; Class I / II — Level V is the sensible
              requirement at 2000 MHz.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why Class EA / Cat 6A is the modern UK commercial default"
            plainEnglish="Cat 6A / Class EA wins on the practical balance of cost, supply chain, install practice maturity, PoE++ thermal envelope, and 10 Gbps reach. Cat 6 is too short for full-coverage 10G; Cat 7 / 7A is over-engineered for office work and never appeared in TIA-568; Cat 8 is data-centre only. The 2026 default for a new UK office fit-out is Class EA, period."
            onSite="When a client asks 'should we go Cat 6A or Cat 7?' on a London office fit-out, the answer is Cat 6A nine times out of ten. Cat 7 / Class F adds cost (screened TP construction, specialist connectors), forces install practice changes (the screen has to be terminated correctly at every point), and produces marginal performance gain for the foreseeable services. The exception is industrial / EMC-critical / specialist work — broadcast facilities, hospital MRI suites, factory floors with VFD interference — where the screened-TP EMC headroom genuinely matters."
          >
            <p>Why Cat 6A / Class EA is the modern UK commercial default:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Service-headroom for the foreseeable life.</strong> 10GBASE-T at full 100 m
                channel covers desk-side data, IP voice, and high-density PoE++ APs / cameras /
                lighting through the 2030s.
              </li>
              <li>
                <strong>PoE++ thermal envelope is well understood.</strong> 23 AWG conductors
                (compared to Cat 5e{`'`}s 24 AWG) handle PoE++ Type 4 (90 W PSE) without bundle
                de-rating becoming a real-world constraint at sensible bundle sizes.
              </li>
              <li>
                <strong>Mature components and install practice.</strong> Every major manufacturer
                makes Cat 6A; every major contractor knows how to install it; every test instrument
                certifies Class EA.
              </li>
              <li>
                <strong>Predictable supply chain and cost.</strong> Pricing is stable; lead times
                are short; specifying Cat 6A is not a procurement event.
              </li>
              <li>
                <strong>Compatible with PoE-DC under §716.</strong> Listed verbatim in §716.521.101
                alongside every other modern Category. The 750 mA per-conductor cap is well within
                Cat 6A{`'`}s thermal envelope at typical bundle sizes.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Specifying Cat 6A and accepting a Class E test report"
            whatHappens={
              <>
                Contractor specifies Cat 6A. Components arrive correctly. Install is rushed — bundle
                sizes too tight, parallel runs to LV power for long stretches, rough strip-and-twist
                on the patch panel side. Test report comes back marked Class E pass on most links
                and sub-Class-E pass on a few. Project sign-off is given on {`"`}pass{`"`} without
                checking that the Class matches the spec. Six months later, 10GBASE-T deployment
                fails — the cabling delivered Class E performance from Cat 6A components and the
                active equipment auto-negotiates down or stays offline.
              </>
            }
            doInstead={
              <>
                Read the Class line on every test report. Cat 6A specified means Class EA certified
                — anything less is either rework or commercial discount. The test instrument must be
                at TIA-1152-A Level III minimum (Level IV/V preferred for Class EA at 500 MHz),
                calibrated within date, with adapters appropriate to the Class. Reject any test
                report without Class line, or with Class lower than specified — it is the commercial
                protection that makes the 10G service viable.
              </>
            }
          />

          <Scenario
            title="A 2010 building wants 10GBASE-T to every desk — what is the engineering reality?"
            situation={
              <>
                A facilities manager inherits a 2010 office building cabled to {`"`}Cat 5e
                throughout{`"`}. The new tenant needs 10GBASE-T to every desk for video editing
                workflows. The FM asks whether {`"`}network upgrade{`"`} can be done in software.
              </>
            }
            whatToDo={
              <>
                Pull a recent test report. If Class D / Cat 5e is confirmed, explain that the cable
                cannot deliver 10GBASE-T at any useful distance — its 100 MHz frequency response and
                1 Gbps insertion-loss budget were specified for 1000BASE-T. The fix is selective
                re-cabling to Cat 6A / Class EA on the affected runs, not a software setting.
                Estimate the cost: per-desk cabling rework, re-termination, channel testing to Class
                EA. Compare against fibre-to-the-desk if the density justifies it. The original 2010
                spec did its job; the requirement changed beyond what was foreseeable.
              </>
            }
            whyItMatters={
              <>
                Service-independence has limits. A spec that was reasonable in 2010 (Cat 5e for
                gigabit) cannot deliver 10GBASE-T at 100 m. That is a legitimate re-cable trigger
                and a clear example of where the Class-versus-Category distinction matters: there is
                no install practice that turns Cat 5e into a Class EA channel. The components are
                the upper bound. New components, then re-test.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Category = parts you bought (Cat 5e / 6 / 6A / 7 / 7A / 8.1 / 8.2). Class = installed channel performance (D / E / EA / F / FA / I / II). They map directly. Class is what the building has; Category is what the building bought.',
              'Class EA / Cat 6A — 500 MHz, 10 Gbps to 100 m — is the modern UK commercial default. Cat 5e / Class D is legacy minimum. Cat 7 / Class F is niche (no TIA equivalent). Cat 8 / Class I-II is data-centre top-of-rack only (~30 m channel).',
              'The 90 m permanent link + 10 m cord = 100 m channel rule is fixed across Class D / E / EA / F / FA. Class I and II break it (Cat 8 channel ≈ 30 m, 2 connectors max).',
              'BS 7671:2018+A4:2026 §716.521.101 verbatim accepts Cat 5, 6, 6A, 7, 7A, 8.1, 8.2 (or other BS EN 50173-1 cables) for PoE / ELV DC — but §716.523.2.101 caps current at 750 mA per conductor and §716.526.101 caps current at 750 mA per contact at the connector, regardless of Category.',
              'A Class certificate must come from a TIA-1152-A Level III/IV/V (or BS EN 50346 equivalent) instrument. A "Class D pass on Cat 6A components" is the textbook diagnostic for poor install practice — fix the install, do not change the spec.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6-section-1')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: TIA / ISO / EN Overview
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Building and Campus Standards
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule6Section2;
