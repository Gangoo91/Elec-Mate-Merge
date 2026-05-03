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
    id: 'datacabling-m3s2-lc-vs-sc',
    question:
      'You are specifying duplex connectors for a 48-port floor-distributor patch panel. Density and quick polarity changes matter. Which connector is the modern default?',
    options: [
      'ST — bayonet, 2.5 mm ferrule, simplex.',
      'LC — small-form-factor, 1.25 mm ferrule, latching, duplex clip — twice the port density of SC and the modern in-building default.',
      'FC — threaded, 2.5 mm ferrule.',
      'MTP/MPO 12-fibre.',
    ],
    correctIndex: 1,
    explanation:
      'LC (Lucent Connector) is the dominant in-building duplex connector since the early 2000s. Its 1.25 mm ferrule (vs 2.5 mm on SC / ST / FC) gives roughly twice the port density per panel rack-unit, and the latching clip plus duplex clip allows fast polarity reversal at a panel. SC is still in use (legacy, simple push-pull), ST is mostly seen on older multimode systems, FC on lab and metrology equipment. MTP / MPO is for 8 / 12 / 24 fibre parallel optics — a different application.',
  },
  {
    id: 'datacabling-m3s2-apc-on-multimode',
    question:
      'A junior brings you a green-bodied LC patch lead and asks: "this is APC — can we use it on the OM4 multimode link?" What is the correct answer?',
    options: [
      'Yes — APC works with all fibre types.',
      'No. APC (angled physical contact, 8° angled endface, green) is for single-mode only. Forcing an APC connector against a UPC or PC mate (or against multimode) damages the endface and introduces a large insertion loss. Multimode uses PC or UPC (typically blue housings); single-mode duplex is UPC blue or APC green. Never mate APC to non-APC.',
      'Yes — APC reduces insertion loss on any fibre.',
      'Only with an APC-to-UPC adapter.',
    ],
    correctIndex: 1,
    explanation:
      'APC has an 8° angle on the ferrule endface, which physically requires an APC mate at the same angle to make optical contact. Mating APC to UPC or PC will not seat the ferrules properly — the polished surfaces are not parallel — so insertion loss spikes, return loss falls, and the surfaces can be physically damaged. APC is a single-mode-only convention. Multimode is PC or UPC, blue housings industry-typical. The colour code (green = APC, blue = UPC / PC) exists precisely to prevent this mistake on a busy panel.',
  },
  {
    id: 'datacabling-m3s2-return-loss',
    question:
      'A long-haul SM trunk feeds an analogue RF over fibre service that is sensitive to back-reflection. Which polish grade gives the lowest return loss and why?',
    options: [
      'PC — simple physical contact, return loss around -35 dB.',
      'UPC — domed convex polish, return loss typically -50 dB.',
      'APC — 8° angled endface, return loss typically -65 dB or better. The angle directs the small fraction of reflected light into the cladding rather than back down the core, which is exactly what reflection-sensitive services (PON, RFoG, CATV, narrow-linewidth lasers) need.',
      'All three grades give the same return loss.',
    ],
    correctIndex: 2,
    explanation:
      'Return loss measures how much of the launched light is reflected back from the connector face. PC is roughly -35 dB. UPC (ultra physical contact, tighter polish, domed convex profile) is around -50 dB. APC (angled physical contact, 8° angle) is -65 dB or better — the angled face reflects light into the cladding rather than back into the core, so reflection-sensitive services (PON, RFoG, narrow-linewidth DFB lasers) get a clean signal. APC is the default for SM long-haul; UPC is fine for SM short-reach and is the multimode norm.',
  },
  {
    id: 'datacabling-m3s2-cleanliness',
    question:
      'A previously certified OM4 link starts showing intermittent 10G link errors after a recent patch change. Visual inspection of the connector endface shows a small dark contamination ring. Most likely cause and first action?',
    options: [
      'The fibre is failing — replace the run.',
      'Endface contamination — a single fingerprint, dust particle or oil residue can dominate the loss budget at a connector. Inspect with a fibre microscope per IEC 61300-3-35, clean with an IBC click cleaner or lint-free wipe + IPA, re-inspect, then re-mate. Cleanliness is the single most common fault in fibre channels.',
      'PoE has been enabled and is heating the fibre.',
      'The polish grade has changed.',
    ],
    correctIndex: 1,
    explanation:
      'Endface contamination is by a wide margin the most common fibre fault. A single particle of dust on a 9 µm SM core blocks most of the light. The recovery procedure is fixed: inspect (microscope or video probe per IEC 61300-3-35 acceptance criteria), clean (IBC click cleaner is the modern default; lint-free wipe with isopropyl alcohol is the alternative), re-inspect, re-mate. Never blow on a connector, never wipe with a shirt, never plug in a connector you have not inspected.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which fibre connector is the dominant duplex connector in modern in-building installations, and what makes it the default?',
    options: [
      'ST — bayonet locking, twist-and-lock.',
      'LC (Lucent Connector) — small-form-factor with a 1.25 mm ferrule (half the diameter of SC/ST/FC), an RJ-style latching clip and an integral duplex clip. The smaller ferrule gives roughly twice the port density per rack-unit, the latch allows single-handed insertion, and the duplex clip enables fast polarity reversal. LC is the de-facto modern default for SM and MM duplex applications inside buildings.',
      'FC — threaded coupling.',
      'MTP — 12-fibre parallel.',
    ],
    correctAnswer: 1,
    explanation:
      'LC has dominated in-building duplex applications since the early 2000s for density, latch action and tooling. SC (push-pull, 2.5 mm ferrule) is still common in older installations and remains a perfectly compliant connector. ST (bayonet) is mostly seen on legacy multimode. FC (threaded) is preferred in metrology / test equipment for vibration tolerance. MTP / MPO is parallel-optic only — a different application class.',
  },
  {
    id: 2,
    question: 'What is the difference between PC, UPC and APC polish grades?',
    options: [
      'They are different ferrule diameters.',
      'PC (physical contact, flat / slightly domed polish, return loss around -35 dB), UPC (ultra physical contact, tighter convex polish, return loss around -50 dB) and APC (angled physical contact, 8° angled endface, return loss -65 dB or better). The polish geometry controls how much light is reflected back from the endface.',
      'They are different fibre types.',
      'They are different connector body materials.',
    ],
    correctAnswer: 1,
    explanation:
      'Polish grade is about the geometry of the endface where the two ferrules mate. PC is the original "physical contact" polish — flat / slightly domed. UPC adds a tighter convex polish for lower back-reflection. APC angles the endface at 8° so any reflected light is directed into the cladding rather than back down the core. Return-loss numbers escalate: PC ~-35 dB, UPC ~-50 dB, APC ~-65 dB or better. APC is needed where a service is reflection-sensitive (PON, RFoG, narrow-linewidth lasers).',
  },
  {
    id: 3,
    question:
      'When is APC connectorisation the correct choice, and when is UPC the correct default?',
    options: [
      'APC for everything single-mode; UPC for everything multimode.',
      'APC is the default for single-mode reflection-sensitive applications (PON / GPON / XGS-PON, RFoG, CATV, narrow-linewidth DFB lasers, analogue RF over fibre, OTDR with high dynamic range). UPC is the default for general single-mode duplex applications (Ethernet over SM short reach, simple LR / ER point-to-point) and is the universal default for multimode (which has no APC variant in commercial use).',
      'They are interchangeable.',
      'APC for short reach, UPC for long reach.',
    ],
    correctAnswer: 1,
    explanation:
      'APC is mandated by reflection-sensitivity. PON systems specifically require APC because the upstream transmitter is right next to a downstream receiver, and reflections from the network back into the upstream laser destabilise the link. UPC is the workhorse SM polish for bog-standard Ethernet point-to-point (10GBASE-LR, 25GBASE-LR). Multimode in commercial use is PC or UPC — there is no widespread APC multimode connector because multimode\u2019s short reach and modal noise dominate any return-loss benefit.',
  },
  {
    id: 4,
    question:
      'Why must you NEVER mate an APC connector to a UPC or PC connector, even if mechanically forceable?',
    options: [
      'Because APC is more expensive.',
      'Because the endface geometries do not match — APC is angled at 8°, UPC and PC are perpendicular. Forcing them together prevents proper ferrule contact (a small air gap forms), insertion loss spikes by 1-3 dB or more, return loss collapses, and the polished surfaces of one or both connectors are physically damaged. This damage is permanent — the connector must be re-terminated or scrapped.',
      'Because APC is single-mode and UPC is multimode.',
      'Because the colours do not match.',
    ],
    correctAnswer: 1,
    explanation:
      'The angled endface of an APC connector requires an APC mate. Forcing APC against UPC / PC creates an air gap (no proper physical contact), spikes insertion loss, drops return loss, and damages both endfaces. The connector colour code (green = APC, blue = UPC / PC, beige = MM PC) exists for exactly this reason — but on a dimly-lit panel with similar-shaped LC bodies, mistakes happen. The discipline: confirm polish grade before every mate, and never accept "I think it is APC" without checking the housing colour and the print legend.',
  },
  {
    id: 5,
    question: 'A 12-fibre parallel-optic 100GBASE-SR4 link uses which connector type, and why?',
    options: [
      'Twelve individual LC duplex connectors.',
      'MTP/MPO — a single multi-fibre push-on connector that aligns 8 or 12 (sometimes 24) fibres in a single moulded ferrule, with a key for orientation. Parallel optics use 4 or 10 fibres in each direction; MTP/MPO terminates them in one cassette-friendly footprint and is the standard connector for 40 / 100 / 400 G parallel-optic links.',
      'A single SC connector.',
      'An ST bayonet.',
    ],
    correctAnswer: 1,
    explanation:
      'MTP/MPO terminates 8, 12 or 24 fibres in a single ferrule with a key on the connector body for polarity. 100GBASE-SR4 uses 4 fibres in each direction (4 transmit, 4 receive over a 12-fibre MPO with 4 unused), so a single MPO / MTP cable carries the whole 100 G link. Modern data-centre cassettes routinely break a 12-fibre MPO trunk out to 6 LC duplex pairs at the cassette face, giving fast deployment of parallel-optic backbones with familiar LC at the device.',
  },
  {
    id: 6,
    question:
      'What does an LC connector\u2019s 1.25 mm ferrule deliver that the older 2.5 mm ferrule (SC, ST, FC) does not?',
    options: [
      'Lower insertion loss in absolute terms.',
      'Roughly half the cross-section of a 2.5 mm ferrule, so panels can be packed at roughly twice the duplex-port density per rack-unit. Combined with the integral RJ-style latch and duplex clip, this is what made LC the in-building default — density is what matters when you have 48-96 horizontal fibres terminating at one floor distributor.',
      'Stronger mechanical retention.',
      'Compatibility with copper cables.',
    ],
    correctAnswer: 1,
    explanation:
      'Density is the LC value proposition. The half-diameter ferrule means a 1U patch panel can present ~96 LC duplex (192 fibres) where the same panel would carry ~48 SC duplex. For a floor distributor that has to terminate 48 work-area fibres plus uplinks and breakouts, this is decisive. Insertion loss per connector is similar across LC / SC / ST when polished and inspected to the same grade — density is the win.',
  },
  {
    id: 7,
    question:
      'An installer is preparing to plug a freshly-pulled OM4 LC patch lead into a port for the first time. What inspection / cleaning step MUST happen first?',
    options: [
      'None — factory pre-polished connectors are clean by definition.',
      'Inspect the endface with a fibre microscope (or a video probe per IEC 61300-3-35 acceptance criteria) and clean with an IBC click cleaner or lint-free wipe + IPA if any contamination is visible. Re-inspect, then mate. Even brand-new factory-polished connectors collect dust and lint between unboxing and mating; on-site air carries plenty of particulate.',
      'Bend-test the cable.',
      'Apply a drop of optical-grade gel to the ferrule.',
    ],
    correctAnswer: 1,
    explanation:
      'Cleanliness is the single most common cause of fibre faults. IEC 61300-3-35 sets the visual acceptance criteria for connector endfaces (zones, allowable defect counts and sizes). The discipline: inspect, clean, re-inspect, mate. Optical gel / index-matching fluid is NOT used in connector mating in modern systems — it traps dirt and degrades over time. Click cleaners (one-shot mechanical wipe via an internal tape) are the modern default; lint-free wipe with 99 %+ IPA is the alternative.',
  },
  {
    id: 8,
    question:
      'A site has a mix of legacy ST multimode and modern LC patch panels in the same comms room. Which approach to bridging them is preferred?',
    options: [
      'Force-mate them with a hard-handled adapter.',
      'Use a hybrid ST-to-LC patch lead (factory-terminated, both ends to the same fibre type), or break the legacy section out at a small migration patch panel that takes ST on one face and LC on the other. Same fibre type both sides (MM-to-MM only), same polish grade, factory terminations.',
      'Splice the legacy ST cores onto LC pigtails using crystal connectors.',
      'Run an APC adapter between them.',
    ],
    correctAnswer: 1,
    explanation:
      'Legacy connector formats can be bridged cleanly with hybrid patch leads or migration patch panels. The constraints: same fibre type both sides (multimode to multimode only — see the previous section\u2019s reminder against MM-to-SM splicing), same polish grade, factory-terminated ends. APC adapters are specifically WRONG for ST-to-LC because ST has no APC variant in common use. Field-terminating connectors of mixed formats is a maintenance liability — factory pre-polished or pigtailed-fusion is much cleaner.',
  },
  {
    id: 9,
    question:
      'What does "duplex" mean on a fibre patch lead, and why does multimode communication need it?',
    options: [
      'Two cables in one outer jacket.',
      'Two fibres in one patch lead — one for transmit, one for receive — so a single LC duplex connector at each end carries a full bidirectional link. Multimode systems are unidirectional per fibre (light goes one way), so you need a transmit fibre and a receive fibre to make a full Ethernet link. Single-mode short-reach and PON systems often use a single fibre with bidirectional optics (BiDi) on different wavelengths, but multimode duplex is the in-building norm.',
      'Twice the data rate per fibre.',
      'A polish grade.',
    ],
    correctAnswer: 1,
    explanation:
      'A duplex patch lead carries two fibres (transmit + receive). The duplex clip on an LC pair keeps polarity correct so the transmit fibre always lands on the receive side at the far end. BiDi optics on a single SM fibre exist (10G-BX-U / -D, GPON downstream / upstream) but are wavelength-multiplexed; in-building multimode universally uses duplex pairs. Polarity discipline at panels is the operational discipline that prevents transmit-to-transmit miswires.',
  },
  {
    id: 10,
    question:
      'Why is connector endface inspection covered by an INTERNATIONAL STANDARD (IEC 61300-3-35) rather than left to manufacturer guidance?',
    options: [
      'It is not — manufacturers each set their own acceptance criteria.',
      'IEC 61300-3-35 standardises the visual acceptance criteria for fibre connector endfaces — defining inspection zones (Core, Cladding, Adhesive, Contact / Outer), allowable defect counts and sizes per zone, scratch / pit / contamination classifications, and pass / fail thresholds. Without a single standard, a "clean" connector would mean different things to different inspectors and different test equipment, which would make commissioning, fault-finding and warranty claims arbitrary.',
      'Because BS 7671 demands it.',
      'Because TIA invented the connector.',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 61300-3-35 is the international acceptance standard for fibre connector endfaces. It is built into commercial fibre microscope / video-probe firmware: the probe captures the endface image, segments it into the standard zones, counts and sizes any defects, and flags pass / fail per IEC 61300-3-35 thresholds. This is what lets two contractors, two countries apart, agree on whether a connector is acceptable. Manufacturer guidance still applies (specific cleaning chemicals, ferrule materials), but the visual acceptance bar is in 61300-3-35.',
  },
];

