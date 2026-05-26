/**
 * Module 3 · Section 5 · Sub 4 — UK distribution network components
 * Maps to City & Guilds 2365-02 / Unit 203 / LO5 / AC 5.4
 *   AC 5.4 — “State the component parts of the electrical distribution network”
 *
 * The named kit between the transmission grid and the consumer unit. Eight
 * components every electrician sees in the wild — grid supply point, primary
 * substation, secondary substation, 11 kV switchgear, service cable, DNO
 * cut-out, meter, service head + tails, MET. References TN-C-S / TN-S / TT
 * supply earthing arrangements as the cap on the chain. Forward-link to §4
 * (earthing systems) and §6 (micro-renewables).
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'UK distribution network components (5.4) | Level 2 Module 3.5.4 | Elec-Mate';
const DESCRIPTION =
  'Eight named components every electrician sees: GSP, primary and secondary substations, 11 kV switchgear, service cable, DNO cut-out, meter, MET. The chain from transmission to your CU.';

const checks = [
  {
    id: 'm3s5s4-cut-out-seal',
    question:
      'You arrive at a property to swap the consumer unit. The DNO cut-out has a wire-and-lead seal across the fuse holder. The customer says "just pull the fuse, I won’t tell anyone". What do you do?',
    options: [
      'Refuse to break the seal. Phone 105 and arrange for the DNO (or a MOP under their authority) to attend and isolate the supply',
      'Lead: hours of pre-installation planning per job; Lag: percentage of installations passing first inspection',
      'It provides a systematic method for identifying and labelling equipment, components, and signals on drawings and in the field',
      'To be trained, equipped, and immediately available to effect rescue of any person who becomes incapacitated in the confined space',
    ],
    correctIndex: 0,
    explanation:
      'The DNO seal is a legal device. Breaking it without authorisation is an offence (theft of electricity if the supply is later abstracted) and a breach of every electrical scheme membership condition. Customer consent doesn’t override either. Always go through the DNO or a MOP with delegated authority.',
  },
  {
    id: 'm3s5s4-met-location',
    question:
      'The Main Earthing Terminal (MET) on a typical TN-C-S installation is located:',
    options: [
      'It introduces powers to ban or restrict specific single-use plastic items and create extended producer responsibility schemes',
      'Standard or Enhanced fire-resistant cable (e.g. FP200 / Firetuf), separation from other circuits, and fire-rated supports/clips that survive collapse temperatures',
      'A person with sufficient training, knowledge, and experience to understand the hazards and necessary precautions',
      'In or close to the consumer’s installation, with the earthing conductor connecting it to the supplier’s earth terminal at the cut-out',
    ],
    correctIndex: 3,
    explanation:
      'The MET is the customer’s — sits in or near the consumer unit, takes the earthing conductor up to the supplier’s earth terminal on the cut-out. From the MET fan out the protective conductors (CPCs and bonding) into the installation. On TN-C-S the earth comes from the supply neutral; on TN-S it’s a separate sheath earth; on TT it’s your own electrode.',
  },
  {
    id: 'm3s5s4-service-cable-ownership',
    question:
      'The service cable that runs from the secondary substation (or a joint box in the street) to the cut-out at the property is owned by:',
    options: [
      'The DNO (Distribution Network Operator)',
      'Prioritise by safety risk, then operational impact',
      'A to G (with A being most efficient)',
      'At both the control unit and outlet',
    ],
    correctIndex: 0,
    explanation:
      'The service cable is part of the DNO network — they install it, own it, and maintain it. It typically enters the property through an under-floor sleeve or external wall and terminates at the cut-out. Damage to the service cable is reported to the DNO on 105. The customer’s ownership starts at the consumer side of the meter.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In the UK supply chain from generator to consumer, the substation that steps voltage down from the transmission system (400/275 kV) to the distribution system (typically 132 kV or 33 kV) is called:',
    options: [
      'The primary substation',
      'The grid supply point (GSP)',
      'The secondary substation',
      'The grid exit point',
    ],
    correctAnswer: 1,
    explanation:
      'GSP = the boundary between transmission and distribution. NGET (or SPT/SHET) on one side, the DNO on the other. From the GSP, the DNO takes power onwards through primary substations (33/11 kV) and secondary substations (11 kV / 400 V).',
  },
  {
    id: 2,
    question:
      'A pole-mounted transformer (PMT) on a wooden pole in a rural area typically converts:',
    options: [
      'The coupling between two magnetically linked coils',
      'In the reverse order to assembly (top down)',
      '11 kV to 400 V three-phase / 230 V single-phase',
      '0.30 - at the lower acceptable limit',
    ],
    correctAnswer: 2,
    explanation:
      'PMTs are the standard rural secondary substation: 11 kV in (on the cross-arm above), 400 V three-phase / 230 V single-phase out (on the smaller cross-arm below), feeding the LV network in the surrounding properties. Typical capacity 50–315 kVA.',
  },
  {
    id: 3,
    question:
      'The fuse inside the DNO cut-out on a typical UK domestic property is:',
    options: [
      'Continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity',
      'Two controllers running the same program, with automatic switchover if one fails',
      '35°C generally for floors regularly walked on barefoot (warmer permitted in border zones)',
      'A BS 1361 (or HRC) fuse, sealed by the DNO, sized at typically 60 A, 80 A or 100 A',
    ],
    correctAnswer: 3,
    explanation:
      'BS 1361 (or its successor BS 88-3) is the standard cartridge fuse used in DNO cut-outs. The fuse is sealed inside the cut-out housing — only authorised personnel may break the seal to access it. Common ratings: 60 A (older properties), 80 A, 100 A (modern standard).',
  },
  {
    id: 4,
    question:
      'On a TN-C-S (PME) supply, the consumer’s earth comes from:',
    options: [
      'The supplier’s combined neutral and earth (PEN) conductor, separated into N and PE at the cut-out',
      'Inhale sharply while covering the filters to check the mask draws inward against the face',
      'To ensure electrical supplies match equipment needs and controls integrate',
      'Collapse of the sides, contact with underground services, flooding, falling into the excavation, and hazardous atmospheres',
    ],
    correctAnswer: 0,
    explanation:
      'TN-C-S (Protective Multiple Earthing, PME) takes the earth from the same conductor that carries the supply neutral. The PEN conductor is split into a separate N and PE at the cut-out — and the PE goes to the customer’s MET via the supplier’s earth terminal. Most modern UK domestic supplies are TN-C-S.',
  },
  {
    id: 5,
    question:
      'You see the following sequence inside a meter cabinet, in order from supply to load: service cable → [A] → meter tails → [B] → meter tails → main isolator → consumer unit. What are A and B?',
    options: [
      'A = MET, B = consumer unit',
      'A = cut-out, B = electricity meter',
      'A = secondary substation, B = cut-out',
      'A = primary substation, B = MET',
    ],
    correctAnswer: 1,
    explanation:
      'Standard domestic intake order: service cable enters → DNO cut-out (sealed fuse) → meter tails (MOP-side) → meter (MOP) → meter tails (customer-side) → main isolator (often customer-installed) → consumer unit (customer). Three different ownerships in one cabinet.',
  },
  {
    id: 6,
    question:
      'Which of the following is correctly described as part of the DNO’s assets (not the customer’s, and not the MOP’s)?',
    options: [
      'One person should be designated as the coordinator, giving clear verbal commands',
      'The tower loses structural rigidity and could collapse or rack (parallelogram) under load or wind',
      'The cut-out, the service cable from the substation, the secondary transformer feeding the street',
      'Apparent power (VA) is greater than true power (W) for reactive loads',
    ],
    correctAnswer: 2,
    explanation:
      'DNO assets: everything from the secondary substation back upstream (transformers, 11 kV switchgear, primary substations, GSPs, and beyond into NGET territory) PLUS the service cable down to the property and the cut-out. The meter and the meter tails on the meter side are MOP. Everything else in the property is the customer’s.',
  },
  {
    id: 7,
    question:
      'A property has a TT supply (no DNO earth provided). What does this mean in practice for the electrician designing the installation?',
    options: [
      'Circuit protection devices that detect dangerous electrical arcing (series and parallel arcs) in final circuits and disconnect the supply before the arc can cause a fire',
      'Make substantial pension contributions now (gaining 40% relief) while building tax-efficient ISA savings to provide flexible retirement income below allowance taper threshold',
      'It provides a loop for the feet to stand in, allowing the worker to periodically straighten their legs and restore blood circulation while awaiting rescue',
      'The customer needs to install an earth electrode (rod or mat) and the installation must use RCD protection because the loop impedance is too high to rely on overcurrent protection alone for ADS',
    ],
    correctAnswer: 3,
    explanation:
      'TT means the DNO doesn’t supply an earth — typical of older overhead-supplied rural properties. The installation must have its own earth electrode at the MET, and because the earth fault loop impedance through the soil is much higher than via a TN-S sheath or a TN-C-S PEN, RCDs (typically 100 mA on the supply side and 30 mA on final circuits) provide fault protection by automatic disconnection. See §4 of this module for the full earthing systems coverage.',
  },
  {
    id: 8,
    question:
      'An electrician is asked by a customer "where exactly does my electricity start?" Most accurate electrician answer:',
    options: [
      '"At the secondary substation transformer at the end of your street, where 11 kV is converted to 400 V three-phase / 230 V single-phase, then a service cable feeds your cut-out"',
      'They are substantially enclosed with limited access, and may contain hazardous atmospheres from decomposing material or leaked services',
      'To recognise your emotions as they occur and understand their impact on your thoughts, decisions, and interactions with others',
      'A fixed or portable arm-and-base system that provides an anchor point above a confined space entry, functioning similarly to a tripod but suited to spaces where a tripod cannot be positioned',
    ],
    correctAnswer: 0,
    explanation:
      'The most useful real-world answer for a customer: the supply ‘starts’ for them at the secondary substation, which feeds their service cable, which terminates at their cut-out. The transmission/generation side is true but invisible to the customer. The cut-out is where ‘their’ electricity arrives at their wall.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a primary substation and a secondary substation?',
    answer:
      'Primary substation: 33 kV in, 11 kV out. Town-scale, usually a fenced compound on the edge of a town with one or two large oil-filled transformers (30–60 MVA each), 33 kV and 11 kV switchgear, protection and control kit. One primary substation typically feeds a network of 11 kV feeders going to dozens of secondary substations. Secondary substation: 11 kV in, 400 V three-phase / 230 V single-phase out. Street-scale, typical capacity 200–800 kVA, feeding 50–200 properties. Three forms — pole-mount (PMT), pad-mount (kiosk), and indoor brick housing.',
  },
  {
    question: 'What is 11 kV switchgear and why does it matter?',
    answer:
      'Switchgear is the kit that lets the DNO open and close, isolate, and protect each section of the 11 kV network. At a primary substation it’s a row of switchgear cubicles (one per outgoing 11 kV feeder) housing circuit breakers, isolators, busbars and current/voltage transformers for protection relays. Modern kit is SF6-insulated metal-clad, much more compact than the old air-break Reyrolle gear. Why it matters to the electrician: the protection settings on these breakers determine the maximum fault current that can ever reach a secondary substation downstream — and therefore the maximum prospective fault current at any consumer cut-out.',
  },
  {
    question: 'What is the supplier’s earth terminal on the cut-out?',
    answer:
      'A small terminal block bolted to the side of the DNO cut-out housing where the customer’s earthing conductor connects to the supply earth. On TN-C-S it’s the splitting point of the PEN conductor (combined neutral-earth) into separate N and PE. On TN-S it’s the termination of the lead sheath earth from the service cable. On TT there’s no terminal — the customer provides their own electrode. The earthing conductor goes from this terminal to the property’s MET, where the protective conductors (CPCs and bonding) fan out into the installation.',
  },
  {
    question: 'Who fits and owns the meter tails between the cut-out and the meter?',
    answer:
      'Officially the Meter Operator (MOP) — the company contracted by the energy supplier to install and maintain the meter. In practice, on a new install the DNO often fits initial tails when energising; on a meter replacement, the MOP fits new ones. They are NOT the customer’s tails. Don’t replace them, don’t lengthen them, don’t reroute them. Tails between the meter outgoing terminals and the consumer unit ARE the customer’s — fair game for the electrician to install or replace. Two physically identical bits of cable, two different ownerships, separated by the meter.',
  },
  {
    question: 'What is the difference between a service head, a cut-out, and a service termination?',
    answer:
      'These terms are used loosely and inconsistently in industry, which causes confusion. Most authoritative usage: the cut-out is the housing containing the supply fuse and the supplier’s earth terminal. The service head is sometimes used as a synonym for the cut-out, sometimes used for an external pole-top device on overhead supplies (where the service cable joins the bare overhead line). Service termination is the formal name for the end of the service cable inside the cut-out. For exam purposes: cut-out = the sealed fuse holder + earth terminal at the supply origin. Service cable = the bit between the substation and the cut-out.',
  },
  {
    question: 'Where does Section 6 of this module pick up from here — micro-renewables?',
    answer:
      'Section 6 takes the network we’ve described in Section 5 and shows what happens when the customer’s installation generates power as well as consuming it. Domestic PV, micro-wind, micro-hydro and battery storage all live behind the meter — they push power back through the cut-out into the local LV network when the customer’s own demand is lower than their generation. That changes how voltage drop, neutral current, and protective device coordination behave on the local feeder. ENA G98 (small generators) and G99 (larger generators) are the engineering recommendations that govern how those connections are designed, all sitting on top of the supply chain you’ve just learned in Section 5.',
  },
];

export default function Sub4() {
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 4"
            title="UK distribution network components"
            description="Tour the kit between the transmission grid and your CU. Eight named items every electrician sees in the wild — from the grid supply point at the top, through primary and secondary substations, all the way to the cut-out, meter and MET inside the customer’s premises."
            tone="emerald"
          />

          <TLDR
            points={[
              'Eight named components in the chain: GSP → primary substation (33/11 kV) → 11 kV switchgear → secondary substation (11 kV / 400 V) → service cable → DNO cut-out → meter → MET (with main isolator + consumer unit downstream).',
              'Three different ownerships in the last 30 cm before the consumer unit: DNO (cut-out + service cable), MOP (meter + meter tails on the meter side), customer (everything from the meter outgoing terminals).',
              'Supply earthing arrangement (TN-C-S, TN-S, TT) is declared by the DNO and dictates how the MET is fed. Section 4 of this module covers earthing systems in depth — Section 5 covers the supply chain that delivers them.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the eight principal component parts of the UK electrical distribution network from grid supply point to MET.',
              'Identify the function of the primary substation (33/11 kV step-down) and the secondary substation (11 kV / 400 V step-down).',
              'Recognise 11 kV switchgear and its role in protecting and isolating the distribution network.',
              'Describe the DNO service cable, cut-out, supplier’s earth terminal and meter tails.',
              'Identify the boundary of ownership between DNO, MOP and customer at the meter intake.',
              'Recognise the three supply earthing arrangements (TN-C-S, TN-S, TT) and state where the customer’s earth comes from in each.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The chain end-to-end</ContentEyebrow>

          <ConceptBlock
            title="From 400 kV to your CU — eight named items in order"
            plainEnglish="There is no magic. Each component has a name, a function, an owner and a voltage. Once you’ve walked the chain once and put a name to every box you’ll see in the street, the supply side stops being a mystery."
            onSite="Print the eight-item list on a sticker and put it inside the lid of your van. Customers will ask you ‘where does my electricity come from?’ at least once a week — and the answer is always the same chain. The kit varies (overhead vs underground, pole vs kiosk, old vs new) but the order doesn’t."
          >
            <p>The supply chain in order, from generator to consumer:</p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70 marker:font-semibold">
              <li>
                <strong>Grid supply point (GSP).</strong> The substation where the
                transmission network (NGET / SPT / SHET) hands off to the distribution
                network (DNO). Steps voltage down from 400 kV / 275 kV to 132 kV / 66 kV /
                33 kV depending on region.
              </li>
              <li>
                <strong>Primary substation.</strong> 33 kV in, 11 kV out. Town-scale, fenced
                outdoor compound. Two transformers typical, 30–60 MVA each. Owned by DNO.
              </li>
              <li>
                <strong>11 kV switchgear.</strong> Inside the primary substation and at
                strategic switching points along the 11 kV feeders. Lets the DNO open, close,
                isolate and protect sections of the network. Houses the protection relays
                that decide fault current flowing downstream.
              </li>
              <li>
                <strong>Secondary substation.</strong> 11 kV in, 400 V three-phase / 230 V
                single-phase out. Street-scale. Three forms: pole-mount can (PMT), pad-mount
                kiosk, indoor brick housing. Capacity 200–800 kVA typical, feeding 50–200
                properties.
              </li>
              <li>
                <strong>Service cable.</strong> The DNO-owned cable that runs from the
                secondary substation (or a joint box in the street) to the property. Modern
                cable is concentric ALPVC (aluminium with a concentric neutral); older
                installs use PILC (paper-insulated lead-covered) — still common under city
                pavements.
              </li>
              <li>
                <strong>DNO cut-out.</strong> The sealed housing inside the property
                containing the supply fuse (BS 1361 or BS 88-3, typically 60 A / 80 A /
                100 A) and the supplier’s earth terminal. Last item the DNO owns.
              </li>
              <li>
                <strong>Electricity meter.</strong> Owned by the MOP (Meter Operator),
                contracted by the energy supplier. Records kWh consumed (and exported, for
                generators). Smart meters increasingly standard since the 2014 rollout.
              </li>
              <li>
                <strong>Main earthing terminal (MET).</strong> The customer-side hub for the
                installation’s earth. Connected via the earthing conductor to the supplier’s
                earth terminal at the cut-out (on TN-C-S and TN-S) or to the customer’s own
                earth electrode (on TT). Protective conductors (CPCs) and bonding conductors
                fan out from the MET into the installation.
              </li>
            </ol>
            <p>
              Downstream of the MET sits the main isolator (often a 100 A double-pole switch
              installed by the customer or contractor), the meter tails on the customer side,
              and the consumer unit. From the consumer unit, BS 7671 governs everything.
              Before the cut-out, ESQCR governs everything. The boundary at the meter is the
              electrician’s working line.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The kit upstream — substations and switchgear</ContentEyebrow>

          <ConceptBlock
            title="Primary substations — 33/11 kV, town-scale"
            plainEnglish="Fenced compound on the edge of every town. One or two large transformers, switchgear cubicles, sometimes a small control building. The voltage steps down from 33 kV to 11 kV for distribution into the town."
            onSite="Look for the transformer cooling fins (or radiator banks) and the bushings (porcelain insulators where conductors enter the tank). The 33 kV side has chunky bushings on top; the 11 kV side has smaller bushings below or to the side. Outside the compound you’ll see the 33 kV overhead conductors coming in and the 11 kV overhead or underground feeders going out."
          >
            <p>
              The transformer is the heart of the substation. A 60 MVA primary transformer is
              typically 4–6 m wide, 6–8 m long, 4 m tall, weighs 60–80 tonnes, and is filled
              with mineral oil for both insulation and cooling. The transformer steps down
              from 33 kV three-phase to 11 kV three-phase, with a tap-changer on the high-
              voltage winding to compensate for daily and seasonal voltage changes upstream.
            </p>
            <p>
              Switchgear at the primary substation manages both the 33 kV side (incoming) and
              the 11 kV side (outgoing). Each outgoing 11 kV feeder has its own circuit
              breaker, with overcurrent and earth-fault protection relays that will trip the
              breaker if a fault appears anywhere on that feeder. Modern installs use SF6
              metal-clad indoor switchgear; older installs are open-air outdoor with
              porcelain disconnectors.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Secondary substations — 11 kV / 400 V, street-scale"
            plainEnglish="The transformer that feeds your street. Three forms: pole-mounted (rural), kiosk pad-mounted (urban estates), indoor brick (high-load areas like flats and supermarkets). All do the same job: 11 kV in, 400 V three-phase / 230 V single-phase out."
            onSite="The kiosk you walk past every day is one. The brick building near the church might be one. The metal can on the wooden pole at the end of a country lane is one. Once you start spotting them you’ll see one per ~100 properties in any UK street."
          >
            <p>
              Three secondary substation forms in common UK use:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pole-mounted transformer (PMT).</strong> A galvanised steel or
                fibreglass can hung between two poles, 4–6 m off the ground. 11 kV in on a
                cross-arm above (with three drop-out fuse mounts as protection); 400 V three-
                phase out on a smaller cross-arm below, with the LV cable dropping into an
                underground feeder or onto an overhead service line. Typical capacity 50,
                100 or 200 kVA. Common in rural areas, villages, isolated farms.
              </li>
              <li>
                <strong>Pad-mounted (kiosk) transformer.</strong> A sealed metal cabinet
                (or in older installs, a brick housing) sitting on a concrete pad, 1.5–2 m
                tall and 2–3 m wide. 11 kV switchgear inside (often a ring-main unit, RMU,
                so the substation can be looped in and out of the 11 kV ring without
                disconnecting other downstream substations); transformer; LV fuse cabinet.
                Output cables run underground to the houses. Typical capacity 315–800 kVA.
                Most modern urban substations are this form.
              </li>
              <li>
                <strong>Indoor substation.</strong> A brick or precast concrete building
                containing the transformer, 11 kV switchgear and LV distribution board.
                Used where load is large enough to need a 1–2 MVA unit, or where space
                doesn’t permit an outdoor kiosk — flats, supermarkets, hospitals, small
                industrial estates.
              </li>
            </ul>
            <p>
              The secondary substation is the most important single component for the electrician to
              know about, because everything downstream of it (the LV network feeding all the
              properties on the street) is what shapes prospective fault current, voltage
              drop, supply impedance and supply quality at every cut-out. A small overloaded
              200 kVA PMT with a long radial feeder behind it gives a very different supply
              profile from a fresh 800 kVA kiosk feeding a tight underground LV ring.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.threePhaseTransformers.url}
            title={videos.threePhaseTransformers.title}
            channel={videos.threePhaseTransformers.channel}
            duration={videos.threePhaseTransformers.duration}
            topic="How three-phase transformers work · Unit 203 AC 5.4"
            caption="The Engineering Mindset takes a three-phase transformer apart — exactly the kit inside every primary substation (33 / 11 kV) and every secondary kiosk (11 kV / 400 V) you walk past on site."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The kit at the property</ContentEyebrow>

          <ConceptBlock
            title="Service cable — DNO-owned, terminating at the cut-out"
            plainEnglish="The cable that runs from the substation (or a joint box in the street) to your property. Owned by the DNO. Damage to it = call 105."
            onSite="Modern UK service cable is concentric ALPVC: a single solid aluminium phase conductor in the centre, surrounded by insulation, surrounded by a concentric ‘sheath’ of stranded aluminium that doubles as the neutral conductor and (on TN-C-S) the protective earth, all in a black PVC outer sheath. Three-phase versions have three phase conductors arranged inside the concentric neutral. Older urban service cables (still common in cities) are PILC (paper-insulated lead-covered) — much heavier, more difficult to terminate."
          >
            <p>
              The service cable enters the property either through an under-floor sleeve, an
              external wall sleeve, or up the side of the building from an overhead
              connection (rare in modern builds but very common in older rural property). It
              terminates at the cut-out — usually within 2 m of where the cable enters the
              property.
            </p>
            <p>
              Service cable sizing is driven by maximum demand and length. For a typical UK
              domestic single-phase 100 A service cable is 25 mm² ALPVC; for three-phase 100 A
              per phase it’s 35 mm² four-core. Older 60 A and 80 A services often used 16 mm²
              or 25 mm² PILC. The DNO sizes the service for the agreed maximum demand declared
              when the connection was first installed; if the customer adds load (EV
              charger, heat pump) that exceeds it, the DNO has to be notified and may need to
              uprate the cable.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="DNO cut-out — the sealed fuse and the earth terminal"
            plainEnglish="A black plastic (or older Bakelite) housing inside the property, near the meter. Contains the BS 1361 / BS 88-3 supply fuse and the supplier’s earth terminal. Sealed by the DNO with a wire-and-lead seal. The line between ‘their kit’ and ‘your kit’."
            onSite="Don’t open it. Don’t cut the seal. If you need the supply isolated for a job, call 105 (or your DNO’s direct line) and arrange for someone with authority to attend. Some DNOs allow registered contractors to break and replace seals under a written authority — but only for that contractor, only on agreed properties, only following their procedure. The default position is hands off."
          >
            <p>
              The cut-out has three principal jobs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overcurrent protection.</strong> The internal HRC fuse (60 A, 80 A or
                100 A typical for domestic) protects the service cable from any fault current
                that would otherwise destroy it. A bolted line-earth or line-neutral fault
                downstream of the cut-out blows the fuse, isolating the property from the
                network.
              </li>
              <li>
                <strong>Isolation point.</strong> Pulling the cut-out fuse is the only way to
                completely de-energise the customer’s installation (since the meter has no
                isolator on the load side). This is why CU swaps need DNO attendance — the
                fuse has to come out for the duration of the work.
              </li>
              <li>
                <strong>Supplier’s earth terminal.</strong> A small terminal block on the
                outside of the cut-out housing where the customer’s earthing conductor
                connects to the supply earth. On TN-C-S this is where the PEN conductor splits
                into separate N and PE.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The meter — MOP-owned, the only ‘smart’ component on the chain"
            plainEnglish="The box that records how much electricity you use (and, for export-capable smart meters, how much you generate and export). Owned by the Meter Operator (MOP), who is contracted by your energy supplier. Don’t touch it — and don’t touch the meter tails between cut-out and meter, which are also MOP property."
            onSite="Three meter generations on the wires: traditional electromechanical (rotating disc, increasingly rare), digital but non-communicating, and SMETS2 smart meters with cellular comms (the current rollout). All do the same kWh measurement; the differences are how they report it (manual reading vs HAN-display vs DCC backhaul). The practical fact is the same regardless: it’s MOP kit, hands off."
          >
            <p>
              Meter tails on the meter side (between cut-out and meter) are the MOP’s. Meter
              tails on the load side (between meter and consumer unit) are the customer’s and
              fair game for the electrician. Both look identical (typically 25 mm² single-core
              singles in red/black or brown/blue) but they’re separated by a regulatory line
              that runs through the middle of the meter terminals.
            </p>
            <p>
              When you’re replacing a consumer unit, you’re replacing everything from the
              load-side meter terminals onwards. The MOP-side tails stay put. If they’re
              damaged or undersized you have to ask the MOP to attend — not do it yourself.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Main earthing terminal (MET) — the electrician’s earth hub"
            plainEnglish="A dedicated terminal block (typically a brass strip with a bolt and washer per connection) inside or close to the consumer unit. The earthing conductor from the supplier’s earth terminal lands here. The CPCs and main protective bonding conductors from the installation also land here. It’s the central earthing point for the whole installation."
            onSite="On a small domestic install the MET might just be the earth bar inside the consumer unit. On a larger install — commercial, multi-CU, with multiple incomers — it’s a separate purpose-made earth bar mounted near the intake, with the earthing conductor going up to the cut-out and a fan of bonding and CPC conductors going down to the loads."
          >
            <p>
              How the MET is fed depends on the supply earthing arrangement (covered in detail
              in §4 of this module — recap here for context):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S (PME).</strong> The most common modern UK supply. The MET is
                fed from the supplier’s earth terminal at the cut-out, which in turn comes
                from the combined PEN conductor of the service cable. Earth and neutral share
                a conductor all the way back to the substation.
              </li>
              <li>
                <strong>TN-S.</strong> Older urban supplies, often where the service cable
                is PILC. The earth comes from the lead sheath of the service cable, separate
                from the neutral all the way back to the substation. Increasingly rare in
                modern installs but still common in pre-1980s urban property.
              </li>
              <li>
                <strong>TT.</strong> No DNO-supplied earth. The customer installs their own
                earth electrode (typically a 1.2 m copper-bonded rod driven into the ground)
                and the MET connects to it. Common on rural overhead supplies, on
                installations where TN-C-S has been refused (e.g. caravans, fuel stations
                where PEN faults could cause fire), and on some boatyards / marinas. Always
                requires RCD protection because the earth fault loop impedance through soil
                is too high to rely on overcurrent protection alone.
              </li>
            </ul>
            <p>
              The MET is the electrician’s anchor point for every protective conductor in the
              installation. Get the MET wrong (loose connection, oversize bond bolted with
              undersize lug, missing bonding to a metal water service) and the whole earthing
              system fails — every CPC in the install is only as good as the connection at
              the MET.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The boundary of work and ownership</ContentEyebrow>

          <ConceptBlock
            title="Three ownerships in 30 cm of intake — the electrician’s working line"
            plainEnglish="Walk up to the meter cabinet on a typical domestic property. The kit you see, in order, is owned by THREE different organisations. Knowing the boundaries stops you doing things that are unlawful, dangerous, or both."
          >
            <p>From supply to consumer unit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DNO assets:</strong> service cable, cut-out, supplier’s earth
                terminal. Sealed. Hands off without DNO authority.
              </li>
              <li>
                <strong>MOP assets:</strong> meter, plus the meter tails between cut-out and
                meter (the ‘meter side’ tails). Not sealed in the same way as the cut-out,
                but still not the electrician’s to replace or modify without MOP authority.
              </li>
              <li>
                <strong>Customer assets:</strong> the meter tails between meter and main
                isolator/consumer unit, the main isolator (if fitted), the consumer unit
                itself, and everything downstream. Fair game for the electrician. BS 7671 applies.
              </li>
            </ul>
            <p>
              The practical implication for jobs: a CU swap means working only on the
              customer side. You need the supply isolated (DNO pulls the fuse). You don’t
              need to touch the meter, the meter-side tails, or the cut-out — the DNO/MOP do
              that side for you. If the meter-side tails are knackered or undersized for the
              new CU, you flag it to the MOP and they attend separately.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ESQCR 2002, Reg. 24 (paraphrased — supply earthing arrangements)"
            clause="A distributor shall make available, where reasonably practicable, an earthing facility to a consumer for the purpose of enabling the consumer’s installation to be earthed. The form of earthing supplied shall be either a separate metallic conductor (TN-S), or a combined neutral-earth (PEN) conductor terminating in a means of connecting to earth (TN-C-S / PME) at the consumer’s installation. Where neither is reasonably practicable the consumer shall provide their own earth electrode (TT)."
            meaning={
              <>
                The DNO has a statutory duty to provide an earth where it’s practicable —
                that’s why most modern UK supplies are TN-C-S (PME). It’s only TT (no DNO
                earth) where TN-C-S or TN-S can’t be safely supplied — typically at the end of
                long overhead rural feeders. The form of earthing is declared by the DNO on
                the connection certificate; the electrician designs the installation to suit. See
                §4 of this module for the full earthing systems coverage.
              </>
            }
            cite="Paraphrased; see Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665, as amended), Reg. 24 — full text on legislation.gov.uk."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026, Section 542 (paraphrased — earthing arrangements at the MET)"
            clause="Each installation shall include a main earthing terminal (MET) at which the earthing conductor, the protective conductor of every circuit, and the main protective bonding conductors are connected. The MET shall be readily accessible and provide a reliable, durable connection."
            meaning={
              <>
                The MET is the customer-side compulsory hub. BS 7671 requires it to exist, to
                be accessible (so future inspection and testing can verify the connections),
                and to be reliable (no loose bolts, no painted-over surfaces, no daisy-chained
                conductors). In practice: the MET is the first thing to inspect when you
                arrive at an unfamiliar installation — its condition tells you everything
                about the rest of the earthing system.
              </>
            }
            cite="Paraphrased; see BS 7671:2018+A4:2026, Section 542 — Earthing arrangements."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <CommonMistake
            title="Thinking the electrician is allowed to break the DNO cut-out seal"
            whatHappens={
              <>
                Apprentice on a CU swap finds the DNO is busy, the customer is impatient,
                they figure they’ll just cut the seal, pull the fuse, do the work, and put a
                new seal on. Three things wrong. First, breaking the seal without authority
                is a criminal offence under the Theft Act if any abstraction is alleged
                (which the DNO can and sometimes does). Second, every electrical scheme
                membership condition (NICEIC, NAPIT, ELECSA) requires you to leave DNO kit
                alone — breach can mean removal from the scheme. Third, you have no idea
                what seal type the DNO is using on the network — fitting your own ‘seal’ may
                actually flag the property to the DNO as tampered.
              </>
            }
            doInstead={
              <>
                Phone 105 (or your DNO’s direct line) and book the supply isolation with
                them. They will attend, break the seal, pull the fuse, leave you to do the
                work, and re-seal afterwards. Cost is usually free if the customer is on a
                domestic supply and the work is routine. Some DNOs run a Withdrawal of
                Consent agreement that lets registered contractors break and replace seals
                themselves on agreed properties — apply for it through your scheme provider
                if you’re doing CU swaps regularly. Either way, it’s organised work, not
                ad-hoc.
              </>
            }
          />

          <Scenario
            title="PV install — apprentice cuts the seal on the cut-out to swap a fuse holder"
            situation={
              <>
                You arrive at a property to commission a 4 kW PV install. The DNO cut-out
                fuse is rated 60 A and the property’s existing total demand + PV inverter
                output exceeds it. The qualified supervisor isn’t on site yet. The customer
                is pushing to get the system live before they go on holiday tomorrow. Your
                apprentice mate quietly suggests cutting the cut-out seal, pulling and
                upsizing the fuse to 80 A, and resealing it before anyone notices. What do
                you do?
              </>
            }
            whatToDo={
              <>
                Stop, full stop. The cut-out fuse rating is set by the DNO to match the
                service cable rating — you cannot arbitrarily upsize it without the DNO
                attending and verifying that the underlying service cable can handle the
                higher current. Even if the cable can, the change has to be recorded on the
                DNO’s asset records or future maintenance gets the rating wrong. And the
                PV connection itself needs notification to the DNO under ENA G98 (small
                generator): you can’t just energise it and walk away. The right answer:
                phone the DNO, declare the proposed PV connection (G98 form, online), book
                a service uprate if needed, and only commission the PV once the paperwork is
                done. If the customer can’t wait — that’s their problem to solve, not yours.
                Never the apprentice’s problem to solve by cutting a seal.
              </>
            }
            whyItMatters={
              <>
                The cut-out seal is the most visible enforcement device in the whole supply
                chain. Cut it without authority and you create a paper trail (DNO inspection
                later finds the resealed cut-out, asset records don’t match) that ends with
                the customer being recharged for tampering, your scheme membership being
                reviewed, and the PV install being disconnected. The downside of doing it
                right is one phone call and a delay. The downside of doing it wrong is
                career-ending.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The supply chain has eight named components: GSP → primary substation (33/11 kV) → 11 kV switchgear → secondary substation (11 kV / 400 V) → service cable → DNO cut-out → meter → MET.',
              'Three different ownerships at the meter cabinet: DNO (service cable, cut-out), MOP (meter + meter-side tails), customer (load-side tails, isolator, CU and downstream).',
              'The DNO cut-out is sealed. Breaking the seal without authority is unlawful and a scheme breach. Use 105 to book DNO attendance.',
              'Secondary substations come in three forms — pole-mount (rural), pad-mount kiosk (urban), indoor brick (high-load). All do 11 kV → 400 V three-phase / 230 V single-phase.',
              'The MET is the customer-side earth hub. Fed from the supplier’s earth terminal on TN-C-S and TN-S, or from the customer’s own earth electrode on TT.',
              'BS 7671 takes over from ESQCR at the consumer side of the meter. Section 4 of this module covers the earthing systems (TN-C-S, TN-S, TT) in detail; Section 6 covers what happens when the customer also generates (PV, micro-wind, batteries) and pushes power back through the cut-out.',
            ]}
          />

          <Quiz
            title="Distribution network components — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module3/section5/5-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Distribution voltages
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module3/section5/5-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 From generation to your CU
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
