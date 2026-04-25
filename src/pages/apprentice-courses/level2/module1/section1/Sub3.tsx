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
  'Other key regulations — RIDDOR, PUWER, COSHH and friends | Level 2 Module 1.1.3 | Elec-Mate';
const DESCRIPTION =
  "The supporting cast — MHSWR, RIDDOR, PUWER, COSHH, Working at Height, Manual Handling, PPE and CDM. Names, scope, and the apprentice-level stuff you actually need.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'mhswr-risk-assessment-check',
    question: "What’s the main thing MHSWR 1999 makes the boss do?",
    options: [
      'Provide free overalls',
      'Carry out a risk assessment for every work activity',
      'Hire a full-time safety officer',
      'Send weekly reports to the HSE',
    ],
    correctIndex: 1,
    explanation:
      "Reg 3 of MHSWR — risk assess every work activity. If there are 5 or more of you on the books, the significant findings have to be written down. That write-up turns into the RAMS you read on site.",
  },
  {
    id: 'coshh-hierarchy-check',
    question: 'Under COSHH, what should the boss try FIRST when controlling a hazardous substance?',
    options: [
      'Issue PPE',
      'Get rid of the substance — eliminate or substitute',
      'Put a warning sign up',
      'Tell you to be careful',
    ],
    correctIndex: 1,
    explanation:
      "PPE is the LAST resort, not the first. The hierarchy: eliminate → substitute → engineering controls (extraction, ventilation) → admin (procedures, training) → PPE. If the gaffer goes straight to a dust mask, that’s not COSHH compliance — that’s laziness.",
  },
  {
    id: 'riddor-shock-check',
    question: 'You take a 230V belt off a circuit and end up at A&E for checks. Reportable?',
    options: [
      "No, you walked away",
      'Yes — electric shock injury usually has to be reported under RIDDOR',
      'Only if you took more than a week off',
      'Only if the boss says so',
    ],
    correctIndex: 1,
    explanation:
      "Pretty much any electric shock that needs medical treatment — or causes you to be off work over 7 days — gets reported on HSE form F2508. Even if you feel fine, the boss has a duty to report it. Get it logged.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What does MHSWR 1999 require every employer to carry out?',
    options: [
      'A weekly fire drill',
      'A suitable and sufficient risk assessment of work activities',
      'A monthly RCD test',
      'An annual CPD course',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 3 — 'suitable and sufficient' risk assessment of every work activity. If there are 5+ employees, the significant findings have to be written down. That’s where your RAMS come from.",
  },
  {
    id: 2,
    question: 'Which of these is reportable under RIDDOR?',
    options: [
      'A grazed knuckle, plastered up and back to work',
      'An electric shock that puts you in hospital with a serious burn',
      'A dropped tool that hits nothing',
      'Spilled coffee on the desk',
    ],
    correctAnswer: 1,
    explanation:
      "Specified injuries (serious burns, fractures, amputations, loss of consciousness) get reported. So do over-7-day absences and dangerous occurrences. Most electric shocks that need treatment will go on a F2508.",
  },
  {
    id: 3,
    question: 'Which of these is COVERED by PUWER 1998?',
    options: [
      'Only fixed factory machinery',
      'Pretty much any equipment you use at work — drills, ladders, multimeters, you name it',
      'Only equipment over £1,000 in value',
      'Only equipment older than 5 years',
    ],
    correctAnswer: 1,
    explanation:
      "PUWER covers all work equipment. Hammers, knives, ladders, drills, saws, MFTs, dumpers, lifts. Has to be suitable, safe, maintained, inspected where needed, and used by people who’ve been trained.",
  },
  {
    id: 4,
    question: "Under COSHH, what’s the LAST thing the boss should rely on to control exposure?",
    options: [
      'Eliminating the substance',
      'Substituting it for something safer',
      'Engineering controls like extraction',
      'PPE',
    ],
    correctAnswer: 3,
    explanation:
      "PPE is bottom of the hierarchy, not the top. Eliminate → substitute → engineering → admin → PPE. A dust mask is the LAST line of defence, not the first plan.",
  },
  {
    id: 5,
    question: 'Under the Working at Height Regs 2005, what should you do FIRST?',
    options: [
      'Grab a ladder',
      'Avoid working at height where you can — do it from the ground if possible',
      'Wear a harness',
      'Get someone to foot the ladder',
    ],
    correctAnswer: 1,
    explanation:
      "Avoid → prevent → minimise. If you can rod cable from the ground or pre-make off at the bench, do it. Going up the ladder is the LAST option, not the first.",
  },
  {
    id: 6,
    question: 'TILE under the Manual Handling Regs stands for:',
    options: [
      'Tools, Insulation, Length, Earth',
      'Task, Individual, Load, Environment',
      'Time, Inspection, Labour, Energy',
      'Total, Internal, Local, Earth',
    ],
    correctAnswer: 1,
    explanation:
      "Task (what’s the lift?), Individual (who’s lifting?), Load (how heavy/awkward?), Environment (where are you doing it?). Run TILE in your head before you bear-hug a 25kg consumer unit at full reach.",
  },
  {
    id: 7,
    question: 'Under the PPE Regs 2022, who pays for your PPE?',
    options: [
      "You — it’s part of being on the tools",
      'The employer — PPE has to be provided free where it controls a risk',
      'Split 50/50 with the boss',
      'Your training provider',
    ],
    correctAnswer: 1,
    explanation:
      "Free. Always. Fit-for-purpose. Trained on. Maintained. If the boss is asking you to chip in for safety boots or your own gloves, that’s not how it works.",
  },
  {
    id: 8,
    question: 'Under CDM 2015, who is the duty-holder responsible for managing the construction phase?',
    options: ['The client', 'The principal designer', 'The principal contractor', 'The apprentice'],
    correctAnswer: 2,
    explanation:
      "Principal contractor runs the construction phase — site safety, induction, coordination of trades. Principal designer handles pre-construction. Client appoints them and provides info. Workers (you) cooperate with the system.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "There’s loads of them. Do I need to learn every reg word for word?",
    answer:
      "No. Nobody does. You need to know what each reg COVERS so you can join the dots when you’re on a job. MHSWR = risk assessment. RIDDOR = reporting incidents. PUWER = work equipment. COSHH = hazardous substances. WAHR = working at height. Manual Handling = lifting stuff. PPE = the kit. CDM = construction sites. That’s it. The detail is in the RAMS for the actual job.",
  },
  {
    question: "I’ve had a small belt and I feel fine. Do I really need to report it?",
    answer:
      "Yes. Tell the gaffer or your supervisor straight away, get checked out (A&E or a walk-in), and let them log it. Cardiac issues from electric shock can show up hours later — that’s why it gets taken seriously. Most shock injuries that get medical attention are reportable under RIDDOR (specified injury or over-7-day absence). The report goes on HSE form F2508.",
  },
  {
    question: "What’s a 'dangerous occurrence' under RIDDOR? Bit of a vague phrase.",
    answer:
      "It’s a near-miss serious enough that the HSE wants to know about it. For us: an electrical short circuit causing fire or explosion, collapse of scaffolding, plant overturning, things like that. Doesn’t need an injury — just the event. There’s a list in the RIDDOR schedules; the boss handles the call on whether it qualifies.",
  },
  {
    question: 'My drill keeps tripping the RCD. PUWER issue or just unlucky?',
    answer:
      "PUWER. Reg 4 — equipment must be suitable for the work. Reg 5 — must be maintained. A drill that nuisance-trips is telling you the insulation is breaking down or the brushes are knackered. Take it out of service, label it, and tell the gaffer. Don’t keep banging the breaker back in — that’s how shocks happen.",
  },
  {
    question: "What’s COSHH got to do with me? I’m a sparky, not a chemist.",
    answer:
      "Loads. Brick dust from chasing walls is a COSHH substance (silica). Solder fumes are COSHH. Mastic, silicone, contact cleaners, lead from old cable insulation, asbestos in older boards — all COSHH. Every one needs an assessment, every one needs proper controls. PPE is the LAST line, not the first.",
  },
  {
    question: 'Who can take me to court for breaking these regs?',
    answer:
      "Same as HASAWA — HSE inspectors or the local authority. They’re all 'made under' HASAWA, so the enforcement teeth are the same. Improvement notices, prohibition notices, fines, prison time for serious stuff. Workers can be prosecuted personally for s.7 breaches that link back to any of these.",
  },
];

