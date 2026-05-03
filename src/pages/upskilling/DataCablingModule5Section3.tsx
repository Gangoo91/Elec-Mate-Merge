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
    id: 'datacabling-m5s3-stranded-vs-solid',
    question:
      'Why is a patch cord made from stranded conductor cable, and a permanent link from solid conductor cable?',
    options: [
      'They are interchangeable; the choice is arbitrary.',
      'Stranded conductors flex without breaking, which a patch cord needs because it is moved every time a device is plugged or unplugged. Solid conductors are stiffer, slightly lower in attenuation per metre, and tolerate the higher pulling tension of a long horizontal run, which a permanent link needs because it is pulled once through containment and then never moved.',
      'Stranded is for shielded, solid is for unshielded.',
      'Stranded carries PoE; solid does not.',
    ],
    correctIndex: 1,
    explanation:
      'A patch cord is a short flexible cable that gets moved frequently — plugged, unplugged, re-routed across the patch field — and needs to survive thousands of flex cycles without conductor breakage. Stranded conductor (typically 7 strands of 32 AWG making up 24 AWG total) is designed for that flex cycle life. Solid conductor (single wire, typically 23 AWG for Cat6A) is designed for the permanent link: pulled once through containment under controlled tension, terminated at both ends, and then never moved. Solid conductor has slightly lower attenuation per metre and is what the IDC slot in a patch panel or keystone is sized for. The two cable types are not interchangeable — using stranded in a permanent link increases attenuation and may not seat properly in the IDC; using solid in a patch cord cracks at the first sharp bend.',
  },
  {
    id: 'datacabling-m5s3-cord-attenuation',
    question:
      'A patch cord at 5 m has measurably higher attenuation per metre than the solid-conductor cable in the permanent link of the same Class EA channel. Why is this still acceptable?',
    options: [
      'It is not acceptable; the patch cord should be replaced.',
      'The 100 m channel rule already accounts for it. The 90 m permanent-link / 10 m cord allowance is set deliberately so that the cord allowance — 10 m of higher-attenuation stranded cable — fits inside the channel insertion-loss budget. Stranded cord cable is rated to a slightly different (more generous) per-metre attenuation than solid permanent-link cable; the budget accommodates this.',
      'Patch cords do not need to meet Class EA.',
      'Cord attenuation does not affect the channel.',
    ],
    correctIndex: 1,
    explanation:
      'The 100 m channel model is engineered around two distinct cable populations: the solid-conductor permanent link and the stranded-conductor cords. Stranded cable is rated to a higher per-metre attenuation because its electrical properties are slightly worse at the same gauge. The standards (TIA-568.2-E / ISO/IEC 11801-1 / BS EN 50173-1) account for this by allocating just 10 m to stranded and 90 m to solid, sized so the worst-case channel insertion loss fits inside Ethernet equipment expectations. As long as the patch cord is rated to the Category and the total cord allowance is ≤ 10 m, the channel passes Class EA. Using non-rated cord cable, or cord cable at the wrong gauge, breaks the budget.',
  },
  {
    id: 'datacabling-m5s3-flex-cycles',
    question:
      'A new building specification calls for "flex-rated patch cords with locking RJ45 plugs and snagless boots". What is the practical reason for each of those three features?',
    options: [
      'Marketing.',
      'Flex-rated stranded cord cable survives the thousands of plug / unplug cycles a patch field actually sees. Locking RJ45 plugs prevent the cord being pulled out of the panel if the cable bundle shifts, which on a high-density patch panel at 1U-per-24-port is a real failure mode. Snagless boots prevent the locking tab catching on adjacent cords when withdrawing a cord — protecting the tab from breakage and the adjacent cords from being dragged out.',
      'Branding.',
      'Compliance with BS 7671.',
    ],
    correctIndex: 1,
    explanation:
      'The three features address the three dominant patch-field failure modes. (1) Flex rating — repeated plug / unplug cycles, plus the cable being shifted within the looms above the patch panel, fatigue stranded conductors. Cheap cord cable that is not flex-rated cracks within months. (2) Locking plugs — on dense patch panels, technicians work in the loom above the panel; a non-locking plug can be pulled out by the weight of the bundle or by accidental snag, and the resulting service outage looks like a switch fault. Locking plugs (the small plastic guard over the tab, plus a positive latching mechanism) prevent this. (3) Snagless boots — when a technician withdraws a cord from the middle of a packed panel, the tab on adjacent cords catches on the cord being moved; snagless boots cover the tab so it cannot snag. Without them, a single cord change can drag two or three adjacent cords out of their ports.',
  },
  {
    id: 'datacabling-m5s3-equipment-vs-work-area',
    question:
      'In the channel model, a "work-area cord" connects the user device to the wall outlet. An "equipment cord" connects the active equipment (typically a switch) to the patch panel. Are these the same kind of cord?',
    options: [
      'Yes — interchangeable.',
      'They are constructed from the same cord cable family, but their use case is different. The work-area cord moves with the user (laptops, desk re-arrangements) and is exposed to bend, footfall, accidental yanks; flex-rating and snagless boots matter most. The equipment cord lives inside the rack, packed in the loom above a patch panel; locking plugs and bend-resilience at the panel face matter most. Both are stranded cord cable rated to the same Category.',
      'Equipment cords are solid-conductor.',
      'Work-area cords are not part of the channel.',
    ],
    correctIndex: 1,
    explanation:
      'Same cord cable family — stranded, rated to the Category — different mechanical environment. The work-area cord lives on the desk side: bent over the edge of a desk, stepped on by chair wheels, dragged when laptops move. Flex-cycle life matters most; snagless boots matter for plug-tab survival. The equipment cord lives in the comms rack: dressed into looms above the patch panel, occasionally re-routed when a port assignment changes, exposed to weight from the bundle above. Locking plugs matter most (so the bundle weight does not pull cords out); bend-radius support at the panel face matters (panels are often 1U so the 90-degree bend is sharp). The contractor delivering a job should specify both — typically as separate SKUs — and order quantities for each.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the constructional difference between patch cord cable and permanent-link cable?',
    options: [
      'They are identical.',
      'Patch cord cable uses stranded conductors (typically 7 strands forming 24 AWG) for flex tolerance; permanent-link cable uses solid conductors (typically 23 AWG single wire) for low attenuation per metre and IDC compatibility. Both are rated to the same Category but have different mechanical and electrical specifications.',
      'Patch cords are unshielded; permanent links are shielded.',
      'Patch cords are fibre; permanent links are copper.',
    ],
    correctAnswer: 1,
    explanation:
      'Stranded vs solid is the headline difference. Stranded — multiple thin wires twisted to form the conductor — flexes thousands of times without conductor breakage; tolerates sharp bends; is the right cable for short, frequently-moved runs. Solid — one wire per conductor — has lower attenuation per metre, is what IDC slots are sized for, and is the right cable for long, pulled-once permanent links. Both are rated to the Category (Cat5e / 6 / 6A) but at slightly different per-metre attenuation figures: the standards (TIA-568.2-E / ISO/IEC 11801-1) allow stranded a more generous attenuation budget per metre, and the 90 m solid + 10 m stranded channel split is sized so the total worst-case insertion loss fits inside Ethernet expectations.',
  },
  {
    id: 2,
    question:
      'Which of these is the design rationale for the 10 m cord allowance in the 100 m channel rule?',
    options: [
      'It is arbitrary.',
      'Stranded patch cord cable has higher per-metre attenuation than solid permanent-link cable, so the channel insertion-loss budget allocates 90 m of solid + 10 m of stranded — engineered so the total worst-case insertion loss fits inside Ethernet equipment expectations across all standardised variants from 100BASE-TX through 25GBASE-T.',
      'Cords are charged by the metre and 10 m is the price point.',
      'Cords cannot be longer than 10 m for safety reasons.',
    ],
    correctAnswer: 1,
    explanation:
      'The 90 m solid + 10 m stranded split is electrical engineering. Solid cable has the lower attenuation per metre and accordingly gets the larger allowance — it absorbs most of the channel length. Stranded cable has higher attenuation per metre but flexes; it gets a smaller allowance (10 m combined across all three cords — patch cord, equipment cord, work-area cord). The combined channel insertion loss fits inside the worst-case Ethernet receiver expectation for every standardised variant from 100BASE-TX (1995) through 25GBASE-T (2016) — preserving service-independence over the cabling life.',
  },
  {
    id: 3,
    question:
      'A patch field is laid out in 1U-per-24-port density and the cords are tightly packed in the loom above. The contractor offers cords with snagless boots, locking plugs, and 28 AWG flex-rated cord cable. Are these appropriate for high-density Cat6A?',
    options: [
      'Yes, in all respects.',
      'Snagless boots and locking plugs are appropriate for high-density patching. 28 AWG cord cable is NOT appropriate for general Cat6A patching — it has higher attenuation than the standard 24 AWG and may not pass Class EA at the upper end of the cord allowance. 28 AWG slim cords are sometimes specified deliberately for short (≤ 1.5 m) cross-connects to gain space in dense panels, but the channel must be re-tested with the slim cords in place to confirm Class EA, and many manufacturer warranty programmes restrict their use.',
      'Yes — 28 AWG is the standard.',
      'No — only solid-conductor cords are allowed.',
    ],
    correctAnswer: 1,
    explanation:
      '28 AWG slim cord cable is a real product, designed for high-density patching where cable bulk is the limiting factor. It is allowed by some standards in restricted lengths and accepted by some manufacturer warranty programmes — but not all. The general-purpose Cat6A patch cord is 24 AWG stranded, which sits inside the 10 m cord-allowance attenuation budget. 28 AWG cord exceeds the per-metre attenuation budget on long cords; it is only used on short cross-connects (typically ≤ 1.5 m) and even then the channel must be re-certified with the slim cords in place. Specifying 28 AWG by default is a misapplication; specifying 24 AWG flex-rated cords with snagless boots and locking plugs is the safe high-density default.',
  },
  {
    id: 4,
    question:
      'What is a "locking RJ45 plug" and why does a high-density Cat6A patch panel typically need them?',
    options: [
      'A plug with extra screws.',
      'A plug with a positive latching mechanism (often a small plastic guard over the standard tab plus a secondary locking action) that prevents the plug being pulled out of the panel by accidental tug or by the weight of the cable bundle above. On 1U-per-24-port panels with dense looms above, an unlocking plug can pull out under bundle weight or technician movement — producing an outage that looks like a switch fault. Locking plugs eliminate this failure mode.',
      'A plug with an integrated key.',
      'A plug with a built-in surge protector.',
    ],
    correctAnswer: 1,
    explanation:
      'Locking plugs solve a real high-density-panel problem. On a 1U-per-24-port Cat6A panel, the cords above the panel are typically dressed into a heavy loom — sometimes with cable management arms, sometimes free-hanging. The bundle weight is non-trivial; a single non-locking plug with a fatigued tab can pull out under that weight, especially when a technician is working in the loom and inadvertently shifts it. A locking plug — typically a small plastic guard that traps the tab plus a secondary push-to-release action — prevents this. Major manufacturers (Panduit, Belden, CommScope, Hellermann Tyton) offer locking plug variants on their Cat6A cord ranges; specify them on dense panels by default.',
  },
  {
    id: 5,
    question:
      'A snagless boot on an RJ45 plug — what failure mode does it prevent, and why is it important on a packed patch field?',
    options: [
      'It improves crosstalk.',
      'It covers the locking tab so the tab cannot snag on adjacent cords when the cord is being moved or withdrawn from a packed panel. Without snagless boots, withdrawing one cord from a packed panel commonly drags the tabs of adjacent cords, which can either snap a tab (failing the cord) or pull adjacent cords partially out of their ports (causing intermittent link failures). On a high-density patch field with frequent moves / adds / changes, this is a daily problem.',
      'It seals against water ingress.',
      'It improves PoE current rating.',
    ],
    correctAnswer: 1,
    explanation:
      'Snagless boots — the moulded sleeve over the back of the RJ45 plug that covers the locking tab — solve the same-density problem from a different angle. When a technician removes one cord from the middle of a packed panel, the cord has to be drawn through the bundle and past adjacent cords. The standard locking tab on a non-snagless plug catches on adjacent tabs, and the technician either has to manually clear each one or pull harder — which can snap a tab or unseat adjacent plugs. Snagless boots cover the tab so it slides past adjacent cords without catching. On a panel that sees daily moves / adds / changes, snagless boots eliminate a major source of failed cords and accidental outages.',
  },
  {
    id: 6,
    question:
      'Why are equipment cords (switch-to-patch-panel) typically a different SKU from work-area cords (outlet-to-device), even though they are made from the same cord cable family?',
    options: [
      'Marketing.',
      'Different mechanical use case. Equipment cords live in the rack — packed in looms above the patch panel, exposed to bundle weight and 90-degree bends at the panel face — and benefit from locking plugs, snagless boots and rack-friendly lengths (0.5 / 1 / 1.5 / 2 / 3 m). Work-area cords live on the desk — bent over edges, stepped on, dragged when laptops move — and benefit from flex-rated cable, snagless boots and user-friendly lengths (1 / 2 / 3 / 5 m). Same cable family, different SKUs.',
      'Equipment cords are solid-conductor.',
      'Work-area cords cannot carry PoE.',
    ],
    correctAnswer: 1,
    explanation:
      'Same cord cable family (stranded, Category-rated), different mechanical environment, different optimisations. Equipment cords live in the comms rack: dressed into looms above the patch panel, exposed to the weight of the bundle above, exposed to a sharp 90-degree bend at the panel face if the panel is 1U. Locking plugs and snagless boots matter most; bend-radius support at the panel face matters; rack-friendly short lengths matter. Work-area cords live on the desk side: bent over the edge of the desk, stepped on by chair wheels, dragged when laptops move. Flex-cycle life matters most; user-friendly longer lengths matter. Specifying both as separate SKUs and ordering the right quantities of each is part of competent project planning.',
  },
  {
    id: 7,
    question:
      'A site uses 28 AWG slim patch cords throughout to gain space in a dense patch panel. The Cat6A horizontal certified to Class EA at install. What additional verification is required?',
    options: [
      'None.',
      'Channel re-certification with the slim cords in place — TIA-1152-A / BS EN 50346 with channel adapters at each end, every channel re-tested. 28 AWG cord cable has higher per-metre attenuation than the 24 AWG default, and the 10 m cord allowance budget is tighter at 28 AWG. The original permanent-link certification is unaffected; what changes is the channel certification, because the cord cable is different. Many manufacturer warranty programmes also require explicit registration of slim-cord variants.',
      'Re-pull the horizontal cable.',
      'Replace the patch panel.',
    ],
    correctAnswer: 1,
    explanation:
      'Slim 28 AWG cords are a deliberate trade-off — bulk reduction at the cost of higher per-metre attenuation. The trade is acceptable in many high-density data-centre and dense office environments, but it changes the channel insertion-loss math. The permanent link does not change; the channel does. Re-certify channel testing with the slim cords in place to confirm Class EA across the full installed channel. Many warranty programmes require explicit slim-cord registration. Document the slim-cord choice in the BS EN 50174-1 / TIA-606-D administration record so the next contractor on site knows what is in use.',
  },
  {
    id: 8,
    question:
      'Why does the standards channel model count three cords (FD patch, equipment, work-area) but allow them to total only 10 m combined, rather than 10 m each?',
    options: [
      'Marketing.',
      'Stranded cord cable has higher per-metre attenuation than solid permanent-link cable. The 10 m total is the channel insertion-loss budget for ALL stranded cable in the path. Allowing 10 m per cord (30 m total) would push the channel insertion loss above the Ethernet equipment expectation, and active equipment would fail to link or auto-negotiate down. The 10 m combined cap is engineered against the worst-case Ethernet receiver tolerance.',
      'For neatness.',
      'For compliance with BS 7671.',
    ],
    correctAnswer: 1,
    explanation:
      'The 100 m channel = 90 m solid + 10 m stranded equation is a worst-case insertion-loss budget. Solid cable has the lower per-metre attenuation; stranded cable has the higher per-metre attenuation. The 10 m allowance is the total stranded length across the entire channel — patch cord at the FD, equipment cord at the cross-connect, work-area cord at the desk. Splitting it three ways (e.g. 3 + 3 + 4 m) is fine; making each cord up to 10 m is not. Active Ethernet equipment auto-negotiates against the 100 m channel insertion-loss expectation; exceed it and you see speed degradation or no link.',
  },
  {
    id: 9,
    question:
      'What is the practical reason a patch cord is specified to fail the cable Category rather than the connector rating?',
    options: [
      'Marketing.',
      'It is the OPPOSITE — the patch cord is specified to MEET the cable Category rating, end to end, including the moulded plugs at each end. A "Cat6A patch cord" is rated to deliver Class EA performance from plug to plug, including the cord cable AND both moulded plugs. Buying a "Cat6A keystone" with a "Cat5e patch cord" downgrades the channel to Class D performance. The rating chain is: cable, cord, connectors — all rated to the same Category, and a channel rated to that Class.',
      'Cords are not rated.',
      'Connectors do not affect the channel.',
    ],
    correctAnswer: 1,
    explanation:
      'The chain of evidence in a Class EA channel is: solid permanent-link cable rated to Cat6A, keystone rated to Cat6A, patch panel rated to Cat6A, patch cord (cable + moulded plugs) rated to Cat6A. Drop any one of these to Cat5e and the whole channel drops to Class D performance — because the channel result is bounded by the worst component in the chain. A common misapplication is buying expensive Cat6A panels and outlets and saving money on cheap Cat5e patch cords; the result is a Class D channel. The cord cable AND the moulded plugs both have to be rated to the Category, and the cord is tested as a complete object by the manufacturer.',
  },
  {
    id: 10,
    question:
      'Why is patch cord choice often described as the "easy lever" for protecting a Cat6A channel investment?',
    options: [
      'Marketing.',
      'Because the cord is the smallest investment in the channel and the easiest to upgrade or replace mid-life. The horizontal cable is pulled once and lives in the wall for 15-20 years; the keystone and patch panel are semi-permanent; the cord is replaced every time someone unplugs and plugs in. Specifying a Cat6A flex-rated cord with locking plugs and snagless boots is a small per-cord cost and protects the much larger investment in the permanent link by ensuring the channel actually delivers Class EA in service.',
      'Cords are not part of the channel.',
      'Cords last forever.',
    ],
    correctAnswer: 1,
    explanation:
      'Patch cords are the cheapest mechanical element in the channel and the most replaceable. The permanent link is the largest investment and is hardest to change once installed. Specifying high-quality cords — Cat6A rated, flex-rated, locking plugs, snagless boots — is the easy lever to make sure the permanent-link investment delivers Class EA across the cabling life. Pairing a Cat6A permanent link with cheap Cat5e cords is a textbook misapplication that the contractor sees often and that costs the user the difference between a 15-year channel and a six-month one. Cords are also an easy mid-life upgrade — specify a 10G channel with Cat6A cords today, swap to slim 28 AWG variants in five years if rack density needs it, replace failing cords without touching the permanent link.',
  },
];

