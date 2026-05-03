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
    id: 'datacabling-m2s4-rj45-pinout',
    question:
      'A site uses T568B at the patch panel end and T568A at the wall outlet end of every horizontal link. What is the immediate consequence?',
    options: [
      'Crossover cable — works for everything.',
      'Crossover wiring — pin pairs are swapped end-to-end. Modern Auto-MDI-X PHYs (every Ethernet PHY since gigabit) auto-detect and correct this for two-pair Ethernet, but for 4-pair 1000BASE-T / 10GBASE-T any pair swap creates a non-compliant channel. The wire-map test fails and the channel will not certify to Class EA. The fix is to choose ONE scheme (T568B is the UK office default) and apply it at both ends of every link.',
      'No effect — TIA permits either at either end.',
      'Better noise rejection.',
    ],
    correctIndex: 1,
    explanation:
      'T568A and T568B differ in which colour pair maps to which pin position — pairs 2 and 3 are swapped between the two schemes. Mixing them at the two ends of a link creates a crossover. Auto-MDI-X handles it for the 2-pair Ethernet case (10/100BASE-T), but 1000BASE-T / 10GBASE-T need all 4 pairs in their correct positions for the receiver alignment and pair-coding to work. The wire-map test catches it immediately and the channel will not certify. UK convention is T568B at every termination on every job; you pick one scheme and you stick to it.',
  },
  {
    id: 'datacabling-m2s4-untwist-distance',
    question:
      'How much pair untwist is permitted at the IDC (insulation displacement contact) of a Cat6A keystone, per BS EN 50174-2 / TIA-568.2-E?',
    options: [
      '50 mm.',
      '\u2264 13 mm of untwisted pair length at the IDC for Cat6A. The aim is to keep the pair twist as close to the contact as physically possible \u2014 every millimetre of untwisted pair degrades the balance, raises NEXT, raises return loss, and erodes Class EA margin. Cat5e tolerates up to 13 mm; Cat6A demands the same number but the impact of exceeding it is far greater because the bandwidth is 5\u00d7 higher.',
      '25 mm \u2014 same as Cat5.',
      'No limit.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-568.2-E and BS EN 50174-2 specify the maximum untwisted-pair length at the IDC \u2014 \u2264 13 mm for Cat6A (and Cat5e historically). Every millimetre of untwist past the limit erodes the cable\u2019s balance and the channel\u2019s NEXT and return-loss margins. The discipline is to strip the jacket the minimum needed, lay each pair into the keystone\u2019s lacing path with the twist preserved as close to the IDC as possible, then punch down with a manufacturer-correct tool. Sloppy stripping is the single most common Class EA workmanship issue \u2014 it shows up immediately on the field tester as marginal NEXT / return loss at the top test frequency.',
  },
  {
    id: 'datacabling-m2s4-connecting-hardware',
    question:
      'BS 7671:2018+A4:2026 §716.526.101 sets a current rating for the connecting hardware on PoE-carrying cabling. What is the rating, per which contact?',
    options: [
      '500 mA per pair.',
      'The connecting hardware shall comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per CONTACT. Where connected equipment may be separated under load (i.e. unplugging a live PoE patch lead), the connecting hardware must additionally meet the endurance test in BS EN 60512-9-3 at the appropriate disconnection load.',
      '1 A per pair.',
      '100 mA per pin.',
    ],
    correctIndex: 1,
    explanation:
      '\u00a7716.526.101 (verbatim): "The connecting hardware used for data cables used to distribute DC power shall comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per contact. Where connected equipment may be separated under load the connecting hardware shall meet the requirements of the endurance test specified in BS EN 60512-9-3 at the appropriate disconnection load. Also the anticipated number of separations in operation shall not exceed the value specified in the endurance test for the disconnection load." 750 mA per CONTACT \u2014 not per pair, not per port. Reputable connector manufacturers list the rating in their datasheet; verify before specifying.',
  },
  {
    id: 'datacabling-m2s4-cp-design',
    question:
      'A consolidation point (CP) is being added in the open-plan ceiling void to feed a flexible furniture layout. What is the design rule from BS EN 50173-1 / TIA-568.0-E?',
    options: [
      'Add as many CPs as you like.',
      'A CP is permitted as ONE additional connection in the permanent link between the floor distributor and the work-area outlet. It shall be at least 15 m of cable from the FD; the run beyond it must be enough to reach the WAO within the 90 m permanent-link total. CPs add an insertion-loss penalty and a connector pair to the channel, so they are an engineered concession \u2014 not a casual junction box.',
      'CPs are not allowed in commercial cabling.',
      'CPs only apply to fibre.',
    ],
    correctIndex: 1,
    explanation:
      'A consolidation point is an engineered single intermediate connection in the permanent link \u2014 useful for flexible furniture layouts where final outlets need to be re-located after the cabling is in. The standards (BS EN 50173-1, TIA-568.0-E) limit it to one CP per link, place it \u2265 15 m from the FD, and require the total permanent link from FD to WAO (including the CP) to remain \u2264 90 m. The CP adds a measurable insertion-loss penalty and an extra connector pair to the channel, so it eats into the margin budget. Field-test as a permanent link with the CP in circuit.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is an "8P8C" connector and is it the same as an "RJ45"?',
    options: [
      'They are different connectors.',
      '8P8C = 8 positions, 8 contacts. It is the modular connector used for balanced twisted-pair Ethernet — what every Cat5e / Cat6 / Cat6A / Cat8.1 termination plugs into. "RJ45" is the original Bell System designation for a similar 8-position telephone jack; the term is universally (if technically loosely) used as a synonym for 8P8C. Cat8.2 specifically uses non-RJ45 connectors (TERA / GG45) for the higher-bandwidth performance margin.',
      '8P8C is fibre, RJ45 is copper.',
      'RJ45 is bigger than 8P8C.',
    ],
    correctAnswer: 1,
    explanation:
      'Strictly, 8P8C is the modular-connector specification (8 positions, 8 contacts) and RJ45 is the original Bell System Registered Jack designation for an 8-position telephone connector. In practice the two terms are used interchangeably for Ethernet connectors. Cat5e through Cat8.1 all use the 8P8C / RJ45 form-factor. Cat8.2 / Class II is the exception — it uses non-RJ45 connectors (TERA, GG45) to achieve its 2000 MHz performance with a different mechanical design.',
  },
  {
    id: 2,
    question: 'What is the practical difference between T568A and T568B wiring?',
    options: [
      'T568A is for Europe, T568B is for the USA.',
      'They are two different colour-to-pin assignments. Pairs 1 and 4 (blue, brown) are identical in both schemes; pairs 2 and 3 (orange, green) are SWAPPED between the two schemes. Auto-MDI-X (every Ethernet PHY since gigabit) auto-detects pair swap for 2-pair Ethernet; for 1000BASE-T / 10GBASE-T any pair swap creates a non-compliant channel. UK convention is T568B at every termination — pick one and stick to it across the whole job.',
      'T568A is faster than T568B.',
      'T568A is for fibre.',
    ],
    correctAnswer: 1,
    explanation:
      'Both schemes assign the four pairs across the same 8 positions; pairs 1 (blue/white-blue, pins 4-5) and 4 (brown/white-brown, pins 7-8) are identical in both. Pairs 2 (orange/white-orange) and 3 (green/white-green) are SWAPPED between the two schemes. T568A puts green on pins 1-2 and orange on pins 3-6; T568B is the reverse. Mixing the two at the two ends of a link creates a crossover. Auto-MDI-X handles 10/100BASE-T crossover but 1000BASE-T / 10GBASE-T require all 4 pairs in correct positions. UK convention: T568B everywhere.',
  },
  {
    id: 3,
    question: 'Why does the standard limit untwisted-pair length to ≤ 13 mm at the IDC for Cat6A?',
    options: [
      'It looks tidier.',
      'Every millimetre of untwisted pair past the limit destroys the cable\u2019s balance, raises NEXT and return loss, and erodes Class EA margin. The pair\u2019s common-mode rejection comes from the geometric symmetry of the twist; un-twisting more than 13 mm leaves a section where the two conductors have different exposure to noise sources and to each other. The fix is to strip the jacket the minimum necessary, lay each pair into the keystone\u2019s lacing path with the twist preserved as close to the IDC as possible, and punch down with the correct tool.',
      'BS 7671 mandates 13 mm.',
      'Tools cannot reach further.',
    ],
    correctAnswer: 1,
    explanation:
      "The geometric symmetry of the twist is what gives the pair its balance and noise rejection. Un-twisting beyond the standard limit (\u2264 13 mm at the IDC for Cat6A per TIA-568.2-E and BS EN 50174-2) creates a section where the two conductors have different exposure to noise and to other pairs \u2014 NEXT rises, return loss degrades. Cat5e tolerates the same untwist length but at lower bandwidth the impact is smaller. At Cat6A's 500 MHz, sloppy untwist is the single most common cause of marginal Class EA channels.",
  },
  {
    id: 4,
    question:
      'What does BS 7671:2018+A4:2026 §716.526.101 require of connecting hardware on a PoE-carrying cabling system?',
    options: [
      'Connectors must be brass.',
      'Connecting hardware shall comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per contact. Where connected equipment may be separated under load (i.e. live unplugging), connecting hardware must additionally meet the endurance test in BS EN 60512-9-3 at the appropriate disconnection load.',
      'Connectors must be gold-plated.',
      'Connectors must be pre-2018 RJ45.',
    ],
    correctAnswer: 1,
    explanation:
      'Verbatim from \u00a7716.526.101: 750 mA per CONTACT continuous, plus BS EN 60512-9-3 endurance testing for live-disconnect cases. The 750 mA matches the cable-side hard cap (\u00a7716.523.2.101). Modern Cat6A and above keystones / patch panels from reputable manufacturers list the rating in their datasheet; verify the connector\u2019s rated current per contact at specification stage. The endurance-test rule is what stops cheap connectors that would arc-erode after a few hundred live disconnections under PoE load \u2014 a real issue in the early days of Type 4 PoE++.',
  },
  {
    id: 5,
    question:
      'What are the three common patch-panel types and how do they differ in install workflow?',
    options: [
      'There is only one type of patch panel.',
      'Punchdown patch panels have permanently-soldered IDC terminations on the rear; you punch each cable in with an impact tool. Modular (also called "snap-in" or keystone) patch panels are an empty chassis with 24 / 48 keystone cutouts; you terminate each cable into a keystone separately on the bench, then snap them into the chassis. Tool-less (also called "cable-rated" or 110-style with cap) panels grip the conductors mechanically with a screw or lever cam without an impact tool. Each has trade-offs in install speed, repairability, and Class certification.',
      'Patch panels are obsolete.',
      'Only fibre patch panels exist.',
    ],
    correctAnswer: 1,
    explanation:
      'Punchdown panels: traditional, fast for skilled installers, repair = re-punch the bad pair, all-or-nothing chassis. Modular / keystone panels: terminate keystones individually on the bench (better lighting, controlled environment), snap into chassis, swap out a single bad keystone without disturbing neighbours. Tool-less panels: fastest first-fit, mixed reputation for long-term reliability under PoE thermal load, careful manufacturer choice required. The 2026 commercial default for high-density Cat6A under PoE is modular keystone panels with screened keystones \u2014 the bench termination yields the most repeatable Class EA results.',
  },
  {
    id: 6,
    question: 'What is a "consolidation point" (CP) and what are the design rules for it?',
    options: [
      'A separate floor distributor.',
      'A single intermediate connection in the permanent link, between the FD and the work-area outlet, used to support flexible / re-locatable furniture layouts. Standards (BS EN 50173-1, TIA-568.0-E) permit ONE CP per link, place it \u2265 15 m from the FD, and require the total permanent link length (FD to WAO, with the CP) to remain \u2264 90 m. The CP adds an insertion-loss penalty and an extra connector pair to the channel.',
      'CPs are not permitted.',
      'CPs are mandatory for every link.',
    ],
    correctAnswer: 1,
    explanation:
      'Consolidation points support flexible furniture layouts \u2014 the cable arrives at a known location in the ceiling void or floor box, terminates into a CP plate, and a re-locatable run continues from the CP to the actual outlet position. This lets the workplace be re-laid without a re-pull of the main horizontal. Standards limit one CP per link, place it \u2265 15 m from the FD (so the CP-to-WAO segment is short and re-routable), and the total permanent link must stay \u2264 90 m. Field-test as a permanent link with the CP in circuit; the CP eats some margin so don\u2019t overuse it.',
  },
  {
    id: 7,
    question:
      'On a screened (F/UTP / U/FTP / S/FTP) Cat6A install, why does the choice of keystone matter as much as the choice of cable?',
    options: [
      'Keystones come in nicer colours.',
      'A screened cable terminating into an unshielded keystone is a non-compliance: the screen is not bonded at that end and is electrically useless. \u00a7716.526.101 requires connecting hardware comply with BS ISO/IEC 11801-1 (which specifies screened versions for screened cabling) AND \u00a7444.5.3.1 mandates that any metallic screen be bonded to the equipotential bonding network. Mixing screened cable with unshielded keystones fails both rules.',
      'Cable and keystone are unrelated.',
      'Only the cable colour matters.',
    ],
    correctAnswer: 1,
    explanation:
      'On a screened install, every termination has to be a screened keystone / shielded RJ45 / screened patch panel. The metal body of the connector clamps onto the foil drain wire or the foil itself, putting the screen in continuous metallic contact with the connector chassis, which in turn bonds to the screened patch panel and the rack bonding bar. Mixing a screened cable with an unshielded keystone leaves the screen floating \u2014 non-compliant with BS 7671 \u00a7444.5.3.1 (bonding requirement) and electrically pointless. The keystone choice is part of the EMC system, not a cosmetic decision.',
  },
  {
    id: 8,
    question: 'What does the BS EN 60512-9-3 endurance test in §716.526.101 actually verify?',
    options: [
      'Connector colour-fastness.',
      'It verifies the connector\u2019s ability to be repeatedly engaged and separated UNDER ELECTRICAL LOAD \u2014 i.e. plugged and unplugged with PoE current flowing \u2014 without arc erosion of the contacts degrading the contact resistance below specification. The test specifies a number of mating cycles at a specified disconnection load; the connector\u2019s rated separation count under PoE must exceed the anticipated lifetime separation count in service.',
      'Tensile strength.',
      'Plastic UV-resistance.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60512-9-3 (Test 9c, mechanical operation with electrical load) repeatedly engages and separates the connector under a specified DC load (the PoE current). After the test, the contact resistance is measured to confirm it has not degraded beyond the BS ISO/IEC 11801-1 limit due to arc erosion. Cheap connectors that pass insertion-loss / NEXT specs at zero current can fail dramatically after a few hundred live PoE disconnections \u2014 contact pitting, contact resistance drift, eventual signal loss. \u00a7716.526.101 hooks the BS EN 60512-9-3 standard into the BS 7671 framework for PoE applications where live disconnection is foreseen.',
  },
  {
    id: 9,
    question:
      'You inherit a brownfield site with mixed T568A and T568B terminations. What is the right repair strategy?',
    options: [
      'Mix and match \u2014 it doesn\u2019t matter.',
      'Audit every link with a wire-map and standardise on ONE scheme (T568B is the UK office default). Re-terminate the minority scheme to match the majority, document the standard scheme on the as-built drawings, retest. Mixed schemes create stealth crossovers that auto-MDI-X masks for 10/100BASE-T but break 1000BASE-T / 10GBASE-T. Standardising is a one-time cost; living with mixed wiring is a permanent fault-finding tax.',
      'Refuse to work on the site.',
      'Document the chaos and walk away.',
    ],
    correctAnswer: 1,
    explanation:
      'Mixed T568A / T568B terminations are a brownfield reality. Auto-MDI-X masks the issue for 10/100BASE-T (which only uses 2 pairs and tolerates pair swaps), so the system works for ordinary office traffic and the underlying mismatch goes unnoticed. The first time anyone tries 1 G or 10 G to that desk, the link fails or runs unstable. The right repair is a wire-map audit, standardise on one scheme (T568B in the UK), re-terminate the minority, and document the standard. It is annoying work but cheap compared to chasing intermittent gigabit faults indefinitely.',
  },
  {
    id: 10,
    question:
      'A specifier asks you to choose between "RJ45 keystone" and "shuttered RJ45 outlet" for a school refit. What\u2019s the difference and when does each matter?',
    options: [
      'They are identical.',
      'A shuttered RJ45 outlet has a spring-loaded dust shutter at the front of the port that closes when no plug is inserted. It keeps dust, debris, and small foreign objects out of the contact area; in environments where children might insert pencils / coins / paperclips into open RJ45s (schools, nurseries, public-facing reception areas), shuttered outlets are a sensible safety / longevity choice. Plain (un-shuttered) keystones are fine for routine office and back-of-house environments.',
      'Shuttered outlets are slower.',
      'Shuttered outlets are fibre-only.',
    ],
    correctAnswer: 1,
    explanation:
      'Shuttered keystones / outlets have a small plastic flap behind the front of the port, spring-loaded closed; the RJ45 plug pushes it open as it engages and it springs shut on disconnection. Functionally they protect the contact area from dust, debris, and accidental foreign-object insertion. In schools, nurseries, public reception, healthcare and similar environments \u2014 they are the right choice on the basis of longevity (less dust contamination of contacts) and safety (less likelihood of objects being inserted with PoE present). For routine office / IDF / managed environments, plain keystones are fine and slightly cheaper.',
  },
];

const faqs = [
  {
    question: 'Is "RJ45" actually the right name for the connector?',
    answer: (
      <>
        Strictly, no. "RJ45" is a Bell System Registered Jack designation for an 8-position
        telephone connector with specific pinning. The connector used for Ethernet is correctly
        called <strong>8P8C</strong> (8 positions, 8 contacts), and Ethernet uses pairs differently
        from the original RJ45 telephony spec. In practice, every datasheet, every catalogue, every
        installer and every standard uses "RJ45" as a synonym for the 8P8C modular connector used
        for Cat5e through Cat8.1. Cat8.2 / Class II is the exception — it uses TERA or GG45
        connectors specifically because the higher-bandwidth performance needed a different
        mechanical design. For UK structured cabling work, "RJ45" and "8P8C" mean the same thing.
      </>
    ),
  },
  {
    question: 'Does it matter whether I use T568A or T568B?',
    answer: (
      <>
        Pick one scheme and use it at both ends of every link, on every link, on the whole site.
        T568B is the UK office and commercial default; T568A appears in some residential /
        public-sector specifications and on US government work. Both schemes work equally well
        electrically — pairs 1 and 4 are identical between them, pairs 2 and 3 are swapped. The risk
        is mixing them at the two ends of a link, which creates a stealth crossover that auto-MDI-X
        masks for 10/100BASE-T but breaks 1000BASE-T / 10GBASE-T. Document the chosen scheme on the
        as-built drawings and use it consistently.
      </>
    ),
  },
  {
    question: 'Why is untwisted-pair length at the IDC such a big deal?',
    answer: (
      <>
        Because the cable&apos;s balance — and therefore its noise rejection — depends on the
        geometric symmetry of the twist. Every millimetre of untwisted pair past the standard limit
        (≤ 13 mm for Cat6A per TIA-568.2-E and BS EN 50174-2) leaves a section where the two
        conductors of the pair have different exposure to noise sources and to other pairs. NEXT
        rises, return loss degrades, and the channel marginalises against the Class EA limits.
        Sloppy stripping is the single most common cause of marginal Class EA channels. The
        discipline is: strip the jacket the minimum needed, lay each pair into the keystone lacing
        path with the twist preserved right up to the IDC, then punch down with a
        manufacturer-correct tool.
      </>
    ),
  },
  {
    question: 'What does BS 7671 §716.526.101 require for connectors?',
    answer: (
      <>
        Verbatim:{' '}
        <em>
          &quot;The connecting hardware used for data cables used to distribute DC power shall
          comply with BS ISO/IEC 11801-1 and support a continuous operating current of 750 mA per
          contact. Where connected equipment may be separated under load the connecting hardware
          shall meet the requirements of the endurance test specified in BS EN 60512-9-3 at the
          appropriate disconnection load. Also the anticipated number of separations in operation
          shall not exceed the value specified in the endurance test for the disconnection
          load.&quot;
        </em>{' '}
        — 750 mA per CONTACT (matching the cable-side cap of 750 mA per conductor in
        §716.523.2.101), plus BS EN 60512-9-3 endurance testing where live disconnect is foreseen.
      </>
    ),
  },
  {
    question: 'Punchdown, modular keystone, or tool-less — which patch panel?',
    answer: (
      <>
        For high-density Cat6A under PoE, modular keystone panels are the 2026 default — the
        keystones are terminated individually on the bench (controlled lighting, correct tool,
        proper torque), then snapped into the chassis. Repairs swap a single keystone without
        disturbing neighbours. Punchdown panels are still common in lower-density environments and
        are fast for skilled installers, but a punch error means re-punching at the chassis which is
        awkward in a live rack. Tool-less panels are fastest at first-fit but have a mixed
        reputation for long-term reliability under PoE thermal load — verify the manufacturer&apos;s
        BS EN 60512-9-3 endurance test results before specifying.
      </>
    ),
  },
  {
    question: 'When should I use a consolidation point?',
    answer: (
      <>
        Where the workspace genuinely needs furniture flexibility — open-plan offices with
        re-locatable desk pods, lab benches, broadcast studios with mobile equipment racks. The CP
        terminates the main horizontal at a known location (ceiling void, floor box) and the
        re-locatable run continues from there to the actual outlet. Standards permit ONE CP per
        link, ≥ 15 m from the FD, total permanent link ≤ 90 m. The CP adds insertion loss and a
        connector pair, so it eats margin — don&apos;t use a CP just because it&apos;s convenient.
        For static layouts, run direct FD-to-WAO and skip the CP entirely.
      </>
    ),
  },
];

const DataCablingModule2Section4 = () => {
  const navigate = useNavigate();

  useSEO(
    'Connectors and Patch Panels | Data Cabling Module 2.4 | Elec-Mate',
    'RJ45 / 8P8C wiring, T568A vs T568B, modular jacks and keystone formats, patch-panel types (punchdown, modular, tool-less), consolidation points, and the BS 7671:2018+A4:2026 §716.526.101 rule of 750 mA per contact at the connecting hardware.'
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
            eyebrow="Module 2 · Section 4"
            title="Connectors and Patch Panels"
            description="The 8P8C modular connector ('RJ45'), T568A vs T568B wiring, keystone and modular jack formats, the three common patch-panel types (punchdown, modular, tool-less), consolidation points for flexible layouts, and the BS 7671:2018+A4:2026 §716.526.101 rule of 750 mA per contact at the connecting hardware."
            tone="yellow"
          />

          <TLDR
            points={[
              'The connector for Cat5e through Cat8.1 is the 8P8C modular jack (universally called RJ45). Cat8.2 / Class II uses non-RJ45 connectors (TERA / GG45) for higher-bandwidth performance margin.',
              'T568A and T568B are two valid colour-to-pin assignments — pairs 1 and 4 identical, pairs 2 and 3 swapped. UK office default is T568B. Mix them at the two ends of a link and you create a stealth crossover that auto-MDI-X masks for 10/100BASE-T but breaks 1000BASE-T / 10GBASE-T.',
              'Untwisted-pair length at the IDC is bounded to ≤ 13 mm for Cat6A by TIA-568.2-E / BS EN 50174-2. Sloppy stripping is the single most common cause of marginal Class EA channels — every millimetre past the limit erodes balance, raises NEXT, raises return loss.',
              'BS 7671:2018+A4:2026 §716.526.101 mandates that connecting hardware on PoE-carrying cabling comply with BS ISO/IEC 11801-1 AND support 750 mA per contact continuously. Where live disconnect is foreseen, the connector must additionally meet the BS EN 60512-9-3 endurance test at the appropriate disconnection load.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the 8P8C ('RJ45') modular connector as the standard balanced-cabling connector for Cat5e through Cat8.1, and recognise Cat8.2's non-RJ45 connectors (TERA / GG45)",
              'State the colour-to-pin mapping for both T568A and T568B, identify pairs 2 and 3 as the swapped pairs, and apply the UK office convention (T568B) consistently across a job',
              "Explain the standard's untwisted-pair limit at the IDC (\u2264 13 mm for Cat6A) and link it to NEXT, return loss and Class EA margin",
              'Compare the three common patch-panel types — punchdown, modular keystone, tool-less — on first-fit speed, repairability and Class certification consistency',
              'Define a consolidation point (CP) and apply the BS EN 50173-1 / TIA-568.0-E design rules: one CP per link, \u2265 15 m from the FD, total permanent link \u2264 90 m',
              'Recognise that screened cabling demands screened keystones / shielded RJ45 / screened patch panels — mixing constructions leaves the screen floating, non-compliant with BS 7671 \u00a7444.5.3.1',
              'Quote BS 7671:2018+A4:2026 \u00a7716.526.101 verbatim — 750 mA per contact at the connecting hardware, BS ISO/IEC 11801-1 compliance, and BS EN 60512-9-3 endurance testing where live disconnect is foreseen',
              'Specify shuttered RJ45 outlets where appropriate (schools, public-facing, dust-prone) and choose patch-panel and keystone hardware coherently with the cable Category and the EMC strategy of the install',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The 8P8C modular jack — the connector you actually use</ContentEyebrow>

          <ConceptBlock
            title="One connector form-factor for Cat5e through Cat8.1 — and why Cat8.2 is the exception"
            plainEnglish={`The connector at the end of every Cat5e / Cat6 / Cat6A / Cat7 / Cat7A / Cat8.1 cable is the 8P8C modular jack \u2014 the small clear plastic plug with 8 gold contacts that everyone calls "RJ45". The connector body is a registered shape and the pin positions are numbered 1\u20138. Each Category specifies tighter mechanical and electrical tolerances on the SAME 8P8C form-factor, so you can plug a Cat6A patch lead into a Cat5e port (it'll work but at Cat5e Class), and the entire ecosystem stays interoperable. Cat8.2 / Class II breaks this lineage \u2014 it uses non-RJ45 connectors (TERA / GG45) to chase its 2000 MHz performance with a different mechanical geometry.`}
            onSite={`On site, the discipline is: keep the connectors and the cable Category matched. A Cat6A install with Cat5e patch leads delivers Class D, not Class EA \u2014 every component has to be of the chosen Category or higher for the channel to certify. Buy keystones, patch panels and patch leads as a system from one manufacturer (or from manufacturers in the same warranty programme) so the channel components are designed to work together to a published Class EA limit. Mix-and-match across vendors gives no warranted Class \u2014 just whatever the field tester decides at handover.`}
          >
            <p>The connector landscape for balanced cabling:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>8P8C / RJ45.</strong> The universal connector for Cat5e through Cat8.1. 8
                positions, 8 gold-plated contacts, modular plastic body with a retaining tab. Pin
                numbering 1-8 left-to-right with the contacts facing up. Backwards-compatible across
                Categories — a Cat6A plug fits a Cat5e jack (delivering Class D).
              </li>
              <li>
                <strong>Keystone.</strong> A small modular plug-receiving body designed to clip into
                a standardised cut-out in patch panels, wall outlets and faceplates. The cable
                terminates into the back of the keystone (typically via IDC); the keystone clips
                into the panel/outlet; the user-side plug engages with the keystone&apos;s front.
                Available unshielded or screened, plain or shuttered. The 2026 commercial default
                for high-density Cat6A panels.
              </li>
              <li>
                <strong>Shielded RJ45 plug / screened keystone.</strong> A metal-bodied 8P8C that
                bonds the cable&apos;s screen / drain wire to the connector body. Mandatory on
                screened cabling installs (BS 7671 §444.5.3.1) — leaving the screen unbonded makes
                the screen electrically useless and the install non-compliant.
              </li>
              <li>
                <strong>Shuttered outlet.</strong> A keystone with a spring-loaded dust shutter that
                closes when no plug is inserted. Sensible in schools, nurseries, public reception,
                healthcare — keeps dust and accidental foreign objects out of the contact area.
              </li>
              <li>
                <strong>TERA / GG45 (Cat7 / Cat7A / Cat8.2 only).</strong> Non-RJ45 connectors
                designed for higher-bandwidth performance. TERA is the Cat7 / Cat7A connector with
                shielded chambers per pair; GG45 is a backwards-compatible variant that accepts an
                RJ45 plug at lower Categories. Used only where the spec demands them; rare in UK
                horizontal cabling.
              </li>
            </ul>
          </ConceptBlock>

          {/* RJ45 pinout + T568A/B diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              T568A vs T568B — pin-by-pin colour mapping
            </h4>
            <svg
              viewBox="0 0 900 740"
              className="w-full h-auto"
              role="img"
              aria-label="A stacked comparison of T568A and T568B wiring schemes for an 8-position 8-contact RJ45 connector. Both diagrams share the same eight pin columns numbered one through eight. T568A is shown on top and T568B below. Pairs 1 (blue) and 4 (brown) are identical between the two schemes; pairs 2 (orange) and 3 (green) are swapped between the two. A note below states that UK office convention is T568B and that mixing schemes at the two ends of a link creates a stealth crossover."
            >
              {/* ===== Pin number row (top, dedicated label row) ===== */}
              <text
                x="450"
                y="28"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                PIN NUMBER (left to right, looking into the jack)
              </text>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((pin, i) => (
                <text
                  key={'pinNum-' + pin}
                  x={140 + i * 80}
                  y="56"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="system-ui"
                >
                  {pin}
                </text>
              ))}

              {/* ===== T568A scheme label (left of connector, dedicated column) ===== */}
              <text
                x="60"
                y="106"
                fill="#FDE68A"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                T568A
              </text>
              <text x="60" y="124" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Public-sector /
              </text>
              <text x="60" y="138" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                residential default
              </text>

              {/* ===== T568A connector body (y=80-160) ===== */}
              <rect
                x="100"
                y="80"
                width="700"
                height="80"
                rx="8"
                fill="rgba(31,41,55,0.4)"
                stroke="#6B7280"
                strokeWidth="1.6"
              />

              {/* T568A pins — 8 colour-coded conductors */}
              {[
                { pin: 1, color: '#86EFAC', stroke: '#22C55E' },
                { pin: 2, color: '#22C55E', stroke: '#16A34A' },
                { pin: 3, color: '#FED7AA', stroke: '#F97316' },
                { pin: 4, color: '#3B82F6', stroke: '#2563EB' },
                { pin: 5, color: '#BFDBFE', stroke: '#3B82F6' },
                { pin: 6, color: '#F97316', stroke: '#EA580C' },
                { pin: 7, color: '#FDE68A', stroke: '#A16207' },
                { pin: 8, color: '#A16207', stroke: '#78350F' },
              ].map(({ pin, color, stroke }, i) => (
                <rect
                  key={'a-pin-' + pin}
                  x={140 + i * 80 - 16}
                  y="98"
                  width="32"
                  height="44"
                  rx="3"
                  fill={color}
                  stroke={stroke}
                  strokeWidth="1.4"
                />
              ))}

              {/* ===== T568A colour names — dedicated row BELOW the body ===== */}
              {[
                { x: 140, name: 'Wht/Grn' },
                { x: 220, name: 'Green' },
                { x: 300, name: 'Wht/Org' },
                { x: 380, name: 'Blue' },
                { x: 460, name: 'Wht/Blu' },
                { x: 540, name: 'Orange' },
                { x: 620, name: 'Wht/Brn' },
                { x: 700, name: 'Brown' },
              ].map(({ x, name }, i) => (
                <text
                  key={'a-name-' + i}
                  x={x}
                  y="184"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="10"
                  fontFamily="system-ui"
                >
                  {name}
                </text>
              ))}

              {/* T568A pair brackets (below colour names, dedicated row) */}
              {/* Pair 3 (green): pins 1-2 */}
              <line x1="124" y1="206" x2="236" y2="206" stroke="#22C55E" strokeWidth="1.4" />
              <text
                x="180"
                y="222"
                textAnchor="middle"
                fill="#86EFAC"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 3 (green)
              </text>
              {/* Pair 2 (orange): pins 3 + 6 — non-adjacent */}
              <line
                x1="284"
                y1="206"
                x2="556"
                y2="206"
                stroke="#F97316"
                strokeWidth="1.4"
                strokeDasharray="3 2"
              />
              <text
                x="420"
                y="222"
                textAnchor="middle"
                fill="#FDBA74"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 2 (orange) — split across pins 3 + 6
              </text>
              {/* Pair 1 (blue): pins 4-5 */}
              <line x1="364" y1="240" x2="476" y2="240" stroke="#3B82F6" strokeWidth="1.4" />
              <text
                x="420"
                y="256"
                textAnchor="middle"
                fill="#BFDBFE"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 1 (blue)
              </text>
              {/* Pair 4 (brown): pins 7-8 */}
              <line x1="604" y1="240" x2="716" y2="240" stroke="#A16207" strokeWidth="1.4" />
              <text
                x="660"
                y="256"
                textAnchor="middle"
                fill="#A16207"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 4 (brown)
              </text>

              {/* ===== Divider between schemes ===== */}
              <line
                x1="60"
                y1="290"
                x2="840"
                y2="290"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              {/* ===== T568B scheme label ===== */}
              <text
                x="60"
                y="336"
                fill="#FDE68A"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                T568B
              </text>
              <text
                x="60"
                y="354"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                UK office default
              </text>
              <text x="60" y="368" fill="#FBBF24" fontSize="10" fontFamily="system-ui">
                — use this
              </text>

              {/* ===== T568B connector body (y=310-390) ===== */}
              <rect
                x="100"
                y="310"
                width="700"
                height="80"
                rx="8"
                fill="rgba(31,41,55,0.4)"
                stroke="#6B7280"
                strokeWidth="1.6"
              />

              {/* T568B pins */}
              {[
                { pin: 1, color: '#FED7AA', stroke: '#F97316' },
                { pin: 2, color: '#F97316', stroke: '#EA580C' },
                { pin: 3, color: '#86EFAC', stroke: '#22C55E' },
                { pin: 4, color: '#3B82F6', stroke: '#2563EB' },
                { pin: 5, color: '#BFDBFE', stroke: '#3B82F6' },
                { pin: 6, color: '#22C55E', stroke: '#16A34A' },
                { pin: 7, color: '#FDE68A', stroke: '#A16207' },
                { pin: 8, color: '#A16207', stroke: '#78350F' },
              ].map(({ pin, color, stroke }, i) => (
                <rect
                  key={'b-pin-' + pin}
                  x={140 + i * 80 - 16}
                  y="328"
                  width="32"
                  height="44"
                  rx="3"
                  fill={color}
                  stroke={stroke}
                  strokeWidth="1.4"
                />
              ))}

              {/* ===== T568B colour names — dedicated row BELOW the body ===== */}
              {[
                { x: 140, name: 'Wht/Org' },
                { x: 220, name: 'Orange' },
                { x: 300, name: 'Wht/Grn' },
                { x: 380, name: 'Blue' },
                { x: 460, name: 'Wht/Blu' },
                { x: 540, name: 'Green' },
                { x: 620, name: 'Wht/Brn' },
                { x: 700, name: 'Brown' },
              ].map(({ x, name }, i) => (
                <text
                  key={'b-name-' + i}
                  x={x}
                  y="414"
                  textAnchor="middle"
                  fill="#E5E7EB"
                  fontSize="10"
                  fontFamily="system-ui"
                >
                  {name}
                </text>
              ))}

              {/* T568B pair brackets */}
              {/* Pair 2 (orange): pins 1-2 */}
              <line x1="124" y1="436" x2="236" y2="436" stroke="#F97316" strokeWidth="1.4" />
              <text
                x="180"
                y="452"
                textAnchor="middle"
                fill="#FDBA74"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 2 (orange)
              </text>
              {/* Pair 3 (green): pins 3 + 6 — non-adjacent */}
              <line
                x1="284"
                y1="436"
                x2="556"
                y2="436"
                stroke="#22C55E"
                strokeWidth="1.4"
                strokeDasharray="3 2"
              />
              <text
                x="420"
                y="452"
                textAnchor="middle"
                fill="#86EFAC"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 3 (green) — split across pins 3 + 6
              </text>
              {/* Pair 1 (blue): pins 4-5 */}
              <line x1="364" y1="470" x2="476" y2="470" stroke="#3B82F6" strokeWidth="1.4" />
              <text
                x="420"
                y="486"
                textAnchor="middle"
                fill="#BFDBFE"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 1 (blue)
              </text>
              {/* Pair 4 (brown): pins 7-8 */}
              <line x1="604" y1="470" x2="716" y2="470" stroke="#A16207" strokeWidth="1.4" />
              <text
                x="660"
                y="486"
                textAnchor="middle"
                fill="#A16207"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Pair 4 (brown)
              </text>

              {/* ===== Key-points panel (separate rect, well below) ===== */}
              <rect
                x="40"
                y="520"
                width="820"
                height="200"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="546"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                KEY POINTS
              </text>

              <text x="60" y="572" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Pairs 1 (blue, pins 4-5) and 4 (brown, pins 7-8) are IDENTICAL in both schemes.
              </text>
              <text x="60" y="594" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Pairs 2 (orange) and 3 (green) are SWAPPED between T568A and T568B.
              </text>
              <text x="60" y="616" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                UK office convention: T568B at every termination on every link.
              </text>

              <line
                x1="60"
                y1="638"
                x2="840"
                y2="638"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="664"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Mixing schemes at the two ends of a link creates a stealth crossover —
              </text>
              <text
                x="60"
                y="684"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                auto-MDI-X masks it for 10/100BASE-T but BREAKS 1000BASE-T and 10GBASE-T.
              </text>
              <text x="60" y="706" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Document the chosen scheme; verify with wire-map test on every link.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="ANSI/TIA-568.2-E (2024) · §6 (Termination practices — paraphrased)"
            clause={
              <>
                Modular connectors and outlets shall be terminated such that the untwisted pair
                length at the insulation displacement contact does not exceed the limit specified
                for the relevant Category. The cable jacket shall be retained inside the connector
                body (strain relief), and the pair twist shall be preserved as close to the IDC as
                physically practicable. Re-termination shall be by replacement of the connector or
                by re-stripping, re-laying and re-punching the affected conductors, not by
                attempting to re-seat already-displaced contacts.
              </>
            }
            meaning="Termination quality is a design parameter, not a workmanship afterthought. The Class limits assume disciplined termination per BS EN 50174-2 / TIA-568.2-E. Sloppy stripping (long untwist), poor strain relief (jacket pulled out of the body) and re-seating displaced contacts all degrade the channel — and degrade it most at the top test frequency where the bandwidth headroom is thinnest."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>T568A vs T568B — pick one and stick to it</ContentEyebrow>

          <ConceptBlock
            title="Two valid colour assignments, one practical rule"
            plainEnglish={`T568A and T568B are two valid colour-to-pin mappings, both defined in ANSI/TIA-568. Pairs 1 (blue) and 4 (brown) are identical between them; pairs 2 (orange) and 3 (green) are swapped. Both work equally well electrically. The practical rule is: pick ONE scheme for the whole job and apply it at both ends of every link. The UK office and commercial default is T568B; T568A appears in some residential / public-sector specifications.`}
            onSite="Mixed schemes at the two ends of a link create a stealth crossover. Auto-MDI-X (every Ethernet PHY since gigabit) auto-detects pair swap for 2-pair Ethernet (10/100BASE-T), so the link will work for ordinary office traffic and the underlying mismatch goes unnoticed. The first time anyone tries 1 G or 10 G, the link fails or runs unstable. The defence is documentation: state the chosen scheme on the as-built drawings, label every patch panel with the scheme used, train installers to verify before they punch."
          >
            <p>The pin-pair mapping in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Pair 1 (blue): pins 4 + 5.</strong> White/blue on pin 5, blue on pin 4.
                IDENTICAL in T568A and T568B.
              </li>
              <li>
                <strong>Pair 4 (brown): pins 7 + 8.</strong> White/brown on pin 7, brown on pin 8.
                IDENTICAL in T568A and T568B.
              </li>
              <li>
                <strong>T568A pairs 2 + 3.</strong> Pair 3 (green) on pins 1-2 (white/green on 1,
                green on 2). Pair 2 (orange) on pins 3 + 6 (white/orange on 3, orange on 6).
              </li>
              <li>
                <strong>T568B pairs 2 + 3.</strong> Pair 2 (orange) on pins 1-2 (white/orange on 1,
                orange on 2). Pair 3 (green) on pins 3 + 6 (white/green on 3, green on 6).
              </li>
              <li>
                <strong>UK office default.</strong> T568B at every termination on every link.
                Document the choice; verify with wire-map test on every link.
              </li>
            </ul>
            <p>
              Note: 10BASE-T and 100BASE-TX use only pairs 2 and 3 (TX on one, RX on the other).
              1000BASE-T and 10GBASE-T use ALL FOUR pairs simultaneously, full-duplex on each. That
              is why T568A/B mismatch is invisible on legacy traffic but breaks gigabit and above.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Patch panels — punchdown, modular, tool-less</ContentEyebrow>

          <ConceptBlock
            title="Three common formats — same Class outcome, different install workflows"
            plainEnglish={`Patch panels live at the floor distributor (FD) and concentrate the horizontal cabling into a structured row of ports. The user-facing side has 24 or 48 RJ45 jacks; the cable-facing side terminates the horizontal cables. Three formats dominate: punchdown (cables punch directly into permanently-soldered IDC contacts on the rear of the panel), modular keystone (cables terminate into individual keystones on the bench, then snap into the panel chassis), and tool-less (cables grip mechanically with a screw or cam without an impact tool).`}
            onSite="The 2026 commercial default for high-density Cat6A under PoE is modular keystone. The bench-termination workflow gives the most repeatable Class EA results: controlled lighting, manufacturer-correct tool, proper torque on the IDC, no awkward in-rack reach. Repair is also clean \u2014 swap a single bad keystone without disturbing neighbours. Punchdown panels are still common in lower-density environments and are fast for skilled installers; tool-less panels are fastest at first-fit but verify the manufacturer\u2019s BS EN 60512-9-3 endurance test results before specifying for sustained PoE."
          >
            <p>The three formats compared:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Punchdown patch panel.</strong> Permanently-soldered IDC terminations on the
                rear of the chassis (typically 110-style). Cables strip, pair, lay into lacing path,
                punch in with impact tool. Fastest for a skilled installer once rack is mounted.
                Repair = re-strip / re-punch the bad pair. Awkward to work on in a live rack; if a
                port fails physically, you typically replace the whole panel.
              </li>
              <li>
                <strong>Modular keystone patch panel.</strong> Empty chassis with 24 or 48
                standardised keystone cut-outs. Each cable terminates into a separate keystone on
                the bench (controlled lighting, correct tool, proper torque), then the keystone
                snaps into the chassis from the front. Slightly slower at first-fit than punchdown
                but more repeatable Class EA results. Repair = pop out the bad keystone, replace,
                snap in new one. Mix screened and unscreened keystones in the same chassis (rarely
                useful, but possible). The 2026 high-density Cat6A default.
              </li>
              <li>
                <strong>Tool-less patch panel.</strong> Cables clip in mechanically with a screw,
                cam or lever — no impact tool needed. Fastest first-fit, especially in cramped
                racks. Mixed reputation for long-term reliability under PoE thermal load — verify
                the manufacturer&apos;s BS EN 60512-9-3 endurance test results and the BS ISO/IEC
                11801-1 compliance before specifying for sustained Type 4 PoE++.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Consolidation points — a single engineered intermediate</ContentEyebrow>

          <ConceptBlock
            title="One CP per link, ≥ 15 m from FD, total link still ≤ 90 m"
            plainEnglish="A consolidation point (CP) is an engineered single intermediate connection in the permanent link, between the FD and the work-area outlet. It supports flexible / re-locatable furniture layouts: the main horizontal arrives at a known CP location (ceiling void, raised floor box, structural wall) and a re-locatable run continues from there to the actual outlet. The standards permit one CP per link, place it \u2265 15 m from the FD, and require the total permanent link (FD-to-WAO with the CP in circuit) to remain \u2264 90 m."
            onSite={`Engineering trade-off: the CP adds an insertion-loss penalty and a connector pair to the permanent-link channel \u2014 it eats some Class EA margin. For sustained Type 4 PoE++ deployments, that margin matters; CPs are best avoided where furniture is stable. Where a CP is justified (open-plan with re-locatable desk pods, lab benches, broadcast studios), the CP plate is typically a screened keystone holder bolted to the structural soffit, with a labelled cover and the same bonding chain as the rest of the screened install. Field-test as a permanent link with the CP in circuit; the CP\u2019s Class EA contribution is reflected in the report.`}
          >
            <p>The CP design rules from BS EN 50173-1 / TIA-568.0-E:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>One CP per permanent link, maximum.</strong> Each CP adds insertion loss and
                a connector pair; chaining them blows the channel budget.
              </li>
              <li>
                <strong>Distance from FD ≥ 15 m.</strong> Keeps the CP-to-WAO segment short and
                re-routable; if the CP were too close to the FD it would offer no flexibility
                benefit.
              </li>
              <li>
                <strong>Total permanent link ≤ 90 m.</strong> The 90 m horizontal-cabling limit
                (M1S1) still applies — the CP doesn&apos;t extend it. Test the link as a permanent
                link with the CP in circuit.
              </li>
              <li>
                <strong>CP location.</strong> Mounted to a structural element (soffit, column, floor
                box) — not in mobile furniture. The CP itself doesn&apos;t move; only the run from
                CP to WAO is re-locatable.
              </li>
              <li>
                <strong>Labelling.</strong> Per BS EN 50174-1 / TIA-606-D — every CP plate labelled
                with the cables it serves and the link IDs it supports.
              </li>
              <li>
                <strong>EMC continuity.</strong> On screened installs, the CP must preserve the
                screen bonding chain — screened keystones at both sides of the CP, bonded to the
                structural metalwork or back to the rack bonding bar via a dedicated bonding lead.
              </li>
            </ul>
          </ConceptBlock>

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
            meaning="The clause sets the connector-side regulatory ceiling for PoE-carrying cabling: 750 mA per CONTACT (matching the cable-side 750 mA per conductor in §716.523.2.101) AND a BS EN 60512-9-3 endurance test where live disconnection is foreseen. Cheap connectors that pass insertion-loss / NEXT specs at zero current can fail dramatically under arc erosion after a few hundred live PoE disconnections; the endurance test rule keeps them out of the supply chain. Verify 750 mA / contact + BS ISO/IEC 11801-1 + BS EN 60512-9-3 in the manufacturer's datasheet at specification stage."
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

          <ContentEyebrow>Connector + cable as a coherent system</ContentEyebrow>

          <ConceptBlock
            title="Specify the cable, the keystone, the patch panel and the patch lead together — never separately"
            plainEnglish="Class EA / Cat6A is a CHANNEL property, and the channel is the sum of the cable, the connectors at both ends, the patch panel jacks, and the user-side patch leads. Mixing parts across vendors (or across Categories within the same vendor) breaks the warranty and degrades the channel by however much the weakest link allows. The discipline is: specify the cable, the keystone / RJ45, the patch panel and the patch lead from one manufacturer\u2019s warranted Class EA system \u2014 or from manufacturers in the same multi-vendor warranty programme."
            onSite={`On site, the practical impact is: do NOT mix Cat5e patch leads with a Cat6A horizontal install. Do NOT terminate screened cable into unshielded keystones. Do NOT use generic eBay patch leads on a Class EA channel. The warranty manufacturers have a list of approved component combinations \u2014 use the combinations on the list, document the chosen system on the as-built, and the Class EA certification stands. The most common warranty failure on screened Cat6A installs is "you used a non-warranted patch lead."`}
          >
            <p>The four-component channel specification:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable.</strong> Cat6A or above (the M2S1 default), shielded if the EMC / PoE
                / sector drivers warrant it (M2S2). On the §716.521.101 permitted list for any PoE
                deployment.
              </li>
              <li>
                <strong>Keystone / RJ45 at the WAO.</strong> Same Category as the cable. Screened if
                the cable is screened. Compliant with §716.526.101 (750 mA / contact, BS ISO/IEC
                11801-1, BS EN 60512-9-3 if live-disconnect foreseen). Shuttered if the location
                warrants it.
              </li>
              <li>
                <strong>Patch panel jack at the FD.</strong> Same Category as the cable. Same
                screening status. Same §716.526.101 compliance. Modular keystone format is the 2026
                high-density Cat6A default; bench-terminate, snap-in, document the manufacturer.
              </li>
              <li>
                <strong>Patch leads (FD-end and WAO-end).</strong> Stranded conductor (more
                flex-cycle tolerant), Category-matched to the channel, length controlled (the 10 m
                total cord allowance — M1S1). Screened if the channel is screened.
                Manufacturer-warranted as part of the same Class EA system.
              </li>
            </ul>
            <p>
              The deliverable at handover is a Class EA channel certified by TIA-1152-A / BS EN
              50346 field test, with every component documented on the as-built. That is what the
              warranty stands behind.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Connector and patch-panel selection by use case"
            source="BS EN 50173-1 · ISO/IEC 11801-1 · ANSI/TIA-568.2-E · BS 7671:2018+A4:2026 §716.526.101"
            headers={['Use case', 'Cable', 'Keystone / RJ45', 'Patch panel', 'Patch lead']}
            rows={[
              [
                'Office Cat6A horizontal — light EMI',
                'U/UTP Cat6A',
                'Plain unshielded keystone, T568B',
                'Modular keystone panel, 24 / 48 port',
                'U/UTP Cat6A patch lead',
              ],
              [
                'Office Cat6A — schools / public',
                'U/UTP Cat6A',
                'Shuttered unshielded keystone',
                'Modular keystone panel',
                'U/UTP Cat6A patch lead',
              ],
              [
                'Cat6A in heavy EMI (industrial / broadcast)',
                'F/UTP or U/FTP Cat6A',
                'Screened keystone, foil-bond verified',
                'Screened modular panel + rack-bond bar',
                'Screened patch lead',
              ],
              [
                'Dense PoE++ ceiling APs (96-cable bundle)',
                'F/UTP Cat6A (LP-rated)',
                'Screened keystone, 750 mA / contact verified',
                'Screened modular panel',
                'Screened Cat6A patch lead',
              ],
              [
                'Cat7A / Class FA niche spec',
                'S/FTP Cat7A',
                'TERA / GG45 connector',
                'Specialist Cat7A panel',
                'S/FTP Cat7A patch lead',
              ],
              [
                'Data-centre TOR (25/40GBASE-T to 30 m)',
                'Cat8.1',
                'RJ45 Cat8.1 connector',
                'Cat8.1 panel',
                'Cat8.1 patch lead',
              ],
              [
                'Data-centre TOR (Class II)',
                'Cat8.2',
                'TERA / GG45 connector',
                'Cat8.2 specialist panel',
                'Cat8.2 patch lead',
              ],
            ]}
            notes="Specify the four components as one system from a single Class EA / FA / I / II warranty programme. Mix-and-match across vendors voids most warranties and gives an un-certifiable channel. §716.526.101 (750 mA / contact, BS ISO/IEC 11801-1, BS EN 60512-9-3 endurance for live-disconnect cases) applies to every PoE deployment from 15 April 2026."
          />

          <ConceptBlock
            title="What's new in BS 7671 A4:2026 for connectors"
            plainEnglish="Amendment 4 (2026) introduces \u00a7716.526.101 \u2014 the first time UK wiring regulations have specified a current rating for the connecting hardware on data cabling. The clause hooks BS ISO/IEC 11801-1 (the international cabling specification) and BS EN 60512-9-3 (mechanical-operation-with-electrical-load endurance testing) into the BS 7671 framework. Combined with the cable-side cap of 750 mA per conductor in \u00a7716.523.2.101, the connector cap of 750 mA per contact in \u00a7716.526.101 closes the regulatory loop \u2014 every part of the PoE current path is now bounded."
            onSite="On a UK PoE design from 15 April 2026, the specification has to verify TWO numbers per connector: the steady-state current per contact (\u2265 750 mA continuous, per BS ISO/IEC 11801-1) AND the live-disconnect endurance (BS EN 60512-9-3 mating cycles at the appropriate load). Reputable Cat6A and above keystone / patch-panel manufacturers list both in their datasheet. Cheap connectors often pass cold insertion-loss / NEXT specs but fail BS EN 60512-9-3 \u2014 they pit and arc-erode after a few hundred live PoE disconnections. The clause keeps them out of compliant supply chains."
          >
            <p>The two §716 clauses that bound connector selection:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§716.526.101 — 750 mA per contact + endurance.</strong>{' '}
                <AmendmentBadge regs={['716.526.101']} edition="A4:2026" /> BS ISO/IEC 11801-1
                compliance, 750 mA per CONTACT continuous, BS EN 60512-9-3 endurance test where
                live-disconnect is foreseen. Verify in the manufacturer datasheet at specification
                stage.
              </li>
              <li>
                <strong>§444.5.3.1 — bond every screen / sheath.</strong> Carried forward from
                earlier editions. Every metallic screen, sheath or armouring of an ICT cable shall
                be bonded to the equipotential bonding network. On screened installs, this anchors
                the cable foil to the screened keystone, the screened patch panel, the rack bonding
                bar, the TBB and ultimately the MET / MFET.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Specifying screened cable but ordering unshielded keystones to save cost"
            whatHappens={
              <>
                The cable spec is F/UTP Cat6A. The cost-engineer notices that screened keystones are
                25-30 % more expensive than plain unshielded and substitutes plain keystones in the
                BOQ. The installer terminates the F/UTP cables, cuts off the foil drain wire because
                there is no metal keystone to land it on, and punches down the conductors normally.
                The wire-map test passes; the channel parameters pass at most frequencies; the
                screen-continuity test fails on every link. The screen is electrically floating
                end-to-end. Non-compliant with §444.5.3.1, the F/UTP cable is doing nothing the
                U/UTP version wouldn&apos;t do, and Class EA certification fails on screen
                continuity.
              </>
            }
            doInstead={
              <>
                Specify the cable AND the connector AND the patch panel AND the rack-bonding bar as
                one screened system. Either go U/UTP throughout (with bonded steel containment doing
                the EMC work, per Annex A444 Table A444.1) or go screened throughout (cable +
                keystones + panels + bonding chain). Mixing screened cable with unshielded keystones
                is a textbook failure mode that wastes the cable upgrade entirely. The
                cost-engineer&apos;s saving on keystones is gone the first time the link fails
                certification and gets re-terminated.
              </>
            }
          />

          <Scenario
            title="A 96-port Cat6A patch panel with sustained Type 4 PoE++ — what hardware do you specify?"
            situation={
              <>
                A 96-AP wireless deployment, every AP on Type 4 PoE++ continuously. The IDF will
                have two 48-port Cat6A patch panels feeding the 96 ceiling APs. Build standard wants
                10GBASE-T to every AP, 5-year warranted reliability, and a clean Class EA
                certification at handover.
              </>
            }
            whatToDo={
              <>
                Specify modular keystone patch panels (bench-termination workflow → most repeatable
                Class EA results). Specify screened keystones — F/UTP Cat6A cable bundles under
                sustained Type 4 PoE need shield bonding to control PSANEXT (M2S3). Verify in the
                manufacturer datasheet that the keystones meet §716.526.101: BS ISO/IEC 11801-1
                compliant, 750 mA per contact continuous, BS EN 60512-9-3 endurance to at least 200
                mating cycles at appropriate disconnect load. Specify the same screened-system patch
                leads from the warranty manufacturer. Specify the rack bonding bar, the bonding
                leads from each panel to the bar, and the bonding lead from the bar back to the
                building TBB (BS EN 50310). Specify T568B at every termination. At handover, channel
                certification per TIA-1152-A / BS EN 50346 to Class EA, with screen-continuity
                tested on every link, and margin reviewed at the top test frequency.
              </>
            }
            whyItMatters={
              <>
                In a 96-port high-PoE environment, the connector specification is part of the EMC /
                thermal / certification deliverable — not a parts-cost decision. The right hardware
                (modular screened keystones with verified §716.526.101 compliance, in a warranted
                Class EA system with bench-terminated keystones) gives a clean handover, a stable
                building, and a 5-year warranty that actually means something. The wrong hardware
                (cheap unshielded keystones, mixed screening, generic patch leads) gives a
                precarious certification that drifts toward fail under thermal load and a warranty
                manufacturer who walks away.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'The 8P8C ("RJ45") modular jack is the connector for Cat5e through Cat8.1. Cat8.2 / Class II is the exception — non-RJ45 (TERA / GG45). Pick keystones / patch panels of the same Category as the cable.',
              'T568B is the UK office default. Pairs 1 (blue) and 4 (brown) are identical between T568A and T568B; pairs 2 (orange) and 3 (green) are swapped. Mixing schemes at the two ends creates a stealth crossover that breaks 1000BASE-T / 10GBASE-T.',
              'Untwisted-pair length at the IDC ≤ 13 mm for Cat6A (TIA-568.2-E / BS EN 50174-2). Sloppy stripping is the single most common cause of marginal Class EA channels.',
              'Modular keystone patch panels are the 2026 high-density Cat6A default — bench termination gives the most repeatable Class EA results. Punchdown panels are still common in lower-density work; tool-less panels need verified BS EN 60512-9-3 endurance results before specifying for sustained PoE.',
              'BS 7671:2018+A4:2026 §716.526.101: connecting hardware shall comply with BS ISO/IEC 11801-1 and support 750 mA per contact continuously, plus BS EN 60512-9-3 endurance for live-disconnect cases. Combined with the §716.523.2.101 cable-side cap, every part of the PoE current path is now regulated.',
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
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2-section-5')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Installation Methods
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule2Section4;
