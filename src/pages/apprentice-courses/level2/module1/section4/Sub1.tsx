/**
 * Level 2 · Module 1 · Section 4.1 — PPE Fundamentals
 *
 * AC mapping:
 *   - Unit 201 LO3 AC 3.3 — explain the purpose of personal protective equipment (PPE)
 *
 * Cross-refs:
 *   - §1 (HASAWA s.2(2)(b), EAWR Reg 16 competence)
 *   - §3 (RAMS specifies the PPE for the job)
 *   - Forward to §4.2 (specific PPE for electrical work)
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

const TITLE = 'The purpose of PPE | Level 2 Module 1.4.1 | Elec-Mate';
const DESCRIPTION =
  'Why PPE exists, where it sits in the hierarchy of control, and why it’s the LAST line of defence — not the first.';

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'ppe-purpose-check',
    question: 'What is PPE actually for?',
    options: [
      'To replace safe systems of work',
      'To stop the hazard happening in the first place',
      'To protect you when other controls can’t fully remove the risk',
      'To make the job faster',
    ],
    correctIndex: 2,
    explanation:
      'PPE is the LAST line in the hierarchy of control. It protects YOU after every other safer option (eliminate, substitute, engineering, admin) has been used. It doesn’t stop the hazard — it just stops the hazard reaching you when something gets through.',
  },
  {
    id: 'ppe-hierarchy-check',
    question: 'Where does PPE sit in the hierarchy of control?',
    options: [
      'First — always the easiest fix',
      'Second — straight after elimination',
      'Last — when nothing higher up can fully remove the risk',
      'It’s separate from the hierarchy',
    ],
    correctIndex: 2,
    explanation:
      'Eliminate → Substitute → Engineering controls → Administrative controls → PPE. Each step DOWN the list is less reliable. PPE is bottom because it relies on YOU wearing it, fitting it, looking after it. Anything above it is always preferable.',
  },
  {
    id: 'ppe-employer-duty-check',
    question: 'Who pays for your PPE?',
    options: [
      'You — it comes out of your wages',
      'Your employer — free of charge, by law',
      "Half-and-half, that’s the industry standard",
      'Whoever supplies the site',
    ],
    correctIndex: 1,
    explanation:
      'PPER 2022 Reg 4 + HASAWA s.9: the employer must provide suitable PPE FREE of charge when risk can’t be controlled by other means. Anyone deducting it from your wages is breaking the law. Apprentices, agency, sub-contractors — all covered.',
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What does the acronym PPE stand for?',
    options: [
      'Personal Protective Equipment',
      'Public Protection Essentials',
      'Practical Performance Equipment',
      'Permanent Protective Eyewear',
    ],
    correctAnswer: 0,
    explanation:
      'Personal Protective Equipment — anything designed to be worn or held to protect you from a workplace risk. Defined under the Personal Protective Equipment at Work Regulations 1992 (as amended 2022).',
  },
  {
    id: 2,
    question: 'In the hierarchy of control, what comes BEFORE PPE?',
    options: [
      'Nothing — PPE is always first',
      'Just risk assessment',
      'Eliminate, substitute, engineering controls, administrative controls',
      'Only training',
    ],
    correctAnswer: 2,
    explanation:
      "Five layers, top down: ELIMINATE the hazard → SUBSTITUTE for something safer → ENGINEERING controls (guards, isolation, RCDs) → ADMINISTRATIVE controls (RAMS, training, signage) → PPE. PPE is the last resort because it only protects the person wearing it, only if it’s worn correctly.",
  },
  {
    id: 3,
    question: 'An electrician says "We don’t need to isolate, just stick the gloves on". What’s wrong with that?',
    options: [
      'Nothing — gloves are fine',
      'Insulated gloves are too hot to wear all day',
      "PPE shouldn’t replace a higher control like isolation — gloves are the BACKSTOP, not the plan",
      'You also need glasses',
    ],
    correctAnswer: 2,
    explanation:
      "Skipping isolation and relying on PPE inverts the hierarchy. Gloves are there for the moment something unexpected goes live — not as a substitute for proving dead. EAWR Reg 14 says working live needs justification AND suitable precautions. PPE alone isn’t suitable precaution.",
  },
  {
    id: 4,
    question: "Under PPER 2022, who has to provide PPE to a first-year apprentice?",
    options: [
      "The apprentice — out of their first wage",
      "The college, only during training weeks",
      "The employer — free of charge",
      "The main contractor on the job",
    ],
    correctAnswer: 2,
    explanation:
      "Your employer. Free. The 2022 amendment closed a loophole — limb (b) workers (most agency/zero-hours) are now covered the same as direct employees. If they’re billing you for boots, that’s a PPER 2022 Reg 4 breach.",
  },
  {
    id: 5,
    question: "Your supervisor hands you a 'one-size-fits-all' high-vis that drowns you and gloves two sizes too big. Is this OK?",
    options: [
      "Yes — at least it’s PPE",
      "No — PPE that doesn’t fit doesn’t protect; ask for the right size",
      "Yes if you tape the gloves on",
      "Only OK for a half-day",
    ],
    correctAnswer: 1,
    explanation:
      "PPER 2022 Reg 4(3): PPE must be SUITABLE for the wearer — fit included. Loose gloves slip off or snag, oversized hi-vis catches on tools, helmets that wobble don’t protect. Politely insist on the right size. Your supervisor has to provide it.",
  },
  {
    id: 6,
    question: "What does PPE NOT do?",
    options: [
      "Reduce the consequence of a hazard reaching you",
      "Stop the hazard happening in the first place",
      "Provide a final layer of protection",
      "Need inspection before use",
    ],
    correctAnswer: 1,
    explanation:
      "PPE doesn’t prevent the hazard — it just blunts the impact when one gets to you. The cable is still live, the dust is still in the air, the object can still fall. PPE only changes what happens to YOU when the higher controls fail or aren’t enough.",
  },
  {
    id: 7,
    question: "Which of these ISN’T a recognised employer duty under PPER 2022?",
    options: [
      "Provide suitable PPE free of charge",
      "Ensure the PPE is compatible with other PPE worn",
      "Train workers on how to use, store and look after it",
      "Replace any worker who refuses to wear PPE",
    ],
    correctAnswer: 3,
    explanation:
      "The first three are all PPER duties. Replacing workers isn’t a regulation — although refusing to wear required PPE is itself a breach of the worker’s s.7 HASAWA duty and can be grounds for discipline. The DUTY on the employer is to PROVIDE and TRAIN, not to fire.",
  },
  {
    id: 8,
    question: "You’re given PPE that has no CE or UKCA mark. What should you do?",
    options: [
      "Use it anyway — it was free",
      "Refuse it and ask for properly marked kit",
      "Use it for short jobs only",
      "Stick a label on it yourself",
    ],
    correctAnswer: 1,
    explanation:
      "No CE/UKCA mark means it hasn’t been tested or certified to a recognised standard. For electrical PPE that’s a real safety issue — cheap unmarked ‘insulated’ gloves can fail at a fraction of their claimed rating. PPER 2022 Reg 4 requires PPE to comply with the relevant supply regulations. No mark, no go.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'Why isn’t PPE the first thing on the list?',
    answer:
      "Because it relies on you. Wear it, fit it, maintain it, replace it. Anything that depends on a person remembering and doing the right thing every single time is less reliable than fixing the actual hazard. Eliminating, substituting or engineering the risk out — those work without anyone having to think about it. PPE is the bit that catches what the higher controls miss.",
  },
  {
    question: 'Does my employer actually have to PAY for my PPE?',
    answer:
      "Yes. PPER 1992 Reg 4 (and HASAWA s.9 — ‘no charge for things done or provided in pursuance of any specific requirement of the relevant statutory provisions’). The 2022 amendment widened this to cover most agency / zero-hours workers too. Anyone deducting PPE from your wages is breaking the law.",
  },
  {
    question: 'What if my employer says PPE is enough on its own?',
    answer:
      "It almost never is — and the law backs you up. PPER 2022 Reg 4(1) only allows PPE when the risk ‘cannot be controlled by other means which are equally or more effective’. So the employer has to show they’ve tried elimination/substitution/engineering FIRST. ‘Just wear gloves and crack on’ on a job that should be isolated is a breach.",
  },
  {
    question: 'How is PPE different from RPE or a harness?',
    answer:
      "Respiratory Protective Equipment (RPE) and fall arrest harnesses are types of PPE — they have their own extra rules (RPE under COSHH; harnesses under Work at Height Regs) but they sit under the same PPER umbrella. The same hierarchy applies — extract the dust if you can; remove the fall risk if you can; only then strap on the RPE or harness.",
  },
  {
    question: 'What happens if I just refuse to wear it?',
    answer:
      "PPE issued for a real risk isn’t optional. HASAWA s.7 puts a personal duty on you to cooperate with the safety system — refusing required PPE is a sackable breach AND personal liability if something goes wrong. If the PPE is uncomfortable, badly fitted or wrong for the job, that’s a different conversation — flag it, get it sorted, but don’t just bin it off.",
  },
  {
    question: 'Why is PPE a topic on its own — isn’t it obvious?',
    answer:
      "Two reasons. One: getting PPE WRONG is the most common cause of avoidable injury on UK sites — wrong rating, wrong size, expired, missing, ‘only the apprentice not wearing it’. Two: assessors at the end of your apprenticeship will ask you to JUSTIFY the PPE you choose for a given task. Knowing the hierarchy and the regs lets you answer cleanly: ‘these gloves, this rating, because the risk is X and elimination wasn’t reasonably practicable.’",
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4 · Subsection 1"
            title="The purpose of PPE"
            description="Why PPE exists, where it sits in the hierarchy of control, and why it’s the LAST line of defence — not the first. Get this clear and the rest of Section 4 makes sense."
            tone="emerald"
          />

          <TLDR
            points={[
              "PPE = Personal Protective Equipment. The stuff you WEAR to take the hit when a hazard gets through everything else.",
              "It’s the LAST line of the hierarchy of control. Eliminate, substitute, engineer, admin — THEN PPE. Never the first answer.",
              "Your employer provides it FREE — PPER 2022 Reg 4 + HASAWA s.9. CE/UKCA marked, fits you, suitable for the job.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define PPE and explain what it’s for, in plain English (AC 3.3).",
              "Place PPE correctly in the hierarchy of control — and explain why it sits at the bottom.",
              "List your employer’s duties under PPER 2022 (provide, train, maintain, replace).",
              "List your duties as a worker under HASAWA s.7 + PPER 2022 Reg 10 (use it, check it, report it).",
              "Spot when someone’s using PPE as a substitute for a proper higher control — and know how to push back.",
              "Recognise CE / UKCA marking and explain why unmarked PPE is a hard refusal.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What PPE actually is</ContentEyebrow>

          <ConceptBlock
            title="A definition that means something"
            plainEnglish="Anything you wear or hold whose only job is to protect YOU from a workplace risk. Helmet, glasses, gloves, boots, hi-vis, ear defenders, harness, RPE — all PPE."
            onSite="The vest your supervisor hands you at the gate, the gloves in your tool bag, the boots on your feet — all PPE. The thing they have in common: take them off and the hazard is unchanged. They protect the person, not the job."
          >
            <p>
              The Personal Protective Equipment at Work Regulations 1992 (amended 2022) define
              PPE as <em>"all equipment (including clothing affording protection against the
              weather) which is intended to be worn or held by a person at work and which
              protects them against one or more risks to their health or safety"</em>.
            </p>
            <p>
              Key word: <strong>protects the person</strong>. PPE doesn’t make the cable dead.
              It doesn’t catch the falling brick before it falls. It doesn’t suck the dust out
              of the air. It just changes what happens to YOU when one of those things gets to
              you.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="PPER 1992 (as amended 2022) — Regulation 2 (Interpretation)"
            clause='"personal protective equipment" means all equipment (including clothing affording protection against the weather) which is intended to be worn or held by a person at work and which protects them against one or more risks to their health or safety, and any addition or accessory designed to meet that objective.'
            meaning={
              <>
                Wide definition on purpose — covers helmets, hi-vis, gloves, glasses, boots,
                harnesses, RPE, hearing protection, even thermal kit for outdoor winter
                working. If its job is to protect YOU rather than control the source of the
                hazard, it’s PPE and these regs apply.
              </>
            }
            cite="Reference: HSE — Personal Protective Equipment at Work Regulations 1992 (as amended 2022)"
          />

          <SectionRule />

          <ContentEyebrow>The hierarchy of control</ContentEyebrow>

          <ConceptBlock
            title="Five layers — and PPE is the bottom one"
            plainEnglish="Top of the list = most reliable, removes the risk. Bottom = least reliable, just protects the person. Always work from the top down."
            onSite="Cable buried near a wall, drilling close to it. Top option: route a different way (eliminate). Next: use a non-conductive screw fixing instead (substitute). Next: cable detector + RCD on the drill (engineering). Next: lock-off the supply + permit-to-work (admin). LAST: insulated gloves, safety glasses (PPE). All five together = belt AND braces. Skipping the top four = relying on the gloves to save you."
          >
            <p>
              Every UK risk assessment uses the same hierarchy. It’s baked into the Management
              of Health and Safety at Work Regulations 1999 and into PPER 2022 itself. The
              order is deliberate — each step DOWN is less reliable because it depends more on
              human behaviour:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Eliminate</strong> — remove the hazard entirely. Don’t do the job
                live. Use a battery tool instead of mains. Re-route the cable. Best option.
              </li>
              <li>
                <strong>Substitute</strong> — swap the hazard for something less dangerous.
                LED panel instead of high-pressure halogen. Battery drill instead of 110 V.
              </li>
              <li>
                <strong>Engineering controls</strong> — physical kit that controls the hazard.
                Guards, interlocks, isolators, RCDs, dust extraction, fume cupboards. Works
                whether or not someone remembers to use it.
              </li>
              <li>
                <strong>Administrative controls</strong> — procedures, training, RAMS,
                permits, signage, supervision. Relies on people doing the right thing.
              </li>
              <li>
                <strong>PPE</strong> — the last layer. Protects only the wearer, only if
                fitted, worn, and looked after.
              </li>
            </ol>
            <p>
              The further down you go, the more weight is on YOU as a person doing the right
              thing every single time. That’s why PPE is the bottom — it’s the most fragile
              link in the chain. Use it AS WELL AS the higher controls, never INSTEAD OF.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="PPER 1992 (as amended 2022) — Regulation 4(1)"
            clause="Every employer shall ensure that suitable personal protective equipment is provided to his employees who may be exposed to a risk to their health or safety while at work except where and to the extent that such risk has been adequately controlled by other means which are equally or more effective."
            meaning={
              <>
                The legal version of "PPE is the last resort". You only fall back on PPE when
                the risk <em>cannot</em> be controlled by something higher in the hierarchy.
                If a job could be eliminated, substituted, or engineered safer, the employer
                has to do that FIRST — and PPE only fills the gap that remains.
              </>
            }
            cite="Reference: PPER 1992 Reg 4 (as amended by SI 2022/8)"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What PPE protects against</ContentEyebrow>

          <ConceptBlock title="The hazards on a normal electrician’s day">
            <p>
              You’ll meet most of these every week. PPE doesn’t fix any of them — it just
              softens the blow when something gets to you:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electric shock</strong> — insulated gloves (IEC 60903), insulated
                tools (BS EN 60900). Covered in §4.2.
              </li>
              <li>
                <strong>Arc flash + arc burns</strong> — arc-rated face shields and clothing
                (BS EN 61482), rated in cal/cm². Covered in §4.2.
              </li>
              <li>
                <strong>Falling objects + impact</strong> — safety helmet (BS EN 397) or bump
                cap, depending on the site. Steel/composite toe-cap boots (EN ISO 20345 SB
                minimum).
              </li>
              <li>
                <strong>Eye injury</strong> — flying debris, dust, arc flash, UV from
                grinding/welding. Safety glasses or goggles (BS EN 166).
              </li>
              <li>
                <strong>Hand injury</strong> — cuts, burns, chemical, electrical. Different
                glove standards for each (cut: BS EN 388; heat: BS EN 407; insulating: IEC
                60903).
              </li>
              <li>
                <strong>Hearing damage</strong> — power tools, drilling. Ear defenders or
                plugs (BS EN 352), rated in dB SNR.
              </li>
              <li>
                <strong>Respiratory</strong> — dust from drilling/chasing, fume from
                soldering. RPE (filter masks BS EN 149 — FFP1/FFP2/FFP3).
              </li>
              <li>
                <strong>Visibility</strong> — being seen by plant, traffic, other trades.
                Hi-vis vest or jacket (EN ISO 20471).
              </li>
              <li>
                <strong>Falls from height</strong> — harness + lanyard (BS EN 361 / 354).
                Always last resort under WAH 2005 — eliminate the height first if you can.
              </li>
            </ul>
            <p>
              Each item is rated for a specific hazard. Wearing the wrong rating is almost as
              bad as wearing nothing — you THINK you’re protected. We’ll go through the
              electrical-specific ones in detail in §4.2.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Whose job is what</ContentEyebrow>

          <ConceptBlock
            title="Employer duties under PPER 2022"
            onSite="If your boots get binned by a chemical spill, the employer replaces them. Free. Same goes for gloves that fail their 6-monthly test. You should never be asked to chip in."
          >
            <p>
              The 2022 amendment to PPER tightened things up — most importantly, it widened
              the duties to cover ‘limb (b) workers’ (a lot of agency and zero-hours staff).
              Whether you’re a direct employee, an apprentice, or a casual worker, your
              employer must:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Provide suitable PPE free of charge</strong> when other controls
                can’t adequately reduce the risk (Reg 4).
              </li>
              <li>
                <strong>Make sure it FITS</strong> you and is compatible with any other PPE
                you’re also wearing (Reg 4(3)).
              </li>
              <li>
                <strong>Maintain, replace and store it properly</strong> — including any
                periodic test or recertification (Reg 7).
              </li>
              <li>
                <strong>Train you</strong> in how to use, fit, look after and report defects
                in the kit (Reg 9).
              </li>
              <li>
                <strong>Keep it CE / UKCA compliant</strong> — only PPE meeting the relevant
                supply regulations may be used (Reg 4(2)).
              </li>
            </ul>
            <p>
              Not optional. Not "if budget allows". HSE inspectors prosecute PPER breaches
              regularly — fines have hit £100k+ for serious cases.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Your duties — under HASAWA s.7 and PPER Reg 10"
            plainEnglish="Use it. Look after it. Tell someone if it’s broken or missing."
          >
            <p>
              You don’t get a free ride here. PPER Reg 10 puts three duties on you as the
              wearer:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Use the PPE</strong> in accordance with your training and
                instructions.
              </li>
              <li>
                <strong>Take reasonable care of it</strong> — store properly, don’t damage it
                deliberately, follow the cleaning instructions.
              </li>
              <li>
                <strong>Report any loss or defect</strong> to your employer. If the gloves
                fail a visual check, the boots split, the helmet takes a knock — flag it.
              </li>
            </ol>
            <p>
              These sit on top of your general HASAWA s.7 duty to cooperate with the safety
              system (covered in §1.1). Refusing to wear required PPE without a good reason
              is a sackable offence and personally on you if something goes wrong.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="PPER 1992 (as amended 2022) — Regulation 10"
            clause="Every employee who has been provided with personal protective equipment by virtue of regulation 4(1) shall use it in accordance with both any training in the use of the personal protective equipment concerned which has been received by them and the instructions respecting that use which have been provided to them by the employer concerned. Every employee shall take all reasonable steps to ensure that any such equipment is returned to the accommodation provided for it after use. Every employee shall report to their employer any loss of or obvious defect in the personal protective equipment provided to them."
            meaning={
              <>
                Three short duties: <strong>use it</strong>, <strong>store it</strong>,{' '}
                <strong>report defects</strong>. Doesn’t sound like much, but it’s the bit
                most often broken — left in the van, hung off a nail in the welfare cabin
                until it’s mouldy, or quietly used after it’s clearly knackered. All of those
                are PPER Reg 10 breaches.
              </>
            }
            cite="Reference: PPER 1992 Reg 10 (as amended by SI 2022/8)"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How you tell good PPE from bad</ContentEyebrow>

          <ConceptBlock
            title="CE / UKCA marking — the absolute minimum"
            plainEnglish="No CE or UKCA mark = it hasn’t been tested to a recognised standard. Doesn’t matter how cheap it was."
            onSite="Pull a glove out the box. CE mark, four-digit number after it (the notified body that certified it), the standard reference (e.g. EN 60903), the class (e.g. Class 0 = 1000 V AC). If any of that’s missing, it’s not legal PPE for electrical work — bin it."
          >
            <p>
              Since Brexit, UK-supplied PPE carries either the <strong>UKCA</strong> mark or
              the <strong>CE</strong> mark (CE is still accepted indefinitely as of 2024).
              Either is valid. What matters is that it’s there, alongside the standard the
              kit is certified to.
            </p>
            <p>For electrical PPE you should expect to see:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The CE or UKCA mark</li>
              <li>The relevant standard (e.g. EN 60903 for insulated gloves)</li>
              <li>The class or rating (e.g. Class 0, 1000 V AC)</li>
              <li>Date of manufacture and/or expiry / next test date</li>
              <li>Manufacturer name + batch number</li>
            </ul>
            <p>
              Cheap import gloves with no markings, or markings that look photocopied, are a
              hard refuse. There have been documented cases of Class 0-marked gloves from
              non-UK sources failing dielectric tests at well below 1 kV. The mark on the
              glove is your only assurance — and if it’s fake, the assurance is fake.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating PPE like a substitute for a proper safety control"
            whatHappens={
              <>
                Job needs isolation. Supervisor says "it’ll take ages, just whack the gloves on".
                You wear the gloves, work it live, nothing goes wrong this time. Next time the
                gloves have a pinhole you didn’t spot, or the voltage is higher than you
                thought, or the screwdriver slips and arcs across two phases. Now the gloves
                are doing a job they were never meant to do — they were the BACKSTOP, not the
                plan.
              </>
            }
            doInstead={
              <>
                Argue for the proper control. EAWR Reg 14: live work needs (a) it being
                unreasonable to make it dead, (b) it being reasonable to do it live, AND (c)
                suitable precautions. PPE is part of (c) — but only AFTER (a) and (b) are
                justified. If isolation is genuinely possible, isolation wins. PPE goes on
                top, not instead.
              </>
            }
          />

          <Scenario
            title="The new apprentice with no insulated gloves"
            situation={
              <>
                First week on the job. You’re sent into a domestic CU change with a senior
                electrician. He throws you a pair of standard work gloves — leather, no markings.
                You ask about insulated gloves. He says "we don’t bother for domestic — just
                don’t touch the live bits". The supply’s coming in on a TT system, the meter’s
                already disconnected, but the CU still has tails dangling.
              </>
            }
            whatToDo={
              <>
                Don’t crack on. Politely raise it: "the tails could still be live if the
                meter’s reconnected, and PPER 2022 Reg 4 means I should have insulated gloves
                rated for the voltage. Could you arrange a pair?". If he pushes back,
                escalate to the contracts manager or your training provider — apprentices
                have a direct line for safety issues without it being seen as snitching. Note
                the date, the conversation, the supply state. <strong>HASAWA s.7</strong>{' '}
                makes the failure to wear suitable PPE PERSONALLY yours if you go ahead — not
                his.
              </>
            }
            whyItMatters={
              <>
                "Don’t touch the live bits" is not a control — it’s a hope. PPER 2022 Reg 4
                says if there’s a foreseeable risk of contact with a live part, the employer
                must provide PPE rated for it. A first-year apprentice working on tails with
                no insulated gloves and no proven dead state is exactly the situation HSE
                prosecutes employers over. And it’s exactly the situation that turns into a
                fatality at 230 V.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Why this matters before you touch anything</ContentEyebrow>

          <ConceptBlock title="The PPE conversation belongs in the RAMS">
            <p>
              You met RAMS in §3 — the Risk Assessment and Method Statement that turns law
              into actual steps for an actual job. PPE selection lives in there. A proper
              method statement names the kit: "operatives shall wear EN ISO 20345 SB safety
              footwear, EN 397 helmet, EN 166 eye protection. For the live cap-off only:
              IEC 60903 Class 0 insulated gloves and an arc-rated face shield to BS EN
              61482-2 minimum 8 cal/cm²."
            </p>
            <p>
              That specificity isn’t bureaucracy — it’s how you (and your employer) prove
              you’ve thought through the hazards and chosen kit that actually matches them.
              When the assessor at the end of your apprenticeship asks "why those gloves",
              the answer comes from the RAMS, not from "the supervisor told me to wear them".
            </p>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 16"
            clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
            meaning={
              <>
                Knowing what PPE the job needs IS technical knowledge. As a first-year
                apprentice you’re an <em>instructed person</em> under BS 7671 — you need a
                competent person specifying the PPE for you and supervising. By the end of
                your apprenticeship, you should be the one specifying it for the job.
                Knowing the hierarchy + the regs is how you get from one to the other.
              </>
            }
            cite="Source: HSE HSR25 Memorandum of Guidance to EAWR 1989"
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "PPE = Personal Protective Equipment. Worn or held to protect YOU when a hazard gets through everything else.",
              "Hierarchy of control: Eliminate → Substitute → Engineering → Administrative → PPE. PPE is LAST because it relies on you wearing it.",
              "PPER 2022 Reg 4: employer provides suitable PPE FREE. Reg 10: you use it, store it, report defects.",
              "Suitable means RATED for the hazard, FITTED to you, and CE / UKCA marked. No marking = hard refuse.",
              "PPE never replaces a higher control. Don’t let anyone tell you ‘just stick the gloves on’ instead of isolating.",
              "RAMS specifies the PPE for the job. By the end of your apprenticeship you should be the one writing it, not just wearing it.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Purpose of PPE knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3/3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Reviewing and updating RAMS
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                PPE for electrical work
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
