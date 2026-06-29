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
    id: 'datacabling-m2s5-bend-radius',
    question:
      'You\u2019re pulling a 100 m run of Cat6A (outer diameter ~7.4 mm) through a tight ceiling void. What bend radii does BS EN 50174-2 require during the install vs in service?',
    options: [
      'No minimum bend-radius limit applies to balanced twisted-pair data cable.',
      '4× OD during the pull, 8× OD in service — about 30 mm / 60 mm on 7.4 mm Cat6A.',
      'A flat 50 mm minimum radius regardless of the cable outer diameter.',
      'Sharp 90-degree bends are acceptable on data cable at every install stage.',
    ],
    correctIndex: 1,
    explanation:
      "BS EN 50174-2 (and ANSI/TIA-568.2-E) specify minimum bend radii relative to cable outer diameter (OD): typically 4\u00d7 OD during installation (when actively pulling, the cable is under tension and tighter bends are physically possible) and 8\u00d7 OD when the cable will sit in long-term service under any compressive or tensile stress. For a 7.4 mm Cat6A that's ~30 mm install / ~60 mm service. Cat7 / Cat7A constructions (heavier with overall braid) typically need slightly larger radii. Tight bends deform the pair geometry, asymmetrically stress the conductors of each pair, raise return loss and NEXT, and erode Class EA margin \u2014 typically visible at the top test frequency first.",
  },
  {
    id: 'datacabling-m2s5-pulling-tension',
    question:
      'A spec calls for 110 N maximum pulling tension on a 4-pair Cat6A run. What does that number mean and what happens if you exceed it?',
    options: [
      'The recommended maximum weight of equipment the installed cable can support.',
      'The ~110 N (\u224811 kgf) maximum pulling tension \u2014 exceed it and conductors elongate.',
      'The maximum continuous operating temperature rating of the cable jacket.',
      'A reference figure that has no effect on transmission performance at all.',
    ],
    correctIndex: 1,
    explanation:
      'The 110 N pulling tension limit (TIA-568.2-E / BS EN 50174-2 for 4-pair UTP) corresponds to about 11 kgf or 25 lbf \u2014 noticeable but not extreme. Exceeded, the pulling force permanently elongates the copper conductors, deforms the twist geometry of the pairs, and (in tight pulls round corners or through steel) can crack or peel the jacket. The damage is permanent and the cable can never be re-tested to deliver Class EA. Practical defence: breakaway swivel attached to the pull cord (releases above the limit), pull from the box not from a free reel, lubricate at sharp bends, never pull through 90\u00b0 corners directly \u2014 always lay in a slow curve.',
  },
  {
    id: 'datacabling-m2s5-fire-collapse',
    question:
      'Which BS 7671:2018+A4:2026 clause requires that wiring systems be supported so they will not collapse prematurely in a fire \u2014 including data cabling?',
    options: [
      '\u00a7521.10.1 \u2014 non-sheathed cables enclosed in conduit, ducting or trunking systems.',
      '\u00a7521.10.202 \u2014 support against premature collapse in fire; ties not the sole support.',
      '\u00a7444.5.3 \u2014 bonding of metallic screens, cable sheaths and metallic containment.',
      '\u00a7716.521 \u2014 the permitted cable Category list for in-scope PoE applications.',
    ],
    correctIndex: 1,
    explanation:
      'The fire-collapse clause is \u00a7521.10.202 (NOT \u00a7521.10.1, which is about non-sheathed cables in conduit). Verbatim: "Wiring systems shall be supported such that they will not be liable to premature collapse in the event of a fire." NOTE 3: "This regulation precludes, for example, the use of non-metallic cable clips or cable ties as the sole means of support where cables are clipped direct to exposed surfaces or suspended under cable tray, and the use of non-metallic cable trunking as the sole means of support of the cables therein." NOTE 4: "Suitably spaced steel or copper clips, saddles or ties are examples that will meet the requirements of this regulation." Applies to data cabling as much as to LV power cabling. Steel cable basket / tray (NOTE 2) automatically meets the requirement.',
  },
  {
    id: 'datacabling-m2s5-segregation',
    question:
      'You have to share a containment route with LV power. What does BS 7671 Annex A444 Table A444.1 say about minimum separation against containment type?',
    options: [
      'No minimum separation is set \u2014 it is left entirely to the designer to judge.',
      'Open A: 200 mm; perforated B: 150 mm; solid C: none beyond the containment itself.',
      'A flat 500 mm separation in every containment arrangement and voltage band.',
      'A flat 50 mm separation regardless of the containment type or disturbing voltage.',
    ],
    correctIndex: 1,
    explanation:
      'Annex A444 Table A444.1 (verbatim numbers): No containment / open metallic containment A = 200 mm minimum separation. Perforated open metallic containment B (steel tray, \u2264 20 % perforation, 1.0 mm wall) = 150 mm. Solid metallic containment C (fully-enclosed steel, 1.5 mm minimum wall) = NOTE 4: "no physical separation other than that provided by the containment". \u00a7444.5.3.1 then mandates the containment be bonded to the equipotential bonding network. Combined, this gives the design choice: separate by distance, separate by containment, or do both. \u00a7444.6.2 adds a 130 mm minimum between ICT cables and HID lamps.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS EN standard governs install practices for cabling inside buildings, and which BS 7671 clause references it?',
    options: [
      'BS EN 50173-1, the cabling design standard, referenced by \u00a7716.521.101.',
      'BS 7671 \u00a7521.10.202, the wiring-system fire-collapse cable support rule.',
      'BS EN 60825-2, the optical-fibre communication laser-safety standard.',
      'BS EN 50174-2, install planning inside buildings, referenced by \u00a7444.410(b).',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 50174-2:2018+A2:2024 is the install-practice standard. \u00a7444.410(b) of BS 7671:2018+A4:2026 references it verbatim: "BS EN 50174-2: Information technology \u2014 Cabling installation: Installation planning and practices inside buildings". This is the standard that defines bend radii, pulling tensions, support intervals, cable-management, identification, and the practical install rules that determine whether a Class EA channel is delivered or not. Pair it with BS EN 50174-1 (specification & QA) and BS EN 50310 (bonding networks) for the full install framework.',
  },
  {
    id: 2,
    question: 'What are the install-time and in-service bend radii for typical 4-pair Cat6A cable?',
    options: [
      '2\u00d7 cable OD during installation and 4\u00d7 OD in long-term static service.',
      '0.5\u00d7 cable OD at all times, install and long-term service alike.',
      'Typically 4\u00d7 OD during the active pull and 8\u00d7 OD in static service.',
      'No minimum bend-radius limit applies to balanced twisted-pair data cable.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 50174-2 / TIA-568.2-E specify minimum bend radii relative to cable OD: typically 4\u00d7 OD during install (where the cable is under active pull tension) and 8\u00d7 OD long-term in service. The two-radius rule recognises that during a controlled pull a tighter bend is acceptable; in long-term static service the cable cannot be allowed to sit in a tight bend without permanent geometric stress on the pairs. For Cat7 / Cat7A constructions (overall braid + per-pair foils) the radii are typically slightly larger \u2014 always check the manufacturer datasheet for the specific cable.',
  },
  {
    id: 3,
    question: 'Why does pulling tension matter for Cat6A and what is the typical limit?',
    options: [
      'A typical 110 N (\u224811 kgf) cap for 4-pair UTP \u2014 exceed it and the twist deforms.',
      'It does not matter at all \u2014 pull the 4-pair cable as hard as you physically can.',
      'Any pulling tension up to about 500 N is perfectly safe for 4-pair UTP cable.',
      'Pulling tension is simply another name for the cable minimum bend radius.',
    ],
    correctAnswer: 0,
    explanation:
      'The 110 N (\u224811 kgf / 25 lbf) typical maximum pulling tension for 4-pair UTP / Cat6A from TIA-568.2-E and BS EN 50174-2 is the threshold above which cable damage becomes likely \u2014 conductor elongation, deformed twist, cracked dielectric, peeled jacket. Damage is permanent and unrecoverable; the cable simply cannot be tested to deliver Class EA after over-tension. Practical defences: breakaway swivel calibrated below the limit, pull from the cable box (the cable feeds smoothly from the centre) rather than from a free-spinning reel, lubricate at any 90\u00b0 corner, route in slow curves, never pull through tight bends in a single direct stroke.',
  },
  {
    id: 4,
    question:
      'Which BS 7671 clause is the fire-collapse rule for wiring systems \u2014 including data cabling \u2014 and what does it prohibit?',
    options: [
      '\u00a7521.10.1, covering non-sheathed cables enclosed in conduit, ducting or trunking.',
      '\u00a7444.5.3.1, covering bonding of metallic screens, sheaths and metallic containment.',
      '\u00a7716.526.101, covering the connecting-hardware current rating on PoE cabling.',
      '\u00a7521.10.202 \u2014 support against premature collapse in fire; ties not the sole support.',
    ],
    correctAnswer: 3,
    explanation:
      '\u00a7521.10.202 (verbatim, including NOTES) is the fire-collapse rule \u2014 NOT \u00a7521.10.1 which is about non-sheathed cables in conduit / trunking. Cables hanging across access / egress routes can hinder evacuation and firefighting (NOTE 1). The intent is to prevent general collapse of wiring (including data cabling) in fire \u2014 cables hanging down from melted plastic ties block escape routes and trip emergency services. NOTE 4: "Suitably spaced steel or copper clips, saddles or ties are examples that will meet the requirements of this regulation." NOTE 2: "Cables installed in or on steel cable containment systems are deemed to meet the requirements of this regulation." The clause applies to data cabling as much as to LV power.',
  },
  {
    id: 5,
    question:
      'When sharing a containment route with LV power, what does BS 7671 Annex A444 Table A444.1 require?',
    options: [
      'A flat 1 m separation regardless of the containment type or disturbing voltage.',
      'A flat 50 mm separation in every containment arrangement and voltage band.',
      'Open A: 200 mm; perforated B: 150 mm; solid C: none beyond the containment itself.',
      'No separation is needed in any containment arrangement at any LV voltage.',
    ],
    correctAnswer: 2,
    explanation:
      'Verbatim: open / open metallic containment A = 200 mm; perforated open metallic containment B = 150 mm; solid metallic containment C = no physical separation needed beyond the containment itself (NOTE 4). Table A444.2 then scales the base separations with disturbing voltage / current \u2014 240 V \u2192 0.45 m, 415 V \u2192 0.58 m, 3.3 kV \u2192 1 m; 5 A \u2192 0.24 m, 50 A \u2192 0.5 m, 300 A \u2192 0.85 m. \u00a7444.6.2 separately requires 130 mm minimum from HID lamps. \u00a7444.5.3.1 mandates that any metallic containment is bonded to the equipotential bonding network for any of these allowances to apply.',
  },
  {
    id: 6,
    question:
      'A 96-cable Type 4 PoE++ bundle is going up a ceiling tray. What planning / installation references should you follow?',
    options: [
      'BS EN 50174-2, TIA TSB-184-A, PD CLC/TR 50174-99-1 and BS ISO/IEC 14763-2 together.',
      'No published standard applies to PoE cable-bundle thermal install planning.',
      'Only the cable manufacturer\u2019s commercial sales sheet for the chosen Cat6A product.',
      'BS EN 60825-2, the optical-fibre communication-system laser-safety standard.',
    ],
    correctAnswer: 0,
    explanation:
      'The bundle planning framework for sustained high-current PoE: BS EN 50174-2 (general install practice); TIA TSB-184-A (2017, PoE-specific bundle de-rating curves); PD CLC/TR 50174-99-1:2015 (multi-cable bundle thermal model \u2014 referenced from \u00a7716.523.1.101 NOTE 2); BS ISO/IEC 14763-2 (cabling planning and operation); ISO/IEC TS 29125 (telecommunications cabling requirements for remote powering). Combined, they let the designer estimate bundle centre temperature rise, bundle de-rating, and maximum compliant bundle size for a given PoE load. The hard regulatory ceiling \u2014 \u00a7716.523.2.101 = 750 mA per conductor \u2014 still applies regardless.',
  },
  {
    id: 7,
    question:
      'How tight should you pull a cable tie around a Cat6A cable, and how often should ties be spaced?',
    options: [
      'As tight as the tool allows, with a single-use tie placed every 10 mm along the run.',
      'To a fixed 50 N tension, with ties spaced at exactly 5 mm intervals throughout the run.',
      'Cable ties are forbidden entirely on twisted-pair data cabling under all conditions.',
      'Loose enough to rotate freely round the bundle, spaced ~200\u2013300 mm \u2014 hook-and-loop best.',
    ],
    correctAnswer: 3,
    explanation:
      "The professional rule of thumb is: cable ties should be loose enough to rotate freely around the bundle (TIA-568.2-E, BS EN 50174-2). Crushing pressure from tight ties locally deforms the cable geometry and raises NEXT / return loss \u2014 a workmanship issue invisible at first-fit but visible on the field tester. Hook-and-loop ties are strongly preferred because they're impossible to over-tension. Plastic single-use ties used by trained installers, with the tail trimmed flush, are acceptable \u2014 but they should never be the sole means of fire-collapse support (NOTE 3 of \u00a7521.10.202). Tie spacing: tight enough that the cable doesn't sag (bend radius would be violated under self-weight); loose enough not to look militarised. 200\u2013300 mm on tray is typical.",
  },
  {
    id: 8,
    question:
      'On a sustained Type 4 PoE++ bundle, why does BS 7671 \u00a7716.523.1.101 NOTE 2 reference PD CLC/TR 50174-99-1?',
    options: [
      'It is an unrelated reference included in the NOTE only for completeness.',
      'It covers optical-fibre laser-safety classification rather than copper cabling.',
      'It gives the multi-cable bundle thermal model \u2014 how centre temperature rises.',
      'It deals with protective earthing and equipotential bonding network arrangements.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 \u00a7716.523.1.101 NOTE 2 (verbatim): "Guidance on the effect of the number of loaded conductors, in a multi-cable bundle, on the temperature rise of the cables is given in PD CLC/TR 50174-99-1:2015 and requirements and recommendations in relation to planning and installation of such cable bundles are provided in BS ISO/IEC 14763-2 and ISO/IEC TS 29125." Combined with NOTE 1 (temperature rise raises insertion loss and degrades channel performance) and \u00a7716.523.2.101 (= 750 mA per conductor hard cap), this is the regulatory framework for sustained-PoE bundle design. TIA TSB-184-A is the parallel North American reference.',
  },
  {
    id: 9,
    question:
      'A bundle of Cat6A is sharing a perforated steel tray with a 415 V three-phase submains. What separation does BS 7671 Annex A444 Table A444.2 require?',
    options: [
      'About 0.58 m at 415 V (Table A444.2) \u2014 take the larger of this and the containment value.',
      'A flat 50 mm is sufficient at any LV submains voltage on shared perforated tray.',
      'Zero separation \u2014 Cat6A and the 415 V submains can share the tray freely together.',
      'A full 5 m clearance is required between the two cable groups on shared tray.',
    ],
    correctAnswer: 0,
    explanation:
      'Table A444.2 voltage-scaled minimum at 415 V = 0.58 m. Table A444.1 perforated open metallic containment B = 150 mm minimum. Take the LARGER of the two \u2014 0.58 m \u2014 as the design separation. Table A444.2 also gives current-scaled values: 50 A \u2192 0.5 m, 100 A \u2192 0.6 m, 300 A \u2192 0.85 m. The designer takes the largest of all applicable rules. \u00a7444.5.3.1 still mandates the containment be bonded. \u00a7444.6.2 still requires 130 mm from HID lamps. The discipline is to apply EVERY relevant separation rule and use the largest.',
  },
  {
    id: 10,
    question:
      'Why is documentation \u2014 labelling, as-built drawings, test reports \u2014 listed in BS EN 50174-1 as a delivered work item?',
    options: [
      'Purely for cosmetic rosette and faceplate decoration at each work-area outlet.',
      'Solely to satisfy the cabling contractor\u2019s tax and accounting record obligations.',
      'It is not actually listed as a documented deliverable anywhere in the standard.',
      'Because the cabling outlives several generations of kit \u2014 records let the next team extend it.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 50174-1 (Information technology \u2014 Cabling installation: Installation specification and quality assurance) and the parallel ANSI/TIA-606-D (2021) specify a labelling and administration discipline as part of the deliverable. Every link uniquely identified, every port labelled, every channel test result retained, every as-built drawing kept current. The record discipline is what lets the cabling system survive personnel changes, tenant churns and routine moves/adds/changes for its 15-20 year life. A cabling system without records is a one-shot install that can\u2019t be safely modified \u2014 every fault is a forensic exercise and every move/add/change is a new pull.',
  },
];

const faqs = [
  {
    question:
      'Which standard actually governs install practice for data cabling inside UK buildings?',
    answer: (
      <>
        <strong>BS EN 50174-2:2018+A2:2024</strong> — Information technology — Cabling installation:
        Installation planning and practices inside buildings. Referenced verbatim in BS
        7671:2018+A4:2026 §444.410(b). It defines the install-practice rules — bend radii, pulling
        tensions, supports, separation from power, cable management, identification — that protect
        the Class certification at handover. Pair it with <strong>BS EN 50174-1</strong>{' '}
        (specification &amp; QA) and <strong>BS EN 50310</strong> (bonding networks for ICT) for the
        full install framework. The North American parallel is ANSI/TIA-569-E + Addendum 1 (2022)
        for spaces and ANSI/TIA-568.2-E (2024) for balanced cabling install practice.
      </>
    ),
  },
  {
    question: 'How do I remember the bend radii?',
    answer: (
      <>
        Two numbers per cable type. <strong>Install / pulling: 4× cable OD.</strong> The cable is
        actively under tension; tighter bends are physically tolerated for the duration of the pull.{' '}
        <strong>Service / static: 8× cable OD.</strong> Long-term, the cable cannot sit in a bend
        tighter than this without permanent geometric stress on the pairs. For a typical Cat6A at ~7
        mm OD that&apos;s ~30 mm during install / ~60 mm in service. Bigger / heavier cables (Cat7 /
        Cat7A with overall braid) need larger radii — always check the manufacturer datasheet. The
        cheap rule of thumb if you&apos;ve forgotten the number: bigger than your fist for Cat6A.
      </>
    ),
  },
  {
    question:
      'Why is BS 7671 §521.10.202 (and not §521.10.1) the right citation for cable supports in fire?',
    answer: (
      <>
        §521.10.<strong>1</strong> is about non-sheathed cables enclosed in conduit, ducting or
        trunking — a specific construction-protection rule. §521.10.<strong>202</strong> is the
        fire-collapse rule, verbatim:{' '}
        <em>
          &quot;Wiring systems shall be supported such that they will not be liable to premature
          collapse in the event of a fire.&quot;
        </em>{' '}
        NOTE 3: non-metallic cable clips / cable ties / non-metallic trunking are precluded as the
        SOLE means of support where cables are clipped direct or suspended under tray. NOTE 4:
        suitably-spaced steel or copper clips, saddles or ties meet the requirement. NOTE 2: cables
        in steel containment are deemed to meet the requirement. Applies to data cabling as much as
        to LV power.
      </>
    ),
  },
  {
    question: 'How do I work out the separation from LV power?',
    answer: (
      <>
        Apply every relevant rule and use the largest. <strong>Annex A444 Table A444.1</strong>{' '}
        scales separation with containment type: open / no containment 200 mm; perforated open
        metallic containment 150 mm; fully-enclosed solid metallic containment — no separation
        needed beyond the containment itself. <strong>Annex A444 Table A444.2</strong> scales with
        disturbing voltage / current: 240 V → 0.45 m, 415 V → 0.58 m, 3.3 kV → 1 m; 5 A → 0.24 m, 50
        A → 0.5 m, 300 A → 0.85 m. <strong>§444.6.2</strong> separately requires 130 mm minimum
        between ICT cables and HID lamps. <strong>§444.5.3.1</strong> requires the containment be
        bonded to the equipotential bonding network. Take the largest of every applicable
        separation; bond the containment; document the calculation in the design.
      </>
    ),
  },
  {
    question: 'What does BS 7671 §716.523.1.101 say about PoE cable bundles?',
    answer: (
      <>
        §716.523.1.101 (verbatim):{' '}
        <em>
          &quot;The design current in any conductor shall not exceed the limit specified in BS EN
          50173-1.&quot;
        </em>{' '}
        NOTE 1:{' '}
        <em>
          &quot;Any temperature rise of the data cables due to the load current they carry, or other
          causes, will increase the attenuation/insertion loss of the cables. Thus the performance
          of information transmission channels can be degraded.&quot;
        </em>{' '}
        NOTE 2:
        <em>
          {' '}
          &quot;Guidance on the effect of the number of loaded conductors, in a multi-cable bundle,
          on the temperature rise of the cables is given in PD CLC/TR 50174-99-1:2015 and
          requirements and recommendations in relation to planning and installation of such cable
          bundles are provided in BS ISO/IEC 14763-2 and ISO/IEC TS 29125.&quot;
        </em>{' '}
        Read with the §716.523.2.101 hard cap (= 750 mA per conductor) it bounds every PoE bundle
        design from 15 April 2026.
      </>
    ),
  },
  {
    question: 'How do I tie cables without crushing them?',
    answer: (
      <>
        The professional rule of thumb (BS EN 50174-2 / TIA-568.2-E): cable ties should be loose
        enough to rotate freely around the bundle. Crushing pressure locally distorts the
        cable&apos;s geometry and erodes balance — NEXT and return loss go off-spec at the crush
        point. <strong>Hook-and-loop straps</strong> (Velcro-style) are strongly preferred because
        they&apos;re impossible to over-tension. Plastic single-use ties work if applied by trained
        installers — never tighten with pliers, always trim flush, and use them at sensible spacing
        (typically 200-300 mm on tray, looser through ceiling void). And remember §521.10.202 NOTE
        3: plastic ties cannot be the sole means of support.
      </>
    ),
  },
];

const DataCablingModule2Section5 = () => {
  const navigate = useNavigate();

  useSEO(
    'Installation Methods and Best Practices | Data Cabling Module 2.5 | Elec-Mate',
    'BS EN 50174-2 install practice for balanced cabling — bend radii (4× OD install / 8× OD service), pulling tensions (~110 N for 4-pair UTP), supports per BS 7671 §521.10.202, separation from LV power per Annex A444, cable management, and labelling per BS EN 50174-1.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5"
            title="Installation Methods and Best Practices"
            description="The install-practice layer that protects Class certification — BS EN 50174-2 bend radii (4× OD install / 8× OD service), pulling tensions (~110 N for 4-pair UTP), supports per BS 7671 §521.10.202 (steel clips / saddles / cable basket), Band I / II separation per Annex A444, sensible cable management, and the BS EN 50174-1 / TIA-606-D labelling and as-built discipline."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 50174-2 is the install-practice standard, referenced by BS 7671:2018+A4:2026 §444.410(b). It defines bend radii (typically 4× OD install / 8× OD service), pulling tensions (~110 N for 4-pair UTP), supports, separation from LV power, cable management and identification — the rules that protect the Class EA certification.',
              'BS 7671 §521.10.202 is the fire-collapse rule (NOT §521.10.1). Wiring systems shall be supported so they will not collapse prematurely in fire. Non-metallic cable ties / clips / trunking cannot be the sole means of support (NOTE 3); steel or copper clips, saddles, ties, or steel cable containment do meet the requirement (NOTES 2, 4).',
              'Separation from LV power scales with containment AND voltage / current. Annex A444 Table A444.1: open / no containment 200 mm, perforated 150 mm, fully-enclosed solid no separation needed beyond containment. Table A444.2 scales with disturbing voltage / current. Take the largest of every applicable rule; bond the containment per §444.5.3.1.',
              'Sustained PoE bundles are a thermal design problem. BS 7671 §716.523.1.101 NOTE 1: temperature rise raises insertion loss and degrades the channel. NOTE 2 references PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2 and ISO/IEC TS 29125 for bundle planning. The §716.523.2.101 hard cap of 750 mA per conductor bounds every PoE design from 15 April 2026.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify BS EN 50174-2 as the install-practice standard for cabling inside UK buildings, and recognise BS 7671:2018+A4:2026 §444.410(b) as the regulatory hook',
              'State and apply the typical bend radii — 4× cable OD during installation, 8× cable OD long-term in service — and explain the physical reason for the two-radius rule',
              'Quote the typical maximum pulling tension for 4-pair UTP / Cat6A (~110 N), describe the damage caused by exceeding it, and apply practical defences (breakaway swivel, pull from box, lubrication, slow curves)',
              'Apply BS 7671 §521.10.202 (the fire-collapse rule) verbatim — including NOTES 2, 3 and 4 — and recognise that non-metallic ties / clips / trunking cannot be the sole means of support',
              'Apply BS 7671 Annex A444 Tables A444.1 and A444.2 to a design — take the largest of every applicable separation rule against LV power, recognise containment as part of the screening solution, and remember the 130 mm rule from §444.6.2 for HID lamps',
              'Plan PoE bundle design against the §716.523.1.101 / §716.523.2.101 framework, the bundle-thermal references in NOTE 2 (PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125) and TIA TSB-184-A',
              'Apply tie / strap discipline — hook-and-loop preferred, ties loose enough to rotate freely, never the sole means of fire-collapse support — and understand the link from over-tight ties to NEXT / return-loss degradation',
              'Specify a labelling and administration discipline per BS EN 50174-1 / TIA-606-D so the cabling system can be modified, fault-isolated and extended over its 15-20 year life without re-pulling',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Bend radii — install vs service</ContentEyebrow>

          <ConceptBlock
            title="Two numbers, one cable: 4× OD during the pull, 8× OD in service"
            plainEnglish={`A balanced twisted-pair cable\u2019s electrical performance depends on the geometric symmetry of every pair. A tight bend deforms the pair geometry, locally distorts the twist, and raises NEXT / return loss at the bend. BS EN 50174-2 / TIA-568.2-E set two minimum bend radii per cable: a TIGHTER number for active installation (when the cable is under pull tension and tighter bends are physically tolerated for the duration of the pull) and a LARGER number for static service (when the cable will sit long-term and any bend tighter than the limit will deform pair geometry permanently). Typical figures: 4\u00d7 cable outer diameter (OD) during install, 8\u00d7 OD in service.`}
            onSite={`On a 7 mm Cat6A cable, that's ~30 mm install / ~60 mm service. On a heavier Cat7 / Cat7A construction the radii are typically larger \u2014 always check the manufacturer datasheet. Practical defences during install: route in slow curves, never push a cable into a 90\u00b0 corner directly, lubricate at sharp transitions, and let the cable take its own bend with gravity wherever possible. The most common bend-radius failure on real jobs is at the entry to the patch panel \u2014 the cable comes off the basket, drops into the rack, and the installer pulls it sharply round into the rear of the panel. Use a cable manager / horizontal manager to give the cable a slow curve into the panel.`}
          >
            <p>Why the two-radius rule exists:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Installation (4× OD).</strong> During the pull, the cable is in active
                tension and the bend is transient — the cable will straighten out as it&apos;s
                pulled through. A tighter bend at this stage is tolerated provided the bend
                doesn&apos;t become permanent. Pulling tension and bend together stress the
                conductors, but only briefly.
              </li>
              <li>
                <strong>Service (8× OD).</strong> Long-term static bends are different. The cable
                sits in the bend for years; the conductors creep into the deformed geometry
                permanently; the dielectric flows under sustained stress; the pair geometry changes
                for the cable&apos;s life. The 8× number is what the cable can tolerate indefinitely
                without electrical degradation.
              </li>
              <li>
                <strong>Pinch points.</strong> The most common bend-radius failures: at the entry to
                a patch panel (cable falls off basket, gets pulled into rear of panel sharply — use
                a horizontal cable manager); at a 90° corner in trunking (route in slow curves,
                never sharp angle); at any place where a cable rests against a rigid edge (use an
                edge protector or radius bead).
              </li>
              <li>
                <strong>Larger / heavier cables.</strong> Cat7 / Cat7A with overall braid have
                larger minimum radii than Cat6A. Cat8.x at 30 m channels is rarely a bend-radius
                problem because it&apos;s short and well-managed. Always read the manufacturer
                datasheet — the 4× / 8× figures are typical, not universal.
              </li>
            </ul>
          </ConceptBlock>

          {/* Bend radius diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Cat6A bend radius — install (4× OD) vs service (8× OD)
            </h4>
            <svg
              viewBox="0 0 920 600"
              className="w-full h-auto"
              role="img"
              aria-label="A diagram showing two arcs side by side. The left arc has a tighter radius labelled 4 times outer diameter, with a note saying acceptable during active installation only. The right arc has a larger radius labelled 8 times outer diameter, with a note saying minimum for long term service. A typical Cat6A cable outer diameter of approximately 7 millimetres is annotated, giving 30 millimetres install and 60 millimetres service. A note below summarises the two-radius rule and the practical pinch points."
            >
              {/* ===== Top label row — panel titles ABOVE arcs ===== */}
              <text
                x="220"
                y="32"
                textAnchor="middle"
                fill="#FCA5A5"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                INSTALL · 4× OD
              </text>
              <text
                x="220"
                y="50"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                During active pulling only
              </text>

              <text
                x="700"
                y="32"
                textAnchor="middle"
                fill="#86EFAC"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SERVICE · 8× OD
              </text>
              <text
                x="700"
                y="50"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Long-term static minimum
              </text>

              {/* ===== Panel boundary rects (subtle backgrounds) ===== */}
              <rect
                x="40"
                y="70"
                width="380"
                height="320"
                rx="10"
                fill="rgba(248,113,113,0.04)"
                stroke="rgba(248,113,113,0.18)"
                strokeWidth="1"
              />
              <rect
                x="500"
                y="70"
                width="380"
                height="320"
                rx="10"
                fill="rgba(34,197,94,0.04)"
                stroke="rgba(34,197,94,0.18)"
                strokeWidth="1"
              />

              {/* ===== Install arc (left panel) — centred around x=230 ===== */}
              {/* baseline */}
              <line
                x1="100"
                y1="320"
                x2="360"
                y2="320"
                stroke="#9CA3AF"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* tighter arc — radius ~50 px in viewBox */}
              <path
                d="M 130 320 A 100 100 0 0 1 330 320"
                fill="none"
                stroke="#F87171"
                strokeWidth="3"
              />
              {/* radius indicator */}
              <line
                x1="230"
                y1="320"
                x2="230"
                y2="220"
                stroke="#F87171"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <text
                x="240"
                y="270"
                fill="#FCA5A5"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                r = 4× OD
              </text>

              {/* ===== Service arc (right panel) — centred around x=700, larger radius ===== */}
              <line
                x1="540"
                y1="320"
                x2="860"
                y2="320"
                stroke="#9CA3AF"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <path
                d="M 580 320 A 120 120 0 0 1 820 320"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
              />
              <line
                x1="700"
                y1="320"
                x2="700"
                y2="200"
                stroke="#22C55E"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <text
                x="710"
                y="262"
                fill="#86EFAC"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                r = 8× OD
              </text>

              {/* ===== Below-arc label rows — dedicated, well clear of geometry ===== */}
              <text
                x="230"
                y="350"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ~30 mm radius (Cat6A, 7 mm OD)
              </text>
              <text
                x="230"
                y="370"
                textAnchor="middle"
                fill="#FCA5A5"
                fontSize="10"
                fontFamily="system-ui"
              >
                Acceptable only during active pulling
              </text>

              <text
                x="700"
                y="350"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ~60 mm radius (Cat6A, 7 mm OD)
              </text>
              <text
                x="700"
                y="370"
                textAnchor="middle"
                fill="#86EFAC"
                fontSize="10"
                fontFamily="system-ui"
              >
                In service indefinitely
              </text>

              {/* ===== Comparator caption row (between panels and notes) ===== */}
              <text
                x="460"
                y="416"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Two radii — one for the pull, one for the life of the cable
              </text>

              {/* ===== Notes / legend panel (separate rect at bottom) ===== */}
              <rect
                x="40"
                y="440"
                width="840"
                height="140"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="464"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                PRACTICAL NOTES
              </text>

              <text x="60" y="488" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Typical 4-pair Cat6A (~7 mm OD): 4× OD = ~30 mm install · 8× OD = ~60 mm service.
              </text>
              <text x="60" y="508" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Cat7 / Cat7A with overall braid — typically larger. Always check manufacturer
                datasheet.
              </text>

              <line
                x1="60"
                y1="528"
                x2="860"
                y2="528"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="552"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pinch point on every job: rear of the patch panel —
              </text>
              <text x="60" y="572" fill="#FBBF24" fontSize="11" fontFamily="system-ui">
                use a horizontal cable manager so service-radius is preserved.
              </text>

              {/* Legend swatches at bottom right */}
              <line x1="640" y1="488" x2="668" y2="488" stroke="#F87171" strokeWidth="3" />
              <text x="678" y="492" fill="#FCA5A5" fontSize="10" fontFamily="system-ui">
                4× OD — install only
              </text>

              <line x1="640" y1="510" x2="668" y2="510" stroke="#22C55E" strokeWidth="3" />
              <text x="678" y="514" fill="#86EFAC" fontSize="10" fontFamily="system-ui">
                8× OD — long-term service
              </text>
            </svg>
          </div>

          <RegsCallout
            source="BS EN 50174-2:2018+A2:2024 · §6 (Installation practices — paraphrased)"
            clause={
              <>
                Cables shall be installed in accordance with the manufacturer&apos;s instructions
                regarding minimum bend radii, maximum pulling tensions, support intervals, vertical
                drops, separation from sources of electromagnetic disturbance and identification.
                Where the manufacturer does not specify, the typical bend radii shall be 4× cable
                outer diameter during installation and 8× cable outer diameter in service for 4-pair
                balanced cables, and the typical maximum pulling tension shall be 110 N for 4-pair
                UTP.
              </>
            }
            meaning="The install-practice numbers protect the Class certification. A Cat6A channel that fails Class EA at handover almost always fails on install practice — sloppy stripping, tight bends, over-tension, crushed cable from over-tight ties, or insufficient separation from LV power. The cable spec is fine; the install discipline let the channel down. BS EN 50174-2 is the document that turns a Category bill of materials into a certifiable Class EA channel."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Pulling tension and pull route discipline</ContentEyebrow>

          <ConceptBlock
            title="~110 N maximum on 4-pair UTP — and the practical defences against exceeding it"
            plainEnglish={`Pulling tension is what the installer applies during the pull, measured in Newtons. The cable resists the pull through friction with the route surfaces, gravity on vertical drops, and any binding through corners. ANSI/TIA-568.2-E and BS EN 50174-2 set a typical maximum of 110 N (\u224811 kgf, \u224825 lbf) for 4-pair UTP \u2014 noticeable hand-pull but not extreme. Above that limit the cable damage becomes likely: copper conductors permanently elongate, twist geometry deforms, dielectric and jacket can crack. Damage is permanent and the cable cannot be tested to deliver Class EA after over-tension.`}
            onSite={`Long-route practical defences: pull from the cable BOX (cable feeds smoothly from the centre and the box doesn\u2019t fight the pull) rather than from a free-spinning reel. Use a cable LUBRICANT (waxy gel from cable suppliers) at every sharp transition or 90\u00b0 corner. Use a BREAKAWAY SWIVEL between the pull cord and the cable \u2014 a dynamometer / tension-rated swivel that releases above the cable\u2019s rated tension, so when the pull binds, the swivel pops rather than stretching the cable. Route in SLOW CURVES \u2014 never pull a cable through a sharp 90\u00b0 directly. On long horizontal pulls, mount intermediate pulleys to break the pull into shorter segments.`}
          >
            <p>Why pulling tension matters and how it goes wrong:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The 110 N limit.</strong> Typical TIA / EN figure for 4-pair UTP. Above it,
                copper elongates plastically, twist geometry deforms, dielectric can crack. Damage
                is permanent.
              </li>
              <li>
                <strong>What raises the pull tension above 110 N.</strong> Friction at corners,
                binding round 90° bends, gravity on vertical drops, free-spinning reel that fights
                the pull, sticky surfaces on tray, lack of lubrication. Combine two of these and
                you&apos;re above the limit even on what feels like a moderate pull.
              </li>
              <li>
                <strong>Breakaway swivel.</strong> The most reliable defence. A tension-rated swivel
                rated to release at, say, 90 N — slightly below the cable limit. If the pull binds,
                the swivel releases rather than the cable being damaged. Add to every long pull.
              </li>
              <li>
                <strong>Pull from the box.</strong> Cable boxes are designed to feed from the
                centre. The cable spirals up out of the box smoothly, no resistance, no tangling. A
                free reel needs to be unspooled actively as you pull and adds friction.
              </li>
              <li>
                <strong>Lubrication at corners.</strong> A small amount of cable-rated wax / gel at
                any sharp transition cuts friction dramatically. Don&apos;t use non-cable-rated
                lubricants — some attack jacket plastics.
              </li>
              <li>
                <strong>Slow curves not sharp angles.</strong> Route the cable through slow curves
                at every direction change. Never pull a cable directly into a 90° corner — the cable
                binds, friction multiplies, tension exceeds limit, jacket scrapes or peels.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Supports and §521.10.202 — cables that don&apos;t collapse in fire
          </ContentEyebrow>

          <ConceptBlock
            title="Steel clips, steel saddles, steel cable containment — never plastic ties as the sole support"
            plainEnglish={`BS 7671 \u00a7521.10.202 is the fire-collapse rule for wiring systems, including data cabling: "Wiring systems shall be supported such that they will not be liable to premature collapse in the event of a fire." The intent is to stop cables hanging across access / egress routes after a fire melts plastic supports \u2014 it hinders evacuation and firefighting. The clause precludes (NOTE 3) the use of non-metallic cable clips / cable ties / non-metallic trunking as the SOLE means of support; NOTE 4 confirms that steel or copper clips, saddles, ties \u2014 and (NOTE 2) cables in steel cable containment systems \u2014 meet the requirement.`}
            onSite={`On a UK install from \u00a7521.10.202\u2019s remit (which covers data cabling as much as LV power), the practical rules are: cables clipped DIRECT to a surface need steel clips at sensible spacing (typically 250\u2013300 mm); cables suspended UNDER tray need additional steel ties / saddles at intervals so that if every plastic tie melts, steel still holds them; cables IN bonded steel cable basket or trunking are deemed to meet the requirement automatically (NOTE 2). The most common compliance failure: a Cat6A horizontal run zip-tied to a fire-rated structural bar with plastic ties only \u2014 melts in fire, cable falls across the corridor, fails \u00a7521.10.202.`}
          >
            <p>The compliant support patterns under §521.10.202:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Steel cable basket / tray (NOTE 2).</strong> Cables resting in steel basket
                or tray are deemed to meet the requirement automatically — the basket supports the
                cables; the basket itself is metal and survives fire long enough that cables remain
                in place. The 2026 commercial default for high-density horizontal runs.
              </li>
              <li>
                <strong>Steel cable trunking.</strong> Same outcome — bonded steel trunking supports
                the cables and survives fire. NOTE: §521.10.1 (the conduit / trunking construction
                rule) is a separate clause about non-sheathed cables; §521.10.202 is the
                fire-collapse rule.
              </li>
              <li>
                <strong>Steel clips / saddles direct to surface (NOTE 4).</strong> Cables clipped
                direct to walls or soffits with steel clips / saddles at sensible intervals
                (typically 250-300 mm) meet the requirement.
              </li>
              <li>
                <strong>Steel cable ties at intervals (NOTE 4).</strong> If using cable ties for
                bundling under cable tray, periodic STEEL ties (or hook-and-loop straps over a steel
                mesh) at intervals along the run meet the requirement. The plastic ties are still
                allowed as bundling aids — they just can&apos;t be the SOLE means of support.
              </li>
              <li>
                <strong>What does NOT meet the requirement.</strong> Plastic single-use cable ties
                as the sole support of cables clipped direct or suspended under tray (NOTE 3
                explicitly precludes). Non-metallic cable trunking as the sole means of support of
                the cables therein (NOTE 3). Bare cables resting on plasterboard ceiling tiles, on
                suspended ceiling grid (no support if grid melts), on low-melt plastic conduit.
              </li>
            </ul>
            <p>
              The tribunal of the rule: if every non-metallic component on the route melted in fire,
              would the cables stay supported above access / egress routes? If yes, the rule is met.
              If no, you need steel supports added or a steel containment system.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §521.10.202 (Wiring system support against premature collapse in fire — verbatim)"
            clause={
              <>
                Wiring systems shall be supported such that they will not be liable to premature
                collapse in the event of a fire. NOTE 1: Wiring systems hanging across access or
                egress routes may hinder evacuation and firefighting activities. NOTE 2: Cables
                installed in or on steel cable containment systems are deemed to meet the
                requirements of this regulation. NOTE 3: This regulation precludes, for example, the
                use of non-metallic cable clips or cable ties as the sole means of support where
                cables are clipped direct to exposed surfaces or suspended under cable tray, and the
                use of non-metallic cable trunking as the sole means of support of the cables
                therein. NOTE 4: Suitably spaced steel or copper clips, saddles or ties are examples
                that will meet the requirements of this regulation. NOTE 5: The intent of this
                regulation is to prevent the general collapse of wiring systems as a result of
                exposure to the effects of fire such that they would hinder the safe evacuation,
                rescue or access to firefighters. It is not the intent of this regulation to provide
                support to maintain circuit integrity for life safety and/or firefighting
                applications under fire conditions. These requirements are addressed in Chapter 56
                and in Codes of Practice BS 5266, BS 5839 and BS 8519.
              </>
            }
            meaning="§521.10.202 is the fire-collapse rule for ALL wiring systems — data cabling included. Steel cable basket / tray is deemed compliant automatically. Steel clips / saddles / ties at sensible spacing meet the rule. Plastic ties cannot be the SOLE means of support. The clause does NOT mandate fire-resistant cabling for life-safety applications — that's a different requirement (Chapter 56, BS 5266, BS 5839, BS 8519). It also doesn't mandate steel cabling — it mandates steel SUPPORTS where the cabling itself isn't in steel containment."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <SectionRule />

          <ContentEyebrow>Separation from LV power — Annex A444</ContentEyebrow>

          <ConceptBlock
            title="Apply every applicable rule and use the largest separation"
            plainEnglish={`When ICT cabling shares a route with LV power, BS 7671 Annex A444 Tables A444.1 and A444.2 set minimum separation distances. Table A444.1 scales with containment type: open / no containment 200 mm, perforated 150 mm, fully-enclosed solid no separation needed. Table A444.2 scales with disturbing voltage / current: 240 V \u2192 0.45 m, 415 V \u2192 0.58 m, 3.3 kV \u2192 1 m; 5 A \u2192 0.24 m, 50 A \u2192 0.5 m, 300 A \u2192 0.85 m. \u00a7444.6.2 separately requires 130 mm minimum from HID (high-intensity discharge) lamps. The design rule is: take the LARGEST of every applicable rule and apply it to the route.`}
            onSite={`Practical example: Cat6A bundle running parallel to a 415 V three-phase submains (50 A nominal) on a perforated metallic tray. Annex A444 Table A444.1 (perforated metallic containment B) = 150 mm. Table A444.2 voltage at 415 V = 0.58 m. Table A444.2 current at 50 A = 0.5 m. Take the largest = 0.58 m \u2248 580 mm. Add the \u00a7444.6.2 130 mm rule against any HID lamps along the route. \u00a7444.5.3.1 mandates the tray be bonded to the equipotential bonding network. Document the calculation in the design package; it will reappear when the EICR / inspection happens later.`}
          >
            <p>The separation framework in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Annex A444 Table A444.1 (containment).</strong> Open / no metallic
                containment A: 200 mm in free air. Perforated open metallic containment B (NOTE 2:
                equivalent to steel tray ≤ 20 % perforation, 1.0 mm wall): 150 mm. Solid metallic
                containment C (NOTE 3: fully-enclosed steel, ≥ 1.5 mm wall): NOTE 4 — no physical
                separation other than that provided by the containment.
              </li>
              <li>
                <strong>Annex A444 Table A444.2 (voltage / current).</strong> 115 V → 0.25 m; 240 V
                → 0.45 m; 415 V → 0.58 m; 3.3 kV → 1 m; 6.6 kV → 1.25 m; 11 kV → 1.4 m. 5 A → 0.24
                m; 15 A → 0.35 m; 50 A → 0.5 m; 100 A → 0.6 m; 300 A → 0.85 m; 600 A → 1.05 m.
              </li>
              <li>
                <strong>§444.6.2 (HID lamps).</strong> 130 mm minimum between ICT cables and
                discharge / neon / mercury vapour / other HID lamps (CFL is an HID source). "Data
                wiring racks and electrical equipment shall always be separated."
              </li>
              <li>
                <strong>§444.5.3.1 (bonding).</strong> Containment bonded to the equipotential
                bonding network. Without bonding, the containment isn&apos;t a screen and the Annex
                A444 reductions don&apos;t apply.
              </li>
              <li>
                <strong>The design rule.</strong> Take the largest of every applicable separation;
                bond the containment; document the calculation. If the route can&apos;t accommodate
                the calculated separation, redesign — relocate the route, change the containment
                type, or screen the cable per M2S2.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="BS 7671 Annex A444 — separation distances at a glance"
            source="BS 7671:2018+A4:2026 · Annex A444 Tables A444.1 and A444.2 (verbatim values)"
            headers={['Driver', 'Containment / voltage / current', 'Minimum separation']}
            rows={[
              ['Containment A — open / no metallic containment', '—', '200 mm'],
              [
                'Containment B — perforated open metallic containment',
                'Steel tray, ≤ 20 % perforation, 1.0 mm wall',
                '150 mm',
              ],
              [
                'Containment C — solid metallic containment',
                'Fully-enclosed steel, ≥ 1.5 mm wall',
                'No physical separation needed beyond containment',
              ],
              ['Voltage', '115 V', '0.25 m'],
              ['Voltage', '240 V', '0.45 m'],
              ['Voltage', '415 V', '0.58 m'],
              ['Voltage', '3.3 kV', '1.00 m'],
              ['Current', '5 A', '0.24 m'],
              ['Current', '50 A', '0.50 m'],
              ['Current', '300 A', '0.85 m'],
              ['§444.6.2 — HID lamps (incl. CFL)', '—', '130 mm'],
            ]}
            notes="Take the LARGEST of every applicable separation rule and apply it to the route. §444.5.3.1 requires every metallic containment be bonded to the equipotential bonding network for the Annex A444 allowances to apply. §444.5.3.1 also requires every metallic screen / sheath / armouring of the ICT cable itself be bonded — see M2S2."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cable management, ties, and PoE bundle thermal discipline</ContentEyebrow>

          <ConceptBlock
            title="Hook-and-loop straps, sensible spacing, and bundle size limits under sustained PoE"
            plainEnglish="Cable management is where day-one Class certification meets long-term reliability. Hook-and-loop straps in preference to plastic single-use ties (impossible to over-tension). Tie spacing wide enough to avoid sag (typically 200\u2013300 mm on tray); never tight enough to crush. On sustained Type 4 PoE++ deployments, bundle size becomes a thermal design problem \u2014 BS 7671 \u00a7716.523.1.101 NOTES 1 and 2 spell out the link from PoE current \u2192 temperature rise \u2192 insertion loss, and reference PD CLC/TR 50174-99-1 + BS ISO/IEC 14763-2 + ISO/IEC TS 29125 for bundle planning. The hard regulatory cap is \u00a7716.523.2.101 = 750 mA per conductor."
            onSite={`Practical bundle discipline for sustained Type 4 PoE++: keep bundles \u2264 24 cables for high-current loads, separate bundles physically by at least one bundle width to allow airflow between, prefer 23 AWG / LP-rated cable over 24 AWG to reduce I\u00b2R per amp, route through routes with airflow rather than sealed voids, never lash 96 cables tightly together with no gaps. TIA TSB-184-A gives the practical de-rating curves; reputable Cat6A LP-rated cable manufacturers publish bundle size vs PoE load tables.`}
          >
            <p>Cable-management discipline that survives certification:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Hook-and-loop straps preferred.</strong> Cannot be over-tensioned; reusable;
                visible installation discipline; widely accepted on commercial work.
              </li>
              <li>
                <strong>Plastic ties, if used, applied by hand.</strong> Never tightened with pliers
                / a tensioner. Trim flush. Tail finger-tight only — the tie should rotate freely
                round the bundle.
              </li>
              <li>
                <strong>Tie spacing.</strong> 200-300 mm on horizontal runs through tray. Closer at
                vertical drops where cable weight matters. Looser through ceiling void where cable
                rests on tray. Never every 50 mm — that&apos;s parade-ground neatness, not install
                practice.
              </li>
              <li>
                <strong>Strain relief at every termination.</strong> The cable jacket should be
                retained inside the connector body (TIA-568.2-E §6 — strain relief). The jacket is
                what holds the pairs in twisted geometry up to the IDC; pulling the jacket out of
                the connector destroys the strain relief and stresses the IDC contacts.
              </li>
              <li>
                <strong>Bundle size for sustained PoE.</strong> &lt;= 24 cables per bundle for Type
                4 PoE++ continuous load; physical separation between bundles for airflow; 23 AWG /
                LP-rated cable preferred; verify against §716.523.2.101 (750 mA per conductor hard
                cap), §716.523.1.101 NOTE 1 (temperature → insertion loss), and the bundle thermal
                model in PD CLC/TR 50174-99-1.
              </li>
              <li>
                <strong>Don&apos;t mix hot and cold bundles.</strong> A heavily-loaded PoE bundle
                adjacent to a non-PoE bundle warms the latter without the latter contributing to the
                heat. Keep PoE bundles together (so the de-rating model applies cleanly) and
                separate from low-load bundles (so non-PoE channels keep their margin).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.523.1.101 (Conductor design current — verbatim)"
            clause={
              <>
                The design current in any conductor shall not exceed the limit specified in BS EN
                50173-1. NOTE 1: Any temperature rise of the data cables due to the load current
                they carry, or other causes, will increase the attenuation/insertion loss of the
                cables. Thus the performance of information transmission channels can be degraded.
                NOTE 2: Guidance on the effect of the number of loaded conductors, in a multi-cable
                bundle, on the temperature rise of the cables is given in PD CLC/TR 50174-99-1:2015
                and requirements and recommendations in relation to planning and installation of
                such cable bundles are provided in BS ISO/IEC 14763-2 and ISO/IEC TS 29125.
              </>
            }
            meaning="The clause is the regulatory hook for sustained-PoE bundle thermal design. NOTE 1 is the explicit physics: PoE current causes heating, heating raises insertion loss, raised insertion loss erodes channel margin. NOTE 2 points the designer at PD CLC/TR 50174-99-1 (multi-cable bundle thermal model), BS ISO/IEC 14763-2 (planning and installation under remote powering) and ISO/IEC TS 29125 (telecommunications cabling for remote powering of terminal equipment). TIA TSB-184-A is the parallel North American reference. The hard ceiling is §716.523.2.101 = 750 mA per conductor."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Identification, labelling, as-builts</ContentEyebrow>

          <ConceptBlock
            title="The cabling system that survives 15-20 years is the one with records"
            plainEnglish={`A structured cabling system is designed to outlive 3-4 generations of active equipment. That only works if the system is documented \u2014 every link uniquely identified per BS EN 50174-1 / TIA-606-D, every patch-panel port labelled, every channel test result retained, every as-built drawing kept current. A cabling system without records is a one-shot install that can\u2019t be safely modified \u2014 every fault is a forensic exercise and every move/add/change is a new pull.`}
            onSite={`Concretely: the labelling scheme uses BS EN 50174-1 / TIA-606-D conventions \u2014 a hierarchical identifier per link (e.g. building / floor / TR / panel / port). Labels are printed (not handwritten) on durable label stock that survives the building life. Patch panels carry a port-by-port label strip on the front; outlets carry a label inside the faceplate. As-builts include the cable route, the link IDs, the patch-panel positions, and \u2014 critically \u2014 any non-standard variations (consolidation points, screen-bonding chains, separation-distance design decisions). Channel test reports are exported as digital files (.flw / .lin) and retained for the warranty period \u2014 not just printed.`}
          >
            <p>The four record artefacts that turn an install into a maintainable system:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Link identifiers.</strong> A unique label per link, applied at every end
                point (outlet, patch panel) and at every consolidation point. BS EN 50174-1 /
                TIA-606-D give the format conventions; the discipline is one ID per link, no
                duplicates, printed (not handwritten), durable label stock.
              </li>
              <li>
                <strong>As-built drawings.</strong> Cable route, link IDs along the route, patch
                panel layouts, outlet locations, any non-standard design decisions (CPs, separation
                calcs, screen-bonding chains). Update at handover; retain for the warranty period.
              </li>
              <li>
                <strong>Channel test reports.</strong> Exported digital file from the field tester
                (Fluke .flw / Viavi .lin / AEM .lcr), one entry per link, with margin at every
                parameter at every test frequency. Tied back to the link ID.
              </li>
              <li>
                <strong>Bonding / screen-continuity records.</strong> On screened installs,
                screen-continuity test results per link, plus the documented bonding chain (cable
                foil → screened keystone → screened panel → rack bonding bar → TBB → MET / MFET) per
                BS 7671 §444.5.3.1 / §545 / BS EN 50310.
              </li>
            </ul>
            <p>
              Without these four artefacts, the next contractor cannot find a circuit, a fault
              cannot be isolated to the right link, and re-cabling becomes the cheapest fix —
              destroying the whole long-life value proposition of structured cabling.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What's new in BS 7671 A4:2026 for installation practice"
            plainEnglish="Amendment 4 (2026) doesn\u2019t introduce a new install-practice clause but it consolidates and tightens the framework around bonding (\u00a7444.5.3.1 carried forward verbatim, \u00a7545 introducing ICT functional earthing as a distinct concept) and PoE bundle thermal management (\u00a7716.523.1.101 / .2.101). \u00a7521.10.202 (the fire-collapse rule, including all five NOTES) carries forward verbatim. The install-practice document itself remains BS EN 50174-2:2018+A2:2024."
            onSite="On a UK install from 15 April 2026, the install-practice stack is: BS EN 50174-2 (planning and practices inside buildings), BS EN 50174-1 (specification & QA, labelling), BS EN 50310 (bonding networks for ICT), BS 6701 (UK customer-premises telecoms wiring), AND BS 7671:2018+A4:2026 \u00a7444 / \u00a7521 / \u00a7528 / \u00a7545 / \u00a7716 / \u00a7521.10.202. The discipline is: deliver the install-practice rules of BS EN 50174-2 AND the regulatory rules of BS 7671 \u00a7716 (PoE) and \u00a7444 (EMC / segregation) and \u00a7545 (ICT functional earthing) and \u00a7521.10.202 (fire-collapse supports)."
          >
            <p>The five A4:2026 sections most directly relevant to install practice:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§444 — EMC / segregation.</strong> §444.410 explicitly cites BS EN 50174-1,
                BS EN 50174-2 and BS EN 50310. §444.5.3.1 bonds every metallic screen / sheath /
                armouring / containment. §444.6.2 sets the 130 mm separation from HID lamps. Annex
                A444 Tables A444.1 / A444.2 give the segregation distances.
              </li>
              <li>
                <strong>§528 — proximity to other circuits.</strong> §528.2: same-band circuits may
                still need segregation. §528.3.1: keep wiring out of the vicinity of services
                producing heat / smoke / fumes. §528.3.5: no cable in lift wells unless it&apos;s
                lift cabling.
              </li>
              <li>
                <strong>§545 — ICT functional earthing (NEW).</strong>{' '}
                <AmendmentBadge regs={['545.1.1', '545.1.2', '545.2']} edition="A4:2026" />{' '}
                Distinguishes functional earthing (signal reference, EMC) from protective earthing.
                Introduces the MFET (Main Functional Earthing Terminal). Minimum CSAs: 2.5 mm² Cu
                (with mechanical protection) or 4 mm² Cu (without).
              </li>
              <li>
                <strong>§716 — PoE-specific (NEW).</strong>{' '}
                <AmendmentBadge
                  regs={['716.521.101', '716.523.1.101', '716.523.2.101', '716.526.101']}
                  edition="A4:2026"
                />{' '}
                Cable Category list (M2S1), 750 mA per conductor hard cap (M2S3), connector rating
                750 mA per contact (M2S4), bundle thermal references in NOTE 2.
              </li>
              <li>
                <strong>§521.10.202 — fire-collapse supports.</strong> Steel clips / saddles / ties;
                cables in steel cable containment automatically deemed compliant; non-metallic ties
                / clips / trunking cannot be the sole means of support.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="A 96-cable Cat6A bundle zip-tied tightly to a fire-rated bar with plastic ties only"
            whatHappens={
              <>
                The installer dresses 96 Cat6A cables into a single tight bundle, zip-ties them to a
                fire-rated structural bar with plastic single-use ties at 100 mm intervals. Looks
                neat in the photo. Three faults emerge over time. (1) Class EA channel certification
                is marginal at the top test frequency — the tight ties have locally crushed the
                cables and PSANEXT margin has eroded. (2) Under sustained Type 4 PoE++ load, the
                centre of the bundle runs hot — temperature rise of 15-25 °C above ambient — and
                channel margin shrinks further (§716.523.1.101 NOTE 1). (3) §521.10.202 NOTE 3 is
                breached: the plastic ties are the SOLE means of support, and in a fire they would
                melt and the cables would fall across the egress route.
              </>
            }
            doInstead={
              <>
                Specify the bundle layout in advance: subdivide 96 cables into 4 × 24 sub-bundles
                with airflow gaps between them; use hook-and-loop straps OR plastic ties applied
                hand-tight (rotating freely round the bundle); add periodic STEEL ties at intervals
                so the cables are supported by steel even if every plastic component melts
                (§521.10.202 NOTE 4). Better still — run the bundle in bonded steel cable basket /
                tray (§521.10.202 NOTE 2 deems compliant). Specify 23 AWG / LP-rated Cat6A; verify
                bundle thermal model against PD CLC/TR 50174-99-1; channel-certify with comfortable
                margin at the top test frequency.
              </>
            }
          />

          <Scenario
            title="Retrofitting a school with Cat6A — supports, separation, fire-collapse, and labelling all at once"
            situation={
              <>
                A primary-school refit. New Cat6A horizontal to every classroom from a basement IDF,
                plus 25 PoE++ APs on the ceiling grid for AV and tablet trolleys. Routes run through
                original cellulose-tile suspended ceilings, sharing space with lighting circuits and
                the existing emergency-lighting cabling. Fire risk assessment is high — children,
                congested escape routes. Building owner wants a 15-year reliability commitment.
              </>
            }
            whatToDo={
              <>
                Route discipline. Run the horizontal in bonded steel cable basket throughout —
                §521.10.202 NOTE 2 deems compliant; no risk of plastic-tie collapse in fire;
                §444.5.3.1 bonding requirement met; Annex A444 separation worked out per route (HID
                lamps if any → 130 mm; LV power → 200 mm open / 150 mm perforated / no separation if
                fully-enclosed; voltage-scaled per Table A444.2). Cable choice. Cat6A U/UTP for
                ordinary classrooms; Cat6A F/UTP under the AP bundles where sustained PoE thermal
                load + alien crosstalk concerns warrant screening. Outlets. Shuttered keystones
                throughout — children, dust, longevity. Termination. T568B at every connector; ≤ 13
                mm untwisted-pair length at the IDC. Bundles. Sub-bundles ≤ 24 cables, hook-and-loop
                straps, 23 AWG / LP-rated cable. Records. Label every link per BS EN 50174-1 /
                TIA-606-D; channel-test per TIA-1152-A / BS EN 50346 with digital reports retained;
                as-builts updated; full bonding chain documented.
              </>
            }
            whyItMatters={
              <>
                A school is a 15-year reliability commitment under high fire risk and hard-use
                conditions. The install-practice rules — §521.10.202 supports, Annex A444
                separation, §716.523.x PoE thermal, §444.5.3.1 bonding, BS EN 50174-1 labelling —
                are not separate concerns; they overlap on every route. The contractor who runs the
                calcs, picks bonded steel cable basket as the default containment, specifies
                shuttered keystones for children, and hands over a labelled / certified / documented
                system has delivered a 15-year asset. The one who zip-ties cables to a roof rafter
                has delivered a problem.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'BS EN 50174-2 is the install-practice standard for cabling inside UK buildings — referenced by BS 7671 §444.410(b). Bend radii (4× OD install / 8× OD service), pulling tensions (~110 N for 4-pair UTP), supports, separation, identification.',
              'BS 7671 §521.10.202 is the fire-collapse rule (NOT §521.10.1). Steel clips / saddles / ties or steel cable containment deemed compliant; plastic ties / clips / non-metallic trunking cannot be the SOLE means of support.',
              'Annex A444 Tables A444.1 + A444.2 + §444.6.2 give the separation rules from LV power and HID lamps. Take the LARGEST of every applicable rule. Bond the containment per §444.5.3.1 for the Annex A444 reductions to apply.',
              'Sustained Type 4 PoE++ is a thermal design problem. §716.523.1.101 NOTE 1 = temperature rise raises insertion loss. NOTE 2 = bundle planning references (PD CLC/TR 50174-99-1, BS ISO/IEC 14763-2, ISO/IEC TS 29125). §716.523.2.101 = 750 mA per conductor hard cap.',
              'Cable management discipline (hook-and-loop straps, hand-tight ties, sensible spacing) and labelling per BS EN 50174-1 / TIA-606-D are not optional. The cabling system that survives 15-20 years is the one with records.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next module: Module 3
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule2Section5;