const Sub3 = () => {
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1.1 · Subsection 3"
            title="Other key regulations — RIDDOR, PUWER, COSHH and friends"
            description="Yeah, it’s a soup of acronyms. Stick with me — you only need to know what each one COVERS, not chapter and verse. Each of these tackles a specific risk that HASAWA on its own doesn’t get into."
            tone="emerald"
          />

          <TLDR
            points={[
              "These regs all sit UNDER HASAWA. Each one tackles a specific risk — incidents, equipment, chemicals, height, lifting, PPE, building sites.",
              "MHSWR = risk assess everything. RIDDOR = report serious incidents. PUWER = make sure the kit is safe. COSHH = control hazardous substances.",
              "You don’t need to memorise the regs word for word. Know what each one COVERS so you can join the dots on site.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Name the main 'sister regs' to HASAWA and say what each one covers in one sentence.",
              'Explain why MHSWR 1999 makes the boss carry out a risk assessment, and where the RAMS comes from.',
              'List the kinds of incident that get reported under RIDDOR — including most electric shocks.',
              'Apply the COSHH control hierarchy (eliminate → substitute → engineering → admin → PPE).',
              'Use TILE for a manual-handling job, and the avoid-prevent-minimise hierarchy at height.',
              'Identify CDM 2015 duty-holders on a building site and where you sit in the chain.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why all these regs exist</ContentEyebrow>

          <ConceptBlock title="HASAWA is the umbrella. These are the spokes.">
            <p>
              HASAWA 1974 set the general duty: keep people safe. But a one-line duty isn’t enough
              when you’re dealing with a 25kg consumer unit, a tub of mastic, a cherry-picker and a
              site with twelve trades on it. So Parliament added a stack of more specific
              regulations <em>under</em> HASAWA — each one tackling a particular risk.
            </p>
            <p>
              That’s what these are. MHSWR, RIDDOR, PUWER, COSHH, the Working at Height Regs, the
              Manual Handling Regs, the PPE Regs and CDM. They all share HASAWA’s enforcement teeth
              (HSE prosecutions, unlimited fines, prison for the worst stuff) — they just add detail
              for specific hazards.
            </p>
            <p>
              You’re not expected to recite them. You ARE expected to know what each one is about,
              so when your gaffer says "this is a COSHH job" or "have we got a working-at-height
              permit?" you know what they’re talking about.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The big one after HASAWA</ContentEyebrow>

          <ConceptBlock
            title="MHSWR 1999 — Management of Health and Safety at Work Regulations"
            plainEnglish="HASAWA says be safe. MHSWR says: here’s HOW you organise being safe. Risk assess everything, write the important bits down, train people, plan for emergencies."
            onSite="Every RAMS document you read on Monday morning exists because of MHSWR Reg 3. The risk assessment is the parent — RAMS are the kids."
          >
            <p>
              MHSWR is the management framework that sits between HASAWA and everything else. The
              big duties:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 3 — Risk assessment.</strong> Every work activity. Has to be "suitable
                and sufficient". If you’ve got 5+ employees, the significant findings have to be
                recorded.
              </li>
              <li>
                <strong>Reg 4 — Principles of prevention.</strong> The pecking order: avoid the risk
                → evaluate what you can’t avoid → tackle it at source → adapt the work to the worker
                → use technology → give collective protection priority over individual PPE.
              </li>
              <li>
                <strong>Reg 5 — Health and safety arrangements.</strong> Have a system. Plan, organise,
                control, monitor and review.
              </li>
              <li>
                <strong>Reg 7 — Competent assistance.</strong> Get someone qualified to advise — could
                be in-house or a consultant.
              </li>
              <li>
                <strong>Regs 8 & 9 — Emergency procedures.</strong> Fire drills, first aid, evacuation
                routes. Sorted before something goes wrong.
              </li>
              <li>
                <strong>Reg 10 — Information for employees.</strong> You have to be told the risks
                and the controls. Site induction = this in action.
              </li>
              <li>
                <strong>Reg 14 — Duties on employees.</strong> You have to use the equipment and
                follow the system as you’ve been trained. Sound familiar? It’s a sister of HASAWA s.7.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="MHSWR 1999 — Regulation 3"
            clause="Every employer shall make a suitable and sufficient assessment of the risks to the health and safety of his employees to which they are exposed whilst they are at work; and the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking, for the purpose of identifying the measures he needs to take to comply with the requirements and prohibitions imposed upon him by or under the relevant statutory provisions."
            meaning={
              <>
                Big sentence. Boils down to: <strong>risk assess everything you do, for everyone
                affected — your crew AND the public</strong>. The assessment has to be "suitable
                and sufficient" — not perfect, not exhaustive, but sensible and proportionate. With
                5+ employees it has to be in writing. That writing turns into the RAMS your foreman
                hands you on the first day.
              </>
            }
            cite="Reference: HSE — Management of Health and Safety at Work Regulations 1999, SI 1999/3242"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>When something goes wrong</ContentEyebrow>

          <ConceptBlock
            title="RIDDOR 2013 — Reporting of Injuries, Diseases and Dangerous Occurrences"
            plainEnglish="If something serious happens at work, the HSE needs to know. RIDDOR says what counts as 'serious', who does the reporting, and when by."
            onSite="The boss (or 'responsible person') makes the report on HSE form F2508 — usually online. Most apprentices don’t fill it out themselves, but you DO need to flag the incident the same day so it can be reported in time."
          >
            <p>What gets reported:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Deaths and specified injuries</strong> — fractures (other than fingers/toes),
                amputations, permanent loss of sight, crush injuries to head/torso, serious burns,
                scalpings, loss of consciousness from head injury or asphyxia, anything needing
                resuscitation or 24 hours+ in hospital.
              </li>
              <li>
                <strong>Over-7-day injuries</strong> — if a work-related injury keeps you off
                normal duties for more than 7 days (not counting the day of the accident). Reported
                within 15 days.
              </li>
              <li>
                <strong>Occupational diseases</strong> — diagnosed by a doctor. For us: hand-arm
                vibration syndrome, occupational dermatitis, occupational asthma.
              </li>
              <li>
                <strong>Dangerous occurrences</strong> — near-misses serious enough to be listed in
                Schedule 2 of the regs. For electrical: a short circuit causing fire or explosion;
                collapse of scaffolding; plant or equipment striking overhead lines.
              </li>
              <li>
                <strong>Gas incidents</strong> — handled by Gas Safe registered fitters.
              </li>
            </ul>
            <p>
              For us as sparks, the big ones to remember: <strong>any electric shock injury that
              needs treatment is almost always reportable</strong>, and so is any short circuit
              that causes a fire. If you’ve taken a belt, even one that left you "fine", tell
              someone. Cardiac issues can show up hours later, which is exactly why RIDDOR takes
              shocks seriously.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RIDDOR 2013 — Regulation 4 (paraphrased from HSE guidance)"
            clause="Where any person at work, as a result of a work-related accident, suffers a specified injury or is incapacitated for routine work for more than seven consecutive days, the responsible person must follow the appropriate reporting procedure and notify the relevant enforcing authority."
            meaning={
              <>
                One person — the "responsible person" (usually the employer) — has to make the
                report. You don’t do it yourself, but you DO have to flag the incident the same day.
                Reporting timescales: <strong>fatal/specified injuries — without delay then within
                10 days</strong>, <strong>over-7-day injuries — within 15 days</strong>. Records
                kept for 3 years minimum.
              </>
            }
            cite="Source: HSE — Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR). Verbatim wording paraphrased — see HSE.gov.uk/riddor for the full statutory text."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The kit you actually use</ContentEyebrow>

          <ConceptBlock
            title="PUWER 1998 — Provision and Use of Work Equipment Regulations"
            plainEnglish="Any equipment you use at work — from a screwdriver to a scissor lift — has to be safe, suitable, maintained, and only used by people who’ve been shown how."
            onSite="That sticker on your drill with the test date? That’s PUWER. The pre-use check on the MEWP? PUWER. The fact you’re not allowed to touch the brick saw until you’ve been shown? Also PUWER."
          >
            <p>
              PUWER’s wide. Hammers, knives, ladders, drills, grinders, saws, multimeters, MFTs,
              dumpers, lifts, MEWPs — pretty much anything provided for work counts. The headline
              duties:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Suitable</strong> for the actual job and the conditions you’re using it in.
                A 110V drill on a building site, not a domestic 230V lump on a wet sub-floor.
              </li>
              <li>
                <strong>Safe and maintained</strong> — kept in good nick. Inspected where the regs
                require it (LOLER for lifting kit, statutory for lifts and pressure vessels, PAT for
                site tools at sensible intervals).
              </li>
              <li>
                <strong>Used by competent persons</strong> — info, instruction, training. If you
                haven’t been shown, you don’t touch it.
              </li>
              <li>
                <strong>Safety features fitted and used</strong> — guards, interlocks, emergency
                stops, warning markings. Don’t defeat them, don’t bypass them.
              </li>
            </ul>
            <p>
              Pre-use checks are your bit. Lead and plug intact, no exposed conductors, casing not
              cracked, in test date, RCD protection where it should be. Two minutes before you start
              saves a lot of grief later.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="PUWER 1998 — General duty (HSE summary)"
            clause="Equipment provided for use at work must be: suitable for the intended use; safe for use, maintained in a safe condition and, in certain circumstances, inspected to ensure this remains the case; used only by people who have received adequate information, instruction and training; and accompanied by suitable safety measures, e.g. protective devices, markings, warnings."
            meaning={
              <>
                Four things: <strong>suitable, safe, used by trained people, with safety features
                fitted</strong>. That’s PUWER in a sentence. If your drill is knackered, you haven’t
                been shown how, the guard’s missing, or it isn’t right for the environment — that’s
                a PUWER breach. Stop, swap it out, flag it.
              </>
            }
            cite="Source: HSE — Provision and Use of Work Equipment Regulations 1998 (PUWER), official guidance summary. Paraphrased — see HSE.gov.uk/work-equipment-machinery for full statutory text."
          />

          <SectionRule />

          <ContentEyebrow>The stuff that hurts you slowly</ContentEyebrow>

          <ConceptBlock
            title="COSHH 2002 — Control of Substances Hazardous to Health"
            plainEnglish="Anything you breathe in, swallow, get on your skin or in your eyes that could harm you — chemicals, dusts, fumes, biological stuff. Boss has to assess it and control it."
            onSite="Brick dust when you’re chasing a wall? COSHH. Solder fumes? COSHH. Mastic, silicone, contact cleaner, lead from old cable, asbestos in older boards? All COSHH. Yes, even though you’re a sparky."
          >
            <p>
              The classic apprentice mistake is thinking COSHH is just for chemists or factory
              workers. It absolutely isn’t. The list of substances you’ll meet on the tools:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Silica dust</strong> from chasing brick or chopping out for back boxes.
                Long-term exposure causes silicosis. Use on-tool extraction, water suppression, and
                an FFP3 mask if you must.
              </li>
              <li>
                <strong>Solder fumes</strong> from terminations and joint work. Rosin-based fluxes
                can cause occupational asthma. Ventilation and fume extraction.
              </li>
              <li>
                <strong>Mastics, silicones, sealants and adhesives</strong> — skin and respiratory
                irritants. Gloves, ventilation, follow the SDS.
              </li>
              <li>
                <strong>Cleaning chemicals and contact cleaners</strong> — solvents.
              </li>
              <li>
                <strong>Lead</strong> — from old paint when you’re chasing through old plaster, or
                from old VIR/lead-sheathed cables. Has its own regs (Control of Lead at Work).
              </li>
              <li>
                <strong>Asbestos</strong> — in pre-2000 buildings. AIB partitions, boards behind
                sockets, lagging on old pipes. Stop, don’t touch, get an asbestos survey.
              </li>
            </ul>
            <p>
              Every hazardous substance comes with a <strong>Safety Data Sheet (SDS)</strong> from
              the manufacturer. The boss has to make these available; you should know how to read
              one when you need to.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="COSHH 2002 — purpose (HSE summary)"
            clause="Using hazardous substances can put people’s health at risk. COSHH therefore requires employers to control exposures to hazardous substances to protect both employees and others who may be exposed from work activities."
            meaning={
              <>
                Boss must <strong>assess the risk, then control it using the hierarchy</strong>:
                eliminate → substitute → engineering controls (extraction, ventilation, water
                suppression) → admin (procedures, training, time limits) → <strong>PPE LAST</strong>.
                If the only "control" you’ve been given is a paper mask, that’s not COSHH compliance,
                that’s a corner being cut.
              </>
            }
            cite="Source: HSE — Control of Substances Hazardous to Health Regulations 2002 (COSHH), official guidance. Paraphrased — see HSE.gov.uk/coshh for the full statutory text."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <CommonMistake
            title="Thinking COSHH is just 'for the chemists'"
            whatHappens={
              <>
                You’re chasing brick all day for back boxes — no extraction, no water suppression,
                a basic dust mask from the van. Two weeks of that on a refurb. Long term, that’s a
                silicosis route. COSHH isn’t optional just because you’re a sparky.
              </>
            }
            doInstead={
              <>
                Treat dust as a COSHH substance, full stop. Ask for on-tool extraction. Use water
                where you can. FFP3 mask, fitted properly. If the boss tells you to crack on without
                controls, that’s the bit to escalate.
              </>
            }
          />

          <Scenario
            title="You’ve drilled into a board you weren’t expecting — and it might be asbestos"
            situation={
              <>
                Pre-2000 commercial unit. You’re popping a hole through a partition for a cable
                run. The board crumbles unusually. White-grey, fibrous, slightly chalky. The dust
                is everywhere.
              </>
            }
            whatToDo={
              <>
                Stop. Don’t disturb it any further. Step out, close the area off, leave your overalls
                where they are (don’t shake them out). Tell the gaffer immediately — they need to
                check the asbestos register and get a survey done. If you’ve inhaled significant
                dust, that’s a doctor visit AND a near-miss report. Could become a RIDDOR
                dangerous-occurrence report depending on extent.
              </>
            }
            whyItMatters={
              <>
                Asbestos has its own regs (CAR 2012) but it’s a COSHH-class substance. There’s no
                "safe" exposure for some types. Disease (mesothelioma, asbestosis) shows up 20-40
                years later — so it’s the long-term call you don’t want to mess with.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Up the ladder</ContentEyebrow>

          <ConceptBlock
            title="Working at Height Regulations 2005"
            plainEnglish="Any time you could fall and get hurt — that’s working at height. Loft hatches, ceiling voids, ladders, scaffold, MEWPs. Even a low platform if the fall could injure you."
            onSite="Domestic install, downlight in a kitchen? You’re working at height the moment you’re up the steps. Same regs as the lad on a 60ft scaffold — just scaled."
          >
            <p>The hierarchy for height work — three steps, in order:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Avoid</strong> working at height where you can. Pre-make off cables at the
                bench. Rod from below. Use a longer lance.
              </li>
              <li>
                <strong>Prevent</strong> the fall using the right equipment. Stable platform,
                guardrails, scissor lift, scaffold tower assembled by a trained person. Last choice:
                a ladder, and only for short-duration light work.
              </li>
              <li>
                <strong>Minimise</strong> the distance and consequences of a fall — fall arrest
                harness, airbags, soft landings. This is the back-up, not the plan.
              </li>
            </ol>
            <p>
              Ladders aren’t banned but they’re a last resort for short, light tasks where a more
              substantial platform isn’t justified. A risk assessment has to back up the choice.
              Ladder rules: secured top and/or bottom, good footing, proper angle (1-out, 4-up),
              three points of contact, no overreaching, no work above head height for sustained
              periods.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Picking stuff up</ContentEyebrow>

          <ConceptBlock
            title="Manual Handling Operations Regulations 1992"
            plainEnglish="Lifting, lowering, pushing, pulling, carrying — anything that could hurt your back, shoulders or knees. Big chunk of all reportable injuries on site come from manual handling."
            onSite="Cable drums, switchgear, consumer units, bags of fixings, accumulators on solar jobs. The 'I’ll just grab it' move is what wrecks backs."
          >
            <p>
              The regs follow the same avoid-assess-reduce model. First: <strong>avoid the lift if
              you can</strong> — get it delivered closer, use a sack truck, pallet truck, hoist or
              two people. Then assess what you can’t avoid using <strong>TILE</strong>:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Task</strong> — what’s the lift? Carry, twist, low to high, sustained
                holding?
              </li>
              <li>
                <strong>Individual</strong> — who’s doing it? Trained? Healthy? Apprentice or
                experienced?
              </li>
              <li>
                <strong>Load</strong> — how heavy, how awkward, sharp edges, hot, slippery, can it
                shift?
              </li>
              <li>
                <strong>Environment</strong> — where? Stairs, ladders, narrow corridors, rough
                ground, tight space?
              </li>
            </ul>
            <p>
              Then reduce the risk that’s left — handling aids, splitting the load, two-person
              lifts, training. Manual handling causes <strong>more than one in four reportable
              injuries</strong> on site, and most of them are completely avoidable.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Your kit</ContentEyebrow>

          <ConceptBlock
            title="PPE Regulations 2022 (PPE at Work)"
            plainEnglish="PPE is the LAST line of defence — never the first. But where it’s used, it has to be free, fit-for-purpose, trained on, and looked after."
            onSite="Boots, gloves, glasses, helmet, hi-vis, hearing protection, RPE, harness, voltage-rated gloves for live work. All free. All yours to use, not pay for."
          >
            <p>The duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Free</strong> — the boss pays. Always. No deductions, no "buy your own".
              </li>
              <li>
                <strong>Fit-for-purpose</strong> — the right PPE for the actual hazard. Cut-resistant
                gloves for stripping armour. Voltage-rated gloves for live work. FFP3 for silica
                dust. Class 1/2 helmet for working at height. Tested to the relevant standard.
              </li>
              <li>
                <strong>Properly fitting</strong> — fit-tested where it matters (RPE especially).
                Bigger isn’t safer.
              </li>
              <li>
                <strong>Training</strong> — you should know when to wear it, how to put it on, and
                how to maintain it.
              </li>
              <li>
                <strong>Maintained and replaced</strong> — checked, cleaned, swapped when damaged or
                expired.
              </li>
            </ul>
            <p>
              The 2022 update extended the regs to "limb (b)" workers — basically casuals,
              freelancers and gig-economy workers. If you’re effectively under someone’s control on
              site, PPE rules apply.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The construction site one</ContentEyebrow>

          <ConceptBlock
            title="CDM 2015 — Construction (Design and Management) Regulations"
            plainEnglish="The big one for building sites. Sets out who is responsible for what — from the customer who’s paying, all the way down to you on the tools."
            onSite="Site induction = CDM in action. The principal contractor has to brief you on the site rules, hazards, emergency procedures and welfare arrangements before you start work."
          >
            <p>The duty-holders, in order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Client</strong> — the person paying for the work. Has to provide info about
                the site/building, allow enough time and budget for safe work, appoint the right
                people. For private domestic clients, the contractor takes on the client’s CDM
                duties.
              </li>
              <li>
                <strong>Principal designer</strong> — coordinates pre-construction safety:
                identifying hazards in the design before site work starts, producing the
                pre-construction info pack.
              </li>
              <li>
                <strong>Principal contractor</strong> — runs the construction phase. Manages site
                safety, coordinates trades, runs inductions, produces the construction phase plan.
              </li>
              <li>
                <strong>Contractors</strong> — carry out the work safely, plan and resource it,
                cooperate with the principal contractor.
              </li>
              <li>
                <strong>Workers (you)</strong> — cooperate, follow the system, raise concerns. Same
                old story.
              </li>
            </ul>
            <p>
              CDM kicks in for projects with more than one contractor, or that last more than 30
              days with 20+ workers at any peak point, or 500+ person-days total. Bigger jobs need a
              "health and safety file" produced and handed over to the client at the end — the
              ongoing record of what’s there and what to watch out for in future maintenance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Quick mention — two you’ll hear about</ContentEyebrow>

          <ConceptBlock title="DSEAR and DSE — the niche ones">
            <p>
              <strong>DSEAR 2002 (Dangerous Substances and Explosive Atmospheres)</strong> covers
              flammable and explosive substances — petrol, LPG, paint solvents, dust clouds,
              hydrogen from battery rooms. Sets minimum standards to control fire and explosion
              risks. Most apprentices won’t see DSEAR work directly, but you might bump into it on
              petrol stations, biomass plants, big battery rooms or industrial sites with stored
              flammables. There’ll usually be an EX-rated zone and special intrinsically-safe
              equipment requirements.
            </p>
            <p>
              <strong>DSE 1992 (Display Screen Equipment)</strong> covers anyone who uses a screen
              for a significant chunk of the day — workstation assessments, eye tests, breaks. As an
              apprentice on the tools you won’t deal with this much. As a designer or estimator
              later in your career, you will.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>How they all sit together</ContentEyebrow>

          <ConceptBlock
            title="HASAWA → MHSWR → the specifics"
            plainEnglish="Three layers. HASAWA: 'be safe.' MHSWR: 'here’s how you organise being safe — risk assess everything.' The specific regs (RIDDOR, PUWER, COSHH, WAHR, etc.): 'and here’s how you handle THIS particular risk.'"
          >
            <p>
              That’s the architecture. Don’t try to memorise the regs as a list — try to see them as
              the one big duty (HASAWA) being made specific, hazard by hazard. When you’re on a job
              and you see a hazard, ask yourself: which reg is the spike of attention on this one?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lifting a heavy CU? Manual Handling.</li>
              <li>Up the loft? Working at Height.</li>
              <li>Chasing brick? COSHH (silica) + PUWER (the SDS drill).</li>
              <li>Had a belt? RIDDOR.</li>
              <li>On a building site? CDM running over the top of all of it.</li>
              <li>Live electrical work? EAWR (the previous subsection).</li>
            </ul>
            <p>
              And underneath every single one of them, MHSWR’s risk assessment and HASAWA’s general
              duty. That’s the map. The RAMS for the actual job pulls all of it into one set of
              steps you can follow.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "All these regs are MADE UNDER HASAWA. Same enforcement teeth — HSE, fines, prison for the worst.",
              "MHSWR 1999 = risk assess every activity. 5+ employees = significant findings written down. RAMS come from this.",
              "RIDDOR 2013 = serious incidents reported on F2508 by the 'responsible person'. Most electric shocks needing treatment ARE reportable.",
              "PUWER 1998 = work equipment must be suitable, safe, maintained, used by trained people, with safety features fitted.",
              "COSHH 2002 = control hazardous substances using the hierarchy: eliminate → substitute → engineering → admin → PPE LAST.",
              "Working at Height = avoid → prevent → minimise. Manual Handling = TILE. PPE = free, fitted, trained. CDM = duty-holder chain on building sites.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="RIDDOR, PUWER, COSHH and friends knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Electricity at Work Regulations 1989
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Regulatory bodies
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default Sub3;
