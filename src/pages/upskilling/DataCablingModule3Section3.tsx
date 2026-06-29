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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m3s3-cleave-quality',
    question:
      'A fusion splicer rejects a cleave with the message "cleave angle 2.4°". What is the technician\u2019s correct response?',
    options: [
      'Force-splice anyway — 2.4° is close enough to perpendicular for a good joint.',
      'Re-cleave — splicers reject angles above ~1°; strip back, clean and re-cleave.',
      'Reduce the splicer arc duration and power to compensate for the cleave angle.',
      'Adjust the connector polish grade on the ferrule before completing the splice.',
    ],
    correctIndex: 1,
    explanation:
      'Cleave geometry is decisive for splice quality. A clean cleave is perpendicular within 0.5-1° of the fibre axis, with no chips, hackles or steps in the endface. Modern fusion splicers automatically inspect the cleaved endface and reject anything outside spec — typically &gt; 1° cleave angle, visible chips or contamination. The recovery is always: strip further back into clean fibre, clean the new section with lint-free + IPA, re-cleave with a properly-set cleaver. Forcing through a marginal cleave guarantees splice loss and reduces long-term reliability.',
  },
  {
    id: 'datacabling-m3s3-fusion-vs-mech',
    question:
      'A small retrofit job needs four fibre terminations. Time pressure is high; the team has no fusion splicer. Which termination method is the appropriate fallback?',
    options: [
      'Epoxy-and-polish field connectors, treated here as the fastest of all the options.',
      'Pre-polished field connectors — 2-5 min each on a factory-polished stub.',
      'Bare-fibre crimp connectors for a rapid no-splice mechanical termination.',
      'Twist the cleaved fibre cores together and sleeve the resulting joint.',
    ],
    correctIndex: 1,
    explanation:
      'Pre-polished field connectors are the small-job / retrofit / time-pressured default. The connector body holds a factory-polished short fibre stub; the installer cleaves the field fibre, inserts it, and a mechanical splice (or in-connector fusion) bonds field fibre to stub. Time per termination drops from 10-15 minutes (epoxy-polish) to 2-5 minutes. Higher per-connector loss and shorter long-term reliability than pigtailed fusion, but workable. Epoxy-and-polish is actually the SLOWEST traditional method (cleave, glue, cure, hand-polish through grit, inspect — 10-15 min minimum per connector).',
  },
  {
    id: 'datacabling-m3s3-pigtail-vs-patchcord',
    question:
      'You are presented with a 2 m fibre cable, polished LC connector at one end, bare cleaved fibre at the other. What is this assembly called and how is it used?',
    options: [
      'A duplex patch cord, used to patch two network switches directly together.',
      'A pigtail — single-ended; the bare end fusion-splices to the field fibre.',
      'A scrap reel of offcut fibre awaiting disposal at the end of the job.',
      'An OTDR launch cord, used to set the dead-zone test reference point.',
    ],
    correctIndex: 1,
    explanation:
      'A pigtail is a factory-terminated single-ended fibre assembly: connector at one end, bare cleaved fibre at the other. In a pigtailed-fusion termination, the bare end is fusion-spliced to the field fibre and the splice is laid into a splice tray inside the patch enclosure; the connector end provides the demountable interface to the patch panel. Pigtailed-fusion gives the lowest per-termination loss (~0.05-0.1 dB splice + 0.2-0.5 dB connector pair) and is the professional default for permanent fibre terminations. A patch cord is double-ended (connector both ends).',
  },
  {
    id: 'datacabling-m3s3-loss-budget',
    question:
      'A 200 m OS2 link has 6 fusion splices and 4 connector pairs. Using typical loss values, what is the approximate end-to-end insertion loss budget the link should be tested against?',
    options: [
      'About 0.1 dB total for the whole 200 m link across all components.',
      '≈1.9 dB — 0.08 dB fibre + 0.6 dB splices + 1.2 dB connector pairs.',
      'Exactly 6 dB regardless of the splices, connectors or fibre length.',
      'It depends only on the cable length and nothing else about the link.',
    ],
    correctIndex: 1,
    explanation:
      'Link loss budget is the sum of three components: fibre attenuation (length × dB/km — for OS2 typically 0.4 dB/km at 1310 nm, lower at 1550 nm), splice loss (typically 0.05-0.1 dB per fusion splice, 0.1-0.2 dB per mechanical splice), and connector-pair loss (0.2-0.5 dB per mated pair, depending on polish and cleanliness). For a 200 m OS2 link: 0.08 + 0.6 + 1.2 ≈ 1.9 dB. Always test against the calculated budget plus a small headroom; manufacturer / specification documentation provides the exact per-component values.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the difference between a "fusion splice" and a "mechanical splice"?',
    options: [
      'Fusion arc-welds the cleaved ends into continuous glass; a mechanical splice clamps them.',
      'A fusion splice uses an electric arc while a mechanical splice uses optical index glue.',
      'They are simply two different trade names for exactly the same jointing process.',
      'Fusion splicing can only ever be used on multimode fibre, never single-mode.',
    ],
    correctAnswer: 0,
    explanation:
      'Fusion is the higher-quality, higher-tooling-cost option (a fusion splicer is £3-15k of equipment); the splice loss is very low and the joint behaves as a continuous glass fibre. Mechanical splice is field-friendly (no high-tooling investment, gel-filled aligner does the geometry), at the cost of higher loss and lower long-term reliability — gel can dry out, mechanical components can shift over years. The professional default for permanent terminations is fusion. Mechanical is a fallback for emergency repairs or budget-constrained jobs.',
  },
  {
    id: 2,
    question: 'What does a fibre cleaver actually do, and why is cleaver geometry critical?',
    options: [
      'It simply cuts straight through the glass fibre with a single sharp diamond blade.',
      'It strips the buffer coating back to expose the bare glass before splicing.',
      'It scores then fractures the glass to a clean perpendicular face for splicing.',
      'It polishes the cleaved fibre endface to the required ferrule contact grade.',
    ],
    correctAnswer: 2,
    explanation:
      'A cleaver does NOT "cut" the fibre — it scores and fractures the glass under controlled tension to give a clean, perpendicular endface. Production-grade cleavers achieve cleave angles routinely under 0.5°. Hand-held cleavers are operator-dependent. Modern fusion splicers inspect the cleave automatically and reject poor geometries. Cleaver maintenance (blade rotation / replacement, debris cleaning, V-groove cleanliness) directly drives splice quality.',
  },
  {
    id: 3,
    question:
      'What is the typical insertion-loss contribution of a single fusion splice in a single-mode link?',
    options: [
      'Typically 0.5-1.0 dB of insertion loss per single fusion splice.',
      'Typically 1-3 dB of insertion loss per single fusion splice.',
      'There is effectively no measurable insertion loss at a fusion splice.',
      'Typically 0.05-0.1 dB — well below a single mated connector pair.',
    ],
    correctAnswer: 3,
    explanation:
      'A clean fusion splice with proper cleaves is typically 0.05-0.1 dB on SM, 0.1-0.2 dB on MM. The splicer reports an estimated splice loss based on automated image analysis of the fused joint — this is an estimate, not a measurement; bidirectional OTDR is the way to get a true splice-loss measurement. Loss is dominated by core misalignment and contamination at the cleave faces.',
  },
  {
    id: 4,
    question:
      'Why is "pigtailed-fusion" the modern professional default for permanent fibre terminations?',
    options: [
      'It pairs the lowest-loss permanent fusion joint with a factory-polished connector.',
      'Because a single-ended pigtail costs less to buy than a double-ended patch cord.',
      'Because it is simply the cheapest available fibre termination method on the market.',
      'Because it avoids the need to own or hire a fusion splicer for the job at all.',
    ],
    correctAnswer: 0,
    explanation:
      'Pigtailed-fusion combines two factory-controlled processes (pigtail polish, factory inspection) with one field-controlled process (the fusion splice itself, which is highly automated). Loss budget: ~0.05-0.1 dB fusion + ~0.2-0.5 dB connector pair at the demountable interface. Compare to field-polished epoxy connectors (~0.5-1 dB per connector with widely variable consistency) or mechanical-splice connectors (~0.5-1 dB, lower long-term reliability). Pigtailed-fusion is also the most maintainable — a damaged connector is replaced by re-splicing onto a new pigtail, no field polishing required.',
  },
  {
    id: 5,
    question: 'What is the appropriate fibre handling protocol from drum to splice tray?',
    options: [
      'Pull and splice as fast as possible — installation speed is the only priority here.',
      'Strip everything in the field, splice on site, and lay the bare fibres loose in the box.',
      'Pull within limits, route with slack, clean, cleave, splice, sleeve and lay in the tray.',
      'Insist on outdoor-rated armoured cable for the whole route regardless of the path.',
    ],
    correctAnswer: 2,
    explanation:
      'Fibre handling is process-driven. Pull tension and bend radius limits in BS EN 50174-2 protect the cable mechanical integrity during install. Slack management at the splice tray is what protects the fibres from minimum-bend-radius violations as the tray is opened, repositioned, or has additional splices added later. Cleanliness at the cleave (lint-free wipe + IPA) is what gives the splicer a clean glass surface to fuse. Heat-shrink splice protectors mechanically and environmentally protect the bare-glass joint. Skipping any step costs splice loss, reliability, or both.',
  },
  {
    id: 6,
    question: 'What is a "fusion-splice-on connector" (FSOC) and where is it used?',
    options: [
      'A fibre connector permanently moulded onto the cable end at the factory.',
      'A passive coupling device used purely to join two fibre patch panels together.',
      'A handheld measurement tool for checking field termination insertion loss.',
      'A field connector with a factory-polished stub the field fibre fusion-splices to.',
    ],
    correctAnswer: 3,
    explanation:
      'FSOCs are the modern fast-deployment field connector. They give close-to-pigtail quality (factory polish on the connector ferrule end, fusion bond inside the connector body) without needing a separate splice tray. Used for retrofits, OPS (outside-plant) field repairs, FTTH access drops. Compared with mechanical-splice connectors, FSOCs have lower loss and longer service life; compared with pigtailed-fusion in a tray, they are slightly higher loss and have a shorter service life because the splice is constrained inside the connector. The right tool depends on the installation context.',
  },
  {
    id: 7,
    question:
      'A junior asks: "the cleaver blade looks fine — why does my cleaver keep producing &gt; 2° cleaves?"',
    options: [
      'Cleaver maintenance — a worn blade, contaminated V-groove or mis-set clamping.',
      'The fibre itself is faulty along that section and the reel needs discarding.',
      'The fibre is multimode rather than single-mode and cannot be cleaved cleanly.',
      'The cleaver is beyond field repair and must be returned to the manufacturer.',
    ],
    correctAnswer: 0,
    explanation:
      'A cleaver is a precision tool with a hard service-cycle life. Production cleavers track blade-cycle counts and prompt blade rotation or replacement at thresholds. V-groove contamination from previous cleaves is one of the most common causes of bad cleave angles — the fibre is not held perpendicular to the score-and-fracture path. Cleaning protocol: lint-free wipe with IPA on the V-groove between every few cleaves, blade rotation per manufacturer guidance, periodic full service.',
  },
  {
    id: 8,
    question:
      'A field connector kit advertises "0.3 dB typical loss". What does that mean in practice for a 4-connector channel?',
    options: [
      'The total channel loss is 0.3 dB shared across all four connector pairs.',
      'The figure applies only to single-mode links and never to multimode links.',
      'It is 0.3 dB per pair — four pairs is 1.2 dB before fibre and splice loss.',
      'It is a pure marketing figure with no real technical meaning for budgets.',
    ],
    correctAnswer: 2,
    explanation:
      'Connector loss adds up. A "typical 0.3 dB" connector pair across 4 mating points consumes 1.2 dB of channel budget — meaningful on a tight Ethernet link. The discipline: calculate the link budget (fibre loss + splice loss + connector loss × number of connector pairs) and compare against the standard\u2019s allowed channel loss for the target service. Budget headroom should be at least 1 dB to absorb future patching, ageing, and minor contamination. If the budget is tight, choose lower-loss connectors (factory-polished pigtails) over higher-loss field connectors.',
  },
  {
    id: 9,
    question:
      'What is the role of a "splice protector" sleeve, and why must one be applied to every fusion splice?',
    options: [
      'It is decorative, colour-coding each spliced fibre as it sits in the splice tray.',
      'It provides electrical insulation of the spliced joint and nothing more.',
      'It is optional, and is only really needed in damp or outdoor environments.',
      'It mechanically and environmentally protects the fragile bare-glass joint.',
    ],
    correctAnswer: 3,
    explanation:
      'A splice protector is mandatory. The fused glass joint is fragile until the protector is applied — even small bends will fracture it. Standard protector: 40 mm or 60 mm transparent heat-shrink with internal stainless reinforcement, adhesive lining. Apply BEFORE moving the fibre, shrink with the splicer\u2019s integral oven, allow to cool, then route into the splice tray. Production splicers track and prompt the protector application step automatically.',
  },
  {
    id: 10,
    question:
      'For a permanent termination on a critical infrastructure link (e.g. a campus backbone), which termination method is the most appropriate?',
    options: [
      'Pigtailed fusion-splice into a patch panel — lowest-loss and longest service life.',
      'A mechanical-splice field connector chosen mainly for fast installation speed.',
      'A pre-polished field connector chosen mainly to keep the material cost down.',
      'A bare-fibre crimp connector chosen for a quick on-site mechanical termination.',
    ],
    correctAnswer: 0,
    explanation:
      'For critical or long-life terminations, pigtailed fusion is the right answer. Total per-termination loss is 0.25-0.6 dB (fusion + connector pair); long-term reliability is the highest of any field termination method; replacement of a damaged connector is a single re-splice onto a new pigtail. Mechanical-splice and pre-polished connectors are appropriate for time-pressured or budget-constrained small jobs, OPS repairs, or temporary terminations — not for critical permanent infrastructure.',
  },
];