const faqs = [
  {
    question: 'Why is the LC connector "RJ-shaped"?',
    answer: (
      <>
        LC was designed by Lucent in the late 1990s as the small-form-factor (SFF) successor to SC,
        with a deliberate visual cue — the RJ-45-style latching tab — so installers familiar with
        copper RJ-45 patching could intuit the latch action immediately. The 1.25 mm ferrule is half
        the diameter of the older 2.5 mm ferrule (SC / ST / FC), giving roughly twice the port
        density per panel rack-unit. The duplex clip joins two LC bodies into a single duplex
        connector for fast polarity reversal at a panel.
      </>
    ),
  },
  {
    question: 'Are there APC versions of multimode connectors?',
    answer: (
      <>
        In commercial use, no. APC (8° angled endface) exists almost exclusively as a single-mode
        polish grade. Multimode connectors are PC or UPC. The reason is multimode short reach and
        modal noise dominate the link budget — the return-loss benefit of an APC polish is wasted on
        multimode and the connector cost / colour-coding complexity is not justified. If you ever
        encounter an "MM APC" device it is a niche metrology / specialty item, not a cabling-system
        default.
      </>
    ),
  },
  {
    question: 'What is "polarity" at a duplex panel and why does it matter?',
    answer: (
      <>
        Polarity is the convention that ensures the transmit fibre at one end lands on the receive
        port at the other end. TIA-568.3-E and ISO/IEC 14763-2 define three polarity methods (A, B,
        C) for MPO / MTP-based parallel infrastructures, and the duplex equivalent for LC pairs. Get
        polarity wrong and the link does not come up — transmit goes to transmit. The duplex clip on
        LC pairs and the keyway on MTP/MPO connectors are the physical aids; the design document
        specifies which method (A / B / C) the project uses, and the installer must respect it at
        every patch-panel break-out.
      </>
    ),
  },
  {
    question: 'How does mating cleanliness affect the channel insertion-loss budget?',
    answer: (
      <>
        Each fibre connector pair contributes typically 0.3-0.5 dB (multimode) or 0.2-0.4 dB
        (single-mode) of insertion loss when CLEAN and inspected. A single fingerprint or speck of
        dust can push that to 1-3 dB at a single connector. In a typical channel with 4 connector
        pairs and a budget of say 2.6 dB total, two contaminated connectors will fail the link.
        Cleanliness is not optional — it is part of the loss budget.
      </>
    ),
  },
  {
    question: 'Why are "pre-polished, no-epoxy" field connectors quicker to terminate?',
    answer: (
      <>
        Traditional epoxy-and-polish field termination needs cleave, glue, cure, hand-polish through
        grit, and inspect — 10-15 minutes per connector minimum, longer in cold conditions.
        Pre-polished field connectors (mechanical-splice connectors, fusion-splice-on connectors, or
        pre-polished ferrule-style) have a factory-polished short fibre stub inside the connector;
        the installer cleaves the field fibre, inserts it, and a small mechanical splice or fusion
        splice bonds the field fibre to the stub. Time per termination drops to 2-5 minutes. Quality
        is more consistent because the polish is factory-controlled — at the cost of slightly higher
        loss per connector and higher consumable cost.
      </>
    ),
  },
  {
    question:
      'What is the "best" overall fibre termination — fusion splice, mechanical splice, or pre-polished field connector?',
    answer: (
      <>
        Fusion splice with a pigtail is the lowest-loss, most reliable, longest-life termination —
        typical 0.05-0.1 dB splice loss, mass production at production fusion splicers, and the stub
        fibre is factory-polished. Pre-polished field connectors are the fastest at 2-5 min per
        connector and are appropriate where time is decisive (small jobs, retrofits). Mechanical
        splice with mechanical splice connector is the cheapest in tooling but has the highest loss
        and the shortest service life. The professional default for permanent fibre-cable
        termination in the UK 2026 commercial market is pigtailed fusion splice into an LC patch
        panel.
      </>
    ),
  },
];

