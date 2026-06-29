/**
 * Module 3 · Section 3 · Sub 1 — Final circuit types
 * City & Guilds 2365-02 → Unit 203 → LO3 → AC 3.1
 *   AC 3.1 — "Describe principles of operation of different circuit types"
 *
 * Six final-circuit families: radial, ring final, lighting (loop-in), cooker /
 * shower (dedicated radial), FCU spurs, special-circuits (boilers, EV, PV).
 * Cross-refs forward to Sub3 (cable sizing) and §4 (earthing/ADS).
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
import { ConsumerUnit } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Final circuit types | Level 2 Module 3.3.1 (AC 3.1) | Elec-Mate';
const DESCRIPTION =
  'Six final-circuit shapes you’ll meet on every UK install — radial, ring, lighting loop-in, cooker, shower, FCU spurs and dedicated specials. Operating principle, typical CSA, MCB rating and BS 7671 limits for each.';

const checks = [
  {
    id: 'ring-evidence-check',
    question:
      'Two line conductors at the MCB, two at the neutral bar and two at the earth bar — what circuit shape is this?',
    options: [
      'Radial',
      'FCU spur',
      'Ring final',
      'Lighting loop-in',
    ],
    correctIndex: 2,
    explanation:
      'Two-of-everything at the protective device is the classic ring-final fingerprint — the cable leaves and returns to the same MCB or RCBO. Radials land a single conductor at each terminal.',
  },
  {
    id: 'spur-rule-check',
    question:
      'How many unfused single 13 A socket spurs are permitted off any one point on a 2.5 mm² ring final?',
    options: [
      'Zero — all spurs must be fused',
      'Unlimited, provided total load < 32 A',
      'Two',
      'One',
    ],
    correctIndex: 3,
    explanation:
      'On-Site Guide / BS 7671 433.1.204 — one unfused spur per teed-off point on a 2.5 mm² ring (one single or one twin). Beyond that, hang it off an FCU and the 13 A fuse polices the spur cable.',
  },
  {
    id: 'shower-csa-check',
    question:
      'A 9.5 kW electric shower at 230 V draws roughly 41 A. The smallest cable typically picked for a short clipped-direct run is:',
    options: [
      '2.5 mm² T&E',
      '4 mm² T&E',
      '6 mm² T&E',
      '10 mm² T&E',
    ],
    correctIndex: 2,
    explanation:
      '6 mm² T&E clipped direct is rated around 47 A — comfortable for a 9.5 kW shower on a 40 A or 45 A MCB. 2.5 and 4 mm² won’t carry it, 10 mm² is over-size for a short run. We’ll do the proper Iz/derate calc in Sub3.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A radial final circuit is best described as:',
    options: [
      'A circuit with a single cable going from the consumer unit to the last accessory, with branches off as needed',
      'A circuit whose cable leaves the protective device, daisies through every accessory and returns to the same device',
      'A circuit protected by two separate devices sharing the load between parallel conductors',
      'A circuit fed from a fused connection unit rather than directly from a protective device',
    ],
    correctAnswer: 0,
    explanation:
      'Radial = one cable leaves the protective device and runs out to the loads, branching at accessories rather than looping back. Most lighting and dedicated appliance circuits in UK domestic are radials.',
  },
  {
    id: 2,
    question:
      'A 32 A ring final circuit wired in 2.5 mm² T&E to BS 7671 must comply with 433.1.204. Which protective devices are permitted?',
    options: [
      'BS 1362 cartridge fuses rated at 13 A only',
      'BS EN 60269-3 fuses rated above 45 A',
      'BS 88, BS 3036, BS EN 60898, BS EN 60947-2 or BS EN 61009-1 RCBO at 30 A or 32 A',
      'Any device rated 40 A or higher, provided RCD protection is fitted',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 433.1.204 names the device families and the 30 A or 32 A ratings. RCBOs (BS EN 61009-1) are the modern domestic norm because they combine overload, fault current and 30 mA earth-fault protection in one module.',
  },
  {
    id: 3,
    question:
      'A standard 6 A or 10 A lighting circuit is most commonly wired in:',
    options: [
      '2.5 mm² T&E',
      '1.0 mm² T&E',
      '4 mm² T&E',
      '1.5 mm² T&E',
    ],
    correctAnswer: 3,
    explanation:
      '1.5 mm² T&E is the workhorse for domestic lighting circuits — comfortable Iz on a 6 A or 10 A circuit and gives some headroom for voltage drop on long runs. 1.0 mm² is permitted but tighter; 2.5 mm² is over-size for typical lighting loads.',
  },
  {
    id: 4,
    question:
      'A 7 kW EV charge point on a single-phase supply is closest to:',
    options: [
      '32 A',
      '20 A',
      '16 A',
      '45 A',
    ],
    correctAnswer: 0,
    explanation:
      'I = P ÷ V = 7000 ÷ 230 ≈ 30.4 A. Round up to a standard 32 A protective device on its own dedicated radial — usually 6 mm² T&E clipped direct with a Type A or Type B RCD per the charger manufacturer.',
  },
  {
    id: 5,
    question:
      'In a 3-plate (loop-in) lighting installation, the permanent line, neutral and switched-line all terminate at:',
    options: [
      'The wall switch back-box',
      'The ceiling rose / loop-in box',
      'A junction box buried in the wall',
      'The consumer unit neutral bar',
    ],
    correctAnswer: 1,
    explanation:
      'Loop-in style brings line and neutral to the rose, with a switch drop to a wall switch. The switched line returns to the rose, where line+neutral feed the lamp. Saves cable and keeps junctions accessible at the rose.',
  },
  {
    id: 6,
    question:
      'A spur off a ring final feeds two double sockets via a 13 A switched FCU. What polices the spur cable from the ring?',
    options: [
      'Nothing — it relies on the ring MCB',
      'The RCD on the consumer unit',
      'The 13 A fuse inside the FCU',
      'The ring conductor itself, by self-limitation',
    ],
    correctAnswer: 2,
    explanation:
      'Once you hang an FCU off the ring, the 13 A BS 1362 fuse inside the FCU protects the downstream spur cable. That’s why you can run as many sockets as you like off an FCU spur — they’re collectively protected at 13 A, not at the 32 A of the ring.',
  },
  {
    id: 7,
    question:
      'A heat-only domestic boiler with a 3 A internal fuse is wired:',
    options: [
      'Direct to a dedicated 32 A radial with no local fuse',
      'Off the lighting circuit via a 6 A junction box',
      'Through a 13 A plug into the nearest ring-final socket',
      'Off a switched FCU on the ring final, with the 3 A fuse inside the FCU',
    ],
    correctAnswer: 3,
    explanation:
      'Boilers are almost always fed from a switched FCU on the ring, with a 3 A or 5 A BS 1362 fuse inside the FCU per the manufacturer’s instructions. Provides local isolation, fuse protection sized to the appliance, and meets the unswitched-load requirement.',
  },
  {
    id: 8,
    question:
      'Which type of final circuit is required to be on its own dedicated radial under all common UK domestic designs?',
    options: [
      'A 9.5 kW electric shower',
      'A single fused-spur to a doorbell transformer',
      'A 32 A socket-outlet ring',
      'A 6 A lighting circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Showers are always on their own dedicated radial (no other loads sharing the circuit) sized for the appliance — typically 32–45 A protective device, 6 or 10 mm² T&E. Manufacturer instructions and the MIs almost always require this.',
  },
];

const faqs = [
  {
    question: "Why is the UK ring final circuit so unusual internationally?",
    answer:
      "Post-WWII Britain had a copper shortage and wanted to standardise on the BS 1363 13 A fused plug. The ring-final lets you feed a lot of sockets from a single 32 A MCB using only 2.5 mm² cable, because the load splits between two paths. Most other countries use radial socket circuits at 16 A or 20 A in heavier cable. Both work — the UK approach was an economy decision that stuck.",
  },
  {
    question: "Can I add a socket to an existing ring final by running a spur?",
    answer:
      "Yes — one unfused spur (single or twin socket) per teed-off point on the ring, in 2.5 mm² minimum. If you want more outlets in one location, fit a fused connection unit (FCU) and the 13 A fuse inside it polices everything downstream. It’s notifiable under Part P if you’re creating a new circuit, but adding a single spur to an existing one isn’t.",
  },
  {
    question: "Why is the lighting circuit always wired in 1.5 mm², even for one little LED downlight?",
    answer:
      "Standardisation. Every loop-in fitting, ceiling rose and switch terminal is sized for 1.5 mm². Going smaller saves a tiny bit of copper but creates voltage-drop headaches on long runs and makes the install harder to extend. 1.5 mm² also stays well clear of its Iz on a 6 A or 10 A MCB even with derating for grouping in a loft.",
  },
  {
    question: "What’s the difference between a switched FCU and an unswitched one?",
    answer:
      "Mechanically the same — they’re a 13 A BS 1362 fused outlet hanging off a ring. Switched FCUs add a local isolator (handy for boilers, fridges, immersions you’ll want to power down for service). Unswitched are flush, set-and-forget — typical for door bells, CCTV transformers and anywhere you don’t want a tenant flicking the switch.",
  },
  {
    question: "Do EV chargers and PV inverters always need their own circuit?",
    answer:
      "Yes — both go on dedicated radials sized for the device per the manufacturer’s instructions. EV chargers also need specific RCD types (Type A with 6 mA DC detection, or Type B for older charger designs) per BS 7671 Section 722, and PV inverters need the AC side breaker per Section 712. We’ll go deeper on RCD types in Sub4.",
  },
  {
    question: "Why are kitchen sockets sometimes on a separate ring from the rest of the house?",
    answer:
      "Kitchens stack high-power loads — kettle, toaster, microwave, dishwasher all running together. Putting them on a dedicated kitchen ring keeps a fault or trip out of the rest of the house and reduces the chance the 32 A MCB sees an overload. Reg 314.1 says ‘divide installations into circuits to avoid danger and minimise inconvenience’ — that’s the regulatory hook.",
  },
];

export default function Sub1() {
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 1"
            title="Final circuit types"
            description="Six circuit shapes you’ll meet daily on UK installs. Get the shape wrong and you’ve got nuisance trips, dead lights or — worst case — a fire."
            tone="emerald"
          />

          <TLDR
            points={[
              'Six families: radial, ring, lighting loop-in, cooker, shower, FCU spurs and special-purpose dedicated radials (boilers, EV, PV).',
              'Each family has its own typical CSA, protective-device rating and BS 7671 design rule. Pick wrong and 433.1 stops being satisfied.',
              'Ring vs radial is a wiring-shape choice. The protection — overload, fault, RCD, AFDD — is layered on top in Sub4. Both choices have to work together.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the principle of operation of a radial final circuit and identify it at the consumer unit.',
              'Describe a ring final circuit, its load-sharing principle and the BS 7671 433.1.204 limits.',
              'Describe a lighting loop-in (3-plate) circuit and where line, neutral, switched-line and CPC terminate.',
              'Describe shower and cooker circuits as dedicated radials sized to the appliance.',
              'Describe FCU spurs (switched and unswitched) and the role of the BS 1362 fuse in policing the spur cable.',
              'Recognise dedicated specials (boilers, EV chargers, PV inverters, immersion heaters) and explain why they’re always on their own circuit.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why six shapes — not just one</ContentEyebrow>

          <ConceptBlock
            title="A final circuit is the last leg of an installation"
            plainEnglish="Distribution circuits feed boards. Final circuits feed loads. A final circuit starts at a protective device on a board and ends at the accessory or appliance — nothing else downstream."
            onSite="Walk into any house — the consumer unit has six to twelve protective devices, each one is the start of a final circuit. The shape that circuit takes (radial, ring, dedicated) is what we’re sorting out in this Sub."
          >
            <p>
              BS 7671 doesn’t mandate one universal circuit shape — it sets out the protection rules
              (433.1, 411, 522) and lets the designer pick the wiring topology that meets them. The
              six shapes below are the ones you’ll actually meet on UK domestic and small-commercial
              jobs. Each one solves a slightly different problem:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Radial</strong> — single cable out, branches at accessories. Default shape
                for almost every dedicated load.
              </li>
              <li>
                <strong>Ring final</strong> — two cables looping back to the same MCB. UK-only
                quirk that lets 32 A run on 2.5 mm².
              </li>
              <li>
                <strong>Lighting (loop-in)</strong> — radial in topology, but with a specific
                wiring style at each rose to keep junctions accessible.
              </li>
              <li>
                <strong>Shower / cooker</strong> — dedicated radial, sized to the appliance.
              </li>
              <li>
                <strong>FCU spurs</strong> — fused branches off a ring or radial for fixed
                appliances, with a 13 A BS 1362 fuse policing the spur cable.
              </li>
              <li>
                <strong>Special-purpose dedicated</strong> — boilers, EV chargers, PV inverters,
                immersion heaters. Their own circuit with manufacturer-specified protection.
              </li>
            </ul>
          </ConceptBlock>

          <ConsumerUnit caption="A typical split-load CU. Each protective device on the rail is the origin of a single final circuit. The mix of ratings (6 A lights, 16 A immersion, 20 A radials, 32 A rings, 40 A shower) tells the story of which final-circuit shapes are downstream." />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 314.1 (Division of installations)"
            clause="Every installation shall be divided into circuits, as necessary, to: (a) avoid danger and minimize inconvenience in the event of a fault; (b) facilitate safe inspection, testing and maintenance; (c) take account of hazards that may arise from the failure of a single circuit such as a lighting circuit; (d) reduce the possibility of unwanted tripping of RCDs due to excessive protective conductor (PE) currents not due to a fault; (e) mitigate the effects of electromagnetic disturbances; (f) prevent the indirect energizing of a circuit intended to be isolated."
            meaning={
              <>
                Translation: more circuits, smaller bites. A single fault on one circuit shouldn’t
                take everything offline. That principle is exactly why you don’t see one giant
                ring serving the whole house — you see a kitchen ring, a downstairs sockets ring,
                an upstairs sockets ring, separate lighting per floor, and dedicated specials.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 314.1."
          />

          <SectionRule />

          <ContentEyebrow>1 — Radial final circuits</ContentEyebrow>

          <ConceptBlock
            title="The default shape — one cable, one direction"
            plainEnglish="Cable leaves the MCB, branches at accessories as needed, ends at the last point on the run. No looping back."
            onSite="If you can stand at the consumer unit and trace a single cable that ends out at one location with no return path, it’s a radial. Common for kitchen appliance circuits, immersion, dedicated equipment, and lighting."
          >
            <p>Typical sizes you’ll meet on domestic radials:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>16 A radial</strong> — 2.5 mm² T&E, smaller socket loads, fixed equipment.
              </li>
              <li>
                <strong>20 A radial</strong> — 2.5 mm² T&E, sockets up to 50 m² floor area
                (per the OSG informal guidance).
              </li>
              <li>
                <strong>32 A radial</strong> — 4 mm² T&E (or 6 mm² depending on derating),
                sockets up to 75 m² floor area.
              </li>
            </ul>
            <p>
              <strong>Failure mode:</strong> open circuit anywhere on the run takes down everything
              downstream of the break. A short to earth trips the protective device. Both fault
              modes are easy to localise because the break tells you where to look.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>2 — Ring final circuits</ContentEyebrow>

          <ConceptBlock
            title="Two cables, one MCB — load shares between the two paths"
            plainEnglish="The cable leaves the MCB, daisies through every socket on the circuit and comes back to the same MCB. Load at any socket flows in via two paths, so each cable only carries half the worst-case current."
            onSite="At the consumer unit you’ll see two line conductors at one MCB or RCBO terminal, two at the neutral bar going to the same circuit, and two at the earth bar. Open the back box of any socket on the ring and you’ll see two T&E cables in plus any spurs going out."
          >
            <p>
              The clever bit: a 32 A ring on 2.5 mm² T&E works because the cable’s own Iz only has
              to carry half the load at the worst point — the other half is going round the long
              way. That’s why the regs allow 2.5 mm² (rated about 27 A clipped direct) on a 32 A
              MCB, when a single 32 A radial would need 4 or 6 mm².
            </p>
            <p>
              <strong>Spurs:</strong> one unfused single or twin socket per teed-off point on the
              ring (OSG and 433.1.204). For more sockets at one location, hang a 13 A switched FCU
              off the ring — the FCU’s fuse polices the spur, so you can run as many sockets as
              you like downstream.
            </p>
            <p>
              <strong>Failure mode:</strong> a break in one leg of the ring doesn’t kill anything —
              the load just feeds in from one side instead of two. Trouble is, you won’t know it
              happened until the other leg gets overloaded and starts to overheat. That’s why
              ring-continuity testing (R1+R2 and end-to-end) is done at every periodic.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.204 (Ring final circuits)"
            clause="Accessories to BS 1363 may be supplied through a ring final circuit, with or without unfused spurs, protected by a 30 A or 32 A protective device complying with BS 88 series, BS 3036, BS EN 60898, BS EN 60947-2 or BS EN 61009-1 (RCBO). The circuit shall be wired with copper conductors having line and neutral conductors with a minimum cross-sectional area of 2.5 mm² except for two-core mineral insulated cables complying with BS EN 60702-1, for which the minimum cross-sectional area is 1.5 mm²."
            meaning={
              <>
                The headline numbers for every UK ring final: 30 A or 32 A device, 2.5 mm² minimum
                T&E (or 1.5 mm² MICC). The reg also names the device families allowed — including
                old BS 3036 rewireable fuses, which you’ll still meet on Victorian terraces with
                their original DBs.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 433.1.204."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>3 — Lighting circuits (loop-in / 3-plate)</ContentEyebrow>

          <ConceptBlock
            title="Radial in topology, loop-in in style"
            plainEnglish="A 6 A or 10 A radial that visits every ceiling rose. At each rose you’ve got the permanent line and neutral coming through, plus a switch drop down to the wall switch — switched line returns to the rose to feed the lamp."
            onSite="Open any pendant rose on a domestic lighting circuit and you’ll see three terminal blocks — line (loop), neutral (loop), switched line. Cables in usually: T&E from upstream, T&E going downstream, T&E down to switch. That’s the 3-plate."
          >
            <p>Typical numbers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable</strong>: 1.5 mm² T&E (1.0 mm² is permitted but rare in modern work).
              </li>
              <li>
                <strong>MCB</strong>: 6 A or 10 A. 6 A is fine for any normal domestic lighting
                circuit; 10 A is used where a lot of LED transformers or older filament loads sit
                on the same circuit.
              </li>
              <li>
                <strong>Lamp count</strong>: BS 7671 doesn’t mandate a maximum, but BS 7671 Table
                A2 and the OSG suggest 100 W per lamp position for design current calcs even on
                LED installs (so the same circuit can take a future swap-out).
              </li>
            </ul>
            <p>
              <strong>Failure mode:</strong> open-circuit on the loop drops every lamp downstream
              of the break. Open-circuit on a switch drop just kills that one lamp.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>4 — Cooker and shower circuits</ContentEyebrow>

          <ConceptBlock
            title="Dedicated radials sized to the appliance"
            plainEnglish="One appliance, one circuit, no sharing. The protective device and cable are sized on the appliance’s actual maximum demand (after diversity, for cookers)."
            onSite="The cable goes from the consumer unit straight to a 45 A cooker switch (with or without a 13 A socket built in) and then on to the appliance’s connection unit on the wall behind the cooker. Showers use a dedicated 45 A pull-cord ceiling switch in the bathroom."
          >
            <p>Typical sizing:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard 7 kW electric oven + 7 kW hob</strong> ≈ 14 kW total, but
                diversity (OSG Appendix A) reduces design current to about 10 + 30% remainder + 5 A
                for the socket. Typically lands on a 32 A MCB, 6 mm² T&E.
              </li>
              <li>
                <strong>9.5 kW shower</strong>: I = 9500 ÷ 230 ≈ <strong>41 A</strong> → 40 or
                45 A MCB on 6 mm² T&E (clipped direct, short run).
              </li>
              <li>
                <strong>10.5 kW shower</strong>: I = 10500 ÷ 230 ≈ <strong>46 A</strong> → 50 A
                MCB on 10 mm² T&E.
              </li>
            </ul>
            <p>
              Both appliances need local isolation — the 45 A cooker switch or the bathroom pull
              cord — so the customer can power them down without going to the consumer unit.
              Reg 462.1 (provisions for isolation from each supply) is the hook.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>5 — FCU spurs (switched and unswitched)</ContentEyebrow>

          <ConceptBlock
            title="A fused branch off a ring or radial, for fixed appliances"
            plainEnglish="A 13 A BS 1362 fuse in a faceplate. You hang it off a ring or radial when you want a dedicated supply to a fixed appliance — boiler, fridge, hood, doorbell — without using up a socket."
            onSite="Switched FCUs (with a local rocker) are used for anything you might want to isolate without going to the CU — boilers, immersions, kitchen hoods. Unswitched FCUs are used for set-and-forget loads where a switch isn’t needed (or wanted) — door bells, CCTV transformers, alarm panels."
          >
            <p>The fuse does the protective work. Two consequences:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Spur cable can be smaller</strong> — 1.5 mm² T&E off a 32 A ring is fine
                downstream of a 13 A FCU, because the fuse limits the current the spur can ever see.
              </li>
              <li>
                <strong>Fuse rating sized to the appliance</strong> — 3 A for boilers and door
                bells, 5 A for low-power equipment, 13 A for general fixed-load circuits. Manufacturer
                instructions specify it.
              </li>
            </ul>
            <p>
              <strong>Special case:</strong> on a 32 A ring, you can run as many spur sockets as
              you like off a single FCU because the FCU collectively protects the lot. That’s the
              standard approach for kitchen extensions where you’ve added more sockets than the
              ring will take as unfused spurs.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>6 — Special-purpose dedicated circuits</ContentEyebrow>

          <ConceptBlock
            title="Boilers, EV chargers, PV inverters, immersion heaters — always their own circuit"
            plainEnglish="Anything with manufacturer instructions specifying a particular protective device, RCD type or installation method gets its own circuit. No sharing, no spurs."
            onSite="Modern domestic CUs increasingly look like this — small ring final, small lighting circuit, then a stack of dedicated radials for everything else. EV charger especially has driven this — 32 A on its own RCBO with the right RCD type is non-negotiable."
          >
            <p>Common specials and their typical setup:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Boiler (combi or system)</strong>: switched 13 A FCU with a 3 A or 5 A
                fuse, fed off the ring or its own short radial. Local isolation is mandatory.
              </li>
              <li>
                <strong>Immersion heater (3 kW)</strong>: I = 3000 ÷ 230 ≈ 13 A → dedicated 16 A
                or 20 A radial, 2.5 mm² T&E, with a double-pole 20 A switch by the cylinder.
              </li>
              <li>
                <strong>EV charger (7.4 kW)</strong>: dedicated 32 A radial, 6 mm² T&E, RCD with
                Type A + 6 mA DC detection (or per the charger’s manual). BS 7671 Section 722 gives
                the install rules.
              </li>
              <li>
                <strong>PV inverter (4 kW)</strong>: dedicated AC-side 20 A or 32 A breaker (per
                inverter manual), labelled, with isolation each side per Section 712.
              </li>
              <li>
                <strong>Heat pump</strong>: dedicated radial sized for the steady-state plus
                start-up current — typically 25 or 32 A on 6 mm² T&E.
              </li>
            </ul>
            <p>
              <strong>Why dedicated:</strong> nuisance trips on a shared circuit can disable a
              fridge full of food, a boiler in winter, or a charging EV. The reg-level hook is
              314.1 (avoid danger, minimise inconvenience). The practical hook is the manufacturer’s
              MIs, which are enforceable under BS 7671 510.3 (manufacturer’s instructions).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it bites you on site</ContentEyebrow>

          <CommonMistake
            title="Running a second unfused spur off the same point on a ring"
            whatHappens={
              <>
                Customer wants two double sockets behind the TV. You spur off the nearest socket on
                the ring and tee both back-boxes off the same conductor. You’ve now got two unfused
                spurs from one point — a clear breach of OSG / 433.1.204. If both sockets pull
                close to 13 A each on a heavy load (gaming PC + amp + Sky), the spur cable’s
                running over its Iz with no fuse in front of it. Insulation cooks slowly. By the
                time the ring MCB notices, you’ve already had a fire risk on hand.
              </>
            }
            doInstead={
              <>
                One unfused spur per teed-off point on the ring. If you need more outlets in one
                location, fit a 13 A switched FCU on the ring and run the additional sockets in
                1.5 mm² downstream of the FCU — collectively protected at 13 A, no breach, no fire
                risk. Costs two minutes and a tenner more in fittings.
              </>
            }
          />

          <Scenario
            title="The kitchen ring that won’t stop tripping"
            situation={
              <>
                You’re called to a flat where the kitchen ring (32 A RCBO) trips every time the
                kettle, microwave and toaster are on at once. Customer says it’s been like this
                since the previous tenant added a couple of extra sockets behind the worktop. You
                pull the consumer unit off — the kitchen ring shows two cables out, two cables
                back. Standard ring. But when you trace, you find the previous job ran an unfused
                spur to a third double socket between two existing ones — and the spur is in 1.5
                mm² T&E.
              </>
            }
            whatToDo={
              <>
                Two problems. One — 1.5 mm² spur off a 32 A ring with no fuse is non-compliant
                (433.1.1, 433.1.204). Two — the trip is overload, not earth fault. Either replace
                the 1.5 mm² spur in 2.5 mm² (compliant unfused spur), or — better — fit a 13 A
                switched FCU at the tee point and feed the extra socket in 1.5 mm² off the FCU
                (compliant fused spur, 13 A protection on the small cable). Then have a chat with
                the customer about not running every kitchen appliance simultaneously, or splitting
                the kitchen onto its own ring next rewire.
              </>
            }
            whyItMatters={
              <>
                The shape of a final circuit isn’t just about today’s tripping. It’s about who can
                safely add to it later, what the cable can carry under a future load, and whether
                the next periodic inspector signs it off or codes it C2. Compliance now saves a
                rewire in five years.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 462.1 (Provisions for isolation)"
            clause="Each electrical installation shall have provisions for isolation from each supply."
            meaning={
              <>
                Translation: every install needs a way to be cut off from its supply. For final
                circuits this drives the cooker switch, shower pull-cord, FCU rocker and the EV
                charger isolator — each one is the local isolation provision for that dedicated
                final circuit. It’s why dedicated specials almost always have a switch outside
                the consumer unit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 462.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Six final-circuit families: radial, ring, lighting loop-in, cooker, shower, FCU spurs and dedicated specials. Each one has a typical CSA, MCB rating and a BS 7671 hook.',
              'Ring finals are a UK quirk — 32 A on 2.5 mm² works because the load splits between two paths. Limits are in 433.1.204.',
              'Lighting circuits are radials wired loop-in style — 1.5 mm² T&E on a 6 or 10 A MCB is the workhorse.',
              'Showers and cookers always go on dedicated radials sized to the appliance, with local isolation per Reg 462.1.',
              'FCU spurs let you hang as many fixed loads as you like off a ring — the 13 A BS 1362 fuse polices the small downstream cable.',
              'Specials (EV, PV, heat pump, boiler) get dedicated circuits because manufacturer MIs and Sections 712 / 722 of BS 7671 require it.',
              'Reg 314.1 is the principle behind the lot — divide installations into circuits to avoid danger and minimise inconvenience.',
            ]}
          />

          <Quiz title="Final circuit types — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Reading a real installation drawing pack
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Wiring systems for different environments
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