const faqs = [
  {
    question: 'What does a fusion splicer cost, and is one needed on every job?',
    answer: (
      <>
        Production fusion splicers (core-alignment, automated cleave inspection) cost £3 000-£15 000
        depending on accuracy class and feature set. They are the right tool for any permanent /
        production fibre work — the per-termination quality and long-term reliability justify the
        investment quickly on volume work. For very small jobs, retrofits, or emergency repairs,
        fusion-splice-on connectors (FSOCs) or mechanical-splice connectors are the fallback — each
        is 2-5 minutes per termination, no separate splice tray, at the cost of higher per-connector
        loss and shorter service life.
      </>
    ),
  },
  {
    question: 'How long does a fusion splice last, and does it ever fail?',
    answer: (
      <>
        A correctly-made fusion splice in a properly-protected splice tray is functionally permanent
        — the glass-to-glass fusion is essentially a continuous fibre, and field installations from
        the 1990s are still operating at original loss. Failure modes are mechanical: tray-handling
        damage (someone moves the tray and the fibre flexes inside the protector), water ingress on
        outside-plant joints, or rodent / mechanical damage on unprotected outdoor cable. Mechanical
        splices have shorter service life because the gel can dry out and the alignment fixtures can
        shift over decades — a fusion splice is the long-life option.
      </>
    ),
  },
  {
    question: 'Why does the cleave matter so much?',
    answer: (
      <>
        The cleave is what the fusion arc sees, or what the mechanical-splice fixture aligns. A
        clean cleave gives a perpendicular, mirror-flat glass face with no chips, hackles or steps;
        the splicer can fuse it into a continuous fibre with negligible loss. A poor cleave (angle
        &gt; 1°, chipped, contaminated) gives the splicer two faces that cannot align cleanly, so
        the fused joint either fails the splicer\u2019s self-test or splices with elevated loss.
        Cleaver geometry, blade life, V-groove cleanliness and clamping force are all critical — and
        all controllable through routine cleaver maintenance.
      </>
    ),
  },
  {
    question: 'What is "polarity" in the splicing context vs the connector context?',
    answer: (
      <>
        At a fibre splice, polarity means: which fibre at the input side of the tray fuses to which
        fibre at the output side. In a 12-fibre cable, the convention is fibre-1-to- fibre-1,
        fibre-2-to-fibre-2, etc. (TIA-598-D colour conventions: blue, orange, green, brown, slate,
        white, red, black, yellow, violet, rose, aqua). At the connector, polarity means: which
        fibre at the patch panel connects to which fibre at the far end (transmit meets receive).
        Polarity discipline is end-to-end — a wrong splice in the tray propagates as a wrong
        polarity at the connector, and the link will not come up.
      </>
    ),
  },
  {
    question: 'Are there any UK regulatory rules that govern fibre termination?',
    answer: (
      <>
        BS 7671 does not directly govern fibre termination practice — that lives in BS EN 50174-1 /
        -2 (cabling installation), BS EN 50346 (field testing), and the IEC 61300-3-35 endface
        acceptance standard. BS 7671 §444.4.9 (separate buildings — verbatim) prefers metal-free
        fibre between buildings; §521.10.202 (verbatim) requires steel containment / clips for cable
        support including fibre. Where a fibre cable carries a metallic strength member or armour,
        BS 7671 §444 / §545 bonding rules apply to the metallic element. Fire-rated cable
        (Cca-s1b,d1,a1 typical for in-building) is set by BS EN 50575 / Construction Products
        Regulation. Laser safety of any active OFCS system is BS EN 60825-2 — Class 1 / 1M / 3R,
        never look into an active fibre with the naked eye.
      </>
    ),
  },
  {
    question: 'Should I terminate fibre myself or sub-contract it to a fibre specialist?',
    answer: (
      <>
        Decision factors: volume of fibre work, capital tooling cost, depth of training. A general
        electrical contractor doing one or two fibre projects a year is usually better
        sub-contracting the fibre splicing to a specialist with their own splicer, cleaver, OTDR and
        trained operatives. A contractor doing regular volume — campus jobs, data-centre builds,
        multi-tenant fit-outs — should bring fibre termination in-house: tooling cost amortises
        across the work, operatives gain repeated practice (cleaver maintenance, splice-tray
        management, polarity discipline, OTDR interpretation are skills that fade without volume),
        and project margin improves. Where fibre is sub-contracted, the main contractor remains
        responsible for routing, containment, support per §521.10.202 and the layered standards
        stack.
      </>
    ),
  },
];

