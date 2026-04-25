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

const TITLE =
  'Fire hazards and explosive environments | Level 2 Module 1.2.3 | Elec-Mate';
const DESCRIPTION =
  "Why electrical work starts so many UK fires, how BS 7671 Chapter 42 stops them, and what DSEAR means when you walk into a paint shop or a petrol forecourt.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'fire-triangle-electrical-check',
    question: "On an electrical fire, which leg of the fire triangle does the fault usually provide?",
    options: [
      'Oxygen',
      'Fuel',
      'Heat (the ignition source)',
      'All three at once',
    ],
    correctIndex: 2,
    explanation:
      "The fault gives you the heat — loose terminal heating up, cable carrying too much current, an arc. The fuel’s already there (PVC sheath, dust, timber, plasterboard paper), and the air supplies the oxygen. Kill the heat source and you kill the fire.",
  },
  {
    id: 'rcd-fire-rating-check',
    question: "Where an RCD’s installed for ADDITIONAL fire protection, what’s the maximum residual operating current BS 7671 allows?",
    options: [
      '10 mA',
      '30 mA',
      '100 mA',
      '300 mA',
    ],
    correctIndex: 3,
    explanation:
      "Reg 422.3.9. 300 mA cap for fire protection. Note that’s an upper limit — for resistive fault risks like overhead heating film it tightens to 30 mA (422.3.9(a)). 30 mA RCDs you see on socket circuits are doing shock protection, not fire.",
  },
  {
    id: 'dsear-zone-check',
    question: "You’re going to wire some lighting in a small chemical store where solvent vapour might escape during normal operation. Which zone is that?",
    options: [
      'Zone 0',
      'Zone 1',
      'Zone 2',
      'Zone 22',
    ],
    correctIndex: 1,
    explanation:
      "Zone 1 — explosive atmosphere LIKELY in normal operation. Zone 0 is continuous (inside the tank itself). Zone 2 is unlikely / brief if at all. Zones 20/21/22 are the dust equivalents (e.g. flour mills, grain stores).",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Roughly how many electrical fires happen in UK buildings each year?',
    options: [
      'Around 250',
      'Around 2,500',
      'Around 25,000',
      'Around 250,000',
    ],
    correctAnswer: 2,
    explanation:
      "Electrical Safety First puts it at about 25,000 a year. Roughly half of accidental dwelling fires have an electrical origin. Bad terminations and overloaded circuits are the usual culprits — both preventable.",
  },
  {
    id: 2,
    question: "Which Chapter of BS 7671 covers protection against thermal effects and fire from electrical equipment?",
    options: [
      'Chapter 41',
      'Chapter 42',
      'Chapter 43',
      'Chapter 44',
    ],
    correctAnswer: 1,
    explanation:
      "Chapter 42. 41 is shock protection, 43 is overcurrent, 44 is overvoltage. Chapter 42 is the fire one — covers cable performance, sealing penetrations, motors, luminaires, the lot.",
  },
  {
    id: 3,
    question: "A cable passes through a fire-rated wall. What does BS 7671 say about the hole afterwards?",
    options: [
      "Leave it open so the cable can breathe",
      "Tape it up with PVC tape",
      "Seal it to the same fire-resistance rating as the wall",
      "Only seal it if it’s a domestic installation",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 527.2 / Chapter 42. Penetration sealing has to match the fire rating of the element it’s gone through. Use a tested fire-stopping product — intumescent putty, mastic, fire-rated foam, fire pillows. PVC tape is not a fire seal.",
  },
  {
    id: 4,
    question: "Which extinguisher is the right call on a live electrical fire?",
    options: [
      'Water (red)',
      'Foam (cream)',
      'CO₂ (black)',
      'Wet chemical (yellow)',
    ],
    correctAnswer: 2,
    explanation:
      "CO₂ — black label. No conductive residue, smothers the fire, won’t electrocute you. Dry powder (blue) works too but it’s messy and ruins kit. Water and foam on live equipment can put you in the circuit.",
  },
  {
    id: 5,
    question: "What does DSEAR 2002 actually cover?",
    options: [
      'Cable colour codes',
      'How to test an RCD',
      'Fire and explosion risk from dangerous substances and explosive atmospheres at work',
      'Working at height',
    ],
    correctAnswer: 2,
    explanation:
      "Dangerous Substances and Explosive Atmospheres Regulations 2002. Sets minimum requirements for protecting workers from fire and explosion risk from flammable liquids, gases and dusts. Drives the zone classification you’ll see on petrol forecourts, paint shops, grain stores and the like.",
  },
  {
    id: 6,
    question: "A grain silo’s interior is a Zone 22. What does that tell you?",
    options: [
      'Explosive dust cloud likely in normal operation',
      'Explosive dust cloud unlikely, brief if it occurs',
      'Explosive gas atmosphere always present',
      'No explosive risk — zone 22 is safe',
    ],
    correctAnswer: 1,
    explanation:
      "Zones 20/21/22 are for combustible DUSTS (gases use 0/1/2). Zone 22 = unlikely, brief if at all. Zone 21 = likely in normal operation. Zone 20 = continuous or long periods. Different equipment ratings for each.",
  },
  {
    id: 7,
    question: "You’re cutting trunking with an angle grinder in a plant room. What’s the minimum the boss should put in place?",
    options: [
      'Nothing — angle grinders are normal site kit',
      'Just a fire extinguisher nearby',
      'Hot work permit, fire watch, extinguisher present, and a check for combustibles',
      'Phone the fire brigade before you start',
    ],
    correctAnswer: 2,
    explanation:
      "Hot works (cutting, grinding, soldering, hot-air gun) need a permit, a trained fire watcher staying on for at least 30-60 minutes after, an extinguisher within arm’s reach, and combustibles cleared or covered. This is standard insurance and HSE expectation.",
  },
  {
    id: 8,
    question: "An LSZH (Low Smoke Zero Halogen) cable is specified for a stairwell. Why?",
    options: [
      "It’s cheaper than PVC",
      "It carries more current",
      "When it burns it doesn’t give off thick smoke or toxic halogen gas — keeps the escape route survivable",
      "It’s a legal requirement for all cables in any building",
    ],
    correctAnswer: 2,
    explanation:
      "PVC cable burning gives off hydrogen chloride — chokes you and corrodes everything. LSZH (or LSF) is for places where people might be trapped or evacuating: escape routes, tunnels, public areas. CPR class Cca-s1b,d1,a1 is the typical spec for escape routes under the Construction Products Regulation.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "How does an electrical fault actually start a fire? Most cables don’t catch fire when they’re working.",
    answer:
      "Three main routes. First, a loose connection — high resistance there means the joint heats up every time current flows, eventually charring the insulation, the terminal block, then anything nearby. Second, an overloaded cable — too much current for the CSA, the conductor heats, the PVC softens, eventually it ignites. Third, an arc — series or parallel — gives you thousands of degrees in a tiny spot for milliseconds, easily enough to ignite dust, paper, insulation. RCDs and MCBs catch some of these. AFDDs catch arcs the others miss.",
  },
  {
    question: "Do I need to learn all the ATEX zone numbers off by heart?",
    answer:
      "Not for a Level 2 exam, but you should know the pattern. Gases: 0 = continuous, 1 = likely in normal operation, 2 = unlikely / brief. Dusts: same scale but +20, so 20/21/22. As an apprentice you spot the markings on the wall and on the kit and you don’t go in unless you’re with someone qualified. Selecting Ex equipment is a competent-person job — usually a CompEx-certified electrician.",
  },
  {
    question: "What’s an Ex marking actually telling me?",
    answer:
      "It’s the equipment’s passport for hazardous areas. Ex d = flameproof enclosure (contains an internal explosion). Ex e = increased safety (no normal sparks). Ex i = intrinsically safe (so little energy it can’t ignite). Plus a temperature class (T1-T6) saying the hottest surface temperature, and a gas group. If the markings don’t match the zone, the kit doesn’t go in.",
  },
  {
    question: "Where do AFDDs fit into the fire story?",
    answer:
      "Arc Fault Detection Devices spot the signature of a series or parallel arc — the kind a normal MCB or RCD will sail straight past. From A2 (and reinforced through later amendments) BS 7671 recommends AFDDs on socket circuits in higher-risk premises, and now A4:2026 broadens the scope further. For Level 2, know what they do and that they’re recommended, not always mandatory — check the current edition for which premises actually require them.",
  },
  {
    question: "Why do escape routes get special cables?",
    answer:
      "Two reasons. (1) Circuit integrity — if the fire’s already started, you need the alarm bells, the emergency lighting and the smoke fans to keep working long enough for everyone to get out. That’s where BS 6387 fire-resistant cable categories (CWZ being the big one for fire alarm) come in. (2) Smoke and gas — you don’t want the cable itself filling the corridor with toxic fumes, so LSZH / LSF and CPR Cca-s1b,d1,a1 class cables are used. The two requirements stack: fire-resistant AND low smoke.",
  },
  {
    question: "Hot works permit — is that really needed for a bit of soldering?",
    answer:
      "On a live site or commercial building, yes. Soldering, brazing, hot-air gun for shrink-sleeving, angle grinder, anything with a flame or sparks. The insurer wants the permit, the fire watch, the extinguisher and the post-work check. Plenty of buildings have burned down hours after the spark went home because a smouldering cinder reignited. The 30-60 minute fire watch isn’t bureaucracy — it’s there for that exact reason.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1.2 · Subsection 3"
            title="Fire hazards and explosive environments"
            description="Why electrical work starts so many UK fires, how BS 7671 Chapter 42 stops them, and what DSEAR means the day you walk into a paint shop or a petrol forecourt."
            tone="emerald"
          />

          <TLDR
            points={[
              "Fire needs heat + fuel + oxygen. An electrical fault gives you the heat — loose terminals, overloads, arcs. The fuel and the air are already there.",
              "BS 7671 Chapter 42 is the fire chapter. Cable performance, sealing penetrations, RCDs for fire protection (≤300 mA), AFDDs, motors, luminaires.",
              "DSEAR + ATEX zones cover anywhere flammable vapour or dust can form an explosive atmosphere. As an apprentice you spot the markings — competent persons select the kit.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain how an electrical fault provides the heat side of the fire triangle.",
              "Name the most common causes of electrical fires and the warning signs you’d spot on site.",
              "Apply the key Chapter 42 requirements: penetration sealing, RCDs for fire protection, AFDDs, cable fire performance.",
              "Recognise ATEX zone classifications for gases (0/1/2) and dusts (20/21/22) and what that means for equipment selection.",
              "Pick the right extinguisher for a live electrical fire and explain why water and foam are wrong.",
              "Describe what a hot works permit is and when one applies.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The fire triangle, electrically</ContentEyebrow>

          <ConceptBlock
            title="The fault is almost always the heat — the fuel and the oxygen are already there"
            plainEnglish="Fire needs three things at once. Take any one away and the fire dies. On an electrical fire, the fault is the heat. Cable insulation, plasterboard paper, dust on the heat sink — that’s the fuel. Air does the rest."
            onSite="If you see a charred terminal, a melted MCB body, or a brown stain spreading from a junction box — that’s the heat side of the triangle screaming at you. Don’t paint over it. Make it safe and investigate."
          >
            <p>
              You’ll have heard of the fire triangle since primary school: heat, fuel, oxygen. On an
              electrical job, the building supplies the fuel (PVC sheath, timber joists, dust on
              top of the consumer unit, plasterboard paper) and the air supplies the oxygen.
              That leaves the heat — and that’s where electricity comes in.
            </p>
            <p>
              The heat comes from one of three places: a loose connection turning into a high-resistance
              joint, a cable carrying more current than its CSA can shed, or an arc — a flash of
              electricity jumping a gap. Any of those gets hot enough to ignite what’s around them
              if it goes on long enough.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The numbers — about 25,000 electrical fires a year in the UK"
            onSite="Half of all accidental house fires in the UK have an electrical origin. Most of them are preventable with proper terminations and the right protective device for the load."
          >
            <p>
              Electrical Safety First put it at around 25,000 fires of electrical origin in UK
              buildings per year. Roughly half of all accidental dwelling fires either start with
              electricity or have an electrical product involved. People die in those fires —
              dozens of them every year — and many more end up in hospital with smoke inhalation.
            </p>
            <p>
              Boring causes too. Loose terminations on socket outlets. Tumble dryers with a clogged
              filter. Phone chargers in pillows. Overloaded extension leads. The same five or six
              causes come up again and again, which is exactly why BS 7671 has a whole chapter on
              fire and why the City &amp; Guilds syllabus puts it front and centre.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 421.1.1"
            clause="Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations."
            meaning={
              <>
                The general fire duty. Protect <strong>people</strong>, <strong>animals</strong>{' '}
                and <strong>property</strong> from heat and fire generated by electricity OR
                propagated through it. Every other Chapter 42 reg flows from this one.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 4 Chapter 42"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Common causes — what actually starts the fires</ContentEyebrow>

          <ConceptBlock
            title="Loose connections, overloads, damaged insulation, water ingress"
            plainEnglish="Most electrical fires start with the same five or six things. Knowing what they look like is half the battle."
          >
            <p>The usual suspects, in roughly the order you’ll meet them:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loose connections.</strong> A terminal that wasn’t tightened properly heats up
                every time current flows. Brown discolouration round the screw, smell of warm
                Bakelite, melted plug pin — all classic signs. Most common cause is rushed work.
              </li>
              <li>
                <strong>Overloaded circuits.</strong> Too much load for the cable, the breaker too
                high to spot it. Cable runs warm, then hot, then the insulation softens. Daisy-chained
                extension leads in offices are a classic.
              </li>
              <li>
                <strong>Damaged insulation.</strong> Cable trapped under a floorboard, nicked by a
                screw, chewed by mice, perished by UV outside. Eventually shorts to earth or to
                another core. Arcing burns the surrounding material.
              </li>
              <li>
                <strong>Wrong protective device.</strong> Bigger MCB fitted because "it kept tripping".
                Fault current now sails through the cable until something else gives.
              </li>
              <li>
                <strong>Water ingress.</strong> IP-rated kit fitted by someone who didn’t seal the
                gland properly. Tracking, corrosion, eventual fault. Outdoor sockets and bathroom
                fans are repeat offenders.
              </li>
              <li>
                <strong>Ageing.</strong> Rubber-insulated cable from the 1960s. PVC that’s gone
                brittle. Old fuse boards with no RCD protection. Surveys keep finding these.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 422.3.4"
            clause="A cable shall as a minimum meet the requirements of BS EN 60332-1-2 unless it is fully embedded in non-combustible material such as plaster or concrete, or is installed in an approved conduit, trunking, ducting, tray, ladder or powertrack system that satisfies the referenced fire tests."
            meaning={
              <>
                Even bog-standard 6242Y has to pass <strong>BS EN 60332-1-2</strong> — a flame test
                that says the cable won’t propagate flame on its own. That’s the floor. Where cables
                pass through escape routes, run in voids, or sit in bundles, the bar gets higher
                (CPR classes Cca-s1b,d1,a1 and BS 6387 fire-resistant categories like CWZ).
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Reg 422.3.4"
          />

          <SectionRule />

          <ContentEyebrow>What Chapter 42 makes you do</ContentEyebrow>

          <ConceptBlock
            title="Sealing penetrations — the hole around the cable matters as much as the cable"
            onSite="If you’ve drilled a 25 mm hole through a fire-rated stud wall to feed a cable, that hole now has to be sealed back up to the wall’s fire rating. Intumescent putty, fire mastic, fire pillows, or a tested gland system. PVC tape isn’t sealing — it’s hiding."
          >
            <p>
              Fire spreads through buildings via the gaps it finds — under doors, up service risers,
              through cable holes. BS 7671 won’t let you defeat the building’s fire compartmentation
              with a sloppy install. Every penetration through a fire-rated element has to be sealed
              to the same rating as the element itself, using a tested system.
            </p>
            <p>
              That covers two things: the cable itself (it needs to pass the right fire test for
              the location), and the surrounding gap (intumescent material that swells in heat and
              chokes off the hole). Both go into the test inspection schedule on the EIC. Get this
              wrong and the BCO will spot it on a building control sign-off.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 527.2 / Chapter 42"
            clause="Where a wiring system passes through elements of building construction such as floors, walls, roofs, ceilings, partitions or cavity barriers, the openings remaining after passage of the wiring system shall be sealed according to the degree of fire-resistance (if any) prescribed for the respective element of building construction before penetration."
            meaning={
              <>
                You can’t downgrade the building’s fire compartmentation. If you’ve gone through a
                60-minute fire wall, the seal has to give 60 minutes back. Use a{' '}
                <strong>tested fire-stopping product</strong> — intumescent mastic, putty pads, fire
                pillows or fire-rated foam — not whatever was in the van.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Reg 527.2"
          />

          <ConceptBlock
            title="RCDs for fire protection — 300 mA cap, 30 mA where the fault could be resistive"
            plainEnglish="An RCD on a socket circuit at 30 mA is for SHOCK. An RCD upstream at 100-300 mA, covering a whole DB or distribution circuit, is often there for FIRE — to trip on tracking and earth leakage before things get hot enough to ignite."
          >
            <p>
              Chapter 42 lets you use RCDs as additional fire protection. The catch: the rating
              can’t go above <strong>300 mA</strong>, and where the fault could be resistive (think
              overhead heating film, where a slow earth leakage just heats things up) it tightens
              to <strong>30 mA</strong>. The RCD must disconnect ALL live conductors when it trips.
            </p>
            <p>
              In practice you’ll see 100 mA or 300 mA time-delayed RCDs on the incomer of a TT
              install, or on the supply to outbuildings. They’re there to catch the slow, low-level
              earth leakage that an MCB can’t see — exactly the kind of leakage that quietly
              chars a junction box for weeks before anyone notices.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 422.3.9"
            clause="Any RCD installed specifically for additional fire protection purposes under this clause shall have a rated residual operating current not exceeding 300 mA. Where a resistive fault may cause a fire, for example for overhead heating with heating film elements, the rated residual operating current shall not exceed 30 mA."
            meaning={
              <>
                300 mA is the upper limit for fire-protection RCDs. 30 mA where the fault could be a
                slow burn rather than a flash — heated floor mats, heating film, that kind of kit.
                Different number, same job: stop the leakage before it sets fire to anything.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Reg 422.3.9"
          />

          <ConceptBlock
            title="AFDDs — the device that catches what RCDs and MCBs miss"
            onSite="A series arc (loose terminal arcing across a tiny gap) draws a tiny current — well under what an MCB or RCD will trip on. AFDDs read the waveform and spot the arc signature. From A4:2026 the recommendation is broader than ever."
          >
            <p>
              <strong>Arc Fault Detection Devices</strong> have been in BS 7671 since A2. They look
              at the current waveform and detect the high-frequency noise that comes off a series
              or parallel arc — exactly the kind of fault that an MCB sails past because the
              current’s still tiny.
            </p>
            <p>
              For Level 2: know that AFDDs exist, know they protect against arcing faults, and know
              that they’re now recommended (and in some cases required) on socket circuits in
              higher-risk premises like care homes, HMOs and high-rise residential. A4:2026 has
              tightened the wording further — check the current edition for the exact list.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Temperature cut-outs and motors — manual reset, no exceptions"
            plainEnglish="If a thermal cut-out is there to stop a fire, it can’t reset itself when the temperature drops. Otherwise the fault that overheated the motor first time round just heats it up again, and again, until something cracks."
          >
            <p>
              Reg 422.1.3 makes it a hard rule: a temperature cut-out used as a fire-protection
              device must be <strong>manual reset only</strong>. Same logic in 422.3.7 for motors —
              if the motor is automatically/remotely controlled or unsupervised, the over-temperature
              device that protects it has to be manual reset too.
            </p>
            <p>
              Why it matters: an auto-reset cut-out hides the underlying fault. A manual reset
              forces someone to walk over, look at it, find out why it tripped, and fix that
              before the kit comes back on. That’s the whole point.
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

          <ContentEyebrow>Hot works — when YOU become the ignition source</ContentEyebrow>

          <ConceptBlock
            title="Cutting, grinding, soldering, hot-air gun — that’s hot works"
            onSite="The classic story: spark cuts a length of trunking with an angle grinder at 4pm, packs up, goes home. A cinder smoulders in the void behind the wall. At 11pm the building’s on fire. Hot works permits and a 30-60 minute fire watch exist precisely to stop that."
          >
            <p>
              Anything that produces sparks, flame or hot enough metal to start a fire counts as hot
              works: angle grinder, oxy-acetylene, MAPP gas, soldering iron, hot-air gun for heat
              shrink, even some powered tools that throw sparks.
            </p>
            <p>
              On a managed site you’ll need a <strong>hot work permit</strong> signed off before you
              start. That permit will demand: combustibles cleared or covered (fire blankets), a
              named fire watcher who stays on for at least 30-60 minutes after work stops, an
              extinguisher within arm’s reach, and notification of the building’s fire systems team
              if there’s any chance of false-alarming the panel.
            </p>
          </ConceptBlock>

          <Scenario
            title="Cutting a steel back box flush in an occupied office"
            situation={
              <>
                You’re second-fix on a refurb. The new socket position needs the back box trimmed
                with the angle grinder. Office is half-occupied, carpet tiles down, paperwork on
                desks two metres away.
              </>
            }
            whatToDo={
              <>
                Stop. Get a hot work permit raised before you strike a spark. Move the desks or
                cover them with a fire blanket. Ask the FM team to put the relevant smoke heads on
                test so you don’t trigger the alarm. CO₂ extinguisher next to you, not down the
                corridor. Fire watch stays on for at least 30 minutes after the last spark. Sign
                off the permit when you’re done.
              </>
            }
            whyItMatters={
              <>
                Your insurer’s policy is almost certainly conditional on hot work permits being in
                place. No permit = uninsured. And the post-work fire watch isn’t bureaucracy —
                buildings have burned down hours after the spark left because a cinder smouldered
                quietly in a void.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>DSEAR and explosive atmospheres</ContentEyebrow>

          <ConceptBlock
            title="DSEAR 2002 — the law for flammable substances and explosive atmospheres"
            plainEnglish="If a workplace has flammable liquids, gases, vapours or combustible dusts, DSEAR applies. Petrol forecourt, paint shop, grain store, sewer chamber, even the boiler room of a domestic property in some cases."
          >
            <p>
              The Dangerous Substances and Explosive Atmospheres Regulations 2002 came in to bring
              the UK into line with the European ATEX directives. They sit alongside HASAWA and the
              Management Regs and put specific duties on employers wherever a flammable substance
              could form an explosive atmosphere.
            </p>
            <p>
              In short: the employer has to identify the dangerous substance, assess the risk of an
              explosive atmosphere, classify the area into <strong>zones</strong>, control the
              ignition sources (electrical equipment is one of them), and provide emergency
              procedures. As the spark, you don’t classify zones — but you do have to read them and
              install kit that matches.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="DSEAR 2002 — purpose"
            clause="DSEAR applies to all dangerous substances at nearly every workplace in the United Kingdom and sets minimum requirements for the protection of workers from fire and explosion risks arising from dangerous substances and potentially explosive atmospheres. DSEAR complements the requirement to manage risks under the Management of Health and Safety at Work Regulations 1999."
            meaning={
              <>
                One regulation, three risks: <strong>fire</strong>, <strong>explosion</strong> and
                <strong> dangerous substance harm</strong>. Anywhere a flammable vapour, gas or dust
                cloud could form, DSEAR is in play. Petrol stations, paint shops, distilleries,
                chemical plants, grain stores, sewers, even some domestic boiler rooms.
              </>
            }
            cite="Reference: HSE — Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR)"
          />

          <ConceptBlock
            title="Zone classification — gases use 0/1/2, dusts use 20/21/22"
            onSite="On site you’ll see zone signs at the boundary — yellow triangle with EX inside, plus the zone number. Equipment inside the boundary has to be Ex-rated for that zone or higher."
          >
            <p>
              Zones rank an area by how often and for how long an explosive atmosphere is likely to
              be there:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zone 0 (gas) / Zone 20 (dust)</strong> — explosive atmosphere present
                continuously or for long periods. Inside a fuel tank, inside a flour silo. You don’t
                go in there casually.
              </li>
              <li>
                <strong>Zone 1 (gas) / Zone 21 (dust)</strong> — likely in normal operation. Around
                the dispensing hoses on a forecourt, the spray area of a paint booth, the area
                around a flour-handling machine.
              </li>
              <li>
                <strong>Zone 2 (gas) / Zone 22 (dust)</strong> — unlikely in normal operation, brief
                if it happens. A storage area for sealed drums of solvent, the wider room around a
                grain handling line.
              </li>
            </ul>
            <p>
              Each zone needs equipment certified for use in it. A Zone 1 fitting will work in
              Zone 2; a Zone 2 fitting will NOT work in Zone 1. Always read up, never down.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ATEX / IECEx markings — what to look for, why it’s not your call to select"
            plainEnglish="An Ex marking is the equipment’s passport. You read it to check the kit matches the zone. You don’t pick the kit — that’s the qualified electrician’s call, often someone with CompEx certification."
          >
            <p>
              On hazardous-area kit you’ll see a string of markings, something like{' '}
              <strong>Ex e II 2G T4</strong>. Broken down:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ex</strong> — explosion-protected.
              </li>
              <li>
                <strong>Type of protection</strong> — d (flameproof), e (increased safety), i
                (intrinsically safe), p (pressurised), n (non-sparking), and others. Different
                techniques for different zones.
              </li>
              <li>
                <strong>Equipment group / category</strong> — II = surface industry (mining is I),
                category 1/2/3 corresponds roughly to zones 0 / 1 / 2.
              </li>
              <li>
                <strong>G or D</strong> — Gas or Dust.
              </li>
              <li>
                <strong>Temperature class T1-T6</strong> — the maximum surface temperature. T6 is the
                coolest (≤85°C), T1 the hottest (≤450°C). Your kit’s surface temp must be below the
                ignition temperature of whatever’s in the air.
              </li>
            </ul>
            <p>
              As an apprentice you spot the markings and check they match what’s been specified.
              Selecting the kit, designing the install and signing it off is a competent-person job.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Bringing your normal multimeter or torch into a Zone 1 area"
            whatHappens={
              <>
                You’re sent to fault-find on a small motor in the spray-paint mixing room. You walk
                in with your standard Fluke and a head torch. Both have switches and batteries that
                can spark. The room’s vapour level is borderline. One spark, one flash fire — and
                you’re in the middle of it.
              </>
            }
            doInstead={
              <>
                If a zone is marked at the door, stop. Get the permit. Use intrinsically safe (Ex i)
                test kit only. Use an Ex-rated torch. If you don’t have either, you don’t go in. The
                line "I was just having a quick look" doesn’t survive an HSE investigation.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>If a fire actually starts — extinguishers</ContentEyebrow>

          <ConceptBlock
            title="CO₂ on live electrical fires — water and foam are how you join the circuit"
            onSite="Black band = CO₂. That’s the one for live electrical equipment. Most plant rooms and electrical cupboards have one mounted on the wall right by the door — make a note of where it is on day one."
          >
            <p>
              UK extinguishers are colour-banded so you can tell them apart at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CO₂ — black band.</strong> Smothers the fire, no conductive residue, won’t
                damage electrical kit. The default for live electrical fires. Class B (flammable
                liquids) and electrical.
              </li>
              <li>
                <strong>Dry powder — blue band.</strong> Works on most things including electrical,
                but it’s MESSY. Powder gets into every relay, contact and connector — kit’s usually
                a write-off. OK in emergency, not first choice.
              </li>
              <li>
                <strong>Water — red band.</strong> Class A (paper, wood, fabric). NEVER on live
                electrical equipment — water conducts and you join the circuit.
              </li>
              <li>
                <strong>Foam — cream band.</strong> Class A and B. Same problem with live
                electricals — most foam is conductive. Don’t.
              </li>
              <li>
                <strong>Wet chemical — yellow band.</strong> Class F (cooking oil/fat). Kitchen kit,
                not for electricians.
              </li>
            </ul>
            <p>
              First move on any electrical fire isn’t the extinguisher — it’s the isolator. Kill the
              power if it’s safe to reach the switch, raise the alarm, evacuate, and only fight the
              fire if you’ve been trained AND it’s small enough. PASS: <strong>P</strong>ull,{' '}
              <strong>A</strong>im, <strong>S</strong>queeze, <strong>S</strong>weep.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Fire = heat + fuel + oxygen. Electrical faults are the heat — loose terminations, overloads, arcs.",
              "About 25,000 electrical fires a year in the UK. Half of accidental house fires have an electrical origin. Most are preventable.",
              "BS 7671 Chapter 42 is the fire chapter. Reg 421.1.1 sets the general duty; 422.3.4 sets cable fire performance; 422.3.9 caps fire-protection RCDs at 300 mA (30 mA for resistive faults).",
              "Penetration sealing matches the fire rating of the wall/floor you went through. PVC tape is not a fire seal.",
              "DSEAR 2002 covers explosive atmospheres. Gases use Zones 0/1/2, dusts use 20/21/22. Equipment must be Ex-rated for the zone — read the markings, don’t select unless you’re competent.",
              "On a live electrical fire: kill the power, raise the alarm, CO₂ (black band) if you fight it. Never water or foam on live kit.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz
            title="Fire hazards and explosive environments knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Overloads, short circuits and arcing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Working at height (electrical)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
