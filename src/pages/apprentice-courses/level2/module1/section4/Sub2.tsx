/**
 * Level 2 · Module 1 · Section 4.2 — PPE for Electrical Work
 *
 * AC mapping:
 *   - Unit 201 LO3 AC 3.4 — identify appropriate PPE for electrical work tasks
 *
 * Cross-refs:
 *   - §4.1 (PPE fundamentals + hierarchy of control)
 *   - §1.2 (EAWR Reg 14 — live work justification)
 *   - §2.1 (electric shock thresholds — why glove ratings matter)
 *   - Forward to §4.3 (GS38 test instruments)
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

const TITLE = 'PPE for electrical work | Level 2 Module 1.4.2 | Elec-Mate';
const DESCRIPTION =
  'The specific PPE for electricians: insulated gloves (IEC 60903), arc-rated kit (BS EN 61482), insulated tools (BS EN 60900), eyes, head, feet — with the ratings and the standards that matter.';

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'glove-class-check',
    question: 'You’re working on a 230 V single-phase domestic CU. The tails could go live if the meter’s reconnected. Which IEC 60903 glove class is the minimum?',
    options: [
      'Class 00 — 500 V AC',
      'Class 0 — 1000 V AC',
      'Class 2 — 17 000 V AC',
      'Standard work gloves are fine',
    ],
    correctIndex: 1,
    explanation:
      'Class 0 = 1000 V AC max use voltage, comfortably above 230 V. Class 00 (500 V AC) would also exceed 230 V but Class 0 is the standard call for any LV work — it’s the de facto industry minimum for electricians. Class 2 is HV-only — overkill, and stiffer to work with.',
  },
  {
    id: 'insulated-tools-check',
    question: 'A screwdriver marked "VDE 1000V" with the BS EN 60900 logo — what does that mean?',
    options: [
      'Tested up to 10 000 V, safe for HV',
      'Tested at 10 000 V AC, certified for use up to 1000 V AC live working',
      'Just a brand name, no actual rating',
      'OK for pulling cable, not for live work',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 60900 tools are FACTORY-tested at 10 000 V AC and rated for live use up to 1000 V AC / 1500 V DC. The double triangle / "1000 V" mark is what to look for. Anything not BS EN 60900 marked is NOT live-rated, even if it has a plastic handle.',
  },
  {
    id: 'arc-flash-rating-check',
    question: 'Your RAMS calls for arc-rated kit at "8 cal/cm² minimum". What does that number actually mean?',
    options: [
      'How heavy the suit is',
      'The incident energy the fabric is tested to withstand without breaking open / igniting',
      'The thickness of the lining',
      'The maximum voltage you can work near',
    ],
    correctIndex: 1,
    explanation:
      "Arc Thermal Performance Value (ATPV) — measured in cal/cm². It’s the incident heat energy the fabric will resist before second-degree burn becomes likely on skin underneath. 8 cal/cm² is a common ‘Category 2’ specification for LV switchroom work; HV may need 25 or 40 cal/cm². The arc flash hazard analysis in the RAMS sets the number.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Which standard covers electrically insulated gloves?',
    options: [
      'BS EN 388 (cut resistance)',
      'IEC 60903 / BS EN 60903',
      'BS EN 397 (helmets)',
      'BS EN 166 (eye protection)',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 60903 (published in the UK as BS EN 60903) is the dedicated standard for insulating gloves. Six classes: 00, 0, 1, 2, 3, 4 — covering 500 V to 36 000 V AC. Anything else with "insulated" written on it but no IEC 60903 mark is NOT certified electrical PPE.',
  },
  {
    id: 2,
    question: 'IEC 60903 Class 0 gloves are rated for what maximum AC use voltage?',
    options: ['230 V', '500 V', '1000 V', '7500 V'],
    correctAnswer: 2,
    explanation:
      'Class 0 = 1000 V AC max use voltage (1500 V DC). Each glove is also tested at 5000 V AC during manufacture. Class 00 = 500 V AC, Class 1 = 7500 V AC, Class 2 = 17 000 V AC, Class 3 = 26 500 V AC, Class 4 = 36 000 V AC.',
  },
  {
    id: 3,
    question: 'How often must IEC 60903 insulating gloves be re-tested in service?',
    options: [
      'Annually',
      'Every 6 months (and inspected before EVERY use)',
      'Only when visibly damaged',
      'Once at start of life — the manufacturer test is enough',
    ],
    correctAnswer: 1,
    explanation:
      'Periodic dielectric test every 6 months is standard practice (per IEC 60903 + UK industry guidance). Plus a VISUAL + AIR-INFLATION check before each use — roll the cuff to trap air and look for leaks. Test date is marked on the cuff. Past it = bin it.',
  },
  {
    id: 4,
    question: 'A BS EN 60900 insulated screwdriver carries the "double triangle / 1000 V" mark. The maximum live-working voltage is:',
    options: [
      '500 V AC',
      '1000 V AC and 1500 V DC',
      '10 000 V AC',
      'Any voltage if you have insulating gloves on too',
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 60900: factory tested at 10 000 V AC, rated for live use at 1000 V AC / 1500 V DC. That covers all LV (up to 1000 V AC). For HV you’d need different kit entirely. Wearing gloves doesn’t extend the rating of the tool.",
  },
  {
    id: 5,
    question: 'What does "Category 2 / 8 cal/cm²" describe in arc-flash PPE?',
    options: [
      'The brand name of the suit',
      'The minimum incident energy rating of the fabric (ATPV ≥ 8 cal/cm²)',
      'The number of layers in the garment',
      'The CE certification level',
    ],
    correctAnswer: 1,
    explanation:
      "Arc Thermal Performance Value (ATPV) ≥ 8 cal/cm² means the fabric is tested to withstand 8 calories per square centimetre of incident heat energy without breaking open. NFPA 70E PPE Category 2 is a common LV switchroom specification. The actual number needed comes from an arc-flash hazard analysis on the specific kit.",
  },
  {
    id: 6,
    question: 'What is the minimum safety footwear standard for general electrical site work?',
    options: [
      'Trainers with steel toe',
      'EN ISO 20345 SB (basic safety footwear with toe protection)',
      'Wellington boots',
      'EN ISO 20347 (occupational footwear, no toe-cap)',
    ],
    correctAnswer: 1,
    explanation:
      'EN ISO 20345 is THE safety footwear standard. The lowest grade SB has a 200 J impact-resistant toe-cap. S1, S2, S3 add features (S3 = penetration-resistant midsole, water-resistant, antistatic). For dedicated electrical isolation work — see EN 50321-1 dielectric footwear — that’s a separate specialist standard for live work, NOT general site wear.',
  },
  {
    id: 7,
    question: 'Which eye protection standard applies to safety glasses on an electrician’s site?',
    options: [
      'BS 7671',
      'BS EN 166',
      'EN ISO 20345',
      'IEC 60903',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 166 is the eye protection standard. Look for "F" (low-energy impact, basic safety glasses) for general site, or higher impact ratings (B = medium, A = high) for grinding / power tool work. Also includes 2C-1.2 etc for UV / IR / glare from arc work.',
  },
  {
    id: 8,
    question: 'You inflate the cuff of your IEC 60903 glove and feel a slow hiss of escaping air on the back of the index finger. What do you do?',
    options: [
      'Patch it with electrical tape',
      'Use it for low-current work only',
      'Bin it and get a new pair — it’s failed the in-use check',
      'Wash it with soapy water and try again',
    ],
    correctAnswer: 2,
    explanation:
      'A leak = pinhole = the dielectric protection has failed. Tape doesn’t restore the rating. Even on "low" voltage 230 V, a pinhole can be the path that drives a fatal current through your hand. Out of service immediately. Report it. Get the dated replacement and the failure logged.',
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'Why are insulated gloves so expensive when standard work gloves are a fiver?',
    answer:
      "Because each pair has been factory-tested under high voltage to prove the rubber holds out a specific voltage with no breakdown. Class 0 gloves are tested at 5 000 V AC and certified for use to 1 000 V AC. They’re also re-tested every 6 months in service. You’re paying for the test record, not just the rubber. Cheap unmarked gloves haven’t had any of that done.",
  },
  {
    question: 'Do I wear insulated gloves on top of leather gloves, or instead?',
    answer:
      "On site you’ll often wear them WITH leather over-gloves — the leather protects the rubber from cuts and abrasion (rubber gloves are surprisingly easy to puncture). Some manufacturers sell matched sets. The dielectric rating sits in the rubber underneath; the leather is just there to keep the rubber alive longer. Never the other way round — leather alone is no electrical protection.",
  },
  {
    question: 'My screwdriver has a plastic handle — that means it’s insulated, right?',
    answer:
      "No. A plastic handle just means it’s comfortable to hold. ‘Insulated for live work’ means BS EN 60900 — factory tested at 10 000 V AC, rated for 1 000 V AC live use, marked with the double-triangle ‘1000 V’ symbol. If those marks aren’t on the tool, treat it as un-insulated. For any LV live work, you need the BS EN 60900 set.",
  },
  {
    question: "What’s the difference between an arc rating and a voltage rating?",
    answer:
      "Different hazards. Voltage rating (insulating gloves, BS EN 60900 tools) protects you against shock — current passing through your body. Arc rating (BS EN 61482 clothing, face shields) protects against the FLASH — radiated heat and pressure wave from an arc fault. You can need both at the same time: gloves to stop the shock, arc kit to stop the flash burning you. Each is rated separately.",
  },
  {
    question: 'Do I need a hard hat for normal domestic rewires?',
    answer:
      "Depends on the job. EN 397 helmets are needed where there’s a real risk of falling objects — construction sites, roof spaces, working under scaffold. For a settled domestic install with no overhead risk, your supervisor might issue a bump cap (EN 812) instead — lighter, just there to stop you cracking your head on a joist. The RAMS makes the call.",
  },
  {
    question: 'What about hi-vis on a domestic job — really?',
    answer:
      "Often not needed inside a house, but the moment you’re unloading the van on a road, walking on a building site, or near anything with moving plant — yes. EN ISO 20471 Class 1 (vest), Class 2 (mid), Class 3 (full sleeve) depending on the speed of nearby traffic. Class 3 is the norm on highways and construction. Pop it on the moment you leave the customer’s living room.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4 · Subsection 2"
            title="PPE for electrical work"
            description="The specific PPE for electricians. Ratings, standards, what they actually protect against — and the kit you should expect to be holding before you go anywhere near a live conductor."
            tone="emerald"
          />

          <TLDR
            points={[
              "Insulated gloves = IEC 60903 / BS EN 60903. Class 0 (1000 V AC) is the standard call for LV work. Visual + air-leak check EVERY use, dielectric re-test EVERY 6 months.",
              "Insulated hand tools = BS EN 60900. Factory-tested at 10 kV, rated for live use to 1000 V AC / 1500 V DC. Look for the double-triangle ‘1000 V’ mark.",
              "Arc-rated kit = BS EN 61482, measured in cal/cm². 8 cal/cm² is a common LV minimum — the actual number comes from an arc-flash hazard study in the RAMS.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "List the appropriate PPE for typical electrical tasks (cap-off, CU change, fault-finding, panel work) — AC 3.4.",
              "Identify and explain insulated glove classes under IEC 60903 (Class 00–4 voltage ratings).",
              "Identify BS EN 60900 insulated hand tools and explain the 1000 V AC live-working rating.",
              "Explain arc-flash PPE under BS EN 61482 — the cal/cm² rating and where it comes from.",
              "Specify eye, head, foot and hi-vis PPE to the right BS EN standard for the site.",
              "Carry out a pre-use visual + air-leak check on insulating gloves and recognise when to take them out of service.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The shock-protection layer</ContentEyebrow>

          <ConceptBlock
            title="Insulating gloves — IEC 60903 / BS EN 60903"
            plainEnglish="Rubber gloves engineered to stop current crossing into your hand. Each pair is voltage-tested in the factory and re-tested every six months in service. Cheap import knockoffs are NOT the same product."
            onSite="In your tool bag: a labelled pair of Class 0 gloves, leather over-gloves to stop them getting cut, and the test certificate or test-date stamp visible. Without all three, you can’t prove they’re fit for use."
          >
            <p>
              IEC 60903 is the international standard for live-working insulating gloves;
              BS EN 60903 is the UK adoption. It defines six classes by maximum AC use
              voltage:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class 00</strong> — max use 500 V AC (750 V DC). Light, dexterous.
                Sometimes used for ELV / control work.
              </li>
              <li>
                <strong>Class 0</strong> — max use 1000 V AC (1500 V DC). The standard electrician
                glove for LV (up to 1000 V AC) — covers all 230 V single-phase and 400 V
                three-phase work.
              </li>
              <li>
                <strong>Class 1</strong> — max use 7500 V AC. HV distribution.
              </li>
              <li>
                <strong>Class 2</strong> — max use 17 000 V AC.
              </li>
              <li>
                <strong>Class 3</strong> — max use 26 500 V AC.
              </li>
              <li>
                <strong>Class 4</strong> — max use 36 000 V AC. Heaviest, least dexterous.
              </li>
            </ul>
            <p>
              Each class also has a TYPE designation (Type A, B, C, H, R, Z) covering
              resistance to acid, oil, ozone, etc. Most general-purpose electrician gloves are
              Type R (acid + oil + ozone resistant) or Type Z (ozone-only).
            </p>
            <p>
              <strong>The glove markings to look for:</strong> the IEC 60903 reference, the
              class number, the type letter, max use voltage, manufacturer, batch number,
              date of manufacture, and the in-service test date. Anything missing = not
              certified electrical PPE.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Pre-use checks — every single time"
            onSite="30 seconds at the van. Take the gloves out, look them over, roll the cuff to inflate them like balloons, listen and feel for leaks, then put on the leather over-gloves. If anything’s off — bin them and get the spares."
          >
            <p>
              IEC 60903 + UK industry practice (notably ENA TS-29 for utilities) requires
              two routine checks:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection BEFORE EACH USE</strong> — look at the whole glove,
                inside and out. Cuts, abrasion, embedded debris, swelling, discolouration,
                hardening, sticky patches, ozone cracks. Any defect = out of service.
              </li>
              <li>
                <strong>Air-inflation test BEFORE EACH USE</strong> — roll the cuff towards
                the fingers to trap air inside, then squeeze gently. Listen for hissing.
                Watch for slow deflation. Hold near your cheek to feel any leak. A pinhole
                you can’t see by eye will show up here.
              </li>
              <li>
                <strong>Periodic dielectric re-test EVERY 6 MONTHS</strong> — done by an
                accredited test house. Each glove is filled with water and a high-voltage
                test applied between the inside and outside. Pass = next test date stamped
                on the cuff. Past test date = take out of service until re-tested.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="IEC 60903:2014 / BS EN 60903:2003+A2:2015 — Insulating Gloves (paraphrased)"
            clause="Class 0 gloves shall withstand a proof voltage test of 5 000 V AC and shall be marked with a maximum use voltage of 1 000 V AC. Periodic electrical retesting at intervals not exceeding six months is recommended for gloves in service."
            meaning={
              <>
                Each Class 0 glove is tested at <strong>five times</strong> its max use
                voltage in the factory — that’s the safety margin. The 6-month re-test isn’t
                optional best practice, it’s the recognised industry standard. If your gloves
                don’t have a current test date, they’re not certified for live work,
                regardless of how new they look.
              </>
            }
            cite="Verbatim wording paraphrased — see IEC 60903:2014 / BS EN 60903 for the full standard text; supported by Energy Networks Association TS-29."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Insulated tools</ContentEyebrow>

          <ConceptBlock
            title="BS EN 60900 — the only spec that means ‘insulated for live work’"
            plainEnglish="A plastic handle isn’t insulation. BS EN 60900 means the tool was tested at 10 000 V AC in the factory and certified safe for live work up to 1000 V AC."
            onSite="Look for the double-triangle ‘1000V’ mark stamped or printed on the handle. Some manufacturers also use the German ‘VDE 1000V’ mark — same thing. No mark, treat it as a wood-handled tool, not a live-rated one."
          >
            <p>
              BS EN 60900 covers the full set of common hand tools — screwdrivers, pliers,
              side cutters, wire strippers, spanners, nut drivers, knives. The tools are
              moulded with multi-layer insulation that completely covers the metal except for
              the working tip.
            </p>
            <p>
              <strong>The certification process:</strong> each tool is dunked in water (so
              only the tip is dry) and a 10 000 V AC voltage applied between the water and
              the tip for 1 to 3 seconds. No flashover, no leakage current above the
              specified limit = pass. The tool is then marked with the double-triangle and
              "1000 V" indicating the live-working rating.
            </p>
            <p>
              <strong>Pre-use checks:</strong> visual look-over for cracks, cuts, missing
              insulation, embedded metal swarf, signs of melting from previous arcing.
              Damaged insulation on a live-rated tool = bin it, not "wrap it in tape and
              hope". The integrity of the moulded layer is the whole protection.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60900:2018 — Hand tools for live working up to 1 000 V AC and 1 500 V DC (paraphrased)"
            clause="Tools intended for live working shall be subjected to a routine dielectric test at a voltage of 10 000 V AC for between 1 and 3 seconds. The leakage current shall not exceed the values specified in Table 4. Each tool shall be marked with the double-triangle insulation symbol and the maximum use voltage of 1 000 V AC and 1 500 V DC."
            meaning={
              <>
                Factory dielectric test at <strong>10 kV</strong> — the safety margin is 10×
                the in-service rating. The double-triangle symbol on the handle is the
                certificate. Without it, the tool is not certified for live work, no matter
                how chunky the plastic looks.
              </>
            }
            cite="Verbatim wording paraphrased — see BS EN 60900:2018 for the full standard text; HSE GS38 for site application."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The arc-flash layer</ContentEyebrow>

          <ConceptBlock
            title="Arc-rated clothing + face shields — BS EN 61482"
            plainEnglish="Insulated gloves stop the SHOCK. Arc-rated kit stops the FLASH — the radiated heat that can melt clothing into skin in milliseconds. You need both for serious LV switchroom work."
            onSite="On a board change at a 100 A TP&N panel with bolted bus connections, the RAMS will probably specify arc-rated coveralls, arc-rated face shield, balaclava, and the right cal/cm² rating. The number isn’t plucked out of thin air — it comes from an arc-flash incident energy calculation on that specific gear."
          >
            <p>
              An arc fault releases energy as light, heat and a pressure wave. Even at 230 V
              an arc can hit several thousand degrees C in milliseconds and ignite normal
              cotton or synthetic clothing — making the burn far worse than the original
              flash. Arc-rated PPE uses inherently flame-resistant fabrics (e.g. modacrylic /
              aramid blends) that won’t ignite or melt.
            </p>
            <p>The two main rating systems you’ll see:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 61482-2</strong> — the European standard for protective
                clothing against thermal hazards of an electric arc. Tests the fabric against
                an actual arc and gives a rating in cal/cm².
              </li>
              <li>
                <strong>NFPA 70E PPE Categories</strong> — US-derived but widely referenced
                in UK arc-flash assessments. Category 1 = ≥ 4 cal/cm², Cat 2 = ≥ 8 cal/cm²,
                Cat 3 = ≥ 25 cal/cm², Cat 4 = ≥ 40 cal/cm².
              </li>
            </ul>
            <p>
              The CORRECT cal/cm² rating for a given task comes from an{' '}
              <strong>arc-flash hazard analysis</strong> — looks at the available fault
              current, the device clearing time, and the working distance, and works out the
              incident energy you’d be exposed to. The rated kit must equal or exceed that
              energy.
            </p>
            <p>
              Domestic electricians rarely need full arc-flash kit; commercial / industrial /
              utility electricians routinely do. Either way, the rule is the same: never substitute
              cotton overalls or polyester hi-vis for arc-rated gear. Polyester MELTS onto
              skin in an arc flash — it’s WORSE than nothing.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61482-2:2020 — Live working — Protective clothing against the thermal hazards of an electric arc (paraphrased)"
            clause="Protective clothing shall be classified by either the box-test method (Class 1 = 4 kA, Class 2 = 7 kA) or the open-arc test method, which shall yield an Arc Thermal Performance Value (ATPV) or Energy Breakopen Threshold (EBT) value in cal/cm². The rating shall be permanently marked on each garment."
            meaning={
              <>
                Two test methods, two ways to rate the kit. The cal/cm² number is the one
                you’ll see on the tag. Match it (or exceed it) against the incident energy
                worked out for the job in the arc-flash assessment. Polyester / cotton high-
                vis vests are NOT arc-rated — wearing them OVER arc-rated kit can defeat the
                whole system.
              </>
            }
            cite="Verbatim wording paraphrased — see BS EN 61482-2:2020 for the full standard text; IEEE 1584 for incident energy calculation."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The general site PPE</ContentEyebrow>

          <ConceptBlock
            title="Eyes, head, feet, ears, visibility — the standards in one place">
            <p>
              The non-electrical PPE you’ll wear every day. Each has a specific BS EN
              standard — and the standard is what actually defines the protection level.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Eye protection — BS EN 166.</strong> Look for the field of impact
                rating: F = low energy, B = medium, A = high. For grinding / power saws use
                B or A as a minimum. For arc work add the BS EN 169 / 170 / 171 markings for
                UV/IR filtering.
              </li>
              <li>
                <strong>Head protection — BS EN 397 (industrial helmet).</strong> Tested for
                shock absorption, penetration resistance, flame and lateral deformation. Look
                for the date stamp on the inside — most manufacturers say replace 3-5 years
                from manufacture (or immediately after impact). For low-headroom work, EN 812
                bump caps are a lighter alternative — they protect against bumps, NOT
                falling objects.
              </li>
              <li>
                <strong>Safety footwear — EN ISO 20345.</strong> SB = basic 200 J toe-cap.
                S1 = adds antistatic + heel energy absorption. S1P = adds penetration-
                resistant midsole. S3 = adds water-resistance. Most electricians wear S3 boots —
                handles wet, screws-in-the-floor, drops. NB: dielectric (live-working)
                footwear is a separate spec — EN 50321-1 — not normal site boots.
              </li>
              <li>
                <strong>Hi-vis — EN ISO 20471.</strong> Class 1 = vest only (low traffic),
                Class 2 = vest + sleeves OR vest + trousers (mid), Class 3 = full sleeve
                jacket + trousers (high speed traffic / construction). UK construction sites
                are typically Class 2 minimum, highways Class 3.
              </li>
              <li>
                <strong>Hearing protection — BS EN 352.</strong> Plugs (352-2) or muffs
                (352-1). Rated by SNR (Single Number Rating) in dB attenuation. Drilling
                masonry can hit 100+ dB(A) — a 27 dB SNR plug brings it to a safe level
                under 80 dB(A). Required above 80 dB(A) under the Control of Noise at Work
                Regs 2005.
              </li>
              <li>
                <strong>Respiratory protection — BS EN 149 (FFP masks).</strong> FFP1 =
                low-toxicity dust, FFP2 = standard electrician use (drill dust, plaster), FFP3 =
                high-protection (asbestos-suspect, lead). Single-use; replace when breathing
                resistance increases. Tight-fit RPE needs face-fit testing — beards defeat
                the seal.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating cheap import gloves as 1000 V rated because the box says so"
            whatHappens={
              <>
                Apprentice grabs a £6 pair of "insulated gloves — 1000V" off a market stall
                because the company-issue ones are out for re-test. Markings look right at a
                glance. He uses them on a CU change. The rubber compound is sub-spec, ageing
                badly, with no real dielectric test history. A pinhole is invisible to the
                eye. Across his palm at 230 V is enough current to fibrillate.
              </>
            }
            doInstead={
              <>
                If the proper gloves are out for test, the proper answer is{' '}
                <strong>postpone the live work</strong>, not improvise. Hire / borrow a
                certified spare set with current test date. PPER 2022 puts the duty on the
                EMPLOYER to keep certified PPE available — if they’ve let it run out, that’s
                their problem to solve, not yours to bodge around. Don’t go anywhere near
                live with anything you can’t prove the test history of.
              </>
            }
          />

          <CommonMistake
            title="Skipping the prove-test-prove because ‘the breaker is off’"
            whatHappens={
              <>
                You’re changing a socket on what should be a dead circuit. The breaker’s
                been thrown. You don’t bother proving dead with a voltage indicator because
                "I just turned it off, I know it’s off". Halfway through removing the
                terminals, your screwdriver bridges line-to-CPC and you find out it was the
                wrong breaker. (This happens. A lot.) PPE alone wouldn’t have saved you;
                proving dead would have.
              </>
            }
            doInstead={
              <>
                Always: <strong>prove the tester on a known live source → test the circuit
                → prove the tester again on the known live source</strong>. That’s the GS38
                three-step ‘prove-test-prove’ procedure (covered in §4.3). Insulated PPE is
                the BACKSTOP for the moment something unexpected goes live — it’s NOT the
                substitute for confirming dead state in the first place.
              </>
            }
          />

          <Scenario
            title="The CU change with two phases of risk"
            situation={
              <>
                You and your supervisor turn up to swap an old wylex CU for a new dual-RCD
                board. The DNO meter is energised; tails go into the existing CU. You agree
                to (a) call the DNO for cut-out fuse pull, but they can’t come till next
                week, OR (b) work it live on the cut-out side — pull tails after declaring
                meter dead. RAMS specifies: Class 0 IEC 60903 gloves + leather over-gloves,
                BS EN 60900 insulated tools, BS EN 166 F-rated glasses, BS EN 61482 Cat 2
                arc-rated long-sleeve top + face shield (8 cal/cm²), helmet not required
                (no overhead risk).
              </>
            }
            whatToDo={
              <>
                Run the pre-use checks BEFORE you put a hand on anything. Visual + air-leak
                on the gloves, check the test date is current, look over each insulated tool
                for damaged insulation. Don the arc kit BEFORE the gloves go on (you can’t
                pull a tight sleeve over rubber gloves). Face shield down before the cover
                comes off the cut-out. One-handed working from there in (covered in §2.1).
                Confirm dead state on tails with a GS38-compliant voltage indicator (§4.3).
                THEN crack on.
              </>
            }
            whyItMatters={
              <>
                That’s a typical real-world LV live work job. Every layer of PPE is doing a
                specific job — the gloves stop a hand-to-hand shock if you brush a tail, the
                arc kit catches the radiated heat if you accidentally short tails to the
                meter case, the glasses catch the fragments if a fuse explodes, the
                insulated tools mean the screwdriver doesn’t become the conductor. Pull any
                one of those out and you’ve broken the system. PPER + EAWR + GS38 +
                BS 7671 — they all line up to land you here.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The kit list, pulled together</ContentEyebrow>

          <ConceptBlock title="What ‘fully kitted’ looks like for an LV electrician">
            <p>
              For most apprentice work this is what your supervisor should be issuing you with —
              and what you should expect to see in your tool bag, dated, marked, and ready:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EN ISO 20345 S3 safety boots (200 J toe-cap, midsole, water-resistant)</li>
              <li>EN ISO 20471 Class 2 hi-vis</li>
              <li>EN 397 helmet OR EN 812 bump cap (per RAMS)</li>
              <li>BS EN 166 F-rated safety glasses (in pocket / on head)</li>
              <li>
                IEC 60903 Class 0 insulating gloves + leather over-gloves (with current test
                date)
              </li>
              <li>BS EN 60900 insulated screwdrivers, side cutters, pliers, wire strippers</li>
              <li>BS EN 61482 arc-rated kit (when RAMS calls for it)</li>
              <li>BS EN 352 hearing protection (drilling / breaking)</li>
              <li>BS EN 149 FFP2 dust masks (drilling, chasing, lifting boards)</li>
            </ul>
            <p>
              Plus a GS38-compliant voltage indicator and proving unit for confirming dead
              — covered in detail next.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "IEC 60903 / BS EN 60903 = the only spec that means ‘insulating glove’. Class 0 (1000 V AC) is the LV standard. Visual + air-leak before EVERY use; dielectric re-test every 6 months.",
              "BS EN 60900 = the only spec that means ‘insulated tool for live work’. Factory tested at 10 kV, rated 1000 V AC live use. Look for the double-triangle ‘1000 V’ mark.",
              "BS EN 61482 = arc-flash protective clothing rating in cal/cm². 8 cal/cm² is a typical LV minimum; the actual number comes from an arc-flash hazard study.",
              "Gloves stop SHOCK; arc kit stops FLASH; insulated tools stop the SCREWDRIVER becoming the conductor. Different hazards, different PPE.",
              "EN ISO 20345 SB minimum for footwear (S3 typical for electricians); EN 397 helmets; BS EN 166 eye protection; EN ISO 20471 Class 2 hi-vis as a baseline.",
              "Cheap unmarked imports are NOT certified PPE. No CE/UKCA + standard reference + class + test date = hard refuse, every time.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="PPE for electrical work knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                The purpose of PPE
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                GS38 — test instruments + leads
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
