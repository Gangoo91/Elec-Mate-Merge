/**
 * Module 4 · Section 2 · Subsection 3 — Selecting access equipment
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 / AC 2.3
 *   AC 2.3 — "Select access equipment"
 *
 * Frame: WAHR 2005 hierarchy (avoid > prevent fall > minimise consequence).
 * Selection is duration + height + load + competence. Ladders are last
 * resort for short, light, simple tasks.
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
  'Selecting access equipment (2.3) | Level 2 Module 4.2.3 | Elec-Mate';
const DESCRIPTION =
  'WAHR 2005 hierarchy applied to selecting ladders, podiums, towers and MEWPs. Duration, height, load and competence — and why a ladder is the last-resort option, not the default.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod4-s2-sub3-hierarchy',
    question:
      "Under the Work at Height Regulations 2005 Reg 6, what's the order of priority for controlling work-at-height risk?",
    options: [
      'Use a ladder, then if that fails use a tower.',
      "Avoid working at height where reasonably practicable. Where it can't be avoided, use work equipment or other measures to PREVENT a fall. Where the risk of a fall remains, use work equipment or other measures to MINIMISE the distance and consequences of a fall. The hierarchy is in the Reg explicitly — avoid, prevent, minimise.",
      "Whatever is in the back of the van.",
      "Whatever the customer says they have.",
    ],
    correctIndex: 1,
    explanation:
      "WAHR 2005 Reg 6 sets out the three-tier hierarchy. Avoid is the strongest control (do the work from ground level — use long-reach tools, telescopic poles, drop the cable from above instead of running across a ceiling). Prevent is next (a fully boarded scaffold or tower with guardrails — you physically can't fall). Minimise is last (fall arrest harness, soft landing system, MEWP basket — you might fall but the consequence is limited). A ladder is at the BOTTOM of the prevent tier — and only justifiable for short-duration, light-task work where the higher tiers aren't reasonably practicable.",
  },
  {
    id: 'mod4-s2-sub3-ladder-angle',
    question:
      "You're setting up an extension ladder against a wall to access a junction box at 3.5m. What angle should the ladder sit at and what's the rule of thumb for getting it right?",
    options: [
      "Whatever feels stable — there's no fixed angle.",
      "75 degrees from the horizontal — the 1:4 rule. The base sits one unit out from the wall for every four units of vertical height. So for a ladder reaching 4m up the wall, the base sits 1m out. Steeper than 75 degrees and the ladder is liable to topple backwards; shallower and the feet can slip out.",
      '45 degrees — leans gently against the wall.',
      '90 degrees — vertical against the wall.',
    ],
    correctIndex: 1,
    explanation:
      "75 degrees / 1:4 ratio is the established safe angle for a leaning ladder. HSE INDG402 (Safe use of ladders and stepladders) gives this as the standard. Most professional ladders have a tilt-indicator strip on the side stile that aligns when the ladder is at the correct angle. Tying the top off (or footing the base if a second person is available) is required for any ladder being worked from for more than a few minutes. WAHR Schedule 6 sets out the requirements for ladder use.",
  },
  {
    id: 'mod4-s2-sub3-mewp',
    question:
      "You're asked to work from a scissor lift in a warehouse to install lighting at 8m. You've never used one before. What's the right next step?",
    options: [
      'Climb in and have a go — the controls look intuitive.',
      "Stop. MEWP operation requires an IPAF licence (or equivalent recognised training). The Provision and Use of Work Equipment Regulations 1998 Reg 9 requires the operator to be adequately trained, and LOLER 1998 Reg 9 requires the MEWP itself to be subject to thorough examination. Plus you need a harness for boom-type MEWPs (cherry pickers) clipped to the basket anchor, and a familiarisation on the specific machine. Until the training is in place, the work goes to a competent operator.",
      'Get the customer to operate it for you.',
      'Use it for ten minutes only.',
    ],
    correctIndex: 1,
    explanation:
      "MEWP work is a legally specific category. PUWER Reg 9 requires the operator to be adequately trained for the equipment they're using. IPAF (International Powered Access Federation) holds the de facto training standard in the UK — categories 1a (static vertical), 1b (static boom), 3a (mobile vertical / scissor), 3b (mobile boom / cherry picker). LOLER Reg 9 requires the MEWP to have a current thorough examination report (every 6 months for MEWPs lifting people). Without the licence and the inspection, the work simply doesn't proceed.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the legal basis for selecting access equipment for an electrician's task?",
    options: [
      'Whatever is in the van that day.',
      "The Work at Height Regulations 2005 (WAHR) — applies to any work where a person could fall a distance liable to cause personal injury. Reg 6 sets out the three-tier hierarchy (avoid > prevent > minimise). Reg 7 requires selection of the right equipment for the task. Reg 12 requires inspection of the equipment. PUWER 1998 sits underneath for the equipment itself, and LOLER 1998 covers MEWPs and other lifting kit.",
      "BS 7671 Section 132.",
      'A personal preference.',
    ],
    correctAnswer: 1,
    explanation:
      "WAHR 2005 is the parent regulation for working at height. The 2003 fall-from-a-low-height case law (Hawes v Railtrack) is the reason 'liable to cause personal injury' isn't tied to a specific height — even falls from below 2m are caught if they could cause injury. The hierarchy in Reg 6 is the test the courts apply.",
  },
  {
    id: 2,
    question:
      "Why is a ladder at the BOTTOM of the prevent tier in the WAHR hierarchy?",
    options: [
      'Because ladders are the cheapest option.',
      "Because a ladder is a personal access platform that doesn't have a guardrail and depends on the user's three-point contact and footing for stability. It provides minimal collective protection. INDG401 and INDG402 (HSE guidance) limit ladder use to short-duration tasks (typically up to 30 minutes at one location), light work (one-handed work where reasonably practicable, with a free hand for grip) and where a higher control isn't reasonably practicable.",
      'Because ladders are the heaviest option.',
      'Because ladders are illegal.',
    ],
    correctAnswer: 1,
    explanation:
      "Ladders are a permitted access option but they sit at the bottom of the 'prevent' tier because of the limited collective protection. HSE guidance is consistent — short duration, light task, low height, justified choice. A podium step or a tower offers a fully guarded platform; an MEWP offers a guarded basket. The ladder offers neither, which is why it gets the 30-minute / one-location / one-handed-work guidance.",
  },
  {
    id: 3,
    question:
      "You need to install a 4m run of trunking up a stairwell at first-floor landing height. Choose between ladder, podium step, or tower scaffold — which justifies on the WAHR hierarchy?",
    options: [
      'Ladder — quickest to set up.',
      "Podium step or low tower scaffold. The work is two-handed (cutting trunking, fixing brackets, dropping cable in), of moderate duration (more than 30 minutes), and at a height where a fall would cause serious injury. A ladder fails the one-handed-work and short-duration tests. A tower fully boarded with guardrails is the prevent-a-fall control; a podium step gives the same protection over a smaller height range. PASMA training is required for tower assembly.",
      'A ladder propped against the bannister rail.',
      'Stand on the bannister rail.',
    ],
    correctAnswer: 1,
    explanation:
      "Stairwell work is the textbook ladder-isn't-suitable scenario. Stairs are uneven, the work is two-handed, and the duration exceeds the 30-minute guidance. PASMA-trained tower assembly with the correct stair-edge configuration (often a podium with stair adjusters or a specially-rated stair tower) is the right call. The added cost in time and kit is well below the cost of a fall onto stairs.",
  },
  {
    id: 4,
    question:
      "What's PASMA training and when is it legally required?",
    options: [
      'A site-passport scheme — required only on Crossrail.',
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) is the recognised training standard for assembling, dismantling and using mobile tower scaffolds. It's not a statutory licence in the way IPAF is for MEWPs, but PUWER 1998 Reg 9 requires anyone using or assembling work equipment to be adequately trained, and on construction sites the principal contractor's site rules typically require PASMA card-holders for tower assembly.",
      'A safety-equipment supplier.',
      'A type of harness.',
    ],
    correctAnswer: 1,
    explanation:
      "PASMA card holders have been trained on tower assembly per the manufacturer's instruction manual and the WAHR requirements. PUWER Reg 9 is the statutory hook for the training requirement. WAHR Reg 12 then requires the assembled tower to be inspected before use and at intervals. The card on its own isn't legally mandatory but on a notifiable construction site the principal contractor's CDM-driven site rules will almost always require it.",
  },
  {
    id: 5,
    question:
      "Under LOLER 1998 Reg 9, how often must a MEWP be subject to thorough examination?",
    options: [
      'Once at purchase, never again.',
      "Lifting equipment used to lift persons (MEWPs, lift platforms, scaffolding hoists carrying personnel) requires thorough examination at 6-monthly intervals. Other lifting equipment (chain blocks, manual hoists, anchor points used for material lifting only) requires 12-monthly thorough examination, OR in accordance with an examination scheme drawn up by a competent person. Per LOLER 1998 Reg 9(3). The examination is by a competent person (typically an independent examiner) and a written report is provided. The current report must be available with the machine.",
      'Once a year for everything.',
      'Only when the operator complains.',
    ],
    correctAnswer: 1,
    explanation:
      "LOLER 1998 Reg 9(3) sets the thorough examination intervals — 6-monthly for lifting equipment used to lift persons (MEWPs, lift platforms, scaffolding hoists carrying personnel), 12-monthly for other lifting equipment (chain blocks, manual hoists, anchor points used for material lifting only) OR in accordance with an examination scheme drawn up by a competent person. Pre-use inspection by the operator is daily before use. The thorough examination report is a controlled document — no current report, no use of the machine. Hire-supplied MEWPs come with the report; on a long-term hire the examination interval has to be tracked and re-examined when due.",
  },
  {
    id: 6,
    question:
      "What's the daily pre-use inspection for a tower scaffold cover and who has to do it?",
    options: [
      'Nothing — once it\'s built it stays built.',
      "WAHR 2005 Reg 12 requires a tower used for working at height to be inspected before use after assembly, after any event likely to have affected it (high winds, impact, alteration), and at intervals not exceeding 7 days. The pre-use check covers stability (level base, outriggers deployed, brakes on), structural integrity (no missing components, all connectors locked), platform fully boarded with guardrails and toeboards, and a current inspection record (Form 91 / scaff tag). The user does the daily check; a more thorough inspection is by a competent person.",
      'Only after the tower has been struck by a vehicle.',
      'Once a year by a registered inspector.',
    ],
    correctAnswer: 1,
    explanation:
      "WAHR Reg 12 + Schedule 7 set out the inspection regime. The 7-day interval for towers is the headline rule, with the daily / pre-use check by the user on top. The Form 91 / scaff tag system is the standard way of recording the formal inspection — the tag at the access point of the tower shows who inspected, when, and the next due date. No tag, or expired tag, the tower doesn't get used until re-inspected.",
  },
  {
    id: 7,
    question:
      "What does 'three-point contact' mean on a ladder?",
    options: [
      'Three different ladders touching at once.',
      "At all times the user must maintain three points of contact with the ladder — typically two feet and one hand, or two hands and one foot. The remaining hand is free to perform light work or for an extra grip while moving. The rule means: don't carry materials in both hands while climbing, don't lean far enough to break the contact, don't use a ladder for two-handed work like wall chasing.",
      'Three legs on the ladder.',
      'Three rungs visible above the platform.',
    ],
    correctAnswer: 1,
    explanation:
      "Three-point contact is the foundational ladder safety rule — INDG402 and the manufacturer's guidance both reinforce it. The implication is that real two-handed work cannot be done from a ladder safely — and that's why ladders are limited to short, light, one-handed-work tasks where a higher tier of access (podium, tower, MEWP) isn't reasonably practicable.",
  },
  {
    id: 8,
    question:
      "On a notifiable construction site, what does the PC's induction typically cover regarding access equipment?",
    options: [
      'Nothing — access kit isn\'t a site issue.',
      "Site rules on which categories of access equipment are permitted (e.g. ladders only with PC permission), the inspection / Form 91 regime for towers and MEWPs, the storage and overnight security arrangements for kit (so unauthorised use is prevented), the permit-to-work systems for any specialised access work (rope access, suspended platforms), and the chain of authorisation for hire-in equipment. CDM 2015 Reg 13 makes this part of the principal contractor's induction duty.",
      'Lunch arrangements only.',
      'The dress code.',
    ],
    correctAnswer: 1,
    explanation:
      "Access equipment is one of the most regulated areas of construction site work because it accounts for the largest single category of fatalities (falls from height are the leading cause of UK construction fatalities). The PC's induction will typically restrict ladder use, require PASMA cards for tower work, require IPAF for MEWPs, and lay out the inspection and tagging system. Skipping the induction or ignoring the site rules is the fastest way to be sent off site.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Are ladders banned from construction sites?",
    answer:
      "No, but they are heavily restricted. WAHR 2005 doesn't ban ladders — it requires them to be the right choice on the hierarchy (avoid > prevent > minimise). For short-duration (typically up to 30 minutes), light, one-handed-work tasks where a higher tier isn't reasonably practicable, a ladder is still acceptable. On most large construction sites the principal contractor's site rules require explicit permission to use a ladder for anything more than brief access.",
  },
  {
    question: "What's the difference between a podium step and a tower scaffold?",
    answer:
      "A podium step is a small, free-standing aluminium platform (typically 0.5m to 1.5m platform height) with a fully guarded working area and integral steps. It's quick to set up and ideal for tasks where a step ladder would otherwise be used but with much better fall protection. A tower scaffold is a larger structure (multiple lifts, platform heights up to 12m for a typical mobile tower) with a boarded platform, guardrails, toeboards and brake-locking castors. Both eliminate the ladder-stability problem; the choice between them is height range and footprint.",
  },
  {
    question: "Do I need PASMA to use a tower somebody else has built?",
    answer:
      "If you're only using the platform — not assembling, altering or dismantling — you don't strictly need a PASMA card. But you DO need to know the basics: don't move the tower with people on it, don't overload the platform, don't climb on the outside, don't alter the configuration. Most construction sites require PASMA for users as well as assemblers, and the PASMA Tower User course (half-day) covers exactly this.",
  },
  {
    question: "Who's responsible for inspecting a ladder before I use it?",
    answer:
      "You are. PUWER 1998 Reg 6 puts a duty on the employer to maintain work equipment, but the user has a personal duty under HASAWA s.7 to take reasonable care and check the equipment is fit for use before using it. The pre-use ladder check covers — stiles (no cracks, no impact damage), rungs (all present, none bent, non-slip surface intact), feet (not worn, anti-slip pads in place), latches/locks (engage fully on extension ladders), tilt indicator (where fitted, sights correctly at 75 degrees in use). Damaged ladder = take out of service, label, return to van.",
  },
  {
    question: "What's the height limit for a free-standing mobile tower scaffold?",
    answer:
      "PASMA's standard guidance is 12m platform height for outdoor use and 12m for indoor use, subject to the tower manufacturer's specific limits and the working environment. Above that, the tower normally has to be tied to the building or use outriggers/stabilisers. For a stair landing tower the limit is lower (typically 2.5m platform height) because of the inherent instability of building on stairs. The manufacturer's instruction manual is the binding document for any specific tower model.",
  },
  {
    question: "Can I use a ladder I've borrowed from the customer?",
    answer:
      "Risky. PUWER Reg 6 requires work equipment to be maintained — and you have no record of how the customer's ladder has been treated, what damage it's accumulated, or whether it meets the relevant product standard (EN 131 for professional ladders). Most firms require operatives to use only the firm's own ladders that are subject to a known inspection regime. Using a customer's ladder also puts the firm in a difficult position if the ladder fails — the equipment wasn't yours but the work-at-height was your activity.",
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
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 3"
            title="Selecting access equipment"
            description="Working at height is the leading cause of UK construction fatalities. The Work at Height Regulations 2005 set the hierarchy — avoid, prevent, minimise — and force you to justify the kit you pick rather than reach for the ladder by default."
            tone="emerald"
          />

          <TLDR
            points={[
              "WAHR 2005 Reg 6 sets a three-tier hierarchy — avoid working at height where reasonably practicable, then PREVENT a fall (fully guarded platform), then MINIMISE the consequences (harness, soft landing). A ladder sits at the BOTTOM of the prevent tier.",
              "Selection by task duration + height + load + competence. Short, light, one-handed work over 30 minutes? Ladder may be justifiable. Anything more substantial? Podium, tower, MEWP.",
              "Tower scaffold = PASMA training. MEWP = IPAF training plus LOLER 6-monthly thorough examination. Both have a daily pre-use inspection on top of the formal regime.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the three-tier hierarchy in WAHR 2005 Reg 6 — avoid, prevent, minimise — and apply it to a typical electrician's working-at-height task.",
              "Identify the common categories of access equipment used by electricians — ladders (extension, step, combination), podium steps, mobile tower scaffolds, MEWPs (scissor lifts and boom lifts), trestles, hop-ups.",
              "Apply the selection criteria — duration, height, load, competence — to choose justifiable access equipment.",
              "Recognise the training and competence requirements for PASMA (towers) and IPAF (MEWPs).",
              "Carry out a pre-use inspection of ladders, podiums and towers; recognise the LOLER thorough examination interval for MEWPs (6 months for person-lifting).",
              "Apply the 75 degree / 1:4 angle rule for leaning ladders and the three-point contact rule for ladder use.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why the hierarchy matters</ContentEyebrow>

          <ConceptBlock
            title="Falls from height — the leading cause of UK construction fatalities"
            plainEnglish="Year on year, falls from height account for the largest single category of fatalities in UK construction (around a quarter of all fatal injuries). The HSE has prosecuted electricians and their firms more times for falls than for almost any other cause. The Work at Height Regulations 2005 are the response — a hierarchy that forces you to justify the kit you pick rather than reach for the ladder by default."
            onSite="The hierarchy sounds like bureaucracy until you've seen the consequence. A 1.8m fall from a step ladder onto a hard floor — well below the height that an apprentice usually thinks of as 'working at height' — is enough to break a wrist or shatter a hip. The regulation is deliberately written without a height threshold because the consequence depends on what you fall onto."
          >
            <p>
              The hierarchy in plain terms:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Avoid</strong> — can the work be done from ground level? Long-reach
                tools, telescopic poles, drop the cable from above, design out the high-level
                fixings.
              </li>
              <li>
                <strong>Prevent (collective)</strong> — fully boarded platform with guardrails
                and toeboards, working from inside a MEWP basket. The user physically cannot
                fall.
              </li>
              <li>
                <strong>Prevent (personal)</strong> — work-restraint harness preventing the
                user from reaching the fall edge.
              </li>
              <li>
                <strong>Minimise</strong> — fall arrest harness with shock-absorbing lanyard
                clipped to a rated anchor, soft landing systems (airbags, nets) underneath.
                The user might fall but the consequence is limited.
              </li>
            </ol>
            <p>
              A ladder sits at the bottom of the prevent tier — it provides some prevention
              (you&apos;re standing on a stable platform) but no collective protection (no
              guardrail) and depends entirely on three-point contact for safety.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Work at Height Regulations 2005 — Reg 6(2) and 6(3)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 6(2)</strong> — &quot;Every employer shall ensure that work is not
                  carried out at height where it is reasonably practicable to carry out the work
                  safely otherwise than at height.&quot;
                </p>
                <p>
                  <strong>Reg 6(3)</strong> — &quot;Where work is carried out at height, every
                  employer shall take suitable and sufficient measures to prevent, so far as is
                  reasonably practicable, any person falling a distance liable to cause personal
                  injury.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 6(2) is the &apos;avoid&apos; rung — if the work can be done at ground level,
                it must be done at ground level. Reg 6(3) is the &apos;prevent&apos; rung — where
                avoidance isn&apos;t possible, the measures must prevent a fall liable to cause
                injury. Reg 6(4) and 6(5) cover &apos;minimise&apos; — work equipment that
                minimises fall distance and consequences. The duty cascades from top to bottom of
                the hierarchy and you have to justify why the lower control was needed.
              </>
            }
            cite="Source: Work at Height Regulations 2005 (SI 2005/735), Reg 6 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Categories of access equipment</ContentEyebrow>

          <ConceptBlock
            title="Step ladders, extension ladders, combination ladders"
            plainEnglish="Step ladders are A-frame self-supporting ladders for low-level work. Extension ladders are leaning ladders with a sliding section for higher reach. Combination ladders convert between formats. All three are at the bottom of the prevent tier and have the same usage limits — short duration (up to 30 minutes at one location), light tasks, three-point contact at all times, one-handed work where reasonably practicable."
            onSite="The most common ladder mistakes are: wrong angle (steeper or shallower than 75°), feet not on level ground (use stabilisers or shims, not bricks), top not tied or footed (a leaning ladder above 3m needs to be tied at the top or footed at the base), overreaching (belt buckle stays between the stiles), carrying materials up (use a tool belt or hauling line)."
          >
            <p>
              Ladder categories and their use cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step ladder</strong> — short access (up to 2.5m platform height typically),
                two-handed if there&apos;s a platform top with a tool tray and the user keeps a
                free hand on the spreader brace. Locking spreader required before use.
              </li>
              <li>
                <strong>Extension ladder</strong> — leaning against a wall or scaffold for higher
                access (up to 6m typical). 75° / 1:4 angle. Tied or footed for any extended use.
                Top extending at least 1m above the working level for a hand-hold.
              </li>
              <li>
                <strong>Combination ladder</strong> — converts between A-frame and extension.
                Adjustable hinges. Useful for awkward access (over a stairwell, irregular ground).
                The hinge mechanism is a wear point — pre-use check pays particular attention to
                the lock action.
              </li>
            </ul>
            <p>
              All ladders should be EN 131 compliant for professional use. The old EN 131-2:2010
              had been superseded by EN 131-2:2017 which raised the strength and durability
              standards. Ladders manufactured to the older standard can still be used while
              serviceable but new purchases should be to the current standard.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Podium steps and hop-ups — guarded low-level platforms"
            plainEnglish="Podium steps are small free-standing aluminium platforms with integral guardrails and a built-in step access. Working platform heights are typically 0.5m to 1.5m. They eliminate the ladder-stability problem for low-level work — you stand on a fully boarded platform with rails on three or four sides, and you can do two-handed work safely."
            onSite="Podiums are the right tool for kitchen and ceiling-installation work where the height range fits and the work is two-handed. Quick to set up, easy to move, no PASMA card required (though training on the specific make is required under PUWER). Cost is higher than a step ladder but the productivity gain on a typical install repays it within a job or two."
          >
            <p>
              The headline benefits of a podium over a step ladder:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Fully guarded platform — three-point contact rule no longer applies because
                you&apos;re inside a guardrail.
              </li>
              <li>
                Two-handed work permitted — chasing, fixing, drilling all possible.
              </li>
              <li>
                Stable base with locking castors or feet — no overturn risk.
              </li>
              <li>
                Tool tray for materials and tools at platform level.
              </li>
            </ul>
            <p>
              Hop-ups are even simpler — small fixed-height platforms (typically 0.5m or so)
              for very low-level access. Quick to deploy, no guardrail required at the low
              height, ideal for socket-height work where a step ladder would be overkill.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Mobile tower scaffolds — PASMA territory"
            plainEnglish="A mobile tower scaffold is a free-standing structure built up from prefabricated frames, decks and braces, with locking castors at the base. Platform heights of 2m to 12m are typical for an indoor tower. Fully boarded platform with guardrails and toeboards — full collective fall prevention. Assembly, alteration and dismantling require PASMA-trained operatives."
            onSite="Towers are the right answer for sustained work at height where a podium isn't tall enough and a MEWP isn't practical (interior work, narrow spaces, no power for a MEWP). The setup time is longer than a podium (15-30 minutes for a small tower) but you have a stable, guarded platform for the duration of the work. Outriggers / stabilisers are required above certain heights — manufacturer's instruction manual sets the limits."
          >
            <p>
              Tower scaffold key requirements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PASMA training</strong> for assemblers, alterers and dismantlers (PUWER
                Reg 9). Most sites require it for users too.
              </li>
              <li>
                <strong>WAHR Reg 12 inspection</strong> after assembly, after any event affecting
                the tower (high winds, impact), and at intervals not exceeding 7 days. Form 91
                / scaff tag at the access point.
              </li>
              <li>
                <strong>Manufacturer&apos;s instruction manual</strong> — the binding document
                for assembly. Each model has specific requirements for outriggers, ties, and
                maximum platform heights.
              </li>
              <li>
                <strong>Brakes locked</strong> before access. Don&apos;t move the tower with
                anyone or any material on the platform.
              </li>
              <li>
                <strong>Stair towers</strong> — specialised configuration with stair adjusters
                for landings. Lower platform-height limit (typically 2.5m on stair landings).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MEWPs — scissor lifts and cherry pickers"
            plainEnglish="Mobile Elevated Work Platforms (MEWPs) include scissor lifts (vertical only, larger basket) and boom lifts / cherry pickers (articulating arm, smaller basket). Used for high-level work in commercial and industrial environments where a tower isn't practical or quick enough. IPAF licensed operators only."
            onSite="MEWPs are the right answer for warehouse lighting, high-level commercial cabling, and any work where the access needs to move around the building during the task. Cherry pickers in particular need fall arrest harness clipped to the basket anchor (not a guardrail) because of the catapult risk if the boom strikes an obstruction. Scissor lifts in fixed vertical configuration usually don't require harness but the site rules may differ."
          >
            <p>
              MEWP categories (IPAF):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1a — Static vertical</strong> — push-around scissor or vertical mast,
                outriggers required.
              </li>
              <li>
                <strong>1b — Static boom</strong> — push-around boom MEWP (rare).
              </li>
              <li>
                <strong>3a — Mobile vertical</strong> — self-propelled scissor lift. The most
                common indoor MEWP for electrician work.
              </li>
              <li>
                <strong>3b — Mobile boom</strong> — self-propelled boom / cherry picker. Outdoor
                work, higher reach, basket-anchored harness required.
              </li>
            </ul>
            <p>
              LOLER 1998 Reg 9 requires MEWPs lifting people to be subject to thorough
              examination at intervals of not more than 6 months. The current report must be
              available with the machine. Daily pre-use inspection by the operator (Reg 9(3))
              checks visible damage, tyre condition, hydraulic leaks, controls operation, brake
              function and the certificate validity.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Work at Height Regulations 2005 — Reg 12(1) and 12(3)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 12(1)</strong> — &quot;Every employer shall ensure that, where the
                  safety of work equipment depends on how it is installed or assembled, it is not
                  used after installation or assembly in any position unless it has been inspected
                  in that position.&quot;
                </p>
                <p>
                  <strong>Reg 12(3)</strong> — &quot;Every employer shall ensure that work
                  equipment exposed to conditions causing deterioration which is liable to result
                  in dangerous situations is inspected at suitable intervals, and each time that
                  exceptional circumstances which are liable to jeopardise the safety of the work
                  equipment have occurred, to ensure that health and safety conditions are
                  maintained and that any deterioration can be detected and remedied in good
                  time.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 12(1) is the post-assembly inspection rule — a tower scaffold or any other
                assembled access kit must be inspected after build and before use. Reg 12(3) is
                the in-service inspection rule — at intervals (typically 7 days for towers) and
                after any exceptional event (impact, high winds, alteration). Schedule 7 to the
                Regulations sets out the form and content of the inspection record. The Form 91
                / scaff tag system is the industry-standard way of meeting this.
              </>
            }
            cite="Source: Work at Height Regulations 2005 (SI 2005/735), Reg 12 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Selection criteria — duration, height, load, competence</ContentEyebrow>

          <ConceptBlock
            title="Pick the kit by the task — not by what's in the van"
            plainEnglish="The right access equipment for a task is determined by four factors — how long the work takes, how high it is, how much you need to carry up, and the competence available. Working through those four in order against the WAHR hierarchy gives you a defensible justification."
            onSite="The temptation is to grab the ladder because it's already in the van. The discipline is to walk through the four factors against the hierarchy and only end up at the ladder if the higher controls aren't reasonably practicable. After an incident the inspector asks 'why this kit?' and the answer needs to be more than 'it was what we had'."
          >
            <p>
              The four selection factors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Duration</strong> — short (under 30 minutes at one location, light task,
                one-handed) keeps a ladder in play. Anything sustained moves to podium, tower or
                MEWP.
              </li>
              <li>
                <strong>Height</strong> — under 1.5m platform height = hop-up or podium. 1.5m
                to 4m = podium or low tower. 4m to 12m = tower (PASMA) or MEWP. Above 12m =
                MEWP, scaffold or rope access depending on the work type.
              </li>
              <li>
                <strong>Load</strong> — what tools and materials need to be at platform level?
                A tower has a higher SWL than a ladder and gives a tray for materials. A MEWP
                has a basket SWL declared on the data plate.
              </li>
              <li>
                <strong>Competence</strong> — who&apos;s available with the right training? No
                IPAF on site = no MEWP work. No PASMA = no tower assembly. A job that needs a
                competent operator who isn&apos;t available has to wait, get a competent person
                in, or use a different category of access.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Setting a ladder at the wrong angle"
            whatHappens={
              <>
                Apprentice props a 5m extension ladder against a wall, eyeballs it as
                &quot;about right&quot;, climbs up to fit a junction box. Ladder is at about 65°
                from horizontal — too shallow. The feet slip outwards, the ladder slides down
                the wall, apprentice falls 3m onto a concrete floor. Wrist and ribs broken.
                The ladder had a tilt-indicator strip on the side stile (most professional
                ladders do) but the apprentice didn&apos;t look at it. Investigation finds the
                training record on ladder use was last signed three years ago and the firm hadn&apos;t
                refreshed it.
              </>
            }
            doInstead={
              <>
                Apply the 1:4 rule every time. Base out one unit for every four units up.
                Use the tilt-indicator strip on the ladder if fitted &mdash; it&apos;s built in
                for exactly this reason. Tie the top off or have a second person foot the base
                for any extended use. Refresh ladder training annually &mdash; it&apos;s not a
                once-and-done qualification because complacency is the main risk.
              </>
            }
          />

          <CommonMistake
            title="Using a tower scaffold without checking the inspection tag"
            whatHappens={
              <>
                Apprentice arrives on a fit-out and finds a tower already built in the work area
                from yesterday&apos;s shift. Climbs up and starts working. Tower&apos;s outrigger
                on one side has been moved overnight by another trade and not re-deployed
                correctly. Tower goes unstable when the apprentice shifts weight. Falls 3m onto
                an unfinished floor. Investigation finds the Form 91 was last inspected three
                weeks earlier and there was no daily pre-use check.
              </>
            }
            doInstead={
              <>
                Every tower has a current Form 91 / scaff tag at the access point. Check it
                before you climb. Has it been inspected within the last 7 days? Has anything
                significant happened since (impact, alteration, high winds)? Daily pre-use
                walk-around &mdash; outriggers deployed, brakes on, all components present,
                guardrails intact, platform fully boarded. Two minutes before climbing.
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

          <Scenario
            title="Bracket a 4m run of trunking up a stairwell — ladder, podium, or tower?"
            situation={
              <>
                You&apos;re on a domestic conversion and need to run trunking from the
                first-floor landing down to the ground-floor consumer unit. The vertical run
                is about 4m, the bottom of the run reaches the stairwell floor, the top is at
                landing level. Work involves measuring the run, marking, drilling brackets,
                fixing trunking sections, joining sections, dropping cable in &mdash; all
                two-handed work, total expected duration about three hours over the day.
                Stairwell is about 1m wide.
              </>
            }
            whatToDo={
              <>
                Apply the four selection criteria against the WAHR hierarchy. Avoid? No &mdash;
                the trunking has to be at this height. Prevent? The work is two-handed
                (drilling, cutting, fixing, dropping cable), of substantial duration (three
                hours), at heights up to 4m. A ladder fails the one-handed-work and short-
                duration tests. A podium step has the platform-height range covered for the
                lower part but not the top of the run. A tower scaffold (with stair-tower
                configuration) gives a fully boarded platform up the entire stairwell with
                guardrails on three sides. The right answer is a stair tower &mdash; PASMA
                training required for assembly, Form 91 inspection after build, daily pre-use
                check. Yes, it adds 30-45 minutes for setup but the total task is three hours,
                so the proportion is acceptable, and a fall onto stairs would be a serious
                injury. The ladder is the wrong choice and the inspector would prosecute on a
                fall.
              </>
            }
            whyItMatters={
              <>
                Stairwell work is the textbook scenario where ladder use is wrong but tempting.
                The inclination is to use what&apos;s in the van and finish quickly. The
                discipline is to walk through duration, height, load and competence against the
                hierarchy and arrive at the right kit. After an incident the &quot;we used what
                we had&quot; defence collapses immediately. After a successful job the
                stair-tower setup looks like overkill &mdash; until you&apos;ve seen the
                consequence of a stairwell fall.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Falls from height are the leading cause of UK construction fatalities. WAHR 2005 Reg 6 sets the three-tier hierarchy that forces you to justify the kit you pick — avoid, prevent, minimise.",
              "A ladder is at the bottom of the prevent tier — short duration (up to 30 minutes at one location), light, one-handed work, where higher controls aren't reasonably practicable.",
              "75 degree / 1:4 rule for leaning ladders. Three-point contact at all times. Tilt-indicator strips on the side stile of professional ladders confirm the angle.",
              "Podium steps and hop-ups give a fully guarded low-level platform — eliminate the ladder-stability problem for two-handed work up to about 1.5m platform height.",
              "Tower scaffolds need PASMA training for assembly, alteration and dismantling. WAHR Reg 12 requires inspection after build and at intervals not exceeding 7 days. Form 91 / scaff tag at the access point.",
              "MEWPs need IPAF training for the operator (categories 1a, 1b, 3a, 3b) and LOLER 1998 Reg 9 thorough examination every 6 months for person-lifting equipment. Daily pre-use inspection on top.",
              "Selection by duration + height + load + competence, walked against the WAHR hierarchy. The ladder is rarely the right answer for substantial work — the inclination to grab it because it's in the van is the prosecutable error.",
              "Pre-use inspection of every access item is the user's daily duty under PUWER Reg 6 and HASAWA s.7. Damaged kit comes out of service before work starts, not after the fall.",
            ]}
          />

          <Quiz title="Access equipment — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 PPE for different tasks
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Site-type prep deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
