/**
 * Module 3 · Section 3 · Sub 2 — Wiring systems for different environments
 * City & Guilds 2365-02 → Unit 203 → LO3 → AC 3.2
 *   AC 3.2 — "Identify wiring systems for different environments"
 *
 * Same building, six different wiring systems. T&E, singles in conduit/trunking,
 * SWA, MICC/Pyro, flex, LSF and data/comms separation. Cross-refs Sub3 (CCC),
 * Sub5 (install kit) and Sub6 (enclosure fill).
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
import { CableCrossSection } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Wiring systems for different environments | Level 2 Module 3.3.2 (AC 3.2) | Elec-Mate';
const DESCRIPTION =
  'T&E, singles in conduit, SWA, MICC, flex, LSF and data cabling — choosing the right wiring system for the install environment. With BS 7671 522.6.202 and 521.10.1 references.';

const checks = [
  {
    id: 'concealed-domestic-check',
    question:
      'You’re running a new socket circuit chased into a plastered partition wall in a domestic kitchen extension. The default wiring system is:',
    options: [
      'Evaluating what coping resources and options are available',
      'To prevent the shield from acting as an antenna and picking up more interference',
      'Incoming supply, control voltages, capacitor banks, and spring-charged mechanisms',
      'T&E (6242Y) in the chase, capped, with RCD protection per 522.6.202',
    ],
    correctIndex: 3,
    explanation:
      '6242Y T&E in the chase, oval PVC capping, finished with plaster. Reg 522.6.202 then requires either a prescribed zone, RCD additional protection (415.1.1), 50 mm depth, or 522.6.204 mechanical protection. T&E is fast, cheap and standard for concealed domestic.',
  },
  {
    id: 'outdoor-buried-check',
    question:
      'Feeding a detached garage 18 m down the garden, buried at 600 mm. Best wiring system:',
    options: [
      'Open circuit heating element',
      'Measuring pressure drop across a flow restriction',
      'SWA copper-armoured with external glands',
      'Trace signal paths and understand circuit operation',
    ],
    correctIndex: 2,
    explanation:
      'SWA. The steel armour gives mechanical protection against future spade strikes and (when properly glanded and bonded) acts as the CPC. T&E direct in soil is non-compliant; flex is for final connections only.',
  },
  {
    id: 'data-separation-check',
    question:
      'You’re running Cat 6a data cable in the same trunking compartment as 230 V mains. What does BS 7671 521.6 / BS EN 50174 require?',
    options: [
      'To provide a chronological, auditable record of all maintenance activities on an asset',
      'Separation by a continuous earthed metal divider, or use a separate compartment / segregated trunking',
      'All motors fed from that control supply lose their control circuits — all contactors drop out simultaneously',
      'The supplier’s combined neutral and earth (PEN) conductor, separated into N and PE at the cut-out',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 528.1 (segregation of circuits) and BS EN 50174-2 require physical separation between Band I (extra-low voltage data) and Band II (mains). Either separate compartments, divided trunking with an earthed metal partition, or completely separate trunking.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A "wiring system" in BS 7671 means:',
    options: [
      'It applies a detectable signal to a specific service, making it easier for the CAT to locate',
      'The cable plus its method of support, enclosure or containment, considered together',
      'To ensure PPE is maintained in an efficient state, in efficient working order, and in good repair',
      'Tool availability, suitability for task, and safety requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Per BS 7671 Part 2 definitions, a wiring system is the cable plus the way it’s installed — clipped, in conduit, on tray, in trunking, in ducting. The selection rules in Section 521 cover both the cable AND the install method as a single decision.',
  },
  {
    id: 2,
    question:
      'A non-sheathed single-core cable for fixed wiring in a commercial install must be:',
    options: [
      'Restart the computer and close unnecessary programs',
      'Deadlines, complexity, and responsibility can create pressure',
      'Enclosed in conduit, ducting or trunking per Reg 521.10.1',
      'Clearly and concisely summarise the purpose or action required',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 521.10.1 — non-sheathed cables must be enclosed in conduit, ducting or trunking (or in trunking that meets at least IPXXD / IP4X with a tool-removable cover). Singles like 6491X are designed exactly for this — drawn into conduit, never run loose.',
  },
  {
    id: 3,
    question:
      'MICC (Pyro) cable’s headline advantage over PVC alternatives is:',
    options: [
      'That it meets the essential health and safety requirements set out in UK/EU regulations',
      'The goal is showing up consistently; you can scale up once the habit is established',
      'Lights energised continuously, operating from normal and emergency supplies',
      'Inherent fire resistance — the copper sheath and mineral insulation maintain circuit integrity in a fire',
    ],
    correctAnswer: 3,
    explanation:
      'Pyro is rated for circuit integrity in fire — used where the supply must keep working through a fire (sprinkler pumps, smoke vents, escape lighting, fire alarm sounders). Expensive, slow to terminate (gland + pot + seal), but it survives 950°C+ where polymeric cables would have failed inside three minutes.',
  },
  {
    id: 4,
    question:
      'Twin-and-earth cable buried in plaster less than 50 mm deep, NOT in a prescribed zone, NOT on a metallic enclosure — what does Reg 522.6.202 require?',
    options: [
      'Additional protection by 30 mA RCD (415.1.1) OR comply with 522.6.204 (mechanical protection)',
      'As long as necessary to communicate all safety-critical information clearly, with time for questions and clarification',
      'The injury must be caused by work activity, conditions created by work, or the manner of conducting the work',
      'External lighting uses weather-resistant luminaires and covers external escape routes',
    ],
    correctAnswer: 0,
    explanation:
      'Cable < 50 mm deep, no metallic protection, not in a prescribed zone — you need either a 30 mA RCD per 415.1.1 OR mechanical protection that satisfies 522.6.204 (typically earthed metal capping or conduit). Both achieve the same goal: a nail or screw doesn’t cause fatal shock.',
  },
  {
    id: 5,
    question:
      'A 32 A SWA submain feeding a garden office is glanded into a metal enclosure. The steel-wire armour:',
    options: [
      'Supply characteristics, impedance of supply path, and transformer ratings',
      'Acts as the CPC when glanded with a CW gland and tested for continuity (Sub-clause 543.2)',
      'A list of items to be completed or corrected before final acceptance',
      'Stop work immediately, leave the area, and report the situation so the risk assessment can be reviewed',
    ],
    correctAnswer: 1,
    explanation:
      'Properly glanded and tested, the SWA armour is an acceptable CPC under BS 7671 543.2. R2 must be measured end-to-end and pass the limit for the CSA in Table 54.7. Always check — a poorly made gland is a high-impedance CPC and that’s a fault waiting to happen.',
  },
  {
    id: 6,
    question:
      'Flexible cord (flex) for a final connection to a fixed appliance can be a maximum length of:',
    options: [
      '1.0 m',
      '1.5 m',
      '3.0 m',
      '5.0 m',
    ],
    correctAnswer: 2,
    explanation:
      'OSG / BS 7671 553.1.7 informal guidance: flex final connections to fixed equipment generally limited to 3.0 m max, supported and protected against mechanical damage. Longer than 3 m and you’re back into fixed-wiring territory (T&E or singles in conduit).',
  },
  {
    id: 7,
    question:
      'On a hospital escape route, you would specify:',
    options: [
      'The tongue withdraws from the switch head, breaking the safety circuit',
      'To record defects or incomplete items requiring correction before handover',
      'To control efficiency, safety, compliance, and comfort',
      'Low Smoke and Fume (LSF / LSZH) cable to limit toxic smoke in a fire',
    ],
    correctAnswer: 3,
    explanation:
      'LSF / LSZH (Low Smoke Zero Halogen) cables don’t emit corrosive halogen gases when burning. Critical on escape routes, public buildings, hospitals and underground stations where survivable smoke conditions matter. Standard PVC produces hydrogen chloride — toxic and corrosive.',
  },
  {
    id: 8,
    question:
      'Data cable (Cat 6a) and 230 V mains share the same trunking. The compliant arrangement is:',
    options: [
      'Separation by an earthed metal divider, OR multi-compartment trunking, OR wholly separate trunking',
      'Walk both parties back down the ladder to the observable data and rebuild shared meaning from there',
      'Adults need to understand why they are learning something before they engage with it',
      'They provide guidance based on real experience, helping you avoid common mistakes',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 528.1 segregation rules + BS EN 50174-2 (data cabling install practice) — Band I and Band II must be physically separated. Either compartment trunking with metal dividers, separate trunking, or a guaranteed minimum spacing per the standard.',
  },
];

const faqs = [
  {
    question: "Why isn’t T&E used for everything? It’s cheap and quick.",
    answer:
      "T&E is brilliant for concealed domestic — fast, neutral PVC sheath, easy to clip and chase. But it has no mechanical protection (a nail goes straight through), no fire resistance (PVC fails around 70 °C continuous, melts at 160 °C), and the white sheath looks awful surface-mounted. Once you’re outdoors, on a flat-roofed school, in a plant room, or in a fire-rated escape route, T&E is the wrong choice — you want SWA, singles in trunking, or MICC respectively.",
  },
  {
    question: "What’s the difference between LSF and LSZH?",
    answer:
      "Low Smoke and Fume (LSF) is a marketing term — covers PVC cables modified to reduce smoke. Low Smoke Zero Halogen (LSZH or LSOH) is the proper specification — no halogen content (so no hydrogen chloride or hydrogen bromide gas in a fire). For escape routes, hospitals, schools and underground installations, the spec usually demands true LSZH, not just LSF. Always check the spec, not just the cable jacket marking.",
  },
  {
    question: "When is MICC actually worth the install time and cost?",
    answer:
      "Where loss of supply during a fire would be catastrophic. Common applications — sprinkler pumps, fire pumps, smoke ventilation fans, fire alarm sounder circuits and emergency lighting that must operate while the building is on fire. Modern alternative is FP200 / FP400 fire-rated cable (polymer-based), which is cheaper and faster to terminate but doesn’t reach Pyro’s 950 °C circuit-integrity rating. For the highest fire-rating jobs (BS 6387 CWZ), Pyro is still spec.",
  },
  {
    question: "Why does conduit have to be at least IPXXD / IP4X for non-sheathed cables?",
    answer:
      "Reg 521.10.1 — non-sheathed singles like 6491X have only one layer of insulation. If a finger could touch the live conductor through a gap in the trunking, you’d have basic-protection failure. IPXXD / IP4X means the test finger can’t reach the conductor — keeps the basic insulation effective even with the cover off. That’s why singles go in proper trunking with tool-removable covers, not loose in cable basket.",
  },
  {
    question: "Can SWA be used as the CPC, or do I need to run a separate earth core?",
    answer:
      "SWA armour is an acceptable CPC under BS 7671 543.2 if (1) it’s correctly glanded with a CW or BW gland that maintains continuity, (2) it’s bonded at both ends, (3) the resistance per Table 54.7 is met, and (4) it’s tested for end-to-end continuity (R2). On bigger sub-mains it’s still common to run a separate earth core inside the cable as well, just for redundancy and easier compliance with adiabatic checks.",
  },
  {
    question: "What’s the fastest way to identify the right wiring system on a tender?",
    answer:
      "Three questions. (1) Where does it live — concealed in plaster (T&E), surface in a plant room (singles in trunking or SWA), buried (SWA), in a fire compartment (FP200 / Pyro), bathroom (T&E in zone or LSZH)? (2) What environment hits it — water, abrasion, sunlight, fire, EMI, mechanical impact? (3) What does the spec say — schools and hospitals nearly always demand LSZH, fire routes demand fire-rated, industrial often demands SWA throughout. Get those three answers and 90% of the wiring system selection is decided.",
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 2"
            title="Wiring systems for different environments"
            description="Same building, half a dozen different cable types. The environment dictates the wiring system — get it wrong and the install fails the spec, fails the regs, or fails on the day a nail goes through the wall."
            tone="emerald"
          />

          <TLDR
            points={[
              'Wiring system = cable + install method, considered together. Section 521 of BS 7671 governs the choice.',
              'Six default systems on UK jobs: T&E concealed, singles in conduit/trunking, SWA outdoor/buried, MICC fire, flex final-connection, LSZH escape routes.',
              'Data and comms cabling has its own rules — Band I separation from mains under BS 7671 528.1 and BS EN 50174.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the default wiring system for concealed domestic installs (T&E with prescribed zone / RCD per 522.6.202).',
              'Identify the default for surface commercial installs (singles in conduit or trunking per 521.10.1).',
              'Identify SWA as the standard for outdoor, buried and mechanically-exposed runs.',
              'Identify MICC and FP200 fire-rated cables and their applications.',
              'Identify flex as a final-connection system and the 3.0 m practical limit.',
              'Identify LSZH cable for escape routes, public buildings and life-critical environments.',
              'Identify segregation rules for data/comms cabling running with mains.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What "wiring system" actually means</ContentEyebrow>

          <ConceptBlock
            title="Cable plus install method, treated as one decision"
            plainEnglish="When BS 7671 talks about a wiring system it means everything together — the cable type, the way it’s supported, the enclosure (if any), and the environment it runs through. You don’t pick a cable in isolation."
            onSite="On site that’s why you spec out a job with phrases like ‘6491X singles in 25 mm galvanised steel conduit, surface-clipped’ — that whole phrase IS the wiring system, not just the conductor."
          >
            <p>The selection has to satisfy:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 521</strong> — types of wiring system permitted for given conditions.
              </li>
              <li>
                <strong>Section 522</strong> — external influences (mechanical, water, chemical, fire, vibration, EMI).
              </li>
              <li>
                <strong>Section 523 / Appendix 4</strong> — current-carrying capacity in the chosen install method (Sub3).
              </li>
              <li>
                <strong>Section 528</strong> — segregation rules where Band I and Band II circuits share enclosures.
              </li>
            </ul>
            <p>
              The six systems below cover roughly 95% of what an apprentice will ever be asked to
              install. Specials (PVC-armoured, EMI-screened, mineral-insulated for hazardous areas)
              come up in Level 3 and beyond.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>1 — T&E (PVC twin-and-earth, 6242Y)</ContentEyebrow>

          <ConceptBlock
            title="The domestic concealed default"
            plainEnglish="Two insulated cores plus a bare CPC, all wrapped in a PVC sheath. Cheap, fast to clip, neutral grey/white sheath. The cable that does the lion’s share of UK domestic installation work."
            onSite="Concealed in plaster chases, run loose under floors and through joists, clipped along loft trusses. Always with mechanical protection or RCD additional protection per 522.6.202 when concealed in a wall."
          >
            <p>
              Strengths — cheapest of the lot, fastest to install, terminates with a stripper and a
              torque driver. Weaknesses — no inherent mechanical protection, PVC sheath fails at
              moderate temperatures, ugly when surface-mounted, not for outdoor / buried use.
            </p>
            <p>Typical applications:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Domestic ring finals and lighting circuits chased into walls or run in lofts.</li>
              <li>First-fix for new builds — the structural shell is wired in T&E before the plaster goes on.</li>
              <li>Concealed under floors with appropriate joist-drilling depths.</li>
            </ul>
          </ConceptBlock>

          <CableCrossSection type="twin-and-earth" caption="6242Y twin and earth — two insulated 70°C PVC cores plus a bare CPC, all wrapped in an outer PVC sheath. The ‘standard’ domestic concealed cable." />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.6.202 (Cables in walls / partitions)"
            clause="A cable installed in a wall or partition shall comply with the requirements set out in Table 52.1: depth of cable from the surface (≤50 mm or ≥50 mm), wall construction (with or without metallic parts), prescribed zone or 30 mA RCD additional protection per 415.1.1, or compliance with Regulation 522.6.204 (additional mechanical protection). A prescribed zone is a zone within 150 mm from the top of the wall or partition or within 150 mm of an angle formed by two adjoining walls."
            meaning={
              <>
                The headline rule for chased domestic T&E: cable shallower than 50 mm in a non-metallic
                wall must EITHER sit in a prescribed zone (within 150 mm of corner / ceiling / accessory)
                AND have 30 mA RCD, OR have mechanical protection per 522.6.204 (typically earthed
                metal capping). The dual condition is what protects against the inevitable nail or
                screw going in later.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.6.202 / Table 52.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>2 — Singles in conduit or trunking</ContentEyebrow>

          <ConceptBlock
            title="The commercial surface-mount default"
            plainEnglish="Single-core insulated cables (6491X) drawn into steel or PVC conduit, or laid into metal trunking. The cable’s easy to swap, the containment looks tidy and gives mechanical protection."
            onSite="Plant rooms, school corridors, factories, commercial fit-outs. Steel conduit with brass bushes and lock-rings, or galvanised trunking with bonding clips. Singles get drawn in with rod-and-draw (Sub5) — never run loose."
          >
            <p>Why singles in containment dominates commercial:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Modifiable</strong> — pull out one circuit, draw in another. Containment
                stays put, cabling adapts to changing tenant needs.
              </li>
              <li>
                <strong>Mechanical protection</strong> — conduit and trunking shrug off knocks
                that would slice T&E.
              </li>
              <li>
                <strong>Future capacity</strong> — leaving spare conduit space lets the next install
                team add circuits without touching the building fabric.
              </li>
            </ul>
            <p>
              <strong>Constraint</strong>: non-sheathed singles MUST be in containment per Reg
              521.10.1 — never permitted to run loose.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 521.10.1"
            clause="Non-sheathed cables for fixed wiring shall be enclosed in conduit, ducting or trunking. This requirement does not apply to a protective conductor complying with Section 543. Non-sheathed cables are permitted if the cable trunking system provides at least the degree of protection IPXXD or IP4X, and if the cover can only be removed by means of a tool or a deliberate action."
            meaning={
              <>
                Singles like 6491X have one layer of insulation only. They must be enclosed —
                conduit, ducting or proper trunking — to keep that single layer effective against
                accidental contact. The IPXXD / IP4X requirement on trunking with removable covers
                stops a finger reaching the conductor when the lid’s off.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 521.10.1."
          />

          <SectionRule />

          <ContentEyebrow>3 — SWA (steel-wire armoured)</ContentEyebrow>

          <ConceptBlock
            title="Outdoor, buried, mechanical-risk default"
            plainEnglish="A multicore cable wrapped in spiral steel-wire armour, then an outer PVC sheath. The armour gives mechanical protection AND can act as the CPC when properly glanded."
            onSite="Sub-mains feeding garages, sheds, garden offices, EV chargers, agricultural buildings. Also used in plant rooms and on cable tray where physical protection matters."
          >
            <p>Key install practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Glanding</strong>: CW (with sealing washer for IP-rated entry) or BW (basic).
                The gland clamps the armour to the metal enclosure — that’s how the armour becomes
                the CPC.
              </li>
              <li>
                <strong>Burial depth</strong>: minimum 600 mm in soft ground (HSE / NJUG guidance),
                with a marker tape 150 mm above. Deeper under driveways.
              </li>
              <li>
                <strong>Bend radius</strong>: 8× the cable overall diameter — SWA doesn’t like
                tight bends, the armour springs back and stresses the gland.
              </li>
              <li>
                <strong>Termination</strong>: armour cut, dressed back over the cone of the gland,
                clamped with the locknut. Test the R2 of the armour with a low-ohms tester before
                commissioning — that’s the proof it’s working as a CPC.
              </li>
            </ul>
          </ConceptBlock>

          <CableCrossSection type="SWA" caption="Steel-wire armoured cable — multicore conductors plus a spiral steel-wire armour layer plus an outer PVC sheath. The armour does double duty as mechanical protection and CPC." />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>4 — MICC (Pyro) and FP-rated cable</ContentEyebrow>

          <ConceptBlock
            title="Fire-rated wiring — circuit integrity through a fire"
            plainEnglish="MICC (Pyro) is solid copper conductors inside a magnesium-oxide mineral insulation, all wrapped in a copper sheath. FP200/400 is a softer alternative — silicone-rubber-insulated cores in a fire-resistant polymeric sheath."
            onSite="Used wherever the supply MUST stay live during a fire — sprinkler pumps, smoke vent fans, fire-alarm sounders, emergency-lighting heads in escape routes."
          >
            <p>Comparison:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MICC (Pyro)</strong> — rated to BS 6387 CWZ (the toughest fire test:
                950°C + water + impact). Slow to install (every termination needs a pot, a seal,
                a gland — 30+ minutes per end). Used on the highest-spec life-safety jobs and in
                process plants.
              </li>
              <li>
                <strong>FP200 / FP400</strong> — fast to install (terminates like normal cable,
                no pot/seal). Fire rated to BS 6387 C/W/Z but typically not at the same impact
                spec as Pyro. Standard for most modern fire-alarm install — sounders, detectors,
                interfaces.
              </li>
            </ul>
            <p>
              <strong>What they protect against:</strong> the cable keeps carrying current with
              the building burning around it. Inside three minutes of a flashover, regular T&E
              has melted insulation and the circuit’s open. A Pyro circuit can still feed the
              sprinkler pump 90 minutes in.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>5 — Flexible cord (flex)</ContentEyebrow>

          <ConceptBlock
            title="Final connections only — never as fixed wiring"
            plainEnglish="Multi-strand flexible cores in a soft PVC or rubber sheath. Designed to flex repeatedly without cracking. NOT for fixed wiring."
            onSite="Connecting a kitchen extractor to its FCU, an under-cabinet light to its switched outlet, a fixed appliance to a 13 A switched FCU. Always supported, always protected from mechanical damage where it could be pulled."
          >
            <p>Common flex types:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3183Y</strong> (3-core PVC flex) — standard kitchen-appliance and pendant
                connection.
              </li>
              <li>
                <strong>HO5RR-F</strong> (rubber flex) — heat-resistant, used on hot equipment
                like irons, cookers and certain industrial gear.
              </li>
              <li>
                <strong>HO7RN-F</strong> (heavy rubber) — outdoor / portable equipment, tougher
                jacket.
              </li>
            </ul>
            <p>
              <strong>Practical 3.0 m limit</strong>: per OSG and 553.1.7, flex final connections
              should generally be no longer than 3.0 m, supported, and protected from mechanical
              damage. Longer than that and you’re into fixed-wiring territory — use T&E or singles.
            </p>
          </ConceptBlock>

          <CableCrossSection type="flex" caption="3-core flexible cord — fine multi-strand cores in a soft sheath. Designed to flex repeatedly. Final connections to fixed equipment only — never as fixed wiring." />

          <SectionRule />

          <ContentEyebrow>6 — LSZH (Low Smoke Zero Halogen)</ContentEyebrow>

          <ConceptBlock
            title="Cable that doesn’t poison the people escaping the building"
            plainEnglish="Same conductor as standard cable, but the insulation and sheath are made from compounds that don’t release halogen gases (HCl, HBr) when they burn. Critical on any escape route or public building."
            onSite="Schools, hospitals, public buildings, underground stations, cinemas — almost always specified as LSZH throughout. The spec usually demands it; if it doesn’t and you used standard PVC, you’ll fail the spec audit even if BS 7671 is satisfied."
          >
            <p>What standard PVC does in a fire:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Releases hydrogen chloride gas (HCl) — corrosive, blinding when mixed with eye
                moisture, lethal in confined spaces.
              </li>
              <li>
                Produces dense black smoke that drops visibility to nothing within seconds —
                people trying to escape can’t see exits.
              </li>
              <li>
                Long-term: the HCl attacks structural steel, electronic equipment and even
                concrete reinforcement long after the fire’s out.
              </li>
            </ul>
            <p>
              LSZH avoids all three. More expensive per metre but mandatory in any environment
              where lots of people might need to escape together — and increasingly the default
              spec on commercial work full stop.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>7 — Data and comms cabling (Cat 5e / 6 / 6a)</ContentEyebrow>

          <ConceptBlock
            title="Band I cable that has to live alongside Band II mains"
            plainEnglish="Cat 5e / 6 / 6a is structured cabling for ethernet, telephone and CCTV. It’s extra-low voltage (Band I), it’s noise-sensitive, and it can’t share an enclosure with mains unless properly segregated."
            onSite="Run in its own basket / trunking, or in segregated multi-compartment trunking with mains. Crosses mains at right angles where unavoidable. Terminated at patch panels, RJ45 sockets and POE injectors."
          >
            <p>The two big constraints when running data with mains:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 528.1 (segregation)</strong> — Band I (data, ELV) and Band II (mains)
                must not share an enclosure unless physically separated by an earthed metal partition.
              </li>
              <li>
                <strong>BS EN 50174-2 (data install practice)</strong> — gives recommended minimum
                separation distances depending on cable types and screening (typically 50 to 200 mm
                for unscreened parallel runs, 0 mm where crossing at right angles).
              </li>
            </ul>
            <p>
              If your data run has to share trunking with mains, the compliant answer is multi-compartment
              trunking with the metal divider earthed at intervals — not just separated clips on the
              same cable basket.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 528 (Proximity to other services) — paraphrased"
            clause="Circuits of different voltage bands shall not be contained within the same wiring system unless every cable is insulated for the highest voltage present, OR the cables of each band are separated by an earthed metallic screen, OR each band is contained in a separate compartment of the wiring system."
            meaning={
              <>
                Translation: data (Band I) and mains (Band II) need separation. Three compliant
                options — universal insulation rating to mains voltage, an earthed metal screen
                between, or wholly separate compartments. The data-cabling standard BS EN 50174-2
                then gives the practical install distances. Paraphrased — verify exact wording in
                BS 7671 528.1 / 528.2.
              </>
            }
            cite="Source: paraphrased from BS 7671:2018+A4:2026 — Section 528."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Where it bites you on site</ContentEyebrow>

          <CommonMistake
            title="Running T&E direct in soil to a garden shed"
            whatHappens={
              <>
                "It’s only 8 m to the shed, the cable’s armoured-looking enough, I’ll bury it 100
                mm down and it’ll be fine." Three problems. One — T&E’s PVC sheath is not rated
                for direct burial; soil moisture and acidity attacks the sheath inside two years.
                Two — the shovel that goes in next time the gardener digs a bed cuts straight
                through with no warning (no armour, no marker tape, no protective conduit).
                Three — there’s no proper CPC for the equipment in the shed if the T&E gets
                damaged. First periodic codes it C2 minimum, possibly C1 if the cable’s exposed.
              </>
            }
            doInstead={
              <>
                SWA every time. 6 mm² 3-core SWA at 600 mm depth, marker tape 150 mm above,
                glanded into the consumer unit at the house end and into a metal enclosure at the
                shed end. Test the R2 of the armour. If you don’t want to dig that deep,
                alternative is T&E inside a buried plastic conduit — but SWA is faster, more
                robust and easier to certify.
              </>
            }
          />

          <Scenario
            title="Schools refurb spec mandates LSZH — the cable order arrived as standard PVC"
            situation={
              <>
                You’re second-fix on a primary-school classroom refurb. The spec called for LSZH
                singles throughout in galvanised trunking. The order arrived as standard 6491X
                PVC singles. The clerk-of-works hasn’t inspected yet. Your supervisor says ‘crack
                on, no-one will know’.
              </>
            }
            whatToDo={
              <>
                Don’t. Two problems. (1) The spec is part of the contract — installing standard
                PVC instead of LSZH is a defect that will cost the firm a re-pull when caught.
                (2) The whole point of LSZH on an escape route is that nobody dies of HCl
                inhalation in a fire. Wrong cable means wrong fire performance. Stop, get the
                LSZH delivered, swap the order out, log the discrepancy with the supplier. A
                day’s delay is cheaper than a re-pull and infinitely cheaper than the spec
                breach.
              </>
            }
            whyItMatters={
              <>
                Wiring system selection isn’t just BS 7671 — it’s also the spec, and on schools
                / hospitals / public buildings the spec is usually tighter than the regs. ‘Cable
                that meets the regs’ is not the same as ‘cable the client paid for’ — and on a
                refurb you’re obliged to deliver the latter.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A wiring system = cable + install method + enclosure, decided as one. Section 521 of BS 7671 is the governing chapter.',
              'T&E (6242Y) is the domestic concealed default — fast and cheap, with mechanical protection or RCD per 522.6.202 in walls.',
              'Singles in conduit / trunking is the commercial surface default — non-sheathed cable MUST be in containment per 521.10.1.',
              'SWA is the outdoor / buried / mechanical-risk default — armour gives both protection and CPC when properly glanded.',
              'MICC (Pyro) and FP-rated cables are the fire-rated specials — used where supply must survive a fire.',
              'Flex is a final-connection system only — typically 3.0 m max per OSG / 553.1.7.',
              'LSZH is mandatory wherever toxic-smoke escape conditions matter — schools, hospitals, public buildings.',
              'Data / comms (Band I) needs segregation from mains (Band II) per 528.1 + BS EN 50174-2.',
            ]}
          />

          <Quiz title="Wiring systems for environments — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Final circuit types
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Minimum current carrying capacity
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