const DataCablingModule3Section2 = () => {
  const navigate = useNavigate();

  useSEO(
    'Connector Types and Polish Grades | Data Cabling Module 3.2 | Elec-Mate',
    'Fibre connector landscape — LC, SC, ST, FC, MTP/MPO — and the PC / UPC / APC polish grades. Why LC is the modern default, when APC is required, the colour code conventions, return-loss implications and the IEC 61300-3-35 endface inspection standard.'
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
            eyebrow="Module 3 · Section 2"
            title="Connector Types and Polish Grades"
            description="The fibre connector family — LC, SC, ST, FC, MTP/MPO — and the PC / UPC / APC polish grades. Why LC is the modern in-building default, when APC is required, the colour-code conventions that prevent miswires, and the IEC 61300-3-35 endface acceptance standard."
            tone="yellow"
          />

          <TLDR
            points={[
              'LC (1.25 mm ferrule, latching, duplex clip) is the modern in-building default — twice the panel density of SC / ST / FC. SC (push-pull, 2.5 mm) is the legacy duplex norm. ST (bayonet) is older multimode. FC (threaded) is metrology / lab. MTP/MPO is parallel-optic for 40 / 100 / 400 G.',
              'Polish grades: PC (~-35 dB return loss), UPC (~-50 dB, blue housings), APC (8° angled, ~-65 dB or better, green housings). Single-mode duplex is UPC default, APC for reflection-sensitive PON / RFoG / narrow-linewidth lasers. Multimode is PC or UPC — no APC variant in commercial use.',
              'NEVER mate APC to UPC / PC. The angled endface will not seat against a perpendicular endface, insertion loss spikes, return loss collapses, and both endfaces are damaged. Colour code (green = APC, blue = UPC) exists for this reason — but always confirm before mating.',
              'Endface cleanliness is the single most common fibre fault. Inspection per IEC 61300-3-35 (defined zones, defect-count thresholds), clean with IBC click cleaner or lint-free wipe + IPA, re-inspect, then mate. A single fingerprint can dominate the channel loss budget.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the principal fibre connector types (LC, SC, ST, FC, MTP/MPO) by ferrule diameter, latch action and typical application',
              'Explain why LC has become the in-building default — small ferrule density, latch tab, duplex clip — and where SC / ST / FC remain in use',
              'Distinguish PC, UPC and APC polish grades by return-loss specification and endface geometry, and explain when each is required',
              'Read the colour-code convention (green = APC, blue = UPC / PC, beige = MM PC) and use it to prevent mis-mating',
              'Explain why APC must never be mated to UPC or PC, and what damage occurs if it is',
              'Apply IEC 61300-3-35 endface acceptance criteria — inspection zones, defect counts, pass / fail thresholds — to commission and maintain fibre channels',
              'Choose the correct connector type and polish grade for a given application (in-building duplex, parallel-optic 100 G, PON access, long-haul SM)',
              'State the cleanliness discipline (inspect, clean, re-inspect, mate) and the typical insertion-loss contribution of a clean connector pair',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The connector family</ContentEyebrow>

          <ConceptBlock
            title="LC, SC, ST, FC and MTP/MPO — what each one is for"
            plainEnglish="Fibre connectors are the demountable interfaces that let an installer terminate a cable, plug it into a panel, and route the link through patch fields. Five connector types cover almost every commercial UK fibre installation. The choice is driven by application: density, vibration resistance, parallel-optic count, and field-termination tooling."
            onSite="In a typical 2026 UK office fit-out you will see LC duplex on every floor-distributor panel, SC duplex on legacy patch fields, occasional ST on equipment that has not been modernised, and MTP/MPO at parallel-optic uplinks (100 G / 400 G to the data-centre or hyperscale wireless heads). FC is rare outside lab and broadcast — its threaded coupling resists vibration but is slow to patch."
          >
            <p>The five connectors, by application:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>LC (Lucent Connector).</strong> 1.25 mm ferrule, RJ-style latch, duplex clip
                joins two for duplex applications. The modern in-building default since the early
                2000s. Used for SM and MM, all polish grades. ~96 duplex ports per 1U panel.
              </li>
              <li>
                <strong>SC (Subscriber / Square Connector).</strong> 2.5 mm ferrule, push-pull
                latch. The 1990s in-building default; still very common in legacy installations,
                still fully compliant. ~48 duplex ports per 1U panel. Easy to inspect and clean
                because the ferrule is bigger.
              </li>
              <li>
                <strong>ST (Straight Tip).</strong> 2.5 mm ferrule, bayonet twist-and-lock.
                Predominantly multimode, predominantly legacy. Found on older campus and industrial
                installations. Vibration-tolerant but slow to patch.
              </li>
              <li>
                <strong>FC (Ferrule Connector / Fixed Connection).</strong> 2.5 mm ferrule, threaded
                coupling. Niche commercial use; common in lab / metrology / broadcast where
                vibration immunity matters. The threaded nut takes seconds longer per mate than
                push-pull or latch.
              </li>
              <li>
                <strong>MTP/MPO (Multi-fibre Push-On).</strong> Multi-fibre ferrule (8, 12 or 24
                fibres in one connector), keyed for orientation. The standard for parallel-optic 40
                / 100 / 400 GbE links. MTP is a brand name for a high-precision MPO; both are fully
                interoperable when keys / polarity match.
              </li>
            </ul>
            <p>
              Hybrid patch leads (e.g. ST-to-LC, SC-to-LC) bridge mixed installations — both ends
              terminate to the same fibre type and polish grade, the body bridges the format
              difference. Mixing fibre types (MM-to-SM) across a hybrid lead does not work; mixing
              polish grades (UPC-to-APC) destroys the link.
            </p>
          </ConceptBlock>

          {/* Connector family diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Fibre connector family — ferrule size, typical use, and polish-grade colour code
            </h4>
            <svg
              viewBox="0 0 900 620"
              className="w-full h-auto"
              role="img"
              aria-label="Five connector types in a row: LC, SC, ST, FC and MTP/MPO. Each connector sits in its own cell with the connector name above, a stylised body with its ferrule, and the form factor and typical use in dedicated rows below. A polish-grade legend at the bottom maps PC, UPC and APC to their housing colours: PC beige, UPC blue, APC green, with return-loss values."
            >
              {/* ===== Cell row — connector silhouettes ===== */}
              {[
                {
                  x: 25,
                  label: 'LC',
                  form: '1.25 mm ferrule · latch',
                  use: 'In-building default · duplex clip',
                },
                {
                  x: 200,
                  label: 'SC',
                  form: '2.5 mm ferrule · push-pull',
                  use: 'Legacy duplex · simple to clean',
                },
                {
                  x: 375,
                  label: 'ST',
                  form: '2.5 mm ferrule · bayonet',
                  use: 'Older multimode · campus',
                },
                {
                  x: 550,
                  label: 'FC',
                  form: '2.5 mm ferrule · threaded',
                  use: 'Lab · broadcast · vibration',
                },
                {
                  x: 725,
                  label: 'MTP/MPO',
                  form: '8 / 12 / 24 fibre · keyed',
                  use: 'Parallel optics 40/100/400 G',
                },
              ].map((c, i) => {
                const cx = c.x + 75;
                return (
                  <g key={'c-' + i}>
                    {/* Cell border */}
                    <rect
                      x={c.x}
                      y="50"
                      width="150"
                      height="240"
                      rx="10"
                      fill="rgba(255,255,255,0.03)"
                      stroke="rgba(255,255,255,0.10)"
                      strokeWidth="1"
                    />
                    {/* Connector name above body */}
                    <text
                      x={cx}
                      y="38"
                      textAnchor="middle"
                      fill="#FDE68A"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="system-ui"
                    >
                      {c.label}
                    </text>

                    {/* Connector body silhouette */}
                    <rect
                      x={c.x + 25}
                      y="80"
                      width="100"
                      height="110"
                      rx="8"
                      fill="rgba(234,179,8,0.10)"
                      stroke="#EAB308"
                      strokeWidth="1.6"
                    />

                    {/* Ferrule — drawn to relative scale */}
                    {c.label === 'MTP/MPO' ? (
                      <rect
                        x={cx - 14}
                        y="125"
                        width="28"
                        height="22"
                        rx="2"
                        fill="#FACC15"
                        stroke="#FDE68A"
                        strokeWidth="1.2"
                      />
                    ) : c.label === 'LC' ? (
                      <circle
                        cx={cx}
                        cy="135"
                        r="5"
                        fill="#FACC15"
                        stroke="#FDE68A"
                        strokeWidth="1.2"
                      />
                    ) : (
                      <circle
                        cx={cx}
                        cy="135"
                        r="10"
                        fill="#FACC15"
                        stroke="#FDE68A"
                        strokeWidth="1.2"
                      />
                    )}

                    {/* Connector-specific feature decoration (kept inside body — body IS its container) */}
                    {c.label === 'LC' && (
                      <rect
                        x={c.x + 60}
                        y="80"
                        width="30"
                        height="14"
                        rx="3"
                        fill="rgba(234,179,8,0.30)"
                        stroke="#FCD34D"
                        strokeWidth="1"
                      />
                    )}
                    {c.label === 'ST' && (
                      <rect
                        x={c.x + 30}
                        y="170"
                        width="90"
                        height="12"
                        rx="3"
                        fill="rgba(234,179,8,0.30)"
                        stroke="#FCD34D"
                        strokeWidth="1"
                      />
                    )}
                    {c.label === 'FC' && (
                      <circle
                        cx={cx}
                        cy="178"
                        r="14"
                        fill="none"
                        stroke="#FCD34D"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Form factor BELOW body — first label row */}
                    <text
                      x={cx}
                      y="218"
                      textAnchor="middle"
                      fill="#E5E7EB"
                      fontSize="10.5"
                      fontWeight="600"
                      fontFamily="system-ui"
                    >
                      {c.form}
                    </text>
                    {/* Use BELOW body — second label row */}
                    <text
                      x={cx}
                      y="240"
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="10"
                      fontFamily="system-ui"
                    >
                      {c.use.split(' · ')[0]}
                    </text>
                    <text
                      x={cx}
                      y="258"
                      textAnchor="middle"
                      fill="#9CA3AF"
                      fontSize="10"
                      fontFamily="system-ui"
                    >
                      {c.use.split(' · ')[1] || ''}
                    </text>
                  </g>
                );
              })}

              {/* ===== Polish-grade legend (at bottom, own bordered panel) ===== */}
              <rect
                x="25"
                y="320"
                width="850"
                height="280"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="45"
                y="346"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                POLISH GRADES (HOUSING COLOUR CODE)
              </text>

              {/* Three polish swatches in a row */}
              {/* PC — beige */}
              <rect
                x="45"
                y="368"
                width="40"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.20)"
                stroke="#FCD34D"
                strokeWidth="1.6"
              />
              <text
                x="65"
                y="392"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PC
              </text>
              <text
                x="100"
                y="380"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Physical contact · beige / black
              </text>
              <text x="100" y="398" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Return loss ~ −35 dB · legacy MM
              </text>

              {/* UPC — blue */}
              <rect
                x="45"
                y="428"
                width="40"
                height="40"
                rx="6"
                fill="rgba(59,130,246,0.25)"
                stroke="#3B82F6"
                strokeWidth="1.6"
              />
              <text
                x="65"
                y="452"
                textAnchor="middle"
                fill="#DBEAFE"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                UPC
              </text>
              <text
                x="100"
                y="440"
                fill="#93C5FD"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Ultra physical contact · blue
              </text>
              <text x="100" y="458" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Return loss ~ −50 dB · default SM duplex · MM
              </text>

              {/* APC — green */}
              <rect
                x="45"
                y="488"
                width="40"
                height="40"
                rx="6"
                fill="rgba(34,197,94,0.25)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="65"
                y="512"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                APC
              </text>
              <text
                x="100"
                y="500"
                fill="#86EFAC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                Angled physical contact · green · 8°
              </text>
              <text x="100" y="518" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                Return loss ~ −65 dB or better · PON / RFoG / coherent
              </text>

              {/* Right column — rules */}
              <text
                x="500"
                y="368"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                MATING RULES
              </text>

              <rect
                x="500"
                y="380"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.25)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="524" y="392" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Two greens may mate (APC ↔ APC)
              </text>

              <rect
                x="500"
                y="404"
                width="14"
                height="14"
                rx="3"
                fill="rgba(59,130,246,0.25)"
                stroke="#3B82F6"
                strokeWidth="1.4"
              />
              <text x="524" y="416" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Two blues may mate (UPC ↔ UPC)
              </text>

              <text
                x="500"
                y="442"
                fill="#FCA5A5"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                NEVER mate APC to UPC / PC
              </text>
              <text x="500" y="460" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                8° angled face will not seat against
              </text>
              <text x="500" y="476" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                a perpendicular face — permanent damage.
              </text>

              <text
                x="500"
                y="504"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                STANDARDS
              </text>
              <text x="500" y="524" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                IEC 61754 series — mechanical interfaces
              </text>
              <text x="500" y="542" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                IEC 61300-3-35 — endface acceptance
              </text>
              <text x="500" y="560" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                IEC 61755-3-31 / -3-32 — polish geometry
              </text>

              {/* Density note (footer line, full-width below) */}
              <line
                x1="45"
                y1="572"
                x2="855"
                y2="572"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="590"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                LC ~96 duplex / 1U panel · SC ~48 duplex / 1U · ST and FC similar to SC · MTP/MPO 12
                fibres per ferrule
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

          <ContentEyebrow>Polish grades — PC, UPC, APC</ContentEyebrow>

          <ConceptBlock
            title="The three endface geometries — what they reflect and what they mean for the link"
            plainEnglish="Polish grade is the geometry of the connector endface where the two ferrules meet. The geometry sets the proportion of incident light reflected back toward the source — return loss. Three conventions cover almost everything: PC (physical contact, simple flat-domed), UPC (ultra physical contact, tighter convex), and APC (angled physical contact, 8° angled). Higher return-loss number (more negative dB value) means less back-reflection and a cleaner upstream signal."
            onSite="In a 2026 UK fit-out: multimode is PC or UPC, blue or beige housings; single-mode duplex is UPC blue; single-mode reflection-sensitive (PON, GPON, XGS-PON, RFoG, narrow-linewidth DFB / coherent) is APC green. The colour code is your fast on-site check. The print legend on the patch lead and the connector body should both confirm. Two greens mate. Two blues mate. Green to blue is a hardware-damaging error."
          >
            <p>The three polish grades:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>PC — physical contact.</strong> The original flat-domed polish. Return loss
                typically -35 dB. Found on older multimode systems and budget patch leads. Adequate
                for non-reflection-sensitive applications; superseded by UPC for new installations.
              </li>
              <li>
                <strong>UPC — ultra physical contact.</strong> Tighter convex polish, return loss
                typically -50 dB. Blue housings (industry convention). Default for general
                single-mode duplex (10GBASE-LR, 25GBASE-LR Ethernet) and the default for modern
                multimode in commercial use.
              </li>
              <li>
                <strong>APC — angled physical contact.</strong> 8° angled endface, return loss
                typically -65 dB or better. Green housings (industry convention). Mandatory for
                reflection-sensitive applications: PON / GPON / XGS-PON access networks, RFoG /
                CATV, analogue RF over fibre, narrow-linewidth DFB and coherent transceivers, OTDR
                test ports. Single-mode only — no widespread multimode APC variant.
              </li>
            </ul>
            <p>
              Why does return loss matter for some services but not others? Reflection-sensitive
              systems share a fibre or share an optical wavelength with their upstream / downstream
              partner — back-reflections from connectors couple light into the wrong direction and
              destabilise narrow-linewidth lasers. Robust digital Ethernet links (IM/DD with simple
              receivers) tolerate -35 to -50 dB return loss without measurable degradation. Coherent
              optical systems (DWDM, 100 G+ coherent) and analogue services see noise, modulation
              instability or laser locking issues if return loss is poor — APC fixes that by design.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IEC 61755-3-31 / -3-32 — Optical interface, polish grade endface specification (paraphrased)"
            clause={
              <>
                Single-mode connector endfaces shall conform to one of three principal polish
                grades: PC (physical contact, return loss ≥ 35 dB), UPC (ultra physical contact,
                return loss ≥ 50 dB), or APC (angled physical contact, 8° angled endface, return
                loss ≥ 65 dB). Connectors of different polish grades shall not be mated; the
                resulting endface geometry mismatch will damage the polished surfaces and introduce
                excessive insertion loss.
              </>
            }
            meaning="The three polish grades are not interchangeable. APC must mate to APC; UPC and PC may inter-mate at the cost of the lower return loss but only on the same fibre type. Connector colour code (green = APC, blue = UPC / PC, beige = MM PC) and panel layout discipline are how you keep them apart on a busy site. Mating an APC to a UPC is a permanent-damage event — both endfaces require re-termination or scrap."
            cite="Paraphrased from the IEC 61755 connector-interface series — single-mode polish geometries and return-loss thresholds"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <AppendixTable
            caption="Polish-grade quick reference"
            source="IEC 61755 series / TIA-568.3-E"
            headers={['Grade', 'Endface', 'Return loss', 'Housing colour', 'Typical application']}
            rows={[
              [
                'PC',
                'Flat / slightly domed',
                '~-35 dB',
                'Beige (MM) / black (legacy)',
                'Legacy MM; simple non-critical SM',
              ],
              [
                'UPC',
                'Convex, tight polish',
                '~-50 dB',
                'Blue',
                'Default SM duplex Ethernet · MM Cat5/6/6A counterpart standard',
              ],
              [
                'APC',
                '8° angled endface',
                '~-65 dB or better',
                'Green',
                'PON / GPON / XGS-PON · RFoG · narrow-linewidth DFB / coherent · OTDR ports',
              ],
              [
                'MTP/MPO PC',
                'Flat multi-fibre',
                '~-30 dB per fibre',
                'Aqua (MM) / yellow (SM)',
                'Parallel optics 40 / 100 / 400 G short reach',
              ],
              [
                'MTP/MPO APC',
                '8° angled multi-fibre',
                '~-55 dB per fibre',
                'Green',
                'Parallel optics SM long-reach / PON parallel',
              ],
            ]}
            notes="Colour conventions are TIA-598-D / industry practice — always confirm against the print legend. Never mate APC to UPC or PC: the angled endface will not seat correctly, and forcing the mate damages both connectors permanently."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Endface cleanliness — IEC 61300-3-35</ContentEyebrow>

          <ConceptBlock
            title="The single most common fibre fault, and the discipline that prevents it"
            plainEnglish="Endface contamination is the leading cause of intermittent and degraded fibre links. A single dust particle, fingerprint, or oil residue on a 9 µm SM core dominates the loss budget at that connector — easily 1-3 dB at one mating, on a channel that may have a 2.6 dB total budget. The international standard IEC 61300-3-35 sets the visual acceptance criteria for fibre connector endfaces: defined inspection zones, allowable defect counts and sizes per zone, pass / fail thresholds. Modern fibre microscopes and video probes implement IEC 61300-3-35 in firmware and report a pass / fail per connector."
            onSite='Discipline: inspect, clean, re-inspect, mate. Every time. The fibre microscope or video probe is in your kit, not optional. Click cleaners (one-shot mechanical wipe via internal tape) are the modern default for routine cleaning; a lint-free wipe with 99 % isopropyl alcohol is the alternative. Never blow on a connector ("you might be clearing dust" — you are adding moisture and saliva droplets), never wipe with clothing, never plug in a connector that has not been inspected since it was last open.'
          >
            <p>The IEC 61300-3-35 framework, briefly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Inspection zones.</strong> The endface is segmented into concentric zones —
                Core (centre, most critical), Cladding (immediate ring), Adhesive (ring around
                cladding), and Contact / Outer (where two ferrules touch). Defects are tolerated
                differently in each zone — most stringent in the core, more relaxed at the outer
                ring where light is not propagating.
              </li>
              <li>
                <strong>Defect classifications.</strong> Scratches (linear), pits and chips (defects
                in the glass), and contamination (loose particles, oil, residue). Each is assessed
                by zone, count and size.
              </li>
              <li>
                <strong>Pass / fail criteria.</strong> The standard sets thresholds (e.g. zero
                defects &gt; 5 µm in the core zone, limited counts of small defects in cladding,
                etc.). The fibre microscope or video probe applies these automatically and prints a
                pass / fail badge.
              </li>
              <li>
                <strong>Cleaning protocol.</strong> Inspect → clean (click cleaner or lint-free wipe
                + IPA) → re-inspect → mate. If a connector fails after two cleanings, it must be
                re-terminated. Acceptance is the cleaned, inspected, re-inspected pass — not "looked
                OK".
              </li>
            </ul>
            <p>
              A clean, inspected connector pair contributes typically 0.3-0.5 dB (multimode) or
              0.2-0.4 dB (single-mode) of insertion loss — small enough to leave room for the other
              connectors and fibre attenuation in the channel. A dirty connector pair contributes
              1-3 dB or more — and that swing alone can break a link that was working yesterday.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Mating an APC patch lead into a UPC adapter because both are LC and both fit"
            whatHappens={
              <>
                Engineer has a green-bodied APC LC patch lead and a blue-bodied UPC LC adapter.
                Mechanically the LC bodies are the same size, the latch fits, and the connector
                seats. But the 8° angled endface of the APC lead does not seat against the
                perpendicular endface of the UPC ferrule on the other side — a small air gap forms,
                insertion loss spikes 1-3 dB, return loss drops, and (worse) repeated mates scratch
                and chip both endfaces. Within a few cycles, both connectors are irreparably
                damaged.
              </>
            }
            doInstead={
              <>
                Confirm housing colour AND polish grade BEFORE every mate. Green = APC, blue = UPC.
                Two greens may mate; two blues may mate; green to blue is a hard stop. If the
                project mixes APC and UPC patches (e.g. a PON access leg into a non-PON Ethernet
                core), use a fibre conversion adapter / hybrid patch lead with APC on one end and
                UPC on the other — bonded internally so the polish-grade transition is handled in a
                controlled connector. Document the mixed-polish boundary on the patching record.
              </>
            }
          />

          <Scenario
            title="The 'all yellow, all LC' assumption — and what it cost"
            situation={
              <>
                A retrofit job. The new patches arrived from the supplier in mixed crates: some
                green (APC) for an upcoming GPON migration, some blue (UPC) for the existing
                Ethernet links. A junior installer, on a Friday afternoon, sees "yellow jackets, LC
                connectors" and patches them onto the operational Ethernet panels without checking
                polish grade. By Monday morning, six links are reporting elevated errors and two
                have fallen over.
              </>
            }
            whatToDo={
              <>
                Stop further patching, identify every newly-touched connector, and inspect each
                endface with a fibre microscope per IEC 61300-3-35. Where APC connectors have been
                mated to UPC adapters, both ferrules are likely damaged — re-terminate or replace.
                Replace the green-bodied APC patches in the Ethernet panels with the correct
                blue-bodied UPC patches. Document the remediation and the original mis-patching;
                update the local labelling to colour-code panel ports clearly (PON-aligned panels
                green-marked, Ethernet panels blue-marked). Brief the team on the rule: housing
                colour is the fast check, the print legend is the truth, and APC never mates to UPC.
              </>
            }
            whyItMatters={
              <>
                The colour code exists for exactly this scenario. A junior on a Friday afternoon
                with a busy panel cannot read every print legend on every cable — but they can see
                green vs blue at a glance. The mis-mate is a permanent-damage event, not a soft
                error. The recovery is connector-by-connector, with re-terminations where ferrules
                are scored. The lesson: process discipline (colour-code panels, brief the team on
                the rule, inspect-before-mate) prevents the most expensive five minutes a fibre
                installer can have.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'LC (1.25 mm ferrule, latch, duplex clip) is the modern in-building default. SC, ST, FC are 2.5 mm legacy / niche. MTP/MPO is parallel-optic for 40 / 100 / 400 G.',
              'Three polish grades: PC (~-35 dB return loss), UPC (~-50 dB, blue), APC (8° angled, ~-65 dB or better, green). UPC default for SM duplex; APC for reflection-sensitive PON / RFoG / coherent. Multimode is PC or UPC only.',
              'NEVER mate APC to UPC or PC. The 8° angled endface destroys both ferrules. Colour code (green = APC, blue = UPC) is the fast check; always confirm before mating.',
              'Endface cleanliness is the single most common fibre fault. IEC 61300-3-35 sets the visual acceptance criteria. Discipline: inspect, clean (IBC click cleaner or lint-free wipe + IPA), re-inspect, mate.',
              'A clean inspected connector pair contributes 0.2-0.5 dB insertion loss; a contaminated pair contributes 1-3 dB or more. Cleanliness is part of the loss budget, not an extra.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-1')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Fibre types
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Cleaving, splicing and connectorisation
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule3Section2;