const faqs = [
  {
    question: 'Stranded or solid — which goes where?',
    answer: (
      <>
        Solid conductor (typically 23 AWG single wire for Cat6A) for the permanent link — pulled
        once through containment, terminated at both ends, never moved. Lower attenuation per metre;
        what IDC slots are sized for. Stranded conductor (typically 7 strands forming 24 AWG for
        Cat6A) for cords — moved every time a device is plugged or unplugged, flexed thousands of
        times. Higher attenuation per metre, but flex-cycle tolerant. Both rated to the same
        Category; the standards channel model (90 m solid + 10 m stranded combined) is engineered
        around the per-metre attenuation difference.
      </>
    ),
  },
  {
    question: 'What is a "locking RJ45 plug" and when do I need one?',
    answer: (
      <>
        A locking plug has a positive latching mechanism — typically a small plastic guard that
        traps the standard tab plus a secondary push-to-release — that prevents the plug being
        pulled out by accidental tug or by the weight of a packed cable bundle. On 1U-per-24-port
        high-density Cat6A patch panels, the bundle weight above can pull non-locking plugs out,
        producing service outages that look like switch faults. Specify locking plugs on dense
        panels by default; they are widely available from major manufacturers (Panduit, Belden,
        CommScope, Hellermann Tyton).
      </>
    ),
  },
  {
    question: 'What is a snagless boot and why does it matter on a packed panel?',
    answer: (
      <>
        A snagless boot is the moulded sleeve over the back of the RJ45 plug that covers the locking
        tab. On a packed patch panel, withdrawing one cord drags it past adjacent cords; without a
        snagless boot, the locking tab catches on adjacent tabs — either snapping the tab (failing
        the cord) or unseating adjacent plugs (causing intermittent link failures). With snagless
        boots, the cord slides past without catching. On any panel that sees daily moves / adds /
        changes, snagless boots are the difference between routine maintenance and constant
        fault-finding.
      </>
    ),
  },
  {
    question: 'Are 28 AWG slim patch cords acceptable for Cat6A?',
    answer: (
      <>
        Allowed in restricted lengths (typically ≤ 1.5 m) for high-density patching where cable bulk
        is the limiting factor. 28 AWG cord cable has higher per-metre attenuation than the standard
        24 AWG, so the 10 m channel cord-allowance budget is tighter when slim cords are used. If
        specified, the channel must be re-certified to TIA-1152-A / BS EN 50346 with the slim cords
        in place to confirm Class EA, and many manufacturer warranty programmes require explicit
        registration of the slim-cord variant. The safe default is 24 AWG flex-rated cord cable; 28
        AWG is a deliberate trade-off, not a default.
      </>
    ),
  },
  {
    question: 'How is a patch cord rated to a Category — what is being tested?',
    answer: (
      <>
        A patch cord is sold as a complete object — the stranded cable PLUS the moulded plugs at
        each end — and is tested by the manufacturer to deliver the Category{"'"}s transmission
        performance from plug to plug. A "Cat6A patch cord" carries Class EA performance through the
        cord cable and both plugs, certified under TIA-568.2-E / ISO/IEC 11801-1 / BS EN 50173-1.
        The chain of evidence in a Class EA channel requires every component — solid cable,
        keystone, panel, cord — to be rated to the Category. A cheap Cat5e cord on otherwise Cat6A
        components downgrades the channel.
      </>
    ),
  },
  {
    question: 'Are equipment cords and work-area cords interchangeable?',
    answer: (
      <>
        Same cord cable family, same Category rating, same channel function — different mechanical
        environment. Equipment cords live in the rack: packed in looms, exposed to bundle weight and
        90-degree bends at 1U panels — locking plugs and snagless boots matter most. Work-area cords
        live on the desk: bent over edges, stepped on, dragged when laptops move — flex-rating and
        snagless boots matter most. Most major manufacturers offer them as separate SKUs, optimised
        for each environment. Specify both, order the right quantities, and the contractor avoids
        using the wrong cord in the wrong place.
      </>
    ),
  },
];

