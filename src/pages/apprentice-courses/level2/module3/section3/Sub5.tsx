/**
 * Module 3 · Section 3 · Sub 5 — Specialised wiring-system equipment
 * City & Guilds 2365-02 → Unit 203 → LO3 → AC 3.5
 *   AC 3.5 — "Identify purpose of specialised equipment for installing wiring
 *             systems"
 *
 * The kit you’ll never have used at home — rod-and-draw, fish tape, cable
 * rollers, hydraulic crimps, conduit benders, lubrication, trunking jigs.
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

const TITLE =
  'Specialised wiring-system equipment | Level 2 Module 3.3.5 (AC 3.5) | Elec-Mate';
const DESCRIPTION =
  'Rod-and-draw, fish tape, cable rollers, hydraulic crimps, conduit benders, cable lubrication and trunking jigs — the specialist kit that makes commercial wiring possible.';

const checks = [
  {
    id: 'crimp-tool-check',
    question:
      'You’re terminating a 70 mm² SWA tail onto a copper crimp lug. The right tool is:',
    options: [
      'Daylight control should only operate when occupancy is detected',
      'Total loss from transmitter to receiver including all components',
      'Hydraulic crimp tool with the matching die for 70 mm²',
      'Protect themselves and deliver what\\\\\\\'s agreed',
    ],
    correctIndex: 2,
    explanation:
      'Anything above 25 mm² generally needs a hydraulic crimper with the correct die for the conductor CSA. Hand crimps don’t deliver the pressure or repeatability needed for the joint to be electrically and mechanically reliable. Reg 526.1 requires durable continuity — under-crimped joints cook.',
  },
  {
    id: 'rod-and-draw-check',
    question:
      'Rod-and-draw kit is used for:',
    options: [
      'Areas of higher thermal conductivity creating heat flow paths',
      'Labels, handover notes, and record books/logs',
      'Drawing cable through long runs of conduit or trunking',
      'Approved Authorised Treatment Facility',
    ],
    correctIndex: 2,
    explanation:
      'Rod-and-draw is a set of stiff fibreglass rods that screw together end-to-end. You push the leading rod through the conduit/trunking until it reaches the next access, attach a cable to the rear rod, and pull the cable through. Bread-and-butter for any commercial install.',
  },
  {
    id: 'conduit-bender-check',
    question:
      'A clean 90° bend in 25 mm steel conduit is best made using:',
    options: [
      'By scheduling operation based on occupancy and weather conditions',
      'A hand-operated conduit bender (Hickey or stand bender) sized for 25 mm conduit',
      'At standstill, there is no back-EMF to oppose supply, so only winding resistance limits current',
      'Enabling enterprise-level monitoring whilst maintaining detailed luminaire control',
    ],
    correctIndex: 1,
    explanation:
      'A proper conduit bender — Hickey for small sizes, stand bender for 25 mm and up — gives a smooth bend without kinks. Kinks reduce the internal cross-section and make cable pulling impossible. Hot bending is for plastic, never galvanised steel.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A "draw rope" or "draw line" left in a conduit during first fix is for:',
    options: [
      'Without delay — by the quickest practicable means',
      'Pulling cables through later when the second fix begins',
      'A large university campus with 850 luminaires across multiple buildings',
      'Every 250-500 hours or annually, whichever comes first',
    ],
    correctAnswer: 1,
    explanation:
      'Standard practice on commercial first fix — leave a nylon draw rope in every empty conduit run. Second-fix team attaches their cable to the rope and pulls through without needing rod-and-draw. Saves hours and avoids damaging the conduit by re-rodding.',
  },
  {
    id: 2,
    question:
      'Cable rollers (mounted at intervals along a long route) are used to:',
    options: [
      'Making changes to the learning or assessment process to remove barriers, without lowering the competence standard',
      'No — training must include assessment of competence to ensure workers can actually apply the techniques in their real workplace tasks',
      'Reduce friction so the cable can be pulled without scuffing the sheath or exceeding the maximum permitted pulling tension',
      'Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding',
    ],
    correctAnswer: 2,
    explanation:
      'Big SWA or singles pulled over a tray edge can scuff their sheath. Rollers spread the cable’s weight over a freely-rotating surface so the cable slides smoothly. Manufacturers spec a maximum pulling tension — exceed it and the conductor strands stretch / break inside the insulation.',
  },
  {
    id: 3,
    question:
      'Cable lubrication (specialist water-based gel) is applied:',
    options: [
      'Pass — within 300ms maximum for general-purpose 30mA RCD per BS EN 61008/61009 (and Reg 643.7.3 verification)',
      'Do a brief review of key topics, prepare materials for the morning, then get a full night\\\\\\\\\\\\\\\'s sleep',
      'Specified injuries, over-7-day absences, occupational diseases and dangerous occurrences to the HSE',
      'To the outside of the cable to reduce friction during pulling through conduit or duct, especially on long bends',
    ],
    correctAnswer: 3,
    explanation:
      'Cable lubricant — typically a water-based gel — coats the cable jacket to reduce sliding friction by 30 to 70%. Essential on long conduit pulls, multiple bend pulls and underground duct pulls. Doesn’t damage PVC or XLPE jackets.',
  },
  {
    id: 4,
    question:
      'A trunking "fish tape" (steel coiled tape) is preferred over rod-and-draw for:',
    options: [
      'Stiff cable through wall cavities, voids and short trunking sections where rods don’t fit',
      'Avoid the need for hazardous manual handling operations so far as is reasonably practicable',
      'A reference dwelling with the same shape but meeting minimum standards, used for comparison',
      'When there are significant changes, after incidents, or if it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no longer valid',
    ],
    correctAnswer: 0,
    explanation:
      'Fish tape is a coiled spring-steel tape — it pushes through tight voids and around small obstructions where stiff rods can’t go. Used for short runs, wall cavities and panel-to-panel chases inside switchgear cabinets. Rod-and-draw wins for long straight conduit; fish tape wins for tight irregular spaces.',
  },
  {
    id: 5,
    question:
      'Hydraulic crimping tools are typically used for cable CSAs:',
    options: [
      'MCS-specific qualifications and general electrical competence',
      'Above 25 mm² — anything where hand crimps cannot deliver the required compression',
      'Locations with specific risks requiring additional protection measures',
      'Consistency in capturing everything and reviewing regularly',
    ],
    correctAnswer: 1,
    explanation:
      'Above 25 mm² (and especially at 35, 50, 70, 95, 120, 150 mm²) hand crimps physically can’t generate the pressure needed for a reliable joint. Hydraulic crimpers (hand-pumped, battery or mains powered) with matched dies deliver consistent crimps at hundreds of psi.',
  },
  {
    id: 6,
    question:
      'The "manufacturer’s instructions" for a crimp lug typically specify:',
    options: [
      'The Network and Information Systems Regulations 2018 requiring operators of essential services to manage cybersecurity risks to their OT systems and report significant incidents',
      'To collect a physical sample of material for laboratory identification of asbestos type and content',
      'The die index, the crimp position and the number of crimps per joint — and these must be followed for the joint to be compliant with 526.1',
      'It’s a general-purpose silicon rectifier diode rated 1000 V reverse, 1 A forward — common in mains-side circuits.',
    ],
    correctAnswer: 2,
    explanation:
      'Lug manufacturers spec the die (matched to the lug barrel size), where the crimp goes (one or multiple positions along the barrel), and how many crimps. Reg 526.1 requires the joint to provide durable electrical continuity — and the only way to evidence that is to follow the MIs exactly.',
  },
  {
    id: 7,
    question:
      'A "saddle" or "pipe vice" set up on a tripod is used by an electrician to:',
    options: [
      'Duration of the installation plus reasonable period',
      'Section 443 (with installation rules in 534)',
      'At the start of work and when conditions change',
      'Hold conduit firmly while threading or bending',
    ],
    correctAnswer: 3,
    explanation:
      'A pipe vice on a tripod holds steel conduit steady while you cut, ream, thread or bend it. Essential for any decent volume of metal conduit work — trying to do the same job in a workshop vice is slow and inaccurate.',
  },
  {
    id: 8,
    question:
      'A "trunking notcher" or trunking jig speeds up:',
    options: [
      'Cutting consistent corner notches in trunking so right-angle and tee joints fit cleanly',
      'Poor connections, oxidation, incorrect termination, or mechanical damage',
      'Risk assessment names the hazards and controls; method statement says how the work will be done in safe order',
      'Cross-sectional area, insulation type, installation method, ambient temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Trunking corners need cut-outs in the side and lid for the bend to close cleanly. A notching jig stamps the right shape every time — much faster and tidier than hand-cutting with a hacksaw. Standard kit on any decent commercial install.',
  },
];

const faqs = [
  {
    question: "Do I need to own all this kit as an apprentice?",
    answer:
      "No — most of it lives on the firm’s van or in the materials lock-up. As an apprentice you’ll learn how to use each piece by being asked to do the pull, the bend or the crimp. By the time you’re finishing your apprenticeship, you should have used rod-and-draw, fish tape, hydraulic crimps and a hand bender confidently. Owning your own version comes later (and is a tax-deductible cost when you’re paid).",
  },
  {
    question: "Why does cable lubrication actually matter — can’t I just pull harder?",
    answer:
      "Two reasons. (1) Cable manufacturers spec a maximum pulling tension (in newtons, often per mm² of CSA). Exceed it and the conductor strands stretch and weaken inside the unbroken insulation — fault waiting to happen. (2) On a long pull with multiple bends, friction rises exponentially with the angle of each bend. Lubricant cuts the rise sharply. A pull that needs 800 N dry might need only 250 N lubricated — keeps you well inside the spec and saves a lot of straining.",
  },
  {
    question: "What’s the difference between a Hickey and a stand bender?",
    answer:
      "Hickey is a small hand bender — a steel head on a tube handle, used for 16 mm and 20 mm steel conduit. Stand bender (or ‘former’) is a larger floor-standing bender for 25 mm, 32 mm and bigger conduit — uses much more leverage. Both produce a smooth radius bend without kinks. The bigger the conduit, the more leverage you need; trying to bend 32 mm with a Hickey just bruises the steel.",
  },
  {
    question: "When does a hand crimp stop being good enough?",
    answer:
      "Roughly at 25 mm² CSA, though it depends on the lug and the standard you’re working to. The die-pressure needed to deform the lug barrel onto the conductor and create a gas-tight joint rises with CSA. Above ~25 mm² no human can squeeze hand crimps hard enough to do it consistently. From there it’s hydraulic — hand-pump for occasional use, battery-powered for full-time installation work.",
  },
  {
    question: "What’s the right way to terminate SWA armour?",
    answer:
      "Step by step. (1) Strip the outer PVC sheath back the right length for the gland. (2) Spread the steel armour wires evenly into a cone. (3) Trim the inner sheath. (4) Slide the gland body up to the cone. (5) Tighten the locknut so the cone clamps the armour to the gland body. (6) Add the entry-side sealing ring and tighten into the enclosure. (7) Test R2 of the armour end-to-end with a low-ohms meter — that’s the proof it’s working as a CPC. Practice on offcuts before doing it for real — a poorly made gland is a fault waiting to happen.",
  },
  {
    question: "How do I avoid damaging the cable on a long underground duct pull?",
    answer:
      "Six things. (1) Survey the route first — note bend count, total length, duct internal diameter. (2) Calculate or estimate pulling tension; check against the cable’s spec. (3) Use approved duct lubricant (water-based gel, not WD-40 or grease). (4) Set up rollers at every entry / exit pit. (5) Use a winch with a tension gauge for runs over ~30 m or with multiple bends. (6) Pull at a steady moderate pace — no jerking, no sudden tension spikes. Done right, even 100 m of 4-core SWA pulls clean.",
  },
];

export default function Sub5() {
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
            eyebrow="Module 3 · Section 3 · Subsection 5"
            title="Specialised wiring-system equipment"
            description="Six pieces of kit you’ll never have used at home but live on every commercial van. Get good with them and you’re a useful electrician; skip them and you’re bodging."
            tone="emerald"
          />

          <TLDR
            points={[
              'Rod-and-draw, fish tape, cable rollers, hydraulic crimps, conduit benders, lubrication, trunking jigs — the kit that makes commercial install possible.',
              'Each piece exists to solve a problem hand-tools alone can’t: pulling cable through long conduit, crimping big lugs, bending steel without kinks.',
              'Reg 526.1 (durable continuity) and the cable manufacturer’s pulling-tension spec are the regulatory hooks for using this kit properly.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify rod-and-draw kit and its use in pulling cable through conduit and trunking.',
              'Identify fish tape and the situations where it beats rod-and-draw.',
              'Identify cable rollers and explain their role in protecting cable jackets and limiting pulling tension.',
              'Identify hydraulic crimping tools and the CSA range that requires them.',
              'Identify hand and stand conduit benders and the importance of clean kink-free bends.',
              'Identify cable lubrication and trunking jigs and the time / quality benefit they deliver.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why specialist kit exists</ContentEyebrow>

          <ConceptBlock
            title="Hand tools alone won’t do commercial wiring"
            plainEnglish="Domestic install is mostly clipping, drilling and screwdriver work. Commercial install is pulling singles through 30 m of trunking, crimping 95 mm² lugs onto sub-mains and bending steel conduit around three-dimensional plant rooms. Different jobs need different tools."
            onSite="The first time you’re handed a rod-and-draw kit on site and told to pull six 16 mm² singles 25 m through galvanised steel trunking, you’ll understand exactly why this kit exists. Hand-pulling that lot is impossible. Rod-and-draw makes it 20 minutes."
          >
            <p>The seven categories below cover almost every specialist tool you’ll meet on
              install work. Each one is the answer to a problem hand-tools simply can’t solve at
              practical commercial scale.</p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>1 — Rod-and-draw</ContentEyebrow>

          <ConceptBlock
            title="Stiff fibreglass rods that screw together end-to-end — for pulling cable through long containment"
            plainEnglish="Each rod is about 1 m long with screw threads at each end. You join enough rods together to reach from one access to the next, push them through the conduit/trunking, attach the cable to the back end, then pull the cable through as you withdraw the rods."
            onSite="The default kit for any commercial single-cable pull through conduit or steel trunking. Standard kit colour is fluorescent yellow or orange so you spot it in the gloom of a plant room. Heads come in different shapes — flexible, rigid, leader, with eye for tying cable on."
          >
            <p>Practical tips:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Always lubricate the cable jacket if the run’s over ~10 m or has bends.</li>
              <li>Pull steadily, never jerk — jerk and the rod-to-rod thread can let go.</li>
              <li>Leave a draw rope in the conduit when you’re done with the first cable — saves rodding for the next pull.</li>
              <li>Always wear gloves; the rods can splinter if they’ve been overworked.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>2 — Fish tape (steel coiled tape)</ContentEyebrow>

          <ConceptBlock
            title="Spring steel tape on a reel — for tight cavities and short runs where rods can’t fit"
            plainEnglish="A spring-steel tape that pushes through tight voids and around small obstructions. Less stiffness than rod-and-draw, more flexibility — gets through where rods can’t go."
            onSite="Used for stuffing cable through wall cavities, between back-boxes through plasterboard, panel-to-panel inside a switchgear cabinet, and any short irregular space."
          >
            <p>When fish tape beats rod-and-draw:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wall cavity from one back-box to another (no straight conduit).</li>
              <li>Inside a panel where you need to get cable from a top entry to a side terminal.</li>
              <li>Through suspended-ceiling void where the route bends around obstacles.</li>
            </ul>
            <p>
              When rod-and-draw beats fish tape: any straight conduit run over ~5 m, anything with
              consistent internal diameter, anything where you’ll be pulling multiple cables. The
              two tools are complementary, not competing.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>3 — Cable rollers and pulling tension limits</ContentEyebrow>

          <ConceptBlock
            title="Free-rotating wheels along the cable route — protect the jacket and limit pulling effort"
            plainEnglish="A roller is a wheel mounted on a stand. Position rollers at every entry/exit point and at intervals along long pulls. Cable slides over rollers, not over sharp edges of trays or duct entries."
            onSite="On any pull of 25 m+ or any pull with significant bends, get rollers set up before you start. Cable jacket damage from a sharp tray edge is a defect that can fail tests months later."
          >
            <p>Why rollers matter:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Protects the cable jacket</strong> — a sharp tray edge will cut PVC at
                30 N pull. A roller spreads the load.
              </li>
              <li>
                <strong>Reduces pulling tension</strong> — every bend in the route doubles the
                pulling tension at the leading end (capstan effect). Rollers cut friction.
              </li>
              <li>
                <strong>Stays inside manufacturer’s tension spec</strong> — exceed it and the
                copper conductors stretch inside the jacket, weakening the cable invisibly.
              </li>
            </ul>
            <p>
              For really long pulls (50 m+), use a winch with a tension gauge or a sock that grips
              the cable jacket evenly. Don’t pull on the conductors themselves.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>4 — Hydraulic crimping tools</ContentEyebrow>

          <ConceptBlock
            title="Hand or battery-powered hydraulic press — for cable lugs above 25 mm²"
            plainEnglish="A small hydraulic press with interchangeable dies. You select the die for the conductor CSA, fit the lug, place it in the die, pump the handle (or trigger the battery motor), and the press deforms the lug barrel onto the conductor at hundreds of psi."
            onSite="Anything above 25 mm² — sub-mains terminations, switchgear tails, generator connections, big SWA cores onto crimp lugs. Hand crimps can’t deliver the pressure for a gas-tight joint at those sizes."
          >
            <p>The crimp does three jobs at once:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mechanical: holds the lug to the conductor against pull-out forces.</li>
              <li>Electrical: deforms the strands together into a gas-tight contact, low resistance.</li>
              <li>Sealing: pushes out air, prevents corrosion at the joint.</li>
            </ul>
            <p>
              <strong>Manufacturer instructions</strong> — every lug spec sheet tells you the die
              index (matched to lug barrel), the crimp position(s) on the barrel, and the number
              of crimps. Follow them exactly. Reg 526.1 is the regulatory hook (durable
              continuity, mechanical strength, protection).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service such that the effectiveness of the insulation of the conductors connected to them is not impaired; (f) the provision of adequate locking arrangements in situations subject to vibration or thermal cycling."
            meaning={
              <>
                The reg behind every termination. ‘Durable continuity AND mechanical strength AND
                protection’ — three properties simultaneously. A bad crimp fails on continuity (high
                resistance, hot spot) and possibly on mechanical strength (pulls out under thermal
                cycling). The MIs for the lug, the matched die and the right tool are how you
                evidence compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 526.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>5 — Conduit benders</ContentEyebrow>

          <ConceptBlock
            title="Hand or stand benders for clean kink-free bends in steel conduit"
            plainEnglish="A steel head with a curved channel that wraps the conduit around it. You apply leverage through the handle and the conduit takes a smooth bend with no kinking or distortion of the bore."
            onSite="Hickey for 16 mm and 20 mm conduit (one-handed). Stand bender for 25 mm and up (uses your bodyweight on the handle). Hydraulic conduit benders for the really big stuff (40 mm+) on industrial work."
          >
            <p>Why a clean bend matters:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maintains internal diameter</strong> — kinked conduit has a reduced bore at
                the kink, making cable pulling harder or impossible.
              </li>
              <li>
                <strong>Maintains earth continuity</strong> — galvanised steel conduit is part of
                the CPC. Cracks at a kink can degrade the earth path.
              </li>
              <li>
                <strong>Looks professional</strong> — a clean bend in galvanised steel is the mark
                of an electrician who knows their craft.
              </li>
            </ul>
            <p>
              <strong>Bend radius rule</strong>: minimum bend radius is typically 6× the conduit
              outer diameter — tighter than that and you risk cracking. The bender’s former is
              already shaped to the right radius — use it as designed and you can’t go wrong.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>6 — Cable lubrication</ContentEyebrow>

          <ConceptBlock
            title="Water-based gel that cuts pulling friction by 30 to 70 percent"
            plainEnglish="A bucket of clear or coloured gel that you smear onto the cable jacket as it enters the conduit/duct. Reduces sliding friction, lets you pull the cable with much less force."
            onSite="Almost mandatory on any pull over 30 m, any pull with multiple bends, and any underground duct pull. Standard kit on every commercial van. Brand names — WD Yellow 77 and similar."
          >
            <p>Why it matters:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower friction means lower pulling tension at the leading end of the cable.</li>
              <li>Lower tension means staying inside the cable manufacturer’s pulling-tension spec.</li>
              <li>Lower spec exceedance means no invisible damage to the conductor.</li>
            </ul>
            <p>
              <strong>Use the right gel</strong>: water-based, designed for cable pulling, doesn’t
              attack PVC / XLPE / LSZH jackets. Don’t use grease, petroleum jelly or WD-40 — they
              can degrade the cable jacket over time.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>7 — Trunking jigs and notchers</ContentEyebrow>

          <ConceptBlock
            title="Stamps, jigs and notchers for clean trunking corners and tee joints"
            plainEnglish="Trunking has to bend round corners and meet at tees. The simplest way is to cut the side flap and lid in a specific shape — but cutting freehand with a hacksaw is slow and ugly. A notcher punches the right shape every time."
            onSite="On any volume trunking install, a notcher saves hours. The stamped corners look professional and close cleanly under the lid. Standard kit on commercial installs."
          >
            <p>The kit family:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Notcher / nibbler</strong> — punches a 90° wedge out of the trunking
                wall and lid for an internal bend.
              </li>
              <li>
                <strong>Tee jig</strong> — marks the cut-out for a tee branch off the side of a
                trunking run.
              </li>
              <li>
                <strong>Cropper</strong> — power-operated trunking cutter for clean square ends
                without burrs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it bites you on site</ContentEyebrow>

          <CommonMistake
            title="Hand-crimping a 50 mm² lug because the hydraulic crimper’s back at the depot"
            whatHappens={
              <>
                You’re on a job, the spec is a 50 mm² lug onto a SWA tail. The hydraulic crimper
                is back at the firm’s depot 40 minutes away. Customer is waiting. You think — I’ll
                just give it a really hard squeeze with the hand crimps. Lug looks crimped on,
                feels solid, you tighten the bolt onto the busbar and energise. Six months later
                the lug starts heating because the crimp wasn’t gas-tight; copper oxidises
                between the strands and the lug; resistance climbs; finally arcs at the joint.
                The whole sub-board fries because of one shortcut.
              </>
            }
            doInstead={
              <>
                Stop. If you don’t have the right tool, you’re not finishing the job today. Either
                go back for the crimper, get the apprentice to bring it out, or downsize the
                lug to one your hand crimper can handle (and re-spec the connection). Reg 526.1
                requires durable continuity. A hand-crimped 50 mm² lug doesn’t provide that, full
                stop. The right tool isn’t optional kit — it’s the only way to get a compliant
                joint at that CSA.
              </>
            }
          />

          <Scenario
            title="Long underground duct pull — cable jammed at the third bend"
            situation={
              <>
                You’re pulling 4-core 35 mm² SWA through a 60 m run of underground ducting from
                the main board to a substation transformer. The duct has three 90° bends along
                the route. Half-way through, the cable jams. You add more pulling effort — it
                still won’t move. The lead bagman starts shouting that the crew is getting tired.
              </>
            }
            whatToDo={
              <>
                Stop pulling. Pulling harder will exceed the cable’s manufacturer-spec tension and
                damage it invisibly. Three checks. (1) Is there enough lubricant? Re-feed lube
                gel into the duct from both ends. (2) Are rollers set up at every bend pit? If
                not, position them now to cut the capstan-effect friction at each bend. (3) Is
                the cable kinked at the duct entry? Pull back 1 m, check, re-feed. If you’ve
                done all three and it still won’t pull, you need a winch with a tension gauge to
                get the cable through under controlled load — not crew brute force. And if the
                tension gauge says you’re at the max spec already, the route needs re-engineering
                — extra pit, more lubricant, fewer bends.
              </>
            }
            whyItMatters={
              <>
                A damaged cable jacket today is an insulation-resistance failure tomorrow and a
                fault in two years. Specialist kit exists to keep you inside the cable’s
                published limits. Skip the kit and you skip the spec — and the spec is what the
                MFT will measure on commissioning.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Rod-and-draw is the default for pulling cable through long conduit / trunking. Lubricate, pull steadily, leave a draw rope behind.',
              'Fish tape beats rod-and-draw for short runs in tight, irregular spaces (wall cavities, panel interiors).',
              'Cable rollers protect jackets and reduce pulling tension on long or bend-heavy routes — essential beyond ~25 m.',
              'Hydraulic crimps are required above ~25 mm² CSA. Hand crimps physically can’t deliver the pressure for a compliant joint.',
              'Reg 526.1 (durable continuity, mechanical strength, protection) is the regulatory hook for using the right crimping kit and following the lug MIs.',
              'Conduit benders give clean kink-free bends — Hickey for 16/20 mm, stand bender for 25 mm+, hydraulic for 40 mm+.',
              'Cable lubrication cuts friction by 30 to 70 percent — almost mandatory on any pull over 30 m or with multiple bends.',
              'Trunking notchers and tee jigs make commercial-grade corners possible at speed; saves hours over hand-cutting with a hacksaw.',
            ]}
          />

          <Quiz title="Specialised wiring-system equipment — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Protective device applications
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Spacing factor of enclosures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