const DataCablingModule3Section3 = () => {
  const navigate = useNavigate();

  useSEO(
    'Cleaving, Splicing and Connectorisation | Data Cabling Module 3.3 | Elec-Mate',
    'Fibre termination practice — fusion vs mechanical splice, pre-polished and fusion-splice-on connectors, cleaver geometry, splice loss budgets, pigtails and patchcords, and the discipline of inspect-clean-cleave-splice-protect that delivers low-loss long-life terminations.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3"
            title="Cleaving, Splicing and Connectorisation"
            description="Fibre termination practice — fusion vs mechanical splice, pre-polished and fusion-splice-on field connectors, cleaver geometry, splice loss budgets, pigtails vs patch cords, and the discipline of inspect-clean-cleave-splice-protect that delivers low-loss, long-life terminations."
            tone="yellow"
          />

          <TLDR
            points={[
              'Two splice technologies: fusion (electric arc fuses two cleaved fibres into one continuous glass, ~0.05-0.1 dB loss, very high reliability) and mechanical (gel-filled aligner clamps the fibres, ~0.1-0.2 dB loss, faster but shorter life). Fusion is the professional default; mechanical is the field / emergency fallback.',
              'Three connectorisation paths: factory-pigtailed fusion (lowest loss, highest reliability, professional default for permanent terminations), pre-polished field connectors / FSOCs (2-5 minutes per termination, ~0.1-0.5 dB loss, retrofit and small-job choice), and traditional epoxy-and-polish (slow, high-skill, mostly obsolete).',
              'Cleave geometry is decisive. Cleave angle ≤ 0.5-1° from perpendicular, no chips, no contamination — modern fusion splicers reject anything outside spec. Cleaver maintenance (V-groove cleanliness, blade rotation / replacement, clamp calibration) drives splice quality directly.',
              'Loss budget = fibre attenuation + splice loss + connector-pair loss. Calculate before picking connector grade. Budget headroom of at least 1 dB absorbs ageing, future patching, and minor contamination. Always test against the calculated budget on commissioning.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish fusion splicing from mechanical splicing by mechanism, typical loss, and long-term reliability',
              'Identify factory-pigtailed fusion, pre-polished field connectors and fusion-splice-on connectors as the three modern termination paths, and choose between them by job context',
              'Explain the role of a cleaver and the geometric / cleanliness criteria that determine cleave quality',
              'Define a pigtail and a patch cord, and explain why pigtailed fusion into a patch panel is the modern professional default',
              'Calculate a link insertion-loss budget from fibre attenuation, splice count and connector-pair count, and compare against the channel budget for the target Ethernet variant',
              'Apply the inspect-clean-cleave-splice-protect handling protocol from drum to splice tray, including bend radius and slack management per BS EN 50174-2',
              'Identify and respond to common cleaver / splicer failures (cleave angle out of tolerance, V-groove contamination, clamping mis-set, splicer arc failure)',
              'State the BS EN 60825-2 laser-safety discipline relevant to active fibre termination work and the BS 7671 §444.4.9 / §521.10.202 hooks for fibre cable handling',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The two splice technologies</ContentEyebrow>

          <ConceptBlock
            title="Fusion vs mechanical splice — what each is and where each belongs"
            plainEnglish="A splice is a permanent join between two cleaved fibre ends. There are two technologies. Fusion splicing uses a precisely-controlled electric arc inside a fusion splicer to melt and fuse the two glass ends into a continuous fibre — essentially a near-zero-loss permanent joint. Mechanical splicing uses a small mechanical fixture (often gel-filled to index-match the glass) to physically align and clamp two cleaved fibres without fusing them — quicker to install in the field but higher loss and shorter service life."
            onSite="On a production fibre install you carry a fusion splicer and use it. On a small retrofit or an outside-plant emergency repair, mechanical-splice connectors or fusion-splice-on connectors (FSOCs) are the field fallback. The decision is driven by volume, time pressure, and the long-term reliability target: fusion for permanent / critical, mechanical for fast / small / emergency."
          >
            <p>The two technologies, contrasted:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Fusion splice.</strong> Fusion splicer holds two cleaved fibres in precision
                V-grooves, aligns them (cladding-aligned or core-aligned in higher-end splicers),
                strikes a controlled electric arc at the joint that melts the glass, and the two
                fibres fuse into a continuous filament. Loss typically 0.05-0.1 dB (SM) or 0.1-0.2
                dB (MM). Splice protector applied immediately, then laid into a splice tray.
                Long-term reliability is essentially the cable\u2019s — the splice is continuous
                glass.
              </li>
              <li>
                <strong>Mechanical splice.</strong> Cleaved fibres are inserted into opposite ends
                of a small mechanical fixture (typically 60 mm long), which uses precision V-
                grooves and (often) an index-matching gel to align the cores. A clamp or wedge holds
                the alignment. Loss typically 0.1-0.2 dB. Service life shorter than fusion — gel can
                dry out, mechanical components can shift over decades. The fixture itself is
                consumable.
              </li>
            </ul>
            <p>
              Both technologies require a clean perpendicular cleave on each fibre — cleave quality
              is decisive for either method. A fusion splicer with poor cleaves splices with
              elevated loss; a mechanical splice with poor cleaves has unstable alignment. Cleave
              first, splice second.
            </p>
          </ConceptBlock>

          {/* Splice / pigtail diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Pigtailed-fusion termination — five stages from field cable to patch panel
            </h4>
            <svg
              viewBox="0 0 900 540"
              className="w-full h-auto"
              role="img"
              aria-label="Five-stage pigtailed-fusion fibre termination, laid out left to right with each stage in its own cell. Stage 1: strip the field cable. Stage 2: cleave the buffered fibre. Stage 3: fusion-splice arc joins field fibre to the bare cleave end of a factory pigtail. Stage 4: heat-shrink splice protector. Stage 5: pigtail LC connector plugs into the patch panel adapter. Stage numbers and labels appear above each cell, brief description below. A legend at the bottom records loss contributions, tray rules, safety and regulations."
            >
              {/* ===== Stage labels — title row above all cells ===== */}
              {[
                { x: 100, num: '1', title: 'STRIP', colour: '#A855F7', light: '#E9D5FF' },
                { x: 260, num: '2', title: 'CLEAVE', colour: '#22D3EE', light: '#A5F3FC' },
                { x: 420, num: '3', title: 'FUSION ARC', colour: '#F97316', light: '#FED7AA' },
                { x: 580, num: '4', title: 'PROTECT', colour: '#22C55E', light: '#BBF7D0' },
                { x: 740, num: '5', title: 'PATCH', colour: '#FACC15', light: '#FDE68A' },
              ].map((s, i) => (
                <g key={'stl-' + i}>
                  <circle
                    cx={s.x}
                    cy="32"
                    r="14"
                    fill={s.colour}
                    stroke={s.light}
                    strokeWidth="1.4"
                  />
                  <text
                    x={s.x}
                    y="37"
                    textAnchor="middle"
                    fill="#0a0a0a"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="system-ui"
                  >
                    {s.num}
                  </text>
                  <text
                    x={s.x + 24}
                    y="37"
                    fill={s.light}
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="system-ui"
                    letterSpacing="0.06em"
                  >
                    {s.title}
                  </text>
                </g>
              ))}

              {/* ===== Cell row — five stage cells ===== */}
              {[20, 180, 340, 500, 660].map((x, i) => (
                <rect
                  key={'cell-' + i}
                  x={x}
                  y="60"
                  width="140"
                  height="200"
                  rx="10"
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1"
                />
              ))}

              {/* Stage 1 — Strip: field cable jacket peeled back, fibre exposed */}
              <rect
                x="35"
                y="140"
                width="60"
                height="40"
                rx="6"
                fill="rgba(168,85,247,0.20)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <line x1="95" y1="160" x2="145" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              <text
                x="90"
                y="200"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Outer jacket
              </text>
              <text
                x="90"
                y="216"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                + aramid removed
              </text>
              <text
                x="90"
                y="240"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                250 µm fibre exposed
              </text>

              {/* Stage 2 — Cleave: fibre with cleave plane shown */}
              <line x1="195" y1="160" x2="270" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              <line
                x1="270"
                y1="146"
                x2="270"
                y2="174"
                stroke="#22D3EE"
                strokeWidth="2"
                strokeDasharray="3 2"
              />
              <line x1="280" y1="160" x2="305" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              <text
                x="250"
                y="200"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Diamond cleaver
              </text>
              <text
                x="250"
                y="216"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                perpendicular score
              </text>
              <text
                x="250"
                y="240"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                ≤ 0.5° cleave angle
              </text>

              {/* Stage 3 — Fusion arc: two fibre ends + arc */}
              <line x1="355" y1="160" x2="408" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              <line x1="432" y1="160" x2="485" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              {/* Arc indicator */}
              <circle
                cx="420"
                cy="160"
                r="10"
                fill="rgba(249,115,22,0.40)"
                stroke="#F97316"
                strokeWidth="1.6"
              />
              <line x1="416" y1="148" x2="420" y2="156" stroke="#FED7AA" strokeWidth="1.4" />
              <line x1="424" y1="148" x2="420" y2="156" stroke="#FED7AA" strokeWidth="1.4" />
              <line x1="416" y1="172" x2="420" y2="164" stroke="#FED7AA" strokeWidth="1.4" />
              <line x1="424" y1="172" x2="420" y2="164" stroke="#FED7AA" strokeWidth="1.4" />
              <text
                x="410"
                y="200"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Electrode arc
              </text>
              <text
                x="410"
                y="216"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                fuses two endfaces
              </text>
              <text
                x="410"
                y="240"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                ~ 0.05 dB SM splice
              </text>

              {/* Stage 4 — Protect: heat-shrink sleeve */}
              <line x1="515" y1="160" x2="535" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              <rect
                x="535"
                y="148"
                width="60"
                height="24"
                rx="8"
                fill="rgba(34,197,94,0.22)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <line x1="595" y1="160" x2="615" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              <text
                x="565"
                y="200"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Heat-shrink sleeve
              </text>
              <text
                x="565"
                y="216"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                over the splice
              </text>
              <text
                x="565"
                y="240"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                protects bare glass
              </text>

              {/* Stage 5 — Patch: pigtail connector into adapter */}
              <line x1="675" y1="160" x2="700" y2="160" stroke="#FACC15" strokeWidth="2.2" />
              <rect
                x="700"
                y="148"
                width="40"
                height="24"
                rx="4"
                fill="rgba(234,179,8,0.30)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <rect
                x="745"
                y="138"
                width="40"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="730"
                y="200"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                Pigtail LC plug
              </text>
              <text
                x="730"
                y="216"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10"
                fontFamily="system-ui"
              >
                into panel adapter
              </text>
              <text
                x="730"
                y="240"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                ~ 0.3 dB conn pair
              </text>

              {/* ===== Legend / footer band ===== */}
              <rect
                x="20"
                y="290"
                width="860"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="40"
                y="316"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LOSS BUDGET PER TERMINATION
              </text>

              <rect
                x="40"
                y="328"
                width="14"
                height="14"
                rx="3"
                fill="rgba(249,115,22,0.40)"
                stroke="#F97316"
                strokeWidth="1.4"
              />
              <text x="64" y="340" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Fusion splice ~ 0.05–0.1 dB SM · 0.1–0.2 dB MM · arc-test pass
              </text>

              <rect
                x="40"
                y="350"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.30)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text x="64" y="362" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Connector pair ~ 0.2–0.5 dB · IEC 61300-3-35 endface check
              </text>

              <rect
                x="40"
                y="372"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.22)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="64" y="384" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Heat-shrink sleeve over every splice — non-optional mechanical protection
              </text>

              <line
                x1="40"
                y1="400"
                x2="860"
                y2="400"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              <text
                x="40"
                y="424"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                TRAY · SAFETY · REGS
              </text>

              <text
                x="40"
                y="448"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                TRAY
              </text>
              <text x="120" y="448" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                300 mm minimum slack loop · respect bend radius · BS EN 50174-2
              </text>

              <text
                x="40"
                y="472"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                SAFETY
              </text>
              <text x="120" y="472" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                BS EN 60825-2 · never view an active fibre with the naked eye
              </text>

              <text
                x="40"
                y="496"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                REGS
              </text>
              <text x="120" y="496" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                BS 7671 §444.4.9 metal-free between buildings · §521.10.202 fire-collapse support
              </text>

              <text
                x="40"
                y="520"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RECORD
              </text>
              <text x="120" y="520" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                As-built per BS EN 50174-1 §6 / TIA-606-D — splice tray layouts in the records
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The connectorisation paths</ContentEyebrow>

          <ConceptBlock
            title="Pigtails, patch cords, pre-polished and fusion-splice-on connectors"
            plainEnglish="A patch cord is a factory-terminated DOUBLE-ended fibre — connector both ends, finished length. A pigtail is factory-terminated SINGLE-ended — connector at one end, bare cleaved fibre at the other, used for fusion-splicing onto field cable inside a splice tray. Pre-polished field connectors and fusion-splice-on connectors (FSOCs) are field-installable connector bodies that contain a factory-polished short fibre stub, allowing the installer to terminate a field cable directly into a connector without a splice tray."
            onSite="Modern fibre installation gives the contractor four termination options. Each suits a different job context. The professional default for permanent terminations is pigtailed-fusion (lowest loss, longest life, splice-tray housed). Field connectors are appropriate for retrofits, small jobs, and OPS field repairs."
          >
            <p>The four termination options:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Pigtailed-fusion.</strong> Strip the field cable, route fibres into a splice
                tray, fusion-splice each field fibre to a factory-polished pigtail, sleeve the
                splice with a heat-shrink protector, lay into the tray, plug the pigtail into the
                patch panel adapter. Total loss per termination: ~0.05-0.1 dB splice + 0.2-0.5 dB
                connector pair. Service life: cable lifetime. The professional default.
              </li>
              <li>
                <strong>Fusion-splice-on connector (FSOC).</strong> Field-installable connector with
                an internal factory-polished fibre stub and an internal fusion cavity. Cleave the
                field fibre, insert into the connector, fusion-splice (with the splicer or
                inside-the-connector splicer). Total loss ~0.1-0.2 dB. No splice tray needed — the
                splice is captured in the connector. Used for retrofits, OPS field repairs, FTTH
                access drops.
              </li>
              <li>
                <strong>Pre-polished mechanical-splice connector.</strong> Field-installable
                connector with an internal factory-polished fibre stub and an internal mechanical
                splice (gel-filled aligner). Cleave the field fibre, insert, clamp. Total loss
                ~0.3-0.5 dB. No splice tray, no fusion splicer. Quickest field option but shorter
                service life and higher loss than FSOC.
              </li>
              <li>
                <strong>Traditional epoxy-and-polish field connector.</strong> Cleave, glue with
                two-part epoxy into the connector, cure (heat or ambient), hand-polish through
                graded grit on a polish puck, inspect. 10-15 minutes per connector, high skill
                requirement, widely variable consistency. Mostly obsolete; replaced by FSOC and
                pre-polished mechanical-splice for new work.
              </li>
            </ul>
            <p>
              Patch cords (double-ended) are not a "termination method" in the same sense — they are
              factory-finished interconnect cables that plug into both ends of an already-
              terminated cabling system. Their job is to interconnect the fixed cabling with the
              active equipment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50174-2:2018+A2:2024 (Cabling installation — practices inside buildings, paraphrased)"
            clause={
              <>
                Optical fibre cables shall be installed within manufacturer pulling-tension and
                bend-radius limits. Splice trays shall provide a minimum slack loop sufficient to
                respect the cable\u2019s minimum bend radius under all foreseeable handling
                conditions. Splices shall be mechanically protected (heat-shrink splice protector or
                equivalent) before laying into the tray. Cable identification and the as-built
                record shall include the splice locations and the splice tray layouts.
              </>
            }
            meaning="Fibre handling discipline is process-driven and standards-driven. Pulling tension and bend radius (typically 10× outer diameter unloaded, 20× loaded) are mechanical requirements that protect the glass during install. Splice trays exist to hold splices in a controlled-bend, environmentally-protected enclosure. Splice protectors are not optional — the bare-glass joint is fragile until the protector is applied. The as-built record (per BS EN 50174-1 §6 and TIA-606-D) is what lets the next contractor find the splice in five years\u2019 time."
            cite="Paraphrased from BS EN 50174-2 — refer to the printed standard for the verbatim clause text"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cleavers and splice loss budgets</ContentEyebrow>

          <ConceptBlock
            title="Cleaver geometry, cleaver maintenance, and the calculated link budget"
            plainEnglish="A cleaver scores the cladding with a precisely-positioned diamond or ceramic blade and applies a controlled tensile / bending force to fracture the fibre cleanly across a single perpendicular plane. Cleave quality is the upstream determinant of splice quality. Once you have clean cleaves, splice loss is the calculated sum of fibre attenuation (length × dB/km), splice loss (per fusion or mechanical splice), and connector-pair loss (per mated pair). The total is the link insertion-loss budget you commission against."
            onSite="Cleaver service life is finite. Production cleavers track blade-cycle counts and prompt blade rotation (most cleavers have 12-16 angular blade positions) or replacement at thresholds. V-groove cleanliness is the most common cause of bad cleaves — clean the V-groove with a lint-free wipe and IPA between every few cleaves. The calculated link budget is the number you test against on commissioning — not a pass / fail in itself, but the reference for what good looks like."
          >
            <p>Cleaver maintenance, briefly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>V-groove cleanliness.</strong> The V-groove holds the fibre perpendicular to
                the score-and-fracture path. Debris from previous cleaves (glass dust, buffer
                fragments) deflects the fibre and degrades cleave angle. Clean every few cleaves.
              </li>
              <li>
                <strong>Blade life.</strong> Diamond or ceramic blades wear with cycle count. Most
                cleavers have multiple angular positions on a rotational blade — advance the blade
                to a fresh position when cleave quality drops, replace the blade per manufacturer
                guidance.
              </li>
              <li>
                <strong>Clamping force.</strong> The fibre clamps must hold the fibre firmly without
                crushing it. Mis-set clamps allow the fibre to slip during the fracture step, giving
                angled or hackled cleaves.
              </li>
              <li>
                <strong>Fibre stripping length.</strong> Most cleavers require the fibre to be
                stripped to a specific length before insertion — too long or too short throws off
                the clamp / V-groove geometry. Use the cleaver\u2019s fixture or a tape measure.
              </li>
            </ul>
            <p>
              The link insertion-loss budget — the number you test against on commissioning — is the
              sum:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fibre attenuation:</strong> link length (km) × cable attenuation (dB/km).
                For OS2 single-mode at 1310 nm: 0.4 dB/km maximum specification (typically 0.32-0.38
                dB/km in practice). For OM4 multimode at 850 nm: ~3.5 dB/km. At 1300 nm multimode is
                around 1.5 dB/km.
              </li>
              <li>
                <strong>Splice loss:</strong> 0.05-0.1 dB per fusion splice (SM or MM), 0.1-0.2 dB
                per mechanical splice. Multiply by the number of splices in the link.
              </li>
              <li>
                <strong>Connector-pair loss:</strong> 0.2-0.5 dB per mated connector pair (clean,
                inspected). Multiply by the number of connector pairs in the channel — usually 4
                (one at each end of the field cable, plus patch leads at each end), but count
                carefully.
              </li>
            </ul>
            <p>
              Add a small budget headroom (typically 1 dB) for ageing, future patching, minor
              contamination. Test against the budget at commissioning. If you exceed budget, you
              have a problem — usually a contaminated connector or a marginal splice.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Typical loss budget components for an OS2 single-mode link"
            source="ISO/IEC 11801 / TIA-568.3-E typical / BS EN 50346 testing values"
            headers={['Component', 'Per unit', 'Notes']}
            rows={[
              [
                'OS2 fibre at 1310 nm',
                '0.4 dB/km max (typical 0.32-0.38)',
                'Lower at 1550 nm (~0.25 dB/km)',
              ],
              ['OS1 / OS1a fibre indoor', '~1.0 dB/km', 'Tight-buffered indoor'],
              ['OM4 fibre at 850 nm', '~3.5 dB/km', 'Lower at 1300 nm (~1.5 dB/km)'],
              ['Fusion splice (SM)', '0.05-0.1 dB typical', 'Modern core-aligned splicer'],
              ['Fusion splice (MM)', '0.1-0.2 dB typical', 'Cladding-aligned splicer'],
              ['Mechanical splice', '0.1-0.2 dB typical', 'Gel-filled fixture'],
              [
                'Connector pair (mated, clean)',
                '0.2-0.5 dB typical',
                'Per IEC 61300-3-35 inspection',
              ],
              [
                'Connector pair (contaminated)',
                '1-3 dB or worse',
                'Cause: failure to inspect / clean',
              ],
            ]}
            notes="Loss budget = (fibre length × dB/km) + (splice count × splice loss) + (connector-pair count × pair loss) + headroom. Always reference manufacturer specifications and standard channel budgets for the target Ethernet variant. Numbers above are typical industry values; published manufacturer datasheets are the source of truth for any specific cable / connector / splicer."
          />

          <CommonMistake
            title="Mating a contaminated connector and 'just shrugging' when the link runs marginal"
            whatHappens={
              <>
                Installer is rushing on a Friday afternoon, inspects no connectors, mates everything
                visible. Two of the four connectors in the channel are slightly contaminated; each
                contributes ~1.5 dB of insertion loss instead of the budgeted 0.3 dB. The channel
                passes the bidirectional loss test by a hair on day one but fails three weeks later
                when transceiver power output drifts down naturally with thermal age. Service is
                intermittent. Diagnostic time on the recovery is hours.
              </>
            }
            doInstead={
              <>
                Inspect every connector with a fibre microscope or video probe per IEC 61300-3-35
                BEFORE mating. Clean if not pass. Re-inspect. Mate. Document the inspection result
                in the as-built record. The five minutes per connector is not optional — it is the
                difference between a link that works for fifteen years and one that fails when
                conditions drift slightly. Cleanliness is part of the loss budget, not extra work.
              </>
            }
          />

          <Scenario
            title="A 280 m OS2 inter-building link with two intermediate splice points"
            situation={
              <>
                A new campus job. 280 m OS2 single-mode fibre run between buildings, two
                intermediate hand-hole splice closures along the duct route. The fibre will carry
                10GBASE-LR (single-mode 1310 nm) initially, with capacity for 25GBASE-LR upgrade in
                5 years. You are the design / install lead.
              </>
            }
            whatToDo={
              <>
                Calculate the link budget at 1310 nm: fibre attenuation 0.28 km × 0.4 dB/km = 0.11
                dB; splice loss 4 fusion splices × 0.1 dB = 0.4 dB (one splice at each hand-hole,
                plus one at each building termination); connector-pair loss 2 mated pairs × 0.4 dB =
                0.8 dB; total ~1.3 dB. 10GBASE-LR has a 6.2 dB transceiver budget for OS2 — the link
                sits well inside, with comfortable headroom for 25GBASE-LR upgrade. Specify
                pigtailed-fusion at each building termination, fusion splice in hand-hole closures
                with mechanical protection and bend-radius compliance, and bidirectional OTDR
                commissioning to capture every splice and connector. Specify metal-free OS2
                outside-plant cable (BS 7671 §444.4.9 — verbatim — prefers metal-free fibre between
                buildings). Document the as-built with splice locations, tray layouts, connector
                polish grade, OTDR traces, and the calculated link budget.
              </>
            }
            whyItMatters={
              <>
                A campus link is a long-life asset. Pigtailed-fusion at each end gives the lowest-
                loss, longest-life termination. Outside-plant splice closures protect the hand-hole
                splices from water ingress and mechanical disturbance. Metal-free OS2 eliminates the
                §444.4.9 inter-building bonding concern. Bidirectional OTDR commissioning captures
                the link signature at day one, so any future drift can be diagnosed against a known
                baseline. The as-built record is what makes the link maintainable in 5, 10, 15
                years. The 1.3 dB budget vs the 6.2 dB transceiver budget gives headroom for ageing,
                future patching, and the 25GBASE-LR upgrade.
              </>
            }
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Two splice technologies: fusion (electric arc, ~0.05-0.1 dB, professional default) and mechanical (gel-filled aligner, ~0.1-0.2 dB, field fallback). Fusion for permanent / critical, mechanical for fast / small.',
              'Four termination options: pigtailed-fusion (lowest loss, longest life — the professional default), FSOC (field, ~0.1-0.2 dB), pre-polished mechanical-splice connector (field, ~0.3-0.5 dB), traditional epoxy-and-polish (slow, mostly obsolete).',
              'Cleave geometry is decisive. Cleave angle ≤ 0.5-1° from perpendicular, no chips, no contamination. Cleaver maintenance (V-groove cleanliness, blade rotation, clamp calibration) drives splice quality.',
              'Loss budget = fibre attenuation + splice loss + connector-pair loss + headroom. Calculate before commissioning, test against the calculated budget, document the as-built loss.',
              'Splice protectors are mandatory — the bare-glass joint is fragile until protected. Slack management at the splice tray respects bend radius. BS EN 50174-2 covers the install-practice rules; BS EN 60825-2 covers laser safety.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Connectors and polish
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Loss budgets and OTDR basics
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule3Section3;