const DataCablingModule5Section3 = () => {
  const navigate = useNavigate();

  useSEO(
    'Patch Cord Design and Performance | Data Cabling Module 5.3 | Elec-Mate',
    'Patch cords — stranded vs solid conductor cable, flex-cycle ratings, the 90 m solid + 10 m stranded channel split, locking RJ45 plugs and snagless boots for high-density patching, equipment cords vs work-area cords, and why patch cord choice is the easy lever protecting a Cat6A channel investment.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3"
            title="Patch Cord Design and Performance"
            description="The smaller, cheaper, more-replaceable end of the channel — stranded conductor cable for flex-cycle tolerance, the 90 m solid + 10 m stranded channel split that bounds insertion loss, locking RJ45 plugs and snagless boots for high-density patching, and why patch cord choice is the easy lever protecting a Cat6A permanent-link investment."
            tone="yellow"
          />

          <TLDR
            points={[
              'Stranded vs solid conductor. Patch cords use stranded conductor cable (typically 7 strands forming 24 AWG for Cat6A) for flex-cycle tolerance — moved thousands of times in service. Permanent links use solid conductor cable (23 AWG single wire for Cat6A) for low attenuation per metre and IDC compatibility — pulled once, never moved. Both rated to the same Category.',
              'The 100 m channel splits 90 m solid + 10 m stranded combined. Stranded has higher per-metre attenuation; the standards engineer the split so worst-case channel insertion loss fits inside Ethernet equipment expectations. The 10 m is a TOTAL across all three cords — patch, equipment, work-area — not 10 m each.',
              'Mechanical features matter on dense panels — locking RJ45 plugs (so bundle weight cannot pull cords out), snagless boots (so the tab cannot catch on adjacent cords during withdrawal), flex-rated cord cable (for thousands of plug / unplug cycles). All three are widely available on major manufacturer Cat6A cord ranges.',
              'Patch cords are the easy lever protecting the permanent-link investment. The horizontal cable lives in the wall for 15-20 years; the cord is the smallest, cheapest, most-replaceable element. Specifying flex-rated Cat6A cords with locking plugs and snagless boots is small money that ensures the channel delivers Class EA in service.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish stranded conductor cord cable from solid conductor permanent-link cable, and explain why each is the correct choice for its part of the channel',
              'State the 90 m solid + 10 m stranded combined channel split and explain the per-metre attenuation reasoning behind it',
              'Recognise locking RJ45 plugs and snagless boots, and articulate the high-density-panel failure modes each addresses',
              'Distinguish equipment cords (rack-side, between switch and patch panel) from work-area cords (desk-side, between outlet and device), and specify each appropriately',
              'Explain when 28 AWG slim cords are appropriate (restricted lengths, density-driven) and when they are not, and the channel re-certification required if used',
              'Apply the chain-of-evidence rule — every component rated to the same Category — to avoid downgrading a Cat6A channel with a Cat5e cord',
              'Specify cord SKUs in a project plan with appropriate quantities for both equipment and work-area populations',
              'Treat patch cord choice as the easy lever protecting the permanent-link investment over the cabling life',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Stranded vs solid — same Category, different cable</ContentEyebrow>

          <ConceptBlock
            title="Two cable populations, engineered for two different mechanical lives"
            plainEnglish="A horizontal cabling channel mixes two distinct cable types: solid-conductor cable for the permanent link (the bit pulled through the wall and never moved) and stranded-conductor cable for the cords (the bits plugged and unplugged constantly). Both are rated to the same Category — Cat5e, Cat6, Cat6A — but they are made differently because they live different lives. Solid is stiffer, with lower attenuation per metre, designed for one-time pulling and IDC termination. Stranded is flexible, with higher attenuation per metre, designed for thousands of flex cycles."
            onSite="On site, the two are NOT interchangeable. Pulling stranded cable through containment for a permanent link cracks at the IDC termination because the slot is sized for solid; even where it seats, the higher attenuation may push the channel past the Class EA insertion-loss budget. Using solid cable as a patch cord cracks at the first sharp bend — solid conductor is brittle to repeated flex. The contractor's stockroom needs both: reels of solid for horizontal pulls, factory-made or factory-prepared cords for everything that plugs."
          >
            <p>The two cable populations in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Solid conductor — permanent link.</strong> One wire per conductor, typically
                23 AWG for Cat6A (Cat5e is usually 24 AWG, Cat6A is heavier). The wire is held in
                fixed pair geometry by the cable jacket and the pair-separator spline. Low
                attenuation per metre. Designed for one-time pulling under controlled tension (BS EN
                50174-2 limits) and IDC termination at both ends. Rated for tens of thousands of
                hours in static installation; not rated for flex.
              </li>
              <li>
                <strong>Stranded conductor — patch cords.</strong> Multiple thin strands twisted to
                make up the conductor — typically 7 strands of 32 AWG forming a 24 AWG conductor for
                general-purpose Cat6A cords; or 19 strands of 36 AWG for ultra-flexible variants.
                The stranded construction tolerates flex without conductor breakage. Higher
                attenuation per metre than solid — the standards allocate just 10 m to stranded
                across the whole channel for this reason. Designed for thousands of plug / unplug
                cycles and for the bend / drag / step-on lifecycle of a desk-side cord.
              </li>
            </ul>
            <p>
              The category rating is independent of stranded vs solid construction. A Cat6A cord and
              Cat6A horizontal cable are both rated to deliver Class EA performance when assembled
              into a channel — but they meet that rating through different constructional choices,
              optimised for their different mechanical environments.
            </p>
          </ConceptBlock>

          {/* Stranded vs solid diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Two conductor constructions — solid for permanent link, stranded for cords
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Two cable cross-sections side by side. On the left, a solid conductor: one large circular conductor cross-section, single wire, labelled 23 AWG for Cat6A permanent-link cable. On the right, a stranded conductor: seven smaller circular wires bundled together, labelled 7 strands of 32 AWG forming a 24 AWG conductor, labelled stranded for Cat6A cord cable. The solid is labelled lower attenuation per metre, designed for one-time pull and IDC termination. The stranded is labelled flex-cycle tolerant, higher attenuation per metre, designed for thousands of plug-unplug cycles."
            >
              {/* ===== Construction title row (above panels) ===== */}
              <text
                x="220"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SOLID CONDUCTOR — permanent link
              </text>
              <text
                x="660"
                y="32"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                STRANDED CONDUCTOR — patch cord
              </text>

              {/* ===== Solid panel (cross-section only) ===== */}
              <rect
                x="40"
                y="50"
                width="360"
                height="260"
                rx="12"
                fill="rgba(234,179,8,0.06)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />

              {/* Insulation halo (jacket boundary) */}
              <circle
                cx="220"
                cy="180"
                r="84"
                fill="none"
                stroke="rgba(234,179,8,0.30)"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              {/* Insulation ring */}
              <circle
                cx="220"
                cy="180"
                r="68"
                fill="none"
                stroke="rgba(234,179,8,0.55)"
                strokeWidth="1.6"
              />
              {/* Single solid conductor */}
              <circle cx="220" cy="180" r="44" fill="#EAB308" stroke="#FACC15" strokeWidth="2" />

              {/* ===== Stranded panel (cross-section only) ===== */}
              <rect
                x="480"
                y="50"
                width="360"
                height="260"
                rx="12"
                fill="rgba(34,211,238,0.06)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />

              {/* Insulation halo */}
              <circle
                cx="660"
                cy="180"
                r="84"
                fill="none"
                stroke="rgba(34,211,238,0.30)"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              {/* Insulation ring */}
              <circle
                cx="660"
                cy="180"
                r="68"
                fill="none"
                stroke="rgba(34,211,238,0.55)"
                strokeWidth="1.6"
              />
              {/* Seven strands — centre + 6 around */}
              <circle cx="660" cy="180" r="18" fill="#22D3EE" stroke="#67E8F9" strokeWidth="1.4" />
              {[0, 60, 120, 180, 240, 300].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                const cx = 660 + 36 * Math.cos(rad);
                const cy = 180 + 36 * Math.sin(rad);
                return (
                  <circle
                    key={'st-' + i}
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill="#22D3EE"
                    stroke="#67E8F9"
                    strokeWidth="1.4"
                  />
                );
              })}

              {/* ===== Layer labels (below panels) — dedicated row ===== */}
              <text
                x="220"
                y="338"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                23 AWG · single wire
              </text>
              <text
                x="220"
                y="358"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                solid copper · insulation · pair geometry preserved
              </text>

              <text
                x="660"
                y="338"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                7 × 32 AWG strands → 24 AWG total
              </text>
              <text
                x="660"
                y="358"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                stranded copper · insulation · flexible jacket
              </text>

              {/* ===== Property comparison table ===== */}
              <rect
                x="40"
                y="382"
                width="800"
                height="86"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="60"
                y="404"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                PROPERTIES
              </text>

              <text x="60" y="428" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Attenuation per metre
              </text>
              <text
                x="220"
                y="428"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                lower
              </text>
              <text
                x="660"
                y="428"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                higher (~ 1.5x)
              </text>

              <text x="60" y="448" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Flex cycles
              </text>
              <text
                x="220"
                y="448"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                pulled once · never moved
              </text>
              <text
                x="660"
                y="448"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                thousands · plugged frequently
              </text>

              {/* ===== Legend ===== */}
              <rect
                x="40"
                y="482"
                width="800"
                height="50"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="504"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                RULE
              </text>
              <text x="120" y="504" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Both rated to same Category. Channel = 90 m solid permanent link + 10 m stranded
                cord allowance combined.
              </text>
              <text x="60" y="522" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                ANSI/TIA-568.2-E · BS EN 50173-1 · ISO/IEC 11801-1 — engineered against the
                per-metre attenuation difference.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="ANSI/TIA-568.2-E (2024) · §6 (Generic balanced cabling — paraphrased)"
            clause={
              <>
                Cords used to connect cabling components to active equipment shall comprise
                stranded-conductor cable rated to the Category of the channel. The combined length
                of all cords in the channel shall not exceed 10 m. Solid-conductor cable shall be
                used for the permanent link, terminated to insulation displacement connection (IDC)
                hardware at each end.
              </>
            }
            meaning="The 90 m solid + 10 m stranded combined split is a hard channel-engineering rule, not a guideline. The 10 m is allocated against the higher per-metre attenuation of stranded cord cable; allocating more (e.g. 5 m equipment cord + 5 m FD patch cord + 5 m work-area cord = 15 m total) breaks the channel insertion-loss budget and the link may auto-negotiate down or fail to link. Stranded must be rated to the same Category as the solid — Cat6A cord on Cat6A horizontal — or the channel result is bounded by the worst component."
            cite="See also BS EN 50173-1 · §6.4 and ISO/IEC 11801-1 · §6.4 — same rule, EN/ISO Class terminology."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Locking plugs, snagless boots and the high-density panel</ContentEyebrow>

          <ConceptBlock
            title="Mechanical features that matter when patch panels get dense"
            plainEnglish="A 1U patch panel at 24 ports per RU was the office default in 2010. By 2026 the typical Cat6A office is at 1U-per-24-port or denser, with a high-density data centre running 1U-per-48-port. At those densities, the cords above the panel are packed in heavy looms, and the cord mechanical features become a daily problem. Three features address it: locking plugs (bundle weight cannot pull cords out), snagless boots (the tab does not catch on adjacent cords during withdrawal), and flex-rated cord cable (the cord survives the daily moves / adds / changes)."
            onSite="On site, dense patch panels generate the most patch-related fault calls — and most of those calls trace to mechanical, not electrical, problems. Cords pulled out of ports by bundle weight. Cords snapped at the tab when withdrawn through a packed loom. Cords that worked on day one and intermittently fail after six months of moves. The fix is not better diagnostics; the fix is specifying the right cords on day one. Locking plugs, snagless boots, flex-rated cord cable — each is a small per-cord cost premium, each addresses a real failure mode."
          >
            <p>The three features and the failure modes each addresses:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Locking RJ45 plug.</strong> A plug with a positive latching mechanism —
                typically a small plastic guard over the standard tab plus a secondary
                push-to-release action — that prevents the plug being pulled out of the panel by
                accidental tug or by the weight of a packed cable bundle above. On 1U-per-24-port
                and denser panels, the bundle weight is non-trivial; a non-locking plug with a
                fatigued tab can pull out under that weight, especially when a technician is working
                in the loom and inadvertently shifts it. The outage looks like a switch fault — but
                the cord is the cause.
              </li>
              <li>
                <strong>Snagless boot.</strong> The moulded sleeve over the back of the RJ45 plug
                that covers the locking tab. When a technician withdraws one cord from a packed
                panel, the cord is drawn through the bundle past adjacent cords; without a snagless
                boot, the locking tab catches on adjacent tabs — either snapping the tab (failing
                the cord) or unseating adjacent plugs (causing intermittent link failures). With
                snagless boots, the cord slides past without catching.
              </li>
              <li>
                <strong>Flex-rated cord cable.</strong> Stranded cord cable specified for a rated
                number of flex cycles (typically 1500-3000+ flex cycles before conductor breakage).
                Cheap unrated stranded cable cracks within months on a desk-side cord that gets bent
                over a desk edge daily. Flex-rated cord cable is what major manufacturers ship in
                their commercial Cat6A cord ranges by default.
              </li>
            </ul>
            <p>
              These features are widely available across the major Cat6A cord ranges (Panduit TX6A,
              CommScope GS8E, Belden 10GX, Hellermann Tyton). The premium over the cheapest
              non-rated cord cable is small — typically £2-£5 per cord on a £10-£20 cord — and the
              operational cost savings from preventing pulled-out / snagged / snapped cords on a
              dense panel pay back within months. Specify all three by default on Cat6A cord
              populations.
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

          <ContentEyebrow>Equipment cords vs work-area cords</ContentEyebrow>

          <ConceptBlock
            title="Same cord cable family, different mechanical environment, different SKUs"
            plainEnglish="Two cord populations on every commercial site: equipment cords (rack-side, between active equipment and patch panel) and work-area cords (desk-side, between outlet and user device). Same cord cable family — stranded, Category-rated — same channel function within the 10 m cord allowance, but different mechanical environments and different optimisations. Specifying both as separate SKUs and ordering the right quantities is part of competent project planning."
            onSite="The contractor stockroom for a Cat6A fit-out should have at least two cord SKUs: short rack-friendly equipment cords (0.5 / 1 / 1.5 / 2 / 3 m) and longer work-area cords (1 / 2 / 3 / 5 m). Both Cat6A flex-rated, both with snagless boots. Equipment cords additionally specify locking plugs (against bundle weight); work-area cords typically without locking (so the user can re-arrange the desk easily). Buying one SKU and using it everywhere produces equipment cords that are too long for racks (cable mess) and work-area cords that are too short for desks (failed laptop docking station angles)."
          >
            <p>The two cord populations in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Equipment cord — rack-side.</strong> Between switch / router and the patch
                panel. Lives in the comms rack, dressed into looms above the panel, exposed to
                bundle weight and a 90-degree bend at the panel face on 1U hardware. Optimisations:
                locking plugs (against bundle weight), snagless boots (against neighbour-cord snags
                during moves), short rack-friendly lengths (0.5 m for inside-rack patches, 1-2 m for
                cross-rack patches). Bend radius at the panel face matters; many high-density panels
                include a bend-radius guide.
              </li>
              <li>
                <strong>Work-area cord — desk-side.</strong> Between work-area outlet and the user
                device. Lives on the desk, bent over the desk edge, stepped on by chair wheels,
                dragged when laptops move, plugged and unplugged when the user travels.
                Optimisations: flex-rated cord cable (against bend / flex fatigue), snagless boots
                (against the user{"'"}s coat sleeve / bag strap snagging the tab), user-friendly
                longer lengths (1 / 2 / 3 / 5 m to accommodate desk geometries). Locking plugs are
                typically not used (so the user can re-arrange the desk).
              </li>
            </ul>
            <p>
              Most major manufacturers offer both as separate SKUs. The cost differential is small;
              the deployment quality difference is large. Specify both in the project plan, order
              the right quantities, label the boxes clearly so the install crew uses the right cord
              in the right place.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Patch cord populations on a typical commercial Cat6A site"
            source="Cat6A cord ranges from Panduit, CommScope, Belden, Hellermann Tyton — typical 2026 specifications"
            headers={['Cord type', 'Where it lives', 'Typical lengths', 'Key features']}
            rows={[
              [
                'Equipment cord (rack-side)',
                'Switch port to patch panel, inside rack',
                '0.5 / 1 / 1.5 / 2 / 3 m',
                'Cat6A 24 AWG flex-rated, locking plugs, snagless boots',
              ],
              [
                'Work-area cord (desk-side)',
                'Wall outlet to user device, on the desk',
                '1 / 2 / 3 / 5 m',
                'Cat6A 24 AWG flex-rated, snagless boots, no lock',
              ],
              [
                'Slim cord (28 AWG, restricted)',
                'Inside high-density rack patches only',
                '0.5 / 1 / 1.5 m maximum',
                'Cat6A 28 AWG, snagless, channel re-cert required',
              ],
              [
                'Cross-connect cord',
                'Patch panel to patch panel (no active equipment)',
                '0.5 / 1 / 1.5 m',
                'Cat6A 24 AWG flex-rated, snagless boots',
              ],
              [
                'Console / device-tail cord',
                'Specialised — IP camera tail, IoT sensor',
                'Manufacturer-specific',
                'Often factory-moulded; verify Cat rating against channel',
              ],
            ]}
            notes="Specify cord SKUs in the project plan with quantities. The contractor stockroom needs at minimum equipment + work-area cords as separate SKUs. Slim 28 AWG cords are deliberate trade-offs for rack density only — restricted lengths, channel re-certification required, manufacturer warranty registration."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            The chain of evidence — every component rated to the Class
          </ContentEyebrow>

          <ConceptBlock
            title="The cord is the easy lever protecting the permanent-link investment"
            plainEnglish="A Class EA channel is a chain: solid permanent-link cable rated to Cat6A, keystone rated to Cat6A, patch panel rated to Cat6A, patch cord (cable + plugs) rated to Cat6A. The channel result is bounded by the worst component in the chain — drop any one link to a lower Category and the whole channel drops to that Class. The patch cord is the smallest, cheapest, most-replaceable element in this chain, AND the easiest to under-specify by accident — the contractor focused on the visible permanent-link spec saves a few pounds per cord on cheap Cat5e patch cords, and the Cat6A channel investment is downgraded to Class D."
            onSite="The competent project plan specifies cord SKUs with the same care as panel and outlet SKUs. Cat6A horizontal cable — Cat6A keystones — Cat6A patch panels — Cat6A flex-rated cords with locking plugs and snagless boots. Same rating chain. The cord is also the easiest mid-life upgrade: replace failing cords without touching the permanent link, swap to slim 28 AWG for rack density without re-pulling, match cord colour to switch-port use for visual administration. Treat patch cord choice as the lever that protects the larger investment."
          >
            <p>Three concrete examples of how cord choice protects or destroys the channel:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Cat6A horizontal + Cat5e cords = Class D channel.</strong> The contractor
                pulls Cat6A cable, fits Cat6A keystones, fits Cat6A patch panels, certifies the
                permanent link to Class EA, then patches with cheap Cat5e cords from a tool
                merchant. The channel test (which includes the cords) returns Class D performance
                because the cords are the worst component. The 10G service the building was
                specified for fails to negotiate. Cause: cord choice.
              </li>
              <li>
                <strong>
                  High-density panel + non-locking, non-snagless cords = daily fault calls.
                </strong>{' '}
                The contractor specifies the cheapest commercial cords on a 1U-per-24-port Cat6A
                panel. The cords are rated to Cat6A and pass the channel test on day one. Within
                months, the operations team is making daily calls about pulled-out cords, snapped
                tabs, and intermittent links. Cause: mechanical features — locking plugs and
                snagless boots — were not specified.
              </li>
              <li>
                <strong>
                  Mixed cord lengths and types from different SKUs = visual chaos and the wrong cord
                  in the wrong place.
                </strong>{' '}
                The contractor orders one cord SKU and uses it everywhere — too long for racks, too
                short for desks, cable management arms jammed with surplus cord. Cause: equipment
                cord vs work-area cord SKUs were not specified separately.
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
            title="Saving money on patch cords after specifying premium permanent-link components"
            whatHappens={
              <>
                Contractor wins the Cat6A office fit-out on a competitive tender. Specifies premium
                Panduit horizontal cable, premium Cat6A keystones, premium 1U-per-24-port Cat6A
                patch panels — each line-itemed in the spec. At the bottom of the BOQ is "patch
                cords, 250 off, 2 m". The procurement team picks the cheapest Cat5e cords from a
                wholesaler on the basis that "they are just patch cords". The permanent link
                certifies to Class EA. The end-to-end channel certifies to Class D. The 10G service
                the building was paid for fails to deploy. The client is angry. The cord saving was
                £400; the remediation costs £15,000.
              </>
            }
            doInstead={
              <>
                Specify cord SKUs with the same care as panel and outlet SKUs. Cat6A flex-rated cord
                cable, locking plugs (equipment side), snagless boots (everywhere), Cat6A-rated
                moulded plugs, manufacturer-certified to deliver Class EA from plug to plug. Specify
                equipment-cord and work-area-cord SKUs separately with appropriate length ranges.
                Order quantities against the patch-panel and outlet count plus 10 % spare. Test the
                full channel (with cords) at handover, not just the permanent link. The cord is the
                cheapest line item in the chain and the easiest to under-spec by accident; do not.
              </>
            }
          />

          <Scenario
            title="A new tenant moves into a Cat6A fit-out and brings their own patch cords — what does the contractor advise?"
            situation={
              <>
                The original Cat6A office fit-out was certified to Class EA permanent-link two years
                ago. A new tenant has moved in and brought 200 of their own patch cords from a
                previous office — Cat5e branded, "they have always worked". They ask the building
                manager to plug them in. The manager calls the contractor.
              </>
            }
            whatToDo={
              <>
                Three points to communicate. (1) The Cat6A horizontal infrastructure was specified
                and certified for 10G services per Class EA. Patching with Cat5e cords downgrades
                the channel to Class D — 1G performance, no 10G capability. The tenant{"'"}s own
                cords undo the building investment. (2) Some Cat5e cords are additionally not rated
                for sustained PoE (Type 3 / Type 4) in continuous bundles per BS 7671 §716; using
                them with PoE access points or PoE lighting may produce thermal issues. (3) The
                recommended action is to supply Cat6A flex-rated cords with snagless boots (and
                locking plugs on the rack side) for the duration of the tenancy, channel-certify the
                resulting full channel to Class EA with the new cords in place, and archive the
                result. The cost is small; the protection of the building investment and the tenant
                {"'"}s service quality is large.
              </>
            }
            whyItMatters={
              <>
                Cord-driven channel downgrades are one of the most common failure modes in
                multi-tenant commercial buildings. The contractor signed off Class EA on the
                permanent link; two years later, a new tenant patches with Cat5e cords from a
                drawer; the building no longer delivers what it was specified for. The cord chain is
                part of the channel chain — and the cord chain changes whenever tenants change.
                Documenting the cord specification in the BS EN 50174-1 / TIA-606-D administration
                record, and re-certifying the channel whenever the cord population materially
                changes, are the disciplines that protect the long-life value proposition of the
                original investment.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Stranded conductor for cords (flex-cycle tolerant), solid conductor for permanent links (lower attenuation, IDC-compatible). Both rated to the same Category. Not interchangeable.',
              'The 100 m channel splits 90 m solid + 10 m stranded combined — engineered against the per-metre attenuation difference. The 10 m is a TOTAL across all cords in the channel, not 10 m each.',
              'Locking plugs prevent bundle weight pulling cords out of dense panels. Snagless boots prevent the tab catching on adjacent cords during withdrawal. Flex-rated cord cable survives the thousands of flex cycles a desk-side cord actually sees. Specify all three on Cat6A by default.',
              'Equipment cords (rack-side) and work-area cords (desk-side) are separate SKUs. Same cord cable family, different mechanical environments. Specify both with appropriate length ranges; do not buy one SKU and use it everywhere.',
              'The chain of evidence — solid cable, keystone, panel, cord — must all be rated to the same Category. The cord is the smallest, cheapest, most-replaceable element AND the easiest to under-spec by accident. Treat cord choice as the easy lever protecting the permanent-link investment.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Link vs Channel testing
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: PoE Applications
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule5Section3;
